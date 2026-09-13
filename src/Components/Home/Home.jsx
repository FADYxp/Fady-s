import React, { Suspense } from "react";
import Hero from "./hero";
import HeroOld from "./heroOld";
import Contact from "../Contact/Contact";
import ContactOld from "../Contact/ContactOld";
import Footer from "../Footer/Footer";
import FooterOld from "../Footer/FooterOld";
import PageLoader from "../PageLoader/PageLoader";
import StackSection from "../StackSection";
import { useTheme } from "../../context/ThemeContext";
const Projects = React.lazy(() => import("../Projects/Projects"));
const ProjectsOld = React.lazy(() => import("../Projects/ProjectsOld"));
const AboutSection = React.lazy(() => import("../About/AboutBrief"));
const ModernAbout = React.lazy(() => import("../About/AboutModern"));
const Skills = React.lazy(() => import("../Skills/Skills"));
const SkillsOld = React.lazy(() => import("../Skills/SkillsOld"));
const Services = React.lazy(() => import("../Services/Services"));
const ServicesOld = React.lazy(() => import("../Services/ServicesOld"));

function ContactSection({ theme, isActive }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col">
        {theme === "old" ? <ContactOld /> : <Contact />}
      </div>
      <div className="relative z-20 shrink-0">
        {theme === "old" ? <FooterOld isActive={isActive}/> : <Footer isActive={isActive} />}
      </div>
    </div>
  );
}

function Home() {
  const { theme } = useTheme();
  const x = (id) => {
    const sectionIndex = ["home", "about", "projects", "skills", "services", "contact"].indexOf(id);
    if (sectionIndex < 0) return;
    window.scrollTo({ top: sectionIndex * 1.15 * window.innerHeight, behavior: "smooth" });
  };
  return (
    <PageLoader>
      <>
        <StackSection
          sections={[
            {
              id: "home",
              name: "Hero",
              content: theme === "modern" ? <Hero onNavigate={x} /> : <HeroOld onNavigate={x} />,
            },
            {
              id: "about",
              name: "About",
              content: (
                <Suspense fallback={<div className="h-screen" />}>
                    {theme === "modern" ? <ModernAbout /> : <AboutSection />}
                </Suspense>
              ),
            },
            {
              id: "projects",
              name: "Projects",
              content: (
                <Suspense fallback={<div className="h-screen" />}>
                  {theme === "old" ? <ProjectsOld /> : <Projects />}
                </Suspense>
              ),
            },
            {
              id: "skills",
              name: "Skills",
              content: (
                <Suspense fallback={<div className="h-screen" />}>
                  {theme === "old" ? <SkillsOld /> : <Skills />}
                </Suspense>
              ),
            },
            {
              id: "services",
              name: "Expertise",
              content: (
                <Suspense fallback={<div className="h-screen" />}>
                  {theme === "old" ? <ServicesOld /> : <Services />}
                </Suspense>
              ),
            },
            {
              id: "contact",
              name: "Contact",
              content: <ContactSection theme={theme} isActive={true}/>,
            },
          ]}
        />
      </>
    </PageLoader>
  );
}

export default Home;
