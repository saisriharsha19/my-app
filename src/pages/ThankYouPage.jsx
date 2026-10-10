import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
export default function ThankYouPage() {
  return <div className="interior-page page-wrap"><Helmet><title>Message sent — Sai Sri Harsha Guddati</title><meta name="robots" content="noindex,follow" /></Helmet><header className="page-heading"><p className="eyebrow">MESSAGE RECEIVED</p><h1>Thanks for<br /><em>saying hello.</em></h1><p>Your message has been sent. I’ll get back to you when I can.</p></header><div className="resume-actions"><Link className="solid-link" to="/">Back home <FiArrowUpRight /></Link><Link className="text-link" to="/portfolio">Explore the work <FiArrowUpRight /></Link></div></div>;
}
