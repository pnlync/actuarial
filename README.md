# Actuarial Portfolio Homepage

Static first version of a personal actuarial portfolio homepage.

Live site: https://pnlync.github.io/actuarial/

## Files

- `index.html` - homepage content and section structure
- `projects.html` - full project index (table view)
- `case-study-template.html` - unlinked template for writing up a project (copy, fill, then link from the index)
- `404.html` - not-found page served by GitHub Pages
- `styles.css` - visual system, typography, layout, and responsive rules
- `script.js` - header state and scroll reveal interactions
- `assets/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` - TZ monogram set in Source Sans 3 Bold (outlines, no font dependency)
- `assets/og-image.png` - 1200×630 link-preview image used by `og:image`

## Typography

The site follows the Source Typography System (v1.0), loaded from Google Fonts:

| Role      | Family          | Weights                | Used for                                                    |
| --------- | --------------- | ---------------------- | ----------------------------------------------------------- |
| Structure | Source Sans 3   | 400 / 500 / 600 / 700  | Titles, headings, navigation, buttons, labels, metadata, tables |
| Reading   | Source Serif 4  | 400 / 400i / 600 / 600i | Body copy, descriptions, ledes                              |
| Machine   | Source Code Pro | 400 / 500 / 600        | Code, paths, identifiers, technical badges (`Python`, `SQL`) |

Rules of thumb used in the markup:

- All headings are Source Sans 3. Long statements that are content rather than headings use `.lede` (Serif).
- Tags that describe a method or category (`GLM`, `Reserving`) are Sans. Tags that name a tool or identifier (`Python`, `R`, `SQL`) carry `class="tag-tech"` and render in Code Pro.
- Tables use Source Sans 3 with `font-variant-numeric: tabular-nums`; Code Pro is reserved for genuine character-aligned output.
- Body text is 18px / 1.65 with a maximum measure of `68ch`.

## Preview

Run a local static server from this folder:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

## Update Before Publishing

Every red dashed box on the site is a `.todo` placeholder. Search the HTML for `class="todo"` to find them all:

- Homepage projects: month, year, and context line under each project title.
- Profile: background paragraph, education, experience, availability.
- Contact: GitHub, LinkedIn, and CV PDF links (also add them as `sameAs` in the JSON-LD block in `index.html`).
- Exams: change "Sat" to "Passed" in the hero and profile once results are in.

## Writing a Case Study

1. Copy `case-study-template.html` to a new file at the root, for example `reserving-triangle.html`.
2. Fill each placeholder, delete the template banner and the `noindex` meta tag.
3. Link the page from the matching row in `projects.html` and the project row in `index.html`, and change the status badge from "In preparation" to "Case study".
