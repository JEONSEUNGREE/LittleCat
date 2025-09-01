import { create } from 'zustand'

export interface MemeText {
  id: string
  text: string
  x: number
  y: number
  fontSize: number
  color: string
  strokeColor: string
  align: 'left' | 'center' | 'right'
}

export interface MemeTemplate {
  id: string
  name: string
  url: string
  width: number
  height: number
  category: string
}

interface MemeState {
  currentMeme: MemeTemplate | null
  texts: MemeText[]
  savedMemes: string[]
  
  setCurrentMeme: (template: MemeTemplate) => void
  addText: () => void
  updateText: (id: string, updates: Partial<MemeText>) => void
  removeText: (id: string) => void
  saveMeme: (dataUrl: string) => void
  clearMeme: () => void
}

export const useMemeStore = create<MemeState>((set) => ({
  currentMeme: null,
  texts: [],
  savedMemes: [],

  setCurrentMeme: (template) => set({ 
    currentMeme: template,
    texts: [
      {
        id: 'top',
        text: 'TOP TEXT',
        x: 50,
        y: 10,
        fontSize: 32,
        color: '#FFFFFF',
        strokeColor: '#000000',
        align: 'center'
      },
      {
        id: 'bottom',
        text: 'BOTTOM TEXT',
        x: 50,
        y: 85,
        fontSize: 32,
        color: '#FFFFFF',
        strokeColor: '#000000',
        align: 'center'
      }
    ]
  }),

  addText: () => set((state) => ({
    texts: [...state.texts, {
      id: Date.now().toString(),
      text: 'NEW TEXT',
      x: 50,
      y: 50,
      fontSize: 28,
      color: '#FFFFFF',
      strokeColor: '#000000',
      align: 'center'
    }]
  })),

  updateText: (id, updates) => set((state) => ({
    texts: state.texts.map(text => 
      text.id === id ? { ...text, ...updates } : text
    )
  })),

  removeText: (id) => set((state) => ({
    texts: state.texts.filter(text => text.id !== id)
  })),

  saveMeme: (dataUrl) => set((state) => ({
    savedMemes: [dataUrl, ...state.savedMemes].slice(0, 20)
  })),

  clearMeme: () => set({
    currentMeme: null,
    texts: []
  })
}))