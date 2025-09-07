import React from 'react';
import { useBackgroundAudio } from './useBackgroundAudio';

export default function AudioToggle() {
  // Use default "/sounds/bg.mp3". To point at a different file, pass a src and vol:
  // const { enabled, toggle } = useBackgroundAudio('/sounds/your-file.mp3', 0.3);
  const { enabled, toggle } = useBackgroundAudio();

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
