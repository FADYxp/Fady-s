import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import skillsData from "./skillsData";
import SectionHeader from './../Header/Header';

// Cute rounded robot. `label` (optional) is drawn on its belly —
// used for the large, expanded version only.
const DancingFigure = ({ width = 100, height = 130, label }) => (
  <motion.svg
    width={width}
    height={height}
    viewBox="0 0 100 130"
    fill="none"
    className="pointer-events-none drop-shadow-[0_0_16px_rgba(45,212,191,0.45)]"
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.line
      x1="50" y1="18" x2="50" y2="6"
      stroke="#5eead4" strokeWidth="3" strokeLinecap="round"
      style={{ transformOrigin: "50px 18px" }}
      animate={{ rotate: [-12, 12, -12] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="50" cy="6" r="4" fill="#5eead4"
      animate={{ cy: [6, 4, 6] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
    />
    <rect x="30" y="16" width="40" height="32" rx="14" fill="#134e4a" stroke="#5eead4" strokeWidth="2.5" />
    <circle cx="41" cy="32" r="4" fill="#5eead4" />
    <circle cx="59" cy="32" r="4" fill="#5eead4" />
    <rect x="26" y="52" width="48" height="40" rx="16" fill="#0f766e" stroke="#5eead4" strokeWidth="2.5" />
    <rect x="40" y="64" width="20" height="12" rx="6" fill="#5eead4" opacity="0.5" />
    {label && (
      <text
        x="50" y="76" textAnchor="middle"
        fontFamily="'Space Mono', monospace" fontSize="6.5" fontWeight="700"
        fill="#022c22" letterSpacing="0.3"
      >
        {label}
      </text>
    )}
    <motion.rect
      x="10" y="58" width="10" height="30" rx="5"
      style={{ transformOrigin: "15px 60px" }}
      fill="#0f766e" stroke="#5eead4" strokeWidth="2"
      animate={{ rotate: [10, -35, 10] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.rect
      x="80" y="58" width="10" height="30" rx="5"
      style={{ transformOrigin: "85px 60px" }}
      fill="#0f766e" stroke="#5eead4" strokeWidth="2"
      animate={{ rotate: [-10, 35, -10] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
    />
    <motion.rect
      x="33" y="90" width="12" height="26" rx="6"
      style={{ transformOrigin: "39px 90px" }}
      fill="#0f766e" stroke="#5eead4" strokeWidth="2"
      animate={{ rotate: [-14, 14, -14] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.rect
      x="55" y="90" width="12" height="26" rx="6"
      style={{ transformOrigin: "61px 90px" }}
      fill="#0f766e" stroke="#5eead4" strokeWidth="2"
      animate={{ rotate: [14, -14, 14] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
    />
  </motion.svg>
);

// A small curved arrow that bounces toward the robot, hinting it's clickable.
const PointerHint = () => (
  <motion.div
    className="absolute -top-2 left-[62%] flex flex-col items-center pointer-events-none z-20"
    animate={{ y: [0, 6, 0] }}
    transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
  >
    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-400/10 border border-cyan-400/30 rounded px-2 py-0.5 mb-1 whitespace-nowrap">
      click me
    </span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 4v13M12 17l-5-5M12 17l5-5" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </motion.div>
);

// Angular, cut-corner clip path — the signature HUD panel silhouette.
const HUD_CLIP = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";

// A thin bright line that sweeps down through a panel on a loop.
const Scanline = () => (
  <motion.div
    className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none"
    animate={{ top: ["-10%", "110%"] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
  />
);

// Rotating radar rings, decorative, sitting behind the main content.
const RadarRings = () => (
  <>
    <motion.div
      className="absolute w-[520px] h-[520px] rounded-full border border-cyan-400/10"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute w-[380px] h-[380px] rounded-full border border-cyan-400/15 border-dashed"
      animate={{ rotate: -360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
  </>
);

// Letters fade/slide in one by one — the terminal "typing" feel.
const typeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};
const typeChar = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};
const TypedText = ({ text, className }) => (
  <motion.h3 key={text} variants={typeContainer} initial="hidden" animate="visible" className={className}>
    {text.split("").map((ch, i) => (
      <motion.span key={i} variants={typeChar} className="inline-block">
        {ch === " " ? "\u00A0" : ch}
      </motion.span>
    ))}
  </motion.h3>
);

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bootLine, setBootLine] = useState("");
  const [showAssistant, setShowAssistant] = useState(false);
  const activeSkill = skillsData[activeIndex] || null;

  useEffect(() => {
    if (!activeSkill) return;
    setBootLine(`> initializing module :: ${activeSkill.name.toLowerCase().replace(/\s+/g, "_")}`);
  }, [activeIndex, activeSkill]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setShowAssistant(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="skills"
      className="min-h-[100dvh] text-cyan-50 py-8 lg:py-24 px-4 md:px-8 relative overflow-hidden flex items-center justify-center backdrop-blur-sm"
    >
      {/* Faint decorative layer only — no background color/fill */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-60">
        <RadarRings />
      </div>
      <div
        className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#5eead4 1px, transparent 1px), linear-gradient(90deg, #5eead4 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-stretch h-full">
        <div className="flex-1 w-full flex flex-col justify-center">


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10 lg:mb-14"
          ><SectionHeader title={"Tech & Trick"} subtitle={"WooooOOooOooHoooooooooooO!!"} />
       
          </motion.div>

          {/* HUD key grid — angular cut-corner buttons */}
          <div className="relative pb-10">
            <button
              onMouseEnter={() => setShowAssistant(true)}
              onClick={() => setShowAssistant(true)}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 z-0 cursor-pointer"
              aria-label="Open AI assistant"
            >
              <PointerHint />
              <DancingFigure />
            </button>
            <div className="relative z-10 grid grid-cols-4 sm:grid-cols-5 gap-3 lg:gap-4 max-w-lg">
              {skillsData.map((skill, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.button
                    key={skill.name}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ y: -3 }}
                    style={{ clipPath: HUD_CLIP }}
                    className={`relative aspect-square flex flex-col items-center justify-center gap-1.5 border backdrop-blur-md overflow-hidden transition-colors duration-300 ${
                      isActive
                        ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                        : "border-cyan-400/15 bg-white/[0.02] hover:border-cyan-400/40"
                    }`}
                  >
                    {isActive && <Scanline />}
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      loading="lazy"
                      className={`relative z-10 w-6 h-6 object-contain transition-all duration-300 ${
                        isActive ? "grayscale-0 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "grayscale opacity-40"
                      }`}
                    />
                    <span className={`relative z-10 text-[9px] font-mono tracking-wide ${isActive ? "text-cyan-300" : "text-cyan-100/30"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main hologram readout */}
        <div className="w-full lg:w-[480px] shrink-0 min-h-[300px] lg:min-h-[420px] flex items-center relative mt-2 lg:mt-0">
          <div
            style={{ clipPath: HUD_CLIP }}
            className="w-full h-full relative z-10 bg-cyan-400/[0.04] border border-cyan-400/25 backdrop-blur-2xl p-6 lg:p-10 overflow-hidden flex flex-col justify-center"
          >
            <Scanline />

            {/* HUD corner ticks */}
            <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/70" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/70" />

            <AnimatePresence mode="wait">
              {activeSkill && (
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex flex-col h-full"
                >
                  <p className="font-mono text-[10px] text-cyan-400/60 mb-4 tracking-wide">
                    {bootLine}
                  </p>

                  <div
                    style={{ clipPath: HUD_CLIP }}
                    className="w-16 h-16 lg:w-24 lg:h-24 mb-4 lg:mb-8 relative flex items-center justify-center bg-cyan-400/5 border border-cyan-400/25"
                  >
                    <motion.img
                      src={activeSkill.icon}
                      alt={activeSkill.name}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 18 }}
                      className="w-10 h-10 lg:w-14 lg:h-14 object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                    />
                  </div>

                  <TypedText
                    text={activeSkill.name}
                    className="text-2xl lg:text-4xl font-bold text-white tracking-tight mb-3 lg:mb-4 font-mono"
                  />

                  <div className="flex items-center gap-1 w-full mb-3 lg:mb-6">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.02, duration: 0.2 }}
                        className={`h-3 w-1 rounded-full origin-bottom ${i < 11 ? "bg-cyan-400/80" : "bg-white/10"}`}
                      />
                    ))}
                  </div>

                  <p className="text-cyan-100/60 leading-relaxed text-sm lg:text-lg font-light line-clamp-3 lg:line-clamp-none">
                    {activeSkill.info}
                  </p>

                  <div className="mt-auto pt-4 lg:pt-8 flex items-center justify-between text-[10px] lg:text-xs font-mono text-cyan-400/50 uppercase tracking-widest">
                    <span>ID_{String(activeIndex + 1).padStart(3, '0')}</span>
                    <span className="flex items-center gap-1.5">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      LINKED
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Full-screen assistant overlay */}
      <AnimatePresence>
        {showAssistant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowAssistant(false)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <DancingFigure width={260} height={340} label="AI ASSISTANT" />
            </motion.div>
            <p className="mt-6 font-mono text-xs text-cyan-300/60 tracking-widest">
              tap anywhere to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;