import React, { useState } from 'react';
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  const handleOnChange = (event) => {
    setText(event.target.value);
    setMsg("");
  };

  const upperCase = () => {
    if (text.trim() === "") {
      alert("Text box is empty. Please fill out the text box.");
    } else if (text === text.toUpperCase()) {
      setMsg("Text is already in upper case.");
    } else {
      setText(text.toUpperCase());
      setMsg("");
    }
  };

  const lowerCase = () => {
    if (text.trim() === "") {
      alert("Text box is empty. Please fill out the text box.");
    } else if (text === text.toLowerCase()) {
      setMsg("Text is already in lower case.");
    } else {
      setText(text.toLowerCase());
      setMsg("");
    }
  };

  const clearText = () => {
    if (text.trim() === "") {
      alert("Text is already empty.");
    } else {
      const confirmClear = window.confirm("Are you sure you want to clear the text?");
      if (confirmClear) {
        setText("");
        setMsg("");
      }
    }
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setMsg("Text copied to clipboard.");
    });
  };

  const countWords = () => {
    if (text.trim() === "") {
      return 0;
    }
    const words = text.trim().split(/\s+/);
    return words.filter((word) => word.length > 0).length;
  };

  const countSentences = () => {
    if (text.trim() === "") {
      return 0;
    }
    // Count sentences by splitting on '.', '!', '?' followed by space or end of text
    const sentences = text.split(/[.!?]+(?:\s|$)/);
    // Filter out empty strings that might occur with multiple delimiters
    return sentences.filter(sentence => sentence.trim().length > 0).length;
  };

  return (
    <div className="text-form-container">
      <div className="card">
        <div className="card-header">
          <h2>Text Analyzer</h2>
          {msg && <div className="alert">{msg}</div>}
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="text-area">Enter Your Text</label>
            <textarea
              id="text-area"
              rows="5"
              placeholder="Type or paste your text here..."
              value={text}
              onChange={handleOnChange}
            ></textarea>
          </div>

          <div className="button-grid">
            <button className="btn primary" onClick={upperCase}>
              <i className="icon">⬆️</i> UPPERCASE
            </button>
            <button className="btn secondary" onClick={lowerCase}>
              <i className="icon">⬇️</i> lowercase
            </button>
            <button className="btn danger" onClick={clearText}>
              <i className="icon">🗑️</i> Clear
            </button>
            <button className="btn info" onClick={copyToClipBoard}>
              <i className="icon">📋</i> Copy
            </button>
          </div>
        </div>

        <div className="card-footer">
          <div className="stats-container">
            <div className="stat-box">
              <h3>Words</h3>
              <p className="stat-value">{countWords()}</p>
            </div>
            <div className="stat-box">
              <h3>Characters</h3>
              <p className="stat-value">{text.length}</p>
            </div>
            <div className="stat-box">
              <h3>Sentences</h3>
              <p className="stat-value">{countSentences()}</p>
            </div>
          </div>
        </div>
      </div>

      {text && (
        <div className="preview-card">
          <h3>Preview</h3>
          <div className="preview-content">{text}</div>
        </div>
      )}


    </div>
  );
} 