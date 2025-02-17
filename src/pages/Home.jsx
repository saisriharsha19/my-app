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
          I’m a software engineer with a passion for building creative, impactful solutions. I’m currently pursuing my Master’s Degree in Computer Science at the University of Florida, where I get to explore the latest in machine learning, cloud computing, and software development.
        </p>
        <p>
          My journey so far has taken me from developing innovative cloud systems and AI projects at Tata Consultancy Services to diving into hands-on work with technologies like Python, Flask, React, and many more. I love the challenge of turning complex problems into user-friendly, scalable solutions that make a real difference.
        </p>
        <p>
          Beyond the code, I’m all about continuous learning and collaboration. Whether I’m fine-tuning a machine learning model, optimizing a database, or just brainstorming with a team, I’m always looking for ways to push the boundaries and improve. I’m also proud of the personal projects I’ve built—like a text redaction tool and a data visualization app—which have allowed me to combine my technical skills with my creative side.
        </p>
        <p>
          When I’m not immersed in tech, you might find me exploring new technologies, working on side projects, or simply enjoying some time away from the screen. I believe in keeping things human, approachable, and always open to new ideas.
        </p>
        <p>
          Thanks for stopping by, and feel free to reach out if you want to chat or collaborate on something exciting!
        </p>
      </div>
    </div>
    
  );
};

export default Home;
