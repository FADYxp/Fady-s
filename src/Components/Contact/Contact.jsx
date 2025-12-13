import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import SectionHeader from "../Header/Header";
import { FaWhatsapp, FaLinkedin,  FaGoogle } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_b9zavnp",
        "template_j3j3tuf",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "5l9gmwAXAJjYYVtn-"
      )
      .then(
        () => {
          toast.success("✅ Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          toast.error("❌ Failed to send message. Please try again.");
        }
      );
  };

  return (
    <>
      <Toaster position="top-center" />

      <section className="relative  flex items-center py-12 md:py-24 justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#13002b00]  to-black opacity-90 z-0" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 w-[90%] max-w-5xl">
          {/* Header */}
          <div className="w-full md:w-1/2 text-center pt-20 md:text-left">
            <SectionHeader
              title="Get In Touch 💬"
              subtitle="Let's connect directly!"
            />

            {/* 🔗 Direct Contact Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center  gap-6 mt-6 text-3xl"
            >
              {/* ✅ WhatsApp direct chat */}
              <motion.a
                href="https://wa.me/201011620644?text=Hello%20Fady!%20I%20found%20your%20portfolio%20and%20want%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-green-500 hover:text-green-300 transition-all duration-300 drop-shadow-[0_0_10px_#00ff9d]"
              >
                <FaWhatsapp />
              </motion.a>

              {/* ✅ Gmail compose link */}
              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ffady354@gmail.com&su=Hello%20Fady&body=Hi%20Fady!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-pink-400 hover:text-pink-300 transition-all duration-300 drop-shadow-[0_0_10px_#ff0099]"
              >
                <FaGoogle />
              </motion.a>

              {/* ✅ LinkedIn profile */}
              <motion.a
                href="https://linkedin.com/in/fady-refaat-9b5294343"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-blue-400 hover:text-blue-300 transition-all duration-300 drop-shadow-[0_0_10px_#61ffff]"
              >
                <FaLinkedin />
              </motion.a>
            </motion.div>
          </div>

          {/* 📬 Contact Form */}
          <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(82,39,255,0.4)] rounded-2xl p-8 text-center text-white outfit-font transition-all duration-700 hover:shadow-[#bc05ff75]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 bg-transparent border-b border-teal-400 focus:outline-none focus:border-pink-400 text-white placeholder-gray-300 transition-all duration-300"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 bg-transparent border-b border-teal-400 focus:outline-none focus:border-pink-400 text-white placeholder-gray-300 transition-all duration-300"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="p-3 bg-transparent border border-teal-600 rounded-md focus:outline-none focus:border-pink-600 text-white placeholder-gray-300 transition-all duration-300 min-h-[120px]"
                required
              ></textarea>
              <button
                type="submit"
className="mt-4 relative py-2 px-6 text-lg font-semibold backdrop-blur-md text-teal-300/70 
bg-gradient-to-r from-fuchsia-800/30 to-teal-700/30 rounded-lg 
transition-all ease-in-out duration-500 hover:scale-x-95   
cursor-pointer hover:[box-shadow:inset_0_0_12px_rgba(0,0,0,0.6)] "


              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
