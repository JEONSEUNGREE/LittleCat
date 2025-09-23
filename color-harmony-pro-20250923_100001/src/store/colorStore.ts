import { create } from 'zustand'

export type HarmonyType = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'monochromatic'

interface ColorState {
  baseColor: string
  harmonyType: HarmonyType
  palette: string[]
  lockedColors: Set<number>
  setBaseColor: (color: string) => void
  setHarmonyType: (type: HarmonyType) => void
  generatePalette: () => void
  toggleLock: (index: number) => void
  copyColor: (color: string) => void
}

const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100
  const a = s * Math.min(l, 1 - l) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

const hexToHsl = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return [h * 360, s * 100, l * 100]
}

const generateHarmony = (baseColor: string, type: HarmonyType): string[] => {
  const [h, s, l] = hexToHsl(baseColor)
  const colors: string[] = []

  switch (type) {
    case 'complementary':
      colors.push(baseColor)
      colors.push(hslToHex((h + 180) % 360, s, l))
      colors.push(hslToHex(h, s * 0.7, l * 1.2))
      colors.push(hslToHex((h + 180) % 360, s * 0.7, l * 0.8))
      break
    
    case 'analogous':
      colors.push(baseColor)
      colors.push(hslToHex((h + 30) % 360, s, l))
      colors.push(hslToHex((h - 30 + 360) % 360, s, l))
      colors.push(hslToHex(h, s * 0.8, l * 1.3))
      break
    
    case 'triadic':
      colors.push(baseColor)
      colors.push(hslToHex((h + 120) % 360, s, l))
      colors.push(hslToHex((h + 240) % 360, s, l))
      colors.push(hslToHex(h, s * 0.6, l * 1.4))
      break
    
    case 'tetradic':
      colors.push(baseColor)
      colors.push(hslToHex((h + 90) % 360, s, l))
      colors.push(hslToHex((h + 180) % 360, s, l))
      colors.push(hslToHex((h + 270) % 360, s, l))
      break
    
    case 'monochromatic':
      colors.push(baseColor)
      colors.push(hslToHex(h, s, l * 0.7))
      colors.push(hslToHex(h, s, l * 1.3))
      colors.push(hslToHex(h, s * 0.5, l * 1.5))
      break
  }

  return colors
}

export const useColorStore = create<ColorState>((set, get) => ({
  baseColor: '#6366f1',
  harmonyType: 'complementary',
  palette: ['#6366f1', '#f1cf63', '#9ca3f7', '#c9a34f'],
  lockedColors: new Set(),
  
  setBaseColor: (color) => {
    set({ baseColor: color })
    get().generatePalette()
  },
  
  setHarmonyType: (type) => {
    set({ harmonyType: type })
    get().generatePalette()
  },
  
  generatePalette: () => {
    const { baseColor, harmonyType, lockedColors, palette: oldPalette } = get()
    const newPalette = generateHarmony(baseColor, harmonyType)
    
    // Preserve locked colors
    const finalPalette = newPalette.map((color, index) => 
      lockedColors.has(index) ? oldPalette[index] : color
    )
    
    set({ palette: finalPalette })
  },
  
  toggleLock: (index) => {
    set((state) => {
      const newLocked = new Set(state.lockedColors)
      if (newLocked.has(index)) {
        newLocked.delete(index)
      } else {
        newLocked.add(index)
      }
      return { lockedColors: newLocked }
    })
  },
  
  copyColor: async (color) => {
    try {
      await navigator.clipboard.writeText(color)
    } catch (err) {
      console.error('Failed to copy color:', err)
    }
  }
}))