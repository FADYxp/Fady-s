import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Palette, Server, Zap, Kanban, Shield, Plus } from "lucide-react";
import SectionHeader from "../Header/Header";

/*
  Same fonts as the rest of the vintage set — add once, at the very top
  of your global CSS:

  @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,500;0,600;1,400&family=Space+Mono:wght@400;700&display=swap');
*/

const SERIF = { fontFamily: "'Spectral', Georgia, serif" };
const MONO = { fontFamily: "'Space Mono', 'Courier New', monospace" };
const INK = "#7A2E2E";

const services = [
  {
    icon: <Code2 size={20} />,
    title: "Frontend Engineering",
    desc: "Building pixel-perfect, interactive web applications.",
    details: ["React & Next.js Architecture", "Tailwind CSS Styling", "State Management", "GSAP Animations"],
    clip: "polygon(0% 3%, 99% 0%, 100% 97%, 1% 100%)",
  },
  {
    icon: <Server size={20} />,
    title: "Backend & APIs",
    desc: "Developing robust and secure server-side logic.",
    details: ["RESTful API Development", "Node.js Environment", "Database Integration", "Secure Auth"],
    clip: "polygon(1% 0%, 100% 2%, 98% 100%, 0% 98%)",
  },
  {
    icon: <Palette size={20} />,
    title: "UI / UX Implementation",
    desc: "Translating designs into flawless, responsive code.",
    details: ["Figma to Code", "Micro-interactions", "Mobile-First", "Accessibility (a11y)"],
    clip: "polygon(0% 1%, 98% 3%, 100% 96%, 2% 100%)",
  },
  {
    icon: <Zap size={20} />,
    title: "Performance & SEO",
    desc: "Optimizing for maximum speed and search visibility.",
    details: ["Core Web Vitals", "Lazy Loading & Caching", "Technical SEO Audits", "Asset Minification"],
    clip: "polygon(2% 0%, 100% 1%, 99% 98%, 0% 100%)",
  },
  {
    icon: <Kanban size={20} />,
    title: "Agile & Scrum Workflow",
    desc: "Orchestrating workflows and ensuring team alignment.",
    details: ["Sprint Planning", "Jira Management", "Cross-functional Sync", "Agile Coaching"],
    clip: "polygon(0% 2%, 99% 0%, 98% 99%, 2% 100%)",
  },
  {
    icon: <Shield size={20} />,
    title: "Maintenance & Security",
    desc: "Ensuring long-term stability and protecting data.",
    details: ["Code Audits", "Bug Tracking & Fixing", "CI/CD Pipelines", "Data Encryption"],
    clip: "polygon(1% 1%, 100% 0%, 99% 97%, 0% 100%)",
  },
];

const roman = ["I", "II", "III", "IV", "V", "VI"];

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className=" px-4 md:px-8 relative min-h-screen flex flex-col justify-center overflow-hidden">
      
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <SectionHeader
          title="My Expertise"
          subtitle="Comprehensive solutions covering the entire software development lifecycle."
        />

        {/* Main ledger container (clean sheet) */}
        <div className="mt-16 space-y-4">
          {services.map((s, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="relative bg-[#F5EEDF] transition-all duration-300"
                style={{
                  clipPath: s.clip,
                  boxShadow: "inset 0 0 35px rgba(50, 25, 10, 0.25), 0 6px 15px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #6b4c2b"
                }}
              >
                {/* Scorched Burn Effect on each slip */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#2a1306] opacity-40 blur-xl pointer-events-none" />

                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-5 px-6 md:px-8 py-5 text-left hover:bg-[#8C7851]/10 transition-colors relative z-10"
                >
                  <span style={SERIF} className="italic text-lg text-[#8C7851] w-8 shrink-0">
                    {roman[i]}
                  </span>
                  <span style={{ color: INK }} className="shrink-0">{s.icon}</span>
                  <span style={SERIF} className="text-lg md:text-xl font-semibold text-[#2A2018] flex-1">
                    {s.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: INK }}
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="px-6 md:px-8 pb-6 pl-[4.5rem] md:pl-[5rem] border-t border-dashed border-[#8C7851]/40 pt-4">
                        <p style={{ fontFamily: "Georgia, serif" }} className="text-sm text-[#5C4F3D] leading-relaxed mb-4 max-w-lg">
                          {s.desc}
                        </p>
                        <div className="space-y-2">
                          {s.details.map((d, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <span style={{ color: INK }} className="text-xs">—</span>
                              <span style={MONO} className="text-[12px] text-[#443A2C]">{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}