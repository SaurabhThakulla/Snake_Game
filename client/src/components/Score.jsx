import { useState } from "react";

export const Score = () => {
  const [score, setscore] = useState(0);

  return (
    <div className="flex justify-around items-center w-full h-[15vh] card text">
      <div>Score : {score}</div>
    </div>
  );
};
