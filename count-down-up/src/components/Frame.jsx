import React, { useEffect, useState } from 'react';
import TimerForm from './TimerForm';

const Frame = () => {
  const [timeLeft, setTimeLeft] = useState({});  // { hours: 0, minutes: 0, seconds: 0 }
  const [timeUp, setTimeUp] = useState(false);
  const [timeUpMessage, setTimeUpMessage] = useState('');
  const [countDown, setCountDown] = useState(false);
  const [countUp, setCountUp] = useState(false);
  // const [year] = useState(new Date().getFullYear())
  // const [month] = useState(new Date().getMonth())
  // const [day] = useState(new Date().getDate());
  // let [hour] = useState(new Date().getHours());
  // let [minute] = useState(new Date().getMinutes());
  // let [second] = useState(new Date().getSeconds());
  // let [milliseconds] = useState(new Date().getMilliseconds());
  // let [time] = useState(new Date().getTime());
  // const [eventDate] = useState(new Date(hour, minute, second));
  // const [timeZoneOffset] = useState(new Date().getTimezoneOffset());
  // const [timeZone] = useState(new Date().getTimezoneOffset() / 60);
  // const [utc] = useState(new Date().toUTCString());
  // const [utcDate] = useState(new Date().getUTCDate());
  // const [utcDay] = useState(new Date().getUTCDay());
  // const [utcFullYear] = useState(new Date().getUTCFullYear());
  // const [utcHours] = useState(new Date().getUTCHours());
  // const [utcMinutes] = useState(new Date().getUTCMinutes());
  // const [utcMonth] = useState(new Date().getUTCMonth());
  // const [utcSeconds] = useState(new Date().getUTCSeconds());
  // const [utcTime] = useState(new Date().getUTCTime());

  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  let second = new Date().getSeconds();
  let milliseconds = new Date().getMilliseconds();

  const [userHours, setUserHours] = useState(0);
  const [userMinutes, setUserMinutes] = useState(0);
  const [userSeconds, setUserSeconds] = useState(0);
  const [userMilliseconds, setUserMilliseconds] = useState(0);
  const [userMonth, setUserMonth] = useState(0);
  const [userDay, setUserDay] = useState(0);
  const [userYear, setUserYear] = useState(0);
  // const [eventDate, setEventDate] = useState(new Date(userYear, userMonth, userDay, userHours, userMinutes, userSeconds));
  const [eventDate, setEventDate] = useState(null);

  useEffect(() => {
    if (eventDate) {
      
    const interval = setInterval(() => {
      const now = new Date().getTime();
      // const distance = now.getTime() - time
      const distance = eventDate - now;

      // const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
      const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60))
      const seconds = Math.floor(distance % (1000 * 60) / 1000)
      const milliseconds = Math.floor(distance % (1000))
      setTimeLeft({ hours, minutes, seconds })
      if (distance < 0) {
        if (!countUp) {
          setCountUp(true)
          setCountDown(false)

          clearInterval(interval)
          setTimeUp(true)
          setTimeUpMessage('Time is up!')

          return;

        } else {
          hour = minutes = seconds = milliseconds = 0;
        }
      }

      // Update Timer
      setTimeLeft({ hours, minutes, seconds, milliseconds });
    }, 1000)

    return () => clearInterval(interval)
    }
  }, [eventDate, countUp])

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert user input to numbers
    const hoursToAdd = parseInt(userHours, 10);
    const secondsToAdd = parseInt(userSeconds, 10);
    const minutesToAdd = parseInt(userMinutes, 10);
    const millisecondsToAdd = parseInt(userMilliseconds, 10);

    // Calculate the target date and time
    const now = new Date();
    const targetDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours() + hoursToAdd,
      now.getMinutes() + minutesToAdd,
      now.getSeconds() + secondsToAdd,
      now.getMilliseconds() + millisecondsToAdd
    );

    setEventDate(targetDate);
    setCountDown(true);
    setCountUp(false);
  }

  return (
    <div>
      <div className="count-down">
        <div className="count-down__header">
          <h2>Count Down</h2>
        </div>
        <div className="count-down__body">
          <div className="count-down__body__timer">
            <div className="count-down__body__timer__hours">
              <h3>{timeLeft.hours}</h3>
              <p>Hours</p>
            </div>
            <div className="count-down__body__timer__minutes">
              <h3>{timeLeft.minutes}</h3>
              <p>Minutes</p>
            </div>
            <div className="count-down__body__timer__seconds">
              <h3>{timeLeft.seconds}</h3>
              <p>Seconds</p>
            </div>
            <div className="count-down__body__timer__milliseconds">
              <h3>{timeLeft.milliseconds}</h3>
              <p>Milliseconds</p>
            </div>
          </div>
        </div>
        <div className="count-down__footer">
          <TimerForm
            userHours={userHours}
            setUserHours={setUserHours}
            userMinutes={userMinutes}
            setUserMinutes={setUserMinutes}
            userSeconds={userSeconds}
            setUserSeconds={setUserSeconds}
            userMilliseconds={userMilliseconds}
            setUserMilliseconds={setUserMilliseconds}
            userMonth={userMonth}
            setUserMonth={setUserMonth}
            userDay={userDay}
            setUserDay={setUserDay}
            userYear={userYear}
            setUserYear={setUserYear}
            handleSubmit={handleSubmit}
          />
          </div>
      </div>
    </div>
  )
}

export default Frame;