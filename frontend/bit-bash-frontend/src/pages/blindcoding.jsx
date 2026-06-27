import React, { useState } from "react";
import "./blindcoding.css";

const BlindCoding = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("python");
  const [inputData, setInputData] = useState("");

  const runCode = async () => {
    const response = await fetch("http://localhost:5000/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        language,
        input: inputData,
      }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
      setOutput("");
    } else {
      setOutput(data.output);
      setError("");
    }
  };

  return (
    <div className="blind-screen">

      <div className="bg-grid"></div>
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="blind-title">
        <h1 className="gradient-title">BIT BASH BONANZA</h1>
        <div className="title-underline"></div>
      </div>

      <div className="blind-question">
        <span className="q-label">Q.</span>
        <span>
          Write a Code in C / Python to display the pattern as shown on the projected screen
        </span>
      </div>

      <div className="editor-wrapper">
        <textarea
          className="code-editor"
          placeholder="Start typing your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

           {/* Controls */}
      <div className="control-panel">
        <div className="language-select-wrapper">
          <label>Language</label>
          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="c">C</option>
          </select>
        </div>

        <button className="run-btn" onClick={runCode}>
          ▶ Run Code
        </button>
      </div>

      {/* Output Section */}
      <div className="output-wrapper">
        <h3 className="output-title">Output Console</h3>

        {error && (
          <pre className="output-box error-box">
            {error}
          </pre>
        )}

        {output && (
          <pre className="output-box success-box">
            {output}
          </pre>
        )}

        {!error && !output && (
          <div className="output-placeholder">
            Your output will appear here...
          </div>
        )}
      </div>

    </div>
  );
};

export default BlindCoding;
