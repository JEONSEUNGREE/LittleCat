/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mood-happy': '#FFD93D',
        'mood-calm': '#6BCFFF',
        'mood-sad': '#4A90E2',
        'mood-anxious': '#F5A623',
        'mood-angry': '#FF6B6B',
        'mood-excited': '#FF69B4',
        'mood-neutral': '#95A5A6'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}