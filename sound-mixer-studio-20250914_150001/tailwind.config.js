/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#9945FF',
        'neon-pink': '#FF006E',
        'neon-blue': '#00D9FF',
        'neon-green': '#39FF14',
        'dark-bg': '#0a0a0a',
        'dark-surface': '#1a1a1a',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(153, 69, 255, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 0, 110, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}