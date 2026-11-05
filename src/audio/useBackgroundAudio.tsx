import { useEffect, useRef, useState } from 'react';

export function useBackgroundAudio(src: string = '/sounds/bg.mp3', targetVol = 0.35) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('bg-audio-enabled');
    return saved === null ? false : saved === 'true';
  });

  useEffect(() => {
    if (!enabled) {
      audioRef.current?.pause();
      audioRef.current = null;
      return;
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = targetVol;
    audioRef.current = audio;

    audio.play().catch(() => {
      setEnabled(false);
      localStorage.setItem('bg-audio-enabled', 'false');
    });

    return () => {
      audio.pause();
      audio.src = '';
      if (audioRef.current === audio) audioRef.current = null;
    };
  }, [src, enabled, targetVol]);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('bg-audio-enabled', String(next));
  };

  return { enabled, toggle };
}
