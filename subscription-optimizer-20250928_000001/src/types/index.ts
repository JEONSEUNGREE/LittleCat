export interface Subscription {
  id: string;
  name: string;
  category: SubscriptionCategory;
  price: number;
  billingCycle: BillingCycle;
  firstPaymentDate: string;
  nextPaymentDate: string;
  isActive: boolean;
  color: string;
  description?: string;
  cancelUrl?: string;
  reminders: boolean;
}

export type SubscriptionCategory = 
  | 'Entertainment'
  | 'Productivity'
  | 'Education'
  | 'Health & Fitness'
  | 'Food & Delivery'
  | 'Transportation'
  | 'Shopping'
  | 'Finance'
  | 'Cloud Storage'
  | 'Security'
  | 'Other';

export type BillingCycle = 'monthly' | 'yearly' | 'weekly' | 'quarterly';

export interface Budget {
  category: SubscriptionCategory | 'total';
  limit: number;
  spent: number;
  period: 'monthly' | 'yearly';
}

export interface SavingsInsight {
  id: string;
  type: 'duplicate' | 'unused' | 'cheaper_alternative' | 'annual_discount';
  title: string;
  description: string;
  savingsAmount: number;
  priority: 'high' | 'medium' | 'low';
  subscriptions: string[];
}