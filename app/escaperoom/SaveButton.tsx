"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";

export default function SaveButton({ duration }: { duration: number }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  async function save() {
    setStatus("saving");

    try {
      const res = await fetch("/api/session/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration }),
      });

      const data = await res.json();

      if (!data.success) {
        setStatus("idle");
        return;
      }

      // Generate the PDF receipt using returned session data
      await generatePDF(data.session);

      setStatus("saved");
    } catch (err) {
      setStatus("idle");
    }
  }

  async function generatePDF(session: any) {
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([600, 400]);
    const font = await pdf.embedFont(StandardFonts.Courier);

    const { id, playerId, duration, startedAt, endedAt } = session;

    const text = `
---------------------------------------
        Escape Room – Session
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

    // Trigger download of pdf
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `session-${id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={save}
      disabled={status === "saving" || status === "saved"}
      className={`px-8 py-2 rounded-xl text-white 
        ${status === "saved" ? "bg-green-600" : "bg-blue-600 hover:bg-blue-800 cursor-pointer"}
      `}
    >
      {status === "idle" && "Save Results"}
      {status === "saving" && "Saving..."}
      {status === "saved" && "Saved & Downloaded!"}
    </button>
  );
}
