/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pixel: {
          green: '#52c41a',
          red: '#ff4d4f',
          blue: '#1890ff',
          purple: '#722ed1',
          yellow: '#fadb14',
          dark: '#001529',
          light: '#f0f2f5'
        }
      },
      fontFamily: {
        pixel: ['Courier New', 'monospace']
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}