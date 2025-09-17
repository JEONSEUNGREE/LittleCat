import { create } from 'zustand';
import { GameState, FlipResult, Achievement, InvestmentStrategy, RiskLevel } from '../types';

const INITIAL_BALANCE = 1000;

const initialAchievements: Achievement[] = [
  { id: 'first_win', title: '첫 승리', description: '첫 번째 동전 던지기에서 승리', icon: '🎯', unlocked: false },
  { id: 'streak_5', title: '연승 마스터', description: '5연승 달성', icon: '🔥', unlocked: false },
  { id: 'double_money', title: '자산 배증', description: '초기 자본의 2배 달성', icon: '💰', unlocked: false },
  { id: 'risk_taker', title: '위험 감수자', description: '총 자산의 50% 이상 베팅', icon: '🎲', unlocked: false },
  { id: 'survivor', title: '생존자', description: '파산 직전에서 회복', icon: '🛡️', unlocked: false },
  { id: 'strategist', title: '전략가', description: '모든 전략 시도', icon: '🧠', unlocked: false },
];

interface GameStore extends GameState {
  setBetAmount: (amount: number) => void;
  setStrategy: (strategy: InvestmentStrategy) => void;
  setRiskLevel: (level: RiskLevel) => void;
  flipCoin: (choice: 'heads' | 'tails') => Promise<void>;
  resetGame: () => void;
  getStats: () => {
    winRate: number;
    averageReturn: number;
    totalProfit: number;
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  balance: INITIAL_BALANCE,
  betAmount: 50,
  currentRound: 0,
  totalRounds: 0,
  winStreak: 0,
  lossStreak: 0,
  maxBalance: INITIAL_BALANCE,
  minBalance: INITIAL_BALANCE,
  history: [],
  isFlipping: false,
  strategy: 'moderate',
  riskLevel: 'medium',
  achievements: initialAchievements,

  setBetAmount: (amount: number) => set({ betAmount: amount }),
  setStrategy: (strategy: InvestmentStrategy) => set({ strategy }),
  setRiskLevel: (level: RiskLevel) => set({ riskLevel: level }),

  flipCoin: async (choice: 'heads' | 'tails') => {
    const state = get();
    if (state.isFlipping || state.balance < state.betAmount) return;

    set({ isFlipping: true });

    // Simulate flip animation
    await new Promise(resolve => setTimeout(resolve, 600));

    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const won = result === choice;
    const newBalance = won 
      ? state.balance + state.betAmount 
      : state.balance - state.betAmount;

    const flipResult: FlipResult = {
      round: state.currentRound + 1,
      choice,
      result,
      won,
      betAmount: state.betAmount,
      balanceAfter: newBalance,
      timestamp: Date.now(),
    };

    const newWinStreak = won ? state.winStreak + 1 : 0;
    const newLossStreak = won ? 0 : state.lossStreak + 1;
    const newMaxBalance = Math.max(state.maxBalance, newBalance);
    const newMinBalance = Math.min(state.minBalance, newBalance);

    // Check achievements
    const newAchievements = [...state.achievements];
    
    if (won && state.totalRounds === 0) {
      const firstWin = newAchievements.find(a => a.id === 'first_win');
      if (firstWin && !firstWin.unlocked) {
        firstWin.unlocked = true;
        firstWin.unlockedAt = Date.now();
      }
    }

    if (newWinStreak >= 5) {
      const streak5 = newAchievements.find(a => a.id === 'streak_5');
      if (streak5 && !streak5.unlocked) {
        streak5.unlocked = true;
        streak5.unlockedAt = Date.now();
      }
    }

    if (newBalance >= INITIAL_BALANCE * 2) {
      const doubleMoney = newAchievements.find(a => a.id === 'double_money');
      if (doubleMoney && !doubleMoney.unlocked) {
        doubleMoney.unlocked = true;
        doubleMoney.unlockedAt = Date.now();
      }
    }

    if (state.betAmount >= state.balance * 0.5) {
      const riskTaker = newAchievements.find(a => a.id === 'risk_taker');
      if (riskTaker && !riskTaker.unlocked) {
        riskTaker.unlocked = true;
        riskTaker.unlockedAt = Date.now();
      }
    }

    if (state.balance <= 100 && newBalance >= 500) {
      const survivor = newAchievements.find(a => a.id === 'survivor');
      if (survivor && !survivor.unlocked) {
        survivor.unlocked = true;
        survivor.unlockedAt = Date.now();
      }
    }

    // Apply strategy for next bet
    let nextBetAmount = state.betAmount;
    switch (state.strategy) {
      case 'martingale':
        nextBetAmount = won ? 50 : Math.min(state.betAmount * 2, newBalance);
        break;
      case 'anti-martingale':
        nextBetAmount = won ? Math.min(state.betAmount * 1.5, newBalance * 0.3) : 50;
        break;
      case 'conservative':
        nextBetAmount = Math.min(50, newBalance * 0.1);
        break;
      case 'aggressive':
        nextBetAmount = Math.min(newBalance * 0.4, newBalance);
        break;
      default: // moderate
        nextBetAmount = Math.min(newBalance * 0.2, newBalance);
    }

    set({
      balance: newBalance,
      betAmount: Math.max(10, Math.floor(nextBetAmount)),
      currentRound: state.currentRound + 1,
      totalRounds: state.totalRounds + 1,
      winStreak: newWinStreak,
      lossStreak: newLossStreak,
      maxBalance: newMaxBalance,
      minBalance: newMinBalance,
      history: [...state.history, flipResult],
      isFlipping: false,
      achievements: newAchievements,
    });
  },

  resetGame: () => set({
    balance: INITIAL_BALANCE,
    betAmount: 50,
    currentRound: 0,
    totalRounds: 0,
    winStreak: 0,
    lossStreak: 0,
    maxBalance: INITIAL_BALANCE,
    minBalance: INITIAL_BALANCE,
    history: [],
    isFlipping: false,
    strategy: 'moderate',
    riskLevel: 'medium',
  }),

  getStats: () => {
    const state = get();
    const wins = state.history.filter(h => h.won).length;
    const losses = state.history.filter(h => !h.won).length;
    const winRate = state.history.length > 0 ? (wins / state.history.length) * 100 : 0;
    const totalProfit = state.balance - INITIAL_BALANCE;
    const averageReturn = state.history.length > 0
      ? totalProfit / state.history.length
      : 0;

    return {
      winRate,
      averageReturn,
      totalProfit,
    };
  },
}));