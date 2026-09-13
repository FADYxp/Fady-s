import { motion } from "framer-motion";
import {
  GithubIcon2,
  LinkedinIcon2,
  EnvelopeIcon,
  WhatsappIcon,
  MapMarkerIcon,
  GoogleIcon,
} from "../Icons/Icons";

// Footer itself: slides up starting 0.5s after `isActive` flips true,
// and slides back down when `isActive` goes false — so it's reset and
// ready to replay the next time the user reaches this section.
const footerVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

// "Coming into focus" reveal: blurs in, clears, blurs again, clears
// again, settling fully by ~2s. Position (x or y) glides to 0 over the
// same window while the blur pulses independently.
const focusPulse = (offsetProp, offsetValue, delay) => ({
  hidden: { opacity: 0, filter: "blur(14px)", [offsetProp]: offsetValue },
  visible: {
    opacity: [0, 1, 0.35, 1, 0.55, 1],
    filter: [
      "blur(14px)",
      "blur(0px)",
      "blur(5px)",
      "blur(0px)",
      "blur(40px)",
      "blur(0px)",
    ],
    [offsetProp]: 0,
    transition: {
      delay,
      duration: 2,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      ease: "easeInOut",
    },
  },
});

const leftVariant = focusPulse("x", -60, 1);
const iconsVariant = focusPulse("y", 40, 1.1);
const rightVariant = focusPulse("x", 60, 1.2);

const Footer = ({ isActive = false }) => {
  const state = isActive ? "visible" : "hidden";

  return (
    <motion.footer
      initial="hidden"
      animate={state}
      variants={footerVariants}
      className="footer-liquid relative w-full py-8 text-white text-center backdrop-blur-[1px] bg-gradient-to-b from-[#00000000] via-[#18021ca0] to-[#1a003861]"
    >
      <div className="footer-liquid-content relative z-10 flex flex-col md:flex-row justify-center items-center gap-12 w-[90%] mx-auto">
        {/* Left side - Contact Info */}
        <motion.div
          initial="hidden"
          animate={state}
          variants={leftVariant}
          className="flex flex-col items-center md:items-start gap-2 text-gray-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <MapMarkerIcon className="text-teal-400 w-5 h-5" />
            <span>Alexandria, Egypt</span>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="text-pink-400 w-5 h-5" />
            <a
              href="mailto:fffady354@gmail.com"
              className="hover:text-white transition-all duration-300"
            >
              fffady354@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <WhatsappIcon className="text-green-400 w-5 h-5" />
            <a
              href="https://wa.me/201011620644"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all duration-300"
            >
              Ask for offers
            </a>
          </div>
        </motion.div>

        {/* Middle - Social Icons */}
        <motion.div
          initial="hidden"
          animate={state}
          variants={iconsVariant}
          className="flex gap-6"
        >
          <motion.a
            href="https://github.com/fadyxp"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-400 hover:text-white transition-all duration-500"
          >
            <GithubIcon2 className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/fady-refaat-9b5294343"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-400 hover:text-[#0A66C2] transition-all duration-500"
          >
            <LinkedinIcon2 className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ffady354@gmail.com&su=Hello%20Fady&body=Hi%20Fady!"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-400 hover:text-pink-400 transition-all duration-500"
          >
            <GoogleIcon className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://wa.me/201011620644"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-400 hover:text-green-400 transition-all duration-500"
          >
            <WhatsappIcon className="w-6 h-6" />
          </motion.a>
        </motion.div>

        {/* Right side - Copyright */}
        <motion.p
          initial="hidden"
          animate={state}
          variants={rightVariant}
          className="text-sm text-gray-400 font-light"
        >
          © 2026 {" "}
          <span className="text-teal-400 font-medium">Fady Refaat</span>. All
          rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;