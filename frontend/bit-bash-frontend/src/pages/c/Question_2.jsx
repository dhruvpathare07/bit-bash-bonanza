"use client";
import { useState, useEffect } from "react";
import TopicSwiper from "../../components/TopicSwiper";
import CodeAssembler from "../../components/CodeAssembler";
import TopicRevealCard from "../../components/TopicRevealCard";
import Timer from "../../components/Timer";
import DebugSection from "../../components/DebugSection";
import { useNavigate } from "react-router-dom";
import { C_EXPECTED_OUTPUT } from "../../data/cExpectedOutput";
import "../question.css";
import { initProgress, getProgress, completeQuestion } from "../../utils/progress";

export default function Question_2() {
  const [phase, setPhase] = useState("wheel");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [assemblyCompleted, setAssemblyCompleted] = useState(false);
  const [currentTimeLeft, setCurrentTime] = useState(600);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    initProgress();
    const progress = getProgress();
    if (progress?.completed?.q2) {
      setIsLocked(true);
    }
  }, []);

  const playerProfile = JSON.parse(sessionStorage.getItem("playerProfile")) || {};

  const AVATARS = ["🐶","🐱","🦊","🐼","🐸","🐯","😄","😎","🤓","🥳","😈","🤩"];
  const avatarsMap = (id) => AVATARS[id] || "🙂";

  const MEDIUM_TOPICS = [
    "Armstrong",
    "Fibonacci",
    "Array Reverse",
    "Palindrome",
    "Sum Of Array Elements",
  ];

  const navigate = useNavigate();

  const saveQuestionScore = (questionNo, score, elapsedTime) => {
    const results = JSON.parse(localStorage.getItem("bbbResults")) || {};
    results[`Q${questionNo}`] = {
      score,
      timeTaken: elapsedTime,
      completedAt: Date.now(),
    };
    localStorage.setItem("bbbResults", JSON.stringify(results));
  };

  useEffect(() => {
    const game = JSON.parse(sessionStorage.getItem("gameSession")) || {};
    if (game.score !== undefined) {
      setScore(game.score);
    }
  }, []);

  useEffect(() => {
    const game = JSON.parse(sessionStorage.getItem("gameSession")) || {};
    sessionStorage.setItem(
      "gameSession",
      JSON.stringify({ ...game, currentQuestion: 2 })
    );
  }, []);

  const getGameSession = () =>
    JSON.parse(sessionStorage.getItem("gameSession"));

  const [score, setScore] = useState(() => {
    const game = getGameSession();
    return game?.score ?? 0;
  });

  const updateScore = (delta) => {
    setScore(prev => {
      const updated = Math.max(prev + delta, 0);
      const game = getGameSession() || {};
      sessionStorage.setItem(
        "gameSession",
        JSON.stringify({ ...game, score: updated })
      );
      return updated;
    });
  };

  const getTimeBonus = (elapsedTime) => {
    if (elapsedTime <= 120) return 50;
    if (elapsedTime <= 240) return 30;
    return 10;
  };

  useEffect(() => {
    const profile = sessionStorage.getItem("playerProfile");
    if (!profile) {
      navigate("/", { replace: true });
    }
  }, []);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setPhase("topic");
  };

  const startAssembly = () => {
    setAssemblyCompleted(false);
    setPhase("assembly");
  };

  const unlockDebug = () => {
    updateScore(75);
    setAssemblyCompleted(true);
  };

  const handleDebugFail = () => {
    updateScore(-10);
  };

  const onTimeUp = () => {
    const elapsedTime = 600 - currentTimeLeft;
    saveQuestionScore(2, score, elapsedTime);
    completeQuestion(2);
    setIsGameOver(true);
  };

  if (isLocked) {
    return (
      <div className="locked-screen">
        <h2>🔒 Question 2 Completed</h2>
        <p>You've already completed this question. Please proceed to the next one.</p>
        <button
          className="next-question-btn"
          onClick={() => navigate("/c/question-3", { replace: true })}
        >
          Go to Question 3 →
        </button>
      </div>
    );
  }

  return (
    <div className="game-screen">
      {/* Background effects */}
      <div className="bg-grid"></div>
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="question-box">
          <span className="q-label">Q</span>
          <span className="q-number">2</span>
        </div>

        {(phase === "assembly" || phase === "debug") && !isGameOver && (
          <Timer onTimeUp={onTimeUp} 
            getTimeLeft={(timeLeft) => setCurrentTime(timeLeft)}
          />
        )}
      </div>

      {/* TITLE */}
      <div className="title-container">
        <h1 className="game-title">
          <span className="title-word">BIT</span>
          <span className="title-word">BASH</span>
          <span className="title-word">BONANZA</span>
        </h1>
        <div className="title-underline"></div>
      </div>

      {/* GLOBAL HUD */}
      {(phase === "assembly" || phase === "debug") && !isGameOver && (
        <div className="player-hud">
          <span className="avatar">{avatarsMap(playerProfile.avatar)}</span>
          <span className="username">{playerProfile.username}</span>
          <span className="score">⭐ {score}</span>
        </div>
      )}

      {!isGameOver && (
        <div className="game-content">
          {phase === "wheel" && (
            <TopicSwiper
              topics={MEDIUM_TOPICS}
              onSelect={handleTopicSelect}
            />
          )}

          {phase === "topic" && selectedTopic && (
            <TopicRevealCard topic={selectedTopic} onReveal={startAssembly} />
          )}

          {phase === "assembly" && selectedTopic && (
            <>
              <CodeAssembler
                expectedOutput={C_EXPECTED_OUTPUT[selectedTopic]}
                topic={selectedTopic}
                onSuccess={unlockDebug}
                locked={assemblyCompleted}
                language="c"
              />

              {assemblyCompleted && (
                <div className="debug-section">
                  <div className="debug-card">
                    <div className="debug-icon">🏆</div>
                    <h2 className="debug-title">Code Assembled Successfully</h2>
                    <p className="debug-text">
                      Great job! Now, Let's Move on to the Debugging Part !!
                    </p>

                    <div className="debug-actions">
                      <button
                        className="debug-btn success"
                        onClick={() => setPhase("debug")}
                      >
                        Start Debugging
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {phase === "debug" && (
            <DebugSection
              topic={selectedTopic}
              score={score}
              onScoreChange={updateScore}
              language="c"
              onSuccess={() => {
                const elapsedTime = 600 - currentTimeLeft;
                const bonus = getTimeBonus(elapsedTime);
                updateScore(bonus);
                saveQuestionScore(2, score + bonus, elapsedTime);
                completeQuestion(2);
                navigate("/c/question-3");
              }}
              onGiveUp={() => {
                const elapsedTime = 600 - currentTimeLeft;
                saveQuestionScore(2, score, elapsedTime);
                completeQuestion(2);
                navigate("/c/question-3");
              }}
            />
          )}
        </div>
      )}

      {/* GAME OVER MODAL */}
      {isGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-modal">
            <div className="modal-glow"></div>
            <div className="modal-content">
              <div className="game-over-icon">⏰</div>
              <h2 className="game-over-title">Oops !! Time's Up !!</h2>
              <p className="game-over-text">
                We'll have to move on to the next question now...
              </p>

              <div className="final-score">
                <span className="final-label">Current Score</span>
                <span className="final-value">{score}</span>
              </div>

              <button
                className="next-question-btn"
                onClick={() => navigate("/c/question-3", { replace: true })}
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}