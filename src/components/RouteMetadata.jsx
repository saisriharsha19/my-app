import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import { findJournal } from '../data/journals';
const base = 'https://www.saisriharsha.com';
const descriptions = {
  '/': profile.summary,
  '/portfolio': 'Explore IntentGuard, WebLMS, RAG Agent, and projects across AI, distributed systems, and data engineering by Sai Sri Harsha Guddati.',
  '/experience': profile.summary,
  '/blog': 'Engineering notes, ideas, and lessons on software, systems, and AI from Sai Sri Harsha Guddati.',
  '/contact': 'Connect with Sai Sri Harsha Guddati about software engineering, AI systems, and collaboration.',
  '/resume': 'Read and download Sai Sri Harsha Guddati’s software engineering and AI infrastructure resume.',
};
const titles = { '/': 'Sai Sri Harsha Guddati — Software & AI Engineer', '/portfolio': 'Projects — Sai Sri Harsha Guddati', '/experience': 'Experience — Sai Sri Harsha Guddati', '/blog': 'Journal — Sai Sri Harsha Guddati', '/contact': 'Contact — Sai Sri Harsha Guddati', '/resume': 'Resume — Sai Sri Harsha Guddati' };
export default function RouteMetadata() {
  const { pathname } = useLocation();
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  const isAlias = !descriptions[cleanPath] && !cleanPath.startsWith('/blog/');
  const canonical = base + (isAlias || cleanPath === '/' ? '/' : cleanPath);
  const article = findJournal(cleanPath.slice('/blog/'.length));
  const title = article ? article.title + ' — ' + profile.name : titles[cleanPath] || titles['/'];
  const description = article?.summary || descriptions[cleanPath] || descriptions['/'];
  const shareImage = base + '/social-card.png?v=' + profile.assetVersion;
  const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "Person", "@id": base + "/#person", name: profile.name, url: base + "/", image: base + "/profile.webp", jobTitle: profile.role, description: profile.summary, worksFor: { "@type": "Organization", name: profile.employer }, sameAs: [profile.github, profile.linkedin, profile.twitter], knowsAbout: ["AI infrastructure", "LiteLLM", "Kubernetes", "Real-time streaming", "Retrieval-augmented generation", "LLM evaluation"] }, { "@type": "ProfilePage", "@id": base + "/#profile", url: base + "/", name: profile.name, mainEntity: { "@id": base + "/#person" } }, { "@type": "WebSite", url: base + "/", name: "Harsha — " + profile.name, publisher: { "@id": base + "/#person" } }] };
  if (article) schema['@graph'].push({ '@type': 'BlogPosting', '@id': canonical + '#article', headline: article.title, description: article.summary, datePublished: article.published_at || article.created_at, dateModified: article.updated_at || article.published_at || article.created_at, articleSection: article.category, author: { '@id': base + '/#person' }, publisher: { '@id': base + '/#person' }, mainEntityOfPage: canonical, url: canonical, image: shareImage });
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema).replace(/</g, '\\u003c')}</script><link rel="canonical" href={canonical} /><meta property="og:url" content={canonical} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:image" content={shareImage} /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta property="og:image:alt" content="Sai Sri Harsha Guddati — Software, systems, and AI" /><meta property="og:type" content={cleanPath.startsWith('/blog/') ? 'article' : 'website'} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:creator" content="@SriHarsha_19" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={shareImage} /></Helmet>;
}

