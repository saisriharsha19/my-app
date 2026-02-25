// src/components/Footer.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTwitter, FiLinkedin, FiGithub, FiPhone, FiMapPin } from "react-icons/fi";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { logEvent } from "../analytics";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FiTwitter />, url: "https://x.com/SriHarsha_19", label: "Twitter" },
    { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/", label: "LinkedIn" },
    { icon: <FiGithub />, url: "https://github.com/saisriharsha19", label: "GitHub" }
  ];

  const footerLinks = [
    { to: "/", label: "Home" },
    { to: "/portfolio", label: "Projects" },
    { to: "/experience", label: "Experience" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              zIndex: 50,
              fontSize: '18px'
            }}
            aria-label="Scroll to top"
          >
            <HiOutlineChevronDoubleUp />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '2px solid var(--accent-primary)',
        marginTop: '80px'
      }}>
        <div className="container" style={{ padding: '40px 20px 28px' }}>
          {/* Top Section - Flex for mobile, Grid for desktop */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            marginBottom: '28px'
          }}>
            {/* Brand Column - Full width on mobile */}
            <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
              <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '10px' }}>
                <span className="text-gradient" style={{ fontSize: '18px', fontWeight: '700' }}>
                  Sai Sri Harsha
                </span>
              </Link>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '1.5', marginBottom: '12px' }}>
                Software Engineer building modern digital experiences.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    onClick={() => {
                      logEvent('outbound_link', 'click_social', social.label, { link_url: social.url });
                    }}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: hoveredSocial === social.label ? 'var(--accent-primary)' : 'transparent',
                      border: '1px solid var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: hoveredSocial === social.label ? 'white' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      fontSize: '13px'
                    }}
                    onMouseEnter={() => setHoveredSocial(social.label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div style={{ flex: '0 1 120px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Navigate
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {footerLinks.slice(0, 3).map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      style={{
                        color: hoveredLink === link.to ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: '12px',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={() => setHoveredLink(link.to)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Links */}
            <div style={{ flex: '0 1 120px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                More
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {footerLinks.slice(3).map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      style={{
                        color: hoveredLink === link.to ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: '12px',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={() => setHoveredLink(link.to)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/resume"
                    style={{
                      color: hoveredLink === 'resume' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={() => setHoveredLink('resume')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Resume
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div style={{ flex: '1 1 180px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Contact
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                  href="tel:+13526658709"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--text-secondary)',
                    fontSize: '11px',
                    textDecoration: 'none'
                  }}
                >
                  <FiPhone style={{ color: 'var(--accent-primary)', flexShrink: 0 }} size={12} />
                  <span>+13526658709</span>
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '11px' }}>
                  <FiMapPin style={{ color: 'var(--accent-primary)', flexShrink: 0 }} size={12} />
                  <span>Gainesville, FL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--text-secondary)', opacity: 0.15, marginBottom: '16px' }} />

          {/* Bottom Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px', margin: 0 }}>
              © {new Date().getFullYear()} Sai Sri Harsha Guddati
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px', margin: 0 }}>
              Built with React & ❤️
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;