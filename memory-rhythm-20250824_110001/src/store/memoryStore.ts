import { create } from 'zustand'

export interface MemoryCard {
  id: string
  front: string
  back: string
  rhythm: number[] // 리듬 패턴 [1, 0, 1, 1, 0, 1, 0, 0]
  bpm: number
  category: string
  difficulty: number // 1-5
  lastReviewed?: Date
  reviewCount: number
  correctCount: number
  nextReview?: Date
}

export interface StudySession {
  id: string
  startTime: Date
  endTime?: Date
  cardsStudied: number
  correctAnswers: number
  rhythmAccuracy: number
}

interface MemoryStore {
  cards: MemoryCard[]
  currentSession: StudySession | null
  sessions: StudySession[]
  currentCardIndex: number
  isPlaying: boolean
  currentBPM: number
  selectedCategory: string
  
  // Actions
  addCard: (card: Omit<MemoryCard, 'id' | 'reviewCount' | 'correctCount'>) => void
  updateCard: (id: string, card: Partial<MemoryCard>) => void
  deleteCard: (id: string) => void
  
  startSession: () => void
  endSession: () => void
  
  setCurrentCardIndex: (index: number) => void
  nextCard: () => void
  previousCard: () => void
  
  markCardAsCorrect: (id: string) => void
  markCardAsIncorrect: (id: string) => void
  
  setPlaying: (playing: boolean) => void
  setBPM: (bpm: number) => void
  setSelectedCategory: (category: string) => void
  
  getFilteredCards: () => MemoryCard[]
  getCategories: () => string[]
}

const useMemoryStore = create<MemoryStore>((set, get) => ({
      cards: [
        {
          id: '1',
          front: '한국의 수도',
          back: '서울',
          rhythm: [1, 0, 1, 0],
          bpm: 120,
          category: '지리',
          difficulty: 1,
          reviewCount: 0,
          correctCount: 0
        },
        {
          id: '2',
          front: 'Apple',
          back: '사과',
          rhythm: [1, 1, 0, 0],
          bpm: 100,
          category: '영어',
          difficulty: 1,
          reviewCount: 0,
          correctCount: 0
        },
        {
          id: '3',
          front: '2 × 8',
          back: '16',
          rhythm: [1, 0, 0, 1],
          bpm: 140,
          category: '수학',
          difficulty: 1,
          reviewCount: 0,
          correctCount: 0
        }
      ],
      currentSession: null,
      sessions: [],
      currentCardIndex: 0,
      isPlaying: false,
      currentBPM: 120,
      selectedCategory: '전체',
      
      addCard: (cardData) => set((state) => ({
        cards: [...state.cards, {
          ...cardData,
          id: Date.now().toString(),
          reviewCount: 0,
          correctCount: 0
        }]
      })),
      
      updateCard: (id, updatedCard) => set((state) => ({
        cards: state.cards.map(card => 
          card.id === id ? { ...card, ...updatedCard } : card
        )
      })),
      
      deleteCard: (id) => set((state) => ({
        cards: state.cards.filter(card => card.id !== id)
      })),
      
      startSession: () => set({
        currentSession: {
          id: Date.now().toString(),
          startTime: new Date(),
          cardsStudied: 0,
          correctAnswers: 0,
          rhythmAccuracy: 0
        }
      }),
      
      endSession: () => set((state) => {
        if (!state.currentSession) return state
        
        const endedSession = {
          ...state.currentSession,
          endTime: new Date()
        }
        
        return {
          sessions: [...state.sessions, endedSession],
          currentSession: null
        }
      }),
      
      setCurrentCardIndex: (index) => set({ currentCardIndex: index }),
      
      nextCard: () => set((state) => {
        const filteredCards = get().getFilteredCards()
        const nextIndex = (state.currentCardIndex + 1) % filteredCards.length
        return { currentCardIndex: nextIndex }
      }),
      
      previousCard: () => set((state) => {
        const filteredCards = get().getFilteredCards()
        const prevIndex = state.currentCardIndex === 0 
          ? filteredCards.length - 1 
          : state.currentCardIndex - 1
        return { currentCardIndex: prevIndex }
      }),
      
      markCardAsCorrect: (id) => set((state) => ({
        cards: state.cards.map(card => 
          card.id === id 
            ? { 
                ...card, 
                correctCount: card.correctCount + 1,
                reviewCount: card.reviewCount + 1,
                lastReviewed: new Date()
              } 
            : card
        ),
        currentSession: state.currentSession 
          ? {
              ...state.currentSession,
              cardsStudied: state.currentSession.cardsStudied + 1,
              correctAnswers: state.currentSession.correctAnswers + 1
            }
          : null
      })),
      
      markCardAsIncorrect: (id) => set((state) => ({
        cards: state.cards.map(card => 
          card.id === id 
            ? { 
                ...card, 
                reviewCount: card.reviewCount + 1,
                lastReviewed: new Date()
              } 
            : card
        ),
        currentSession: state.currentSession 
          ? {
              ...state.currentSession,
              cardsStudied: state.currentSession.cardsStudied + 1
            }
          : null
      })),
      
      setPlaying: (playing) => set({ isPlaying: playing }),
      setBPM: (bpm) => set({ currentBPM: bpm }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      getFilteredCards: () => {
        const state = get()
        if (state.selectedCategory === '전체') {
          return state.cards
        }
        return state.cards.filter(card => card.category === state.selectedCategory)
      },
      
      getCategories: () => {
        const state = get()
        const categories = new Set(state.cards.map(card => card.category))
        return ['전체', ...Array.from(categories)]
      }
    }))

export default useMemoryStore