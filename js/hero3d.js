/* Depth-map portrait hero — Lando-style layered WebGL.
   Two textures (photo + depth map), mouse-driven parallax in a fragment shader.
   Subtle on purpose. */

import * as THREE from "three";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform sampler2D uDepth;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform vec2 uPlaneRes;
  uniform vec2 uImageRes;
  uniform float uStrength;

  vec2 coverUv(vec2 uv) {
    float planeAspect = uPlaneRes.x / uPlaneRes.y;
    float imgAspect = uImageRes.x / uImageRes.y;
    vec2 s = vec2(1.0);
    if (planeAspect > imgAspect) { s.y = imgAspect / planeAspect; }
    else { s.x = planeAspect / imgAspect; }
    return (uv - 0.5) * s + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv);
    float d = texture2D(uDepth, uv).r;
    vec2 par = uMouse * uStrength * (d - 0.42);
    vec3 col;
    col.r = texture2D(uTex, uv + par * 1.06).r;
    col.g = texture2D(uTex, uv + par).g;
    col.b = texture2D(uTex, uv + par * 0.94).b;
    float vig = smoothstep(1.15, 0.35, length(vUv - 0.5));
    col *= mix(0.72, 1.0, vig);
    float scan = sin((vUv.y + uTime * 0.02) * 800.0) * 0.012;
    gl_FragColor = vec4(col + scan, 1.0);
  }
`;

export function createHero3D(container, { image, depth, strength = 0.05 }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#111112");
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    uTex: { value: null },
    uDepth: { value: null },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 },
    uPlaneRes: { value: new THREE.Vector2(1, 1) },
    uImageRes: { value: new THREE.Vector2(3, 4) },
    uStrength: { value: strength },
  };

  const loader = new THREE.TextureLoader();
  loader.load(image, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    uniforms.uTex.value = t;
    uniforms.uImageRes.value.set(t.image.width, t.image.height);
  });
  loader.load(depth, (t) => { uniforms.uDepth.value = t; });

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
  );
  scene.add(mesh);

  const target = new THREE.Vector2();
  const onMove = (e) => {
    target.set((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1));
  };
  addEventListener("mousemove", onMove);

  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    uniforms.uPlaneRes.value.set(w, h);
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
    uniforms.uTime.value = (now - t0) / 1000;
    uniforms.uMouse.value.lerp(target, 0.045);
    renderer.render(scene, camera);
  })(t0);

  return () => {
    cancelAnimationFrame(raf);
    removeEventListener("mousemove", onMove);
    ro.disconnect();
    io.disconnect();
    renderer.dispose();
    container.innerHTML = "";
  };
}
