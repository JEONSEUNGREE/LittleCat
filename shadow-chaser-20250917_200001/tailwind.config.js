/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shadow': '#1a1a1a',
        'light': '#ffd700',
        'twilight': '#4a5568',
      },
      animation: {
        'pulse-light': 'pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shadow-move': 'shadow-move 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-light': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'shadow-move': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        }
      }
    },
  },
  plugins: [],
}