import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

const SERIF = { fontFamily: "'Spectral', Georgia, serif" };
const MONO = { fontFamily: "'Space Mono', 'Courier New', monospace" };

const SECTION_TAGLINES = [
  "Think. Build. Impress.",
  "Beyond The Interface",
  "Work Worth Showing",
  "Impressive Skills",
  "Full-Cycle Expertise",
  "Let's Connect",
];

export default function Navbar() {
  const { theme } = useTheme();
  const isOld = theme === "old";

  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [tagline, setTagline] = useState(SECTION_TAGLINES[0]);

  useEffect(() => {
    let hideTimer;

    const handleScroll = () => {
      const atHero = window.scrollY <= 4;
      const sectionDistance = window.innerHeight * 1.15;
      const sectionIndex = Math.min(
        SECTION_TAGLINES.length - 1,
        Math.max(0, Math.round(window.scrollY / sectionDistance)),
      );

      window.clearTimeout(hideTimer);
      setScrolled(window.scrollY > 100);
      setTagline(SECTION_TAGLINES[sectionIndex]);

      if (atHero) {
        setNavVisible(false);
        return;
      }

      setNavVisible(true);
      hideTimer = window.setTimeout(() => setNavVisible(false), 1500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.clearTimeout(hideTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[1200ms] overflow-hidden ${
        isOld
          ? "bg-[#F4EBD0]/95 border-b-[1.5px] border-dashed border-[#8C7851]/60 shadow-[0_4px_20px_rgba(42,32,24,0.15)]"
          : "bg-neutral-950/80 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
      } ${scrolled ? "py-1" : "py-2"} ${
        navVisible 
          ? "translate-y-0 opacity-100 pointer-events-auto" 
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {/* Burned / Scorched Paper Spots (Visible only in Vintage mode) */}
      {isOld && (
        <>
          <div className="absolute -top-6 -left-6 w-20 h-10 bg-amber-950/40 blur-md rounded-full pointer-events-none" />
          <div className="absolute -top-4 right-1/4 w-16 h-8 bg-amber-950/30 blur-sm rounded-full pointer-events-none" />
          <div className="absolute -bottom-4 right-10 w-24 h-10 bg-amber-950/40 blur-md rounded-full pointer-events-none" />
          <div className="absolute top-1/2 -left-4 w-12 h-12 bg-yellow-950/25 blur-lg rounded-full pointer-events-none" />
        </>
      )}

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center h-16">

          {/* Wordmark */}
          <NavLink to="/" className="flex items-center gap-3 shrink-0 group">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`w-11 h-11 rounded-full flex items-center justify-center border-[1.5px] ${
                isOld
                  ? "border-[#7A2E2E] bg-[#EFE6D2] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                  : "border-cyan-500/40 bg-cyan-950/50 text-cyan-400"
              }`}
            >
              <span style={isOld ? SERIF : MONO} className={`font-semibold text-xl ${isOld ? "text-[#7A2E2E]" : "text-cyan-400"}`}>
                F
              </span>
            </motion.div>
            <span style={isOld ? SERIF : MONO} className={`text-xl font-semibold tracking-wide ${isOld ? "text-[#2A2018]" : "text-cyan-100"}`}>
              {isOld ? "Ady's" : "Fady // Dev"}
            </span>
          </NavLink>

          {/* Tagline */}
          <AnimatePresence mode="wait">
            {navVisible && (
              <motion.span
                key={tagline}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={MONO}
                className={`ml-4 border-l border-dashed pl-4 text-[11px] tracking-[0.15em] md:text-xs ${
                  isOld
                    ? "border-[#8C7851]/60 text-[#8C7851]"
                    : "border-cyan-500/30 text-cyan-400/80"
                }`}
              >
                {tagline}
              </motion.span>
            )}
          </AnimatePresence>

          <div className="ml-auto">
            <ThemeToggle />
          </div>

        </div>
      </nav>

      {/* Ripped Paper Bottom Edge (Vintage Mode) */}
      {isOld && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 pointer-events-none overflow-hidden opacity-60">
          <svg className="w-full h-full text-[#8C7851]" preserveAspectRatio="none" viewBox="0 0 1200 10">
            <path d="M0,0 L12,10 L25,2 L40,9 L55,1 L70,8 L85,3 L100,9 L115,1 L130,7 L145,2 L160,10 L175,3 L190,8 L205,1 L220,9 L235,2 L250,8 L265,1 L280,9 L295,3 L310,8 L325,0 L340,7 L355,2 L370,9 L385,1 L400,8 L415,3 L430,9 L445,2 L460,8 L475,1 L490,9 L505,3 L520,8 L535,0 L550,7 L565,2 L580,9 L595,1 L610,8 L625,3 L640,9 L655,2 L670,8 L685,1 L700,9 L715,3 L730,8 L745,0 L760,7 L775,2 L790,9 L805,1 L820,8 L835,3 L850,9 L865,2 L880,8 L895,1 L910,9 L925,3 L940,8 L955,0 L970,7 L985,2 L1000,9 L1015,1 L1030,8 L1045,3 L1060,9 L1075,2 L1090,8 L1105,1 L1120,9 L1135,3 L1150,8 L1165,0 L1180,7 L1200,3 Z" fill="currentColor" />
          </svg>
        </div>
      )}
    </header>
  );
}