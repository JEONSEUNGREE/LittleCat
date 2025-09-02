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
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { 'box-shadow': '0 0 20px rgba(255, 255, 255, 0.5)' },
          '100%': { 'box-shadow': '0 0 40px rgba(255, 255, 255, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}