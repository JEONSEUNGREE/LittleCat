import { create } from 'zustand'

export type LightType = 'spot' | 'wash' | 'beam' | 'strobe'
export type EffectType = 'smoke' | 'confetti' | 'pyro' | 'laser'

export interface StageLight {
  id: string
  type: LightType
  x: number
  y: number
  intensity: number
  color: string
  angle: number
  isActive: boolean
}

export interface StageEffect {
  id: string
  type: EffectType
  x: number
  y: number
  isActive: boolean
  duration: number
}

export interface Scene {
  id: string
  name: string
  lights: StageLight[]
  effects: StageEffect[]
  backgroundColor: string
}

interface StageState {
  currentScene: Scene
  savedScenes: Scene[]
  isPlaying: boolean
  selectedTool: 'light' | 'effect' | 'move' | null
  selectedLightType: LightType
  selectedEffectType: EffectType
  
  setCurrentScene: (scene: Scene) => void
  addLight: (light: StageLight) => void
  addEffect: (effect: StageEffect) => void
  updateLight: (id: string, updates: Partial<StageLight>) => void
  updateEffect: (id: string, updates: Partial<StageEffect>) => void
  deleteLight: (id: string) => void
  deleteEffect: (id: string) => void
  saveScene: (name: string) => void
  loadScene: (id: string) => void
  setPlaying: (playing: boolean) => void
  setSelectedTool: (tool: 'light' | 'effect' | 'move' | null) => void
  setSelectedLightType: (type: LightType) => void
  setSelectedEffectType: (type: EffectType) => void
  updateBackgroundColor: (color: string) => void
}

const defaultScene: Scene = {
  id: 'default',
  name: 'New Scene',
  lights: [],
  effects: [],
  backgroundColor: '#000000'
}

export const useStageStore = create<StageState>((set) => ({
  currentScene: defaultScene,
  savedScenes: [],
  isPlaying: false,
  selectedTool: null,
  selectedLightType: 'spot',
  selectedEffectType: 'smoke',
  
  setCurrentScene: (scene) => set({ currentScene: scene }),
  
  addLight: (light) => set((state) => ({
    currentScene: {
      ...state.currentScene,
      lights: [...state.currentScene.lights, light]
    }
  })),
  
  addEffect: (effect) => set((state) => ({
    currentScene: {
      ...state.currentScene,
      effects: [...state.currentScene.effects, effect]
    }
  })),
  
  updateLight: (id, updates) => set((state) => ({
    currentScene: {
      ...state.currentScene,
      lights: state.currentScene.lights.map(light =>
        light.id === id ? { ...light, ...updates } : light
      )
    }
  })),
  
  updateEffect: (id, updates) => set((state) => ({
    currentScene: {
      ...state.currentScene,
      effects: state.currentScene.effects.map(effect =>
        effect.id === id ? { ...effect, ...updates } : effect
      )
    }
  })),
  
  deleteLight: (id) => set((state) => ({
    currentScene: {
      ...state.currentScene,
      lights: state.currentScene.lights.filter(light => light.id !== id)
    }
  })),
  
  deleteEffect: (id) => set((state) => ({
    currentScene: {
      ...state.currentScene,
      effects: state.currentScene.effects.filter(effect => effect.id !== id)
    }
  })),
  
  saveScene: (name) => set((state) => {
    const newScene = {
      ...state.currentScene,
      id: Date.now().toString(),
      name
    }
    return {
      savedScenes: [...state.savedScenes, newScene]
    }
  }),
  
  loadScene: (id) => set((state) => {
    const scene = state.savedScenes.find(s => s.id === id)
    if (scene) {
      return { currentScene: { ...scene } }
    }
    return state
  }),
  
  setPlaying: (playing) => set({ isPlaying: playing }),
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setSelectedLightType: (type) => set({ selectedLightType: type }),
  setSelectedEffectType: (type) => set({ selectedEffectType: type }),
  
  updateBackgroundColor: (color) => set((state) => ({
    currentScene: {
      ...state.currentScene,
      backgroundColor: color
    }
  }))
}))