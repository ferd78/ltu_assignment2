"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AboutPage(){
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="min-h-screen px-4 py-8">
                <h1 className="text-2xl font-semibold text-white mb-8 text-center">About</h1>
                <div className="max-w-md mx-auto bg-tealzero rounded-xl p-6 mb-8">
                    <div className="text-white space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Student Name</h2>
                            <p className="text-sm">Felix Ferdinand</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Student ID</h2>
                            <p className="text-sm">22586555</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-2xl mx-auto">
                    <div className="relative aspect-video bg-tealzero rounded-lg animate-pulse"></div>
                </div>
            </div>
        );
    }

    const containerBg = theme === "dark" ? "bg-lighterblue" : "bg-tealzero";

    return (
        <div className="min-h-screen px-4 py-8">
            <h1 className="text-2xl font-semibold text-white mb-8 text-center">About</h1>
            
            {/* Student Info */}
            <div className={`max-w-md mx-auto rounded-xl p-6 mb-8 ${containerBg}`}>
                <div className="text-white space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Student Name:</h2>
                        <p className="text-sm">Felix Ferdinand</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Student ID:</h2>
                        <p className="text-sm">22586555</p>
                    </div>
                </div>
            </div>

            {/* YouTube Video Embed */}
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/5pkYvOz05eg?si=otvfqDKF5b8oVzDo" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </div>
            </div>
        </div>
    );
}