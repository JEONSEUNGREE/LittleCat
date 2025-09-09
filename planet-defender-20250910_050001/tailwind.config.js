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
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        'space-dark': '#0a0e27',
        'space-purple': '#4a1a6b',
        'neon-green': '#00ff88',
        'neon-blue': '#00c3ff',
        'danger-red': '#ff0044',
      }
    },
  },
  plugins: [],
}