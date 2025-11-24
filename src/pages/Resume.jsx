// src/pages/Resume.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { motion } from 'framer-motion';
import { FiDownload, FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import pdf from "../images/resume.pdf";

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lastOrientation = useRef(
    window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape'
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      const newOrientation = window.matchMedia("(orientation: portrait)").matches
        ? 'portrait'
        : 'landscape';
      if (newOrientation !== lastOrientation.current) {
        lastOrientation.current = newOrientation;
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdf;
    link.download = 'SaiSriHarsha_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resume-page-simple">
      {/* Header */}
      <motion.div
        className="resume-header-simple"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>My Resume</h1>
        <div className="resume-actions-simple">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="btn-download"
          >
            <FiDownload /> Download PDF
          </motion.button>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-home"
            >
              <FiHome /> Home
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* PDF Viewer */}
      <motion.div
        className="resume-viewer-simple"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isLoading && (
          <div className="resume-loading">
            <div className="spinner-simple"></div>
            <p>Loading Resume...</p>
          </div>
        )}
        
        <div className="pdf-container-simple">
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
            <Viewer
              fileUrl={pdf}
              onDocumentLoad={() => setIsLoading(false)}
            />
          </Worker>
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        className="resume-contact-simple"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="contact-item-simple">
          <span>📧</span>
          <a href="mailto:saisriharshaguddati1@gmail.com">saisriharshaguddati1@gmail.com</a>
        </div>
        <div className="contact-item-simple">
          <span>📱</span>
          <a href="tel:+13526658709">+1 352 665 8709</a>
        </div>
        <div className="contact-item-simple">
          <span>🔗</span>
          <a href="https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/" target="_blank" rel="noopener noreferrer">
            LinkedIn Profile
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
