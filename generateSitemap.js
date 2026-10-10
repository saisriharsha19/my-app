const { SitemapStream, streamToPromise } = require('sitemap');
const { writeFile } = require('node:fs/promises');
const journals = require('./src/data/journals.json');
const engineering = require('./src/data/engineering.json');

async function generateSitemap(destination = './public/sitemap.xml') {
  const stream = new SitemapStream({ hostname: 'https://www.saisriharsha.com' });
  const pages = [
    '/', '/blog', '/portfolio', '/experience', '/contact', '/resume',
    '/sai-sri-harsha', '/sri-harsha', '/sai-harsha', '/harsha',
    '/sai-harsha-distributed-systems', '/sri-harsha-ai-engineer',
    '/harsha-guddati-software-engineer', '/sai-sri-harsha-gainesville',
    '/sai-harsha-kubernetes', '/sri-harsha-backend', '/sai-sri-harsha-portfolio',
  ];
  pages.forEach(url => stream.write({ url, changefreq: 'monthly', priority: url === '/' ? 1 : 0.8 }));
  journals.forEach(post => stream.write({ url: '/blog/' + post.id, lastmod: (post.updated_at || post.published_at || post.created_at).slice(0, 10), changefreq: 'monthly', priority: 0.7 }));
  engineering.forEach(project => stream.write({ url: '/portfolio/' + project.slug, lastmod: project.reviewed, changefreq: 'monthly', priority: 0.8 }));
  stream.end();
  await writeFile(destination, await streamToPromise(stream));
}
module.exports = { generateSitemap };
if (require.main === module) generateSitemap().then(() => console.log('Sitemap updated from JSON.')).catch(error => { console.error(error); process.exitCode = 1; });
