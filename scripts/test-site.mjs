import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdir, rm, readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';

const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', { url: 'https://www.saisriharsha.com' });
for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'HTMLInputElement', 'HTMLTextAreaElement', 'Node', 'MutationObserver', 'localStorage', 'sessionStorage']) {
  Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
window.scrollTo = () => {};
globalThis.requestAnimationFrame = callback => setTimeout(callback, 0);
globalThis.cancelAnimationFrame = handle => clearTimeout(handle);
const modulePath = resolve('node_modules/.cache/harsha-test.cjs');
await mkdir(resolve('node_modules/.cache'), { recursive: true });
await build({
  stdin: { contents: [
    "export { default as Home } from './src/pages/Home.jsx';",
    "export { default as Portfolio } from './src/pages/Portfolio.jsx';",
    "export { default as Blog } from './src/pages/Blog.jsx';",
    "export { default as Contact } from './src/pages/Contact.jsx';",
    "export { default as Navbar } from './src/components/Navbar.jsx';",
    "export { default as RouteMetadata } from './src/components/RouteMetadata.jsx';",
    "export { ThemeProvider } from './src/ThemeContext.jsx';",
  ].join('\n'), resolveDir: process.cwd(), loader: 'jsx' },
  outfile: modulePath, bundle: true, platform: 'node', format: 'cjs', packages: 'external', jsx: 'automatic',
  loader: { '.webp': 'dataurl', '.pdf': 'dataurl' },
  define: { 'process.env.NODE_ENV': '"test"' },
});
const React = await import('react');
const { MemoryRouter, useLocation } = await import('react-router-dom');
const { HelmetProvider } = (await import('react-helmet-async')).default;
const { render, screen, fireEvent, waitFor, cleanup } = await import('@testing-library/react');
const components = (await import(pathToFileURL(modulePath).href)).default;
const h = React.createElement;
function Location() { return h('output', { 'data-testid': 'location' }, useLocation().pathname); }
function mount(Component, path = '/') {
  return render(h(HelmetProvider, null, h(components.ThemeProvider, null,
    h(MemoryRouter, { initialEntries: [path] }, h(components.RouteMetadata), h(Component), h(Location)))));
}
function reset() { cleanup(); sessionStorage.clear(); localStorage.clear(); }

try {
  mount(components.Home);
  assert.match(screen.getByRole('heading', { level: 1 }).textContent, /Curiosity/);
  assert.equal(screen.getByRole('img', { name: 'Sai Sri Harsha Guddati' }).getAttribute('fetchpriority'), 'high');
  assert.equal(screen.getByRole('link', { name: /Explore my work/ }).getAttribute('href'), '#selected-work');
  assert.ok(screen.getByRole('heading', { name: /More than/ }));
  reset();
  console.log('PASS: personal homepage, portrait, and navigation');

  globalThis.fetch = async () => { throw new Error('Offline'); };
  mount(components.Portfolio, '/portfolio');
  await screen.findByText(/full project archive is temporarily unavailable/);
  fireEvent.click(screen.getByRole('button', { name: 'Data', exact: true }));
  assert.equal(document.querySelectorAll('.portfolio-card').length, 2);
  fireEvent.change(screen.getByRole('textbox', { name: 'Search projects' }), { target: { value: 'nothing matches this' } });
  assert.ok(screen.getByText('No projects match that search.'));
  fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));
  assert.equal(document.querySelectorAll('.portfolio-card').length, 8);
  reset();
  console.log('PASS: offline portfolio, category filtering, search, and reset');

  globalThis.fetch = async () => ({ ok: true, json: async () => [{ id: 99, title: 'New ETL Project: Data pipeline', description: 'Data processing', project_url: 'https://github.com/example/project' }] });
  mount(components.Portfolio, '/portfolio');
  await screen.findByRole('heading', { name: 'New ETL Project' });
  fireEvent.click(screen.getByRole('button', { name: 'Data', exact: true }));
  assert.equal(document.querySelectorAll('.portfolio-card').length, 1);
  reset();
  console.log('PASS: remote project archive and classification');

  let articleAttempt = 0;
  globalThis.fetch = async () => { if (articleAttempt++ === 0) throw new Error('Unavailable'); return { ok: true, json: async () => [{ id: 1, title: 'Understanding RAG', content: 'A retrieval article', created_at: '2026-10-01', author: 'Harsha' }] }; };
  mount(components.Blog, '/blog');
  await screen.findByText('The journal is temporarily unavailable.');
  fireEvent.click(screen.getByRole('button', { name: /Try again/ }));
  await screen.findByRole('heading', { name: 'Understanding RAG' });
  fireEvent.change(screen.getByRole('textbox', { name: 'Search articles' }), { target: { value: 'absent' } });
  assert.ok(screen.getByText('No articles match that search.'));
  fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
  assert.ok(screen.getByRole('link', { name: /Understanding RAG/ }));
  reset();
  console.log('PASS: journal retry, loaded articles, and search');

  globalThis.fetch = async () => ({ ok: false });
  mount(components.Contact, '/contact');
  fireEvent.change(screen.getByRole('textbox', { name: 'YOUR NAME' }), { target: { value: 'Test Visitor' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'EMAIL ADDRESS' }), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'WHAT’S ON YOUR MIND?' }), { target: { value: 'A test message' } });
  fireEvent.submit(document.querySelector('form'));
  await screen.findByRole('alert');
  assert.equal(screen.getByRole('button', { name: /Send message/ }).disabled, false);
  let sent;
  globalThis.fetch = async (url, options) => { sent = JSON.parse(options.body); return { ok: true }; };
  fireEvent.submit(document.querySelector('form'));
  await waitFor(() => assert.equal(screen.getByTestId('location').textContent, '/thank-you'));
  assert.equal(sent.email, 'test@example.com');
  reset();
  console.log('PASS: contact failure recovery, payload, and success route (mocked; no messages sent)');

  mount(components.Navbar);
  const menu = screen.getByRole('button', { name: 'Open navigation' });
  fireEvent.click(menu);
  assert.equal(menu.getAttribute('aria-expanded'), 'true');
  fireEvent.keyDown(window, { key: 'Escape' });
  assert.equal(menu.getAttribute('aria-expanded'), 'false');
  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
  assert.equal(document.documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(localStorage.getItem('theme'), 'dark');
  fireEvent.click(screen.getByRole('link', { name: 'Work', exact: true }));
  await waitFor(() => assert.equal(screen.getByTestId('location').textContent, '/portfolio'));
  await waitFor(() => assert.equal(document.querySelector('link[rel="canonical"]').href, 'https://www.saisriharsha.com/portfolio'));
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
  reset();
  console.log('PASS: menu, Escape, theme persistence, route navigation, and canonical metadata');

  for (const route of ['', '/portfolio', '/experience', '/contact', '/resume', '/blog']) {
    const file = await readFile('build' + route + '/index.html', 'utf8');
    const document = new JSDOM(file).window.document;
    assert.ok(document.querySelector('#root main h1'), 'Missing prerendered heading: ' + route);
    assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
    assert.equal(document.querySelectorAll('meta[name="description"]').length, 1);
    assert.ok(document.querySelector('meta[property="og:image"]').content.endsWith('/social-card.png'));
    JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
  }
  console.log('PASS: six static pages, unique canonical and description, social cards, and valid JSON-LD');
  const logo = await readFile('public/favicon.svg', 'utf8');
  const card = await readFile('public/social-card.svg', 'utf8');
  const cardMetadata = await sharp('public/social-card.png').metadata();
  assert.equal(cardMetadata.width, 1200);
  assert.equal(cardMetadata.height, 630);
  assert.ok(logo.includes('width="64" height="64" viewBox="0 0 64 64"'));
  assert.ok(card.includes('width="64" height="64" xlink:href="data:image/svg+xml;base64,' + Buffer.from(logo).toString('base64')));
  console.log('PASS: 1200 × 630 sharing card with exact native 64 × 64 SVG source');
  const routing = JSON.parse(await readFile('build/staticwebapp.config.json', 'utf8'));
  const normalizedRoutes = routing.routes.map(rule => rule.route.replace(/\/$/, ''));
  assert.equal(new Set(normalizedRoutes).size, normalizedRoutes.length, 'Azure treats trailing-slash routes as duplicates');
  for (const rule of routing.routes.filter(rule => rule.rewrite)) {
    await readFile('build' + rule.rewrite);
  }
  console.log('PASS: unique Azure route rules and existing prerender targets');
} finally { cleanup(); await rm(modulePath); dom.window.close(); }
