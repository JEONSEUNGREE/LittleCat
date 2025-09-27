/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'echo-primary': '#6366f1',
        'echo-secondary': '#a78bfa',
        'echo-accent': '#f97316',
        'echo-dark': '#1e293b',
        'echo-light': '#f1f5f9'
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
        'echo-fade': 'echo-fade 0.6s ease-out',
        'bounce-in': 'bounce-in 0.5s ease-out'
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' }
        },
        'echo-fade': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}