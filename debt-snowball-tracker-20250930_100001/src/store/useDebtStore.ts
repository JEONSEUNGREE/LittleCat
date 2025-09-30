import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Debt, PaymentHistory, SnowballStats } from '../types/debt';

interface DebtStore {
  debts: Debt[];
  paymentHistory: PaymentHistory[];
  monthlyBudget: number;
  
  // Actions
  addDebt: (debt: Omit<Debt, 'id' | 'isPaid' | 'createdAt' | 'updatedAt'>) => void;
  updateDebt: (id: string, debt: Partial<Debt>) => void;
  deleteDebt: (id: string) => void;
  makePayment: (debtId: string, amount: number, note?: string) => void;
  setMonthlyBudget: (amount: number) => void;
  getSnowballStats: () => SnowballStats;
  resetAllData: () => void;
}

export const useDebtStore = create<DebtStore>()(
  persist(
    (set, get) => ({
      debts: [],
      paymentHistory: [],
      monthlyBudget: 0,

      addDebt: (debtData) => {
        const newDebt: Debt = {
          ...debtData,
          id: `debt-${Date.now()}`,
          isPaid: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          debts: [...state.debts, newDebt].sort((a, b) => a.balance - b.balance),
        }));
      },

      updateDebt: (id, debtData) => {
        set((state) => ({
          debts: state.debts.map((debt) =>
            debt.id === id
              ? { ...debt, ...debtData, updatedAt: new Date() }
              : debt
          ).sort((a, b) => a.balance - b.balance),
        }));
      },

      deleteDebt: (id) => {
        set((state) => ({
          debts: state.debts.filter((debt) => debt.id !== id),
          paymentHistory: state.paymentHistory.filter((payment) => payment.debtId !== id),
        }));
      },

      makePayment: (debtId, amount, note) => {
        const payment: PaymentHistory = {
          id: `payment-${Date.now()}`,
          debtId,
          amount,
          date: new Date(),
          note,
        };

        set((state) => {
          const updatedDebts = state.debts.map((debt) => {
            if (debt.id === debtId) {
              const newBalance = Math.max(0, debt.balance - amount);
              return {
                ...debt,
                balance: newBalance,
                isPaid: newBalance === 0,
                updatedAt: new Date(),
              };
            }
            return debt;
          }).sort((a, b) => {
            if (a.isPaid && !b.isPaid) return 1;
            if (!a.isPaid && b.isPaid) return -1;
            return a.balance - b.balance;
          });

          return {
            debts: updatedDebts,
            paymentHistory: [...state.paymentHistory, payment],
          };
        });
      },

      setMonthlyBudget: (amount) => {
        set({ monthlyBudget: amount });
      },

      getSnowballStats: () => {
        const state = get();
        const activeDebts = state.debts.filter(d => !d.isPaid);
        const paidDebts = state.debts.filter(d => d.isPaid);
        
        const totalDebt = state.debts.reduce((sum, debt) => {
          const payments = state.paymentHistory
            .filter(p => p.debtId === debt.id)
            .reduce((pSum, p) => pSum + p.amount, 0);
          return sum + debt.balance + payments;
        }, 0);

        const totalPaid = state.paymentHistory.reduce((sum, p) => sum + p.amount, 0);
        const remainingDebt = activeDebts.reduce((sum, d) => sum + d.balance, 0);
        
        // Calculate estimated payoff date
        let estimatedPayoffDate: Date | null = null;
        if (state.monthlyBudget > 0 && remainingDebt > 0) {
          const monthsToPayoff = Math.ceil(remainingDebt / state.monthlyBudget);
          estimatedPayoffDate = new Date();
          estimatedPayoffDate.setMonth(estimatedPayoffDate.getMonth() + monthsToPayoff);
        }

        // Calculate interest saved (simplified)
        const totalInterestSaved = paidDebts.length * 100; // Simplified calculation

        return {
          totalDebt,
          totalPaid,
          remainingDebt,
          estimatedPayoffDate,
          totalInterestSaved,
          nextTarget: activeDebts[0] || null,
        };
      },

      resetAllData: () => {
        set({ debts: [], paymentHistory: [], monthlyBudget: 0 });
      },
    }),
    {
      name: 'debt-snowball-storage',
    }
  )
);