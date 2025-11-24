// src/pages/Resume.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiZoomIn, FiZoomOut, FiMaximize, FiMinimize, FiHome, FiFileText } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { Link } from 'react-router-dom';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import pdf from "../images/resume.pdf";

const Resume = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  
  const lastOrientation = useRef(
    window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape'
  );

  // Create default layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
    toolbarPlugin: {
      fullScreenPlugin: {
        onEnterFullScreen: (zoom) => {
          setIsFullscreen(true);
        },
        onExitFullScreen: (zoom) => {
          setIsFullscreen(false);
        },
      },
    },
  });

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="resume-page">
      {/* Header Section */}
      <motion.div
        className="resume-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="resume-title-section">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="resume-icon"
          >
            <FiFileText />
          </motion.div>
          <div>
            <h1 className="resume-heading">
              My <span className="gradient-text">Resume</span>
            </h1>
            <p className="resume-subtitle">Download or view my professional experience</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="resume-actions">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="action-btn download-btn"
          >
            <FiDownload /> Download PDF
          </motion.button>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="action-btn home-btn"
            >
              <FiHome /> Back Home
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Controls Bar */}
      <motion.div
        className="resume-controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="zoom-controls">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleZoomOut}
            className="control-btn"
            disabled={zoomLevel <= 0.5}
          >
            <FiZoomOut />
          </motion.button>
          
          <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleZoomIn}
            className="control-btn"
            disabled={zoomLevel >= 3}
          >
            <FiZoomIn />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleFullscreen}
          className="control-btn fullscreen-btn"
        >
          {isFullscreen ? <FiMinimize /> : <FiMaximize />}
        </motion.button>
      </motion.div>

      {/* PDF Viewer Container */}
      <motion.div
        ref={containerRef}
        className="resume-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="loading-overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="loading-spinner"
              >
                <HiSparkles />
              </motion.div>
              <p>Loading Resume...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PDF Viewer */}
        <div className="pdf-viewer">
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
            <Viewer
              fileUrl={pdf}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={zoomLevel}
              onDocumentLoad={() => {
                setIsLoading(false);
              }}
            />
          </Worker>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="resume-decoration decoration-1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <motion.div
          className="resume-decoration decoration-2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 5, delay: 1 }}
        />
      </motion.div>

      {/* Quick Info Section */}
      <motion.div
        className="resume-info-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="info-cards">
          <motion.div
            whileHover={{ y: -5 }}
            className="info-card"
          >
            <div className="info-icon">📧</div>
            <div>
              <h3>Email</h3>
              <p>saisriharshaguddati1@gmail.com</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="info-card"
          >
            <div className="info-icon">📱</div>
            <div>
              <h3>Phone</h3>
              <p>+1 352 665 8709</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="info-card"
          >
            <div className="info-icon">🔗</div>
            <div>
              <h3>LinkedIn</h3>
              <a href="https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/" target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
