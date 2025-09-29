export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  category: SpendingCategory;
  description: string;
  type: 'income' | 'expense';
}

export type SpendingCategory = 
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'bills'
  | 'health'
  | 'education'
  | 'savings'
  | 'investment'
  | 'other';

export interface SpendingDNA {
  dominantGene: string; // 주요 지출 성향
  secondaryGene: string; // 부차적 지출 성향
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  savingsRate: number; // 저축률 %
  consistencyScore: number; // 일관성 점수 0-100
  evolutionTrend: 'improving' | 'stable' | 'declining';
}

export interface MonthlyStats {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  categoryBreakdown: {
    category: SpendingCategory;
    amount: number;
    percentage: number;
  }[];
}

export interface PersonalityTraits {
  impulsiveness: number; // 0-100
  planning: number; // 0-100
  frugality: number; // 0-100
  investment: number; // 0-100
  generosity: number; // 0-100
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: 'savings' | 'investment' | 'purchase' | 'emergency';
  priority: 'high' | 'medium' | 'low';
}