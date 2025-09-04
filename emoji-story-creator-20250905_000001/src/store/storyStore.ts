import { create } from 'zustand'

export interface Story {
  id: string
  emojis: string[]
  text: string
  template?: string
  createdAt: Date
  liked: boolean
}

interface StoryState {
  currentStory: Story
  stories: Story[]
  selectedEmojis: string[]
  isGenerating: boolean
  
  addEmoji: (emoji: string) => void
  removeEmoji: (index: number) => void
  clearEmojis: () => void
  generateStory: () => void
  saveStory: () => void
  loadTemplate: (template: string) => void
  setStoryText: (text: string) => void
  toggleLike: (id: string) => void
  deleteStory: (id: string) => void
}

const storyTemplates: Record<string, string[]> = {
  adventure: ['🚀', '🌟', '🏔️', '💎', '🦸'],
  romance: ['❤️', '🌹', '💕', '🌙', '💑'],
  comedy: ['😂', '🤪', '🎭', '🤡', '🎉'],
  mystery: ['🔍', '🗝️', '🎩', '🌫️', '❓'],
  fantasy: ['🧙', '🐉', '🏰', '⚔️', '✨'],
  food: ['🍕', '🍔', '🍰', '🥗', '🍜']
}

const generateStoryText = (emojis: string[]): string => {
  const storyPatterns = [
    'Once upon a time, {0} met {1} and together they discovered {2}. Their journey led them to {3}, where they found {4}.',
    '{0} was walking when suddenly {1} appeared! They had to find {2} before {3} could reach {4}.',
    'In a world of {0}, there lived {1} who dreamed of {2}. One day, {3} changed everything with {4}.',
    'The legend says that {0} and {1} created {2}. But only {3} knew the secret of {4}.',
    '{0} fell in love with {1}, but {2} stood in their way. With the help of {3}, they finally got {4}.'
  ]
  
  const pattern = storyPatterns[Math.floor(Math.random() * storyPatterns.length)]
  let story = pattern
  
  emojis.forEach((emoji, index) => {
    story = story.replace(`{${index}}`, emoji)
  })
  
  // Replace any remaining placeholders
  story = story.replace(/\{[0-9]\}/g, '✨')
  
  return story
}

export const useStoryStore = create<StoryState>((set, get) => ({
  currentStory: {
    id: crypto.randomUUID(),
    emojis: [],
    text: '',
    createdAt: new Date(),
    liked: false
  },
  stories: [],
  selectedEmojis: [],
  isGenerating: false,
  
  addEmoji: (emoji) => set((state) => ({
    selectedEmojis: [...state.selectedEmojis, emoji].slice(0, 10)
  })),
  
  removeEmoji: (index) => set((state) => ({
    selectedEmojis: state.selectedEmojis.filter((_, i) => i !== index)
  })),
  
  clearEmojis: () => set({ selectedEmojis: [] }),
  
  generateStory: () => {
    const { selectedEmojis } = get()
    if (selectedEmojis.length < 2) return
    
    set({ isGenerating: true })
    
    setTimeout(() => {
      const storyText = generateStoryText(selectedEmojis)
      set((state) => ({
        currentStory: {
          ...state.currentStory,
          emojis: selectedEmojis,
          text: storyText,
          createdAt: new Date()
        },
        isGenerating: false
      }))
    }, 1000)
  },
  
  saveStory: () => {
    const { currentStory, selectedEmojis } = get()
    if (!currentStory.text || selectedEmojis.length === 0) return
    
    set((state) => ({
      stories: [
        {
          ...currentStory,
          id: crypto.randomUUID(),
          emojis: [...selectedEmojis]
        },
        ...state.stories
      ].slice(0, 50),
      currentStory: {
        id: crypto.randomUUID(),
        emojis: [],
        text: '',
        createdAt: new Date(),
        liked: false
      },
      selectedEmojis: []
    }))
  },
  
  loadTemplate: (template) => {
    const templateEmojis = storyTemplates[template] || []
    set({
      selectedEmojis: templateEmojis,
      currentStory: {
        id: crypto.randomUUID(),
        emojis: templateEmojis,
        text: '',
        template,
        createdAt: new Date(),
        liked: false
      }
    })
  },
  
  setStoryText: (text) => set((state) => ({
    currentStory: {
      ...state.currentStory,
      text
    }
  })),
  
  toggleLike: (id) => set((state) => ({
    stories: state.stories.map(story =>
      story.id === id ? { ...story, liked: !story.liked } : story
    )
  })),
  
  deleteStory: (id) => set((state) => ({
    stories: state.stories.filter(story => story.id !== id)
  }))
}))