const links = [
  { href: "#ceremony", label: "Ceremony" },
  { href: "#reception", label: "Reception" },
  { href: "#dress-code", label: "Attire" },
  { href: "#entourage", label: "Entourage" },
  { href: "#rsvp", label: "RSVP" },
];

type SiteNavProps = {
  monogram: string;
};

export function SiteNav({ monogram }: SiteNavProps) {
  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-md"
      aria-label="Page sections"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-3 py-3 sm:px-6">
        <a
          href="#hero"
          className="shrink-0 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-foreground sm:text-lg"
        >
          {monogram}
        </a>
        <div className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex flex-nowrap justify-end gap-1 pr-1 sm:gap-2">
            {links.map((l) => (
              <li key={l.href} className="shrink-0">
                <a
                  href={l.href}
                  className="block rounded-full px-2.5 py-1.5 text-xs font-medium text-muted transition hover:bg-accent-soft/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3 sm:text-sm"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
