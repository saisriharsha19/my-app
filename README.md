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

The build writes to `build/` and prerenders 52 pages: six main pages, 30 journals, and 16 engineering project pages. React provides search, filtering, navigation, and theme controls. Tests cover the career profile, technical search, project routes and contracts, 16 diagrams, motion controls, stationary portraits, journal search and pagination, preserved URLs, dates, email contact, and generated metadata. Content tests prohibit backend requests.

## Content and design

- `src/data/profile.json`: personal context, selected projects, and career narrative. `profile.js` exports this content to the components.
- `src/data/journals.json`: all 30 journal entries, including the three original posts at `/blog/7`, `/blog/8`, and `/blog/9`.
- `src/data/engineering.json`: source-linked implementation notes, component flows, API/data contracts, decisions, and scope for all 16 projects.
- `src/data/portfolio-archive.json`: a preserved export of the 15 original public database project records; the current curated projects live in `profile.json`.
- `src/editorial.css`: responsive design system and locally hosted fonts.
- `src/pages/`: the primary site pages.
- `public/favicon.svg`: the 64 × 64 brand mark.
- `scripts/generate-brand.mjs`: deterministic brand exports using the same SVG, outlined Manrope typography, and the user-requested cropped portrait.
- `scripts/prerender.mjs`: static HTML and metadata export.

The website uses repository-managed JSON content, with no database or content API requests at runtime or build time. Contact links open an email draft in the visitor's email app; no message is stored or automatically sent by this site.

[Brand guidelines](docs/brand-guidelines.md) · [Current content](docs/content-maintenance.md) · [12 design references](docs/design-references.md) · [Launch copy](docs/launch-copy.md)

## Deployment

Pushes to `master` run the existing Azure Static Web Apps workflow. CI installs dependencies with Node 22, builds and tests, then uploads the verified `build/` directory. The prerender step extends the root `staticwebapp.config.json` with exact journal routes and generates the sitemap from JSON.

Run `node generateSitemap.js` to refresh the sitemap, including published journal entries. Canonical URLs use `https://www.saisriharsha.com`. SEO and sharing metadata aid discovery; recommendations and ranking cannot be guaranteed.

Original code is licensed under [MIT](LICENSE). Font licenses are in `public/fonts/`.
