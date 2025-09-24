import { create } from 'zustand'

export interface Story {
  id: string
  title: string
  emojis: string[]
  createdAt: number
}

interface StoryState {
  currentStory: Story
  savedStories: Story[]
  addEmoji: (emoji: string) => void
  removeEmoji: (index: number) => void
  clearStory: () => void
  saveStory: () => void
  deleteStory: (id: string) => void
  loadStory: (story: Story) => void
  generateTitle: () => void
}

const storyTitles = [
  'Adventure Awaits',
  'Magical Journey',
  'Happy Moments',
  'Mystery Tale',
  'Dream Sequence',
  'Epic Quest',
  'Funny Story',
  'Emotional Ride',
  'Wild Adventure',
  'Creative Tale'
]

export const useStoryStore = create<StoryState>((set, get) => ({
      currentStory: {
        id: '',
        title: 'My Story',
        emojis: [],
        createdAt: Date.now()
      },
      savedStories: [],
      
      addEmoji: (emoji: string) => {
        set((state) => ({
          currentStory: {
            ...state.currentStory,
            emojis: [...state.currentStory.emojis, emoji]
          }
        }))
      },
      
      removeEmoji: (index: number) => {
        set((state) => ({
          currentStory: {
            ...state.currentStory,
            emojis: state.currentStory.emojis.filter((_, i) => i !== index)
          }
        }))
      },
      
      clearStory: () => {
        set({
          currentStory: {
            id: '',
            title: 'My Story',
            emojis: [],
            createdAt: Date.now()
          }
        })
      },
      
      saveStory: () => {
        const { currentStory, savedStories } = get()
        if (currentStory.emojis.length === 0) return
        
        const newStory: Story = {
          ...currentStory,
          id: Date.now().toString(),
          createdAt: Date.now()
        }
        
        set({
          savedStories: [newStory, ...savedStories],
          currentStory: {
            id: '',
            title: 'My Story',
            emojis: [],
            createdAt: Date.now()
          }
        })
      },
      
      deleteStory: (id: string) => {
        set((state) => ({
          savedStories: state.savedStories.filter((story) => story.id !== id)
        }))
      },
      
      loadStory: (story: Story) => {
        set({ currentStory: { ...story, id: '' } })
      },
      
      generateTitle: () => {
        const randomTitle = storyTitles[Math.floor(Math.random() * storyTitles.length)]
        set((state) => ({
          currentStory: {
            ...state.currentStory,
            title: randomTitle
          }
        }))
      }
    }))