"use client";

import { useState, useEffect } from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import Timer from "./Timer";
import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";

export default function EscapeRoomPage() {
  const [stage, setStage] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const [savedSessionId, setSavedSessionId] = useState<number | null>(null);
  const [savedSessionName, setSavedSessionName] = useState<string | null>(null);
  const [savedSessionData, setSavedSessionData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  
  function getValidSessionId() {
    if (savedSessionId === null || savedSessionId === undefined) return null;
    if (typeof savedSessionId !== "number") return null;
    if (Number.isNaN(savedSessionId)) return null;
    return savedSessionId;
  }

  
  useEffect(() => {
    if (!running) return;
    const int = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(int);
  }, [running]);

  
  useEffect(() => {
    if (stage === 4) setRunning(false);
  }, [stage]);

  
  async function generatePDF(sessionData: any) {
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([600, 400]);
    const font = await pdf.embedFont(StandardFonts.Courier);

    const { id, playerId, duration, startedAt, endedAt, sessionName } = sessionData;

    const text = `
---------------------------------------
        Escape Room – ${sessionName}
---------------------------------------
Session ID: ${id}
Player ID: ${playerId}
Start Time (WIB):
${new Date(startedAt).toLocaleString("en-GB", { timeZone: "Asia/Jakarta" })}

End Time (WIB):
${new Date(endedAt).toLocaleString("en-GB", { timeZone: "Asia/Jakarta" })}

Duration: ${duration} seconds
---------------------------------------
Thank you for playing!
---------------------------------------
`;

    page.drawText(text, {
      x: 40,
      y: 350,
      size: 12,
      font,
      lineHeight: 14,
    });

    const pdfBytes = await pdf.save();

    const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `session-${id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // 
  async function saveResult() {
    const sessionName = prompt("Name your session:");
    if (!sessionName) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/session/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration: seconds, sessionName }),
      });

      const data = await res.json();
      if (!res.ok || !data.session) {
        alert("Failed to save session.");
        return;
      }

      const newId = data.session.id;

      // Validate received ID
      if (typeof newId === "number" && !Number.isNaN(newId)) {
        setSavedSessionId(newId);
        setSavedSessionName(data.session.sessionName);
        setSavedSessionData(data.session);
        
        // Generate and download PDF immediately
        await generatePDF(data.session);
        
        alert("Session saved and PDF downloaded!");
      } else {
        console.error("Invalid session ID from backend:", newId);
        alert("Failed to save session.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving session.");
    } finally {
      setIsSaving(false);
    }
  }

  // download session data
  async function downloadPDF() {
    const id = getValidSessionId();
    if (!id) return alert("No valid session to download.");

    try {
      // Fetch the latest session data
      const res = await fetch(`/api/session/${id}`);
      
      if (!res.ok) {
        alert("Failed to fetch session data.");
        return;
      }

      const sessionData = await res.json();
      await generatePDF(sessionData);
    } catch (err) {
      console.error(err);
      alert("Error downloading PDF.");
    }
  }

  // rename session
  async function renameSession() {
    const id = getValidSessionId();
    if (!id) return alert("No valid session ID.");

    const newName = prompt("Enter new session name:", savedSessionName || "");
    if (!newName) return;

    try {
      const res = await fetch(`/api/session/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionName: newName }),
      });

      if (res.ok) {
        const updatedData = await res.json();
        setSavedSessionName(newName);
        setSavedSessionData(updatedData);
        alert("Session renamed successfully!");
      } else {
        alert("Rename failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error renaming session.");
    }
  }

  // delete session
  async function deleteSession() {
    const id = getValidSessionId();
    if (!id) return alert("No valid session to delete.");
    if (!confirm("Delete this session?")) return;

    try {
      const res = await fetch(`/api/session/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Session deleted.");
        restartGame();
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting session.");
    }
  }

  // game flow
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
    setSavedSessionId(null);
    setSavedSessionName(null);
    setSavedSessionData(null);
  }

  return (
    <div>
      <h1 className="text-1xl font-semibold px-8 mt-4 text-white">Escape Room</h1>

      <div className="w-screen h-[70vh] flex pt-5 justify-center">
        <div className="bg-black w-19/20 h-19/20 rounded-xl bg-[url('/bg.jpg')] bg-cover bg-center p-6 overflow-y-auto">

          {/* timer component */}
          {gameStarted && (
            <div className="w-full flex justify-end mt-3">
              <Timer seconds={seconds} />
            </div>
          )}

          {/* start screen load */}
          {!gameStarted && (
            <div className="w-full h-full flex flex-col justify-center items-center text-white">
              <h2 className="text-3xl font-bold mb-6">Escape Room Challenge</h2>

              <div className="bg-slate-800 px-8 py-12 rounded-xl">
                <div className="text-center">
                  <h1 className="pb-8">
                    Solve the puzzles and escape with the fastest time!
                  </h1>
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

          {/* stages*/}
          {gameStarted && stage === 1 && <StageOne onNext={() => setStage(2)} />}
          {gameStarted && stage === 2 && <StageTwo onNext={() => setStage(3)} />}
          {gameStarted && stage === 3 && <StageThree onNext={() => setStage(4)} />}

          {/* end screen */}
          {gameStarted && stage === 4 && (
            <div className="flex flex-col justify-center items-center mt-20 text-center text-white">

              <h2 className="text-3xl font-bold">You escaped!</h2>
              <div className="mt-4">
                <Timer seconds={seconds} />
              </div>

              {/* save button */}
              {savedSessionId === null && (
                <div className="mt-6">
                  <button
                    onClick={saveResult}
                    disabled={isSaving}
                    className="bg-blue-600 px-8 py-2 rounded-xl hover:bg-blue-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Saving..." : "Save Results"}
                  </button>
                </div>
              )}

              {/* session management */}
              {savedSessionId !== null && (
                <div className="mt-6 bg-slate-800 p-6 rounded-xl">
                  <p className="text-lg mb-4">
                    Session: <span className="font-semibold">{savedSessionName}</span>
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={downloadPDF}
                      className="bg-green-600 px-7 py-2 rounded-xl hover:bg-green-700"
                    >
                      Download Session Data
                    </button>

                    <button
                      onClick={renameSession}
                      className="bg-blue-600 px-7 py-2 rounded-xl hover:bg-blue-700"
                    >
                      Rename Session
                    </button>

                    <button
                      onClick={deleteSession}
                      className="bg-red-600 px-7 py-2 rounded-xl hover:bg-red-700"
                    >
                      Delete Session
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={restartGame}
                className="mt-6 bg-gray-600 px-7 py-2 rounded-xl hover:bg-gray-700"
              >
                Start New Game
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}