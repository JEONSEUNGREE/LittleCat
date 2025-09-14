/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quest-primary': '#4A90E2',
        'quest-secondary': '#7B68EE',
        'quest-success': '#5CB85C',
        'quest-warning': '#F0AD4E',
        'quest-danger': '#D9534F',
        'quest-dark': '#2C3E50',
        'quest-light': '#ECF0F1',
        'quest-gold': '#FFD700',
        'quest-silver': '#C0C0C0',
        'quest-bronze': '#CD7F32'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'level-up': 'levelUp 0.5s ease-out',
        'quest-complete': 'questComplete 0.8s ease-out',
        'coin-collect': 'coinCollect 0.5s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        levelUp: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        questComplete: {
          '0%': { transform: 'scale(0.9) rotate(-5deg)', opacity: '0' },
          '50%': { transform: 'scale(1.1) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
        },
        coinCollect: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.2)' },
          '100%': { transform: 'translateY(-40px) scale(0)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}