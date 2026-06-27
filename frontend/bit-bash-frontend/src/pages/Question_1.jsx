"use client";
import { useState } from "react";
import TopicSwiper from "../components/TopicSwiper";
import CodeAssembler from "../components/CodeAssembler";
import TopicRevealCard from "../components/TopicRevealCard";
import Timer from "../components/Timer";
import DebugSection from "../components/DebugSection";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./question.css";
import { PYTHON_EXPECTED_OUTPUT } from "../data/pythonExpectedOutput";
import { initProgress, getProgress } from "../utils/progress";
import { completeQuestion } from "../utils/progress";
import { useRef } from "react";

export default function Question_1() {
  // GAME STATE
  const [phase, setPhase] = useState("wheel"); // wheel | topic | assembly | debug
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [isGameOver, setIsGameOver] = useState(false);
  // const [debugProgress, setDebugProgress] = useState(0);
  //const profile = JSON.parse(localStorage.getItem("playerProfile")) || {};
  const [assemblyCompleted, setAssemblyCompleted] = useState(false);
  const navigate = useNavigate();
  const playerProfile = JSON.parse(sessionStorage.getItem("playerProfile")) || {};
  const [isLocked, setIsLocked] = useState(false);

  const [assemblyScore, setAssemblyScore] = useState(0);
  const [debugScore, setDebugScore] = useState(0);
  const [timeBonus, setTimeBonus] = useState(0);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(600);
  
  const totalScore = assemblyScore + debugScore + timeBonus;

  const timerRef = useRef(null);


  //const gameSession = JSON.parse(sessionStorage.getItem("gameSession")) || { score: 0 };
  // const totalScore = assemblyScore + debugScore + timeBonus;
  // const elapsed = 600 - currentTimeLeft;
  // saveQuestionScore(1, totalScore, elapsed);

  const finishQuestion = (finalScore = totalScore) => {
  timerRef.current?.stop(); // add this
  const timeTaken = 600 - currentTimeLeft;

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

allResults[language]["Q1"] = resultData;

sessionStorage.setItem("bbbResults", JSON.stringify(allResults));


  completeQuestion(1);
  navigate("/python/question-2");
};


  // const getGameSession = () =>
  // JSON.parse(sessionStorage.getItem("gameSession"));


//   const [score, setScore] = useState(() => {
//   const game = getGameSession();
//   return game?.score ?? 0;
// });

  useEffect(() => {
  initProgress();
  const progress = getProgress();

  if (progress.completed.q1) {
    setIsLocked(true);
  }
}, []);


//   useEffect(() => {
//   // Sync score whenever phase changes (assembly/debug) or page reloads
//   const game = JSON.parse(sessionStorage.getItem("gameSession")) || {};
//   if (game.score !== undefined && game.score !== score) {
//     setScore(game.score);
//   }
// }, [phase]);


  const EASY_TOPICS = [
  "Star Pattern",
  "Even / Odd",
  "Sum Of Digits",
  "Factorial",
  "Largest Of 3 Numbers"
];
  
//   const saveQuestionScore = (questionNo, score, timeTaken) => {
//   const results =
//     JSON.parse(localStorage.getItem("bbbResults")) || {};

//   results[`Q${questionNo}`] = {
//     score,
//     timeTaken,
//   };

//   localStorage.setItem("bbbResults", JSON.stringify(results));
// };



useEffect(() => {
  const existing = sessionStorage.getItem("gameSession");
  if (!existing) {
    sessionStorage.setItem(
      "gameSession",
      JSON.stringify({ score: 0, currentQuestion: 1 })
    );
  }
}, []);

/*useEffect(() => {
  const game = getGameSession();
  if (game?.score !== undefined) {
    setScore(game.score);
  }
}, [phase]);*/

/*useEffect(() => {
  const syncScore = () => {
    const game = getGameSession();
    if (game?.score !== undefined) {
      setScore(game.score);
    }
  };

  window.addEventListener("storage", syncScore);
  return () => window.removeEventListener("storage", syncScore);
}, []);*/

  /*useEffect(() => {
  if (profile?.currentQuestion > 1) {
    navigate("/python/question-2");
  }
}, [profile, navigate]);*/

  // HANDLERS
  const handleTopicSelect = (topic, onSuccess, onFail) => {
    setSelectedTopic(topic);
    setPhase("topic");
  };

  const startAssembly = () => {
  setAssemblyCompleted(false);
  setPhase("assembly");
};

// const updateScore = (delta) => {
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

 useEffect(() => {
  const profile = sessionStorage.getItem("playerProfile");
  if (!profile) {
    navigate("/", { replace: true });
  }
}, []);



  const unlockDebug = () => {
  setAssemblyScore(50);
  setAssemblyCompleted(true);
};




  /*const handleDebugSuccess = () => {
  updateScore(100);

  saveQuestionScore(1, score + 100, elapsedTime);

  navigate("/python/question-2");
};*/


//   const handleDebugFail = () => {
//   updateScore(-10);
// };


  /*const onTimeUp = () => {
  updateScore(-30);
  setIsGameOver(true);
};*/

// const onTimeUp = () => {
//   saveQuestionScore(1, score, 0);

//   console.log("Q1 TIME UP SCORE:", score); // ✅ Debug log

//   setIsGameOver(true);
// };

// const onTimeUp = () => {
//   finishQuestion();
// };

const onTimeUp = () => {
  timerRef.current?.stop();
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
      <h2>Question 1 Completed</h2>
      <p>
        You’ve already completed this question. <br></br>
        Please proceed to the next one.
      </p>

      <button
  className="next-question-btn"
  onClick={() => navigate("/python/question-2", { replace: true })}
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
          <Timer
  ref={timerRef}
  onTimeUp={onTimeUp}
  getTimeLeft={setCurrentTimeLeft}
/>


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

      {/* GLOBAL HUD — Visible in Assembly + Debug */}
{(phase === "assembly" || phase === "debug") && !isGameOver && (
  <div className="player-hud">
    <span className="avatar">{avatarsMap(playerProfile.avatar)}</span>
  <span className="username">{playerProfile.username}</span>
  <span className="score">⭐ {totalScore}</span>
  </div>
)}


      {/* Score Display */}
      {/*<div className="score-container">
        <div className="score-icon">⚡</div>
        <div className="score-info">
          <span className="score-label">SCORE</span>
          <span className="score-value">{score}</span>
        </div>
      </div>*/}

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
  {/*<div className="player-hud">
    <div className="hud-avatar">{avatarsMap(playerProfile.avatar)}</div>
    <div className="hud-name">{playerProfile.username}</div>
    <div className="hud-score">⭐ {score}</div>
  </div>*/}
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
            Great job! Now, Let's Move on to the Debugging Part !!.
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
  /*<DebugSection
    topic={selectedTopic}
    onSuccess={handleDebugSuccess}
    onFail={handleDebugFail}
    onProgress={setDebugProgress}
  />*/
//   <DebugSection
//   topic={selectedTopic}
//   score={score}
//   onProgressScore={setDebugScore}
//   //onScoreChange={updateScore}
//   // onSuccess={() => navigate("/python/question-2")}
//  onSuccess={() => {
//   const elapsedTime = 600;
//   const bonus = getTimeBonus(elapsedTime);

//   const finalScore = score + bonus;

//   updateScore(bonus);
//   saveQuestionScore(1, finalScore, elapsedTime);

//   console.log("Q1 FINAL SCORE:", finalScore); // ✅ Debug log once

//   completeQuestion(1);
//   navigate("/python/question-2");
// }}


//   onGiveUp={() => {
//   completeQuestion(1);
//   navigate("/python/question-2");
// }}
// />

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
              <h2 className="game-over-title">{"Time's Up !"}</h2>

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
//           onClick={() => {
//   console.log("Q1 EXIT SCORE:", totalScore); // ✅ Debug log
//   completeQuestion(1);
//   navigate("/python/question-2");
// }}
onClick={() => finishQuestion()}


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
 