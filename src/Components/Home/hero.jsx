import { motion } from "framer-motion";
import ProfileCard from "../ProfileCard";
import avatar from "../../assets/photo.jpg";
import iconn from "../../assets/code3.png";
import TextType from "../TextType";

export default function Hero({ onNavigate }) {
  return (
    <section className="flex h-screen items-center justify-center overflow-hidden pt-10 text-white md:p-0">
      <div className="z-10 flex w-full flex-col items-center gap-7 md:flex-row">
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="flex w-full justify-center md:w-1/3 md:justify-end"
        >
          <ProfileCard
            name="Fady Refaat"
            title="Software Engineer | Front-end Developer"
            handle="fadyxp"
            behindGradient
            status="Online"
            contactText="Contact Me"
            avatarUrl={avatar}
            mobileTiltSensitivity="5"
            showBehindGradient
            showUserInfo
            enableTilt
            enableMobileTilt
            onContactClick={() => onNavigate("contact")}
            grainUrl={iconn}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="group flex w-full flex-col items-center justify-start text-center md:w-1/2 md:items-start md:text-left"
        >
          <h1 className="outfit-font rotate-6 text-4xl leading-tight text-white lg:text-7xl">
            <span className="heart font-bold text-teal-600 text-shadow-lg transition-all duration-700 group-hover:blur-[1px]">
              Think. Build. Impress.
            </span>
          </h1>
          <TextType
            text={[
              "Front-end Developer",
              "Building Clean",
              "User-Friendly Web Solutions",
              "Happy<coding/>!",
              "Web-Developer",
              "One Pixel at a Time",
            ]}
            typingSpeed={60}
            pauseDuration={1500}
            showCursor
            className="ms-4 mt-2 text-xl transition-all duration-800 blur-[1px] group-hover:blur-[3px] md:text-2xl md:blur-[2px] lg:text-4xl"
            cursorClassName="text-teal-100"
            textColors={["pink", "#61ffff"]}
            cursorCharacter="|"
          />
          <p className="outfit-font mt-4 max-w-xl text-sm text-white blur-[.6px] md:text-lg">
            I&apos;m Fady, <br /> A Frontend Developer shaping clean, modern,
            and interactive experiences.
          </p>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
            className="m-auto mt-6 flex w-full justify-center gap-3 md:mt-8 md:justify-start"
          >
            <a
              href="/Fady_Refaat-CV.pdf"
              download
              className="group relative w-1/2 overflow-hidden rounded-xl border border-teal-400/40 bg-white/5 px-5 py-2 text-center text-xs font-medium text-teal-300 shadow-[0_0_15px_rgba(45,255,255,0.2)] backdrop-blur-md transition-all duration-500 md:text-sm"
            >
              Download CV
              <span className="absolute inset-0 bg-gradient-to-r from-teal-400/20 via-pink-400/20 to-teal-400/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-pink-400 to-teal-400 transition-all duration-500 group-hover:w-full" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
