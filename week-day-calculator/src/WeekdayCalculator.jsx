import React, { useState } from 'react';

const WeekdayCalculator = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [result, setResult] = useState('');

    const findWeekDay = () => {
        const dayInt = parseInt(day);
        const monthInt = parseInt(month);
        const yearInt = parseInt(year);

        if (!dayInt || !monthInt || !yearInt) {
            setResult('Please enter a valid date!');
            return;
        }

        const weekDay = getWeekDay(dayInt, monthInt, yearInt);
        setResult(`The day is: ${weekDay}`);
    };

    const getWeekDay = (day, month, year) => {
        if (year < 1400) {
            return "This result may be incorrect.";
        }

        let lastTwoDigits = year % 100;
        let quotient = Math.floor(lastTwoDigits / 4);
        let result;

        if (isLeapYear(year)) {
            result = (day + monthChart(month) + centuryChart(year) + lastTwoDigits + quotient - 1) % 7;
        } else {
            result = (day + monthChart(month) + centuryChart(year) + lastTwoDigits + quotient) % 7;
        }

        return weekChart(result);
    };

    const centuryChart = (year) => {
        let century = Math.floor(year / 100);
        let remainder = century % 4;

        switch (remainder) {
            case 0: return 6;
            case 1: return 4;
            case 2: return 2;
            case 3: return 0;
            default: return 0;
        }
    };

    const isLeapYear = (year) => {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    };

    const monthChart = (month) => {
        switch (month) {
            case 1: case 10: return 0;
            case 2: case 3: case 11: return 3;
            case 4: case 7: return 6;
            case 5: return 1;
            case 6: return 4;
            case 8: return 2;
            case 9: case 12: return 5;
            default: return 0;
        }
    };

    const weekChart = (remainder) => {
        switch (remainder) {
            case 0: return 'Sunday';
            case 1: return 'Monday';
            case 2: return 'Tuesday';
            case 3: return 'Wednesday';
            case 4: return 'Thursday';
            case 5: return 'Friday';
            case 6: return 'Saturday';
            default: return 'Invalid Day';
        }
    };

    return (
        <div className="calculator-container">
            <div className="calculator-card">
                <h1 className="calculator-title">Weekday Calculator</h1>

                <div className="calculator-form">
                    <div className="form-group">
                        <label className="input-label">Day:</label>
                        <input
                            type="number"
                            min="1"
                            max="31"
                            className="input-field"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            placeholder="Enter day (1-31)"
                        />
                    </div>

                    <div className="form-group">
                        <label className="input-label">Month:</label>
                        <input
                            type="number"
                            min="1"
                            max="12"
                            className="input-field"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            placeholder="Enter month (1-12)"
                        />
                    </div>

                    <div className="form-group">
                        <label className="input-label">Year:</label>
                        <input
                            type="number"
                            min="1400"
                            className="input-field"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="Enter year (1400+)"
                        />
                    </div>

                    <button
                        onClick={findWeekDay}
                        className="calculate-button"
                    >
                        Calculate Weekday
                    </button>

                    <div className="result-container">
                        <p className="result-text" id="result">
                            {result || "Enter a date to calculate the weekday"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeekdayCalculator;