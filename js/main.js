/* ==========================================================================
   MIKA MARTIN — shared engine
   Lenis smooth scroll, curtain page transitions, marquees, reveals,
   word-highlight manifesto, horizontal gallery, cursor, easter eggs.
   No framework. Transform/opacity only.
   ========================================================================== */

const MM = {
  lenis: null,
  cleanup: [],
  page: null,
  reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  transitioning: false,
};
window.MM = MM;

/* ---------- utils ---------- */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

function hexLerp(h1, h2, t) {
  const p = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const [a, b] = [p(h1), p(h2)];
  return `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t))).join(",")})`;
}

/* ---------- lenis ---------- */

function initLenis() {
  if (MM.reduced || typeof Lenis === "undefined") return;
  MM.lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  const raf = (t) => { MM.lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

/* ---------- custom cursor ---------- */

function initCursor() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  document.body.append(dot, ring);
  let x = -100, y = -100, rx = -100, ry = -100;
  addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
  (function loop() {
    rx = lerp(rx, x, 0.16); ry = lerp(ry, y, 0.16);
    dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", (e) => {
    ring.classList.toggle("is-hover", !!e.target.closest("a, button, [data-hover]"));
  });
}

/* ---------- letter roll ---------- */

function initRolls(root) {
  $$(".roll", root).forEach((el) => {
    if (el.dataset.rolled) return;
    el.dataset.rolled = "1";
    const text = el.textContent;
    el.setAttribute("aria-label", text);
    el.innerHTML = [...text].map((ch, i) => {
      const c = ch === " " ? "&nbsp;" : ch.replace("<", "&lt;");
      return `<span class="ch" data-ch="${c === "&nbsp;" ? " " : ch}" style="transition-delay:${i * 18}ms" aria-hidden="true">${c}</span>`;
    }).join("");
  });
}

/* ---------- reveals ---------- */

function initReveals(root) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$("[data-reveal]", root).forEach((el) => {
    if (el.dataset.revealDelay) el.style.transitionDelay = `${el.dataset.revealDelay}ms`;
    io.observe(el);
  });
  MM.cleanup.push(() => io.disconnect());
}

/* ---------- counters ---------- */

function initCounters(root) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target;
      const target = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.decimals || "0", 10);
      const dur = 1400;
      const t0 = performance.now();
      (function tick(now) {
        const p = clamp((now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 4);
        el.firstChild.textContent = (target * e).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.5 });
  $$("[data-count]", root).forEach((el) => io.observe(el));
  MM.cleanup.push(() => io.disconnect());
}

/* ---------- marquees (scroll-velocity reactive) ---------- */

function initMarquees(root) {
  $$(".marquee", root).forEach((wrap) => {
    const track = $(".marquee__track", wrap);
    if (!track) return;
    const base = parseFloat(wrap.dataset.speed || "60");
    const dir = wrap.dataset.dir === "right" ? 1 : -1;
    let pos = 0, half = 0;
    const measure = () => { half = track.scrollWidth / 2; };
    measure();
    addEventListener("resize", measure);
    let last = performance.now();
    let raf;
    (function loop(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const vel = MM.lenis ? MM.lenis.velocity || 0 : 0;
      const speed = base + Math.min(Math.abs(vel) * 24, 420);
      const d = wrap.dataset.scrollReactive !== undefined && vel !== 0 && wrap.dataset.dir === "auto"
        ? Math.sign(vel) || dir
        : dir;
      pos += d * speed * dt;
      if (half > 0) {
        pos = ((pos % half) + half) % half;
        track.style.transform = `translateX(${-pos}px)`;
      }
      raf = requestAnimationFrame(loop);
    })(last);
    MM.cleanup.push(() => cancelAnimationFrame(raf));
  });
}

/* ---------- manifesto word highlight ---------- */

function initManifesto(root) {
  const el = $(".manifesto", root);
  if (!el) return;
  if (!el.dataset.split) {
    el.dataset.split = "1";
    el.innerHTML = el.innerHTML.split(/(\s+)/).map((chunk) => {
      if (/^\s+$/.test(chunk) || !chunk) return chunk;
      const key = /data-key|<u>/.test(chunk);
      const clean = chunk.replace(/<\/?u>/g, "");
      return `<span class="w${key ? " w--key" : ""}">${clean}</span>`;
    }).join("");
  }
  const words = $$(".w", el);
  let raf;
  (function loop() {
    const r = el.getBoundingClientRect();
    const vh = innerHeight;
    const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.45));
    const n = Math.floor(p * words.length * 1.15);
    words.forEach((w, i) => w.classList.toggle("is-lit", i <= n));
    raf = requestAnimationFrame(loop);
  })();
  MM.cleanup.push(() => cancelAnimationFrame(raf));
}

/* ---------- horizontal gallery ---------- */

function initHgal(root) {
  $$(".hgal", root).forEach((sec) => {
    const track = $(".hgal__track", sec);
    const from = sec.dataset.bgFrom || "#111112";
    const to = sec.dataset.bgTo || "#f4f4ed";
    let raf;
    (function loop() {
      const r = sec.getBoundingClientRect();
      const total = r.height - innerHeight;
      const p = clamp(-r.top / total);
      const shift = Math.max(track.scrollWidth - innerWidth, 0);
      track.style.transform = `translateX(${-p * shift}px)`;
      sec.style.background = hexLerp(from, to, clamp(p * 1.25));
      sec.classList.toggle("is-light", p > 0.55);
      raf = requestAnimationFrame(loop);
    })();
    MM.cleanup.push(() => cancelAnimationFrame(raf));
  });
}

/* ---------- pin progress helper (used by page modules) ---------- */

MM.pinProgress = (el) => {
  const r = el.getBoundingClientRect();
  return clamp(-r.top / (r.height - innerHeight));
};

/* ---------- hero title intro ---------- */

function heroIntro(root) {
  $$(".hero__title .line > span", root).forEach((span, i) => {
    span.style.transition = `transform 1.1s var(--ease) ${0.08 + i * 0.09}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => { span.style.transform = "translateY(0)"; }));
  });
}

/* ---------- page modules ---------- */

async function initPage(root) {
  const page = document.body.dataset.page;
  MM.page = page;
  $$(".nav__link").forEach((a) => {
    const href = new URL(a.getAttribute("href"), location.origin).pathname;
    if (href === location.pathname) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  initRolls(root);
  initReveals(root);
  initCounters(root);
  initMarquees(root);
  initManifesto(root);
  initHgal(root);
  heroIntro(root);
  try {
    const mod = await import(`/js/pages/${page}.js`);
    if (mod && typeof mod.init === "function") {
      const dispose = mod.init(root);
      if (typeof dispose === "function") MM.cleanup.push(dispose);
    }
  } catch (e) {
    /* page has no module — fine */
  }
}

function teardown() {
  MM.cleanup.forEach((fn) => { try { fn(); } catch (e) {} });
  MM.cleanup = [];
}

/* ---------- curtain transitions ---------- */

const curtainHTML = `
  <div class="curtain__panel curtain__panel--accent"></div>
  <div class="curtain__panel curtain__panel--bg"></div>
  <div class="curtain__label">
    <div>
      <div class="curtain__logo">Load&nbsp;Martin<sup style="font-size:.35em">®</sup></div>
      <div class="curtain__pct mono mono--accent">fetching Â· <span>0</span>%</div>
    </div>
  </div>`;

let curtain, pctEl;
function initCurtain() {
  curtain = document.createElement("div");
  curtain.className = "curtain";
  curtain.innerHTML = curtainHTML;
  document.body.appendChild(curtain);
  pctEl = $("span", curtain);
}

function curtainIn() {
  return new Promise((res) => {
    curtain.classList.add("is-active");
    const [a, b] = $$(".curtain__panel", curtain);
    const label = $(".curtain__label", curtain);
    a.style.transition = "transform .5s var(--ease)";
    b.style.transition = "transform .5s var(--ease) .08s";
    a.style.transform = "translateY(0)";
    b.style.transform = "translateY(0)";
    label.style.transition = "opacity .3s .35s";
    label.style.opacity = "1";
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(p + Math.random() * 22, 96);
      pctEl.textContent = Math.round(p);
    }, 90);
    curtain._iv = iv;
    setTimeout(res, 620);
  });
}

function curtainOut() {
  return new Promise((res) => {
    clearInterval(curtain._iv);
    pctEl.textContent = "100";
    const [a, b] = $$(".curtain__panel", curtain);
    const label = $(".curtain__label", curtain);
    label.style.transition = "opacity .2s";
    label.style.opacity = "0";
    b.style.transition = "transform .55s var(--ease) .05s";
    a.style.transition = "transform .55s var(--ease) .13s";
    b.style.transform = "translateY(-101%)";
    a.style.transform = "translateY(-101%)";
    setTimeout(() => {
      curtain.classList.remove("is-active");
      [a, b].forEach((p) => { p.style.transition = "none"; p.style.transform = "translateY(101%)"; });
      res();
    }, 760);
  });
}

async function go(url, push = true) {
  if (MM.transitioning) return;
  MM.transitioning = true;
  const safety = setTimeout(() => { location.href = url; }, 7000);
  try {
    await curtainIn();
    const res = await fetch(url, { credentials: "same-origin" });
    if (!res.ok) throw new Error(res.status);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const nextMain = doc.querySelector("main");
    if (!nextMain) throw new Error("no main");
    teardown();
    document.title = doc.title;
    document.body.dataset.page = doc.body.dataset.page;
    $("main").replaceWith(nextMain);
    if (push) history.pushState({}, "", url);
    if (MM.lenis) MM.lenis.scrollTo(0, { immediate: true }); else scrollTo(0, 0);
    await initPage(document);
    clearTimeout(safety);
    await curtainOut();
  } catch (e) {
    clearTimeout(safety);
    location.href = url;
  } finally {
    MM.transitioning = false;
  }
}

function initTransitions() {
  document.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || a.target === "_blank" || a.hasAttribute("download")) return;
    let url;
    try { url = new URL(href, location.href); } catch { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    if (url.pathname === location.pathname) return;
    go(url.pathname + url.search);
  });
  addEventListener("popstate", () => {
    if (!MM.transitioning) go(location.pathname + location.search, false);
  });
}

/* ---------- first-load intro ---------- */

function initLoader() {
  const loader = $(".loader");
  if (!loader) return;
  const pct = $(".loader__pct span", loader);
  let p = 0;
  const iv = setInterval(() => {
    p = Math.min(p + Math.random() * 26, 100);
    pct.textContent = Math.round(p);
    if (p >= 100) {
      clearInterval(iv);
      setTimeout(() => {
        loader.style.transition = "transform .7s var(--ease)";
        loader.style.transform = "translateY(-101%)";
        setTimeout(() => loader.remove(), 800);
      }, 220);
    }
  }, 110);
}

/* ---------- easter eggs ---------- */

function initEggs() {
  console.log(
    "%cMIKA%cMARTIN%c — bioinformatics, nodes and pipelines. Curious? github.com/Classacre",
    "background:#d2ff00;color:#111112;font-weight:900;font-size:28px;padding:4px 2px 4px 10px;font-family:monospace",
    "background:#111112;color:#d2ff00;font-weight:900;font-size:28px;padding:4px 10px 4px 2px;font-family:monospace",
    "color:#f4f4ed;font-size:12px;font-family:monospace"
  );
  let buf = "";
  addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    buf = (buf + e.key.toLowerCase()).slice(-4);
    if (buf === "acgt") acgtRain();
  });
}

function acgtRain() {
  if ($(".acgt-rain")) return;
  const c = document.createElement("canvas");
  c.className = "acgt-rain";
  document.body.appendChild(c);
  const ctx = c.getContext("2d");
  c.width = innerWidth; c.height = innerHeight;
  const cols = Math.floor(innerWidth / 26);
  const drops = Array.from({ length: cols }, () => Math.random() * -innerHeight);
  const chars = "ACGT";
  const t0 = performance.now();
  (function draw(now) {
    ctx.fillStyle = "rgba(17,17,18,0.18)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.font = "20px 'Space Mono', monospace";
    drops.forEach((y, i) => {
      ctx.fillStyle = Math.random() < 0.12 ? "#d2ff00" : "rgba(210,255,0,0.45)";
      ctx.fillText(chars[Math.floor(Math.random() * 4)], i * 26, y);
      drops[i] = y + 18 + Math.random() * 8;
      if (y > c.height) drops[i] = Math.random() * -200;
    });
    if (now - t0 < 3600) requestAnimationFrame(draw);
    else c.remove();
  })(t0);
}

/* ---------- boot ---------- */

addEventListener("DOMContentLoaded", () => {
  initLenis();
  initCursor();
  initCurtain();
  initTransitions();
  initEggs();
  initPage(document);
  initLoader();
});
