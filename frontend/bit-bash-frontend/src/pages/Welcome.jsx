'use client';

import { useNavigate } from "react-router-dom";
import './Welcome.css'

function Welcome() {
  const navigate = useNavigate();

  // Handle language selection
  const handleLanguageSelect = (language) => {
    // Pass language to player entry page via state
    navigate("/player-entry", { 
      replace: true,
      state: { language: language }
    });
  };

  return (
    <div className="welcome-container">
      {/* Floating Particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Main Content */}
      <div className="welcome-content">
        <span className="year-badge">2026 Edition</span>
        <h1 className="title">Bit Bash Bonanza</h1>
        
        {/* Decorative Icons */}
        <div className="decorative-icons">
          <div className="icon-wrapper">💻</div>
          <div className="icon-wrapper">⚡</div>
          <div className="icon-wrapper">🏆</div>
        </div>
        
        <p className="subtitle">Choose your language to begin the challenge</p>

        <div className="button-group">
          <button
            className="lang-btn python"
            onClick={() => handleLanguageSelect("python")}
          >
            Python
          </button>

          <button 
            className="lang-btn c"
            onClick={() => handleLanguageSelect("c")}
          >
            C
          </button>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
}

export default Welcome;
