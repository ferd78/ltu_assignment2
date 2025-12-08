"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    if (mounted && pathname) {
      localStorage.setItem('lastActivePage', pathname);
    }
  }, [pathname, mounted]);

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return (
      <div>
        {/* Top Row */}
        <div className="flex justify-between pt-5 px-6 pb-5">
          <h2 className="text-white font-semibold tracking-[1.25] text-md">
            <div className="flex items-center justify-center gap-2">
              <Image src="/la-trobe.png" width={20} height={20} alt="La Trobe Logo" />
              <p>LTU Assignment</p>
            </div>
          </h2>
          <h2 className="text-white font-semibold tracking-[1.25] text-md">
            Student ID: 22586555
          </h2>
        </div>

        {/* Nav Links - Static fallback */}
        <div className="flex justify-center pb-4">
          <div className="bg-tealzero transition-all duration-200 w-98/100 h-18 rounded-xl flex items-center gap-14 px-4 text-white font-semibold text-md">
            <div className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
              Tabs
            </div>
            <div className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
              Pre-Lab Questions
            </div>
            <div className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
              Escape Room
            </div>
            <div className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
              Coding Races
            </div>

            <div className="ml-auto px-1 flex items-center gap-4">
              <div className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
                About
              </div>
              <RxHamburgerMenu size={30} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const bgClass = theme === "dark" ? "bg-lighterblue" : "bg-tealzero";

  return (
    <div>
      {/* Top Row */}
      <div className="flex justify-between pt-5 px-6 pb-5">
        <h2 className="text-white font-semibold tracking-[1.25] text-md">
          <div className="flex items-center justify-center gap-2">
            <Image src="/la-trobe.png" width={20} height={20} alt="La Trobe Logo" />
            <p>LTU Assignment </p>
          </div>
        </h2>
        <h2 className="text-white font-semibold tracking-[1.25] text-md">
          Student ID: 22586555
        </h2>
      </div>

      {/* Nav Links */}
      <div className="flex justify-center pb-4">
        <div
          className={`${bgClass} transition-all duration-200 w-98/100 h-18 rounded-xl flex items-center gap-14 px-4 text-white font-semibold text-md relative`}
        >
          {/* Always visible main nav links */}
          <Link href="/" className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
            Tabs
          </Link>
          <Link href="/prelabquestions" className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
            Pre-Lab Questions
          </Link>
          <Link href="/escaperoom" className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
            Escape Room
          </Link>
          <Link href="/codingraces" className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer">
            Coding Races
          </Link>

          <div className="ml-auto px-1 flex items-center gap-4 cursor-pointer">
            {/* About link - hidden when space is tight */}
            <Link href="/about" className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer hidden lg:block">
              About
            </Link>
            
            {/* Hamburger menu for About (shown when space is tight) */}
            <button
              onClick={() => setIsAboutMenuOpen(!isAboutMenuOpen)}
              className="lg:hidden p-2 rounded transition-colors relative"
            >
              <RxHamburgerMenu size={24} />
            </button>
          </div>

          {/* Small About Popup - positioned relative to navbar */}
          {isAboutMenuOpen && (
            <div className="absolute top-full right-4 mt-2 z-50 cursor-pointer">
              <div 
                className={`${bgClass} rounded-lg p-4 shadow-xl min-w-32`}
              >
                <Link 
                  href="/about" 
                  className="hover:underline underline-offset-4 transition-all duration-500 cursor-pointer"
                  onClick={() => setIsAboutMenuOpen(false)}
                >
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
