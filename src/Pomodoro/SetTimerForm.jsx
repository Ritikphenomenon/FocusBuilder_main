import  { useState } from "react";

function SetTimerForm({ setSessionLength, setBreakLength, onSubmit }) {
  const [focusLength, setFocusLength] = useState(25);
  const [breakLengthInput, setBreakLengthInput] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSessionLength(focusLength);
    setBreakLength(breakLengthInput);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className=" p-4    space-y-4 rounded backdrop-blur-lg
        relative" style={{  backgroundColor: 'rgba(0, 0, 0, 0.2)'  }}>
      <h2 className="text-2xl font-bold text-white">Session</h2>
      <div className="flex space-x-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-white">Focus</label>
          <input
            type="number"
            value={focusLength}
            onChange={(e) => setFocusLength(e.target.value)}
            className="border rounded px-2 py-1 bg-neutral-800 text-white"
            min="1"
            
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white font-semibold text-sm">Break</label>
          <input
            type="number"
            value={breakLengthInput}
            onChange={(e) => setBreakLengthInput(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 bg-neutral-800 text-white"
            min="1"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        SET
      </button>
    </form>
  );
}

export default SetTimerForm;
