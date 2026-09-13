import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
  Fonts used here (add once to your global CSS, ABOVE any other rule):
  @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,500;0,600;1,400&family=Space+Mono:wght@400;700&display=swap');
*/

const FACTS = [
  { label: 'Location', value: 'Alexandria, Egypt' },
  { label: 'Stack', value: 'Node.js · React · Next.js' },
  { label: 'Learning', value: 'ASP.NET Core' },
  { label: 'Role', value: 'Full-Stack Dev · Scrum Master' },
  { label: 'On the job since', value: '2+ years' },
];

const SERIF = { fontFamily: "'Spectral', Georgia, serif" };
const MONO = { fontFamily: "'Space Mono', 'Courier New', monospace" };

export default function AboutSection() {
  const sectionRef = useRef(null);
  const stampRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        defaults: { ease: 'power3.out', duration: 1 },
      });

      tl.from(bodyRef.current, { y: 28, opacity: 0 })
        .from(stampRef.current, { scale: 0.6, opacity: 0, rotate: -24, duration: 0.6, ease: 'back.out(2)' }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSmoothScroll = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;
    const sectionIndex = ['home', 'about', 'projects', 'skills', 'services', 'contact'].indexOf(id);
    if (sectionIndex < 0) return;
    window.scrollTo({ top: sectionIndex * 1.15 * window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-full w-full flex items-center justify-center px-6 "
    >
      <div
        ref={bodyRef}
        className="relative z-10 w-full max-w-3xl bg-[#F5EEDF] p-8 md:p-14 text-[#2A2018] overflow-hidden"
        style={{
          /* حواف متقطعة وعشوائية باستخدام polygon للـ clip-path */
          clipPath: "polygon(0% 1%, 2% 0%, 98% 1%, 100% 3%, 99% 25%, 100% 50%, 98% 75%, 100% 97%, 97% 100%, 75% 99%, 50% 100%, 25% 98%, 3% 100%, 0% 97%, 1% 70%, 0% 40%, 2% 15%)",
          /* تأثير الحرق والأطراف الداكنة للورقة القديمة */
          boxShadow: "inset 0 0 65px rgba(50, 25, 10, 0.4), 0 15px 35px rgba(0, 0, 0, 0.5)",
          border: "1px solid #5c3f20"
        }}
      >
        {/* Burned / Scorched Organic Spots (حطيت بقع حروق واقعية متوزعة في الأركان والأطراف جوه الورقة) */}
        <div className="absolute -top-6 -left-6 w-36 h-36 bg-[#2a1306] opacity-75 blur-2xl pointer-events-none z-10" />
        <div className="absolute -bottom-8 -right-6 w-44 h-40 bg-[#1c0b03] opacity-80 blur-3xl pointer-events-none z-10" />
        <div className="absolute top-1/3 -right-10 w-28 h-48 bg-[#381a07] opacity-65 blur-2xl pointer-events-none z-10" />
        <div className="absolute -bottom-6 left-1/3 w-36 h-24 bg-[#2e1505] opacity-70 blur-2xl pointer-events-none z-10" />
        <div className="absolute top-12 -left-8 w-28 h-28 bg-[#220e03] opacity-60 blur-xl pointer-events-none z-10" />

        {/* Paper Creases & Folds (خطوط تكسيرات وطيات الورق القديم) */}
        <div className="absolute inset-0 pointer-events-none opacity-30 z-10"
          style={{
            backgroundImage: `
              linear-gradient(125deg, transparent 35%, rgba(55, 30, 10, 0.45) 36%, transparent 37%),
              linear-gradient(35deg, transparent 58%, rgba(55, 30, 10, 0.4) 59%, transparent 60%),
              linear-gradient(85deg, transparent 22%, rgba(45, 22, 8, 0.35) 23%, transparent 24%)
            `,
            mixBlendMode: 'multiply'
          }}
        />

        {/* Burned/Scorched edges overlay layer */}
        <div className="absolute inset-0 pointer-events-none border-[7px] border-[#2b1406]/65 opacity-90 z-10"
          style={{
            clipPath: "polygon(0% 1%, 2% 0%, 98% 1%, 100% 3%, 99% 25%, 100% 50%, 98% 75%, 100% 97%, 97% 100%, 75% 99%, 50% 100%, 25% 98%, 3% 100%, 0% 97%, 1% 70%, 0% 40%, 2% 15%)",
            filter: "blur(3px)"
          }}
        />

        {/* Ink stamp */}
        <div
          ref={stampRef}
          className="absolute -top-3 right-4 md:top-8 md:right-10 w-24 h-24 rounded-full border-[3px] border-[#7A2E2E] flex items-center justify-center rotate-[-10deg] opacity-90 z-30"
        >
          <span
            className="text-[10px] text-[#7A2E2E] font-bold tracking-[0.15em] text-center leading-tight"
            style={MONO}
        >
            OPEN FOR
            <br />WORK
          </span>
        </div>

        {/* File header */}
        <p style={MONO} className="text-[11px] text-[#8C7851] tracking-widest mb-8 relative z-20">
          FILE NO. 002 — ENGINEER'S RECORD
        </p>

        <h2 style={SERIF} className="text-4xl md:text-6xl font-semibold text-[#2A2018] leading-[1.1] mb-6 relative z-20">
          Hi, I'm Fady Refaat
        </h2>

        <p style={SERIF} className="italic text-lg md:text-xl text-[#5C4F3D] leading-relaxed mb-8 max-w-lg relative z-20">
          Turning complex logic into elegant interfaces, and scattered tasks into shipped sprints.
        </p>

        <div style={{ fontFamily: "Georgia, serif" }} className="space-y-5 text-[#443A2C] text-base leading-relaxed max-w-xl mb-10 relative z-20">
          <p>
            I build interfaces that hold up under real use, not just in a demo. Most of my time
            lives in React and Next.js, but I don't stop at the UI layer — when a feature needs
            an API, a database, or an auth flow, I build that too with Node.js and Express.
          </p>
          <p>
            I'm currently deepening that range with ASP.NET Core, so I can move into larger
            backend systems with the same confidence I have on the frontend. On team projects,
            I've also run point as Scrum Master, keeping sprints honest and communication clear.
          </p>
        </div>

        {/* Ledger-style facts */}
        <dl className="border-t border-b border-[#8C7851]/40 divide-y divide-[#8C7851]/25 mb-10 relative z-20">
          {FACTS.map(({ label, value }) => (
            <div key={label} className="flex items-baseline justify-between py-2.5">
              <dt style={MONO} className="text-[11px] text-[#8C7851] tracking-wider">{label}</dt>
              <dd style={SERIF} className="text-sm text-[#2A2018] text-right">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col sm:flex-row gap-3 relative z-20">
          <a
            href="#projects"
            onClick={(event) => handleSmoothScroll(event, 'projects')}
            style={MONO}
            className="px-6 py-3 rounded-sm bg-[#7A2E2E] text-[#F5EEDF] text-sm text-center tracking-wide hover:bg-[#8C3A3A] transition-colors"
          >
            See the work
          </a>
          <a
            href="#contact"
            onClick={(event) => handleSmoothScroll(event, 'contact')}
            style={MONO}
            className="px-6 py-3 rounded-sm border border-[#2A2018]/30 text-[#2A2018] text-sm text-center tracking-wide hover:bg-[#2A2018]/5 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}