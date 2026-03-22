"use client";

import { useEffect, useState } from "react";

type OpeningSplashProps = {
  coupleNames: string;
};

export function OpeningSplash({ coupleNames }: OpeningSplashProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const t = window.setTimeout(
      () => setVisible(false),
      mq.matches ? 0 : 1800,
    );
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-hero-in items-center justify-center bg-background"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome"
    >
      <div className="px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.4em] text-muted">Welcome</p>
        <p className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-foreground sm:text-4xl">
          {coupleNames}
        </p>
      </div>
    </div>
  );
}
