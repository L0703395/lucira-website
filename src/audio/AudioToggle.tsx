import React from 'react';
import { useBackgroundAudio } from './useBackgroundAudio';

export default function AudioToggle() {
  // Point to your actual file and raise the target volume a bit
  const { enabled, toggle } = useBackgroundAudio('/sounds/Animated_Symbol_Video_Generation.mp3', 0.6);

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? 'Mute background audio' : 'Unmute background audio'}
      className="fixed bottom-4 right-4 z-[60] rounded-full px-3 py-2 text-sm
                 border border-[var(--border)] bg-black/40 backdrop-blur
                 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {enabled ? '🔊 Audio On' : '🔇 Audio Off'}
    </button>
  );
}
