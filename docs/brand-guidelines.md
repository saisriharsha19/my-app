# Harsha — personal brand

The identity belongs to Sai Sri Harsha Guddati. The tone is curious, capable, and human. Show real work and specific experience; keep claims grounded in the biography, resume, and public repositories.

## Mark

The source of truth is [favicon.svg](../public/favicon.svg): a geometric H with a separated coral terminal, on a rounded midnight blue tile. Its intrinsic size and viewBox are **64 × 64**. The social card embeds that exact source at **64 × 64**, without redrawing, recoloring, stretching, or cropping it. Preserve clear space of at least 16 px in card compositions. Navigation may scale it proportionally to 32 × 32.

The 16, 32, 64, and 180 px PNGs and the ICO are exported from that same source.

## Palette

| Role | Color |
| --- | --- |
| Main ink / logo surface | #101B35 |
| Dark canvas | #090F20 |
| Paper | #F4F6FA |
| Foreground on dark | #EDF3FF |
| Accent | #ACC4FF |
| Secondary foreground on dark | #B7C8E8 |

Use silver for spacious reading surfaces and midnight blue for emphasis. Cobalt (#255EE8) and ice blue (#ACC4FF) define interactive and highlighted elements. Coral (#FFAA8F) is reserved for the monogram terminal and a few project illustration surfaces. Avoid decorative gradients.

## Typography

Manrope, weights 400–800, is the main typeface. Instrument Serif italic provides occasional editorial emphasis. Use a clear scale: large introductory headings, modest body copy, and small uppercase metadata. Avoid setting whole paragraphs in uppercase or putting competing headlines in one composition.

Both fonts are hosted locally, with their OFL licenses. Card text is exported as Manrope outlines so the SVG and PNG look consistent without installed fonts.

## Photography

Use the actual supplied portrait. Preserve the face, clothing, lighting, and background. The public portrait and sharing card remove the bottom 10% of the source photograph, as requested, to exclude the mark at the bottom. The website uses the full cropped resolution (864 × 1065), encoded at high quality, with no saturation filter, tilt, scale animation, or hover zoom. Keep the source photograph intact for future edits.

## Social card

1200 × 630 px; 58 px left margin; 64 × 64 logo; a large statement on the left and the portrait on the right. Include the full name, engineering focus, and canonical domain. The grid is subtle structure rather than the focal point. Export both PNG for social crawlers and SVG for reuse.

Regenerate the assets with:

```sh
node scripts/generate-brand.mjs
```

Keep text, cards, and portraits stationary and free of filters. Only internal SVG diagram marks animate, on 8–12 second cycles. Pause motion outside the viewport and provide a control on each diagram. Reduced-motion preferences disable all diagram animation. Preserve visible keyboard focus, mobile reflow, and readable contrast.
