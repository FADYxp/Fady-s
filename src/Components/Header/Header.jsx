import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionHeader({ title, subtitle }) {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 60, filter: "blur(110px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2,
        ease: "elastic.out(1, 0.4)",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={headerRef} className="text-center mb-10 rotate-6">
      <h2
        className="text-4xl md:text-5xl blur-[1px] z-10 !font-sans text-shadow-2xs text-shadow-fuchsia-400/10 font-extrabold bg-gradient-to-r from-[#9a6ead] via-[#4a4e91] to-[#9a6ead]
        bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(154,110,173,0.4)]"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-gray-500 text-lg tracking-wide italic">
          {subtitle}
        </p>
      )}
    </div>
  );
}
