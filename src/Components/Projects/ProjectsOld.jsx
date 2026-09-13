import React, { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../Header/Header";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

/*
  Same fonts as the rest of the vintage set — add once, at the very top
  of your global CSS:

  @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,500;0,600;1,400&family=Space+Mono:wght@400;700&display=swap');
*/

const SERIF = { fontFamily: "'Spectral', Georgia, serif" };
const MONO = { fontFamily: "'Space Mono', 'Courier New', monospace" };

// حواف مختلفة لكل بروجكت عشان شكل الورقة يتغير وما يبقاش نفس السطامبة
const paperShapes = [
  "polygon(0% 1%, 2% 0%, 98% 1%, 100% 3%, 99% 25%, 100% 50%, 98% 75%, 100% 97%, 97% 100%, 75% 99%, 50% 100%, 25% 98%, 3% 100%, 0% 97%, 1% 70%, 0% 40%, 2% 15%)",
  "polygon(1% 0%, 97% 2%, 100% 0%, 98% 30%, 100% 60%, 99% 88%, 100% 100%, 70% 98%, 40% 100%, 15% 99%, 0% 98%, 2% 70%, 0% 40%, 3% 15%)",
  "polygon(0% 2%, 99% 0%, 100% 20%, 98% 45%, 100% 70%, 97% 95%, 100% 100%, 80% 98%, 50% 99%, 20% 97%, 0% 99%, 1% 75%, 0% 50%, 2% 20%)",
  "polygon(2% 0%, 98% 1%, 100% 4%, 99% 35%, 100% 65%, 98% 90%, 99% 100%, 75% 97%, 45% 100%, 10% 98%, 0% 100%, 1% 60%, 0% 30%, 2% 10%)",
  "polygon(0% 0%, 96% 1%, 100% 2%, 98% 28%, 100% 55%, 99% 82%, 100% 99%, 72% 98%, 42% 100%, 18% 97%, 0% 100%, 2% 65%, 0% 35%, 1% 12%)"
];

const projectsData = [
  {
    id: 1,
    header: "Rose App & Dashboard",
    title: "Bilingual Analytics & E-commerce Platform",
    desc: "Directed development as Scrum Master of a bilingual (Arabic/English) analytics platform, delivering interactive dashboards with 3+ chart types to visualize data in real time. Implemented secure authentication and role-based access using NextAuth, supporting 3 user roles.",
    techStack: ["Next.js", "NextAuth", "TanStack Query", "Zod", "React Hook Form", "next-intl", "ShadCN", "Chart.js"],
    liveLink: "https://rose-app-ecommerce-lyart.vercel.app/en/",
    githubLink: "https://github.com/fffady354",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    header: "Exam App",
    title: "Smart Online Assessment Platform",
    desc: "Built a secure online assessment platform enabling instructors to create timed exams with automated grading, supporting 100+ concurrent test-takers. Engineered complex multi-step form validation using Zod and React Hook Form to prevent submission errors.",
    techStack: ["Next.js", "NextAuth", "TanStack Query", "React Hook Form", "Zod", "ShadCN", "Tailwind CSS"],
    liveLink: "https://exam-app-beige.vercel.app/",
    githubLink: "https://github.com/fffady354",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    header: "Fitness App",
    title: "AI-Integrated Fitness Tracker",
    desc: "Led a 6-person Agile team to build an AI-integrated fitness tracker with real-time chat between users and trainers. Implemented bilingual localization reaching 2 languages, and integrated AI-based workout recommendations.",
    techStack: ["React.js 19", "TanStack Query", "Zod", "React Hook Form", "use-intl", "ShadCN"],
    liveLink: null,
    githubLink: "https://github.com/fffady354",
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    header: "Fresh Mart",
    title: "Full E-commerce Platform",
    desc: "Solo-built a full e-commerce platform from scratch, including product catalog, cart, and checkout flow, handling 500+ products across 20+ categories. Optimized component architecture and state management to reduce unnecessary re-renders.",
    techStack: ["Next.js", "Context API", "React Hook Form", "Tailwind CSS"],
    liveLink: "https://ecommerce-iota-flame.vercel.app/",
    githubLink: "https://github.com/fffady354",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    header: "Weather Forecast",
    title: "Weather App",
    desc: "A dynamic weather application built with React that provides real-time weather updates and forecasts using global APIs. It features location-based tracking and detailed meteorological data.",
    techStack: ["React", "OpenWeather API", "CSS Modules"],
    liveLink: "https://weather-psi-mocha-98.vercel.app/",
    githubLink: "https://github.com/fffady354",
    img: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const project = projectsData[active];
  const currentClipPath = paperShapes[active % paperShapes.length];

  return (
    <section className=" px-4 md:px-8 relative min-h-screen flex flex-col items-center justify-center overflow-hidden ">
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, #00000008 0, transparent 40%), radial-gradient(circle at 75% 75%, #00000008 0, transparent 45%)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl">
        <SectionHeader title="Selected Works" />

        {/* Open journal spread with dynamic ragged shape & burned edges */}
        <div
          className="relative mt-16 w-full overflow-hidden transition-all duration-500"
          style={{
            clipPath: currentClipPath,
            boxShadow: "inset 0 0 65px rgba(50, 25, 10, 0.4), 0 15px 35px rgba(0, 0, 0, 0.5)",
            border: "1px solid #5c3f20"
          }}
        >
          {/* Burned / Scorched Organic Spots */}
          <div className="absolute -top-6 -left-6 w-36 h-36 bg-[#2a1306] opacity-75 blur-2xl pointer-events-none z-20" />
          <div className="absolute -bottom-8 -right-6 w-44 h-40 bg-[#1c0b03] opacity-80 blur-3xl pointer-events-none z-20" />
          <div className="absolute top-1/3 -right-10 w-28 h-48 bg-[#381a07] opacity-65 blur-2xl pointer-events-none z-20" />
          <div className="absolute -bottom-6 left-1/3 w-36 h-24 bg-[#2e1505] opacity-70 blur-2xl pointer-events-none z-20" />
          <div className="absolute top-12 -left-8 w-28 h-28 bg-[#220e03] opacity-60 blur-xl pointer-events-none z-20" />

          {/* Burned/Scorched edges overlay layer */}
          <div className="absolute inset-0 pointer-events-none border-[7px] border-[#2b1406]/65 opacity-90 z-20 transition-all duration-500"
            style={{
              clipPath: currentClipPath,
              filter: "blur(3px)"
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, rotateY: 8 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 relative z-10"
              style={{ transformPerspective: 1200 }}
            >
              {/* Left page — mounted photograph */}
              <div className="relative bg-[#F5EEDF] p-8 md:p-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-dashed border-[#8C7851]/40 min-h-[280px] md:min-h-[420px]">
                <div className="relative w-full max-w-xs rotate-[-2deg]">
                  <span className="absolute -top-3 left-6 w-14 h-6 bg-[#E8DFC8]/90 border border-[#8C7851]/30 rotate-[-6deg] shadow-sm" />
                  <span className="absolute -top-3 right-6 w-14 h-6 bg-[#E8DFC8]/90 border border-[#8C7851]/30 rotate-[8deg] shadow-sm" />

                  <div className="p-2 bg-white shadow-[0_4px_14px_rgba(42,32,24,0.2)]">
                    <div
                      className="w-full aspect-[4/3] bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${project.img})`,
                        filter: "sepia(0.55) contrast(1.05) brightness(0.92)",
                      }}
                    />
                  </div>
                  <p style={SERIF} className="italic text-center text-sm text-[#5C4F3D] mt-3">
                    Fig. {String(active + 1).padStart(2, "0")} — {project.header}
                  </p>
                </div>
              </div>

              {/* Right page — typed report */}
              <div className="relative bg-[#F9F3E7] p-8 md:p-12 flex flex-col justify-center">
                <p style={MONO} className="text-[11px] text-[#8C7851] tracking-widest mb-4">
                  ENTRY {String(active + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}
                </p>

                <h3 style={SERIF} className="text-3xl md:text-4xl font-semibold text-[#2A2018] mb-2">
                  {project.header}
                </h3>
                <p style={MONO} className="text-[#7A2E2E] text-sm mb-6 tracking-wide">{project.title}</p>

                <p style={{ fontFamily: "Georgia, serif" }} className="text-[#443A2C] text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>

                <p style={MONO} className="text-[13px] text-[#5C4F3D] leading-loose mb-8">
                  {project.techStack.join("  ·  ")}
                </p>

                {/* Two stamps — source is always live, "live" reflects availability */}
                <div className="flex items-center gap-4 mt-auto">
                  <Link to={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <div
                      style={MONO}
                      className="w-20 h-20 rounded-full border-[3px] border-[#2A2018]/70 flex items-center justify-center rotate-[6deg] text-[#2A2018] hover:bg-[#2A2018]/5 transition-colors"
                    >
                      <span className="text-[10px] font-bold text-center leading-tight flex flex-col items-center gap-1">
                        <Github size={15} />
                        SOURCE
                      </span>
                    </div>
                  </Link>

                  {project.liveLink ? (
                    <Link to={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <div
                        style={MONO}
                        className="w-24 h-24 rounded-full border-[3px] border-[#7A2E2E] flex items-center justify-center rotate-[-8deg] text-[#7A2E2E] hover:bg-[#7A2E2E]/5 transition-colors"
                      >
                        <span className="text-[11px] font-bold text-center leading-tight flex flex-col items-center gap-1">
                          LIVE
                          <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div
                      style={MONO}
                      className="w-24 h-24 rounded-full border-[3px] border-dashed border-[#8C7851]/40 flex items-center justify-center rotate-[-8deg] text-[#8C7851]/50 cursor-not-allowed"
                    >
                      <span className="text-[9px] font-bold text-center leading-tight">
                        UNAVAILABLE
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Folder tabs to switch entries */}
        <div className="flex flex-wrap gap-2 mt-4 px-2">
          {projectsData.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              style={MONO}
              className={`px-4 py-2 text-[11px] tracking-wide rounded-b-sm border border-t-0 transition-all ease-in-out duration-300 ${
                i === active
                  ? "bg-[#F9F3E7] border-[#8C7851]/50 text-[#2A2018]"
                  : "bg-[#E3D6B8]/80 border-[#8C7851]/30 text-[#725b1b] hover:text-[#2A2018] hover:scale-105  hover:rounded-br-2xl "
              }`}
            >
              {String(i + 1).padStart(2, "0")} · {p.header}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}