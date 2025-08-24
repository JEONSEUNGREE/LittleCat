import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FlashCard {
  id: string
  front: string
  back: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  lastReviewed: string | null
  nextReview: string | null
  reviewCount: number
  correctCount: number
  createdAt: string
}

export interface Deck {
  id: string
  name: string
  description: string
  cards: string[] // card IDs
  createdAt: string
  lastStudied: string | null
  totalReviews: number
}

interface StudySession {
  currentCardIndex: number
  sessionCards: FlashCard[]
  correctAnswers: number
  incorrectAnswers: number
  startTime: string
  isActive: boolean
}

interface FlashCardStore {
  cards: FlashCard[]
  decks: Deck[]
  currentDeck: string | null
  studySession: StudySession | null
  
  // Card actions
  addCard: (card: Omit<FlashCard, 'id' | 'createdAt' | 'lastReviewed' | 'nextReview' | 'reviewCount' | 'correctCount'>) => void
  updateCard: (id: string, updates: Partial<FlashCard>) => void
  deleteCard: (id: string) => void
  
  // Deck actions
  createDeck: (name: string, description: string) => string
  addCardToDeck: (deckId: string, cardId: string) => void
  removeCardFromDeck: (deckId: string, cardId: string) => void
  deleteDeck: (id: string) => void
  selectDeck: (id: string | null) => void
  
  // Study session actions
  startStudySession: (deckId: string) => void
  endStudySession: () => void
  markCardAsCorrect: (cardId: string) => void
  markCardAsIncorrect: (cardId: string) => void
  nextCard: () => void
  previousCard: () => void
  
  // Utility
  getCardsByDeck: (deckId: string) => FlashCard[]
  getDueCards: () => FlashCard[]
  calculateNextReview: (difficulty: 'easy' | 'medium' | 'hard', isCorrect: boolean) => Date
}

const calculateNextReviewDate = (difficulty: 'easy' | 'medium' | 'hard', isCorrect: boolean): Date => {
  const now = new Date()
  const intervals = {
    easy: isCorrect ? 7 : 1,
    medium: isCorrect ? 3 : 1,
    hard: isCorrect ? 1 : 0
  }
  
  now.setDate(now.getDate() + intervals[difficulty])
  return now
}

export const useFlashCardStore = create<FlashCardStore>()(
  persist(
    (set, get) => ({
      cards: [],
      decks: [],
      currentDeck: null,
      studySession: null,

      addCard: (cardData) => {
        const newCard: FlashCard = {
          ...cardData,
          id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          lastReviewed: null,
          nextReview: new Date().toISOString(),
          reviewCount: 0,
          correctCount: 0
        }
        
        set((state) => ({
          cards: [...state.cards, newCard]
        }))
        
        // Auto-add to current deck if selected
        const { currentDeck } = get()
        if (currentDeck) {
          get().addCardToDeck(currentDeck, newCard.id)
        }
      },

      updateCard: (id, updates) => {
        set((state) => ({
          cards: state.cards.map(card =>
            card.id === id ? { ...card, ...updates } : card
          )
        }))
      },

      deleteCard: (id) => {
        set((state) => ({
          cards: state.cards.filter(card => card.id !== id),
          decks: state.decks.map(deck => ({
            ...deck,
            cards: deck.cards.filter(cardId => cardId !== id)
          }))
        }))
      },

      createDeck: (name, description) => {
        const newDeck: Deck = {
          id: `deck-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name,
          description,
          cards: [],
          createdAt: new Date().toISOString(),
          lastStudied: null,
          totalReviews: 0
        }
        
        set((state) => ({
          decks: [...state.decks, newDeck]
        }))
        
        return newDeck.id
      },

      addCardToDeck: (deckId, cardId) => {
        set((state) => ({
          decks: state.decks.map(deck =>
            deck.id === deckId && !deck.cards.includes(cardId)
              ? { ...deck, cards: [...deck.cards, cardId] }
              : deck
          )
        }))
      },

      removeCardFromDeck: (deckId, cardId) => {
        set((state) => ({
          decks: state.decks.map(deck =>
            deck.id === deckId
              ? { ...deck, cards: deck.cards.filter(id => id !== cardId) }
              : deck
          )
        }))
      },

      deleteDeck: (id) => {
        set((state) => ({
          decks: state.decks.filter(deck => deck.id !== id),
          currentDeck: state.currentDeck === id ? null : state.currentDeck
        }))
      },

      selectDeck: (id) => {
        set({ currentDeck: id })
      },

      startStudySession: (deckId) => {
        const deck = get().decks.find(d => d.id === deckId)
        if (!deck) return
        
        const cards = get().getCardsByDeck(deckId)
        if (cards.length === 0) return
        
        set({
          studySession: {
            currentCardIndex: 0,
            sessionCards: cards,
            correctAnswers: 0,
            incorrectAnswers: 0,
            startTime: new Date().toISOString(),
            isActive: true
          }
        })
        
        // Update deck's last studied time
        set((state) => ({
          decks: state.decks.map(d =>
            d.id === deckId ? { ...d, lastStudied: new Date().toISOString() } : d
          )
        }))
      },

      endStudySession: () => {
        set({ studySession: null })
      },

      markCardAsCorrect: (cardId) => {
        const card = get().cards.find(c => c.id === cardId)
        if (!card) return
        
        const nextReview = calculateNextReviewDate(card.difficulty, true)
        
        set((state) => ({
          cards: state.cards.map(c =>
            c.id === cardId
              ? {
                  ...c,
                  lastReviewed: new Date().toISOString(),
                  nextReview: nextReview.toISOString(),
                  reviewCount: c.reviewCount + 1,
                  correctCount: c.correctCount + 1
                }
              : c
          ),
          studySession: state.studySession
            ? {
                ...state.studySession,
                correctAnswers: state.studySession.correctAnswers + 1
              }
            : null
        }))
      },

      markCardAsIncorrect: (cardId) => {
        const card = get().cards.find(c => c.id === cardId)
        if (!card) return
        
        const nextReview = calculateNextReviewDate(card.difficulty, false)
        
        set((state) => ({
          cards: state.cards.map(c =>
            c.id === cardId
              ? {
                  ...c,
                  lastReviewed: new Date().toISOString(),
                  nextReview: nextReview.toISOString(),
                  reviewCount: c.reviewCount + 1
                }
              : c
          ),
          studySession: state.studySession
            ? {
                ...state.studySession,
                incorrectAnswers: state.studySession.incorrectAnswers + 1
              }
            : null
        }))
      },

      nextCard: () => {
        set((state) => ({
          studySession: state.studySession
            ? {
                ...state.studySession,
                currentCardIndex: Math.min(
                  state.studySession.currentCardIndex + 1,
                  state.studySession.sessionCards.length - 1
                )
              }
            : null
        }))
      },

      previousCard: () => {
        set((state) => ({
          studySession: state.studySession
            ? {
                ...state.studySession,
                currentCardIndex: Math.max(state.studySession.currentCardIndex - 1, 0)
              }
            : null
        }))
      },

      getCardsByDeck: (deckId) => {
        const deck = get().decks.find(d => d.id === deckId)
        if (!deck) return []
        
        return get().cards.filter(card => deck.cards.includes(card.id))
      },

      getDueCards: () => {
        const now = new Date()
        return get().cards.filter(card => {
          if (!card.nextReview) return true
          return new Date(card.nextReview) <= now
        })
      },

      calculateNextReview: calculateNextReviewDate
    }),
    {
      name: 'flash-cards-storage'
    }
  )
)