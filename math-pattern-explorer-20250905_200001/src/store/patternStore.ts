import { create } from 'zustand'

export type PatternType = 'fibonacci' | 'fractal' | 'golden-ratio' | 'spiral' | 'mandelbrot'

interface PatternState {
  currentPattern: PatternType
  animationSpeed: number
  complexity: number
  colorScheme: 'rainbow' | 'gradient' | 'monochrome'
  isAnimating: boolean
  zoom: number
  setPattern: (pattern: PatternType) => void
  setAnimationSpeed: (speed: number) => void
  setComplexity: (complexity: number) => void
  setColorScheme: (scheme: 'rainbow' | 'gradient' | 'monochrome') => void
  toggleAnimation: () => void
  setZoom: (zoom: number) => void
}

export const usePatternStore = create<PatternState>((set) => ({
  currentPattern: 'fibonacci',
  animationSpeed: 50,
  complexity: 5,
  colorScheme: 'gradient',
  isAnimating: true,
  zoom: 1,
  setPattern: (pattern) => set({ currentPattern: pattern }),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
  setComplexity: (complexity) => set({ complexity }),
  setColorScheme: (scheme) => set({ colorScheme: scheme }),
  toggleAnimation: () => set((state) => ({ isAnimating: !state.isAnimating })),
  setZoom: (zoom) => set({ zoom })
}))