import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaGoogle } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
            initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    className="w-full py-8   text-white text-center backdrop-blur-[5px] bg-gradient-to-b from-[#000000a6] via-[#18021ca0] to-[#1a003861] ">
        
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row justify-center items-center gap-12 w-[90%] mx-auto"
      >
        {/* Left side - Contact Info */}
        <div className="flex flex-col items-center md:items-start gap-2 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-teal-400" />
            <span>Alexandria, Egypt</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-pink-400" />
            <a
              href="mailto:ffady354@gmail.com"
              className="hover:text-white transition-all duration-300"
            >
              ffady354@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaWhatsapp className="text-green-400" />
            <a
              href="https://wa.me/201011620644"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all duration-300"
            >
              Ask for offers
            </a>
          </div>
        </div>

        {/* Middle - Social Icons */}
        <div className="flex gap-6 text-2xl">
          <motion.a
            href="https://github.com/fadyxp"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-400 hover:text-white transition-all duration-500"
          >
            <FaGithub />
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/fady-refaat-9b5294343"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-400 hover:text-[#0A66C2] transition-all duration-500"
          >
            <FaLinkedin />
          </motion.a>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ffady354@gmail.com&su=Hello%20Fady&body=Hi%20Fady!"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-400 hover:text-pink-400 transition-all duration-500"
          >
            <FaGoogle />
          </motion.a>

          <motion.a
            href="https://wa.me/201011620644"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-400 hover:text-green-400 transition-all duration-500"
          >
            <FaWhatsapp />
          </motion.a>
        </div>

        {/* Right side - Copyright */}
        <p className="text-sm text-gray-400 font-light">
          © {new Date().getFullYear()}{" "}
          <span className="text-teal-400 font-medium">Fady Refaat</span>. All rights reserved.
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
