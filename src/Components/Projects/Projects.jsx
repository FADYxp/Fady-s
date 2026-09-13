import React, { useState } from "react";
import { Link } from "react-router-dom"; // لو مش بتستخدمها شيلها
import SectionHeader from "../Header/Header";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ArrowRight } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projectsData = [
    {
      id: 1,
      header: "Rose App & Dashboard",
      title: "Bilingual Analytics & E-commerce Platform",
      desc: "Directed development as Scrum Master of a bilingual (Arabic/English) analytics platform, delivering interactive dashboards with 3+ chart types to visualize data in real time. Implemented secure authentication and role-based access using NextAuth, supporting 3 user roles.",
      techStack: ["Next.js", "NextAuth", "TanStack Query", "Zod", "React Hook Form", "next-intl", "ShadCN", "Chart.js"],
      liveLink: "https://rose-app-ecommerce-lyart.vercel.app/en/",
      githubLink: "https://github.com/fffady354",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" 
    },
    {
      id: 2,
      header: "Exam App",
      title: "Smart Online Assessment Platform",
      desc: "Built a secure online assessment platform enabling instructors to create timed exams with automated grading, supporting 100+ concurrent test-takers. Engineered complex multi-step form validation using Zod and React Hook Form to prevent submission errors.",
      techStack: ["Next.js", "NextAuth", "TanStack Query", "React Hook Form", "Zod", "ShadCN", "Tailwind CSS"],
      liveLink: "https://exam-app-beige.vercel.app/",
      githubLink: "https://github.com/fffady354",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      header: "Fitness App",
      title: "AI-Integrated Fitness Tracker",
      desc: "Led a 6-person Agile team to build an AI-integrated fitness tracker with real-time chat between users and trainers. Implemented bilingual localization reaching 2 languages, and integrated AI-based workout recommendations.",
      techStack: ["React.js 19", "TanStack Query", "Zod", "React Hook Form", "use-intl", "ShadCN"],
      liveLink: null,
      githubLink: "https://github.com/fffady354",
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      header: "Fresh Mart",
      title: "Full E-commerce Platform",
      desc: "Solo-built a full e-commerce platform from scratch, including product catalog, cart, and checkout flow, handling 500+ products across 20+ categories. Optimized component architecture and state management to reduce unnecessary re-renders.",
      techStack: ["Next.js", "Context API", "React Hook Form", "Tailwind CSS"],
      liveLink: "https://ecommerce-iota-flame.vercel.app/",
      githubLink: "https://github.com/fffady354",
      img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 5,
      header: "Weather Forecast",
      title: "Weather App",
      desc: "A dynamic weather application built with React that provides real-time weather updates and forecasts using global APIs. It features location-based tracking and detailed meteorological data.",
      techStack: ["React", "OpenWeather API", "CSS Modules"],
      liveLink: "https://weather-psi-mocha-98.vercel.app/",
      githubLink: "https://github.com/fffady354",
      img: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 w-full flex flex-col items-center text-neutral-200 relative min-h-screen overflow-hidden">
      
      {/* 🌟 إضاءات مخفية في الخلفية لتعزيز تأثير البلور (Ambient Glows) */}
      <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-neutral-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <SectionHeader title={"Selected Works"} />

        {/* 🌟 The Main Glass Container */}
        <div className="relative w-[95%] md:w-[90%] lg:w-[85%] h-[85vh] md:h-[600px] mt-12 rounded-[2rem] overflow-hidden bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex p-3 md:p-4 gap-3 md:gap-4 ring-1 ring-white/[0.02]">
          
          {/* Dynamic Expanding Grid */}
          <div className="flex flex-col md:flex-row w-full h-full gap-3 md:gap-4">
            {projectsData.map((project, index) => {
              const isHovered = hoveredIndex === index;
              const isAnyHovered = hoveredIndex !== null;

              return (
                <motion.div
                  key={project.id}
                  layout
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedProject(project)}
                  animate={{
                    flex: isHovered ? 4 : isAnyHovered ? 0.8 : 1,
                    opacity: isAnyHovered && !isHovered ? 0.4 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 0.8
                  }}
                  className="group relative h-full cursor-pointer overflow-hidden rounded-2xl bg-neutral-900/50 border border-white/[0.05] shadow-inner"
                >
                  {/* Background Image */}
                  <motion.div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.img})` }}
                    animate={{
                      scale: isHovered ? 1.05 : 1.1, // الـ 1.1 بيدي إحساس زوم أوت ناعم لما الماوس يبعد
                      filter: isHovered ? "grayscale(0%)" : "grayscale(80%) brightness(0.6)"
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  
                  {/* 🌟 Dark Gradient Overlay - أنعم وأكثر زجاجية */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 w-full p-5 md:p-8 flex flex-col justify-end h-full z-10">
                    <motion.div layout="position" className="flex flex-col gap-2">
                      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-lg">
                        {project.header}
                      </h2>
                      
                      <AnimatePresence>
                        {(isHovered || window.innerWidth < 768) && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0, y: 15 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex flex-col gap-4 overflow-hidden"
                          >
                            <p className="text-neutral-300 font-mono text-sm border-l-2 border-white/20 pl-3">
                              {project.title}
                            </p>
                            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-white/60 w-fit group-hover:text-white transition-colors mt-2">
                              Explore Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* {dddd */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                // هنا استخدمنا glassmorphism قوي للمودال
                className="absolute inset-0 z-50 bg-black/40 backdrop-blur-3xl flex flex-col overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              >
                {/* Close Button */}
                <div className="absolute top-6 right-6 z-[60]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(null);
                    }}
                    className="text-neutral-300 hover:text-white bg-white/5 hover:bg-white/20 p-3 rounded-full transition-all border border-white/10 backdrop-blur-md"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="w-full h-full overflow-y-auto custom-scrollbar p-6 pt-24 md:p-12 md:pt-16">
                  <div className="flex flex-col xl:flex-row gap-8 xl:gap-16 items-start min-h-max pb-10">
                    
                    {/* Image Section */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="w-full xl:w-1/2 aspect-video rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl shrink-0 group"
                    >
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${selectedProject.img})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Info Section */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col flex-1 w-full"
                    >
                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        {selectedProject.header}
                      </h3>
                      <p className="text-neutral-400 font-mono text-base md:text-lg mb-8">
                        {selectedProject.title}
                      </p>
                      
                      <p className="text-neutral-300 leading-relaxed text-base md:text-lg mb-10 max-w-2xl font-light">
                        {selectedProject.desc}
                      </p>

                      <div className="mb-12">
                        <h4 className="text-xs text-neutral-500 font-semibold tracking-widest mb-4 uppercase">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                          {selectedProject.techStack.map((tech, i) => (
                            <span key={i} className="px-4 py-2 text-sm font-mono text-neutral-200 bg-white/[0.04] border border-white/10 rounded-lg backdrop-blur-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons with Animations */}
                      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-auto">
                        {selectedProject.githubLink && (
                          <motion.a 
                            href={selectedProject.githubLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all"
                          >
                            <Github size={20} />
                            Source Code
                          </motion.a>
                        )}

                        {selectedProject.liveLink ? (
                          <motion.a 
                            href={selectedProject.liveLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-medium text-white bg-teal-500/15  backdrop-blur-3xl animate-bounce hover:animate-none transition-all  [box-shadow:inset_0_0_30px_rgba(0,0,0,0.9)]"
                          >
                            <ExternalLink size={18} />
                            Live Preview
                          </motion.a>
                        ) : (
                          <button 
                            disabled
                            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-medium text-neutral-500 bg-white/[0.02] border border-white/[0.05] cursor-not-allowed"
                          >
                            <ExternalLink size={20} className="opacity-50" />
                            Live Unavailable
                          </button>
                        )}
                      </div>
                    </motion.div>
                    
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}