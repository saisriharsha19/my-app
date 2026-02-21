// src/pages/Resume.jsx
import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { motion } from 'framer-motion';
import { FiDownload, FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import pdf from "../images/resume.pdf";

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdf;
    link.download = 'SaiSriHarsha_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px' }}>
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          My <span className="text-gradient">Resume</span>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <FiDownload /> Download PDF
          </button>

          <Link to="/">
            <button className="btn-secondary flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5">
              <FiHome /> Home
            </button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="glass-panel p-4 md:p-8 rounded-3xl overflow-hidden relative min-h-[500px]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gray-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
            <p className="font-semibold text-secondary">Loading Resume...</p>
          </div>
        )}

        <div className="rounded-xl overflow-hidden shadow-sm bg-white border border-gray-200">
          <Worker workerUrl="/pdf.worker.min.js">
            <Viewer
              fileUrl={pdf}
              onDocumentLoad={() => setIsLoading(false)}
            />
          </Worker>
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;