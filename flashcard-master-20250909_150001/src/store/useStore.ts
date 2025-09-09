import { create } from 'zustand';
import { Flashcard, Deck, StudySession, UserProgress } from '../types';

interface AppState {
  // Decks
  decks: Deck[];
  currentDeck: Deck | null;
  
  // Study Session
  currentSession: StudySession | null;
  currentCard: Flashcard | null;
  currentCardIndex: number;
  showAnswer: boolean;
  
  // User Progress
  userProgress: UserProgress;
  
  // Actions
  addDeck: (deck: Omit<Deck, 'id' | 'createdAt' | 'updatedAt'>) => void;
  selectDeck: (deckId: string) => void;
  addCard: (deckId: string, card: Omit<Flashcard, 'id' | 'correctCount' | 'incorrectCount' | 'streak'>) => void;
  deleteCard: (deckId: string, cardId: string) => void;
  startStudySession: (deckId: string) => void;
  flipCard: () => void;
  markAnswer: (correct: boolean) => void;
  nextCard: () => void;
  endSession: () => void;
  resetProgress: () => void;
}

const initialProgress: UserProgress = {
  totalCardsStudied: 0,
  totalCorrect: 0,
  studyStreak: 0,
  level: 1,
  experience: 0,
};

const sampleDecks: Deck[] = [
  {
    id: '1',
    name: '기초 영어 단어',
    description: '일상생활에서 자주 사용하는 영어 단어',
    color: 'bg-blue-500',
    icon: '📚',
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [
      {
        id: '1-1',
        question: 'Apple',
        answer: '사과',
        category: 'Fruits',
        difficulty: 'easy',
        correctCount: 0,
        incorrectCount: 0,
        streak: 0,
      },
      {
        id: '1-2',
        question: 'Water',
        answer: '물',
        category: 'Basic',
        difficulty: 'easy',
        correctCount: 0,
        incorrectCount: 0,
        streak: 0,
      },
      {
        id: '1-3',
        question: 'Computer',
        answer: '컴퓨터',
        category: 'Technology',
        difficulty: 'easy',
        correctCount: 0,
        incorrectCount: 0,
        streak: 0,
      },
    ],
  },
  {
    id: '2',
    name: '한국사 핵심',
    description: '한국사 시험 대비 핵심 내용',
    color: 'bg-green-500',
    icon: '🏛️',
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [
      {
        id: '2-1',
        question: '조선의 건국 년도는?',
        answer: '1392년',
        category: 'History',
        difficulty: 'medium',
        correctCount: 0,
        incorrectCount: 0,
        streak: 0,
      },
      {
        id: '2-2',
        question: '세종대왕이 창제한 것은?',
        answer: '한글 (훈민정음)',
        category: 'History',
        difficulty: 'easy',
        correctCount: 0,
        incorrectCount: 0,
        streak: 0,
      },
    ],
  },
];

export const useStore = create<AppState>((set, get) => ({
      decks: sampleDecks,
      currentDeck: null,
      currentSession: null,
      currentCard: null,
      currentCardIndex: 0,
      showAnswer: false,
      userProgress: initialProgress,

      addDeck: (deckData) => {
        const newDeck: Deck = {
          ...deckData,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          cards: [],
        };
        set((state) => ({ decks: [...state.decks, newDeck] }));
      },

      selectDeck: (deckId) => {
        const deck = get().decks.find((d) => d.id === deckId);
        if (deck) {
          set({ currentDeck: deck });
        }
      },

      addCard: (deckId, cardData) => {
        const newCard: Flashcard = {
          ...cardData,
          id: `${deckId}-${Date.now()}`,
          correctCount: 0,
          incorrectCount: 0,
          streak: 0,
        };
        
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId
              ? { ...deck, cards: [...deck.cards, newCard], updatedAt: new Date() }
              : deck
          ),
        }));
      },

      deleteCard: (deckId, cardId) => {
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId
              ? {
                  ...deck,
                  cards: deck.cards.filter((card) => card.id !== cardId),
                  updatedAt: new Date(),
                }
              : deck
          ),
        }));
      },

      startStudySession: (deckId) => {
        const deck = get().decks.find((d) => d.id === deckId);
        if (!deck || deck.cards.length === 0) return;

        const session: StudySession = {
          deckId,
          startTime: new Date(),
          cardsStudied: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
        };

        set({
          currentSession: session,
          currentDeck: deck,
          currentCard: deck.cards[0],
          currentCardIndex: 0,
          showAnswer: false,
        });
      },

      flipCard: () => {
        set((state) => ({ showAnswer: !state.showAnswer }));
      },

      markAnswer: (correct) => {
        const { currentSession, currentCard, currentDeck, userProgress } = get();
        if (!currentSession || !currentCard || !currentDeck) return;

        // Update card statistics
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === currentDeck.id
              ? {
                  ...deck,
                  cards: deck.cards.map((card) =>
                    card.id === currentCard.id
                      ? {
                          ...card,
                          correctCount: correct ? card.correctCount + 1 : card.correctCount,
                          incorrectCount: correct ? card.incorrectCount : card.incorrectCount + 1,
                          streak: correct ? card.streak + 1 : 0,
                          lastReviewed: new Date(),
                        }
                      : card
                  ),
                }
              : deck
          ),
          currentSession: {
            ...currentSession,
            cardsStudied: currentSession.cardsStudied + 1,
            correctAnswers: correct ? currentSession.correctAnswers + 1 : currentSession.correctAnswers,
            incorrectAnswers: correct ? currentSession.incorrectAnswers : currentSession.incorrectAnswers + 1,
          },
          userProgress: {
            ...userProgress,
            totalCardsStudied: userProgress.totalCardsStudied + 1,
            totalCorrect: correct ? userProgress.totalCorrect + 1 : userProgress.totalCorrect,
            experience: userProgress.experience + (correct ? 10 : 5),
            level: Math.floor((userProgress.experience + (correct ? 10 : 5)) / 100) + 1,
          },
        }));
      },

      nextCard: () => {
        const { currentDeck, currentCardIndex } = get();
        if (!currentDeck) return;

        const nextIndex = currentCardIndex + 1;
        
        if (nextIndex < currentDeck.cards.length) {
          set({
            currentCard: currentDeck.cards[nextIndex],
            currentCardIndex: nextIndex,
            showAnswer: false,
          });
        } else {
          // Session complete
          get().endSession();
        }
      },

      endSession: () => {
        const { currentSession, userProgress } = get();
        if (!currentSession) return;

        const today = new Date().toDateString();
        const lastStudy = userProgress.lastStudyDate?.toDateString();
        const newStreak = today === lastStudy ? userProgress.studyStreak : userProgress.studyStreak + 1;

        set({
          currentSession: null,
          currentCard: null,
          currentCardIndex: 0,
          showAnswer: false,
          userProgress: {
            ...userProgress,
            studyStreak: newStreak,
            lastStudyDate: new Date(),
          },
        });
      },

      resetProgress: () => {
        set({ userProgress: initialProgress });
      },
    }));