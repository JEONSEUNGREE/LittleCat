/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0a0e27',
        'space-purple': '#4a1e9e',
        'space-blue': '#1e3a8a',
        'planet-green': '#10b981',
        'laser-red': '#ef4444',
        'energy-yellow': '#fbbf24',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom, #0a0e27, #1e3a8a)',
      }
    },
  },
  plugins: [],
}