import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { profile } from '../data/profile';
import { logEvent } from '../analytics';

export default function Contact() {
  const [data, setData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function submit(event) {
    event.preventDefault(); setLoading(true); setError('');
    try {
      const response = await fetch('https://backend-482511937770.europe-west1.run.app/contact/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error('Submission failed');
      logEvent('generate_lead', 'contact_submit', 'Contact Form');
      navigate('/thank-you');
    } catch {
      setError('Your message could not be sent. Please try again, or use the email link to reach me directly.');
    } finally { setLoading(false); }
  }
  return <div className="interior-page contact-page page-wrap">
    <Helmet><title>Contact — Sai Sri Harsha Guddati</title><meta name="description" content="Get in touch with Sai Sri Harsha Guddati about software engineering, AI systems, projects, and collaboration." /></Helmet>
    <header className="page-heading"><p className="eyebrow">A CONVERSATION STARTS HERE</p><h1>Interesting problems.<br /><em>Good company.</em></h1></header>
    <div className="contact-layout"><div className="contact-details"><p>Have a project in mind, a question about my work, or an idea worth exploring? I’d love to hear from you.</p><a className="email-link" href={'mailto:' + profile.email}>{profile.email} <FiArrowUpRight /></a><div className="footer-socials"><a href={profile.github} target="_blank" rel="noreferrer">GitHub <FiArrowUpRight /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight /></a><a href={profile.twitter} target="_blank" rel="noreferrer">X <FiArrowUpRight /></a></div><div className="contact-note">The work I’m drawn to:<br />Backend systems · AI infrastructure · Full-stack products</div></div>
    <form className="contact-form" onSubmit={submit}><label>YOUR NAME<input name="name" autoComplete="name" required maxLength={150} value={data.name} onChange={event => setData({ ...data, name: event.target.value })} placeholder="How should I call you?" /></label><label>EMAIL ADDRESS<input name="email" type="email" autoComplete="email" required value={data.email} onChange={event => setData({ ...data, email: event.target.value })} placeholder="you@example.com" /></label><label>WHAT’S ON YOUR MIND?<textarea name="message" required maxLength={10000} value={data.message} onChange={event => setData({ ...data, message: event.target.value })} placeholder="A project, an idea, or just a hello…" /></label>{error && <p className="form-error" role="alert">{error}</p>}<button type="submit" className="solid-link" disabled={loading}>{loading ? 'Sending…' : 'Send message'} <FiArrowUpRight /></button></form></div>
  </div>;
}
