"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundMusicProps = {
  src: string | null;
};

export function BackgroundMusic({ src }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;
    const stored = typeof window !== "undefined" ? localStorage.getItem("wedding-music") : null;
    if (stored === "on" && audioRef.current) {
      void audioRef.current.play().catch(() => {});
    }
  }, [src]);

  if (!src) return null;

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      localStorage.setItem("wedding-music", "off");
    } else {
      void el.play();
      localStorage.setItem("wedding-music", "on");
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        className="rounded-full border border-border-soft bg-card px-4 py-2 text-xs font-medium uppercase tracking-widest text-muted transition hover:border-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-pressed={playing}
        aria-label={playing ? "Pause background music" : "Play background music"}
      >
        {playing ? "Music on" : "Music off"}
      </button>
    </>
  );
}
