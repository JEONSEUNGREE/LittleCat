/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'reverse-pulse': 'reverse-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'time-flow': 'time-flow 3s ease-in-out infinite',
        'glitch': 'glitch 2s ease-in-out infinite',
      },
      keyframes: {
        'reverse-pulse': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(0.95)' },
        },
        'time-flow': {
          '0%': { transform: 'translateX(0) rotateY(0deg)' },
          '50%': { transform: 'translateX(50px) rotateY(180deg)' },
          '100%': { transform: 'translateX(0) rotateY(360deg)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
    },
  },
  plugins: [],
}