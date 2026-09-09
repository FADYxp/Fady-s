export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header text-center mb-10 rotate-6">
      <h2
        className="text-4xl md:text-5xl blur-[1px] z-10 !font-sans text-shadow-2xs text-shadow-fuchsia-400/10 font-extrabold bg-gradient-to-r from-[#9a6ead] via-[#4a4e91] to-[#9a6ead]
        bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(154,110,173,0.4)]"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="section-header-subtitle mt-2 text-gray-500 text-lg tracking-wide italic" aria-label={subtitle}>
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
