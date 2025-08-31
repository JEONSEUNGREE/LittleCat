import { create } from 'zustand'

export interface VoiceCapsule {
  id: string
  audioBlob?: Blob
  audioUrl?: string
  message: string
  createdAt: Date
  scheduledFor: Date
  opened: boolean
  recipient: string
  duration: number
}

interface CapsuleStore {
  capsules: VoiceCapsule[]
  recording: boolean
  currentRecording: Blob | null
  addCapsule: (capsule: Omit<VoiceCapsule, 'id' | 'opened'>) => void
  openCapsule: (id: string) => void
  setRecording: (status: boolean) => void
  setCurrentRecording: (blob: Blob | null) => void
  getAvailableCapsules: () => VoiceCapsule[]
}

const useCapsuleStore = create<CapsuleStore>((set, get) => ({
  capsules: [],
  recording: false,
  currentRecording: null,

  addCapsule: (capsule) => {
    const newCapsule: VoiceCapsule = {
      ...capsule,
      id: Date.now().toString(),
      opened: false,
    }
    set((state) => ({
      capsules: [...state.capsules, newCapsule],
    }))
  },

  openCapsule: (id) => {
    set((state) => ({
      capsules: state.capsules.map((c) =>
        c.id === id ? { ...c, opened: true } : c
      ),
    }))
  },

  setRecording: (status) => {
    set({ recording: status })
  },

  setCurrentRecording: (blob) => {
    set({ currentRecording: blob })
  },

  getAvailableCapsules: () => {
    const now = new Date()
    return get().capsules.filter(
      (capsule) => capsule.scheduledFor <= now && !capsule.opened
    )
  },
}))

export default useCapsuleStore