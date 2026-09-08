import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import GlitchText from "../GlitchText";

const SECTION_TAGLINES = [
  "Think. Build. Impress.",
  "Beyond The Interface",
  "Work Worth Showing",
  "Impressive Skills",
  "Full-Cycle Expertise",
  "Let's Connect",
];

export default function Navbar() {
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
      hideTimer = window.setTimeout(() => setNavVisible(false), 2600);
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
      className={`navbar-liquid fixed top-0 left-0 right-0 z-50 transition-all duration-[1400ms] ${
        scrolled ? "is-scrolled shadow-md" : ""
      } ${navVisible ? "navbar-visible" : "navbar-hidden"}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          
          {/* Logo */}
          <NavLink  to="/" className="flex items-center gap-3 shrink-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-15 md:w-20 h-10 rounded-full flex items-center justify-center bg-white/10 ring-1 ring-white/20"
            >
              <span className="text-white font-extrabold text-5xl">
                <GlitchText speed={5} enableShadows={true} enableOnHover={false} className="!text-5xl">
                  F
                </GlitchText>
              </span>
            </motion.div>
            <div className="text-white">
              <GlitchText speed={5} enableShadows={true} enableOnHover={false} className="!text-4xl !ms-[-10px]">
                aDY's
              </GlitchText>
            </div>
          </NavLink>

          <AnimatePresence mode="wait">
            {navVisible && (
              <motion.span
                key={tagline}
                initial={{ opacity: 0, x: -18, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 12, filter: "blur(8px)" }}
                transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                className="navbar-tagline ml-4 border-l border-teal-300/40 pl-4 text-xs font-mono uppercase tracking-[0.18em] text-teal-100/80 md:text-sm"
              >
                {tagline}
              </motion.span>
            )}
          </AnimatePresence>

        </div>
      </nav>
    </header>
  );
}