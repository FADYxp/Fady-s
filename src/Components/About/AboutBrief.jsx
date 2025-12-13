import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../Header/Header';

function Tag({ label }) {
  return (
    <span className="inline-flex  items-center gap-2 px-3 py-1 rounded-full border border-black/8 text-xs font-medium bg-white/10 text-gray-300">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-80">
        <path
          d="M12 2v20M2 12h20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </span>
  );
}

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {

  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef(null);
 const badgeRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // fade in section when it appears
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 60,
        duration: .1,
        ease: 'power1.out',
      });

      // text animation (staggered)
      gsap.from(textRef.current.querySelectorAll('.stagger'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 30,
        opacity: 0,
        filter: 'blur(6px)',
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
      });

      // card animation (blur + glow)
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.3,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
   <section
  ref={sectionRef}
  className="max-w-5xl mx-auto px-6 pb-5 pt-10  transition-all duration-700"
  aria-label="About section"
>
  <SectionHeader title="About Me" />

  <div className="bg-fuchsia-400/10 backdrop-blur-md border border-black/10 rounded-2xl p-8 lg:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8 items-center hover:shadow-[0_0_40px_6px_#584C8D] hover:bg-fuchsia-900/20 transition-all duration-1000">
    
    {/* LEFT: Text */}
    <div className="order-2 lg:order-1" ref={textRef}>
<div
  ref={badgeRef}
  className="inline-flex items-center gap-3 mb-4 stagger"
>
  <span className="px-3 py-1 rounded-full text-sm font-light text-gray-800 dark:text-gray-200 border border-gray-400/20 bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-sm">
    Software-Engineer
  </span>

  <span className="w-2 h-2 rounded-full bg-teal-300/50  backdrop-blur-md"></span>

</div>


<h2 className="stagger outfit-font text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100">
  Hey — I’m Fady Refaat
</h2>

<p className="stagger mt-4 max-w-2xl text-gray-300/95  text-lg leading-relaxed">
  I’m a Frontend Developer dedicated to crafting modern, responsive, and accessible web interfaces. 
  My work focuses on clean design, smooth performance, and user-centered experiences that bring ideas to life with clarity and precision.
</p>

<p className="stagger mt-3 text-gray-300/95  text-base leading-relaxed">
  I enjoy transforming concepts into interactive, scalable solutions — blending creativity with technical depth 
  to deliver products that feel effortless to use and visually refined.
</p>

<p className="stagger mt-3 text-gray-300/95  text-base leading-relaxed">
  My goal is to make every interface feel
  <span className="heart font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent inline ml-2">
    A∟iVe
  </span>
  — turning pixels into meaningful experiences.
</p>


<div className="stagger mt-8 flex flex-wrap gap-3">
  {/* زرار About */}
  <a
    href="#projects"
    className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium 
               text-teal-100 
               backdrop-blur-md bg-gradient-to-r from-[#0f172a]/50 to-[#134e4a]/50
               hover:shadow-[0_0_20px_rgba(20,184,166,0.35)] 
               hover:scale-[.95] transition-all duration-300 "
  >
    <span className="text-sm md:text-base">Explore More 👀</span>
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-80 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <span className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></span>
  </a>

  {/* زرار Contact */}
  <a
    href="#contact"
    className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium 
               text-white 
               backdrop-blur-md bg-gradient-to-r from-purple-900/50 to-teal-800/50
               shadow-[0_0_10px_rgba(147,51,234,0.2)] 
               hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]
               hover:rotate-6 transition-all duration-300  "
  >
    <span className="text-sm md:text-base">Let’s Connect 💬</span>

    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-teal-400/15 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></span>
  </a>
  
</div>


      <div className="stagger mt-6 text-sm   text-gray-500">
        <span className="mr-3">Tech:</span>
        <span className="inline-flex items-center gap-2">
          <Tag label="React" /> <Tag label="Next.js" />
        </span>
      </div>
    </div>

{/* RIGHT: Illustration Card */}
<div className="order-1 lg:order-2 flex justify-center lg:justify-end">
  <div
    ref={cardRef}
    className="w-full max-w-md rounded-xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-black/10  transition-all duration-700 hover:[box-shadow:inset_0_0_12px_rgba(0,0,0,0.9)] "
  >
    <div className="relative rounded-lg overflow-hidden bg-gradient-to-tr from-purple-800 via-indigo-700 to-teal-600 p-6">
      <svg
        viewBox="0 0 600 400"
        className="w-full h-56"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Abstract developer illustration"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#6B21A8" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>

        {/* الخلفية */}
        <rect x="0" y="0" width="600" height="400" rx="16" fill="url(#g1)" opacity="0.95" />

        {/* المستطيلات العلوية */}
        <g transform="translate(40,30)">
          <rect x="0" y="0" width="220" height="120" rx="10" fill="#0f172a" opacity="0.08" />
          <rect x="20" y="18" width="180" height="12" rx="8" fill="#ffffff" opacity="0.12" />
          <rect x="20" y="40" width="140" height="10" rx="6" fill="#ffffff" opacity="0.09" />
        </g>

        {/* دائرة الصورة */}
        <g transform="translate(300,80)">
          <circle cx="80" cy="40" r="36" fill="#ffffff" opacity="0.12" />
          <foreignObject x="44" y="4" width="72" height="72">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User"
              style={{ borderRadius: "50%", opacity: "50%",  border: "2px solid rgba(255,255,255,0.4)" }}
            />
          </foreignObject>
        </g>

        {/* المستطيل السفلي */}
        <g transform="translate(80,180)">
          <rect x="0" y="0" width="430" height="160" rx="12" fill="#000" opacity="0.08" />
          <rect x="18" y="14" width="394" height="96" rx="8" fill="#fff" opacity="0.06" />
    <g transform="translate(28,24)" fill="#fff" opacity="0.6" fontFamily="Inter, Arial" fontSize="11">
  <text x="0" y="14" fontWeight="600" opacity="0.7">Fady Refaat</text>
  <text x="0" y="32" opacity="0.5">Web Developer</text>
  <text x="0" y="50" opacity="0.4">B.Sc. in Computer Science & information managemnt system</text>
  <text x="0" y="68" opacity="0.4">Egypt</text>
</g>

        </g>

        {/* عناصر زخرفية */}
        <circle cx="520" cy="44" r="6" fill="#fff" opacity="0.18" />
        <circle cx="480" cy="120" r="4" fill="#fff" opacity="0.12" />
      </svg>
    </div>
  </div>
</div>


  </div>
</section>

  );
}


