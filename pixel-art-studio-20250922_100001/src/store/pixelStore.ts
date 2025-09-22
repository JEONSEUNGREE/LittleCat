import { create } from 'zustand'

interface PixelState {
  gridSize: number
  pixels: string[][]
  currentColor: string
  isDrawing: boolean
  tool: 'pen' | 'eraser' | 'fill' | 'eyedropper'
  history: string[][][]
  historyIndex: number
  setGridSize: (size: number) => void
  setPixel: (x: number, y: number, color: string) => void
  setCurrentColor: (color: string) => void
  setIsDrawing: (isDrawing: boolean) => void
  setTool: (tool: 'pen' | 'eraser' | 'fill' | 'eyedropper') => void
  clearCanvas: () => void
  fillArea: (x: number, y: number) => void
  undo: () => void
  redo: () => void
  saveToHistory: () => void
  exportAsPNG: () => void
}

const createEmptyGrid = (size: number): string[][] => {
  return Array(size).fill(null).map(() => Array(size).fill('transparent'))
}

export const usePixelStore = create<PixelState>((set, get) => ({
  gridSize: 16,
  pixels: createEmptyGrid(16),
  currentColor: '#8b5cf6',
  isDrawing: false,
  tool: 'pen',
  history: [createEmptyGrid(16)],
  historyIndex: 0,

  setGridSize: (size) => {
    const newGrid = createEmptyGrid(size)
    set({ 
      gridSize: size, 
      pixels: newGrid,
      history: [newGrid],
      historyIndex: 0
    })
  },

  setPixel: (x, y, color) => {
    const state = get()
    if (x < 0 || y < 0 || x >= state.gridSize || y >= state.gridSize) return
    
    const newPixels = state.pixels.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        if (rowIndex === y && colIndex === x) {
          return color
        }
        return col
      })
    )
    set({ pixels: newPixels })
  },

  setCurrentColor: (color) => set({ currentColor: color }),
  setIsDrawing: (isDrawing) => set({ isDrawing }),
  setTool: (tool) => set({ tool }),

  clearCanvas: () => {
    const state = get()
    const emptyGrid = createEmptyGrid(state.gridSize)
    set({ pixels: emptyGrid })
    get().saveToHistory()
  },

  fillArea: (startX, startY) => {
    const state = get()
    const targetColor = state.pixels[startY][startX]
    const fillColor = state.currentColor
    
    if (targetColor === fillColor) return

    const newPixels = state.pixels.map(row => [...row])
    const stack: [number, number][] = [[startX, startY]]
    const visited = new Set<string>()

    while (stack.length > 0) {
      const [x, y] = stack.pop()!
      const key = `${x},${y}`
      
      if (visited.has(key)) continue
      visited.add(key)
      
      if (x < 0 || y < 0 || x >= state.gridSize || y >= state.gridSize) continue
      if (newPixels[y][x] !== targetColor) continue
      
      newPixels[y][x] = fillColor
      
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
    }
    
    set({ pixels: newPixels })
  },

  saveToHistory: () => {
    const state = get()
    const newHistory = state.history.slice(0, state.historyIndex + 1)
    newHistory.push(state.pixels.map(row => [...row]))
    set({ 
      history: newHistory.slice(-50), // Keep last 50 states
      historyIndex: Math.min(newHistory.length - 1, 49)
    })
  },

  undo: () => {
    const state = get()
    if (state.historyIndex > 0) {
      const newIndex = state.historyIndex - 1
      set({ 
        pixels: state.history[newIndex].map(row => [...row]),
        historyIndex: newIndex
      })
    }
  },

  redo: () => {
    const state = get()
    if (state.historyIndex < state.history.length - 1) {
      const newIndex = state.historyIndex + 1
      set({ 
        pixels: state.history[newIndex].map(row => [...row]),
        historyIndex: newIndex
      })
    }
  },

  exportAsPNG: () => {
    const state = get()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pixelSize = 20
    canvas.width = state.gridSize * pixelSize
    canvas.height = state.gridSize * pixelSize

    state.pixels.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color !== 'transparent') {
          ctx.fillStyle = color
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
        }
      })
    })

    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `pixel-art-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
    })
  }
}))