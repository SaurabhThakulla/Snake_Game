import { useState } from "react";

export const Head = () => {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  function start() {
    if (intervalId !== null) return;

    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    setIntervalId(id);
    setIsRunning(true);
  }

  function pause() {
    clearInterval(intervalId);
    setIntervalId(null);
    setIsRunning(false);
  }

  return (
    <div className="flex justify-around items-center w-full h-[15vh] card text">
      <div>Score</div>
      <div>Time: {timer}</div>

      {isRunning ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={start} >
          Start
        </button>
      )}
    </div>
  );
};
