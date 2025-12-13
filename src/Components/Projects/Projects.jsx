import React, { useEffect, useRef } from "react";
import ElectricBorder from "../ElectricBorder";
import { Link } from "react-router-dom";
import SectionHeader from "../Header/Header";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    gsap.fromTo(
      section.querySelectorAll(".project-card"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const liveDemos = [
    {
      header: "Fresh-Cart-Ecommerce",
      title: "Ecommerce Website",
      Link: "https://ecommerce-iota-flame.vercel.app/",
      img: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
    },
    {
      header: "Exam-App",
      title: "Exam App",
      Link: "https://exam-app-beige.vercel.app/",
      img: "https://cdn-icons-png.flaticon.com/512/3398/3398468.png",
    },
    {
      header: "Weather",
      title: "Weather App",
      Link: "https://weather-psi-mocha-98.vercel.app/",
      img: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
    },
    {
      header: "Single-Page-App",
      title: "Single Page Application",
      Link: "https://frame-work-seven-mauve.vercel.app/",
      img: "https://cdn-icons-png.flaticon.com/512/906/906324.png",
    },

    {
      header: "Registration-System",
      title: "Registration System",
      Link: "https://fadyxp.github.io/LogIn-system/",
      img: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
    },

    {
      header: "Book-Marker",
      title: "Bookmark Manager",
      Link: "https://fadyxp.github.io/A/",
      img: "https://cdn-icons-png.flaticon.com/512/2965/2965879.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20 md:w-[80%] m-auto px-6 md:px-12  bg-fixed text-white relative overflow-hidden transition-transform duration-700 ease-in-out"
    >
      <SectionHeader title={"Projects"} />
      <div className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {liveDemos.map((project, idx) => (
          <ElectricBorder
            key={idx}
            color="#6E64C3"
            speed={0.4}
            chaos={0.7}
            thickness={3}
            style={{ borderRadius: 20 }}
          >
            <div className="project-card hover:backdrop-blur-[2px] hover:bg-teal-950/40 hover:drop-shadow-2xl hover:shadow-purple-800 backdrop-blur-sm  shadow-lg rounded-2xl p-6 flex flex-col justify-between h-full   transition-all duration-800 ">
              <div className="flex flex-col items-center text-center gap-3">
                <img
                  src={project.img}
                  alt={project.header}
                  className="w-20 h-20 object-contain mb-3 drop-shadow-[0_0_12px_#6E64C3]"
                />
                <h2 className="text-xl font-semibold">{project.header}</h2>
                <p className="text-gray-300 text-sm">{project.title}</p>
              </div>

              <div className="mt-6 mx-auto w-[20%] text-center">
                <Link
                  to={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button
                    className="px-5 py-2 rounded-lg w-full font-medium text-white 
                 bg-gradient-to-t from-fuchsia-500/20 to-teal-400/20 
                 backdrop-blur-sm hover:translate-y-1 hover:backdrop-blur-md
                 transition-all duration-500 cursor-pointer"
                  >
                    Visit
                  </button>
                </Link>
              </div>
            </div>
          </ElectricBorder>
        ))}
      </div>
    </section>
  );
}

export default Projects;
