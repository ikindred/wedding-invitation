type Swatch = { name: string; hex: string };

type ColorPaletteProps = {
  colors: Swatch[];
};

export function ColorPalette({ colors }: ColorPaletteProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
      {colors.map((c) => (
        <li key={c.name} className="flex flex-col items-center gap-2">
          <span
            className="h-14 w-14 rounded-full border border-border-soft shadow-[var(--shadow-soft)] sm:h-16 sm:w-16"
            style={{ backgroundColor: c.hex }}
            aria-label={`${c.name} color ${c.hex}`}
          />
          <span className="max-w-[6rem] text-center text-xs font-medium text-muted">{c.name}</span>
        </li>
      ))}
    </ul>
  );
}
