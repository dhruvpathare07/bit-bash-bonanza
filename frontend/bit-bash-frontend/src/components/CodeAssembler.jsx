import { useEffect, useState } from "react";
import "./CodeAssembler.css";
import { PYTHON_CODE_BLOCKS } from "../data/pythonCodeBlocks";
import { C_CODE_BLOCKS } from "../data/cCodeBlocks"; // added

export default function CodeAssembler({ topic, expectedOutput, onSuccess, locked = false, language = "python" }) {
  // choose blocks based on language
  const correctBlocks = (language === "c" ? C_CODE_BLOCKS : PYTHON_CODE_BLOCKS)[topic] || [];

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const [blocks, setBlocks] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [solved, setSolved] = useState(false);

  // Shuffle only when topic or language is ready/changed
  useEffect(() => {
    if (correctBlocks.length > 0) {
      setBlocks(shuffle(correctBlocks));
      setSolved(false);
    }
  }, [topic, language, correctBlocks]);


  const handleDrop = (index) => {
    if (dragIndex === null || solved || locked) return;

    const updated = [...blocks];
    const draggedItem = updated[dragIndex];

    updated.splice(dragIndex, 1);
    updated.splice(index, 0, draggedItem);

    setBlocks(updated);
    setDragIndex(null);
  };

  // Safe correctness check
  const isCorrect =
    correctBlocks.length > 0 &&
    blocks.length === correctBlocks.length &&
    blocks.every((block, index) => block === correctBlocks[index]);

  useEffect(() => {
    if (isCorrect && !solved) {
      setSolved(true);
      onSuccess();

      const box = document.getElementById("expectedOutputBox");
      const overlay = document.getElementById("celebrationOverlay");

      if (box && overlay) {
        box.classList.add("solved");
        overlay.classList.remove("hidden");

        setTimeout(() => {
          if (box) {
            box.classList.add("fade-out");
          }
        }, 1600);
      }
    }
  }, [isCorrect, solved, onSuccess]);

  if (!topic || correctBlocks.length === 0) {
    return <div className="assembler">Loading code blocks...</div>;
  }

  return (
    <div className="assembler">
      <h3>Arrange the code blocks in a correct order ({language.toUpperCase()})</h3>

      <div id="expectedOutputBox" className="expected-output-box" style={{ position: "absolute", left: "40px", top: "220px", width: "220px" }}>
        <h3>Expected Output</h3>
        <pre>{expectedOutput || "Output will appear here..."}</pre>

        <div id="celebrationOverlay" className="celebration-overlay hidden">
          <div className="clap">👏</div>
          <div className="confetti"></div>
        </div>
      </div>

      {blocks.map((block, index) => (
        <div
          key={index}
          className={`code-block ${block === correctBlocks[index] ? "correct" : ""}`}
          draggable={!solved && !locked}
          onDragStart={() => setDragIndex(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
        >
          {block}
        </div>
      ))}
    </div>
  );
}
