/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hydro': {
          50: '#e6f3ff',
          100: '#b3daff',
          200: '#80c1ff',
          300: '#4da8ff',
          400: '#1a8fff',
          500: '#0076e6',
          600: '#005db3',
          700: '#004480',
          800: '#002b4d',
          900: '#00121a',
        }
      },
      animation: {
        'water-wave': 'wave 3s ease-in-out infinite',
        'bubble': 'bubble 4s ease-in-out infinite',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 2s infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bubble: {
          '0%': { transform: 'translateY(100%) scale(0)', opacity: 0 },
          '50%': { opacity: 0.8 },
          '100%': { transform: 'translateY(-100vh) scale(1)', opacity: 0 },
        }
      }
    },
  },
  plugins: [],
}