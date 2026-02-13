"use client";
import "./topicReveal.css";

function TopicRevealCard({ topic, onReveal }) {
  return (
    <div className="topic-reveal">
      <div className="reveal-container">
        <div className="reveal-sparkles">
          <span className="sparkle s1"></span>
          <span className="sparkle s2"></span>
          <span className="sparkle s3"></span>
          <span className="sparkle s4"></span>
        </div>
        
        <div className="topic-glow-card">
          <div className="card-shine"></div>
          <div className="card-content">
            <div className="topic-label">YOUR CHALLENGE</div>
            <div className="topic-name">{topic}</div>
            <div className="topic-decoration">
              <span className="dec-line"></span>
              <span className="dec-icon">💻</span>
              <span className="dec-line"></span>
            </div>
          </div>
        </div>
      </div>
      
      <button className="reveal-btn" onClick={onReveal}>
        <span className="btn-icon">🚀</span>
        <span className="btn-text">Start Solving </span>
        <span className="btn-arrow">→</span>
      </button>
    </div>
  );
}

export default TopicRevealCard;
