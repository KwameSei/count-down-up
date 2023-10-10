import React, { useEffect, useState } from 'react';
import TimerForm from '../TimerForm';
import './Frame.scss';

const Frame = () => {
  const [countdownTimers, setCountdownTimers] = useState([]);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [isCountingUp, setIsCountingUp] = useState(false);
  const [activity, setActivity] = useState('');
  const [formFields, setFormFields] = useState([  // Setting default number of form fields
    { hours: 0, minutes: 0, seconds: 0, activity: '' },
    { hours: 0, minutes: 0, seconds: 0, activity: '' },
    { hours: 0, minutes: 0, seconds: 0, activity: '' },
    { hours: 0, minutes: 0, seconds: 0, activity: '' },
    { hours: 0, minutes: 0, seconds: 0, activity: '' },
    { hours: 0, minutes: 0, seconds: 0, activity: '' },
    { hours: 0, minutes: 0, seconds: 0, activity: '' },
    { hours: 0, minutes: 0, seconds: 0, activity: '' },
    { hours: 0, minutes: 0, seconds: 0, activity: '' },
  ]); // State for form fields
  // Disable inactive form fields
  const [activeFieldIndex, setActiveFieldIndex] = useState(-1); // State for active form field

  let interval;

  // Function to start a new countdown timer
  const startCountdownTimer = (hours, minutes, seconds, index) => {
    const newTimer = { hours, minutes, seconds };
    setCountdownTimers([...countdownTimers, newTimer]);
    setIsCountingDown(true);
    setActiveFieldIndex(index)  // Set active form field index
  };

  // Function to stop the timer even before the time is up
  const stopTimer = () => {
    // Clear any existing timers
    clearInterval(interval);
  
    // Update state to indicate the timer is stopped
    setIsCountingDown(false);
    setIsCountingUp(false);
  
    // Optionally, reset the timer values to their initial state
    setCountdownTimers([]);

    setActiveFieldIndex(-1) // Reset active form field index
  };

  // Function to update a countdown timer
  const updateCountdownTimer = (index, hours, minutes, seconds) => {
    if (index >= 0 && index < countdownTimers.length) {
      const updatedTimers = [...countdownTimers];
      updatedTimers[index] = { hours, minutes, seconds };
      setCountdownTimers(updatedTimers);
    }
  };

  // Function to remove a countdown timer by index
  const removeCountdownTimer = (index) => {
    if (index >= 0 && index < countdownTimers.length) {
      const updatedTimers = [...countdownTimers];
      updatedTimers.splice(index, 1);
      setCountdownTimers(updatedTimers);
    }
  };

  // Function to add a new form field
  const addFormField = () => {
    const newFormField = { hours: 0, minutes: 0, seconds: 0, activity: '' };
    setFormFields([...formFields, newFormField]);
  };

  // Function to remove a form field by index
  const removeFormField = (index) => {
    if (index >= 0 && index < formFields.length) {
      const updatedFields = [...formFields];
      updatedFields.splice(index, 1);
      setFormFields(updatedFields);
    }
  };

  useEffect(() => {
    // Countdown timer logic
    let interval;
  
    if (isCountingDown) {
      interval = setInterval(() => {
        // Iterate through each timer and update the countdown
        const updatedTimers = countdownTimers.map((timer) => {
          let { hours, minutes, seconds } = timer;
  
          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(interval);
            setIsCountingDown(false);
            setIsCountingUp(true); // Start counting up
            return timer;
          }
  
          if (seconds > 0) {
            seconds--;
          } else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          }
  
          return { hours, minutes, seconds };
        });
  
        setCountdownTimers(updatedTimers);
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [isCountingDown, countdownTimers]);
  
  useEffect(() => {
    // Count up timer logic
    let interval;
  
    if (isCountingUp) {
      interval = setInterval(() => {
        // Iterate through each timer and update the count up
        const updatedTimers = countdownTimers.map((timer) => {
          let { hours, minutes, seconds } = timer;
  
          seconds++;
  
          if (seconds === 60) {
            seconds = 0;
            minutes++;
  
            if (minutes === 60) {
              minutes = 0;
              hours++;
            }
          }
  
          return { hours, minutes, seconds };
        });
  
        setCountdownTimers(updatedTimers);
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [isCountingUp, countdownTimers]);  

  return (
    <div className="count-down">
      <div className="header">
        <h2>Count Down Up</h2>
      </div>
      <div className="body">
        <div className="timer-frame">
          {countdownTimers.map((timer, index) => (
            <div key={index} className="timer">
              {/* CountdownTimer */}
              <div className="countdown-timer">
                <div className="timer">
                  <div className="time-unit">
                    <span className="time">{timer.hours < 10 ? `0${timer.hours}` : timer.hours}</span>
                    <span className="unit">Hours</span>
                  </div>
                  <div className="time-unit">
                    <span className="time">{timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}</span>
                    <span className="unit">Minutes</span>
                  </div>
                  <div className="time-unit">
                    <span className="time">{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}</span>
                    <span className="unit">Seconds</span>
                  </div>
                </div>
              </div>
              <button onClick={() => removeCountdownTimer(index)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="add-remove-buttons">
          <button onClick={addFormField}>Add Form Field</button>
        </div>
        <div className="form-fields">
           {formFields.map((field, index) => (
             <div key={index} className="form-field">
               <input
                 type="text"
                 value={field.activity}
                 placeholder='activity'
                 onChange={(e) => {
                   const updatedFields = [...formFields];
                   updatedFields[index].activity = e.target.value;
                   setFormFields(updatedFields);
                 }}
               />
               <input
                 type="number"
                 value={field.hours.toString()} // Cast to string
                 onChange={(e) => {
                   const updatedFields = [...formFields];
                   updatedFields[index].hours = parseInt(e.target.value, 10);
                   setFormFields(updatedFields);
                 }}
               />
               <input
                 type="number"
                 value={field.minutes.toString()} // Cast to string
                 onChange={(e) => {
                   const updatedFields = [...formFields];
                   updatedFields[index].minutes = parseInt(e.target.value, 10);
                   setFormFields(updatedFields);
                 }}
               />
               <input
                 type="number"
                 value={field.seconds.toString()} // Cast to string
                 onChange={(e) => {
                   const updatedFields = [...formFields];
                   updatedFields[index].seconds = parseInt(e.target.value, 10);
                   setFormFields(updatedFields);
                 }}
               />
               <button
                 onClick={() => startCountdownTimer(field.hours, field.minutes, field.seconds, index)}
                 disabled={activeFieldIndex !== -1 && activeFieldIndex !== index}
               >
                 Start Timer
               </button>
               <button onClick={() => stopTimer()}>Stop Timer</button>
               <button
                 onClick={() => updateCountdownTimer(index, field.hours, field.minutes, field.seconds)}
                 disabled={activeFieldIndex !== -1 && activeFieldIndex !== index}
               >
                 Update Timer
               </button>
               <button onClick={() => removeFormField(index)}>Remove Field</button>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default Frame;
