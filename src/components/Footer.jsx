import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiArrowUp } from 'react-icons/fi';
import { profile } from '../data/profile';
export default function Footer() {
  return <footer className="site-footer"><div className="page-wrap"><div className="footer-main"><Link className="wordmark" to="/"><img src="/favicon.svg" width="32" height="32" alt="" />harsha</Link><p>Sai Sri Harsha Guddati<br /><span>Software, systems, and a little curiosity.</span></p><div className="footer-socials"><a href={profile.github} target="_blank" rel="noreferrer">GitHub <FiArrowUpRight /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight /></a><a href={'mailto:' + profile.email}>Email <FiArrowUpRight /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Sai Sri Harsha Guddati</span><div><Link to="/resume">Resume</Link><Link to="/contact">Get in touch</Link><button onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>Back to top <FiArrowUp /></button></div></div></div></footer>;
}
