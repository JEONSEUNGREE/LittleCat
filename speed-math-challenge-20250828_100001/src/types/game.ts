export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type Operation = '+' | '-' | '*' | '/';

export interface MathProblem {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  userAnswer?: number;
  isCorrect?: boolean;
  timeToSolve?: number;
}

export interface GameStats {
  score: number;
  streak: number;
  bestStreak: number;
  totalProblems: number;
  correctAnswers: number;
  averageTime: number;
  level: number;
}