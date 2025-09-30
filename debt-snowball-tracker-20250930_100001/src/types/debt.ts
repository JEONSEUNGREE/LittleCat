export interface Debt {
  id: string;
  name: string;
  balance: number;
  minimumPayment: number;
  interestRate: number;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentHistory {
  id: string;
  debtId: string;
  amount: number;
  date: Date;
  note?: string;
}

export interface SnowballStats {
  totalDebt: number;
  totalPaid: number;
  remainingDebt: number;
  estimatedPayoffDate: Date | null;
  totalInterestSaved: number;
  nextTarget: Debt | null;
}