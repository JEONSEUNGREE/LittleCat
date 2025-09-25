import { create } from 'zustand'

export interface Story {
  id: string
  title: string
  emojis: string[]
  text: string
  createdAt: Date
}

interface StoryStore {
  stories: Story[]
  currentStory: string[]
  addEmoji: (emoji: string) => void
  removeEmoji: (index: number) => void
  clearCurrentStory: () => void
  saveStory: (title: string, text: string) => void
  deleteStory: (id: string) => void
  loadStory: (id: string) => void
}

const useStoryStore = create<StoryStore>((set, get) => ({
  stories: JSON.parse(localStorage.getItem('emojiStories') || '[]'),
  currentStory: [],
  
  addEmoji: (emoji) => set((state) => ({
    currentStory: [...state.currentStory, emoji]
  })),
  
  removeEmoji: (index) => set((state) => ({
    currentStory: state.currentStory.filter((_, i) => i !== index)
  })),
  
  clearCurrentStory: () => set({ currentStory: [] }),
  
  saveStory: (title, text) => {
    const newStory: Story = {
      id: Date.now().toString(),
      title,
      emojis: get().currentStory,
      text,
      createdAt: new Date()
    }
    
    const updatedStories = [...get().stories, newStory]
    localStorage.setItem('emojiStories', JSON.stringify(updatedStories))
    
    set({
      stories: updatedStories,
      currentStory: []
    })
  },
  
  deleteStory: (id) => {
    const updatedStories = get().stories.filter(s => s.id !== id)
    localStorage.setItem('emojiStories', JSON.stringify(updatedStories))
    set({ stories: updatedStories })
  },
  
  loadStory: (id) => {
    const story = get().stories.find(s => s.id === id)
    if (story) {
      set({ currentStory: story.emojis })
    }
  }
}))

export default useStoryStore