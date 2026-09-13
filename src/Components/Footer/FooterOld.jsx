import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";

const SERIF = { fontFamily: "'Spectral', Georgia, serif" };
const MONO = { fontFamily: "'Space Mono', 'Courier New', monospace" };

// Footer itself: slides up from below, starting half a second after
// `isActive` flips true. Slides back down when `isActive` goes false
// again, so it's ready to replay next time the user reaches this section.
const footerVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

// Three content blocks enter from different directions, starting
// roughly a second after `isActive` flips true (0.5s footer delay +
// ~0.5s more), with a slight stagger between them.
const fromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { delay: 1, duration: 0.8, ease: "easeOut" } },
};
const fromBottom = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { delay: 1.15, duration: 0.8, ease: "easeOut" } },
};
const fromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { delay: 1.3, duration: 0.8, ease: "easeOut" } },
};

export default function FooterOld({ isActive = false }) {
  const state = isActive ? "visible" : "hidden";

  return (
    <motion.footer
      initial="hidden"
      animate={state}
      variants={footerVariants}
      className="footer-royal relative mt-4 w-full overflow-hidden border-t-2 border-[#7A2E2E] bg-[#F5EEDF] px-5 pb-7 pt-9 text-[#2A2018]"
      style={{
        clipPath:
          "polygon(0% 8%, 3% 3%, 7% 6%, 12% 1%, 18% 5%, 24% 2%, 31% 6%, 38% 1%, 46% 5%, 54% 2%, 61% 6%, 68% 1%, 75% 5%, 82% 2%, 89% 6%, 95% 1%, 100% 5%, 100% 100%, 0% 100%)",
      }}
    >
      <div className="footer-royal-content relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <motion.div
          initial="hidden"
          animate={state}
          variants={fromLeft}
          style={MONO}
          className="flex flex-col items-center gap-2 text-[11px] text-[#5C4F3D] md:items-start"
        >
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-[#7A2E2E]" /> Alexandria, Egypt
          </span>
          <a
            href="mailto:ffady354@gmail.com"
            className="flex items-center gap-2 hover:text-[#7A2E2E]"
          >
            <Mail size={14} className="text-[#7A2E2E]" /> fffady354@gmail.com
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={state}
          variants={fromBottom}
          className="flex items-center gap-5 text-[#7A2E2E]"
        >
          <a
            href="https://github.com/fadyxp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={19} />
          </a>
          <a
            href="https://linkedin.com/in/fady-refaat-9b5294343"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={19} />
          </a>
          <a
            href="https://wa.me/201011620644"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle size={19} />
          </a>
        </motion.div>

        <motion.p
          initial="hidden"
          animate={state}
          variants={fromRight}
          style={SERIF}
          className="text-sm italic text-[#5C4F3D]"
        >
          &copy; {new Date().getFullYear()} Fady Refaat · All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}