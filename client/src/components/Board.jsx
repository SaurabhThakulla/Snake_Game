import { useEffect, useState } from "react";

const ROWS = 20;
const COLS = 20;
const TOTAL_CELLS = ROWS * COLS;

export const Board = () => {
  const getRandomFood = (snake) => {
    let food;
    do {
      food = Math.floor(Math.random() * TOTAL_CELLS);
    } while (snake.includes(food));
    return food;
  };

  const [snake, setSnake] = useState([210, 209, 208]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(getRandomFood([210, 209, 208]));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const resetGame = () => {
    const initialSnake = [210, 209, 208];
    setSnake(initialSnake);
    setDirection("RIGHT");
    setFood(getRandomFood(initialSnake));
    setScore(0);
    setGameOver(false);
  };

  // keyboard control
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
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        let newHead = head;

        if (direction === "RIGHT") newHead += 1;
        if (direction === "LEFT") newHead -= 1;
        if (direction === "UP") newHead -= COLS;
        if (direction === "DOWN") newHead += COLS;

        // wall collision
        if (
          newHead < 0 ||
          newHead >= TOTAL_CELLS ||
          (direction === "LEFT" && head % COLS === 0) ||
          (direction === "RIGHT" && head % COLS === COLS - 1)
        ) {
          setGameOver(true);
          return prev;
        }

        // self collision
        if (prev.includes(newHead)) {
          setGameOver(true);
          return prev;
        }

        // food eaten
        if (newHead === food) {
          setFood(getRandomFood(prev));
          setScore((s) => s + 1);
          return [newHead, ...prev]; // grow
        }

        // normal move
        return [newHead, ...prev.slice(0, -1)];
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-black text-green-400 font-mono">
      <div className="mb-4 text-xl">Score: {score}</div>

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
            className={`border border-slate-700
              ${snake.includes(i) ? "bg-green-400" : ""}
              ${i === food ? "bg-red-500" : ""}
            `}
          />
        ))}
      </div>

      {gameOver && (
        <button
          onClick={resetGame}
          className="mt-6 px-4 py-2 border border-green-400 hover:bg-green-400 hover:text-black"
        >
          Restart
        </button>
      )}
    </div>
  );
};
