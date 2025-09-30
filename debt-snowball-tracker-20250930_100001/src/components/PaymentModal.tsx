import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { Debt } from '../types/debt';

interface PaymentModalProps {
  isOpen: boolean;
  debt: Debt | null;
  onClose: () => void;
  onPayment: (amount: number, note?: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  debt, 
  onClose, 
  onPayment 
}) => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [useFullAmount, setUseFullAmount] = useState(false);

  if (!isOpen || !debt) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentAmount = useFullAmount ? debt.balance : parseFloat(amount);
    
    if (paymentAmount <= 0) return;
    
    onPayment(paymentAmount, note || undefined);
    setAmount('');
    setNote('');
    setUseFullAmount(false);
    onClose();
  };

  const handleFullPayment = () => {
    setUseFullAmount(true);
    setAmount(debt.balance.toString());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-slide-up">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">상환하기</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">{debt.name}</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">현재 잔액:</span>
                <span className="font-medium">₩{debt.balance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">최소 상환액:</span>
                <span>₩{debt.minimumPayment.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상환 금액 (원)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setUseFullAmount(false);
                  }}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="상환할 금액 입력"
                  min="0"
                  max={debt.balance}
                  step="1000"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setAmount(debt.minimumPayment.toString());
                  setUseFullAmount(false);
                }}
                className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                최소 상환액
              </button>
              <button
                type="button"
                onClick={handleFullPayment}
                className="flex-1 py-2 px-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
              >
                전액 상환
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                메모 (선택사항)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="예: 보너스로 추가 상환"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              상환하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};