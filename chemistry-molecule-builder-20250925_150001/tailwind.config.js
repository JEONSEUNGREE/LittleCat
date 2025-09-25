/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'molecule': {
          'carbon': '#404040',
          'hydrogen': '#FFFFFF',
          'oxygen': '#FF0000',
          'nitrogen': '#0000FF',
          'sulfur': '#FFFF00',
          'phosphorus': '#FF8800',
          'chlorine': '#00FF00',
          'bromine': '#8B4513'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 2s infinite'
      }
    },
  },
  plugins: [],
}