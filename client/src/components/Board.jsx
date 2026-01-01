import { useEffect, useState } from "react";

const ROWS = 20;
const COLS = 20;
const TOTAL_CELLS = ROWS * COLS;

export const Board = () => {
  // snake stored as indexes (1D)
  const [snake, setSnake] = useState([210, 209, 208]); // start middle
  const [direction, setDirection] = useState("RIGHT");

  // keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  // game loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        let newHead = head;

        if (direction === "RIGHT") newHead = head + 1;
        if (direction === "LEFT") newHead = head - 1;
        if (direction === "UP") newHead = head - COLS;
        if (direction === "DOWN") newHead = head + COLS;

        // wall collision
        if (
          newHead < 0 ||
          newHead >= TOTAL_CELLS ||
          (direction === "LEFT" && head % COLS === 0) ||
          (direction === "RIGHT" && head % COLS === COLS - 1)
        ) {
          return prev; // stop game
        }

        // self collision
        if (prev.includes(newHead)) {
          return prev; // stop game
        }

        return [newHead, ...prev.slice(0, -1)];
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-black">
      <div
        className="
          grid
          w-[600px] h-[600px]
          grid-cols-[repeat(20,1fr)]
          grid-rows-[repeat(20,1fr)]
          border border-slate-600
        "
      >
        {Array.from({ length: TOTAL_CELLS }).map((_, i) => (
          <div
            key={i}
            className={`border border-slate-700 ${
              snake.includes(i) ? "bg-green-400" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};
