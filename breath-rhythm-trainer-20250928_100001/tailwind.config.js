/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breath-in': 'breathIn 4s ease-in-out infinite',
        'breath-out': 'breathOut 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        breathIn: {
          '0%, 100%': { transform: 'scale(0.8)', opacity: '0.7' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
        },
        breathOut: {
          '0%, 100%': { transform: 'scale(1.2)', opacity: '1' },
          '50%': { transform: 'scale(0.8)', opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}