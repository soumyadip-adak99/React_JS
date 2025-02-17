import { useState } from 'react';
import './App.css';

const App = () => {
    const [birthDate, setBirthDate] = useState("");
    const [age, setAge] = useState("");
    const [textColor, setTextColor] = useState("white");

    const calculateAge = () => {
        if (!birthDate) {
            setAge("Please enter your birth date.");
            setTextColor("red");
            return;
        }

        let selectedDate = new Date(birthDate);
        let birthDay = selectedDate.getDate();
        let birthMonth = selectedDate.getMonth() + 1;
        let birthYear = selectedDate.getFullYear();

        let currentDate = new Date();
        let currentDay = currentDate.getDate();
        let currentMonth = currentDate.getMonth() + 1;
        let currentYear = currentDate.getFullYear();

        let calculatedYear = currentYear - birthYear;
        let calculatedMonth = currentMonth - birthMonth;
        let calculatedDay = currentDay - birthDay;

        if (calculatedMonth < 0) {
            calculatedYear--;
            calculatedMonth += 12;
        }

        if (calculatedDay < 0) {
            calculatedMonth--;
            calculatedDay += getDaysInMonth(birthYear, birthMonth);
        }

        if (calculatedMonth < 0) {
            calculatedMonth = 11;
            calculatedYear--;
        }

        setAge(`You are ${calculatedYear} years, ${calculatedMonth} months, and ${calculatedDay} days old.`);
    }

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    }

    const clearAll = () => {
        setAge("");
        setBirthDate("");
        setTextColor("white");
    }

    return (
        <div className="container">
            <div className="calculator">
                <h1>Age <span>Calculator</span></h1>
                <div className="input-box">
                    <input
                        type="date"
                        id="date"
                        max={new Date().toISOString().split('T')[0]}
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                    <button className='calculate-btn' onClick={calculateAge}><span>Calculate</span></button>
                    <button className='clear-btn' onClick={clearAll}><span>Clear</span></button>
                </div>
                <p id="result" style={{ color: textColor }}>{age}</p>
            </div>
        </div>
    );
};

export default App;
