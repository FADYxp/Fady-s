import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Crown } from "lucide-react";
import royalImage from "../../assets/royal.png";

const SERIF = { fontFamily: "'Spectral', Georgia, serif" };
const MONO = { fontFamily: "'Space Mono', 'Courier New', monospace" };

export default function HeroOld({ onNavigate }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-20 text-[#2A2018] md:px-10 lg:px-16 bg-transparent!">
      <div className="pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="order-2 lg:order-1"
        >
          <p
            style={MONO}
            className="mb-5 text-[10px] uppercase tracking-[0.3em] text-[#B08D57]"
          >
            The Royal Portfolio · Est. 2026
          </p>
          <h1
            style={SERIF}
            className="max-w-2xl text-5xl font-semibold leading-[1.02] text-[#F5EEDF] drop-shadow-[2px_3px_0px_rgba(42,32,24,0.5)] md:text-7xl"
          >
            Think. Build.{" "}
            <span className="italic text-[#D4AF37]">Impress.</span>
          </h1>
          <div className="my-7 h-px w-32 bg-[#B08D57]" />
          <p
            style={SERIF}
            className="max-w-xl text-lg leading-relaxed text-[#E8DFC8] md:text-2xl"
          >
            I&apos;m Fady, a frontend developer crafting polished digital
            experiences with care, clarity, and a little ceremony.
          </p>
          <p
            style={MONO}
            className="mt-5 text-xs uppercase tracking-[0.16em] text-[#B08D57]"
          >
            Frontend Engineering · Interface Craft · Digital Detail
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate("projects")}
              style={MONO}
              className="inline-flex items-center gap-2 border border-[#D4AF37] bg-[#7A2E2E] px-5 py-3 text-xs uppercase tracking-wider text-[#F5EEDF] shadow-[4px_4px_0px_rgba(42,32,24,0.45)] transition-transform hover:-translate-y-1"
            >
              View the works <ArrowUpRight size={15} />
            </button>
            <a
              href="/Fady_Refaat-CV.pdf"
              download
              style={MONO}
              className="border-b border-[#B08D57] pb-1 text-xs uppercase tracking-wider text-[#E8DFC8] transition-colors hover:text-[#D4AF37]"
            >
              Download CV
            </a>
          </div>
        </motion.div>
        <motion.figure
          initial={{ opacity: 0, rotate: 2, scale: 0.94 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative order-1 mx-auto w-full max-w-[470px] rotate-1 bg-[#F5EEDF] p-3 shadow-[12px_16px_0px_rgba(42,32,24,0.35)] lg:order-2"
        >
          <div className="absolute -inset-2 -z-10 border border-[#B08D57]/70" />
          <img
            src={royalImage}
            alt="Fady illustrated in a royal manuscript style"
            className="aspect-[4/5] w-full object-cover sepia-[.2]"
          />
          <figcaption
            style={SERIF}
            className="flex items-center justify-center gap-2 py-3 text-center text-sm italic text-[#5C4F3D]"
          >
            <Crown size={15} className="text-[#7A2E2E]" /> Fady Refaat ·
            Interface Artisan
          </figcaption>
          <span className="absolute -bottom-5 -right-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#7A2E2E] text-[#F3E5AB] shadow-lg">
            <Crown size={23} />
          </span>
        </motion.figure>
      </div>
      <button
        type="button"
        onClick={() => onNavigate("about")}
        aria-label="Continue to the about section"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#B08D57] transition-colors hover:text-[#D4AF37]"
      >
        <span style={MONO} className="text-[9px] uppercase tracking-[0.25em]">
          Continue
        </span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
}
