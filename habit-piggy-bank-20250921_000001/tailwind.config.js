/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        dark: '#2D3436',
        light: '#F8F9FA'
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'ping-slow': 'ping 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'coin-drop': 'coinDrop 0.5s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        coinDrop: {
          '0%': { transform: 'translateY(-100px) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'translateY(0) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'translateY(0) rotate(360deg)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}