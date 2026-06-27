"use client";
import { useState, useEffect } from "react";
import TopicSwiper from "../components/TopicSwiper";
import CodeAssembler from "../components/CodeAssembler";
import TopicRevealCard from "../components/TopicRevealCard";
import Timer from "../components/Timer";
import DebugSection from "../components/DebugSection";
import { useNavigate } from "react-router-dom";
import { PYTHON_EXPECTED_OUTPUT } from "../data/pythonExpectedOutput";
import { initProgress, getProgress, completeQuestion } from "../utils/progress";
import { useRef } from "react";
import "./question.css";

export default function Question_3() {
  const [phase, setPhase] = useState("wheel"); // wheel | topic | assembly | debug
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [assemblyCompleted, setAssemblyCompleted] = useState(false);
  //const [currentTimeLeft, setCurrentTime] = useState(600);
  const [isLocked, setIsLocked] = useState(false);

  const [assemblyScore, setAssemblyScore] = useState(0);
  const [debugScore, setDebugScore] = useState(0);
  const [timeBonus, setTimeBonus] = useState(0);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(600);

  const totalScore = assemblyScore + debugScore + timeBonus;

  const timerRef = useRef(null);

  useEffect(() => {
  initProgress();
  const progress = getProgress();

  if (progress?.completed?.q3) {
    setIsLocked(true);
  }
}, []);





  const navigate = useNavigate();

  const playerProfile =
    JSON.parse(sessionStorage.getItem("playerProfile")) || {};

  const HARD_TOPICS = [
    "String Reverse",
    "Complex Pattern",
    "Recursion Logic",
    "Prime Number",
    "Number To Words Conversion",
  ];

  const AVATARS = [
    "🐶","🐱","🦊","🐼","🐸","🐯","😄","😎","🤓","🥳","😈","🤩"
  ];

  const avatarsMap = (id) => AVATARS[id] || "🙂";

//   useEffect(() => {
//   // Sync score whenever phase changes or page reloads
//   const game = JSON.parse(sessionStorage.getItem("gameSession")) || {};
//   if (game.score !== undefined && game.score !== score) {
//     setScore(game.score);
//   }
// }, [phase]);

// useEffect(() => {
//   const game = JSON.parse(sessionStorage.getItem("gameSession")) || {};
//   if (game.score !== undefined) {
//     setScore(game.score);
//   }
// }, []);



  /* 🔑 SESSION INIT (fresh run for Q3) */
//   useEffect(() => {
//     sessionStorage.setItem(
//       "gameSession",
//       JSON.stringify({ score: 0, currentQuestion: 3 })
//     );
//   }, []);

  useEffect(() => {
  const game = JSON.parse(sessionStorage.getItem("gameSession")) || {};
  sessionStorage.setItem(
    "gameSession",
    JSON.stringify({ ...game, currentQuestion: 3 })
  );
}, []);


// useEffect(() => {
//   if (selectedTopic && phase === "wheel") {
//     setPhase("topic");
//   }
// }, []);

useEffect(() => {
  const profile = sessionStorage.getItem("playerProfile");
  if (!profile) {
    navigate("/", { replace: true });
  }
}, []);

  const finishQuestion = (finalScore = totalScore) => {
      timerRef.current?.stop(); // add this

  const timeTaken = Math.max(600 - currentTimeLeft, 0);

  const resultData = {
    score: finalScore,
    timeTaken,
  };

  const language = playerProfile.language?.toLowerCase() || "python";

const allResults =
  JSON.parse(sessionStorage.getItem("bbbResults")) || {};

if (!allResults[language]) {
  allResults[language] = {};
}

allResults[language]["Q3"] = resultData;

sessionStorage.setItem("bbbResults", JSON.stringify(allResults));


  completeQuestion(3);
  navigate("/results");
};


  // const getGameSession = () =>
  //   JSON.parse(sessionStorage.getItem("gameSession"));

  // const [score, setScore] = useState(() => {
  //   const game = getGameSession();
  //   return game?.score ?? 0;
  // });

//   const updateScore = (delta) => {
//   setScore(prev => {
//     const updated = Math.max(prev + delta, 0);
//     const game = getGameSession() || {};
//     sessionStorage.setItem(
//       "gameSession",
//       JSON.stringify({ ...game, score: updated })
//     );
//     return updated;
//   });
// };

// const getTimeBonus = (elapsedTime) => {
//   if (elapsedTime <= 120) return 50;
//   if (elapsedTime <= 240) return 30;
//   return 10;
// };



  /* GAME FLOW */
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setPhase("topic");
  };

  const startAssembly = () => {
    setAssemblyCompleted(false);
    setPhase("assembly");
  };

  const unlockDebug = () => {
  setAssemblyScore(100); // hard base score
  setAssemblyCompleted(true);
};


//   const handleDebugFail = () => {
//   updateScore(-15); // harsher for hard
// };


  /*const onTimeUp = () => {
    updateScore(-50); // ⏰ harshest penalty
    setIsGameOver(true);
  };*/

//   const onTimeUp = () => {
//   const elapsedTime = 600 - currentTimeLeft;

//   saveQuestionScore(3, score, elapsedTime);
//   completeQuestion(3); // 🔐 LOCK Q3

//   setIsGameOver(true);
// };

const handleTimeUp = () => {
  const elapsedTime = Math.max(600 - currentTimeLeft, 0);

  const resultData = {
    score: totalScore,
    timeTaken: elapsedTime,
  };

  const language = playerProfile.language?.toLowerCase() || "python";

const allResults =
  JSON.parse(sessionStorage.getItem("bbbResults")) || {};

if (!allResults[language]) {
  allResults[language] = {};
}

allResults[language]["Q3"] = resultData;

sessionStorage.setItem("bbbResults", JSON.stringify(allResults));


  completeQuestion(3);
  setIsGameOver(true);
};

// const saveQuestionScore = (questionNo, score, elapsedTime) => {
//   const results =
//     JSON.parse(localStorage.getItem("bbbResults")) || {};

//   results[`Q${questionNo}`] = {
//     score,
//     timeTaken: elapsedTime,
//     completedAt: Date.now(),
//   };

//   localStorage.setItem("bbbResults", JSON.stringify(results));
// };

if (isLocked) {
  return (
    <div className="locked-screen">
      <h2>Question 3 Completed</h2>
      <p>
        You’ve already completed the final question. <br></br>
        You can now view your results.
      </p>

      <button
        className="next-question-btn"
        onClick={() => navigate("/results", { replace: true })}
      >
        View Results →
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
          <span className="q-number">3</span>
        </div>

        {(phase === "assembly" || phase === "debug") && !isGameOver && (
          <Timer
  ref={timerRef}
  onTimeUp={() => {
    timerRef.current?.stop();
    handleTimeUp();
  }}
  getTimeLeft={setCurrentTimeLeft}
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
        <div className="player-hud final-round">
          <span className="avatar">{avatarsMap(playerProfile.avatar)}</span>
          <span className="username">{playerProfile.username}</span>
          <span className="score">⭐ {totalScore}</span>
        </div>
      )}

      {!isGameOver && (
        <div className="game-content">
          {phase === "wheel" && (
            <TopicSwiper
              topics={HARD_TOPICS}
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
                expectedOutput={PYTHON_EXPECTED_OUTPUT[selectedTopic]}
                topic={selectedTopic}
                onSuccess={unlockDebug}
                locked={assemblyCompleted}
              />

              {assemblyCompleted && (
                <div className="debug-section">
                  <div className="debug-card">
                    <div className="debug-icon">🏆</div>
                    <h2 className="debug-title">Code Assembled Successfully</h2>
                    <p className="debug-text">
                      Final round unlocked ⚡ This is the Hardest Challenge — Debug Like A Pro !!!
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
  onScoreChange={setDebugScore}
  onSuccess={(finalDebugScore) => {
    timerRef.current?.stop();

    let bonus = 0;

    if (finalDebugScore === 100 && currentTimeLeft > 0) {
      bonus = 50;
      setTimeBonus(50);
    }

    const finalScore =
  Number(assemblyScore) +
  Number(finalDebugScore) +
  Number(bonus);

    finishQuestion(finalScore);
  }}
  onGiveUp={() => {
    timerRef.current?.stop();

    const finalScore =
      Number(assemblyScore) +
      Number(debugScore);

    finishQuestion(finalScore);
  }}

/>


          )}
        </div>
      )}

      {/* GAME OVER MODAL */}
      {/*{isGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-modal">
            <div className="modal-glow"></div>
            <div className="modal-content">
              <div className="game-over-icon">⏰</div>
              <h2 className="game-over-title">Time's Up!</h2>

              <div className="final-score">
                <span className="final-label">Final Score</span>
                <span className="final-value">{score}</span>
              </div>

              <button
                className="restart-btn"
                onClick={() => window.location.reload()}
              >
                <span className="btn-icon">🔄</span>
                <span>Play Again</span>
              </button>
            </div>
          </div>
        </div>
      )}*/}

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
          <span className="final-value">{totalScore}</span>
        </div>

        <button
          className="next-question-btn"
          onClick={() => navigate("/results", { replace: true })}
        >
          See Results
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
