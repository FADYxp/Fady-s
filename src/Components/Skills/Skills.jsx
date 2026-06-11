import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import skillsData from "./skillsData";
import SectionHeader from './../Header/Header';

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isIntroPhase, setIsIntroPhase] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);
  const previousInViewRef = useRef(false);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  const activeSkill = skillsData[activeIndex] || null;

  // Start intro phase ONLY when scrolling to the section (transition from false to true)
  useEffect(() => {
    if (isInView && !previousInViewRef.current && !hasStarted) {
      setHasStarted(true);
      setIsIntroPhase(true);
    }
    previousInViewRef.current = isInView;
  }, [isInView, hasStarted]);
  useEffect(() => {
    let interval;
    let timeout;

    if (!isIntroPhase) {
      // 1. مرحلة البداية: اختيار عشوائي سريع جداً (كل 100 ملي ثانية)
      interval = setInterval(() => {
        setActiveIndex(Math.floor(Math.random() * skillsData.length));
      }, 200);

      // توقيف المرحلة دي بعد 6 ثواني وتثبيتها على أول مهارة
      timeout = setTimeout(() => {
        clearInterval(interval);
        setIsIntroPhase(false);
        setActiveIndex(0);
      }, 3000);

    } else if (isHovered && skillsData.length > 0) {
      // 2. المرحلة العادية: التقليب الهادي بالترتيب كل 2.5 ثانية
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % skillsData.length);
      }, 2500);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isIntroPhase, isHovered]);

  // إيقاف الـ Intro لو اليوزر اتفاعل مع القسم
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isIntroPhase) setIsIntroPhase(false); 
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen  text-white py-20 px-4 md:px-8 relative overflow-hidden flex items-center "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Grid Background */}

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 h-full items-center">
        
        {/* Left Column: Skill Cloud / Selection */}
        <div className="flex-1 w-full">
          <div className="mb-10 text-center lg:text-left">
<SectionHeader title={"Tech"}  subtitle= {"A comprehensive overview of my technical stack. Hover or click any technology to view detailed insights."}/>

          </div>

          {/* Scrollable Container for Skills */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 max-h-[50vh] overflow-y-auto pr-2 pb-4 scroll-smooth"
               style={{ scrollbarWidth: 'thin', scrollbarColor: '#a855f7 transparent' }}>
            {skillsData.map((skill, index) => {
              const isActive = activeIndex === index;
              
              return (
                <motion.button
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: (index % 15) * 0.03 }}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsIntroPhase(false); // وقف الـ Intro لو داس على حاجة
                  }}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setIsIntroPhase(false);
                  }}
                  className={`relative flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-105"
                      : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    loading="lazy"
                    className={`w-5 h-5 object-contain transition-all duration-300 ${isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" : "opacity-70"}`} 
                  />
                  <span className="font-medium text-sm whitespace-nowrap">{skill.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Focus Panel */}
        <div className="w-full lg:w-[450px] h-[400px] lg:h-[500px] shrink-0 bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-center shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-500/20 blur-[100px] rounded-full pointer-events-none"></div>

          {/* استخدمنا Undefined في الـ mode لو إحنا في مرحلة الـ Intro 
            عشان الأنيميشن ما يعطلش ويستنى بعضه، ويقلب بسرعة الصاروخ
          */}
          <AnimatePresence mode={isIntroPhase ? undefined : "wait"}>
            {activeSkill && (
              <motion.div
                key={activeSkill.name}
                // في مرحلة الـ Intro مش هنعمل Blur و Y-axis عشان مايبقاش مزعج للعين، مجرد Opacity خفيفة
                initial={isIntroPhase ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={isIntroPhase ? { opacity: 0 } : { opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: isIntroPhase ? 0.05 : 0.3, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center text-center h-full justify-center"
              >
                <div className="w-32 h-32 mb-8 relative flex items-center justify-center bg-black/40 rounded-2xl border border-white/10 shadow-inner">
                  <motion.img
                    src={activeSkill.icon}
                    alt={activeSkill.name}
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  />
                </div>

                <h3 className="text-3xl font-bold text-white mb-3">
                  {activeSkill.name}
                </h3>
                
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent mb-5 opacity-50"></div>
                
                <p className="text-gray-300 leading-relaxed text-sm md:text-base px-4">
                  {activeSkill.info}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;