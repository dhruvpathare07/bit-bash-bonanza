import React, { useState, useEffect, useRef } from 'react';
import './Results.css';
import html2pdf from 'html2pdf.js';
import logo from "../assets/bnb_logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";




const Results = () => {
  // Sample score data - replace with actual data from your game
//   const scoreData = [
//     { questionNum: 1, scoreObtained: 10, timeTaken: '2:34' },
//     { questionNum: 2, scoreObtained: 8, timeTaken: '3:12' },
//     { questionNum: 3, scoreObtained: 10, timeTaken: '1:58' }
//   ];

// const [profile, setProfile] = useState(null);
const [results, setResults] = useState({});
const navigate = useNavigate();



useEffect(() => {
  const storedProfile =
    JSON.parse(sessionStorage.getItem("playerProfile")) || {};

  const allResults =
    JSON.parse(sessionStorage.getItem("bbbResults")) || {};

  const language = storedProfile?.language?.toLowerCase() || "python";
  const storedResults = allResults[language] || {};

  setResults(storedResults);

  // Mark ready AFTER results set
  setTimeout(() => {
    setDataReady(true);
  }, 100);
}, []);


// const scoreData = [
//   { questionNum: 1, ...results.Q1 },
//   { questionNum: 2, ...results.Q2 },
//   { questionNum: 3, ...results.Q3 },
// ].filter(q => q && typeof q.score === "number");

const scoreData = React.useMemo(() => {
  return [
    { questionNum: 1, ...results.Q1 },
    { questionNum: 2, ...results.Q2 },
    { questionNum: 3, ...results.Q3 },
  ].filter(q => q && typeof q.score === "number");
}, [results]);


const formatTime = (seconds = 0) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
};


  const totalScore = scoreData.reduce(
  (acc, q) => acc + (q.score || 0),
  0
);

const totalTime = scoreData.reduce(
  (acc, q) => acc + (q.timeTaken || 0),
  0
);

  const totalTimeFormatted = formatTime(totalTime);

  const [animatedScore, setAnimatedScore] = useState(0);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

useEffect(() => {
  if (totalScore === 0) {
    setAnimatedScore(0);
    return;
  }

  let start = 0;
  const duration = 1000;
  const increment = totalScore / (duration / 16);

  const counter = setInterval(() => {
    start += increment;
    if (start >= totalScore) {
      start = totalScore;
      clearInterval(counter);
    }
    setAnimatedScore(Math.floor(start));
  }, 16);

  return () => clearInterval(counter);
}, [totalScore]);


  const [showNextRoundAlert, setShowNextRoundAlert] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const scoreboardRef = useRef(null);
  const [dataReady, setDataReady] = useState(false);


  const profile = JSON.parse(
  sessionStorage.getItem("playerProfile") || "{}"
);

const avatars = [
  { id: 0, emoji: "🐶" },
  { id: 1, emoji: "🐱" },
  { id: 2, emoji: "🦊" },
  { id: 3, emoji: "🐼" },
  { id: 4, emoji: "🐸" },
  { id: 5, emoji: "🐯" },
  { id: 6, emoji: "😄" },
  { id: 7, emoji: "😎" },
  { id: 8, emoji: "🤓" },
  { id: 9, emoji: "🥳" },
  { id: 10, emoji: "😈" },
  { id: 11, emoji: "🤩" }
];

  const selectedAvatar =
  avatars.find(a => a.id === profile.avatar)?.emoji || "🙂";


  const getTitle = () => {
  if (totalScore >= 450) return "👑 Debugger God";
  if (totalScore >= 340) return "🧙 Code Wizard";
  if (totalScore >= 230) return "⚡ Bug Hunter";
  if (totalScore >= 120) return "💻 Syntax Soldier";
  return "🐣 Rookie Coder";
};

const fastestQuestion = scoreData.reduce((fastest, current) => {
  if (!fastest) return current;
  return current.timeTaken < fastest.timeTaken ? current : fastest;
}, null);


const playerTitle = getTitle();


  // Confetti animation on mount
  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1
    }));
    setConfetti(particles);
  }, []);

  // Auto-show next round alert after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNextRoundAlert(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleNextRound = () => {
    alert('Moving to Next Round! 🚀');
    // Add your navigation logic here
    navigate("/round-2");
  };
  const pdfRef = useRef(null);

/* HANDLE PDF FUNCTION */

const element = scoreboardRef.current;


const handleDownloadPDF = async () => {
  const element = scoreboardRef.current;
  if (!element) return;

  setIsDownloadingPDF(true);

  try {
    element.classList.add("pdf-mode");

    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#0b0f1a"
    });

    element.classList.remove("pdf-mode");

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`BitBashBonanza_Scoreboard_${profile?.username}.pdf`);
  } finally {
    setIsDownloadingPDF(false);
  }
};


  return (
    <div className="results-container">
      {/* Confetti Animation */}
      <div className="confetti-container">
        {confetti.map(particle => (
          <div
            key={particle.id}
            className="confetti-particle"
            style={{
              left: `${particle.left}%`,
              animation: `confettiFall ${particle.duration}s linear ${particle.delay}s forwards`,
              '--color': ['#7c5cff', '#006d2d', '#ff4ecd', '#4dd0ff', '#f39c12'][particle.id % 5]
            }}
          />
        ))}
      </div>

      {/* Animated Background Grid */}
      <div className="results-bg-grid" />

      <div className="results-content" ref={scoreboardRef}>
        {/* Header Section */}
        <div className="results-header">
          <div className="results-header-top">
            <h1 className="results-game-title">BIT BASH BONANZA 2026</h1>
            <div className="language-badge">{profile?.language}</div>
          </div>
          <div className="scoreboard-title">Round 1 : Spin-N-Solve </div>
          <div className="scoreboard-title"> <span className='score-fastest-badge'> 🏆 </span> SCORE BOARD <span className='score-fastest-badge'> 🏆 </span></div>
        </div>

        {/* User Info Section */}
        <div className="user-info-section">
          <div className="user-avatar-wrapper">
            <div className="user-avatar">{selectedAvatar}</div>
          </div>

          <div className="user-details">
            <div className="full-name-box">
              <span className="label">FULL NAME :</span>
              <span className="value">{profile?.fullName}</span>
            </div>

            <div className="user-row">
              <div className="class-box">
                <span className="label">CLASS NAME :</span>
                <span className="value">{profile?.className}</span>
              </div>
              <div className="username-box">
                <span className="label">USERNAME :</span>
                <span className="value">{profile?.username}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scores Table Section */}
        <div className="scores-section">
          <div className="table-wrapper">
            <div className="table-header">
              <div className="header-cell serial">SR. NO.</div>
              <div className="header-cell score" style={{textAlign : "center", justifyContent : "center"}}>SCORE</div>
              <div className="header-cell time">TIME TAKEN</div>
            </div>

            {scoreData.map((item, index) => (
  <div 
    key={index} 
    className={`table-row ${
      fastestQuestion?.questionNum === item.questionNum ? "fastest" : ""
    }`}
  >

                <div className="table-cell serial">
  <span className="question-num">
    QUESTION {item.questionNum}
    {fastestQuestion?.questionNum === item.questionNum && (
      <span className="fastest-badge"> ⚡ FASTEST</span>
    )}
  </span>
</div>

                <div className="table-cell score">
                  <span className="score-obtained">{item.score}</span>
                </div>
                <div className="table-cell time">
                  <span className="time-value">
  {formatTime(item.timeTaken)}
</span>

                </div>
              </div>
            ))}
          </div>

          {/* Total Score & Time Boxes */}
          <div className="summary-boxes">
            <div className="summary-box total-score">
              <span className="summary-label">TOTAL SCORE :</span>
              <span className="summary-value">{animatedScore}</span>

            </div>
            <div className="summary-box total-time">
              <span className="summary-label">TOTAL TIME TAKEN :</span>
              <span className="summary-value">{totalTimeFormatted}</span>
            </div>
          </div>
        </div>

        {/* Player Title Badge */}
<div className="badge-section">
  <div className="badge-card">
    {playerTitle}
  </div>
</div>


        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn btn-download" onClick={handleDownloadPDF} disabled={isDownloadingPDF}>
            {isDownloadingPDF ? (
              <>
                <span className="spinner"></span> Generating PDF...
              </>
            ) : (
              '📥 Download as PDF'
            )}
          </button>
          <button className="btn btn-next-round" onClick={handleNextRound}>
            🚀 Next Round
          </button>
        </div>

        {/* Footer */}
        <div className="results-footer">
  <div className="footer-box footer-powered">
    <img src={logo} alt="Bits N Bytes Logo" className="footer-logo" />


    <div className="footer-text">
      <div className="powered-by">POWERED BY</div>
      <div className="committee-name" style={{marginLeft :'10px'}}> Bits 'N' Bytes Committee</div>
    </div>
  </div>
</div>

      </div>

      {/* Next Round Alert Modal */}
      {showNextRoundAlert && (
        <div className="result-modal-overlay">
          <div className="result-modal-content">
            <div className="result-modal-header">
              <h2>🎉 Round Complete!</h2>
              <button className="result-modal-close" onClick={() => setShowNextRoundAlert(false)}>✕</button>
            </div>
            <p className="result-modal-text">Ready to take on the next challenge?</p>
            <div className="result-modal-stats">
              <div className="result-stat">
                <span className="result-stat-label">Your Score</span>
                <span className="result-stat-value">{totalScore} / 800</span>
              </div>
              <div className="result-stat">
                <span className="result-stat-label">Time Taken</span>
                <span className="result-stat-value">{totalTimeFormatted}</span>
              </div>
            </div>
            <div className="result-modal-buttons">
              <button className="result-btn-modal cancel" onClick={() => setShowNextRoundAlert(false)}>
                Review Score
              </button>
              <button className="result-btn-modal confirm" onClick={handleNextRound}>
                Start Next Round →
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <div className="pdf-wrapper" ref={pdfRef}>
  <div className="results-content pdf-mode">

    <div className="results-header">
      <div className="results-header-top">
        <h1 className="results-game-title">BIT BASH BONANZA 2026</h1>
        <div className="language-badge">{profile?.language}</div>
      </div>
      <div className="scoreboard-title">SCORE BOARD</div>
    </div>

    <div className="user-info-section">
      <div className="user-avatar-wrapper">
        <div className="user-avatar">{selectedAvatar}</div>
      </div>

      <div className="user-details">
        <div className="full-name-box">
          <span className="label">FULL NAME :</span>
          <span className="value">{profile?.fullName}</span>
        </div>

        <div className="user-row">
          <div className="class-box">
            <span className="label">CLASS NAME :</span>
            <span className="value">{profile?.className}</span>
          </div>
          <div className="username-box">
            <span className="label">USERNAME :</span>
            <span className="value">{profile?.username}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="scores-section">
      <div className="table-wrapper">

        <div className="table-header">
          <div className="header-cell">SR. NO.</div>
          <div className="header-cell">SCORE</div>
          <div className="header-cell">TIME TAKEN</div>
        </div>

        {scoreData.map((item, index) => (
          <div
            key={index}
            className={`table-row ${
              fastestQuestion?.questionNum === item.questionNum
                ? "fastest pdf-fastest"
                : ""
            }`}
          >
            <div className="table-cell">
              <span className="question-num">
                QUESTION {item.questionNum}
                {fastestQuestion?.questionNum === item.questionNum && (
                  <span className="fastest-badge pdf-fastest-badge">
                    ⚡ FASTEST
                  </span>
                )}
              </span>
            </div>

            <div className="table-cell">
              <span className="score-obtained">{item.score}</span>
            </div>

            <div className="table-cell">
              <span className="time-value">
                {formatTime(item.timeTaken)}
              </span>
            </div>
          </div>
        ))}

      </div>

      <div className="summary-boxes">
        <div className="summary-box total-score">
          <span className="summary-label">TOTAL SCORE :</span>
          <span className="summary-value">{totalScore}</span>
        </div>

        <div className="summary-box total-time">
          <span className="summary-label">TOTAL TIME TAKEN :</span>
          <span className="summary-value">{totalTimeFormatted}</span>
        </div>
      </div>
    </div>

    <div className="badge-section">
      <div className="badge-card pdf-badge">
        {playerTitle}
      </div>
    </div>

    <div className="results-footer">
      <div className="footer-box footer-powered">
        <img src={logo} alt="Bits N Bytes Logo" className="footer-logo" />
        <div className="footer-text">
          <div className="powered-by">POWERED BY</div>
          <div className="committee-name">Bits 'N' Bytes Committee</div>
        </div>
      </div>
    </div>

  </div>
</div> */}

    </div>
    
  );
};

export default Results;
