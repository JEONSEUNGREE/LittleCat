/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        'physics-blue': '#1e40af',
        'physics-purple': '#7c3aed',
        'physics-green': '#16a34a',
      }
    },
  },
  plugins: [],
}