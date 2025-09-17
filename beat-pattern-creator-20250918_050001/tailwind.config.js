/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beat-primary': '#FF6B6B',
        'beat-secondary': '#4ECDC4',
        'beat-accent': '#FFE66D',
        'beat-dark': '#1A1B26',
        'beat-light': '#F7F7F7',
      },
      animation: {
        'pulse-beat': 'pulse-beat 0.3s ease-out',
        'rotate-slow': 'rotate 8s linear infinite',
      },
      keyframes: {
        'pulse-beat': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}