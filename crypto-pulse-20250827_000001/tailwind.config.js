/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crypto: {
          dark: '#0d0f14',
          darker: '#060709',
          accent: '#00d4ff',
          green: '#00ff88',
          red: '#ff3b3b',
          gold: '#ffd700',
          purple: '#9945ff',
          gray: '#2a2e39'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}