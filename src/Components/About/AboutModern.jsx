import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLIP_PATH =
  "polygon(12% 14%, 28% 11%, 35% 9%, 60% 3%, 78% 13%, 93% 26%, 98% 45%, 96% 68%, 100% 88%, 88% 98%, 63% 90%, 47% 99%, 30% 91%, 13% 97%, 3% 79%, 1% 56%, 7% 36%, 2% 20%)";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const containerRef = useRef(null);
  const innerContentRef = useRef(null);

  const mouseXTo = useRef(null);
  const mouseYTo = useRef(null);
  const contentXTo = useRef(null);
  const contentYTo = useRef(null);

  useEffect(() => {
    mouseXTo.current = gsap.quickTo(glowRef.current, "x", {
      duration: 0.5,
      ease: "power3",
    });
    mouseYTo.current = gsap.quickTo(glowRef.current, "y", {
      duration: 0.5,
      ease: "power3",
    });
    contentXTo.current = gsap.quickTo(innerContentRef.current, "x", {
      duration: 0.6,
      ease: "power3",
    });
    contentYTo.current = gsap.quickTo(innerContentRef.current, "y", {
      duration: 0.6,
      ease: "power3",
    });

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });

      gsap.from(".stagger-el", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseXTo.current(x - 225);
    mouseYTo.current(y - 225);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const offsetX = (x - centerX) / centerX;
    const offsetY = (y - centerY) / centerY;

    contentXTo.current(offsetX * -18);
    contentYTo.current(offsetY * -18);
  };

  const handleMouseLeave = () => {
    contentXTo.current?.(0);
    contentYTo.current?.(0);
  };

  const handleSmoothScroll = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;
    const sectionIndex = ["home", "about", "projects", "skills", "services", "contact"].indexOf(id);
    if (sectionIndex < 0) return;
    window.scrollTo({ top: sectionIndex * 1.15 * window.innerHeight, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center min-h-[100vh] justify-center overflow-hidden w-full m-auto cursor-alias px-4"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] z-0" />

      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-teal-500/20 via-purple-600/15 to-emerald-500/20 blur-[120px] pointer-events-none z-0 mix-blend-screen"
        style={{ transform: "translate(-100vw, -100vh)" }}
      />

      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-purple-900/10 blur-[160px] rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-teal-900/10 blur-[160px] rounded-full z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto rounded-[2rem] overflow-hidden ">
        <div
          ref={containerRef}shadow-2xl
          className="relative p-8 md:p-14 overflow-hidden transition-all duration-300 bg-cover bg-center bg-blend-color-burn bg-fixed shadow-2xl"
          style={{
            clipPath: CLIP_PATH,
            backgroundImage:
              "linear-gradient(rgba(10,10,15,0.75), rgba(10,10,15,0.85)), url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1200&auto=format&fit=crop')",
            boxShadow: `
              0 60px 140px rgba(0, 0, 0, 0.6),
              0 30px 60px rgba(0, 0, 0, 0.5),
              inset 0 0 100px rgba(0, 0, 0, 0.5),
              inset 0 4px 35px rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          
<svg
  className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
  preserveAspectRatio="none"
  viewBox="0 0 100 100"
>
  <path
    d="M 12 14 L 28 11 L 35 9 L 60 3 L 78 13 L 93 26 L 98 45 L 96 68 L 100 88 L 88 98 L 63 90 L 47 99 L 30 91 L 13 97 L 3 79 L 1 56 L 7 36 L 2 20 Z"
    fill="none"
    stroke="url(#glass-gradient-outer)"
    strokeWidth="0.1"
    className="opacity-95"
  />
  <defs>
    <linearGradient
      id="glass-gradient-outer"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="100%"
    >
      <stop offset="0%" stopColor="#14b8a6" /> {/* Teal */}
      <stop offset="40%" stopColor="#14b8a6" stopOpacity="0" /> {/* Transparent Teal */}
      <stop offset="60%" stopColor="#d946ef" stopOpacity="0" /> {/* Transparent Fuchsia */}
      <stop offset="100%" stopColor="#d946ef" /> {/* Fuchsia */}
    </linearGradient>
  </defs>
</svg>

{/* الطبقة الداخلية */}
<svg
  className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
  preserveAspectRatio="none"
  viewBox="0 0 100 100"
>
  <path
    d="M 11 13 L 27 10 L 34 8 L 60 3 L 78 13 L 93 26 L 98 45 L 96 68 L 100 88 L 88 98 L 63 90 L 47 99 L 30 91 L 13 97 L 3 79 L 1 56 L 7 36 L 2 20 Z"
    fill="none"
    stroke="url(#glass-gradient-inner)"
    strokeWidth="0.9"
    className="opacity-95"
  />
  <defs>
    <linearGradient
      id="glass-gradient-inner"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="100%"
    >
      <stop offset="0%" stopColor="#5eead4" /> {/* Light Teal */}
      <stop offset="35%" stopColor="#5eead4" stopOpacity="0" /> {/* Transparent */}
      <stop offset="65%" stopColor="#f0abfc" stopOpacity="0" /> {/* Transparent */}
      <stop offset="100%" stopColor="#f0abfc" /> {/* Light Fuchsia */}
    </linearGradient>
  </defs>
</svg>
          <div
            ref={innerContentRef}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="stagger-el inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-teal-500/20 bg-teal-500/5 mb-8 hover:bg-teal-500/10 transition-colors">
              <span className="text-[10px] font-mono text-teal-100 tracking-[0.2em] uppercase font-semibold">
                FILE NO. 002 — ENGINEER'S RECORD
              </span>
            </div>

            <h2 className="stagger-el text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Hi, I'm <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-teal-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_25px_rgba(45,212,191,0.2)]">
                Fady Refaat
              </span>
            </h2>

            <div className="stagger-el relative mb-10 px-6">
              <span className="absolute -top-5 -left-1 text-5xl text-white/10 font-serif">
                "
              </span>
              <h3 className="text-lg md:text-2xl text-gray-300 font-serif italic tracking-wide leading-relaxed">
                Turning complex logic into elegant interfaces,
                <br className="hidden md:block" /> and scattered tasks into
                shipped sprints.
              </h3>
              <span className="absolute -bottom-8 -right-1 text-5xl text-white/10 font-serif rotate-180">
                "
              </span>
            </div>

            <div className="stagger-el space-y-4 max-w-2xl text-gray-300 text-base md:text-lg leading-relaxed mb-12 font-light">
              <p>
                I build interfaces that hold up under real use, not just in a
                demo. Most of my time lives in{" "}
                <span className="text-white font-black tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] mx-1">
                  React and Next.js
                </span>
                , but I don't stop at the UI layer | when a feature needs an
                API, a database, or an auth flow, I build that too with{" "}
                <span className="inline-flex items-center px-2 py-0.5 rounded text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 mx-1">
                  Node.js & Express
                </span>
                .
              </p>
              <p className="text-sm md:text-base leading-loose text-gray-300">
                I'm currently deepening that range with{" "}
                <span className="inline-flex items-center px-2 py-0.5 rounded text-blue-300 bg-blue-500/10 border border-blue-500/20 mx-1">
                  ASP.NET Core
                </span>
                , so I can move into larger backend systems with the same
                confidence I have on the frontend. On team projects, I've also
                run point as{" "}
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-medium mx-1">
                  Scrum Master
                </span>
                , keeping sprints honest and communication clear.
              </p>
            </div>

            <div className="stagger-el flex flex-col sm:flex-row items-center justify-center gap-3 w-full md:w-auto">
              <a
                href="#projects"
                onClick={(event) => handleSmoothScroll(event, "projects")}
                className="w-full sm:w-auto relative group px-7 py-3.5 rounded-xl bg-teal-500 text-black font-extrabold text-xs tracking-widest uppercase overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)]"
              >
                <span className="relative z-10">See the work</span>
                <div className="absolute inset-0 h-full w-full bg-teal-400 scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
              </a>

              <a
                href="#contact"
                onClick={(event) => handleSmoothScroll(event, "contact")}
                className="w-full sm:w-auto group px-7 py-3.5 rounded-xl text-white font-medium text-xs tracking-widest uppercase border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
              >
                Get in touch{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1.5 text-teal-400 ml-1.5">
                  →
                </span>
              </a>
            </div>

            <div className="stagger-el mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 w-full">
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-black/30 border border-white/10 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-gray-200 text-xs font-mono">
                  Alexandria, Egypt
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400 uppercase tracking-wider">
                    Stack
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-gray-200 border border-white/10">
                    React / Next
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-gray-200 border border-white/10">
                    Node / .NET
                  </span>
                </div>
                <div className="hidden md:block w-px h-4 bg-white/10" />
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400 uppercase tracking-wider">
                    Workflow
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-gray-200 border border-white/10">
                    Agile / Scrum Master
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
