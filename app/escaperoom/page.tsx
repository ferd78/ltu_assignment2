"use client";
import { useState, useEffect } from "react";
import Timer from "./Timer";
import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";
import SaveButton from "./SaveButton"; 

export default function EscapeRoomPage() {
  const [stage, setStage] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  
  useEffect(() => {
    if (stage === 4) {
      setRunning(false);           
    }
  }, [stage]);

  
  async function saveResult(duration: number) {
    setSaveStatus("Saving...");

    try {
      const res = await fetch("/api/session/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration }),
      });

      if (res.ok) setSaveStatus("Saved!");
      else setSaveStatus("Failed to save.");
    } catch (err) {
      setSaveStatus("Error saving.");
    }
  }

 
  function startGame() {
    setGameStarted(true);
    setSeconds(0);
    setRunning(true); 
  }

  function restartGame() {
    setStage(1);
    setSeconds(0);
    setRunning(false);
    setGameStarted(false);
  }

  return (
    <div>
      <h1 className="text-1xl font-semibold px-8 mt-4 text-white">
        Escape Room
      </h1>

      <div className="w-screen h-[70vh] flex pt-5 justify-center">
        <div className="bg-black w-19/20 h-19/20 rounded-xl bg-[url('/bg.jpg')] bg-cover bg-center p-6 overflow-y-auto">

         
          {gameStarted && (
            <div className="w-full flex justify-end mt-3">
              <Timer seconds={seconds} />
            </div>
          )}

          
          {!gameStarted && (
            <div className="w-full h-full flex flex-col justify-center items-center text-white">
              <h2 className="text-3xl font-bold mb-6">Escape Room Challenge</h2>

              <div className="bg-slate-800 px-8 py-12 rounded-xl">
                <div className="text-center">
                  <h1 className="pb-8">Test your skills by solving challenges inside the escape room and getting the fastest time! </h1>
                  <button
                onClick={startGame}
                className="bg-green-500 px-6 py-3 rounded-xl text-xl hover:bg-green-600 hover:cursor-pointer"
                >
                  Start Game →
                </button>
                </div>

                
              </div>

              
            </div>
          )}

         
          {gameStarted && stage === 1 && <StageOne onNext={() => setStage(2)} />}
          {gameStarted && stage === 2 && <StageTwo onNext={() => setStage(3)} />}
          {gameStarted && stage === 3 && <StageThree onNext={() => setStage(4)} />}

        
          {gameStarted && stage === 4 && (
            <div className="flex flex-col justify-center items-center mt-20 text-center text-white">
              
              <h2 className="text-3xl font-bold">
                 Congratulations, You have escaped the room successfully! 
              </h2>

              <div className="mt-6">
                <SaveButton duration={seconds} />
              </div>

              <button
                onClick={restartGame}
                className="mt-4 bg-red-600 px-7 py-2 rounded-xl hover:bg-red-700 hover:cursor-pointer"
              >
                Restart Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
