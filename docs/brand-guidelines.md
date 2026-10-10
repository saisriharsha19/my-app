# Harsha — personal brand

The identity belongs to Sai Sri Harsha Guddati. The tone is curious, capable, and human. Show real work and specific experience; keep claims grounded in the biography, resume, and public repositories.

## Mark

The source of truth is [favicon.svg](../public/favicon.svg): a geometric H with a separated lime terminal, on a rounded teal tile. Its intrinsic size and viewBox are **64 × 64**. The social card embeds that exact source at **64 × 64**, without redrawing, recoloring, stretching, or cropping it. Preserve clear space of at least 16 px in card compositions. Navigation may scale it proportionally to 32 × 32.

The 16, 32, 64, and 180 px PNGs and the ICO are exported from that same source.

## Palette

| Role | Color |
| --- | --- |
| Main ink / logo surface | #183B36 |
| Dark canvas | #102D29 |
| Paper | #F2F3ED |
| Foreground on dark | #EDF3E8 |
| Accent | #C5EC86 |
| Secondary foreground on dark | #B6CDC0 |

Use paper for spacious reading surfaces, teal for emphasis, and lime sparingly for the mark, directional details, and selected typography. Avoid decorative gradients.

## Typography

Manrope, weights 400–800, is the main typeface. Instrument Serif italic provides occasional editorial emphasis. Use a clear scale: large introductory headings, modest body copy, and small uppercase metadata. Avoid setting whole paragraphs in uppercase or putting competing headlines in one composition.

Both fonts are hosted locally, with their OFL licenses. Card text is exported as Manrope outlines so the SVG and PNG look consistent without installed fonts.

## Photography

Use the actual supplied portrait. Preserve the face, clothing, lighting, and background. The public portrait and sharing card remove the bottom 10% of the source photograph, as requested, to exclude the mark at the bottom. Keep the source photograph intact for future edits.

## Social card

1200 × 630 px; 58 px left margin; 64 × 64 logo; a large statement on the left and the portrait on the right. Include the full name, engineering focus, and canonical domain. The grid is subtle structure rather than the focal point. Export both PNG for social crawlers and SVG for reuse.

Regenerate the assets with:

```sh
node scripts/generate-brand.mjs
```

Keep reduced-motion support, visible keyboard focus, mobile reflow, and readable contrast in future site changes.
