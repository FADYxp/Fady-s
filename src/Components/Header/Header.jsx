import { useTheme } from "../../context/ThemeContext"; // تأكد لو فولدر context بالحرف الصغير أو الكبير حسب عندك

export default function SectionHeader({ title, subtitle }) {
  const { theme } = useTheme();
  const isOld = theme === "old";

  return (
    <div className={`section-header text-center mb-10 transition-all duration-500 ${isOld ? "font-serif" : "rotate-6"}`}>
      <h2
        className={`text-4xl md:text-5xl font-extrabold tracking-wide transition-all duration-500 ${
          isOld
            ? "text-amber-100/90 font-serif italic drop-shadow-[2px_2px_0px_rgba(120,53,15,0.8)] border-b-2 border-amber-800/40 pb-4 inline-block px-8 relative"
            : "blur-[1px] z-10 !font-sans text-shadow-2xs text-shadow-fuchsia-400/10 bg-gradient-to-r from-[#9a6ead] via-[#4a4e91] to-[#9a6ead] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(154,110,173,0.4)]"
        }`}
      >
        {isOld && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs tracking-widest text-amber-600 font-mono">✦ EST. 2026 ✦</span>}
        {title}
      </h2>

      {subtitle && (
        <p
          className={`section-header-subtitle mt-3 text-lg tracking-widest transition-colors duration-500 ${
            isOld
              ? "text-amber-700/80 font-serif font-medium uppercase text-sm tracking-[0.25em]"
              : "text-gray-500 italic"
          }`}
          aria-label={subtitle}
        >
          {Array.from(subtitle).map((character, index) => (
            <span
              key={`${character}-${index}`}
              className="section-header-subtitle-char"
              style={{ "--char-index": index }}
              aria-hidden="true"
            >
              {character === " " ? "\u00a0" : character}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}