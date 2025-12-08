"use client";

export default function Timer({ seconds }: { seconds: number }) {
  return (
    <div className="text-white bg-slate-800 px-4 py-2 rounded-lg text-lg font-semibold">
      ⏱️ Timer: {seconds}s
    </div>
  );
}
