export interface Note {
  id: string;
  duration: 'whole' | 'half' | 'quarter' | 'eighth' | 'sixteenth';
  isRest: boolean;
  timestamp?: number;
}

export interface Pattern {
  id: string;
  name: string;
  tempo: number;
  notes: Note[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface GameState {
  currentPattern: Pattern | null;
  userInput: Note[];
  score: number;
  streak: number;
  isPlaying: boolean;
  isListening: boolean;
  feedback: string;
}

export interface UserProgress {
  completedPatterns: string[];
  totalScore: number;
  bestStreak: number;
  accuracy: number;
}