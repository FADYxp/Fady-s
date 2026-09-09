import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import skillsData from "./skillsData";
import SectionHeader from './../Header/Header';

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true); // حالة ظهور سهم الإرشاد
  const sectionRef = useRef(null);

  const activeSkill = skillsData[activeIndex] || null;

  // Autoplay
  useEffect(() => {
    if (isHovered || skillsData.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skillsData.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered]);

  // دالة لمراقبة السكرول عشان نخفي السهم لو اليوزر وصل للآخر
  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    // لو المسافة المتبقية أقل من 15 بيكسل، اخفي السهم
    if (scrollLeft + clientWidth >= scrollWidth - 15) {
      setShowScrollHint(false);
    } else {
      setShowScrollHint(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-[100dvh] text-white py-8 lg:py-24 px-4 md:px-8 relative overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* الخلفيات والإضاءات */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-900/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-16 items-center lg:items-stretch h-full">
        
        {/* العمود الأيسر: المهارات */}
        <div className="flex-1 w-full flex flex-col justify-center ">
          <div className="mb-6 lg:mb-12 text-center lg:text-left">
            <motion.div variants={reveal} className="mb-16 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
              <div>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-teal-300">02 / Toolkit</p>
              <h2 className="max-w-xl text-5xl font-semibold leading-none tracking-[-0.06em] md:text-7xl">Tools for turning ideas <span className="text-white/35">into motion.</span></h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-white/40">A practical stack chosen for speed, maintainability, and interfaces that stay out of the user’s way.</p>
            </motion.div>
          </div>

          {/* حاوية المهارات والسهم */}
          <div className="relative w-full">
            
            {/* Grid سحري: صفين للموبايل، وFlex Wrap للديسكتوب */}
            <div 
              onScroll={handleScroll}
              className="grid grid-rows-2 grid-flow-col auto-cols-max lg:flex lg:flex-wrap lg:grid-rows-none overflow-x-auto lg:overflow-visible gap-3 lg:gap-4 pb-4 lg:pb-0 w-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1"
            >
              {skillsData.map((skill, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <motion.button
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`snap-start shrink-0 group relative flex items-center gap-2 lg:gap-3 px-4 lg:px-5 py-2 lg:py-3 rounded-xl lg:rounded-2xl border transition-all duration-500 ease-out ${
                      isActive
                        ? "border-teal-500/40 bg-teal-500/10 shadow-[0_0_20px_rgba(45,212,191,0.15)] scale-[1.02]"
                        : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      loading="lazy"
                      className={`w-5 h-5 lg:w-6 lg:h-6 object-contain transition-all duration-500 ${
                        isActive ? "scale-110 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)] grayscale-0" : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                      }`} 
                    />
                    <span className={`font-medium tracking-wide text-xs lg:text-sm transition-colors duration-300 whitespace-nowrap ${
                      isActive ? "text-teal-300" : "text-gray-400 group-hover:text-gray-200"
                    }`}>
                      {skill.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* مؤشر السحب (السهم) - بيظهر في الموبايل بس ويختفي لما توصل للآخر */}
            <AnimatePresence>
              {showScrollHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  // تدريج لوني (Gradient) عشان الكروت تدوب تحته بشياكة
                  className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[#09090b] via-[#09090b]/60 to-transparent pointer-events-none flex items-center justify-end pr-1 lg:hidden"
                >
                  <motion.div
                    animate={{ x: [0, 5, 0] }} // حركة نبض يمين وشمال
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    {/* أيقونة سهم أنيقة بـ SVG */}
                    <svg className="w-6 h-6 text-teal-400 opacity-80 drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>

        {/* الكارت الزجاجي */}
        <div className="w-full lg:w-[480px] shrink-0 min-h-[280px] lg:min-h-[400px] flex items-center relative group perspective-1000 mt-2 lg:mt-0">
          <div className="w-full h-full relative z-10 bg-black/40 border border-white/10 backdrop-blur-2xl rounded-3xl lg:rounded-[2rem] p-6 lg:p-10 shadow-2xl transition-transform duration-700 hover:border-teal-500/30 overflow-hidden flex flex-col justify-center">
            
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-teal-500/20 to-purple-600/20 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100"></div>

            <AnimatePresence mode="wait">
              {activeSkill && (
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative z-10 flex flex-col h-full"
                >
                  <div className="w-16 h-16 lg:w-24 lg:h-24 mb-4 lg:mb-8 relative flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors duration-500">
                    <motion.img
                      src={activeSkill.icon}
                      alt={activeSkill.name}
                      initial={{ scale: 0.8, rotate: -5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-10 h-10 lg:w-14 lg:h-14 object-contain drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                    />
                  </div>

                  <h3 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight mb-2 lg:mb-4">
                    {activeSkill.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 w-full mb-3 lg:mb-6 opacity-80">
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-teal-400"></div>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/50 to-transparent"></div>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed text-sm lg:text-lg font-light line-clamp-3 lg:line-clamp-none">
                    {activeSkill.info}
                  </p>

                  <div className="mt-auto pt-4 lg:pt-8 flex items-center justify-between text-[10px] lg:text-xs font-mono text-gray-500 uppercase tracking-widest">
                    <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                    <span>Active Module</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;