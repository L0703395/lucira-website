import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      borderRadius: { '2xl': '1rem' },
      boxShadow: { 'elev': '0 10px 40px rgba(0,0,0,0.25)' },
    },
  },
  plugins: [],
} satisfies Config
