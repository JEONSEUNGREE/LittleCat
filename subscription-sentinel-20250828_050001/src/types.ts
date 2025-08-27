export interface Subscription {
  id: string;
  name: string;
  description?: string;
  cost: number;
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  nextPayment: string; // ISO date string
  category: SubscriptionCategory;
  isActive: boolean;
  reminderDays: number;
  color?: string;
  website?: string;
  notes?: string;
}

export type SubscriptionCategory = 
  | 'entertainment'
  | 'productivity' 
  | 'utilities'
  | 'health'
  | 'education'
  | 'business'
  | 'lifestyle'
  | 'other';

export interface SpendingInsights {
  totalMonthly: number;
  totalYearly: number;
  categoryBreakdown: Record<SubscriptionCategory, number>;
  upcomingPayments: Subscription[];
  avgMonthlySpend: number;
  mostExpensive: Subscription | null;
}

export interface NotificationSettings {
  enabled: boolean;
  reminderDays: number[];
  email: boolean;
  browser: boolean;
}

export interface AppState {
  subscriptions: Subscription[];
  insights: SpendingInsights;
  notifications: NotificationSettings;
  currency: string;
  darkMode: boolean;
}

export interface SubscriptionFormData {
  name: string;
  description: string;
  cost: number;
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  nextPayment: string;
  category: SubscriptionCategory;
  reminderDays: number;
  color: string;
  website: string;
  notes: string;
}