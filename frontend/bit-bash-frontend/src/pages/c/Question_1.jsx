"use client";
import { useState } from "react";
import TopicSwiper from "../../components/TopicSwiper";
import CodeAssembler from "../../components/CodeAssembler";
import TopicRevealCard from "../../components/TopicRevealCard";
import Timer from "../../components/Timer";
import DebugSection from "../../components/DebugSection";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../question.css";
import { C_EXPECTED_OUTPUT } from "../../data/cExpectedOutput";
import { initProgress, getProgress } from "../../utils/progress";
import { completeQuestion } from "../../utils/progress";

export default function Question_1() {
  // GAME STATE
  const [phase, setPhase] = useState("wheel");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [assemblyCompleted, setAssemblyCompleted] = useState(false);
  const navigate = useNavigate();
  const playerProfile = JSON.parse(sessionStorage.getItem("playerProfile")) || {};
  const [isLocked, setIsLocked] = useState(false);

  const getGameSession = () =>
    JSON.parse(sessionStorage.getItem("gameSession"));

  const [score, setScore] = useState(() => {
    const game = getGameSession();
    return game?.score ?? 0;
  });

  useEffect(() => {
    initProgress();
    const progress = getProgress();
    if (progress.completed.q1) {
      setIsLocked(true);
    }
  }, []);

  useEffect(() => {
    const game = JSON.parse(sessionStorage.getItem("gameSession")) || {};
    if (game.score !== undefined && game.score !== score) {
      setScore(game.score);
    }
  }, [phase]);

  const EASY_TOPICS = [
    "Star Pattern",
    "Even / Odd",
    "Sum Of Digits",
    "Factorial",
    "Largest Of 3 Numbers"
  ];

  const saveQuestionScore = (questionNo, score, timeTaken) => {
    const results = JSON.parse(localStorage.getItem("bbbResults")) || {};
    results[`Q${questionNo}`] = {
      score,
      timeTaken,
      completedAt: Date.now(),
    };
    localStorage.setItem("bbbResults", JSON.stringify(results));
  };

  useEffect(() => {
    const existing = sessionStorage.getItem("gameSession");
    if (!existing) {
      sessionStorage.setItem(
        "gameSession",
        JSON.stringify({ score: 0, currentQuestion: 1, language: "c" })
      );
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

  const unlockDebug = () => {
    updateScore(50);
    setAssemblyCompleted(true);
  };

  const handleDebugFail = () => {
    updateScore(-10);
  };

  const onTimeUp = () => {
    saveQuestionScore(1, score, 0);
    setIsGameOver(true);
  };

  const AVATARS = [
    "🐶","🐱","🦊","🐼","🐸","🐯","😄","😎","🤓","🥳","😈","🤩"
  ];

  const avatarsMap = (id) => {
    if (id === null || id === undefined) return "🙂";
    return AVATARS[id] || "🙂";
  };

  if (isLocked) {
    return (
      <div className="locked-screen">
        <h2>🔒 Question 1 Completed</h2>
        <p>You've already completed this question. Please proceed to the next one.</p>
        <button
          className="next-question-btn"
          onClick={() => navigate("/c/question-2", { replace: true })}
        >
          Go to Question 2 →
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
          <span className="q-number">1</span>
        </div>

        {(phase === "assembly" || phase === "debug") && !isGameOver && (
          <Timer onTimeUp={onTimeUp} />
        )}
      </div>

      {/* Main Title */}
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

      {/* Game Phases */}
      {!isGameOver && (
        <div className="game-content">
          {phase === "wheel" && (
            <TopicSwiper
              topics={EASY_TOPICS}
              onSelect={handleTopicSelect}
            />
          )}

          {phase === "topic" && selectedTopic && (
            <TopicRevealCard
              topic={selectedTopic}
              onReveal={startAssembly}
            />
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

          {phase === "debug" && selectedTopic && (
            <DebugSection
              topic={selectedTopic}
              score={score}
              onScoreChange={updateScore}
              language="c"
              onSuccess={() => {
                const elapsedTime = 600;
                const bonus = getTimeBonus(elapsedTime);
                updateScore(bonus);
                saveQuestionScore(1, score + bonus, elapsedTime);
                completeQuestion(1);
                navigate("/c/question-2");
              }}
              onGiveUp={() => {
                completeQuestion(1);
                navigate("/c/question-2");
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
                onClick={() => {
                  completeQuestion(1);
                  navigate("/c/question-2");
                }}
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