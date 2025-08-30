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
        'spin-slow': 'spin 8s linear infinite',
      },
      colors: {
        'neon-blue': '#00d4ff',
        'neon-purple': '#9945ff',
        'neon-pink': '#ff00ff',
        'dark-bg': '#0a0a0a',
      }
    },
  },
  plugins: [],
}