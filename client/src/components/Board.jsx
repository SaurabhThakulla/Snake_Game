const ROWS = 20;
const COLS = 20;
const TOTAL_CELLS = ROWS * COLS;

export const Board = () => {
  return (
    <div className="flex justify-center items-center h-[70vh] bg-slate-900">
      <div
        className="grid w-[50vw] h-[60vh]"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: TOTAL_CELLS }).map((_, i) => (
          <div key={i} className="border border-slate-700 text-2xl" />
        ))}
      </div>
    </div>
  );
};
