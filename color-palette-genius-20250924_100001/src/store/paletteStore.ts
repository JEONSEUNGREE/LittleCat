import { create } from 'zustand'

export interface Color {
  id: string
  hex: string
  locked: boolean
}

export interface Palette {
  id: string
  name: string
  colors: Color[]
  createdAt: Date
}

interface PaletteStore {
  currentPalette: Color[]
  savedPalettes: Palette[]
  selectedImage: string | null
  generateRandomColor: () => string
  generatePalette: () => void
  updateColor: (id: string, hex: string) => void
  toggleLock: (id: string) => void
  addColor: () => void
  removeColor: (id: string) => void
  savePalette: (name: string) => void
  loadPalette: (paletteId: string) => void
  deletePalette: (paletteId: string) => void
  setImageSource: (imageUrl: string | null) => void
  extractColorsFromImage: (imageUrl: string) => void
  exportPalette: (format: 'css' | 'json' | 'scss') => string
}

const generateId = () => Math.random().toString(36).substring(7)

const usePaletteStore = create<PaletteStore>((set, get) => ({
  currentPalette: [
    { id: generateId(), hex: '#FF6B6B', locked: false },
    { id: generateId(), hex: '#4ECDC4', locked: false },
    { id: generateId(), hex: '#45B7D1', locked: false },
    { id: generateId(), hex: '#FFA07A', locked: false },
    { id: generateId(), hex: '#98D8C8', locked: false },
  ],
  savedPalettes: [],
  selectedImage: null,

  generateRandomColor: () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  },

  generatePalette: () => {
    set((state) => ({
      currentPalette: state.currentPalette.map((color) =>
        color.locked
          ? color
          : { ...color, hex: get().generateRandomColor() }
      ),
    }))
  },

  updateColor: (id, hex) => {
    set((state) => ({
      currentPalette: state.currentPalette.map((color) =>
        color.id === id ? { ...color, hex } : color
      ),
    }))
  },

  toggleLock: (id) => {
    set((state) => ({
      currentPalette: state.currentPalette.map((color) =>
        color.id === id ? { ...color, locked: !color.locked } : color
      ),
    }))
  },

  addColor: () => {
    if (get().currentPalette.length >= 10) return
    set((state) => ({
      currentPalette: [
        ...state.currentPalette,
        { id: generateId(), hex: get().generateRandomColor(), locked: false },
      ],
    }))
  },

  removeColor: (id) => {
    if (get().currentPalette.length <= 2) return
    set((state) => ({
      currentPalette: state.currentPalette.filter((color) => color.id !== id),
    }))
  },

  savePalette: (name) => {
    const newPalette: Palette = {
      id: generateId(),
      name,
      colors: [...get().currentPalette],
      createdAt: new Date(),
    }
    set((state) => ({
      savedPalettes: [...state.savedPalettes, newPalette],
    }))
  },

  loadPalette: (paletteId) => {
    const palette = get().savedPalettes.find((p) => p.id === paletteId)
    if (palette) {
      set({ currentPalette: [...palette.colors] })
    }
  },

  deletePalette: (paletteId) => {
    set((state) => ({
      savedPalettes: state.savedPalettes.filter((p) => p.id !== paletteId),
    }))
  },

  setImageSource: (imageUrl) => {
    set({ selectedImage: imageUrl })
  },

  extractColorsFromImage: (imageUrl) => {
    // Simplified color extraction simulation
    const extractedColors = [
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
    ]
    
    set({
      currentPalette: extractedColors.map((hex) => ({
        id: generateId(),
        hex,
        locked: false,
      })),
      selectedImage: imageUrl,
    })
  },

  exportPalette: (format) => {
    const palette = get().currentPalette
    switch (format) {
      case 'css':
        return palette
          .map((color, index) => `--color-${index + 1}: ${color.hex};`)
          .join('\n')
      case 'scss':
        return palette
          .map((color, index) => `$color-${index + 1}: ${color.hex};`)
          .join('\n')
      case 'json':
        return JSON.stringify(
          palette.map((color) => color.hex),
          null,
          2
        )
      default:
        return ''
    }
  },
}))

export default usePaletteStore