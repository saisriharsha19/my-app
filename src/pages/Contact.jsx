// src/pages/Contact.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiSend, FiCheck, FiMapPin, FiMessageCircle } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');
    
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      setIsDark(newTheme === 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('https://backend-482511937770.europe-west1.run.app/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setIsLoading(false);
        setTimeout(() => {
          navigate('/thank-you');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      padding: '4rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 800,
      marginBottom: '1rem',
      color: isDark ? '#f1f5f9' : '#1a1a1a'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: isDark ? '#94a3b8' : '#6b7280',
      marginTop: '1rem'
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: '3rem'
    },
    form: {
      background: isDark ? '#1e293b' : '#ffffff',
      padding: '3rem',
      borderRadius: '24px',
      boxShadow: isDark 
        ? '0 20px 60px rgba(0, 0, 0, 0.3)' 
        : '0 20px 60px rgba(0, 0, 0, 0.08)',
      border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.1)' : 'transparent'}`
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 600,
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      fontSize: '0.95rem'
    },
    input: (isFocused) => ({
      width: '100%',
      padding: '1rem',
      border: `2px solid ${isFocused ? '#667eea' : (isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)')}`,
      borderRadius: '12px',
      background: isDark ? '#0f172a' : '#ffffff',
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxShadow: isFocused ? `0 0 0 4px ${isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)'}` : 'none'
    }),
    textarea: (isFocused) => ({
      width: '100%',
      padding: '1rem',
      border: `2px solid ${isFocused ? '#667eea' : (isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)')}`,
      borderRadius: '12px',
      background: isDark ? '#0f172a' : '#ffffff',
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      resize: 'vertical',
      minHeight: '150px',
      fontFamily: 'inherit',
      boxShadow: isFocused ? `0 0 0 4px ${isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)'}` : 'none'
    }),
    submitButton: {
      width: '100%',
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    infoCard: {
      background: isDark ? '#1e293b' : '#ffffff',
      padding: '2rem',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1.5rem',
      boxShadow: isDark 
        ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
        : '0 10px 30px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.1)' : 'transparent'}`
    },
    infoIcon: {
      width: '50px',
      height: '50px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.3rem',
      color: 'white',
      flexShrink: 0
    },
    infoContent: {
      flex: 1
    },
    infoTitle: {
      fontSize: '1.1rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
      color: isDark ? '#f1f5f9' : '#1a1a1a'
    },
    infoText: {
      fontSize: '0.95rem',
      color: isDark ? '#cbd5e1' : '#6b7280',
      wordBreak: 'break-word',
      textDecoration: 'none'
    },
    successMessage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center'
    },
    successIcon: {
      fontSize: '5rem',
      color: '#10b981',
      marginBottom: '1.5rem'
    },
    successTitle: {
      fontSize: '2rem',
      fontWeight: 700,
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      marginBottom: '1rem'
    },
    successText: {
      fontSize: '1.1rem',
      color: isDark ? '#94a3b8' : '#6b7280'
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={styles.title}>
          Let's <span style={styles.gradientText}>Connect</span>
        </h1>
        <p style={styles.subtitle}>Have a project in mind? Let's chat!</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            style={styles.successMessage}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <motion.div
              style={styles.successIcon}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360, 360]
              }}
              transition={{ duration: 0.6 }}
            >
              <FiCheck />
            </motion.div>
            <h2 style={styles.successTitle}>Message Sent!</h2>
            <p style={styles.successText}>Redirecting you to thank you page...</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            style={styles.content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              style={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="Your name"
                  style={styles.input(focusedField === 'name')}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="your@email.com"
                  style={styles.input(focusedField === 'email')}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="Tell me about your project..."
                  style={styles.textarea(focusedField === 'message')}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                style={styles.submitButton}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      ⟳
                    </motion.span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </motion.button>
            </motion.form>

            <motion.div
              style={styles.sidebar}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {[
                { icon: <FiMail />, title: 'Email', text: 'saisriharshaguddati1@gmail.com', href: 'mailto:saisriharshaguddati1@gmail.com' },
                { icon: <FiPhone />, title: 'Phone', text: '+1 352 665 8709', href: 'tel:+13526658709' },
                { icon: <FiMapPin />, title: 'Location', text: 'Gainesville, FL', href: null },
                { icon: <FiMessageCircle />, title: 'Response Time', text: 'Usually within 24 hours', href: null }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  style={styles.infoCard}
                  whileHover={{ y: -5, boxShadow: isDark ? '0 15px 40px rgba(0, 0, 0, 0.4)' : '0 15px 40px rgba(0, 0, 0, 0.12)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <motion.div
                    style={styles.infoIcon}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div style={styles.infoContent}>
                    <h3 style={styles.infoTitle}>{item.title}</h3>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        style={{...styles.infoText, color: '#667eea'}}
                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p style={{...styles.infoText, margin: 0}}>{item.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .contact-content { 
            grid-template-columns: 1fr !important; 
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;