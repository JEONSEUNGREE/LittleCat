import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Subscription, Budget, SavingsInsight, SubscriptionCategory, BillingCycle } from '../types';

interface SubscriptionStore {
  subscriptions: Subscription[];
  budgets: Budget[];
  insights: SavingsInsight[];
  totalMonthlySpend: number;
  totalYearlySpend: number;
  
  addSubscription: (subscription: Omit<Subscription, 'id' | 'nextPaymentDate'>) => void;
  updateSubscription: (id: string, updates: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  toggleSubscriptionStatus: (id: string) => void;
  
  setBudget: (budget: Budget) => void;
  deleteBudget: (category: SubscriptionCategory | 'total') => void;
  
  calculateSpending: () => void;
  generateInsights: () => void;
  getUpcomingPayments: (days: number) => Subscription[];
}

const calculateNextPayment = (firstDate: string, cycle: BillingCycle): string => {
  const date = new Date(firstDate);
  const now = new Date();
  
  while (date <= now) {
    switch (cycle) {
      case 'weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'quarterly':
        date.setMonth(date.getMonth() + 3);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
  }
  
  return date.toISOString().split('T')[0];
};

const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      subscriptions: [],
      budgets: [],
      insights: [],
      totalMonthlySpend: 0,
      totalYearlySpend: 0,
      
      addSubscription: (subscription) => {
        const id = Date.now().toString();
        const nextPaymentDate = calculateNextPayment(
          subscription.firstPaymentDate,
          subscription.billingCycle
        );
        
        set((state) => ({
          subscriptions: [
            ...state.subscriptions,
            {
              ...subscription,
              id,
              nextPaymentDate,
            },
          ],
        }));
        
        get().calculateSpending();
        get().generateInsights();
      },
      
      updateSubscription: (id, updates) => {
        set((state) => ({
          subscriptions: state.subscriptions.map((sub) =>
            sub.id === id ? { ...sub, ...updates } : sub
          ),
        }));
        
        get().calculateSpending();
        get().generateInsights();
      },
      
      deleteSubscription: (id) => {
        set((state) => ({
          subscriptions: state.subscriptions.filter((sub) => sub.id !== id),
        }));
        
        get().calculateSpending();
        get().generateInsights();
      },
      
      toggleSubscriptionStatus: (id) => {
        set((state) => ({
          subscriptions: state.subscriptions.map((sub) =>
            sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
          ),
        }));
        
        get().calculateSpending();
        get().generateInsights();
      },
      
      setBudget: (budget) => {
        set((state) => ({
          budgets: [
            ...state.budgets.filter((b) => b.category !== budget.category),
            budget,
          ],
        }));
      },
      
      deleteBudget: (category) => {
        set((state) => ({
          budgets: state.budgets.filter((b) => b.category !== category),
        }));
      },
      
      calculateSpending: () => {
        const { subscriptions } = get();
        const activeSubscriptions = subscriptions.filter((s) => s.isActive);
        
        let monthlyTotal = 0;
        let yearlyTotal = 0;
        
        activeSubscriptions.forEach((sub) => {
          let monthlyAmount = 0;
          
          switch (sub.billingCycle) {
            case 'weekly':
              monthlyAmount = sub.price * 4.33;
              break;
            case 'monthly':
              monthlyAmount = sub.price;
              break;
            case 'quarterly':
              monthlyAmount = sub.price / 3;
              break;
            case 'yearly':
              monthlyAmount = sub.price / 12;
              break;
          }
          
          monthlyTotal += monthlyAmount;
          yearlyTotal += monthlyAmount * 12;
        });
        
        set({
          totalMonthlySpend: Math.round(monthlyTotal * 100) / 100,
          totalYearlySpend: Math.round(yearlyTotal * 100) / 100,
        });
      },
      
      generateInsights: () => {
        const { subscriptions } = get();
        const insights: SavingsInsight[] = [];
        
        // Check for duplicate services
        const categoryGroups: Record<string, Subscription[]> = {};
        subscriptions.forEach((sub) => {
          if (!categoryGroups[sub.category]) {
            categoryGroups[sub.category] = [];
          }
          categoryGroups[sub.category].push(sub);
        });
        
        Object.entries(categoryGroups).forEach(([category, subs]) => {
          if (subs.length > 2) {
            const totalCost = subs.reduce((sum, sub) => {
              const monthlyCost = sub.billingCycle === 'monthly' ? sub.price :
                                 sub.billingCycle === 'yearly' ? sub.price / 12 :
                                 sub.billingCycle === 'weekly' ? sub.price * 4.33 :
                                 sub.price / 3;
              return sum + monthlyCost;
            }, 0);
            
            insights.push({
              id: `duplicate-${category}`,
              type: 'duplicate',
              title: `Multiple ${category} Services`,
              description: `You have ${subs.length} ${category} subscriptions. Consider consolidating.`,
              savingsAmount: Math.round(totalCost * 0.3 * 100) / 100,
              priority: 'high',
              subscriptions: subs.map(s => s.id),
            });
          }
        });
        
        // Check for annual discount opportunities
        const monthlySubscriptions = subscriptions.filter(
          (s) => s.billingCycle === 'monthly' && s.price > 10
        );
        
        monthlySubscriptions.forEach((sub) => {
          const potentialSavings = sub.price * 12 * 0.2;
          insights.push({
            id: `annual-${sub.id}`,
            type: 'annual_discount',
            title: `Switch ${sub.name} to Annual`,
            description: `Save approximately 20% by switching to annual billing`,
            savingsAmount: Math.round(potentialSavings * 100) / 100,
            priority: 'medium',
            subscriptions: [sub.id],
          });
        });
        
        set({ insights });
      },
      
      getUpcomingPayments: (days) => {
        const { subscriptions } = get();
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + days);
        
        return subscriptions.filter((sub) => {
          const paymentDate = new Date(sub.nextPaymentDate);
          return sub.isActive && paymentDate >= today && paymentDate <= futureDate;
        }).sort((a, b) => 
          new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime()
        );
      },
    }),
    {
      name: 'subscription-store',
    }
  )
);

export default useSubscriptionStore;