import React from 'react'

const TimerForm = ({
  userHours, setUserHours,
  userMinutes, setUserMinutes,
  userSeconds, setUserSeconds,
  // userMonth, setUserMonth,
  // userDay, setUserDay,
  // userYear, setUserYear,
  handleSubmit
}) => {
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='hours'>Hours</label>
          <input
            type='number'
            id='hours'
            value={userHours}
            onChange={(e) => setUserHours(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='minutes'>Minutes</label>
          <input
            type='number'
            id='minutes'
            value={userMinutes}
            onChange={(e) => setUserMinutes(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='seconds'>Seconds</label>
          <input
            type='number'
            id='seconds'
            value={userSeconds}
            onChange={(e) => setUserSeconds(e.target.value)}
          />
        </div>
        <button type='submit'>Submit CountDown</button>
      </form>
    </div>
  );
}

export default TimerForm;