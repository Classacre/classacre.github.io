/* Procedural DNA double helix — the helmet-viewer analog.
   Instanced spheres + instanced rungs. Rotation driven by scroll progress,
   plus pointer drag. Flat lime/olive materials, no textures. */

import * as THREE from "three";

const LIME = 0xd2ff00;
const OLIVE = 0x8a9455;
const RUNG = 0x55603c;

export function createDNA(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(4, 6, 8);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd2ff00, 0.7);
  rim.position.set(-6, -2, -4);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  const TURNS = 5.5;
  const POINTS = 200;
  const RISE = 10.5;
  const RADIUS = 1.35;

  const strand = (phase) => (t) => {
    const a = t * Math.PI * 2 * TURNS + phase;
    return new THREE.Vector3(
      Math.cos(a) * RADIUS,
      (t - 0.5) * RISE,
      Math.sin(a) * RADIUS
    );
  };
  const sA = strand(0);
  const sB = strand(Math.PI);

  const sphereGeo = new THREE.SphereGeometry(0.16, 12, 12);
  const matA = new THREE.MeshStandardMaterial({ color: LIME, roughness: 0.35, metalness: 0.1 });
  const matB = new THREE.MeshStandardMaterial({ color: OLIVE, roughness: 0.5, metalness: 0.05 });
  const instA = new THREE.InstancedMesh(sphereGeo, matA, POINTS);
  const instB = new THREE.InstancedMesh(sphereGeo, matB, POINTS);

  const m4 = new THREE.Matrix4();
  for (let i = 0; i < POINTS; i++) {
    const t = i / (POINTS - 1);
    m4.setPosition(sA(t));
    instA.setMatrixAt(i, m4);
    m4.setPosition(sB(t));
    instB.setMatrixAt(i, m4);
  }
  group.add(instA, instB);

  const rungEvery = 8;
  const rungCount = Math.floor(POINTS / rungEvery);
  const cylGeo = new THREE.CylinderGeometry(0.045, 0.045, 1, 6);
  const matR = new THREE.MeshStandardMaterial({ color: RUNG, roughness: 0.6 });
  const rungs = new THREE.InstancedMesh(cylGeo, matR, rungCount);
  const up = new THREE.Vector3(0, 1, 0);
  const q = new THREE.Quaternion();
  for (let i = 0; i < rungCount; i++) {
    const t = (i * rungEvery) / (POINTS - 1);
    const a = sA(t), b = sB(t);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const dir = b.clone().sub(a);
    const len = dir.length();
    q.setFromUnitVectors(up, dir.clone().normalize());
    m4.compose(mid, q, new THREE.Vector3(1, len, 1));
    rungs.setMatrixAt(i, m4);
  }
  group.add(rungs);

  let rotTarget = 0;
  let dragVel = 0;
  let dragging = false;
  let lastX = 0;
  const down = (e) => { dragging = true; lastX = e.clientX ?? e.touches?.[0]?.clientX ?? 0; };
  const move = (e) => {
    if (!dragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragVel += (x - lastX) * 0.0035;
    lastX = x;
  };
  const upFn = () => { dragging = false; };
  container.addEventListener("pointerdown", down);
  addEventListener("pointermove", move);
  addEventListener("pointerup", upFn);

  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  let visible = true;
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
  io.observe(container);

  let raf;
  const t0 = performance.now();
  (function loop(now) {
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    const t = (now - t0) / 1000;
    dragVel *= 0.94;
    group.rotation.y += (rotTarget - group.rotation.y) * 0.07 + dragVel;
    group.position.y = Math.sin(t * 0.6) * 0.18;
    renderer.render(scene, camera);
  })(t0);

  return {
    setProgress(p) { rotTarget = p * Math.PI * 4.5; },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      container.removeEventListener("pointerdown", down);
      removeEventListener("pointermove", move);
      removeEventListener("pointerup", upFn);
      renderer.dispose();
      container.innerHTML = "";
    },
  };
}
