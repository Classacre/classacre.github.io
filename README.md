# mikamartin — personal site

A Lando Norris-style personal site for Mika Martin Nieuwenhuyzen, hand-rolled
with plain HTML/CSS/JS. No build step, no framework. Hosted on GitHub Pages.

Live at https://classacre.github.io/

## Stack

- Vanilla JS + CSS. Libraries loaded from CDN:
  - [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
  - [Three.js](https://threejs.org/) — WebGL (depth-map hero portrait, DNA helix)
- Pages: `index.html` (home), `research/`, `projects/`, `about/`
- `js/main.js` — shared engine: page transitions ("Load Martin" curtain),
  marquees, reveals, counters, manifesto word-highlight, horizontal gallery,
  custom cursor, easter eggs (console log; type A C G T)
- `js/hero3d.js` — home hero: photo + depth map shader, mouse parallax
- `js/dna3d.js` — research: procedural DNA helix, scroll-driven
- `js/pages/*.js` — per-page init/dispose

## Local preview

```
python -m http.server 8000
```

then open http://localhost:8000/ (ES modules need a server; file:// won't work).

---

# WHAT TO REPLACE (placeholder inventory)

All imagery in `assets/img/` is generated placeholder art. Replace with real
files using the **same filename** and everything keeps working. Recommended
sizes below; the site crops with `object-fit: cover`, so close-enough is fine.

| File | Used for | Size |
|---|---|---|
| `portrait.png` | Home hero (WebGL) + About page photo + gallery | 960×1280 (3:4), portrait orientation |
| `portrait-depth.png` | Depth map for the hero 3D effect. Grayscale: white = close to camera, black = far. Generate from your portrait with an AI depth tool (e.g. Depth Anything, Marigold) or ask me | 960×1280, must align exactly with `portrait.png` |
| `card-gel.png` | "In silico" card, gallery, research page | 1200×900 (4:3) |
| `card-dna.png` | research hover, card hover states | 1200×900 |
| `card-karate.png` | "In person" card, about hover, gallery | 1200×900 |
| `card-nodes.png` | BioNodulo canvas shots | 1200×900 |
| `card-agent.png` | BioNodulo AI agent, gallery | 1200×900 |
| `card-doi.png` | DOI-to-pipeline feature | 1200×900 |
| `card-paper.png` | Trends in Genetics publication card (screenshot of the paper page works well) | 1200×900 |
| `card-multiplayer.png` | BioNodulo multiplayer/MCP | 1200×900 |
| `card-cloud.png` | BioNodulo cloud runs | 1200×900 |
| `og.png` | Social share preview image | 1200×630 exactly |

Not a file, but also replaceable:

- **Signature SVG** — `index.html`, search for `class="sig-wrap"`. The five
  `<path>` elements draw a fake signature on scroll. Replace the `d` attributes
  with paths traced from your real signature (keep `viewBox="0 0 700 260"` or
  adjust the SVG tag too).
- **Loader/curtain pun** — "Load Martin" lives in `js/main.js` (`curtainHTML`)
  and the `.loader__tag` div in each HTML file.
- **Rotating badge text** — hero, `index.html`, the `<textPath>` content.

## Text content

All copy is plain HTML in the four pages. Facts live where you'd expect:
stats in the home `stats` section, timeline in `research/`, work history in
`about/`. Edit directly; keep the `data-reveal` attributes.

## Deploy

Push to `main`. GitHub Pages serves the repo root (`.nojekyll` is present, so
no Jekyll processing). That's it.
