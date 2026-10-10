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
    "export { default as FullPost } from './src/pages/FullPost.jsx';",
    "export { journals, readingMinutes } from './src/data/journals.js';",
    "export { default as Contact } from './src/pages/Contact.jsx';",
    "export { default as Navbar } from './src/components/Navbar.jsx';",
    "export { default as Experience } from './src/pages/ExperiencePage.jsx';",
    "export { default as ProjectVisual } from './src/components/ProjectVisual.jsx';",
    "export { projects } from './src/data/profile.js';",
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
const { render, screen, fireEvent, waitFor, cleanup, act } = await import('@testing-library/react');
const components = (await import(pathToFileURL(modulePath).href)).default;
const h = React.createElement;
function Location() { return h('output', { 'data-testid': 'location' }, useLocation().pathname); }
function mount(Component, path = '/') {
  return render(h(HelmetProvider, null, h(components.ThemeProvider, null,
    h(MemoryRouter, { initialEntries: [path] }, h(components.RouteMetadata), h(Component), h(Location)))));
}
function reset() { cleanup(); sessionStorage.clear(); localStorage.clear(); }

try {
  let contentRequests = 0;
  globalThis.fetch = async () => { contentRequests++; throw new Error('Content must not use the network'); };
  mount(components.Home);
  assert.match(screen.getByRole('heading', { level: 1 }).textContent, /Curiosity/);
  assert.equal(screen.getByRole('img', { name: 'Sai Sri Harsha Guddati' }).getAttribute('fetchpriority'), 'high');
  assert.equal(screen.getByRole('link', { name: /Explore my work/ }).getAttribute('href'), '#selected-work');
  assert.ok(screen.getByRole('heading', { name: /More than/ }));
  assert.ok(screen.getByText('9B+'));
  assert.ok(screen.getByText(/INFRASTRUCTURE PLATFORM ENGINEER IV/));
  assert.ok(!document.body.textContent.includes('P95'));
  assert.equal(document.querySelectorAll('a button').length, 0, 'Animation controls must not be nested inside links');
  reset();
  console.log('PASS: personal homepage, portrait, and navigation');

  mount(components.Portfolio, '/portfolio');
  assert.equal(document.querySelectorAll('.portfolio-card').length, 16);
  fireEvent.click(screen.getByRole('button', { name: 'Data', exact: true }));
  assert.equal(document.querySelectorAll('.portfolio-card').length, 4);
  fireEvent.change(screen.getByRole('textbox', { name: 'Search projects' }), { target: { value: 'nothing matches this' } });
  assert.ok(screen.getByText('No projects match that search.'));
  fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));
  assert.equal(document.querySelectorAll('.portfolio-card').length, 16);
  assert.ok(screen.getByRole('heading', { name: 'IntentGuard' }));
  reset();
  console.log('PASS: JSON portfolio, category filtering, search, and reset');

  mount(components.Experience, '/experience');
  assert.ok(screen.getByText('Infrastructure Platform Engineer IV'));
  assert.ok(screen.getByText('9B+'));
  assert.ok(screen.getByText('Systems Engineer'));
  assert.ok(screen.getByRole('heading', { name: 'M.S. in Computer Science' }));
  assert.ok(!document.body.textContent.includes('Intern'));
  assert.ok(!document.body.textContent.includes('GPA'));
  reset();
  console.log('PASS: current role, shared-platform impact, accurate career and completed education');

  assert.equal(new Set(components.projects.map(project => project.visual)).size, 16);
  for (const project of components.projects) {
    mount(() => h(components.ProjectVisual, { name: project.name, type: project.visual }));
    const diagram = document.querySelector('.project-visual');
    assert.equal(diagram.dataset.animation, project.visual);
    assert.ok(diagram.querySelector('svg.project-diagram'));
    fireEvent.click(screen.getByRole('button', { name: 'Pause animation for ' + project.name }));
    assert.equal(diagram.dataset.active, 'false');
    assert.equal(screen.getByRole('button', { name: 'Play animation for ' + project.name }).getAttribute('aria-pressed'), 'true');
    reset();
  }
  let intersection;
  window.IntersectionObserver = class {
    constructor(callback) { intersection = callback; }
    observe() {}
    disconnect() {}
  };
  mount(() => h(components.ProjectVisual, { name: 'Test project', type: 'streaming' }));
  assert.equal(document.querySelector('.project-visual').dataset.active, 'false');
  act(() => intersection([{ isIntersecting: true }]));
  assert.equal(document.querySelector('.project-visual').dataset.active, 'true');
  act(() => intersection([{ isIntersecting: false }]));
  assert.equal(document.querySelector('.project-visual').dataset.active, 'false');
  reset(); delete window.IntersectionObserver;
  console.log('PASS: 16 distinct project diagrams, pause controls, and offscreen animation suspension');

  const css = await readFile('src/editorial.css', 'utf8');
  const stylesheet = document.createElement('style'); stylesheet.textContent = css; document.head.appendChild(stylesheet);
  mount(components.Home);
  assert.equal(window.getComputedStyle(document.querySelector('.hero-portrait')).transform, 'none');
  assert.equal(window.getComputedStyle(document.querySelector('.portrait-image img')).filter, 'none');
  assert.equal(window.getComputedStyle(document.querySelector('.portrait-image img')).animation, 'none');
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'));
  assert.ok(css.includes('animation: none !important'));
  assert.ok(!css.includes('editorial-enter'));
  reset(); stylesheet.remove();
  console.log('PASS: stationary portrait, no image filters, and reduced-motion support');

  mount(components.Blog, '/blog');
  assert.equal(document.querySelectorAll('.journal-card').length, 6);
  assert.ok(screen.getByRole('heading', { name: 'Nine billion tokens, and the work behind the number' }));
  assert.ok(screen.getByText('30 ARTICLES'));
  fireEvent.change(screen.getByRole('textbox', { name: 'Search articles' }), { target: { value: 'Quantum-AI Convergence' } });
  assert.ok(screen.getByRole('link', { name: /Quantum-AI Convergence/ }));
  fireEvent.change(screen.getByRole('textbox', { name: 'Search articles' }), { target: { value: 'no-such-journal-92834' } });
  assert.ok(screen.getByText('No articles match that search.'));
  fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
  assert.equal(document.querySelectorAll('.journal-card').length, 6);
  fireEvent.click(screen.getByRole('button', { name: '5', exact: true }));
  assert.ok(screen.getByRole('link', { name: /Quantum-AI Convergence/ }));
  reset();
  console.log('PASS: 30 JSON journals, preserved archive, search, and pagination');

  assert.equal(components.journals.length, 30);
  assert.equal(new Set(components.journals.map(post => post.id)).size, 30);
  const newJournals = components.journals.filter(post => !post.archived);
  assert.equal(newJournals.length, 27);
  assert.equal(new Set(newJournals.map(post => post.created_at)).size, 27);
  assert.equal(components.readingMinutes('word '.repeat(440)), 2);
  const journal = components.journals[0];
  mount(() => h(components.FullPost, { postId: journal.id }), '/blog/' + journal.id);
  assert.ok(screen.getByRole('heading', { name: journal.title }));
  assert.equal(document.querySelectorAll('.article-body h2').length, 3);
  assert.equal(document.querySelector('time').getAttribute('datetime'), journal.created_at);
  assert.equal(screen.getByRole('navigation', { name: 'Keep reading' }).querySelectorAll('a').length, 3);
  reset();
  for (const postId of ['7', '8', '9']) {
    const archived = components.journals.find(post => post.id === postId);
    mount(() => h(components.FullPost, { postId }), '/blog/' + postId);
    assert.ok(screen.getByRole('heading', { name: archived.title }));
    assert.ok(document.querySelector('.article-body').textContent.length > 1500);
    reset();
  }
  mount(() => h(components.FullPost, { postId: 'missing-article' }), '/blog/missing-article');
  assert.ok(screen.getByText('This article could not be found.'));
  assert.ok(screen.getByRole('link', { name: /Browse the journal/ }));
  reset();
  const sitemap = await readFile('build/sitemap.xml', 'utf8');
  for (const post of components.journals) {
    assert.match(post.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(post.content.split(/\s+/).length >= 300, 'Article is too short: ' + post.id);
    if (!post.archived) {
      assert.ok(post.created_at >= '2026-01-01' && post.created_at <= '2026-10-08');
      assert.equal(post.published_at, '2026-10-09');
    }
    const document = new JSDOM(await readFile('build/blog/' + post.id + '/index.html', 'utf8')).window.document;
    assert.equal(document.querySelector('h1').textContent, post.title);
    assert.ok(document.querySelector('.article-body').textContent.length > 1500);
    assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
    assert.equal(document.querySelector('link[rel="canonical"]').href, 'https://www.saisriharsha.com/blog/' + post.id);
    assert.equal(document.querySelector('meta[property="og:title"]').content, post.title + ' — Sai Sri Harsha Guddati');
    assert.equal(document.querySelector('time').getAttribute('datetime'), post.created_at);
    const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
    const article = schema['@graph'].find(item => item['@type'] === 'BlogPosting');
    assert.equal(article.headline, post.title);
    assert.equal(article.datePublished, post.published_at);
    assert.equal(article.dateModified, post.updated_at || post.published_at);
    assert.ok(sitemap.includes('<loc>https://www.saisriharsha.com/blog/' + post.id + '</loc>'));
  }
  console.log('PASS: 30 static article pages, 27 varied journal dates, preserved publication metadata, schema, and sitemap');

  mount(components.Contact, '/contact');
  const email = screen.getByRole('link', { name: /Write me an email/ });
  assert.equal(email.getAttribute('href'), 'mailto:saisriharshaguddati1@gmail.com?subject=Hello%20Harsha');
  assert.equal(document.querySelectorAll('form').length, 0);
  assert.ok(screen.getByText('Opens a draft in your email app.'));
  reset();
  await act(async () => {});
  assert.equal(contentRequests, 0, 'Site content and contact must not call a backend');
  console.log('PASS: direct email contact and zero content/backend requests');

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
    assert.equal(new URL(document.querySelector('meta[property="og:image"]').content).pathname, '/social-card.png');
    const schemas = document.querySelectorAll('script[type="application/ld+json"]');
    assert.equal(schemas.length, 1);
    const schema = JSON.parse(schemas[0].textContent);
    assert.equal(schema['@graph'].find(entity => entity['@type'] === 'Person').jobTitle, 'Infrastructure Platform Engineer IV');
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
