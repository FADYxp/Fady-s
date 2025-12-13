import React from 'react'
import LogoLoop from '../LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss , SiRedux , SiJavascript , SiLinkedin , SiGit , SiGithub , SiCss3 , SiHtml5} from 'react-icons/si';

function LogoSlider() {

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com/fadyxp" },
  { node: <SiLinkedin />, title: "LinkedIn", href: "https://www.linkedin.com/in/fady-refaat-9b5294343" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com/" },
];


// Alternative with image sources
// const imageLogos = [
//   { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
//   { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
//   { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
// ];

  return (
    <>
    <div className='text-[#6d1d9ebb] pb-20 pt-32 relative  overflow-hidden' >
      <LogoLoop
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={90}
        gap={60}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#511d9e00"
        ariaLabel="Technology partners"
        className=""
      />
    </div>
    </>
  )
}

export default LogoSlider