/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'breath-primary': '#6366f1',
        'breath-secondary': '#8b5cf6',
        'breath-calm': '#e0e7ff',
        'breath-dark': '#1e1b4b',
      },
      animation: {
        'breathe-in': 'breatheIn 4s ease-in-out infinite',
        'breathe-out': 'breatheOut 4s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        breatheIn: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
        },
        breatheOut: {
          '0%, 100%': { transform: 'scale(1.3)' },
          '50%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}