"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setMounted(true);
    setToday(new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }));
  }, []);

  if (!mounted) {
    return (
      <div className="fixed bottom-0 left-0 w-full flex justify-center">
        <div className="bg-tealzero h-12 w-98/100 mb-4 rounded-md flex transition-all duration-300 items-center justify-between px-6 text-white font-semibold">
          <p className="text-sm">© LTU Assignment 1</p>
          <div className="text-center text-sm">
            <p className=""> Student ID: 22586555</p>
          </div>
          <p className="text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center">
      <div className={`${theme === "dark" ? "bg-lighterblue" : "bg-tealzero"} h-12 w-98/100 mb-4 rounded-md flex transition-all duration-300 items-center justify-between px-6 text-white font-semibold`}>
        
        <p className="text-sm">© LTU Assignment 1</p>

        
        <div className="text-center text-sm">
          <p className=""> Student ID: 22586555</p>
        </div>

        
        <p className="text-sm">Date: {today}</p>
      </div>
    </div>
  );
}