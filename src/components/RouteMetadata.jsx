import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
const base = 'https://www.saisriharsha.com';
const descriptions = {
  '/': 'Sai Sri Harsha Guddati builds software, distributed systems, and AI infrastructure. Explore his projects, engineering journey, and writing.',
  '/portfolio': 'Explore AppTrack, WebLMS, RAG Agent, and projects across AI, distributed systems, and data engineering by Sai Sri Harsha Guddati.',
  '/experience': 'The engineering journey of Sai Sri Harsha Guddati: University of Florida IT, Tata Consultancy Services, and Internshala.',
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
  const title = titles[cleanPath] || titles['/'];
  const description = descriptions[cleanPath] || descriptions['/'];
  return <Helmet><link rel="canonical" href={canonical} /><meta property="og:url" content={canonical} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:image" content={base + '/social-card.png'} /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta property="og:image:alt" content="Sai Sri Harsha Guddati — Software, systems, and AI" /><meta property="og:type" content={cleanPath.startsWith('/blog/') ? 'article' : 'website'} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:creator" content="@SriHarsha_19" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={base + '/social-card.png'} /></Helmet>;
}

