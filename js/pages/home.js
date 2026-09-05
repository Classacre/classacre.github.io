/* Home page — hero depth portrait + scroll-drawn signature. */

import { createHero3D } from "/js/hero3d.js";

export function init(root) {
  const cleanups = [];

  const daysEl = root.querySelector("[data-days-to-phd]");
  if (daysEl) {
    const target = new Date("2027-02-01T00:00:00+08:00").getTime();
    daysEl.textContent = Math.max(0, Math.ceil((target - Date.now()) / 86400000));
  }

  const heroWrap = root.querySelector("[data-hero3d]");
  if (heroWrap && !window.MM.reduced) {
    cleanups.push(createHero3D(heroWrap, {
      image: "/assets/img/portrait.png",
      depth: "/assets/img/portrait-depth.png",
      strength: 0.055,
    }));
  }

  const sig = root.querySelector("[data-sig]");
  if (sig) {
    const paths = [...sig.querySelectorAll("path")];
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });
    let raf;
    (function loop() {
      raf = requestAnimationFrame(loop);
      const r = sig.getBoundingClientRect();
      const p = Math.min(Math.max((innerHeight * 0.9 - r.top) / (r.height + innerHeight * 0.55), 0), 1);
      paths.forEach((path) => {
        const len = path.getTotalLength();
        path.style.strokeDashoffset = len * (1 - p);
      });
    })();
    cleanups.push(() => cancelAnimationFrame(raf));
  }

  return () => cleanups.forEach((fn) => fn());
}
