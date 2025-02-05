import React, { useState } from "react";
import "./App.css";

const App = () => {
    const [boxes, setBoxes] = useState(Array(9).fill(""));
    const [turnO, setTurnO] = useState(true);
    const [winner, setWinner] = useState(null);
    const [count, setCount] = useState(0);

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    // Handle box click
    const handleBoxClick = (index) => {
        if (boxes[index] || winner) return;

        const newBoxes = [...boxes];
        newBoxes[index] = turnO ? "O" : "X";
        setBoxes(newBoxes);
        setTurnO(!turnO);
        setCount(count + 1);

        if (checkWinner(newBoxes)) return;

        if (count === 8) setWinner("Draw");
    };

    // Check for a winner
    const checkWinner = (boxes) => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
                setWinner(boxes[a]);
                return true;
            }
        }
        return false;
    };

    // Reset the game
    const resetGame = () => {
        setBoxes(Array(9).fill(""));
        setTurnO(true);
        setWinner(null);
        setCount(0);
    };

    return (
        <div className="App">
            <h1 className="heading">Tic Tac Toe</h1>
            <div className="game">
                {boxes.map((box, index) => (
                    <button
                        key={index}
                        className="box"
                        onClick={() => handleBoxClick(index)}
                        style={{ color: box === "O" ? "red" : "green" }}
                        disabled={winner !== null}
                    >
                        {box}
                    </button>
                ))}
            </div>

            {winner && (
                <div className="msg-container">
                    <p id="msg" style={{ color: winner === "Draw" ? "red" : "#33cc33" }}>
                        {winner === "Draw" ? "Game Over" : `Congratulations, Winner is ${winner}`}
                    </p>
                    <button id="new-btn" onClick={resetGame}>
                        New Game
                    </button>
                </div>
            )}

            {!winner && (
                <button id="reset-btn" onClick={resetGame}>
                    Reset Game
                </button>
            )}
        </div>
    );
}

export default App;