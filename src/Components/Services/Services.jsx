import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Palette, Rocket, Cpu, Wrench, Smartphone, Shield, Cloud } from "lucide-react";
import SectionHeader from "../Header/Header";

const services = [
  {
    icon: <Code2 size={36} className="text-teal-300" />,
    title: "Frontend Development",
    desc: "Building responsive, modern, and interactive web interfaces using React, Next.js, and Tailwind CSS.",
    details:
      "I specialize in developing dynamic, high-performance user interfaces with smooth animations and scalable code. I focus on clean architecture and modular design to ensure long-term maintainability.",
  },
  {
    icon: <Palette size={36} className="text-pink-300" />,
    title: "UI / UX Implementation",
    desc: "Transforming beautiful designs into pixel-perfect interfaces with smooth animations and usability focus.",
    details:
      "I take Figma or Adobe XD designs and bring them to life with precision — ensuring alignment, spacing, color consistency, and user flow remain flawless.",
  },
  {
    icon: <Rocket size={36} className="text-fuchsia-400" />,
    title: "Performance Optimization",
    desc: "Improving loading speed, SEO, and runtime efficiency for a seamless user experience.",
    details:
      "From code-splitting to image optimization and lazy-loading, I apply best practices to make websites load faster and rank better.",
  },
  {
    icon: <Cpu size={36} className="text-teal-400" />,
    title: "API Integration",
    desc: "Connecting frontend applications with RESTful APIs and dynamic backend data.",
    details:
      "I integrate complex APIs securely, handle loading states gracefully, and ensure smooth data fetching with error handling and caching.",
  },
  {
    icon: <Wrench size={36} className="text-amber-300" />,
    title: "Maintenance & Support",
    desc: "Ensuring long-term stability and updates for your web apps.",
    details:
      "I help monitor performance, apply security patches, and continuously improve the UX with feedback-driven updates.",
  },
  {
    icon: <Smartphone size={36} className="text-blue-300" />,
    title: "Responsive Design",
    desc: "Perfect look and performance across all screen sizes.",
    details:
      "I design mobile-first layouts and ensure your site looks amazing and functions seamlessly on phones, tablets, and desktops.",
  },
  {
    icon: <Shield size={36} className="text-green-300" />,
    title: "Web Security",
    desc: "Protecting your website from vulnerabilities and unsafe practices.",
    details:
      "I apply security measures like input sanitization, HTTPS enforcement, and CORS handling to keep your web app safe.",
  },
  {
    icon: <Cloud size={36} className="text-cyan-300" />,
    title: "Hosting & Deployment",
    desc: "Deploying apps efficiently with modern CI/CD pipelines.",
    details:
      "I handle deployment using Vercel, Netlify, or custom servers, ensuring zero downtime and easy scalability.",
  },
];

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section
      id="services"
      className="relative  py-12 md:py-20 px-6 md:px-10 text-gray-300 overflow-hidden"
    >
      
      {/* ✨ Animated Background */}
 

      {/* Section Header */}
  <SectionHeader title={"Services"}/>

      {/* Services Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10"
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="relative group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm 
                       shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]
                       hover:border-fuchsia-400/40 transition-all duration-500"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-2"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_5px_#a855f7]">
                {service.title}
              </h3>
              <p className="text-white/70 text-sm">{service.desc}</p>

              {/* Expand Button */}
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === i ? null : i)
                }
                className="mt-3 px-3 py-1.5 text-xs font-semibold text-teal-300 border border-teal-400/40 rounded-md hover:bg-teal-400/10 transition-all duration-300"
              >
                {expandedIndex === i ? "Show Less" : "Learn More"}
              </button>

              {/* Expanded Details */}
<AnimatePresence>
  {expandedIndex === i && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 bg-[#0b0118]/95 backdrop-blur-2xl flex items-center justify-center text-white/80 text-sm p-4 rounded-2xl border border-fuchsia-400/30 shadow-lg z-20"
    >
      <div className="max-w-xs text-center">
        <p>{service.details}</p>
        <button
          onClick={() => setExpandedIndex(null)}
          className="mt-4 px-3 py-1 text-xs font-semibold text-teal-300 border border-teal-400/40 rounded-md hover:bg-teal-400/10 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
