import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({ children }) {
  const [loading, setLoading] = useState(true);

  const techStack = [
    "REACT", "NEXT.JS", "TS", "TAILWIND", "NODE", "DOCKER", "AWS", "GRAPHQL",
    "REDUX", "THREE.JS", "FIREBASE", "GIT", "PYTHON", "VITE", "SQL", "Framer"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
          >
            {/* Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,3px_100%]"></div>

            {/* Orbital Container */}
            <div className="relative flex items-center justify-center">
              
              {/* Central Core */}
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 2, ease: "backOut" }}
                className="w-32 h-32 rounded-full border-2 border-fuchsia-500 flex items-center justify-center bg-black/80 shadow-[0_0_40px_rgba(217,70,239,0.5)] z-20"
              >
                <span className="text-fuchsia-400 font-black text-2xl">FADY</span>
              </motion.div>

              {/* Orbiting Stickers */}
              {techStack.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ rotate: (360 / techStack.length) * i, opacity: 0 }}
                  animate={{ rotate: [(360 / techStack.length) * i, (360 / techStack.length) * i + 360], opacity: 1 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-full flex justify-center"
                >
                  <motion.div 
                    animate={{ rotate: -( (360 / techStack.length) * i + 360 ) }} // عكس دوران المدار عشان الكلام يفضل معدول
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="mt-[-20px] bg-black/60 border border-fuchsia-500/50 px-2 py-1 rounded text-[10px] text-fuchsia-200 backdrop-blur-md"
                  >
                    {tech}
                  </motion.div>
                </motion.div>
              ))}

              {/* Pulse Ring */}
              <motion.div 
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-40 h-40 rounded-full border border-fuchsia-500/20"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && children}
    </>
  );
}