import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('https://personalwebsitebackend-gthafrgadzc2argc.eastus2-01.azurewebsites.net/contact/', {
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

  return (
    <div className="contact-page">
      <h1 className="contactme-heading">Contact Me</h1>
      {submitted ? (
        <div className="success-message">
          <p>✅ Message sent! Redirecting...</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Message:</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Only display the contact information if the form is not submitted */}
          {!submitted && (
            <div className="contact-info">
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="contact-info-icons" />
                <a href="mailto:saisriharshaguddati1@gmail.com">saisriharshaguddati1@gmail.com</a>
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="contact-info-icons" />
                <a href="tel:+13526658709">+1 352 665 8709</a>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Contact;
