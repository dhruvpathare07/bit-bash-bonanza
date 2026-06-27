import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/round2.css';

const Round2 = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/blind-coding');
  };

  return (
    <div className="welcome-container">
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="decorative-icons">
        <div className="icon-wrapper">💻</div>
        <div className="icon-wrapper">👁️‍🗨️</div>
        <div className="icon-wrapper">🏆</div>
      </div>

      <div className="monitor">
        <div className="monitor-screen">
          <div className="welcome-content">
            <span className="year-badge">Round - 2</span>
            <h1 className="title">Bit Bash Bonanza</h1>
            <p className="subtitle">Blind Coding</p>

            <div style={{ marginTop: 30 }}>
              <button className="lang-btn python" onClick={handleStart}>
                Start
              </button>
            </div>
          </div>
        </div>
        <div className="power-button"></div>
      </div>
    </div>
  );
};

export default Round2;
