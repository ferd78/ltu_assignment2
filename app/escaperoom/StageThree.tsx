"use client";
import { useState } from "react";

type StageProps = {
  onNext: () => void;
};

export default function StageThree({ onNext }: StageProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const checkAnswer = () => {
    try {
      let output: number[] = [];

      
      const fn = new Function("output", `
        const originalLog = console.log;
        console.log = (v) => output.push(v);

        ${code}

        console.log = originalLog;
      `);

      
      fn(output);

      const expected = [1,2,3,4,5,6,7,8,9,10];
      const correct = JSON.stringify(output) === JSON.stringify(expected);

      if (correct) {
        onNext();
      } else {
        setError("Your loop must print EXACTLY the numbers 1 through 10.");
      }
    } catch (e) {
      setError("Code error. Check syntax and try again.");
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-3">Stage 3</h2>
      <p className="mb-3">Write a loop that prints numbers from <b>1 to 10</b>.</p>

      <div className="bg-slate-800 rounded-xl">
        <textarea
          className="w-full h-40 p-2 text-white rounded"
          placeholder={`Example:
for (let i = 1; i <= 10; i++) {
  console.log(i);
}`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      {error && <p className="text-red-400 mt-2">{error}</p>}

      <button
        className="mt-4 bg-green-500 px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer"
        onClick={checkAnswer}
      >
        Escape →
      </button>
    </div>
  );
}
