'use client';

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DebugSection.css";
import { PYTHON_BUGGY_CODE } from "../data/pythonBuggyCode";
import { C_BUGGY_CODE } from "../data/cBuggyCode"; // added

export default function DebugSection({ topic, score, onScoreChange, onSuccess, onGiveUp, language = "python" }) {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [allFixed, setAllFixed] = useState(false);
  const [showFixedModal, setShowFixedModal] = useState(false);
  const [showGiveUpModal, setShowGiveUpModal] = useState(false);

  // const [comboCount, setComboCount] = useState(0);
  // const [comboMultiplier, setComboMultiplier] = useState(1);
  // const [showComboUI, setShowComboUI] = useState(false);


  //const [scoreTick, setScoreTick] = useState(0);


  
  

  const profile = JSON.parse(
  sessionStorage.getItem("playerProfile") || "{}"
);

//   const getComboMultiplier = (count) => {
//   if (count >= 5) return 2;
//   if (count >= 3) return 1.5;
//   return 1;
// };


/*const getGame = () =>
  JSON.parse(sessionStorage.getItem("gameSession")) || { score: 0 };

const updateScore = (delta) => {
  const game = getGame();
  const updated = Math.max(game.score + delta, 0);
  sessionStorage.setItem(
    "gameSession",
    JSON.stringify({ ...game, score: updated })
  );
  setScoreTick(t => t + 1); // force re-render
};
*/


  const avatars = [
    { id: 0, emoji: "🐶" }, { id: 1, emoji: "🐱" },
    { id: 2, emoji: "🦊" }, { id: 3, emoji: "🐼" },
    { id: 4, emoji: "🐸" }, { id: 5, emoji: "🐯" },
    { id: 6, emoji: "😄" }, { id: 7, emoji: "😎" },
    { id: 8, emoji: "🤓" }, { id: 9, emoji: "🥳" },
    { id: 10, emoji: "😈" }, { id: 11, emoji: "🤩" }
  ];

  const selectedAvatar =
    avatars.find(a => a.id === profile.avatar)?.emoji || "🙂";

  useEffect(() => {
    const source = language === "c" ? C_BUGGY_CODE : PYTHON_BUGGY_CODE;
    if (source[topic]) {
      setCode(source[topic]);
      setProgress(0);
      setResult(null);
      setAttempts(0);
      setAllFixed(false);
    } else {
      setCode("");
    }
  }, [topic, language]);

  const handleCheck = async () => {
  const nextAttempts = attempts + 1;
  setAttempts(nextAttempts);
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
        code,
        attempts: nextAttempts,
        language
      }),
    });

    const data = await res.json();
    setResult(data);

    const newProgress = Number(data.progress) || 0;


    setProgress(newProgress);

    // 🔥 THIS is the important line
    onScoreChange(newProgress);

    if (data.finalStatus === "SUCCESS") {
      setAllFixed(true);
    }

  } catch {
    setResult({ success: false, message: "Server error" });
  }

  setLoading(false);
};

  // const getGame = () =>
  // JSON.parse(sessionStorage.getItem("gameSession")) || { score: 0 };

// const updateScore = (delta) => {
//   const game = getGame();
//   const updated = Math.max(game.score + delta, 0);

//   sessionStorage.setItem(
//     "gameSession",
//     JSON.stringify({ ...game, score: updated })
//   );

//   // keep parent UI in sync
//   onScoreChange(updated);
// };



  const renderCompilerErrors = () => {
  if (!result || !result.wrongLines || result.wrongLines.length === 0) return null;

  return (
    <div className="compiler-box">
      <div className="compiler-header">⚠ Problems</div>

      {result.wrongLines.map((err, idx) => (
        <div key={idx} className="compiler-error">
          <span className="line-number">Line {err.line}</span>
          {err.errorType !== "HINT_LOCKED" && (
  <span className={`error-type ${err.errorType.toLowerCase()}`}>
    {err.errorType}
  </span>
)}

          <div className="error-message">{err.message}</div>
          {err.expected && (
  <pre className="expected-line">
    Expected: {err.expected}
  </pre>
)}

        </div>
      ))}
    </div>
  );
};



  return (
    <div className="debug-section">
      <div className="code-editor-wrapper">
        <div className="code-editor-header">
          <span>🐞</span>
          <span className="editor-title">Debug the Code - {language.toUpperCase()} Editor</span>
        </div>
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
        />
      </div>

      <button className="check-btn" onClick={handleCheck} disabled={loading}>
        {loading ? "🔄 Checking..." : "▶ Run Debug Check"}
      </button>

      {/* 🔥 Combo Feedback */}
{/*{showComboUI && comboMultiplier > 1 && (
  <div className={`combo-pop combo-${comboMultiplier}`}>
    {comboMultiplier === 1.5 && "🔥 Combo x1.5!"}
    {comboMultiplier === 2 && "⚡ Combo x2!"}
  </div>
)}*/}


      {/* Progress */}
      <div className="progress-wrapper">
        <div className="progress-label">
          <span>Debug Progress</span>
          <span className="progress-percentage">{progress}%</span>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Result */}
      {result && (
  <div className={`result-box ${result.success ? "success" : "error"}`}>
    {result.success ? "✅ " : "❌ "} {result.message}
  </div>
)}

      {/* Action Buttons */}
      <div className="debug-actions">
        <button
          className="debug-btn success"
          disabled={!allFixed}
          onClick={() => setShowFixedModal(true)}
        >
          ✓ Fixed It!
        </button>

        <button
  className={`debug-btn fail ${
    attempts < 3 || allFixed ? "disabled" : ""
  }`}
  disabled={attempts < 3 || allFixed}
  title={
    attempts < 3
      ? `You need ${3 - attempts} more attempt(s) before giving up`
      : allFixed
      ? "Already fixed"
      : "Give up"
  }
  onClick={() => {
    if (attempts >= 3 && !allFixed) {
      setShowGiveUpModal(true);
    }
  }}
>
  ✕ Give Up
</button>

      </div>
      {/* SUCCESS MODAL */}
      {showFixedModal && (
  <div className="game-over-overlay">
    <div className="game-over-modal success">

      <div className="modal-glow" />

      {/* 🎉 Confetti */}
      <div className="confetti">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="modal-content">
        <div className="game-over-icon">🎉</div>

        <h2 className="game-over-title">Well Done!</h2>

        <p style={{ opacity: 0.8, marginBottom: "30px" }}>
          You've Successfully Debugged The Code ...!!!
        </p>

        <button
          className="restart-btn"
          onClick={() => onSuccess(progress)}
        >
          Move to Next Question
        </button>
      </div>

    </div>
  </div>
)}

     {/* GIVE UP MODAL */}

      {showGiveUpModal && (
  <div className="game-over-overlay">
    <div className="game-over-modal warning">

      <div className="modal-glow" />

      <div className="modal-content">
        <div className="game-over-icon">⚠</div>

        <h2 className="game-over-title">Give Up?</h2>

        <p style={{ opacity: 0.8, marginBottom: "30px" }}>
          Debugging is hard.  
          But every attempt makes you better !!! 
          <br /> Giving up will reduce your score.<br />
              You won’t be able to retry this question.
        </p>


        <div className="modal-actions">
          <button
            className="restart-btn danger"
            // onClick={() => {
            //   updateScore(-20);
            //   onGiveUp();
            // }}
            onClick={() => {
  onGiveUp();
}}

          >
            Yes, Give Up
          </button>

          <button
            className="restart-btn"
            onClick={() => setShowGiveUpModal(false)}
          >
            No, Continue Debugging
          </button>
        </div>
      </div>

    </div>
  </div>
)}


    </div>
  );
}
