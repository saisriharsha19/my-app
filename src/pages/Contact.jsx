// src/pages/Contact.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiSend, FiCheck, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('https://backend-482511937770.europe-west1.run.app/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setIsLoading(false);
        setTimeout(() => navigate('/thank-you'), 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const getInputStyle = (field) => ({
    width: '100%',
    padding: '18px 20px',
    borderRadius: '12px',
    background: 'var(--bg-secondary)',
    border: focusedField === field ? '2px solid var(--accent-primary)' : '2px solid var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  });

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px' }}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '80px 24px'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              color: 'white',
              fontSize: '36px'
            }}>
              <FiCheck />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Message Sent!
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>Redirecting...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: '700px', margin: '0 auto' }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '12px',
                letterSpacing: '-0.02em'
              }}>
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Have a project in mind? Let's make something great together.
              </p>
            </div>

            {/* Quick Links */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '40px',
              flexWrap: 'wrap'
            }}>
              <a
                href="mailto:saisriharshaguddati1@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                <FiMail size={16} style={{ color: 'var(--accent-primary)' }} />
                Email Me
              </a>
              <a
                href="https://github.com/saisriharsha19"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <FiGithub size={16} style={{ color: 'var(--accent-primary)' }} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <FiLinkedin size={16} style={{ color: 'var(--accent-primary)' }} />
                LinkedIn
              </a>
            </div>

            {/* Form */}
            <div className="glass-panel" style={{ padding: '40px', borderRadius: '20px' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: 'var(--text-primary)'
                  }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    style={getInputStyle('name')}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: 'var(--text-primary)'
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    style={getInputStyle('email')}
                  />
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: 'var(--text-primary)'
                  }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...getInputStyle('message'),
                      resize: 'vertical',
                      minHeight: '140px'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full justify-center"
                  style={{ padding: '18px', fontSize: '16px' }}
                >
                  {isLoading ? 'Sending...' : <>Send Message <FiSend size={18} /></>}
                </button>
              </form>
            </div>

            {/* Location footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '32px',
              color: 'var(--text-secondary)',
              fontSize: '14px'
            }}>
              <FiMapPin size={14} />
              <span>Based in Gainesville, FL • Available worldwide</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;