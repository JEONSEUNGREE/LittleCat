import { useState } from 'react';
import { useDebtStore } from './store/useDebtStore';
import { DebtCard } from './components/DebtCard';
import { StatsCard } from './components/StatsCard';
import { AddDebtModal } from './components/AddDebtModal';
import { PaymentModal } from './components/PaymentModal';
import { Plus, RefreshCw, Settings, Snowflake } from 'lucide-react';
import { Debt } from './types/debt';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    debts,
    monthlyBudget,
    addDebt,
    deleteDebt,
    makePayment,
    setMonthlyBudget,
    getSnowballStats,
    resetAllData,
  } = useDebtStore();

  const stats = getSnowballStats();
  const activeDebts = debts.filter(d => !d.isPaid);
  const paidDebts = debts.filter(d => d.isPaid);

  const handleMakePayment = (debtId: string) => {
    const debt = debts.find(d => d.id === debtId);
    if (debt) {
      setSelectedDebt(debt);
      setIsPaymentModalOpen(true);
    }
  };

  const handlePaymentSubmit = (amount: number, note?: string) => {
    if (selectedDebt) {
      makePayment(selectedDebt.id, amount, note);
    }
  };

  const handleReset = () => {
    if (window.confirm('모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      resetAllData();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Snowflake className="w-8 h-8 text-primary-500" />
              <h1 className="text-2xl font-bold text-gray-800">
                빚 눈덩이 트래커
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="설정"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="초기화"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white border-b shadow-sm animate-slide-up">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                월 상환 예산:
              </label>
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(parseFloat(e.target.value) || 0)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="500000"
                min="0"
                step="10000"
              />
              <span className="text-sm text-gray-600">원</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Section */}
        {debts.length > 0 && (
          <div className="mb-8">
            <StatsCard stats={stats} />
          </div>
        )}

        {/* Debts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Debts */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                상환 중인 부채 ({activeDebts.length})
              </h2>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">부채 추가</span>
              </button>
            </div>
            
            {activeDebts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Snowflake className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  상환할 부채가 없습니다.
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  첫 부채 추가하기
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeDebts.map((debt, index) => (
                  <DebtCard
                    key={debt.id}
                    debt={debt}
                    isNextTarget={index === 0}
                    onMakePayment={handleMakePayment}
                    onDelete={deleteDebt}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Paid Debts */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              완료된 부채 ({paidDebts.length})
            </h2>
            
            {paidDebts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500">
                  아직 완료된 부채가 없습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {paidDebts.map((debt) => (
                  <DebtCard
                    key={debt.id}
                    debt={debt}
                    isNextTarget={false}
                    onMakePayment={handleMakePayment}
                    onDelete={deleteDebt}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddDebtModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addDebt}
      />
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        debt={selectedDebt}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setSelectedDebt(null);
        }}
        onPayment={handlePaymentSubmit}
      />
    </div>
  );
}

export default App;