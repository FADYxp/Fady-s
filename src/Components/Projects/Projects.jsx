import React, { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../Header/Header";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      id: 1,
      header: "Fresh-Cart Ecommerce",
      title: "Ecommerce Website",
      desc: "منصة تجارة إلكترونية متكاملة. تتيح للمستخدمين تصفح المنتجات، إضافتها لعربة التسوق، وإتمام عملية الشراء بسلاسة تامة. المنصة مصممة لتتحمل ضغط المستخدمين وتوفر تجربة تسوق سريعة وآمنة.",
      techStack: ["React", "Tailwind", "Context API", "Axios"],
      Link: "https://ecommerce-iota-flame.vercel.app/",
      img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      header: "Exam-App",
      title: "Smart Exam Platform",
      desc: "تطبيق ذكي لإدارة الامتحانات والاختبارات، يحتوي على نظام توقيت وحساب درجات فوري بعد الانتهاء. التطبيق يمنع الغش ويقدم تقارير مفصلة عن أداء الطالب في كل مادة.",
      techStack: ["Next.js", "TypeScript", "Tailwind", "Zustand"],
      Link: "https://exam-app-beige.vercel.app/",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      header: "Weather Forecast",
      title: "Weather App",
      desc: "تطبيق طقس ديناميكي يعتمد على تحديد الموقع ويعرض حالة الطقس الحالية وتوقعات الأيام القادمة بدقة عالية بفضل استخدام الـ APIs العالمية.",
      techStack: ["React", "OpenWeather API", "CSS Modules"],
      Link: "https://weather-psi-mocha-98.vercel.app/",
      img: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 4,
      header: "Rose Dashboard",
      title: "Single Page Application",
      desc: "لوحة تحكم متكاملة وتطبيق ويب من صفحة واحدة يستعرض مهارات بناء الـ Components وتوجيه الصفحات. تقدم اللوحة رسوم بيانية وتتبع لبيانات المستخدمين بشكل فوري.",
      techStack: ["React Router", "Tailwind", "Framer Motion"],
      Link: "https://frame-work-seven-mauve.vercel.app/",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-20 w-full flex flex-col items-center bg-fixed text-white relative min-h-screen">
      <SectionHeader title={"Projects"} />

      {/* الـ Container الأساسي: 95% للموبايل و 80% للشاشات الأكبر */}
      <div className="relative w-[95%] md:w-[80%] h-[75vh] md:h-[600px] mt-10 rounded-3xl overflow-hidden bg-black/20 border border-white/5 shadow-2xl flex">
        
        {/* شبكة المشاريع: flex-col للموبايل و flex-row للديسكتوب */}
        <div className="flex flex-col md:flex-row w-full h-full gap-2 p-2">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative h-full flex-1 hover:flex-[3] md:hover:flex-[4] transition-all duration-700 ease-in-out cursor-pointer overflow-hidden rounded-2xl"
            >
              {/* صورة المشروع كخلفية */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.img})` }}
              />
              
              {/* لاير تظليل */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

              {/* المحتوى اللي على الكارت */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex flex-col justify-end h-full">
                <div className="flex flex-col gap-1 md:gap-2">
                  <h2 className="text-lg md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 whitespace-nowrap opacity-100 transition-all duration-500 origin-left">
                    {project.header}
                  </h2>
                  
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-1 md:mt-2">
                    <p className="text-teal-400 font-mono text-xs md:text-sm mb-3">{project.title}</p>
                    <button className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest text-white/70 hover:text-teal-400 uppercase border border-white/20 hover:border-teal-500/50 rounded-full px-4 py-2 backdrop-blur-md transition-colors w-fit">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* اللاير الإضافية (بقت Scrollable) */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col overflow-hidden"
            >
              {/* زرار القفل ثابت فوق الـ Scroll عشان ميهربش */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-[60]">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 md:p-3 rounded-full transition-all backdrop-blur-md border border-white/10"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>

              {/* منطقة المحتوى القابلة للسكرول */}
              <div className="w-full h-full overflow-y-auto custom-scrollbar p-6 pt-20 md:p-12 md:pt-12">
                <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start min-h-max pb-10">
                  
                  {/* صورة المشروع في اللاير الإضافية */}
                  <div className="w-full md:w-1/2 h-48 md:h-80 rounded-2xl overflow-hidden relative border border-white/10 shrink-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${selectedProject.img})` }}
                    />
                    <div className="absolute inset-0 bg-teal-500/10 mix-blend-overlay" />
                  </div>

                  {/* التفاصيل والتقنيات */}
                  <div className="flex flex-col flex-1 w-full">
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-2">{selectedProject.header}</h3>
                    <p className="text-teal-400 font-mono text-base md:text-lg mb-6">{selectedProject.title}</p>
                    
                    <p className="text-gray-300 leading-relaxed text-sm md:text-lg mb-8 max-w-xl">
                      {selectedProject.desc}
                    </p>

                    <div className="mb-10">
                      <h4 className="text-xs md:text-sm text-gray-500 font-bold tracking-widest mb-4 uppercase">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {selectedProject.techStack.map((tech, i) => (
                          <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-mono text-fuchsia-200 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-xl">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link to={selectedProject.Link} target="_blank" rel="noopener noreferrer" className="w-full md:w-fit mt-auto">
                      <button className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-500 hover:to-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all hover:-translate-y-1">
                        <ExternalLink size={20} />
                        Live Preview
                      </button>
                    </Link>
                  </div>
                  
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}