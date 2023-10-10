import React from 'react';

const TimerForm = ({ formData, index, handleInputChange }) => {
  const { hours, minutes, seconds } = formData;

  const handleHoursChange = (e) => {
    handleInputChange('hours', parseInt(e.target.value, 10));
  };

  const handleMinutesChange = (e) => {
    handleInputChange('minutes', parseInt(e.target.value, 10));
  };

  const handleSecondsChange = (e) => {
    handleInputChange('seconds', parseInt(e.target.value, 10));
  };

  return (
    <div className="timer-form">
      <h3>Timer {index + 1}</h3>
      <div className="form-group">
        <label htmlFor="hours">Hours</label>
        <input
          type="number"
          id="hours"
          value={hours}
          onChange={handleHoursChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="minutes">Minutes</label>
        <input
          type="number"
          id="minutes"
          value={minutes}
          onChange={handleMinutesChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="seconds">Seconds</label>
        <input
          type="number"
          id="seconds"
          value={seconds}
          onChange={handleSecondsChange}
        />
      </div>
    </div>
  );
};

export default TimerForm;
