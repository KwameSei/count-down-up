import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import TimerForm from '../TimerForm';
import './Frame.scss';

const Frame = () => {
  const [countdownTimers, setCountdownTimers] = useState([]);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [isCountingUp, setIsCountingUp] = useState(false);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(-1);
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

  let countdownInterval;
  let countupInterval;

  // Function to start a new countdown timer
  const startCountdownTimer = (hours, minutes, seconds, index) => {
    // Clear existing timers
    clearInterval(countdownInterval);
    clearInterval(countupInterval);

    const newTimer = { hours, minutes, seconds, index };
    setCountdownTimers([newTimer]);
    setIsCountingDown(true);
    setIsCountingUp(false);
    setCurrentTimerIndex(index);

    countdownInterval = setInterval(() => {
      setCountdownTimers((prevTimers) => {
        return prevTimers.map((timer) => {
          const { hours, minutes, seconds, index } = timer;
          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(countdownInterval);
            setIsCountingDown(false);
            setIsCountingUp(true);
          } else if (hours === 0 && minutes === 0 && seconds === 1) {
            // Handle the timer reaching 0 but showing "00:00:01" before switching to countup
            return { hours: 0, minutes: 0, seconds: 0, index };
          } else {
            let newSeconds = seconds - 1;
            let newMinutes = minutes;
            let newHours = hours;
            if (newSeconds < 0) {
              newSeconds = 59;
              newMinutes -= 1;
            }
            if (newMinutes < 0) {
              newMinutes = 59;
              newHours -= 1;
            }
            return { hours: newHours, minutes: newMinutes, seconds: newSeconds, index };
          }
        });
      });
    }, 1000);
  };

  // Function to stop the timer even before the time is up
  const stopTimer = () => {
    // Clear any existing intervals
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    if (countupInterval) {
      clearInterval(countupInterval);
    }

    setIsCountingDown(false);
    setIsCountingUp(false);
    setActiveFieldIndex(-1);

    setCountdownTimers([]);
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

  // Function to pause a countdown timer
  const pauseCountdownTimer = () => {
    // Clear any existing timers
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    if (countupInterval) {
      clearInterval(countupInterval);
    }

    // Update state to indicate the timer is paused
    setIsCountingDown(false);
    setIsCountingUp(false);

    setActiveFieldIndex(-1) // Reset active form field index
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
    // let interval;
  
    if (isCountingDown) {
      countdownInterval = setInterval(() => {
        // Iterate through each timer and update the countdown
        const updatedTimers = countdownTimers.map((timer) => {
          let { hours, minutes, seconds } = timer;
  
          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(countdownInterval);
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
  
    return () => clearInterval(countdownInterval);
  }, [isCountingDown, countdownTimers]);
  
  useEffect(() => {
    // Count up timer logic
    // let interval;
  
    if (isCountingUp) {
      countupInterval = setInterval(() => {
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
  
    return () => clearInterval(countupInterval);
  }, [isCountingUp, countdownTimers]);  

  return (
    <div className="count-down">
      <div className="body">
      <div className="header">
        <h2>Count Down Up</h2>
      </div>
        <div className="timer-frame">
          {countdownTimers.map((timer, index) => (
            <div key={index} className="timer-container">
              {/* CountdownTimer */}
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
          ))}
          {/* <button onClick={() => removeCountdownTimer(index)}>Remove</button> */}
        </div>
        <div className="add-remove-buttons">
          <Button onClick={addFormField}
            className='add-field-button'
          ><Add />Add Field</Button>
        </div>
        <div className="input-lables">
          <div className='activity-lable'>Activities</div>
          <div className='hours-lable'>Hrs</div>
          <div className='minutes-lable'>Mins</div>
          <div className='seconds-lable'>Sds</div>
        </div>
        <div className="form-fields">
           {formFields.map((field, index) => (
             <div key={index} className="form-field">
               <input
                 type="text"
                 className="activity-value"
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
                 className="input-value"
                 value={field.hours.toString()} // Cast to string
                 onChange={(e) => {
                  const updatedFields = [...formFields]; // Create a copy of formFields
                  updatedFields[index] = { ...updatedFields[index] }; // Create a copy of the field being updated
                  updatedFields[index].hours = parseInt(e.target.value, 10);
                  setFormFields(updatedFields); // Set the updated copy as the new state
                 }}
               />
               <input
                 type="number"
                 className="input-value"
                 value={field.minutes.toString()} // Cast to string
                 onChange={(e) => {
                   const updatedFields = [...formFields];
                   updatedFields[index].minutes = parseInt(e.target.value, 10);
                   setFormFields(updatedFields);
                 }}
               />
               <input
                 type="number"
                 className="input-value"
                 value={field.seconds.toString()} // Cast to string
                 onChange={(e) => {
                   const updatedFields = [...formFields];
                   updatedFields[index].seconds = parseInt(e.target.value, 10);
                   setFormFields(updatedFields);
                 }}
               />
               <Button
                 onClick={() => startCountdownTimer(field.hours, field.minutes, field.seconds, index)}
                 disabled={activeFieldIndex !== -1 && activeFieldIndex !== index}
                 className="start-button"
               >
                 Start
               </Button>

               {/* <Button onClick={() => pauseCountdownTimer()}
                  disabled={activeFieldIndex !== -1 && activeFieldIndex !== index}
                  className='pause-button'
               >
                Pause
               </Button> */}

               <Button onClick={() => stopTimer()}
                className='stop-button'
               >Stop</Button>
               {/* <Button
                 onClick={() => updateCountdownTimer(index, field.hours, field.minutes, field.seconds)}
                 disabled={activeFieldIndex !== -1 && activeFieldIndex !== index}
               >
                 Update Timer
               </Button> */}

               <Button onClick={() => removeFormField(index)}
                className='remove-button'
               >Remove</Button>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default Frame;
