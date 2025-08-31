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
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        'game-primary': '#4F46E5',
        'game-secondary': '#10B981',
        'game-accent': '#F59E0B',
        'game-danger': '#EF4444',
      }
    },
  },
  plugins: [],
}