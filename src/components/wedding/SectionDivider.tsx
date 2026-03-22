export function SectionDivider() {
  return (
    <div
      className="pointer-events-none flex justify-center py-6 sm:py-10"
      aria-hidden
    >
      <svg
        className="h-6 w-24 text-accent/40"
        viewBox="0 0 120 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12h112"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="60" cy="12" r="3" fill="currentColor" opacity="0.35" />
      </svg>
    </div>
  );
}
