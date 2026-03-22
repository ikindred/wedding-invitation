type SectionTitleProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ id, eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p
          id={`${id}-eyebrow`}
          className="font-[family-name:var(--font-display)] text-sm font-medium uppercase tracking-[0.35em] text-muted"
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </header>
  );
}
