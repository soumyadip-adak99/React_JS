import React, { useState } from 'react';

export default function App() {
	const [text, setText] = useState("");
	const [msg, setMsg] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);

	const handleOnChange = (event) => {
		setText(event.target.value);
		setMsg("");
	};

	const processAction = (action) => {
		setIsProcessing(true);
		setTimeout(() => {
			action();
			setIsProcessing(false);
		}, 150); // Small delay for smooth animation
	};

	const upperCase = () => {
		if (text.trim() === "") {
			setMsg("Text box is empty. Please fill out the text box.");
		} else if (text === text.toUpperCase()) {
			setMsg("Text is already in upper case.");
		} else {
			setText(text.toUpperCase());
			setMsg("Text converted to uppercase successfully!");
		}
	};

	const lowerCase = () => {
		if (text.trim() === "") {
			setMsg("Text box is empty. Please fill out the text box.");
		} else if (text === text.toLowerCase()) {
			setMsg("Text is already in lower case.");
		} else {
			setText(text.toLowerCase());
			setMsg("Text converted to lowercase successfully!");
		}
	};

	const capitalizeCase = () => {
		if (text.trim() === "") {
			setMsg("Text box is empty. Please fill out the text box.");
		} else {
			const capitalized = text
				.split(' ')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
				.join(' ');
			setText(capitalized);
			setMsg("Text capitalized successfully!");
		}
	};

	const clearText = () => {
		if (text.trim() === "") {
			setMsg("Text is already empty.");
		} else {
			const confirmClear = window.confirm("Are you sure you want to clear the text?");
			if (confirmClear) {
				setText("");
				setMsg("Text cleared successfully!");
			}
		}
	};

	const copyToClipBoard = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setMsg("Text copied to clipboard!");
		} catch (err) {
			setMsg("Failed to copy text.");
		}
	};

	const removeExtraSpaces = () => {
		if (text.trim() === "") {
			setMsg("Text box is empty. Please fill out the text box.");
		} else {
			setText(text.replace(/\s+/g, ' ').trim());
			setMsg("Extra spaces removed successfully!");
		}
	};

	const countWords = () => {
		if (text.trim() === "") return 0;
		const words = text.trim().split(/\s+/);
		return words.filter((word) => word.length > 0).length;
	};

	const countSentences = () => {
		if (text.trim() === "") return 0;
		const sentences = text.split(/[.!?।]+(?:\s|$)/);
		return sentences.filter(sentence => sentence.trim().length > 0).length;
	};

	const countCharacters = () => {
		return text.length;
	};

	const countParagraphs = () => {
		if (text.trim() === "") return 0;
		return text.split('\n').filter(para => para.trim().length > 0).length;
	};

	const readingTime = () => {
		const words = countWords();
		const minutes = Math.ceil(words / 200); // Average reading speed: 200 words per minute
		return minutes > 0 ? `${minutes} min read` : "Less than 1 min";
	};

	return (
		<div className="text-analyzer-app">
			<header className="app-header">
				<div className="container">
					<div className="header-content">
						<h1>Text Analyzer</h1>
						<p className="tagline">Advanced text transformation and analysis tool</p>
					</div>
				</div>
			</header>

			<main className="container main-content">
				{msg && (
					<div className={`alert ${msg.includes('already') || msg.includes('Failed') ? 'alert-warning' : 'alert-success'}`}>
						<span>{msg}</span>
						<button onClick={() => setMsg("")} className="alert-close">
							<i className="fas fa-times"></i>
						</button>
					</div>
				)}

				<div className="text-editor-card glassmorphism">
					<div className="card-header">
						<h2>
							<i className="fas fa-edit"></i> Text Editor
						</h2>

					</div>

					<div className="card-body">
						<textarea
							className="text-input"
							rows="8"
							placeholder="Type or paste your text here..."
							value={text}
							onChange={handleOnChange}
						></textarea>
					</div>
				</div>

				<div className="toolbar">
					<button
						onClick={() => processAction(upperCase)}
						className="tool-btn primary"
						title="Convert to UPPERCASE"
						disabled={text.trim() === "" || isProcessing}
					>
						<i className="fas fa-text-height"></i>
						<span>UPPERCASE</span>
					</button>
					<button
						onClick={() => processAction(lowerCase)}
						className="tool-btn secondary"
						title="Convert to lowercase"
						disabled={text.trim() === "" || isProcessing}
					>
						<i className="fas fa-text-width"></i>
						<span>lowercase</span>
					</button>
					<button
						onClick={() => processAction(capitalizeCase)}
						className="tool-btn accent"
						title="Capitalize Each Word"
						disabled={text.trim() === "" || isProcessing}
					>
						<i className="fas fa-paragraph"></i>
						<span>Capitalize</span>
					</button>
					<button
						onClick={() => processAction(removeExtraSpaces)}
						className="tool-btn info"
						title="Remove Extra Spaces"
						disabled={text.trim() === "" || isProcessing}
					>
						<i className="fas fa-space-shuttle"></i>
						<span>Trim Spaces</span>
					</button>
					<button
						onClick={() => processAction(copyToClipBoard)}
						className="tool-btn success"
						title="Copy to clipboard"
						disabled={text.trim() === "" || isProcessing}
					>
						<i className="fas fa-copy"></i>
						<span>Copy</span>
					</button>
					<button
						onClick={() => processAction(clearText)}
						className="tool-btn danger"
						title="Clear text"
						disabled={text.trim() === "" || isProcessing}
					>
						<i className="fas fa-trash-alt"></i>
						<span>Clear</span>
					</button>
				</div>

				<div className="stats-section glassmorphism">
					<h2 className="stats-title">
						<i className="fas fa-chart-pie"></i> Text Statistics
					</h2>
					<div className="stats-grid">
						<div className="stat-card">
							<div className="stat-icon">
								<i className="fas fa-font"></i>
							</div>
							<div className="stat-content">
								<div className="stat-value">{countCharacters()}</div>
								<div className="stat-label">Characters</div>
							</div>
						</div>

						<div className="stat-card">
							<div className="stat-icon">
								<i className="fas fa-align-left"></i>
							</div>
							<div className="stat-content">
								<div className="stat-value">{countWords()}</div>
								<div className="stat-label">Words</div>
							</div>
						</div>

						<div className="stat-card">
							<div className="stat-icon">
								<i className="fas fa-sentence"></i>
							</div>
							<div className="stat-content">
								<div className="stat-value">{countSentences()}</div>
								<div className="stat-label">Sentences</div>
							</div>
						</div>

						<div className="stat-card">
							<div className="stat-icon">
								<i className="fas fa-paragraph"></i>
							</div>
							<div className="stat-content">
								<div className="stat-value">{countParagraphs()}</div>
								<div className="stat-label">Paragraphs</div>
							</div>
						</div>

						<div className="stat-card">
							<div className="stat-icon">
								<i className="fas fa-clock"></i>
							</div>
							<div className="stat-content">
								<div className="stat-value">{readingTime()}</div>
								<div className="stat-label">Reading Time</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* <footer className="app-footer">
				<div className="container">
					<div className="footer-content">
						<p>Text Analyzer Pro &copy; {new Date().getFullYear()} - Professional Text Transformation Tool</p>
						<div className="footer-links">
							<a href="#"><i className="fab fa-github"></i></a>
							<a href="#"><i className="fas fa-question-circle"></i></a>
							<a href="#"><i className="fas fa-envelope"></i></a>
						</div>
					</div>
				</div>
			</footer> */}
		</div>
	);
}