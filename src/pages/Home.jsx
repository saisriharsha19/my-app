import React, { useEffect, useState, useMemo } from 'react';
import profileImage from '../images/IMG_6153.jpeg'; // adjust the path/filename as needed

const Home = () => {
    const typewriterTexts = useMemo(() => [
  "I'm a Software Development/AIML Engineer!!",
  "I build creative solutions. \u{2728}",
  "I love coding innovative projects!!!"
    ], []);
  
    const [text, setText] = useState(""); 
    const [isTyping, setIsTyping] = useState(true);
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
  
    useEffect(() => {
      const interval = setTimeout(() => {
        if (isTyping) {
          if (charIndex < typewriterTexts[index].length) {
            setText(prevText => prevText + typewriterTexts[index].charAt(charIndex));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsTyping(false), 1500);
          }
        } else {
          if (charIndex > 0) {
            setText(prevText => prevText.slice(0, -1));
            setCharIndex(charIndex - 1);
          } else {
            setIsTyping(true);
            setIndex((index + 1) % typewriterTexts.length);
          }
        }
      }, isTyping ? 100 : 50);
  
      return () => clearTimeout(interval);
    }, [text, isTyping, charIndex, index, typewriterTexts]);
    
  return (
    <div className="home-page">
      <div className="home-content">
        <p>Hey, I'm</p>
        <h1>Sai Sri Harsha Guddati</h1>
        <p className="typewriter">
          {text}
          <span className="cursor">|</span>
        </p>
      </div>
      <div className="home-image">
        <img src={profileImage} alt="Sai Sri Harsha" />
      </div>

      <div className="bio-section">
        <h3>Hi there! I’m Sai Sri Harsha Guddati</h3>
        <p>
          I’m a software engineer and AI enthusiast, currently pursuing my Master’s in Computer Science at the University of Florida. My work lies at the intersection of backend systems, AI infrastructure, and real-world problem-solving—turning cutting-edge ideas into scalable, production-grade tools.
        </p>
        <p>
          At UF Information Technology, I work as an AI Engineer Intern, developing intelligent assistants powered by LLMs, integrating NeMo Guardrails, Redis, FastAPI, and PostgreSQL. Previously, at Tata Consultancy Services, I led the development of cloud-based AI platforms using Python, Flask, and Azure.
        </p>
        <p>
          My projects span across areas like prompt optimization systems, RAG pipelines, browser privacy extensions, web scrapers, and even sentiment-aware social platforms. I’m passionate about building with purpose—whether it's deploying secure AI workflows, visualizing real-time data, or engineering privacy-first tools using OCR, LLMs, and DOM parsing.
        </p>
        <p>
          Outside of work, I enjoy shipping side projects, experimenting with streaming LLM APIs, and refining AI evaluation systems. I’m a strong believer in thoughtful design, clean code, and pushing the limits of what tech can do—always with a human-first mindset.
        </p>
        <p>
          Thanks for stopping by! If you’re building something meaningful—or just want to jam on ideas—I’d love to connect.
        </p>
      </div>
    </div>
    
  );
};

export default Home;
