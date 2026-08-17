import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import GlitchText from "../GlitchText";
import TextType from './../TextType';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [displayedSection, setDisplayedSection] = useState("");
  const [showSectionName, setShowSectionName] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // دالة بتدي اسم معبر لكل سيكشن، وبتدمج الهوم والاباوت مع بعض
  const getSectionLabel = (sectionId) => {
    if (sectionId === "HI," || sectionId === "about") return "CORE_PROFILE"; 
    if (sectionId === "projects") return "WORK_LOGS";
    if (sectionId === "skills") return "TECH_STACK";
    if (sectionId === "services") return "OPS_CAPACITY";
    if (sectionId === "contact") return "COMM_LINK";
    return sectionId;
  };

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show section name for 2.5 seconds when section changes
  useEffect(() => {
    const mappedActive = getSectionLabel(activeSection);
    const mappedDisplayed = getSectionLabel(displayedSection);

    if (activeSection && mappedActive !== mappedDisplayed && activeSection !== "") {
      setDisplayedSection(activeSection);
      setShowSectionName(true);
      const timer = setTimeout(() => {
        setShowSectionName(false);
      }, 2500); // 2.5 ثانية عشان الديزاين يلحق يتشاف
      return () => clearTimeout(timer);
    }
  }, [activeSection, displayedSection]);

  // Detect active section
  useEffect(() => {
    const sections = ["projects", "about", "skills", "services", "contact"];

    const handleScroll = () => {
      // ✅ 1. لو الصفحة فوق خالص، ثبتها على "HI,"
      if (window.scrollY < 100) { 
        setActiveSection("HI,"); 
        return; 
      }

      let current = "";
      const buffer = window.innerHeight * 0.3;

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop - 200;
          const bottom = top + section.offsetHeight;
          if (window.scrollY + buffer >= top && window.scrollY < bottom) {
            current = id;
          }
        }
      });

      // ✅ 2. تأكد إننا مش في أول الصفحة قبل ما نحكم إننا في الـ contact
      const distanceFromBottom = document.body.offsetHeight - (window.innerHeight + window.scrollY);
      if (distanceFromBottom < window.innerHeight * 0.2 && window.scrollY > 500) {
        current = "contact";
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Handle click depending on route
  const handleNavClick = (to, type) => {
    if (type === "home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    } else if (type === "anchor") {
      if (location.pathname === "/") {
        scrollToSection(to.replace("#", ""));
      } else {
        navigate("/", { state: { scrollTo: to } });
      }
    } else if (type === "route") {
      if (location.pathname !== to) navigate(to);
    }

    setMenuOpen(false);
  };

  const navLinks = [];

  const isActiveLink = (link) => {
    if (link.type === "anchor") {
      return activeSection === link.to.replace("#", "");
    }
    if (link.type === "route") {
      return location.pathname === link.to;
    }
    if (link.type === "home") {
      return location.pathname === "/" && (activeSection === "" || activeSection === null);
    }
    return false;
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };

  // Scroll on mount if navigated with state
  useEffect(() => {
    if (location.state?.scrollTo) {
      const target = location.state.scrollTo.replace("#", "");
      setTimeout(() => scrollToSection(target), 450);
    }
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[1s]  ${
        scrolled
          ? "backdrop-blur-md shadow-md bg-gradient-to-r from-purple-900/20 via-fuchsia-700/10 to-transparent"
          : "bg-transparent"
      }`}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 85%, 97% 90%, 100% 95%, 0 100%)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <NavLink  to="/" className="flex items-center gap-3">
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

          {/* Section Name Display - Right Side (Terminal Style) */}
          <div className="flex items-center min-w-[200px] justify-end overflow-hidden py-2">
            <AnimatePresence mode="wait">
              {showSectionName && (
                <motion.div
                  key={getSectionLabel(displayedSection)}
                  initial={{ opacity: 0, x: 30, clipPath: "inset(0% 100% 0% 0%)" }}
                  animate={{ opacity: 1, x: 0, clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-end"
                >
                  {/* تلميح صغير فوق الكلمة */}
                  <span className="text-[9px] md:text-[10px] text-fuchsia-400/60 font-mono tracking-[0.3em] mb-[-4px]">
                    // LOC_TRACKER
                  </span>
                  
                  {/* شاشة الـ Terminal */}
                  <div className="flex items-center gap-2 border-r-2 border-fuchsia-500 pr-3 bg-gradient-to-r from-transparent to-fuchsia-500/10 py-1">
                    <span className="text-fuchsia-500 animate-pulse font-mono font-bold text-lg leading-none">&gt;</span>
                    <span className="text-sm md:text-base font-mono font-bold text-fuchsia-50 tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(217,70,239,0.9)]">
                      {getSectionLabel(displayedSection)}
                    </span>
                    {/* مؤشر الكتابة اللي بينور ويطفي */}
                    <span className="w-2 md:w-2.5 h-4 md:h-5 bg-fuchsia-400 animate-[pulse_1s_step-end_infinite]"></span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </nav>
    </header>
  );
}