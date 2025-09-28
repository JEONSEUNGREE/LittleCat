/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quantum: {
          purple: '#8B5CF6',
          blue: '#3B82F6',
          pink: '#EC4899',
          cyan: '#06B6D4',
          indigo: '#6366F1',
          violet: '#7C3AED'
        }
      },
      animation: {
        'quantum-pulse': 'quantumPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'entangle': 'entangle 1s ease-in-out',
        'particle-float': 'particleFloat 3s ease-in-out infinite',
        'quantum-glow': 'quantumGlow 2s ease-in-out infinite'
      },
      keyframes: {
        quantumPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.05)' }
        },
        entangle: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
          '100%': { transform: 'rotate(360deg) scale(1)' }
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        quantumGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)' }
        }
      }
    }
  },
  plugins: []
}