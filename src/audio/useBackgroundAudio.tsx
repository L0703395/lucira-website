import { useEffect, useRef, useState } from 'react';

export function useBackgroundAudio(src: string = '/sounds/bg.mp3', targetVol = 0.35) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('bg-audio-enabled');
    return saved ? JSON.parse(saved) : true; // default ON
  });

  useEffect(() => {
    const a = new Audio(src);
    a.loop = true;
    a.muted = true; // allows autoplay
    a.volume = 0;   // we’ll fade to target
    audioRef.current = a;

    a.play().catch(() => void 0);

    const unmuteAndFadeIn = () => {
      if (!audioRef.current || !enabled) return;
      audioRef.current.muted = false;
      fadeTo(audioRef.current, targetVol, 800);
      removeListeners();
    };

    const addListeners = () => {
      window.addEventListener('pointerdown', unmuteAndFadeIn, { once: true, capture: true });
      window.addEventListener('keydown',      unmuteAndFadeIn, { once: true, capture: true });
      window.addEventListener('scroll',       unmuteAndFadeIn, { once: true, capture: true });
    };
    const removeListeners = () => {
      window.removeEventListener('pointerdown', unmuteAndFadeIn, true);
      window.removeEventListener('keydown',      unmuteAndFadeIn, true);
      window.removeEventListener('scroll',       unmuteAndFadeIn, true);
    };

    addListeners();
    return () => {
      removeListeners();
      a.pause();
      a.src = '';
    };
  }, [src, enabled, targetVol]);

  function fadeTo(a: HTMLAudioElement, target: number, durMs = 500) {
    const start = a.volume;
    const delta = target - start;
    const t0 = performance.now();
    function step(t: number) {
      const p = Math.min(1, (t - t0) / durMs);
      a.volume = start + delta * p;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const toggle = () => {
    const a = audioRef.current;
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('bg-audio-enabled', JSON.stringify(next));
    if (!a) return;
    if (next) {
      a.muted = false;
      fadeTo(a, targetVol, 300);
      a.play().catch(() => void 0);
    } else {
      fadeTo(a, 0, 250);
      setTimeout(() => { if (a.volume <= 0.01) a.muted = true; }, 260);
    }
  };

  return { enabled, toggle };
}
