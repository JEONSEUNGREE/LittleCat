/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      colors: {
        'game-primary': '#3b82f6',
        'game-secondary': '#10b981',
        'game-accent': '#f59e0b',
        'game-danger': '#ef4444',
      }
    },
  },
  plugins: [],
}