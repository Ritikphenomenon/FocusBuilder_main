import { useState, useEffect } from 'react';
import SetTimerForm from './SetTimerForm';

function PomodoroClock() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (timerLabel === "Session") {
      setTimeLeft(sessionLength * 60);
    } else {
      setTimeLeft(breakLength * 60);
    }
  }, [sessionLength, breakLength, timerLabel]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (timerLabel === "Session") {
        setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel("Session");
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, timerLabel, breakLength, sessionLength]);

  const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return (
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds
    );
  };

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          return prevTime - 1;
        });
      }, 1000);
      setIntervalId(newIntervalId);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setShowForm(true); // Show the form again
  };

  return (
    <div className="flex flex-col items-center justify-center w-auto h-auto " >
      {showForm ? (
        <SetTimerForm
          setSessionLength={setSessionLength}
          setBreakLength={setBreakLength}
          onSubmit={() => setShowForm(false)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center border  rounded-lg w-[250px] h-auto  p-4 backdrop-blur-lg
        relative " 
        style={{  backgroundColor: 'rgba(0, 0, 0, 0.2)'  }}
        >
          <h1 className="text-2xl font-bold mb-4">{timerLabel}</h1>
         

          <div className="relative">
  <svg className="w-48 h-48 transform -rotate-90">
    <circle
      cx="96"
      cy="96"
      r="85"
      stroke="currentColor"
      strokeWidth="22"
      fill="none"
      className=""
    />
    <circle
      cx="96"
      cy="96"
      r="85"
      stroke="url(#gradient)"
      strokeWidth="15"
      strokeLinecap="round"  // Round line ends
      fill="black"
      className="text-blue-500"
      strokeDasharray={2 * Math.PI * 85}
      strokeDashoffset={(1 - timeLeft / (timerLabel === "Session" ? sessionLength * 60 : breakLength * 60)) * 2 * Math.PI * 85}
     
    />
    <defs>
      <linearGradient id="gradient">
        <stop offset="0%" stopColor="#4299e1" />
        <stop offset="50%" stopColor="#3182ce" />
        <stop offset="100%" stopColor="#4299e1" />
      </linearGradient>
    </defs>
  </svg>
  <div className="absolute inset-0 flex items-center justify-center text-4xl text-white">
    {formatTime(timeLeft)}
  </div>
</div>




         
          <div className="flex space-x-4 mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={toggleTimer}
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={resetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PomodoroClock;
