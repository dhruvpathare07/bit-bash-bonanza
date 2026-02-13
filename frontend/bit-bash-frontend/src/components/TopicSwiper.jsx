"use client";
import { useRef, useState } from "react";
import "./TopicSwiper.css";

/* 🔑 ICON MAP (scalable & clean) */
const TOPIC_ICONS = {
  /* ================= EASY ================= */
  "Star Pattern": "⭐",
  "Even / Odd": "🔢",
  "Sum Of Digits": "➕",
  "Factorial": "🧮",
  "Largest Of 3 Numbers": "📈",
/* ================= MEDIUM ================= */
  "Armstrong": "💪",
  "Fibonacci": "🧬",
  "Array Reverse": "🔁",
  "Palindrome": "🔄",
  "Sum Of Array Elements": "📊", 
/* ================= HARD ================= */
  "String Reverse": "🔤",
  "Complex Pattern": "🧩",
  "Recursion Logic": "🔄",
  "Prime Number": "🔢",
  "Number To Words Conversion": "🔢📝",
};

export default function TopicSwiper({ topics, onSelect }) {
  const TOPICS = topics; // ✅ dynamic
  const containerRef = useRef(null);

  const [spinning, setSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const cardWidth = 200;
    const totalCards = TOPICS.length;

    const randomIndex = Math.floor(Math.random() * totalCards);
    const spinRounds = 4;

    const finalTranslate =
      spinRounds * totalCards * cardWidth +
      randomIndex * cardWidth;

    containerRef.current.style.transition =
      "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)";
    containerRef.current.style.transform =
      `translateX(-${finalTranslate}px)`;

    setTimeout(() => {
      setSelectedIndex(randomIndex);
      onSelect(TOPICS[randomIndex]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="swiper-wrapper">
      <div className="swiper-header">
        <span className="swiper-icon">🎯</span>
        <h3 className="swiper-title">Select Your Challenge</h3>
      </div>

      <div className="swiper-machine">
        {/* Decorative lights */}
        <div className="machine-lights">
          {[1,2,3,4,5].map(i => (
            <span key={i} className={`light light-${i}`} />
          ))}
        </div>

        {/* Pointer */}
        <div className="pointer-wrapper">
          <div className="pointer"></div>
          <div className="pointer-glow"></div>
        </div>

        {/* Slot window */}
        <div className="swiper-window">
          <div className="window-overlay left"></div>
          <div className="window-overlay right"></div>

          <div className="swiper-track" ref={containerRef}>
            {[...TOPICS, ...TOPICS, ...TOPICS, ...TOPICS, ...TOPICS].map(
              (topic, index) => (
                <div
                  key={index}
                  className={`topic-card ${
                    selectedIndex !== null &&
                    index % TOPICS.length === selectedIndex
                      ? "selected"
                      : ""
                  }`}
                >
                  <div className="card-inner">
                    <div className="card-icon">
                      {TOPIC_ICONS[topic] || "❓"}
                    </div>
                    <span className="card-text">{topic}</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom panel */}
        <div className="machine-panel">
          <div className="panel-display">
            {spinning
              ? "SPINNING..."
              : selectedIndex !== null
              ? "LOCKED IN!"
              : "READY"}
          </div>
        </div>
      </div>

      <button className="spin-btn" onClick={spin} disabled={spinning}>
        <span className="btn-text">
          {spinning ? "Spinning..." : "SPIN"}
        </span>
        <span className="btn-glow"></span>
      </button>
    </div>
  );
}
