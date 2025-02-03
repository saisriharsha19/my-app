import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div className="thank-you-page">
      <h1>Thank You! 🎉</h1>
      <p>Your message has been successfully received.</p>
      <Link to="/" className="return-btn">
        Return to Homepage
      </Link>
    </div>
  );
};

export default ThankYouPage;