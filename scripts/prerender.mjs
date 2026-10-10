import { build } from 'esbuild';
import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const outputDir = resolve('build');
const assets = await readdir(resolve(outputDir, 'assets'));
const temporaryModule = resolve('node_modules/.cache/harsha-prerender.cjs');
await mkdir(resolve('node_modules/.cache'), { recursive: true });
await build({
  entryPoints: ['src/prerender.jsx'], outfile: temporaryModule, bundle: true,
  platform: 'node', format: 'cjs', packages: 'external', jsx: 'automatic',
  plugins: [{ name: 'production-assets', setup(builder) {
    builder.onLoad({ filter: /\.(webp|pdf)$/ }, args => {
      const stem = args.path.split(/[\\/]/).pop().replace(/\.[^.]+$/, '');
      const asset = assets.find(file => file.startsWith(stem + '-'));
      if (!asset) throw new Error('Missing production asset: ' + stem);
      return { contents: 'export default ' + JSON.stringify('/assets/' + asset), loader: 'js' };
    });
  } }],
});
const { render, routes } = (await import(pathToFileURL(temporaryModule).href)).default;
const template = await readFile(resolve(outputDir, 'index.html'), 'utf8');
for (const route of routes) {
  const { html, head } = render(route);
  const cleanHead = template.replace(/<title[^>]*>[\s\S]*?<\/title>/, '').replace(/<(meta|link)\b[^>]*data-rh="true"[^>]*>/g, '');
  const result = cleanHead.replace('</head>', head + '\n</head>').replace('<div id="root"></div>', '<div id="root">' + html + '</div>');
  const destination = route === '/' ? outputDir : resolve(outputDir, route.slice(1));
  await mkdir(destination, { recursive: true });
  await writeFile(resolve(destination, 'index.html'), result);
}
await rm(temporaryModule);
const routing = JSON.parse(await readFile('staticwebapp.config.json', 'utf8'));
const articles = JSON.parse(await readFile('src/data/journals.json', 'utf8'));
routing.routes.unshift(...articles.map(post => ({ route: '/blog/' + post.id, rewrite: '/blog/' + post.id + '/index.html' })));
await writeFile(resolve(outputDir, 'staticwebapp.config.json'), JSON.stringify(routing, null, 2));
let sitemap = await readFile(resolve(outputDir, 'sitemap.xml'), 'utf8');
const entries = articles.filter(post => !sitemap.includes('<loc>https://www.saisriharsha.com/blog/' + post.id + '</loc>')).map(post => '<url><loc>https://www.saisriharsha.com/blog/' + post.id + '</loc><lastmod>' + post.created_at.slice(0, 10) + '</lastmod></url>').join('');
sitemap = sitemap.replace('</urlset>', entries + '</urlset>');
await writeFile(resolve(outputDir, 'sitemap.xml'), sitemap);
console.log('Prerendered ' + routes.length + ' pages with readable HTML and route metadata.');

