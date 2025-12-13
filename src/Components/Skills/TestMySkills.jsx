import { useState } from "react";
import skillsData from "./skillsData";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import SectionHeader from "../Header/Header";
import { PlusCircle, ShoppingBag } from "lucide-react";

const TestMySkills = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredSkills = skillsData.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (skill) => {
    if (!cart.find((item) => item.name === skill.name)) {
      setCart([...cart, skill]);
    }
  };

  const handleRemoveFromCart = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white outfit-font py-40">
        {/* الخلفية */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#13002b] via-[#1a0038] to-black opacity-90 z-0" />
        <div className="absolute inset-0 backdrop-blur-[3px] z-0" />

        <div className="relative z-10 w-full max-w-5xl">
          <SectionHeader
            title="Techniques & Skills"
            subtitle="Curious to see what I can do? Pick the skills you need, and let's build something amazing together!"
          />

          {/* البحث */}
          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="Search a skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md p-3 bg-white/10 text-white rounded-xl border border-white/20 
              placeholder-gray-400 focus:outline-none focus:border-pink-400 
              backdrop-blur-md transition-all duration-300 
              shadow-[0_0_15px_rgba(97,255,255,0.3)] text-center"
            />
          </div>

          {/* الكروت */}
          <motion.div
            layout
            className="grid grid-cols-3  md:grid-cols-4 gap-6 justify-items-center"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative bg-white/10 border border-white/20 rounded-2xl p-5 text-center 
                w-[140px] sm:w-[160px] md:w-[180px] hover:scale-105 hover:border-teal-400
                hover:shadow-[0_0_25px_rgba(97,255,255,0.5)] transition-all duration-300 
                backdrop-blur-sm"
              >
                <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedSkill(skill)}>
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-12 h-12 mb-3 drop-shadow-[0_0_8px_#61ffff]"
                  />
                  <h3 className="text-lg font-semibold text-teal-200 mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-gray-300 leading-tight line-clamp-2">
                    {skill.info.length > 60
                      ? skill.info.slice(0, 60) + "..."
                      : skill.info}
                  </p>
                </div>

                {/* زر إضافة للـ Cart */}
                <button
                  onClick={() => handleAddToCart(skill)}
                  className="absolute top-3 right-3 bg-fuchsia-600/20 cursor-crosshair hover:bg-teal-200/30 p-2 rounded-full text-white transition-all"
                  title="Add to list"
                >
                  <PlusCircle size={15} />
                </button>
              </motion.div>
            ))}
          </motion.div>

          {filteredSkills.length === 0 && (
            <p className="text-center mt-10 text-gray-400 text-lg">
              😅 No skill found with that name!
            </p>
          )}
        </div>

        {/* مودال التفاصيل */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                className="bg-[#1a0038] border border-white/20 rounded-2xl p-8 text-center text-white max-w-sm w-full relative shadow-[0_0_30px_rgba(97,255,255,0.5)]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-3 right-4 text-gray-400 hover:text-pink-400 text-xl"
                  onClick={() => setSelectedSkill(null)}
                >
                  ✕
                </button>
                <img
                  src={selectedSkill.icon}
                  alt={selectedSkill.name}
                  className="w-16 h-16 mx-auto mb-4 drop-shadow-[0_0_10px_#61ffff]"
                />
                <h3 className="text-2xl font-bold text-teal-300 mb-2">
                  {selectedSkill.name}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedSkill.info}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* أيقونة الـ Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-fuchsia-900 hover:bg-fuchsia-600 p-4 rounded-full shadow-lg z-50 transition"
          title="Open Selected Skills"
        >
          <ShoppingBag size={26} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-teal-400 text-black text-xs font-bold rounded-full px-1.5">
              {cart.length}
            </span>
          )}
        </button>

        {/* مودال الكارت */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
            >
              <motion.div
                className="bg-[#1a0038] border border-white/20 rounded-2xl p-8 text-white w-[90%] max-w-md relative"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-3 right-4 text-gray-400 hover:text-pink-400 text-xl"
                  onClick={() => setIsCartOpen(false)}
                >
                  ✕
                </button>
                <h3 className="text-2xl font-bold text-teal-300 mb-4">
                  Your Selected Skills
                </h3>
                {cart.length === 0 ? (
                  <p className="text-gray-400">No skills added yet!</p>
                ) : (
                  <ul className="space-y-3">
                    {cart.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between bg-white/10 border border-white/20 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-8 h-8 drop-shadow-[0_0_6px_#61ffff]"
                          />
                          <span className="font-medium text-teal-200">{item.name}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.name)}
                          className="text-sm text-pink-400 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default TestMySkills;
