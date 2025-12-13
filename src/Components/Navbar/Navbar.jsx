import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import GlitchText from "../GlitchText";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect active section
  useEffect(() => {
    const sections = ["projects", "about", "skills", "services", "contact"];

    const handleScroll = () => {
      let current = "";
      const buffer = window.innerHeight * 0.3; // 👈 سماح 30% من ارتفاع الشاشة

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

      // ✅ لو المستخدم قرب من نهاية الصفحة
      const distanceFromBottom =
        document.body.offsetHeight - (window.innerHeight + window.scrollY);
      if (distanceFromBottom < window.innerHeight * 0.2) {
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

  const navLinks = [
    { label: "Home", type: "home", to: "/" },
    { label: "About", type: "anchor", to: "#about" },
    { label: "Projects", type: "anchor", to: "#projects" },
    { label: "Skills", type: "anchor", to: "#skills" },
    { label: "Services", type: "anchor", to: "#services" },
    { label: "Contact", type: "anchor", to: "#contact" },
  ];

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[1s] ${
        scrolled
          ? "backdrop-blur-md shadow-md bg-gradient-to-r from-purple-900/20 via-fuchsia-700/10 to-transparent"
          : "bg-transparent"
      }`}
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

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link, i) => {
              const active = isActiveLink(link);
              return (
                <motion.button
                  key={link.label}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => handleNavClick(link.to, link.type)}
                  className={`relative px-1 py-1 text-sm font-medium transition-all cursor-pointer duration-400 ${
                    active
                      ? "text-fuchsia-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-fuchsia-400 after:shadow-[0_0_5px_#a855f7] animate-pulse"
                      : "text-white/70 hover:text-fuchsia-300 hover:drop-shadow-[0_0_5px_#a855f7]"
                  }`}
                >
                  {link.label}
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/60 backdrop-blur-md mt-2 rounded-xl py-3"
            >
              {navLinks.map((link) => {
                const active = isActiveLink(link);
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.to, link.type)}
                    className={`block w-full px-4 py-2 text-base text-center transition-all duration-200 ${
                      active
                        ? "text-fuchsia-300 font-semibold animate-pulse"
                        : "text-white/80 hover:text-fuchsia-300"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
