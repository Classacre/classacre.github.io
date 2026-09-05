/* Research page — scroll-driven DNA helix with staged copy (aims A/B/C). */

import { createDNA } from "/js/dna3d.js";

export function init(root) {
  const wrap = root.querySelector(".pin-wrap");
  if (!wrap) return;

  const stage = wrap.querySelector(".pin-stage [data-dna]");
  const steps = [...wrap.querySelectorAll(".pin-step")];
  const bar = wrap.querySelector(".pin-progress i");

  const dna = window.MM.reduced ? null : createDNA(stage);

  const RANGES = [
    [0.02, 0.28],
    [0.38, 0.60],
    [0.72, 0.95],
  ];
  const FADE = 0.055;

  let raf;
  (function loop() {
    raf = requestAnimationFrame(loop);
    const p = window.MM.pinProgress(wrap);
    if (dna) dna.setProgress(p);
    if (bar) bar.style.transform = `scaleX(${p})`;
    steps.forEach((el, i) => {
      const [a, b] = RANGES[i] || [0, 0];
      const fade = FADE;
      let o = 0;
      if (p > a - fade && p < a) o = (p - (a - fade)) / fade;
      else if (p >= a && p <= b) o = 1;
      else if (p > b && p < b + fade) o = 1 - (p - b) / fade;
      el.style.opacity = o;
      el.style.transform = `translateY(${(1 - o) * 40}px)`;
    });
  })();

  return () => {
    cancelAnimationFrame(raf);
    if (dna) dna.dispose();
  };
}
