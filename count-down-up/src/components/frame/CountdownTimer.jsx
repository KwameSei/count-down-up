import React, { useState, useEffect } from 'react';

export const CountdownTimer = ({ hours, minutes, seconds, isCountingDown, setIsCountingDown, isCountingUp, setIsCountingUp }) => {
  const [timeLeft, setTimeLeft] = useState({ hours, minutes, seconds });

  useEffect(() => {
    let interval;

    if (isCountingDown) {
      interval = setInterval(() => {
        if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
          clearInterval(interval);
          setIsCountingDown(false);
          setIsCountingUp(true);
        } else {
          if (timeLeft.seconds > 0) {
            setTimeLeft((prevTime) => ({
              ...prevTime,
              seconds: prevTime.seconds - 1,
            }));
          } else if (timeLeft.minutes > 0) {
            setTimeLeft((prevTime) => ({
              ...prevTime,
              minutes: prevTime.minutes - 1,
              seconds: 59,
            }));
          } else {
            setTimeLeft((prevTime) => ({
              hours: prevTime.hours - 1,
              minutes: 59,
              seconds: 59,
            }));
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCountingDown, timeLeft, setIsCountingDown, setIsCountingUp]);

  useEffect(() => {
    let interval;

    if (isCountingUp) {
      interval = setInterval(() => {
        if (timeLeft.seconds < 59) {
          setTimeLeft((prevTime) => ({
            ...prevTime,
            seconds: prevTime.seconds + 1,
          }));
        } else if (timeLeft.minutes < 59) {
          setTimeLeft((prevTime) => ({
            ...prevTime,
            minutes: prevTime.minutes + 1,
            seconds: 0,
          }));
        } else {
          setTimeLeft((prevTime) => ({
            hours: prevTime.hours + 1,
            minutes: 0,
            seconds: 0,
          }));
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCountingUp, timeLeft, setIsCountingDown, setIsCountingUp]);

  return (
    <div className="countdown-timer">
      <div className="timer">
        <div className="time-unit">
          <span className="time">{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</span>
          <span className="unit">Hours</span>
        </div>
        <div className="time-unit">
          <span className="time">{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</span>
          <span className="unit">Minutes</span>
        </div>
        <div className="time-unit">
          <span className="time">{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
          <span className="unit">Seconds</span>
        </div>
      </div>
    </div>
  );
};
