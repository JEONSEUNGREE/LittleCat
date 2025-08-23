/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fee5e2',
          200: '#fccfc9',
          300: '#f9ada3',
          400: '#f47e6e',
          500: '#ea5541',
          600: '#d73a26',
          700: '#b42e1c',
          800: '#94291a',
          900: '#7a271b',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}