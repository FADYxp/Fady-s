import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);
  
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    xTo.current = gsap.quickTo(glowRef.current, "x", { duration: 0.4, ease: "power3" });
    yTo.current = gsap.quickTo(glowRef.current, "y", { duration: 0.4, ease: "power3" });

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 60,
        scale: 0.98,
        opacity: 0,
        duration: 1.4,
        ease: 'expo.out',
      });

      gsap.from('.stagger-el', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    xTo.current(x - 200); 
    yTo.current(y - 200);
  };

  const handleSmoothScroll = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -90;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex items-center justify-center overflow-hidden min-h-[90vh] w-full max-w-6xl m-auto cursor-crosshair rounded-[3rem]"
    >
      {/* السطح الشبكي للخلفية (Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] z-0"></div>

      {/* The Tracking Glow */}
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-teal-500/40 via-emerald-500/20 to-purple-600/40 blur-[100px] pointer-events-none z-0 mix-blend-screen"
        style={{ transform: 'translate(-100vw, -100vh)' }} 
      ></div>

      {/* Static Ambient Background Lights */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-purple-800/10 blur-[150px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-teal-800/10 blur-[150px] rounded-full z-0 pointer-events-none"></div>

      {/* The Premium Glass Card */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl mx-auto bg-black/20 border border-white/5 backdrop-blur-3xl rounded-[3rem] p-10 md:p-20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
      >
        <div className="flex flex-col items-center text-center">
          
          {/* Top Badge */}
          <div className="stagger-el inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-teal-500/20 bg-teal-500/5 mb-10 hover:bg-teal-500/10 transition-colors backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500 shadow-[0_0_8px_#2dd4bf]"></span>
            </span>
            <span className="text-[11px] font-mono text-teal-100 tracking-[0.2em] uppercase font-semibold">Available for Hire</span>
          </div>

          {/* Main Title */}
          <h2 className="stagger-el text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-8">
            Hi, I'm <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-teal-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_30px_rgba(45,212,191,0.2)]">
              Fady Refaat
            </span>
          </h2>

          {/* Classic Serif Quote */}
          <div className="stagger-el relative mb-12 px-6">
            <span className="absolute -top-6 -left-2 text-6xl text-white/10 font-serif">"</span>
            <h3 className="text-xl md:text-3xl text-gray-300 font-serif italic tracking-wide leading-relaxed">
              Turning complex logic into elegant art,<br className="hidden md:block" /> and teams into orchestras.
            </h3>
            <span className="absolute -bottom-10 -right-2 text-6xl text-white/10 font-serif rotate-180">"</span>
          </div>

          {/* Sweetened Description مع دمج الباك إند والـ Scrum */}
          <div className="stagger-el space-y-6 max-w-3xl text-gray-400 text-lg md:text-xl leading-relaxed mb-14 font-light">
            <p>
              I’m a Frontend Developer dedicated to building interfaces that don't just function, but feel truly <span className="text-white font-black tracking-widest drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] mx-1">ALiVE</span>. But great digital experiences go beyond the UI.
            </p>
            <p className="text-base md:text-lg leading-loose">
              Alongside crafting clean, scalable code, I bridge the gap between design and architecture—stepping in seamlessly to handle <span className="inline-flex items-center px-2 py-0.5 rounded text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 text-sm mx-1">Backend logic</span> with Node.js, Express, and databases when needed. Plus, as a <span className="inline-flex items-center px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white font-medium text-sm mx-1">Scrum Master</span>, I orchestrate teamwork through <span className="inline-flex items-center px-2 py-0.5 rounded text-teal-300 bg-teal-500/10 border border-teal-500/20 text-sm mx-1">Agile</span>, keeping sprints locked on <span className="inline-flex items-center px-2 py-0.5 rounded text-blue-300 bg-blue-500/10 border border-blue-500/20 text-sm mx-1">Jira</span> and communication sharp on <span className="inline-flex items-center px-2 py-0.5 rounded text-purple-300 bg-purple-500/10 border border-purple-500/20 text-sm mx-1">Slack</span>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="stagger-el flex flex-col sm:flex-row items-center justify-center gap-4 w-full md:w-auto">
            <a
              href="#projects"
              onClick={(event) => handleSmoothScroll(event, 'projects')}
              className="w-full sm:w-auto relative group px-8 py-4 rounded-xl bg-teal-500 text-black font-extrabold text-sm tracking-widest uppercase overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_30px_rgba(45,212,191,0.5)]"
            >
              <span className="relative z-10">Explore Work</span>
              <div className="absolute inset-0 h-full w-full bg-teal-400 scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
            </a>

            <a
              href="#contact"
              onClick={(event) => handleSmoothScroll(event, 'contact')}
              className="w-full sm:w-auto group px-8 py-4 rounded-xl text-white font-medium text-sm tracking-widest uppercase border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all backdrop-blur-sm"
            >
              Let's Connect <span className="inline-block transition-transform group-hover:translate-x-2 text-teal-500 ml-2">→</span>
            </a>
          </div>

        </div>

        {/* Bottom Details */}
        <div className="stagger-el mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-black/40 border border-white/5 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-gray-300 text-sm font-mono">Alexandria, Egypt</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 uppercase tracking-widest">Stack</span>
              <span className="px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5 hover:text-teal-400 transition-colors">React / Next</span>
              <span className="px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5 hover:text-emerald-400 transition-colors">Node / Express</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/10"></div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 uppercase tracking-widest">Workflow</span>
              <span className="px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5 hover:text-purple-400 transition-colors">Scrum Master</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}