# Actuarial Portfolio

A one-page index of my actuarial modelling projects. The CV carries background, education and
qualifications; this site only points to the work.

Live site: https://pnlync.github.io/actuarial/

## Files

- `index.html` – sticky bar (CV / GitHub / LinkedIn / Email), hero with a five-project index, one section per project (inline SVG chart of the method, summary, two key results, links), footer
- `404.html` – not-found page served by GitHub Pages
- `styles.css` – layout, light/dark tokens and chart styling; Source Sans 3 / Serif 4 / Code Pro
- `assets/Tom_Zhang_CV.pdf` – the CV linked from the site
- `assets/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` – TZ monogram
- `assets/og-image.png` – 1200×630 link-preview image used by `og:image`

Each project entry links to that project's own deep-dive site (`pnlync.github.io/<repo>/`) and
its GitHub repository. Key results in each section are taken from the CV; the charts are
schematic illustrations of each method, not project output.

## Preview

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173/.
