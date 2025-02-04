import { useState } from "react";
import "./css/style.css";

export default function Game() {
    const [userScore, setUserScore] = useState(0);
    const [comScore, setComScore] = useState(0);
    const [message, setMessage] = useState("Play your turn");
    const [bgColor, setBgColor] = useState("green");
    const [textColor, setTextColor] = useState("white");

    const choices = ["rock", "paper", "scissors"];

    const playGame = (userChoice) => {
        const comChoice = generateComChoice();

        if (userChoice === comChoice) {
            setMessage("Game is a draw");
            setBgColor("yellow");
            setTextColor("black");
        } else {
            let userWin = true;

            if (userChoice === "rock") {
                userWin = comChoice === "paper" ? false : true;
            } else if (userChoice === "paper") {
                userWin = comChoice === "scissors" ? false : true;
            } else {
                userWin = comChoice === "rock" ? false : true;
            }

            showWinner(userWin, userChoice, comChoice);
        }
    };

    const generateComChoice = () => {
        const randomIdx = Math.floor(Math.random() * 3);
        return choices[randomIdx];
    };

    const showWinner = (userWin, userChoice, comChoice) => {
        if (userWin) {
            setUserScore((prevScore) => prevScore + 1);
            setMessage(`You win! ${userChoice} beats ${comChoice}`);
            setBgColor("green");
            setTextColor("white");
        } else {
            setComScore((prevScore) => prevScore + 1);
            setMessage(`Computer wins! ${comChoice} beats ${userChoice}`);
            setBgColor("red");
            setTextColor("white");
        }
    };

    return (
        <div className="container">
            <h1>Rock Paper Scissors</h1>
            <div className="choices">
                {choices.map((choice) => (
                    <div
                        key={choice}
                        className="choice"
                        id={choice}
                        onClick={() => playGame(choice)}
                    >
                        <img src={`/images/${choice}.png`} alt={choice} />
                    </div>
                ))}
            </div>

            <div className="score-board">
                <div className="score">
                    <p id="user-score">{userScore}</p>
                    <p>You</p>
                </div>
                <div className="score">
                    <p id="comp-score">{comScore}</p>
                    <p>Computer</p>
                </div>
            </div>

            <div className="msg-container">
                <p id="message" style={{ backgroundColor: bgColor, color: textColor }}>
                    {message}
                </p>
            </div>
        </div>
    );
}