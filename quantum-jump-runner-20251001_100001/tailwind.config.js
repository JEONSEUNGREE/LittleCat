/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'quantum-fade': 'quantumFade 0.5s ease-in-out infinite alternate',
        'quantum-pulse': 'quantumPulse 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        quantumFade: {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' },
        },
        quantumPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      colors: {
        quantum: {
          purple: '#9333ea',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          pink: '#ec4899',
        }
      }
    },
  },
  plugins: [],
}