/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'water-blue': '#4FC3F7',
        'leaf-green': '#66BB6A',
        'soil-brown': '#8D6E63',
        'sky-light': '#E1F5FE'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'grow': 'grow 0.5s ease-out',
        'water-drop': 'waterDrop 1s ease-in-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        grow: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        waterDrop: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}