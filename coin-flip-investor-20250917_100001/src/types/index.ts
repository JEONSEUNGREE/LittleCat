export interface GameState {
  balance: number;
  betAmount: number;
  currentRound: number;
  totalRounds: number;
  winStreak: number;
  lossStreak: number;
  maxBalance: number;
  minBalance: number;
  history: FlipResult[];
  isFlipping: boolean;
  strategy: InvestmentStrategy;
  riskLevel: RiskLevel;
  achievements: Achievement[];
}

export interface FlipResult {
  round: number;
  choice: 'heads' | 'tails';
  result: 'heads' | 'tails';
  won: boolean;
  betAmount: number;
  balanceAfter: number;
  timestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export type InvestmentStrategy = 'conservative' | 'moderate' | 'aggressive' | 'martingale' | 'anti-martingale';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Stats {
  totalGames: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  averageReturn: number;
  bestStreak: number;
  worstStreak: number;
  totalProfit: number;
}