/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mood: {
          happy: '#FFD93D',
          sad: '#6495ED',
          angry: '#FF6B6B',
          calm: '#98D8C8',
          excited: '#FF7F50',
          anxious: '#DDA0DD',
          neutral: '#B0B0B0',
          love: '#FF69B4'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'mood-shift': 'moodShift 4s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        moodShift: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.05) rotate(5deg)' },
          '75%': { transform: 'scale(0.95) rotate(-5deg)' }
        }
      }
    },
  },
  plugins: [],
}