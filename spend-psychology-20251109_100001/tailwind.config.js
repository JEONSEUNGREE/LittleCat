/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        happy: '#10b981',
        neutral: '#6b7280',
        sad: '#3b82f6',
        angry: '#ef4444',
        stressed: '#f59e0b',
      }
    },
  },
  plugins: [],
}
