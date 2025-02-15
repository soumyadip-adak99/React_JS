import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (unit) => unit.toString().padStart(2, "0");

    return (
        <div className="hero">
            <div className="container">
                <div className="clock">
                    <span>{formatTime(time.getHours())}</span>
                    <span>:</span>
                    <span>{formatTime(time.getMinutes())}</span>
                    <span>:</span>
                    <span>{formatTime(time.getSeconds())}</span>
                </div>
            </div>
        </div>
    );
}

export default App;
