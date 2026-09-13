import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isModern = theme === "modern";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isModern ? "old" : "modern"} theme`}
      aria-pressed={isModern}
      onClick={() => setTheme(isModern ? "old" : "modern")}
      className={`theme-toggle ml-auto flex h-9 w-28 items-center justify-center gap-2 rounded-lg border text-[10px] uppercase transition-all duration-300 ${
        isModern
          ? "border-cyan-500/30 bg-slate-900/80 text-cyan-400 font-mono tracking-widest shadow-[0_0_12px_rgba(6,182,212,0.15)] hover:border-cyan-400 hover:text-cyan-300"
          : "border-[#d4af37] bg-gradient-to-r from-[#2b0a0d] via-[#4a121a] to-[#2b0a0d] text-[#f3e5ab] font-serif tracking-wider shadow-[0_0_8px_rgba(212,175,55,0.25)] hover:border-[#f3e5ab] hover:shadow-[0_0_12px_rgba(212,175,55,0.4)]"
      }`}
    >
      {/* SVG Icon */}
      {isModern ? (
        // Modern Minimalist Spark Icon
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      ) : (
        // Royal Crown SVG Icon
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V18H19V19Z" />
        </svg>
      )}

      {/* Label */}
      <span>{isModern ? "Modern" : "Royal"}</span>
    </button>
  );
}