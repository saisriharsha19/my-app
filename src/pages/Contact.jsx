import { Helmet } from 'react-helmet-async';
import { FiArrowUpRight } from 'react-icons/fi';
import { profile } from '../data/profile';

export default function Contact() {
  return <div className="interior-page contact-page page-wrap">
    <Helmet><title>Contact — Sai Sri Harsha Guddati</title><meta name="description" content="Get in touch with Sai Sri Harsha Guddati about software engineering, AI systems, projects, and collaboration." /></Helmet>
    <header className="page-heading"><p className="eyebrow">A CONVERSATION STARTS HERE</p><h1>Interesting problems.<br /><em>Good company.</em></h1></header>
    <div className="contact-layout"><div className="contact-details"><p>Have a project in mind, a question about my work, or an idea worth exploring? I’d love to hear from you.</p><a className="email-link" href={'mailto:' + profile.email}>{profile.email} <FiArrowUpRight /></a><div className="footer-socials"><a href={profile.github} target="_blank" rel="noreferrer">GitHub <FiArrowUpRight /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight /></a><a href={profile.twitter} target="_blank" rel="noreferrer">X <FiArrowUpRight /></a></div><div className="contact-note">The work I’m drawn to:<br />Backend systems · AI infrastructure · Full-stack products</div></div>
    <aside className="contact-form contact-direct"><p className="eyebrow">A NOTE, AN IDEA, A HELLO</p><h2>Let’s start<br />with a conversation.</h2><p>Email me what you’re working on, what you’re curious about, or where you think we could build something useful together.</p><a className="solid-link" href={'mailto:' + profile.email + '?subject=' + encodeURIComponent('Hello Harsha')}>Write me an email <FiArrowUpRight /></a><p className="contact-email-note">Opens a draft in your email app.</p></aside></div>
  </div>;
}
