/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pixel-dark': '#1e293b',
        'pixel-light': '#f8fafc',
        'pixel-primary': '#8b5cf6',
        'pixel-secondary': '#06b6d4',
        'pixel-accent': '#f59e0b'
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}