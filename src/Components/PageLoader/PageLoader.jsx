import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PageLoader({ children }) {
  const [loading, setLoading] = useState(true);
  const [glitch, setGlitch] = useState(false);
  // حالة جديدة للتحكم في مرحلة حركة حرف F
  const [f_position, setF_position] = useState('random'); // random -> final

  useEffect(() => {
    // 1. يبدأ الـ Glitch بعد ثانية
    const startGlitch = setTimeout(() => {
      setGlitch(true);
    }, 1000);

    // 2. بعد 2.5 ثانية، يبدأ حرف F في الاستقرار في مكانه
    const stabilizeF = setTimeout(() => {
      setF_position('final');
    }, 2500);

    // 3. يُزال اللودر بعد 4 ثواني
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(startGlitch);
      clearTimeout(stabilizeF);
    };
  }, []);

  // تعريف حركات حرف F (تم تعديل الـ opacity في random و final لضمان ظهوره)
  const f_variants = {
    random: { 
      // حركة عشوائية سريعة
      x: [0, 100, -50, 70, -20, 0],
      y: [0, -80, 40, -10, 60, 0],
      rotate: [0, 360, -180, 0],
      opacity: [0, 1, 1, 1, 1, 1], // يبدأ بـ 0 ويصبح 1 ويظل 1
      transition: { duration: 2.5, ease: "easeInOut" }
    },
    final: {
      // استقرار في الموضع النهائي (0, 0) بالنسبة للـ "aDY's"
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1, // يظل مرئيًا
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };


  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
        
        <div className="absolute inset-0 bg-black opacity-95"></div>

        {/* ****** الإضافة الجديدة: الموجة العريضة المتحركة (Wide Scanning Wave) ****** */}
        <motion.div
          className="absolute w-[200vw] h-60 bg-gradient-to-r from-transparent via-fuchsia-800/20 to-transparent blur-xl"
          style={{ top: '30%', transform: 'rotate(5deg)' }}
          animate={{ x: ['-100%', '100%'] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        {/* ************************************************************************* */}

        {/* 1. تأثير أشعة الليزر في الخلفية (Background Laser Beams) */}
        {/* الشعاع الأول: يمر قطريًا */}
        <motion.div
          className="absolute w-full h-1 bg-fuchsia-600/10 transform origin-left"
          style={{ transform: 'rotate(20deg)' }}
          animate={{ x: ['-100%', '100%'] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* الشعاع الثاني: يمر قطريًا بالاتجاه المعاكس */}
        <motion.div
          className="absolute w-full h-1 bg-fuchsia-700/10 transform origin-right"
          style={{ transform: 'rotate(-40deg)', top: '50%' }}
          animate={{ x: ['100%', '-100%'] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />

        {/* الشعاع الثالث: شعاع رأسي خفيف */}
        <motion.div
          className="absolute w-1 h-full bg-fuchsia-800/15"
          animate={{ y: ['-100%', '100%'] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
        />


        <motion.div
          className="z-20 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          
          {/* ****** اللوجو الرئيسي (يحتوي F و aDY's) - هنا يتم تطبيق Glitch 3D ****** */}
          <motion.div
            className="flex items-center gap-3 relative" // وضع نسبي للحاوية
            style={{ 
                // إضافة perspective لتمكين حركة الـ 3D
                perspective: '1000px', 
                textShadow: '0 0 10px rgba(255, 0, 255, 0.9), 0 0 30px rgba(255, 0, 255, 0.6)' 
            }}
            animate={{
              // Glitch 3D (تأثير أقوى في البداية)
              x: glitch ? [0, 3, -3, 0] : 0, // نطاق حركة خفيف
              y: glitch ? [0, -2, 2, 0] : 0, // نطاق حركة خفيف
              z: glitch ? [0, 5, -5, 0] : 0, // حركة في العمق
              rotateX: glitch ? [0, 5, -5, 0] : 0, // دوران على محور X
              rotateY: glitch ? [0, 5, -5, 0] : 0, // دوران على محور Y
              skewX: glitch ? [0, 2, -2, 0] : 0, 
              filter: glitch ? [ 'hue-rotate(0deg)', 'hue-rotate(360deg)', 'hue-rotate(0deg)' ] : 'hue-rotate(0deg)'
            }}
            transition={{ 
              // حركات Glitch سريعة جداً وخفيفة
              x: { duration: 0.05, repeat: Infinity, repeatType: "mirror" },
              y: { duration: 0.07, repeat: Infinity, repeatType: "mirror" },
              z: { duration: 0.06, repeat: Infinity, repeatType: "mirror" },
              rotateX: { duration: 0.09, repeat: Infinity, repeatType: "mirror" },
              rotateY: { duration: 0.08, repeat: Infinity, repeatType: "mirror" },
              skewX: { duration: 0.05, repeat: Infinity, repeatType: "mirror" },
              filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror" },
            }}
          >
            
            {/* ****** حرف F المنفصل بحركته العشوائية ****** */}
            <motion.div
              className="w-[60px] md:w-[80px] h-[60px] rounded-full flex items-center justify-center bg-fuchsia-800/20 ring-2 ring-fuchsia-400/80 absolute" 
              initial={{ x: -200, y: 150, opacity: 0 }} // يبدأ من خارج الشاشة
              variants={f_variants}
              animate={f_position} // يتبدل بين 'random' و 'final'
            >
              <span className="text-fuchsia-300 font-extrabold text-5xl">
                F
              </span>
            </motion.div>
            
            {/* إضافة مسافة للحرف F لكي لا يطغى على aDY's في الوضع النهائي */}
            <div className="w-[60px] md:w-[80px] h-[60px]"></div>

            {/* ****** باقي الاسم ****** */}
            <div className="text-fuchsia-300 text-6xl font-extrabold tracking-tighter">
              aDY's
            </div>
          </motion.div>
          {/* ****** نهاية اللوجو ****** */}


          {/* 2. تأثير الماسح الضوئي (Scanning Beam) - يمر على النص */}
          <motion.div
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-300/80 to-transparent"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
            animate={{ y: ['-200%', '200%'] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />

          <motion.p 
            className="mt-4 text-xl font-mono text-fuchsia-500 tracking-widest"
            animate={{ opacity: [1, 0.3, 1] }} 
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
           [ DATA DECODED: EXPLORE THE NEXT LEVEL ]
          </motion.p>

        </motion.div>
      </div> 
    );
  }

  return <>{children}</>;
}