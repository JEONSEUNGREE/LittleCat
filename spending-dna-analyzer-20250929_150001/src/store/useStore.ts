import { create } from 'zustand';
import { Transaction, SpendingDNA, MonthlyStats, FinancialGoal, PersonalityTraits } from '../types';

interface AppState {
  transactions: Transaction[];
  spendingDNA: SpendingDNA | null;
  monthlyStats: MonthlyStats[];
  financialGoals: FinancialGoal[];
  personalityTraits: PersonalityTraits | null;
  selectedPeriod: 'week' | 'month' | 'year';
  isLoading: boolean;
  
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  analyzeSpendingDNA: () => void;
  setSelectedPeriod: (period: 'week' | 'month' | 'year') => void;
  addFinancialGoal: (goal: Omit<FinancialGoal, 'id'>) => void;
  updateGoalProgress: (goalId: string, amount: number) => void;
  calculatePersonalityTraits: () => void;
}

const useStore = create<AppState>((set, get) => ({
  transactions: generateMockTransactions(),
  spendingDNA: null,
  monthlyStats: [],
  financialGoals: generateMockGoals(),
  personalityTraits: null,
  selectedPeriod: 'month',
  isLoading: false,
  
  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
    get().analyzeSpendingDNA();
  },
  
  deleteTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
    get().analyzeSpendingDNA();
  },
  
  analyzeSpendingDNA: () => {
    const { transactions } = get();
    if (transactions.length === 0) return;
    
    // Category frequency analysis
    const categoryCount: Record<string, number> = {};
    let totalExpenses = 0;
    let totalIncome = 0;
    
    transactions.forEach((t) => {
      if (t.type === 'expense') {
        categoryCount[t.category] = (categoryCount[t.category] || 0) + t.amount;
        totalExpenses += t.amount;
      } else {
        totalIncome += t.amount;
      }
    });
    
    const sortedCategories = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a);
    
    const dominantGene = sortedCategories[0]?.[0] || 'balanced';
    const secondaryGene = sortedCategories[1]?.[0] || 'diverse';
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    
    const dna: SpendingDNA = {
      dominantGene,
      secondaryGene,
      riskProfile: savingsRate > 30 ? 'conservative' : savingsRate > 10 ? 'moderate' : 'aggressive',
      savingsRate: Math.max(0, Math.min(100, savingsRate)),
      consistencyScore: calculateConsistencyScore(transactions),
      evolutionTrend: calculateEvolutionTrend(transactions),
    };
    
    set({ spendingDNA: dna });
  },
  
  setSelectedPeriod: (period) => {
    set({ selectedPeriod: period });
  },
  
  addFinancialGoal: (goal) => {
    const newGoal: FinancialGoal = {
      ...goal,
      id: Date.now().toString(),
    };
    set((state) => ({
      financialGoals: [...state.financialGoals, newGoal],
    }));
  },
  
  updateGoalProgress: (goalId, amount) => {
    set((state) => ({
      financialGoals: state.financialGoals.map((g) =>
        g.id === goalId
          ? { ...g, currentAmount: Math.min(g.targetAmount, g.currentAmount + amount) }
          : g
      ),
    }));
  },
  
  calculatePersonalityTraits: () => {
    const { transactions } = get();
    
    const traits: PersonalityTraits = {
      impulsiveness: calculateImpulsiveness(transactions),
      planning: calculatePlanning(transactions),
      frugality: calculateFrugality(transactions),
      investment: calculateInvestmentTendency(transactions),
      generosity: calculateGenerosity(transactions),
    };
    
    set({ personalityTraits: traits });
  },
}));

// Helper functions
function generateMockTransactions(): Transaction[] {
  const categories: Array<Transaction['category']> = [
    'food', 'transport', 'shopping', 'entertainment', 'bills', 'health', 'education', 'savings'
  ];
  
  const mockTransactions: Transaction[] = [];
  const now = new Date();
  
  for (let i = 0; i < 50; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    
    mockTransactions.push({
      id: `mock-${i}`,
      date,
      amount: Math.floor(Math.random() * 50000) + 5000,
      category: categories[Math.floor(Math.random() * categories.length)],
      description: `Transaction ${i + 1}`,
      type: Math.random() > 0.2 ? 'expense' : 'income',
    });
  }
  
  return mockTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());
}

function generateMockGoals(): FinancialGoal[] {
  return [
    {
      id: 'goal-1',
      title: '비상금 마련',
      targetAmount: 5000000,
      currentAmount: 2500000,
      deadline: new Date(2024, 11, 31),
      category: 'emergency',
      priority: 'high',
    },
    {
      id: 'goal-2',
      title: '여행 자금',
      targetAmount: 3000000,
      currentAmount: 800000,
      deadline: new Date(2024, 6, 30),
      category: 'savings',
      priority: 'medium',
    },
  ];
}

function calculateConsistencyScore(transactions: Transaction[]): number {
  // Simple consistency calculation based on spending patterns
  if (transactions.length < 10) return 50;
  
  const amounts = transactions
    .filter(t => t.type === 'expense')
    .map(t => t.amount);
  
  const avg = amounts.reduce((a, b) => a + b, 0) / amounts.length;
  const variance = amounts.reduce((sum, amt) => sum + Math.pow(amt - avg, 2), 0) / amounts.length;
  const stdDev = Math.sqrt(variance);
  
  const consistencyScore = Math.max(0, 100 - (stdDev / avg) * 100);
  return Math.min(100, consistencyScore);
}

function calculateEvolutionTrend(transactions: Transaction[]): 'improving' | 'stable' | 'declining' {
  if (transactions.length < 20) return 'stable';
  
  const recent = transactions.slice(0, 10);
  const older = transactions.slice(10, 20);
  
  const recentAvg = recent
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0) / recent.length;
  
  const olderAvg = older
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0) / older.length;
  
  const change = ((recentAvg - olderAvg) / olderAvg) * 100;
  
  if (change < -10) return 'improving';
  if (change > 10) return 'declining';
  return 'stable';
}

function calculateImpulsiveness(transactions: Transaction[]): number {
  const shoppingAndEntertainment = transactions.filter(
    t => t.type === 'expense' && (t.category === 'shopping' || t.category === 'entertainment')
  );
  return Math.min(100, (shoppingAndEntertainment.length / transactions.length) * 200);
}

function calculatePlanning(transactions: Transaction[]): number {
  const billsAndSavings = transactions.filter(
    t => t.category === 'bills' || t.category === 'savings' || t.category === 'investment'
  );
  return Math.min(100, (billsAndSavings.length / transactions.length) * 150);
}

function calculateFrugality(transactions: Transaction[]): number {
  const expenses = transactions.filter(t => t.type === 'expense');
  const income = transactions.filter(t => t.type === 'income');
  
  if (income.length === 0) return 50;
  
  const expenseTotal = expenses.reduce((sum, t) => sum + t.amount, 0);
  const incomeTotal = income.reduce((sum, t) => sum + t.amount, 0);
  
  const savingsRatio = 1 - (expenseTotal / incomeTotal);
  return Math.min(100, Math.max(0, savingsRatio * 150));
}

function calculateInvestmentTendency(transactions: Transaction[]): number {
  const investments = transactions.filter(t => t.category === 'investment');
  return Math.min(100, (investments.length / transactions.length) * 300);
}

function calculateGenerosity(transactions: Transaction[]): number {
  // Simplified - could be based on gift/donation categories
  return Math.floor(Math.random() * 40 + 30);
}

export default useStore;