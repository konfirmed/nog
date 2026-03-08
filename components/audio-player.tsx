"use client";

import { useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  label?: string;
  className?: string;
}

export function AudioPlayer({ src, label, className = "" }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const toggle = () => {
    if (!audioRef.current || error) return;
    if (playing) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => setError(true));
    }
  };

  if (error) return null;

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onError={() => setError(true)}
      />
      <button
        type="button"
        onClick={toggle}
        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={playing ? "Stop pronunciation" : "Play pronunciation"}
        title={label || "Listen to pronunciation"}
      >
        {playing ? (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        <span>Listen</span>
      </button>
    </span>
  );
}
