/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'beat': 'beat 0.5s ease-in-out infinite',
        'slide-down': 'slideDown 2s linear',
        'pulse-strong': 'pulseStrong 1s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseStrong: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      colors: {
        'rhythm-purple': '#8B5CF6',
        'rhythm-pink': '#EC4899',
        'rhythm-blue': '#3B82F6',
        'rhythm-cyan': '#06B6D4',
      },
    },
  },
  plugins: [],
}