
import { Debt } from '../types/debt';
import { DollarSign, TrendingDown, CheckCircle2, Trash2 } from 'lucide-react';

interface DebtCardProps {
  debt: Debt;
  isNextTarget: boolean;
  onMakePayment: (debtId: string) => void;
  onDelete: (debtId: string) => void;
}

export const DebtCard: React.FC<DebtCardProps> = ({ 
  debt, 
  isNextTarget, 
  onMakePayment, 
  onDelete 
}) => {
  const progressPercentage = debt.balance > 0 
    ? Math.max(0, Math.min(100, ((debt.balance / (debt.balance + 1000)) * 100)))
    : 0;

  return (
    <div 
      className={`
        relative bg-white rounded-lg shadow-md p-4 mb-4 
        transition-all duration-300 hover:shadow-lg
        ${isNextTarget ? 'ring-2 ring-primary-500 ring-offset-2' : ''}
        ${debt.isPaid ? 'opacity-75' : ''}
      `}
    >
      {isNextTarget && !debt.isPaid && (
        <div className="absolute -top-2 -right-2">
          <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            다음 목표
          </span>
        </div>
      )}

      {debt.isPaid && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg font-semibold ${debt.isPaid ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {debt.name}
        </h3>
        {!debt.isPaid && (
          <button
            onClick={() => onDelete(debt.id)}
            className="text-red-500 hover:text-red-700 transition-colors p-1"
            aria-label="삭제"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">남은 잔액</span>
          <span className="font-bold text-gray-900">
            ₩{debt.balance.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">최소 상환액</span>
          <span className="text-gray-700">
            ₩{debt.minimumPayment.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">이자율</span>
          <span className="text-gray-700">{debt.interestRate}%</span>
        </div>

        {/* Progress Bar */}
        {!debt.isPaid && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-500 animate-progress"
                style={{ 
                  '--progress': `${100 - progressPercentage}%`,
                  width: `${100 - progressPercentage}%` 
                } as React.CSSProperties}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        {!debt.isPaid && (
          <button
            onClick={() => onMakePayment(debt.id)}
            className={`
              w-full mt-3 py-2 px-4 rounded-lg font-medium
              transition-all duration-200 flex items-center justify-center gap-2
              ${isNextTarget 
                ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <DollarSign className="w-4 h-4" />
            상환하기
          </button>
        )}
      </div>
    </div>
  );
};