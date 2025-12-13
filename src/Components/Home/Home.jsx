import React from "react";
import { motion } from "framer-motion";
import ProfileCard from "../ProfileCard";
import avatar from "./../../assets/photo.jpg";
import iconn from "./../../assets/code3.png";
import TextType from "../TextType";
import AboutSection from "../About/AboutBrief";
import Contact from "../Contact/Contact";
import MiniSkillsSection from "../Skills/Search";
import Services from "../Services/Services";
const LogoSlider = React.lazy(() => import("../LogoSlider/LogoSlider"));
const Projects = React.lazy(() => import("../Projects/Projects"));

function Home() {
  const x = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      {/* Hero Section */}

      <section className="overflow-hidden pt-10 md:p-0 m-auto h-screen flex items-center justify-center text-white">
        {/* Content */}
        <div className="flex flex-col md:flex-row items-center w-[100%] gap-7 z-10">
          {/* ✅ الصورة على الشمال (تفضل فوق في الموبايل) */}
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="w-full md:w-1/3 flex justify-center md:justify-end"
          >
            <ProfileCard
              name="Fady Refaat"
              title="Software Engineer | Front-end Developer"
              handle="fadyxp"
              behindGradient={true}
              status="Online"
              contactText="Contact Me"
              avatarUrl={avatar}
              mobileTiltSensitivity="5"
              showBehindGradient={true}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={true}
              onContactClick={() => x("contact")}
              grainUrl={iconn}
            />
          </motion.div>

          {/* ✅ الكلام على اليمين (يبقى تحت في الموبايل) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-1/2 flex flex-col group items-center md:items-start justify-start text-center md:text-left"
          >
            <h1 className="text-4xl rotate-6 lg:text-7xl text-white leading-tight outfit-font">
              <span className="heart text-teal-600 font-bold text-shadow-lg opacity-100 transition-all duration-700 group-hover:blur-[1px] group-hover:opacity-100">
                Think. Build. Impress.
              </span>
              <br />
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
              showCursor={true}
              className="text-xl md:text-2xl lg:text-4xl blur-[1px] md:blur-[2px] group-hover:blur-[3px] mt-2 ms-4 transition-all duration-800"
              cursorClassName="text-teal-100"
              textColors={["pink", "#61ffff"]}
              cursorCharacter="|"
            />

            <p className="mt-4 outfit-font blur-[.6px] text-sm md:text-lg text-white max-w-xl">
              I’m Fady, <br /> A Frontend Developer shaping clean, modern, and
              interactive experiences.
            </p>

            {/* ✅ Buttons Section */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
              className="flex flex-row gap-3 m-auto mt-6 md:mt-8 w-full  justify-center md:justify-start"
            >
              {/* Download CV Button */}
              <a
                href="/Fady_Refaat-CV.pdf"
                download
                className="relative overflow-hidden group w-[50%] text-center 
             px-5 py-2 rounded-xl text-xs md:text-sm font-medium
             text-teal-300 border border-teal-400/40
             backdrop-blur-md bg-gradient-to-r from-white/5 via-white/10 to-white/5
             shadow-[0_0_15px_rgba(45,255,255,0.2)]
             transition-all duration-500 ease-out"
              >
                {/* 💾 أيقونة التحميل */}
                <span className="inline-block mr-2 group-hover:animate-bounce">
                  💾
                </span>
                Download CV
                {/* ✨ إضاءة عند الهوفر */}
                <span className="absolute inset-0 bg-gradient-to-r from-teal-400/20 via-pink-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
                {/* 🔥 خط متحرك عند الهوفر */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-400 to-teal-400 group-hover:w-full transition-all duration-500"></span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Content Section */}

      <div id="about" className="  ">
        <AboutSection />
        <LogoSlider />
      </div>

      <div id="projects">
        <Projects />
      </div>
      <div id="skills">
        <MiniSkillsSection />
      </div>
      <Services />
      <div id="contact" className="">
        <Contact />
      </div>
    </>
  );
}

export default Home;
