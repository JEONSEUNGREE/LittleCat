/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fear: {
          extreme: '#DC2626',
          high: '#F87171',
          moderate: '#FBBF24',
          low: '#84CC16',
        },
        greed: {
          low: '#84CC16',
          moderate: '#FBBF24',
          high: '#FB923C',
          extreme: '#DC2626',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}