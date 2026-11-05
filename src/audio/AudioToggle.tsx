import React from 'react';
import { useBackgroundAudio } from './useBackgroundAudio';

export default function AudioToggle() {
  const { enabled, toggle } = useBackgroundAudio('/sounds/Animated_Symbol_Video_Generation.mp3', 0.28);

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? 'Turn background audio off' : 'Turn background audio on'}
      className="fixed bottom-4 right-4 z-[60] rounded-full px-3 py-2 text-sm
                 border border-[var(--border)] bg-black/60 backdrop-blur
                 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {enabled ? 'Sound on' : 'Sound off'}
    </button>
  );
}
