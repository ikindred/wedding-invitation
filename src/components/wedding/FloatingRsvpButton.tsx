export function FloatingRsvpButton() {
  return (
    <a
      href="#rsvp"
      className="fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full border border-border-soft bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-[var(--shadow-soft)] transition hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:hidden"
    >
      RSVP
    </a>
  );
}
