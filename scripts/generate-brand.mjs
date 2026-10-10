import sharp from 'sharp';
import opentype from 'opentype.js';
import { readFile, writeFile } from 'node:fs/promises';

const logo = await readFile('public/favicon.svg');
const logoURI = 'data:image/svg+xml;base64,' + logo.toString('base64');
const originalMetadata = await sharp('src/images/IMG_6153.webp').metadata();
// User-requested bottom crop: remove the last 10%, including the source mark.
const croppedPortrait = await sharp('src/images/IMG_6153.webp').extract({
  left: 0, top: 0, width: originalMetadata.width, height: Math.floor(originalMetadata.height * .9),
}).toBuffer();
const regularBytes = await readFile('public/fonts/manrope-regular.ttf');
const semiboldBytes = await readFile('public/fonts/manrope-semibold.ttf');
const regular = opentype.parse(regularBytes.buffer.slice(regularBytes.byteOffset, regularBytes.byteOffset + regularBytes.byteLength));
const semibold = opentype.parse(semiboldBytes.buffer.slice(semiboldBytes.byteOffset, semiboldBytes.byteOffset + semiboldBytes.byteLength));
// This is the exact favicon SVG, embedded at its native 64 × 64 dimensions.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
<defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#24365D" stroke-width="0.6"/></pattern><clipPath id="portrait"><rect x="800" y="65" width="330" height="430" rx="4"/></clipPath></defs>
<rect width="1200" height="630" fill="#090F20"/><rect x="730" width="470" height="630" fill="url(#grid)"/>
<image x="58" y="48" width="64" height="64" xlink:href="${logoURI}"/>
<text x="140" y="78" font-family="Segoe UI,Arial,sans-serif" font-size="19" font-weight="600" fill="#EDF3FF">SAI SRI HARSHA GUDDATI</text>
<text x="140" y="103" font-family="Segoe UI,Arial,sans-serif" font-size="12" letter-spacing="2" fill="#9AB1D7">INFRASTRUCTURE PLATFORM ENGINEER IV</text>
<text x="54" y="254" font-family="Segoe UI,Arial,sans-serif" font-size="105" font-weight="600" letter-spacing="-5" fill="#EDF3FF">Behind every</text>
<text x="54" y="362" font-family="Segoe UI,Arial,sans-serif" font-size="105" font-weight="600" letter-spacing="-5" fill="#ACC4FF">good system.</text>
<text x="58" y="415" font-family="Segoe UI,Arial,sans-serif" font-size="20" fill="#B7C8E8">A curious engineer. A thoughtful builder.</text>
<path d="M58 485H680" stroke="#3C527C"/>
<text x="58" y="526" font-family="Segoe UI,Arial,sans-serif" font-size="14" letter-spacing="1.4" fill="#B7C8E8">DISTRIBUTED SYSTEMS  /  AI  /  FULL STACK</text>
<text x="58" y="572" font-family="Segoe UI,Arial,sans-serif" font-size="21" fill="#EDF3FF">saisriharsha.com</text>
<path d="M649 552H671V574M670 553L649 574" stroke="#ACC4FF" stroke-width="2"/>
<rect x="788" y="53" width="354" height="454" rx="5" fill="#263A61"/>
<rect x="800" y="65" width="330" height="430" rx="4" fill="#A0AFA0"/>
<text x="800" y="544" font-family="Segoe UI,Arial,sans-serif" font-size="17" fill="#EDF3FF">Curiosity → code → impact.</text>
<text x="800" y="574" font-family="Segoe UI,Arial,sans-serif" font-size="12" letter-spacing="1.6" fill="#9AB1D7">THE PERSON BEHIND THE WORK</text>
</svg>`;
// Outline the same Manrope typeface used on the website, so exports never
// depend on a viewer having the font installed.
const outlined = svg.replace(/<text\b([^>]*)>([\s\S]*?)<\/text>/g, (_, attributes, encodedText) => {
  const attribute = name => attributes.match(new RegExp(name + '="([^"]*)"'))?.[1];
  const text = encodedText.replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<');
  const font = attribute('font-weight') === '600' ? semibold : regular;
  const size = Number(attribute('font-size'));
  const spacing = Number(attribute('letter-spacing') || 0);
  let cursor = Number(attribute('x'));
  const y = Number(attribute('y'));
  let previous;
  let paths = '';
  for (const glyph of font.stringToGlyphs(text)) {
    if (previous) cursor += font.getKerningValue(previous, glyph) * size / font.unitsPerEm;
    paths += '<path d="' + glyph.getPath(cursor, y, size).toPathData(2) + '" fill="' + attribute('fill') + '"/>';
    cursor += glyph.advanceWidth * size / font.unitsPerEm + spacing;
    previous = glyph;
  }
  return '<g aria-label="' + encodedText + '">' + paths + '</g>';
});
const background = await sharp(Buffer.from(outlined)).png().toBuffer();
const portrait = await sharp(croppedPortrait).resize(330, 430, { fit: 'cover', position: 'attention' }).webp({ quality: 90 }).toBuffer();
await sharp(background).composite([{ input: portrait, left: 800, top: 65 }]).png().toFile('public/social-card.png');
await writeFile('public/social-card.svg', outlined.replace('<rect x="800" y="65" width="330" height="430" rx="4" fill="#A0AFA0"/>', '<image x="800" y="65" width="330" height="430" preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait)" xlink:href="data:image/webp;base64,' + portrait.toString('base64') + '"/>'));
await sharp(logo).png().toFile('public/favicon-64x64.png');
await sharp(logo).resize(32, 32).png().toFile('public/favicon-32x32.png');
await sharp(logo).resize(16, 16).png().toFile('public/favicon-16x16.png');
const faviconPng = await sharp(logo).resize(32, 32).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
ico[6] = 32; ico[7] = 32; ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(faviconPng.length, 14); ico.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([ico, faviconPng]));
await sharp(logo).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(croppedPortrait).webp({ quality: 96, effort: 6 }).toFile('public/profile.webp');
console.log('Exported matching brand assets and social card using the native 64 × 64 SVG.');
