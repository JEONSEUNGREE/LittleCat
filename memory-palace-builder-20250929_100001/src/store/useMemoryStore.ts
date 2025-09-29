import { create } from 'zustand'

export interface MemoryItem {
  id: string
  content: string
  imageUrl?: string
  position: { x: number; y: number }
  roomId: string
  createdAt: Date
}

export interface Room {
  id: string
  name: string
  theme: string
  items: MemoryItem[]
  connections: string[]
}

export interface Palace {
  id: string
  name: string
  rooms: Room[]
  createdAt: Date
  lastVisited: Date
}

interface MemoryStore {
  palaces: Palace[]
  currentPalace: Palace | null
  currentRoom: Room | null
  memoryPath: string[]
  statistics: {
    totalItems: number
    successRate: number
    streakDays: number
  }
  
  createPalace: (name: string) => void
  selectPalace: (id: string) => void
  addRoom: (palaceId: string, room: Omit<Room, 'id' | 'items'>) => void
  selectRoom: (roomId: string) => void
  addMemoryItem: (roomId: string, item: Omit<MemoryItem, 'id' | 'createdAt'>) => void
  updateMemoryPath: (roomId: string) => void
  removeMemoryItem: (roomId: string, itemId: string) => void
  updateStatistics: () => void
}

export const useMemoryStore = create<MemoryStore>((set, get) => ({
  palaces: [],
  currentPalace: null,
  currentRoom: null,
  memoryPath: [],
  statistics: {
    totalItems: 0,
    successRate: 85,
    streakDays: 7
  },

  createPalace: (name) => {
    const newPalace: Palace = {
      id: Date.now().toString(),
      name,
      rooms: [],
      createdAt: new Date(),
      lastVisited: new Date()
    }
    set((state) => ({
      palaces: [...state.palaces, newPalace],
      currentPalace: newPalace
    }))
  },

  selectPalace: (id) => {
    const palace = get().palaces.find(p => p.id === id)
    if (palace) {
      palace.lastVisited = new Date()
      set({ currentPalace: palace })
    }
  },

  addRoom: (palaceId, roomData) => {
    const newRoom: Room = {
      ...roomData,
      id: Date.now().toString(),
      items: []
    }
    set((state) => ({
      palaces: state.palaces.map(p => 
        p.id === palaceId 
          ? { ...p, rooms: [...p.rooms, newRoom] }
          : p
      ),
      currentPalace: state.currentPalace?.id === palaceId
        ? { ...state.currentPalace, rooms: [...state.currentPalace.rooms, newRoom] }
        : state.currentPalace
    }))
  },

  selectRoom: (roomId) => {
    const { currentPalace } = get()
    const room = currentPalace?.rooms.find(r => r.id === roomId)
    if (room) {
      set({ currentRoom: room })
    }
  },

  addMemoryItem: (roomId, itemData) => {
    const newItem: MemoryItem = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    set((state) => ({
      palaces: state.palaces.map(p => ({
        ...p,
        rooms: p.rooms.map(r => 
          r.id === roomId
            ? { ...r, items: [...r.items, newItem] }
            : r
        )
      })),
      currentRoom: state.currentRoom?.id === roomId
        ? { ...state.currentRoom, items: [...state.currentRoom.items, newItem] }
        : state.currentRoom
    }))
    get().updateStatistics()
  },

  updateMemoryPath: (roomId) => {
    set((state) => ({
      memoryPath: [...state.memoryPath, roomId]
    }))
  },

  removeMemoryItem: (roomId, itemId) => {
    set((state) => ({
      palaces: state.palaces.map(p => ({
        ...p,
        rooms: p.rooms.map(r => 
          r.id === roomId
            ? { ...r, items: r.items.filter(item => item.id !== itemId) }
            : r
        )
      })),
      currentRoom: state.currentRoom?.id === roomId
        ? { ...state.currentRoom, items: state.currentRoom.items.filter(item => item.id !== itemId) }
        : state.currentRoom
    }))
    get().updateStatistics()
  },

  updateStatistics: () => {
    const { palaces } = get()
    const totalItems = palaces.reduce((acc, palace) => 
      acc + palace.rooms.reduce((roomAcc, room) => 
        roomAcc + room.items.length, 0
      ), 0
    )
    set((state) => ({
      statistics: {
        ...state.statistics,
        totalItems
      }
    }))
  }
}))