import React from "react";
import { motion } from "framer-motion";
import { Code2, Palette, Server, Zap, Kanban, Shield } from "lucide-react";
import SectionHeader from "../Header/Header";

// خريطة الألوان الأنيقة
const colorMap = {
  teal: { text: "text-teal-400", bgGlow: "group-hover:bg-teal-500/20", border: "group-hover:border-teal-500/50", bullet: "bg-teal-400" },
  indigo: { text: "text-indigo-400", bgGlow: "group-hover:bg-indigo-500/20", border: "group-hover:border-indigo-500/50", bullet: "bg-indigo-400" },
  pink: { text: "text-pink-400", bgGlow: "group-hover:bg-pink-500/20", border: "group-hover:border-pink-500/50", bullet: "bg-pink-400" },
  amber: { text: "text-amber-400", bgGlow: "group-hover:bg-amber-500/20", border: "group-hover:border-amber-500/50", bullet: "bg-amber-400" },
  blue: { text: "text-blue-400", bgGlow: "group-hover:bg-blue-500/20", border: "group-hover:border-blue-500/50", bullet: "bg-blue-400" },
  green: { text: "text-green-400", bgGlow: "group-hover:bg-green-500/20", border: "group-hover:border-green-500/50", bullet: "bg-green-400" },
};

// الداتا مع قيم "النعكشة" الثابتة لكل كارت عشان تفضل شكلها حلو دايماً
const services = [
  { 
    icon: <Code2 size={28} />, 
    title: "Frontend Engineering", 
    color: "teal", 
    desc: "Building pixel-perfect, interactive web applications.", 
    details: ["React & Next.js Architecture", "Tailwind CSS Styling", "State Management", "GSAP Animations"],
    scatter: { rotate: -4, x: -10, y: 15 }
  },
  { 
    icon: <Server size={28} />, 
    title: "Backend & APIs", 
    color: "indigo", 
    desc: "Developing robust and secure server-side logic.", 
    details: ["RESTful API Development", "Node.js Environment", "Database Integration", "Secure Auth"],
    scatter: { rotate: 3, x: 10, y: -10 }
  },
  { 
    icon: <Palette size={28} />, 
    title: "UI / UX Implementation", 
    color: "pink", 
    desc: "Translating designs into flawless, responsive code.", 
    details: ["Figma to Code", "Micro-interactions", "Mobile-First", "Accessibility (a11y)"],
    scatter: { rotate: -2, x: 5, y: 20 }
  },
  { 
    icon: <Zap size={28} />, 
    title: "Performance & SEO", 
    color: "amber", 
    desc: "Optimizing for maximum speed and search visibility.", 
    details: ["Core Web Vitals", "Lazy Loading & Caching", "Technical SEO Audits", "Asset Minification"],
    scatter: { rotate: 5, x: -15, y: -5 }
  },
  { 
    icon: <Kanban size={28} />, 
    title: "Agile & Scrum Workflow", 
    color: "blue", 
    desc: "Orchestrating workflows and ensuring team alignment.", 
    details: ["Sprint Planning", "Jira Management", "Cross-functional Sync", "Agile Coaching"],
    scatter: { rotate: -5, x: 15, y: 10 }
  },
  { 
    icon: <Shield size={28} />, 
    title: "Maintenance & Security", 
    color: "green", 
    desc: "Ensuring long-term stability and protecting data.", 
    details: ["Code Audits", "Bug Tracking & Fixing", "CI/CD Pipelines", "Data Encryption"],
    scatter: { rotate: 4, x: -5, y: -15 }
  },
];

export default function Services() {
  return (
    <section className="py-24 px-4 md:px-8 relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* شبكة خلفية */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <SectionHeader 
          title="My Expertise" 
          subtitle="Comprehensive solutions covering the entire software development lifecycle." 
        />
        
        {/* الحاوية - قللنا الجاب شوية عشان الكروت تبان متداخلة أكتر */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((s, i) => {
            const colors = colorMap[s.color];

            return (
              <motion.div
                key={i}
                // الحالة المبدئية: الكروت بتنزل متنعكشة
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ 
                  opacity: 1, 
                  y: s.scatter.y, 
                  x: s.scatter.x, 
                  rotate: s.scatter.rotate,
                  zIndex: 10
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring", bounce: 0.4 }}
                
                // حالة الـ Hover: الكارت بيتعدل، بيطلع قدام، وبيكبر سيكا
                whileHover={{ 
                  y: -15, 
                  x: 0, 
                  rotate: 0, 
                  scale: 1.05,
                  zIndex: 50, // يغطي على باقي الكروت
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                
                // الكلاسات الأساسية للكارت
                className={`group relative rounded-[2.5rem] p-8 bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10 transition-colors duration-500 cursor-crosshair flex flex-col h-full ${colors.border}`}
              >
                {/* إضاءة خلفية ناعمة بتنور لما الكارت يتعدل */}
                <div className={`absolute inset-0 opacity-0 ${colors.bgGlow} transition-opacity duration-500 rounded-[2.5rem] pointer-events-none`} />

                <div className="relative z-10">
                  <div className={`${colors.text} mb-6 bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 shadow-lg group-hover:bg-white/10 transition-colors duration-300`}>
                    {s.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                    {s.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 h-12">
                    {s.desc}
                  </p>

                  {/* تفاصيل السيرفيس بتفضل موجودة بس بنقط شيك */}
                  <div className="space-y-3 pt-6 border-t border-white/10">
                    {s.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.bullet} opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300`} />
                        <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}