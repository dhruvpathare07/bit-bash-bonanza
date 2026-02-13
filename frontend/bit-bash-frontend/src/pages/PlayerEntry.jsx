'use client';

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PlayerEntry.css";

const avatars = [
  { id: 0, emoji: "🐶", label: "Puppy" },
  { id: 1, emoji: "🐱", label: "Kitty" },
  { id: 2, emoji: "🦊", label: "Fox" },
  { id: 3, emoji: "🐼", label: "Panda" },
  { id: 4, emoji: "🐸", label: "Frog" },
  { id: 5, emoji: "🐯", label: "Tiger" },
  { id: 6, emoji: "😄", label: "Happy" },
  { id: 7, emoji: "😎", label: "Cool" },
  { id: 8, emoji: "🤓", label: "Nerd" },
  { id: 9, emoji: "🥳", label: "Party" },
  { id: 10, emoji: "😈", label: "Mischief" },
  { id: 11, emoji: "🤩", label: "Excited" }
];


export default function PlayerEntry() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [className, setClassName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 👈 GET LANGUAGE FROM LOCATION STATE
  const language = location.state?.language || "python";

  const handleStart = () => {
    if (!fullName || !username || !className || avatar === null) {
      alert("Please complete all fields");
      return;
    }

    const profile = {
      fullName,
      username,
      className,
      avatar,
      language  // 👈 STORE LANGUAGE IN PROFILE
    };

    sessionStorage.setItem("playerProfile", JSON.stringify(profile));

    // Initialize game session cleanly
    sessionStorage.setItem("gameSession", JSON.stringify({
      score: 0,
      currentQuestion: 1,
      language  // 👈 ALSO STORE IN GAME SESSION
    }));

    // Clear old progress (safety)
    sessionStorage.removeItem("bbbProgress");

    // Navigate to correct language folder
    // 👈 DYNAMIC ROUTE BASED ON LANGUAGE
    const routePath = language === "c" ? "/c/question-1" : "/python/question-1";
    navigate(routePath);
  };


  return (
    <div className="entry-container">
      {/* Main Title - Center */}
      <h1>Welcome To Bit Bash Bonanza</h1>

      {/* Language Display Badge 👈 NEW */}
      <div style={{
        position: "absolute",
        top: 30,
        right: 30,
        padding: "8px 16px",
        background: language === "c" 
          ? "linear-gradient(135deg, #4dd0ff, #2563eb)" 
          : "linear-gradient(135deg, #2ecc71, #1e7f4f)",
        borderRadius: "20px",
        fontSize: "0.9rem",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "1px",
        zIndex: 100
      }}>
        {language.toUpperCase()}
      </div>

      {/* Content Wrapper - Avatar & Form Side by Side */}
      <div className="content-wrapper">
        {/* Avatar Selector - Left Side */}
        <div className="avatar-section">
          <h3>Choose Avatar</h3>
          <div className="avatar-grid">
            {avatars.map((a) => (
              <button
                key={a.id}
                className={avatar === a.id ? "avatar selected" : "avatar"}
                onClick={() => setAvatar(a.id)}
                title={a.label}
              >
                <span className="avatar-emoji">{a.emoji}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields - Right Side */}
        <div className="form-wrapper">
          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            placeholder="Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      {/* Start Button - Bottom */}
      <div className="button-wrapper">
        <button className="start-btn" onClick={handleStart}>
          🚀 Start Game
        </button>
      </div>
    </div>
  );
}
  