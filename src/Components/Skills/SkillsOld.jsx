import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import skillsData from "./skillsData";
import SectionHeader from './../Header/Header';

/*
  Same fonts as the rest of the vintage set — add once, at the very top
  of your global CSS:

  @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,500;0,600;1,400&family=Space+Mono:wght@400;700&display=swap');
*/

const SERIF = { fontFamily: "'Spectral', Georgia, serif" };
const MONO = { fontFamily: "'Space Mono', 'Courier New', monospace" };
const INK = "#7A2E2E";

// Vintage engraved Sword & Shield insignia with a subtle floating animation
const SwordAndShield = ({ width = 90, height = 110, label }) => (
  <motion.svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    fill="none"
    className="pointer-events-none drop-shadow-md"
    animate={{ y: [0, -5, 0], rotate: [0, 12.5, -12.5, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Shield background base */}
    <path
      d="M50 8 L84 22 C84 62 64 92 50 108 C36 92 16 62 16 22 Z"
      fill="#B08D57"
      stroke="#4A3A22"
      strokeWidth="2.5"
    />
    {/* Shield inner crest */}
    <path
      d="M50 16 L74 28 C74 58 60 82 50 96 C40 82 26 58 26 28 Z"
      fill="#9C7B47"
      stroke="#4A3A22"
      strokeWidth="1.5"
    />
    <circle cx="50" cy="54" r="8" fill="#2A2018" />
    <path d="M46 54 H54 M50 50 V58" stroke="#B08D57" strokeWidth="2" strokeLinecap="round" />

    {/* Crossed Sword */}
    <motion.g
      animate={{ rotate: [-3, 3, -3] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "50px 60px" }}
    >
      <line x1="18" y1="14" x2="82" y2="106" stroke="#D9D2C1" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="18" y1="14" x2="82" y2="106" stroke="#4A3A22" strokeWidth="1.5" />
      <circle cx="85" cy="110" r="4.5" fill="#B08D57" stroke="#4A3A22" strokeWidth="1.5" />
      <rect x="74" y="96" width="14" height="4" rx="1" fill="#4A3A22" transform="rotate(56 81 98)" />
    </motion.g>

    {label && (
      <text
        x="50" y="116" textAnchor="middle"
        fontFamily="'Space Mono', monospace" fontSize="6" fontWeight="700"
        fill="#ff45" letterSpacing="0.2"
      >
        {label}
      </text>
    )}
  </motion.svg>
);

const PointerHint = () => (
  <motion.div
    className="absolute -top-5 left-[60%] flex flex-col items-center pointer-events-none z-20"
    animate={{ y: [0, 5, 0] }}
    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
  >
    <span style={MONO} className="text-[10px] text-[#7A2E2E] bg-[#F5EEDF] border border-[#8C7851]/50 rounded-sm px-2 py-0.5 mb-1 whitespace-nowrap shadow-sm">
      inspect crest
    </span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 4v13M12 17l-5-5M12 17l5-5" stroke="#7A2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </motion.div>
);

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAssistant, setShowAssistant] = useState(false);
  const activeSkill = skillsData[activeIndex] || null;
  const n = skillsData.length || 1;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setShowAssistant(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="min-h-[100dvh] py-16 lg:py-24 px-4 md:px-8 relative overflow-hidden flex items-center justify-center">

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <SectionHeader title={"Tech & Trick"} subtitle={"A field guide to the tools I reach for."} />
          
          {/* Moved Sword & Shield to top-right near header area */}
          <div className="relative self-end md:self-auto mb-2">
            <button
              onMouseEnter={() => setShowAssistant(true)}
              onClick={() => setShowAssistant(true)}
              className="cursor-pointer group relative"
              aria-label="Inspect Crest"
            >
              <PointerHint />
              <SwordAndShield width={75} height={95} />
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-center">

          {/* Patent-diagram arc of numbered figures */}
          <div className="relative min-h-[320px] flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 320" preserveAspectRatio="none">
              <path
                d="M 40 260 Q 300 20 560 260"
                fill="none" stroke="#8C7851" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6"
              />
            </svg>

            {skillsData.map((skill, index) => {
              const t = n === 1 ? 0.5 : index / (n - 1);
              const x = 40 + t * 520;
              const y = 260 - Math.sin(t * Math.PI) * 220;
              const isActive = activeIndex === index;
              return (
                <motion.button
                  key={skill.name}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute flex flex-col items-center gap-1.5"
                  style={{ left: `${(x / 600) * 100}%`, top: `${(y / 320) * 100}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 bg-[#F5EEDF] transition-colors duration-300 ${
                      isActive ? "border-[#7A2E2E] shadow-[0_0_0_4px_rgba(122,46,46,0.12)]" : "border-[#8C7851]/50"
                    }`}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      loading="lazy"
                      className={`w-7 h-7 object-contain transition-all duration-300 ${isActive ? "grayscale-0" : "grayscale opacity-60"}`}
                    />
                  </div>
                  <span style={MONO} className="text-[9px] text-[#8C7851]">
                    FIG. {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Specification card with burned ragged edges & scorching glow */}
          <div
            className="relative bg-[#F5EEDF] p-6 lg:p-8 min-h-[340px] flex flex-col justify-center overflow-hidden transition-all duration-500"
            style={{
              clipPath: "polygon(0% 1%, 2% 0%, 98% 1%, 100% 3%, 99% 94%, 100% 100%, 75% 98%, 50% 100%, 25% 97%, 2% 100%, 0% 96%, 1% 70%, 0% 40%, 2% 12%)",
              boxShadow: "inset 0 0 55px rgba(50, 25, 10, 0.4), 0 15px 35px rgba(0, 0, 0, 0.45)",
              border: "1px solid #5c3f20"
            }}
          >
            {/* Scorched Organic Burn Spots */}
            <div className="absolute -top-6 -left-6 w-28 h-28 bg-[#2a1306] opacity-75 blur-2xl pointer-events-none z-20" />
            <div className="absolute -bottom-8 -right-6 w-32 h-32 bg-[#1c0b03] opacity-80 blur-3xl pointer-events-none z-20" />
            <div className="absolute top-1/2 -right-8 w-24 h-36 bg-[#381a07] opacity-60 blur-2xl pointer-events-none z-20" />

            {/* Burned edges border overlay */}
            <div
              className="absolute inset-0 pointer-events-none border-[6px] border-[#2b1406]/60 opacity-90 z-20"
              style={{
                clipPath: "polygon(0% 1%, 2% 0%, 98% 1%, 100% 3%, 99% 94%, 100% 100%, 75% 98%, 50% 100%, 25% 97%, 2% 100%, 0% 96%, 1% 70%, 0% 40%, 2% 12%)",
                filter: "blur(2.5px)"
              }}
            />

            <span
              style={MONO}
              className="absolute top-6 right-6 text-[9px] text-[#7A2E2E] border-2 border-[#7A2E2E]/70 rounded-full w-14 h-14 flex items-center justify-center text-center leading-tight rotate-[8deg] z-30 bg-[#F5EEDF]/80 shadow-sm"
            >
              VERIFIED
            </span>

            <AnimatePresence mode="wait">
              {activeSkill && (
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-30"
                >
                  <p style={MONO} className="text-[10px] text-[#8C7851] tracking-widest mb-3">
                    SPECIMEN — FIG. {String(activeIndex + 1).padStart(2, "0")}
                  </p>

                  <h3 style={SERIF} className="text-3xl font-semibold text-[#2A2018] mb-4">
                    {activeSkill.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-[#7A2E2E]">|</span>
                    <div className="h-px flex-1 bg-[#7A2E2E]/50" />
                    <span className="text-[#7A2E2E]">|</span>
                  </div>

                  <p style={{ fontFamily: "Georgia, serif" }} className="text-sm text-[#443A2C] leading-relaxed">
                    {activeSkill.info}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Full-page patent crest popup overlay */}
      <AnimatePresence>
        {showAssistant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowAssistant(false)}
            className="fixed inset-0 z-[100] bg-[#2A2018]/95 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
            >
              <SwordAndShield width={220} height={260} label="FADISYUS MK. I" />
            </motion.div>
            <p style={MONO} className="mt-6 text-xs text-[#D9A05B]/80 tracking-widest">
              tap anywhere to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}