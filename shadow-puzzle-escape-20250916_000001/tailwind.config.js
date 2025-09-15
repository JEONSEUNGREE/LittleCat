/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shadow: {
          light: '#4a5568',
          DEFAULT: '#2d3748',
          dark: '#1a202c',
        },
        light: {
          warm: '#fef3c7',
          DEFAULT: '#fde68a',
          bright: '#fbbf24',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}