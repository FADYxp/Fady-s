import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "../Header/Header";
import { useNavigate } from "react-router-dom";

const skills = [
  {
    name: "React.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    info: "A JavaScript library for building UI components.",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    info: "A dynamic programming language for the web.",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    info: "A React framework for SSR and static websites.",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    info: "A utility-first CSS framework for rapid UI design.",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    info: "A superset of JavaScript that adds static typing.",
  },
];

const MiniSkillsSection = () => {
  const [typedText, setTypedText] = useState("");
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();

  const currentSkill = skills[currentSkillIndex];

  // ✨ Animation typing effect loop
  useEffect(() => {
    let i = 0;
    const text = currentSkill.name;
    setTypedText("");
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      setTypedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => {
          // move to next skill
          setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
        }, 2000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [currentSkillIndex]);

  return (
    <section className="relative py-20 flex flex-col items-center justify-center overflow-hidden text-white outfit-font ">

      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        {/* Header */}
        <SectionHeader
          title="Skills Zone"
          subtitle="Watch skills appear dynamically — try the full version to explore all!"
        />

        {/* Search Bar */}
        <div className="flex justify-center mt-8">
   <input
  type="text"
  placeholder="Search a skill..."
  value={typedText + (isTyping ? "|" : "")}
  readOnly
  className="w-full max-w-md p-3 text-teal-100 text-center text-lg tracking-wide
             rounded-2xl cursor-default border border-white/20  overflow-hidden
             bg-gradient-to-r from-fuchsia-900/40 to-teal-900/40
             backdrop-blur-md shadow-[0_0_20px_rgba(255,0,150,0.2)]
             placeholder-gray-400 transition-all duration-500 ease-in-out
             hover:backdrop-blur-sm hover:shadow-[0_0_25px_rgba(255,0,150,0.4)]
             focus:outline-none focus:border-fuchsia-400/40"
/>

        </div>

        {/* Example Card (animated switch) */}
        <div className="flex justify-center mt-10 min-h-[180px]">
          <AnimatePresence mode="wait">
<motion.div
  key={currentSkill.name}
  initial={{ opacity: 0, y: 30, scale: 0.7 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, x: 300, scale: 0.9 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  whileHover={{
    scale: 1.05,
    boxShadow:
      "0 0 25px rgba(236,72,153,0.4), 0 0 40px rgba(20,184,166,0.3)",
  }}
  className="relative bg-gradient-to-br from-fuchsia-900/20 via-[#0f172a]/40 to-teal-900/20
             border border-white/10 rounded-2xl p-6 text-center 
             w-[60%]  md:w-[30%]
             backdrop-blur-sm shadow-[0 0 25px rgba(236,72,153,0.4), 0 0 40px rgba(20,184,166,0.3)]
             transition-all duration-500 ease-out hover:backdrop-blur-md"
>
  {/* تأثير خفيف في الخلفية */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 to-teal-500/10 blur-2xl opacity-40"></div>

  <div className="relative flex flex-col items-center justify-between h-full">
    {/* الأيقونة */}
    <img
      src={currentSkill.icon}
      alt={currentSkill.name}
      className="w-12 h-12 mx-auto mb-3 drop-shadow-[0_0_10px_#a855f7]"
    />

    {/* الاسم */}
    <h3 className="text-lg font-semibold text-fuchsia-200/80 mb-2">
      {currentSkill.name}
    </h3>

    {/* الوصف - متحد في الارتفاع */}
    <p className="text-xs text-gray-300 leading-tight min-h-[40px] flex items-center justify-center">
      {currentSkill.info}
    </p>
  </div>
</motion.div>

          </AnimatePresence>
        </div>

        {/* Button */}
        
<motion.button
  inherit={false} // 🔥 مهم جدًا علشان يمنع وراثة أنيميشن من أي parent
  onClick={() => navigate("/skills")}
  animate={{
    x: [0, -2, 2, -2, 2, 0], // اهتزاز خفيف وواضح
  }}
  transition={{
    duration: 0.8, // سرعة الاهتزاز
    repeat: Infinity, // تكرار لا نهائي
    repeatType: "loop",
    ease: "easeInOut",
  }}
  whileHover={{
    x: 0, // يثبت مكانه لما تعمل hover
    transition: { duration: 0.7 },
  }}
  className="relative z-[50] mt-10 px-8 py-3 rounded-2xl cursor-pointer
             font-semibold text-white/80 tracking-wide
             backdrop-blur-md bg-gradient-to-r from-fuchsia-900/40 to-teal-900/40
             hover:bg-gradient-to-b hover:from-teal-900/20 hover:to-fuchsia-900/20
             hover:backdrop-blur-sm
             border border-white/20
             transition-colors ease-in-out duration-900"
>
  Try Full Version →
</motion.button>


      </div>
    </section>
  );
};

export default MiniSkillsSection;
