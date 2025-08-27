import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Subscription, AppState, SpendingInsights, SubscriptionCategory } from '../types';
import { addMonths, addWeeks, addYears, isAfter, isBefore, startOfToday } from 'date-fns';

interface SubscriptionContextType {
  state: AppState;
  addSubscription: (subscription: Omit<Subscription, 'id'>) => void;
  updateSubscription: (id: string, subscription: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  toggleSubscription: (id: string) => void;
  calculateInsights: () => SpendingInsights;
}

type ActionType = 
  | { type: 'ADD_SUBSCRIPTION'; payload: Omit<Subscription, 'id'> }
  | { type: 'UPDATE_SUBSCRIPTION'; payload: { id: string; subscription: Partial<Subscription> } }
  | { type: 'DELETE_SUBSCRIPTION'; payload: string }
  | { type: 'TOGGLE_SUBSCRIPTION'; payload: string }
  | { type: 'SET_SUBSCRIPTIONS'; payload: Subscription[] }
  | { type: 'TOGGLE_DARK_MODE' };

const initialState: AppState = {
  subscriptions: [],
  insights: {
    totalMonthly: 0,
    totalYearly: 0,
    categoryBreakdown: {} as Record<SubscriptionCategory, number>,
    upcomingPayments: [],
    avgMonthlySpend: 0,
    mostExpensive: null
  },
  notifications: {
    enabled: true,
    reminderDays: [3, 1],
    email: false,
    browser: true
  },
  currency: 'USD',
  darkMode: false
};

const subscriptionReducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case 'ADD_SUBSCRIPTION':
      const newSubscription: Subscription = {
        ...action.payload,
        id: crypto.randomUUID(),
      };
      return {
        ...state,
        subscriptions: [...state.subscriptions, newSubscription]
      };
    
    case 'UPDATE_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: state.subscriptions.map(sub => 
          sub.id === action.payload.id 
            ? { ...sub, ...action.payload.subscription }
            : sub
        )
      };
    
    case 'DELETE_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: state.subscriptions.filter(sub => sub.id !== action.payload)
      };
    
    case 'TOGGLE_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: state.subscriptions.map(sub =>
          sub.id === action.payload
            ? { ...sub, isActive: !sub.isActive }
            : sub
        )
      };
    
    case 'SET_SUBSCRIPTIONS':
      return {
        ...state,
        subscriptions: action.payload
      };
    
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode
      };
    
    default:
      return state;
  }
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('subscription-sentinel-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        dispatch({ type: 'SET_SUBSCRIPTIONS', payload: parsed.subscriptions || [] });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage when subscriptions change
  useEffect(() => {
    localStorage.setItem('subscription-sentinel-data', JSON.stringify({
      subscriptions: state.subscriptions,
      notifications: state.notifications,
      currency: state.currency,
      darkMode: state.darkMode
    }));
  }, [state.subscriptions, state.notifications, state.currency, state.darkMode]);

  const addSubscription = (subscription: Omit<Subscription, 'id'>) => {
    dispatch({ type: 'ADD_SUBSCRIPTION', payload: subscription });
  };

  const updateSubscription = (id: string, subscription: Partial<Subscription>) => {
    dispatch({ type: 'UPDATE_SUBSCRIPTION', payload: { id, subscription } });
  };

  const deleteSubscription = (id: string) => {
    dispatch({ type: 'DELETE_SUBSCRIPTION', payload: id });
  };

  const toggleSubscription = (id: string) => {
    dispatch({ type: 'TOGGLE_SUBSCRIPTION', payload: id });
  };

  const calculateInsights = (): SpendingInsights => {
    const activeSubscriptions = state.subscriptions.filter(sub => sub.isActive);
    
    // Calculate monthly costs
    const monthlyTotal = activeSubscriptions.reduce((total, sub) => {
      let monthlyCost = sub.cost;
      if (sub.billingCycle === 'yearly') monthlyCost = sub.cost / 12;
      if (sub.billingCycle === 'weekly') monthlyCost = sub.cost * 4.33; // Average weeks per month
      return total + monthlyCost;
    }, 0);

    // Calculate category breakdown
    const categoryBreakdown = activeSubscriptions.reduce((breakdown, sub) => {
      let monthlyCost = sub.cost;
      if (sub.billingCycle === 'yearly') monthlyCost = sub.cost / 12;
      if (sub.billingCycle === 'weekly') monthlyCost = sub.cost * 4.33;
      
      breakdown[sub.category] = (breakdown[sub.category] || 0) + monthlyCost;
      return breakdown;
    }, {} as Record<SubscriptionCategory, number>);

    // Get upcoming payments (next 30 days)
    const today = startOfToday();
    const thirtyDaysFromNow = addMonths(today, 1);
    
    const upcomingPayments = activeSubscriptions
      .filter(sub => {
        const paymentDate = new Date(sub.nextPayment);
        return isAfter(paymentDate, today) && isBefore(paymentDate, thirtyDaysFromNow);
      })
      .sort((a, b) => new Date(a.nextPayment).getTime() - new Date(b.nextPayment).getTime());

    // Find most expensive subscription
    const mostExpensive = activeSubscriptions.reduce((max, sub) => {
      let monthlyCost = sub.cost;
      if (sub.billingCycle === 'yearly') monthlyCost = sub.cost / 12;
      if (sub.billingCycle === 'weekly') monthlyCost = sub.cost * 4.33;
      
      if (!max) return sub;
      
      let maxMonthlyCost = max.cost;
      if (max.billingCycle === 'yearly') maxMonthlyCost = max.cost / 12;
      if (max.billingCycle === 'weekly') maxMonthlyCost = max.cost * 4.33;
      
      return monthlyCost > maxMonthlyCost ? sub : max;
    }, null as Subscription | null);

    return {
      totalMonthly: monthlyTotal,
      totalYearly: monthlyTotal * 12,
      categoryBreakdown,
      upcomingPayments,
      avgMonthlySpend: monthlyTotal,
      mostExpensive
    };
  };

  const value = {
    state: {
      ...state,
      insights: calculateInsights()
    },
    addSubscription,
    updateSubscription,
    deleteSubscription,
    toggleSubscription,
    calculateInsights
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
};