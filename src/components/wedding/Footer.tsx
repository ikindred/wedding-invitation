import { BackgroundMusic } from "./BackgroundMusic";

type FooterProps = {
  coupleNames: string;
  musicSrc: string | null;
};

export function Footer({ coupleNames, musicSrc }: FooterProps) {
  return (
    <footer className="border-t border-border-soft bg-card/40 px-6 py-16 text-center">
      <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground">
        {coupleNames}
      </p>
      <p className="mt-4 max-w-md mx-auto text-sm leading-relaxed text-muted">
        Thank you for celebrating with us — your presence is the greatest gift.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <BackgroundMusic src={musicSrc} />
      </div>
      <p className="mt-10 text-xs text-muted/80">With love · {new Date().getFullYear()}</p>
    </footer>
  );
}
