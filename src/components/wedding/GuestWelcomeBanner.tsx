type GuestWelcomeBannerProps = {
  guestName: string | null;
};

export function GuestWelcomeBanner({ guestName }: GuestWelcomeBannerProps) {
  if (!guestName) return null;
  return (
    <div className="border-b border-border-soft bg-accent-soft/50 px-6 py-3 text-center text-sm text-foreground">
      <p>
        <span className="font-medium">Welcome, </span>
        {guestName}
      </p>
    </div>
  );
}
