import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function PageLoader({ children }) {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const { theme } = useTheme();
  const isModern = theme === "modern";

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 120);

    const timer = setTimeout(() => setLoading(false), 3200);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden transition-colors duration-500 ${
              isModern ? "bg-black text-cyan-400 font-mono" : "bg-[#0c0406] text-[#2c1d0c] font-serif"
            }`}
          >
            {/* Background Effects */}
            {isModern ? (
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3a1318]/40 via-[#0c0406]/90 to-[#0c0406] pointer-events-none" />
            )}

            <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
              
              {isModern ? (
                /* --- Modern Terminal Loader --- */
                <div className="w-full max-w-md">
                  <div className="w-full border border-cyan-500/40 bg-cyan-950/20 rounded-t-lg px-4 py-2 flex items-center justify-between text-[11px] text-cyan-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    </div>
                    <span className="tracking-widest uppercase text-[10px]">fady@core:~# init</span>
                  </div>
                  <div className="w-full border-x border-b border-cyan-500/40 bg-black/90 rounded-b-lg p-6 flex flex-col gap-4 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                    <div className="flex justify-between items-center text-xs">
                      <span className="animate-pulse">&gt; INITIALIZING SYSTEM...</span>
                      <span className="font-bold">{count}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden p-[2px] border border-cyan-500/30 bg-cyan-950/40">
                      <motion.div
                        className="h-full rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                        style={{ width: `${count}%` }}
                      />
                    </div>
                    <div className="text-[11px] opacity-75 tracking-wider pt-2 border-t border-white/10 uppercase">
                      Frontend Architect // Clean Code // High Performance
                    </div>
                  </div>
                </div>
              ) : (
                /* --- Royal Parchment Letter Loader --- */
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full max-w-md bg-[#f6ecdc] border-2 border-[#b89753] rounded-sm p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(184,151,83,0.15)] relative text-center"
                >
                  {/* Decorative Corner Borders */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#b89753]" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#b89753]" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#b89753]" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#b89753]" />

                  {/* Wax Seal Stamp */}
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-[#8a1c14] border-2 border-[#d4af37] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                    <span className="text-[#f3e5ab] font-bold text-xs tracking-tighter">F</span>
                  </div>

                  {/* Letter Header */}
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#70542d] block mb-2 font-sans font-semibold">
                    Royal Decree & Invitation
                  </span>

                  <h2 className="text-xl font-bold text-[#3a2610] mb-4 tracking-wide">
                    To Whom It May Concern,
                  </h2>

                  {/* Letter Body Text */}
                  <p className="text-xs text-[#52391c] leading-relaxed italic px-2 mb-6">
                    &ldquo;Behold, the digital realm prepares its grand awakening. Fady&apos;s masterpiece is being carefully unrolled before your eyes with royal precision...&rdquo;
                  </p>

                  {/* Royal Progress Bar & Status */}
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#d4af37]/40">
                    <div className="flex justify-between items-center text-[11px] font-sans text-[#70542d]">
                      <span className="tracking-wider uppercase font-semibold">Sealing the Archives...</span>
                      <span className="font-bold">{count}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden bg-[#e2ceb3] border border-[#b89753]/50">
                      <motion.div
                        className="h-full rounded-full bg-[#8a1c14]"
                        style={{ width: `${count}%` }}
                      />
                    </div>
                  </div>

                </motion.div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && children}
    </>
  );
}