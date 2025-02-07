import React, { useEffect, useRef } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import pdf from "../images/resume.pdf";

const Resume = () => {
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

  return (
    <div className="resume-heading">
      <h1>Resume</h1>
      <div className="resume-container">
        <div className="pdf-viewer">
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
            <Viewer fileUrl={pdf} />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default Resume;