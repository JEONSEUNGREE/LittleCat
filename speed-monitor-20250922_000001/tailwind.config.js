/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        'speed-green': '#10b981',
        'speed-yellow': '#f59e0b',
        'speed-red': '#ef4444',
      }
    },
  },
  plugins: [],
}