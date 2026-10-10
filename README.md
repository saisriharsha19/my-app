# Harsha — personal website

The portfolio, engineering journey, and journal of [Sai Sri Harsha Guddati](https://www.saisriharsha.com/).

Built with React 18 and Vite, with an editorial identity, locally hosted typography, accessible navigation, and a responsive project archive.

## Development

Use Node 22 (see `.nvmrc`).

```sh
npm ci
npm run dev
```

## Build and verify

```sh
npm run build
npm test
npm run preview
```

The build writes to `build/` and prerenders the six main pages so their headings, biography, and metadata are readable without JavaScript. React provides the interactive experience. Tests cover the current career profile, project filtering, API fallbacks, 16 distinct diagrams, pause controls and offscreen suspension, stationary portraits, journal search, contact error recovery, navigation, theme persistence, and generated metadata. Contact requests are mocked in tests.

## Content and design

- `src/data/profile.js`: personal context, selected projects, and career narrative.
- `src/editorial.css`: responsive design system and locally hosted fonts.
- `src/pages/`: the primary site pages.
- `public/favicon.svg`: the 64 × 64 brand mark.
- `scripts/generate-brand.mjs`: deterministic brand exports using the same SVG, outlined Manrope typography, and the user-requested cropped portrait.
- `scripts/prerender.mjs`: static HTML and metadata export.

The full portfolio and journal use the existing backend API. Selected projects remain readable when the project API is unavailable. The contact page preserves backend submission and provides an actionable error state.

[Brand guidelines](docs/brand-guidelines.md) · [Current content](docs/content-maintenance.md) · [12 design references](docs/design-references.md) · [Launch copy](docs/launch-copy.md)

## Deployment

Pushes to `master` run the existing Azure Static Web Apps workflow. CI installs dependencies with Node 22, builds and tests, then uploads the verified `build/` directory. The root `staticwebapp.config.json` is copied into that output by the prerender step.

Run `node generateSitemap.js` to refresh the sitemap, including published journal entries. Canonical URLs use `https://www.saisriharsha.com`. SEO and sharing metadata aid discovery; recommendations and ranking cannot be guaranteed.

Original code is licensed under [MIT](LICENSE). Font licenses are in `public/fonts/`.
