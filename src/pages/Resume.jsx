import { Helmet } from 'react-helmet-async';
import { FiDownload, FiArrowUpRight } from 'react-icons/fi';
import pdf from '../images/resume.pdf';
import { logEvent } from '../analytics';
export default function Resume() {
  return <div className="interior-page page-wrap"><Helmet><title>Resume — Sai Sri Harsha Guddati</title><meta name="description" content="Read and download Sai Sri Harsha Guddati’s resume, covering software engineering, backend systems, and AI infrastructure." /></Helmet><header className="page-heading"><p className="eyebrow">THE DETAILS, IN ONE PLACE</p><h1>The story,<br /><em>on paper.</em></h1><p>My experience, education, and technical background. View the document below or take a copy with you.</p></header><div className="resume-actions"><a className="solid-link" href={pdf} download="SaiSriHarsha_Resume.pdf" onClick={() => logEvent('file_download', 'download_resume', 'Resume PDF', { file_extension: 'pdf' })}>Download resume <FiDownload /></a><a className="text-link" href={pdf} target="_blank" rel="noreferrer">Open PDF <FiArrowUpRight /></a></div><p className="content-notice">If your browser doesn’t display PDFs, use the download or open link above.</p><iframe className="resume-frame" src={pdf} title="Sai Sri Harsha Guddati’s resume" /></div>;
}
