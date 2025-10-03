/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-dark': '#0f0e17',
        'game-primary': '#ff8906',
        'game-secondary': '#f25f4c',
        'game-accent': '#e53170',
        'game-light': '#fffffe'
      },
      animation: {
        'wave-flow': 'waveFlow 2s ease-in-out infinite',
        'pulse-beat': 'pulseBeat 0.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite'
      },
      keyframes: {
        waveFlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 137, 6, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 137, 6, 0.8)' }
        }
      }
    },
  },
  plugins: [],
}