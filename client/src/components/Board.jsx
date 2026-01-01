const ROWS = 20;
const COLS = 20;
const TOTAL_CELLS = ROWS * COLS;

export const Board = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-b from-[#020617] via-[#020617] to-black text-green-400 font-mono">
      <div className="flex justify-center items-center">
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
            <div key={i} className="border border-slate-700" />
          ))}
        </div>
      </div>
    </div>
  );
};
