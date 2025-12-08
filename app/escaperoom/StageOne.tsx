"use client";
import { useState } from "react";

type StageProps = {
  onNext: () => void;
};

export default function StageOne({ onNext } : StageProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const checkAnswer = () => {
    try {
      const fn = new Function(code + "; return escape();");
      const result = fn();

      if (result === "ESCAPED") {
        onNext();
      } else {
        setError("Your function must return EXACTLY \"ESCAPED\".");
      }
    } catch (e) {
      setError("Your code has an error. Double check syntax!");
    }
  };


  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-3">Stage 1</h2>
      <p className="mb-3">
        Write a function named "escape" that returns <b>"ESCAPED"</b>.
      </p>
    

    <div className="bg-slate-800 rounded-xl">
         <textarea
        className="w-full h-40 p-2 text-white rounded"
        placeholder={`Example:
            function escape() {
            return "ESCAPED";
            }`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
     

      {error && <p className="text-red-400 mt-2">{error}</p>}

      <button
        className="mt-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-800 hover:cursor-pointer"
        onClick={checkAnswer}
      >
        Submit →
      </button>
    </div>
  );
}
