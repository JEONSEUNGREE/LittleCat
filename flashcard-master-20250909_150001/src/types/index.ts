export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  nextReview?: Date;
  correctCount: number;
  incorrectCount: number;
  streak: number;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  cards: Flashcard[];
  createdAt: Date;
  updatedAt: Date;
  color: string;
  icon: string;
}

export interface StudySession {
  deckId: string;
  startTime: Date;
  endTime?: Date;
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface UserProgress {
  totalCardsStudied: number;
  totalCorrect: number;
  studyStreak: number;
  lastStudyDate?: Date;
  level: number;
  experience: number;
}