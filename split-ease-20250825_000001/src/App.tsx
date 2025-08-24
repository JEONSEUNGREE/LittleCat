import { useState } from 'react'
import { Calculator, Users, Receipt, DollarSign, Percent, UserPlus, RotateCcw } from 'lucide-react'
import BillInput from './components/BillInput'
import PeopleList from './components/PeopleList'
import SplitSummary from './components/SplitSummary'
import TipCalculator from './components/TipCalculator'
import useBillStore from './store/useBillStore'

function App() {
  const [activeTab, setActiveTab] = useState<'bill' | 'people' | 'summary'>('bill')
  const { reset, people, totalAmount } = useBillStore()

  const tabs = [
    { id: 'bill', label: '금액 입력', icon: <Calculator className="w-5 h-5" /> },
    { id: 'people', label: '인원 관리', icon: <Users className="w-5 h-5" /> },
    { id: 'summary', label: '정산 요약', icon: <Receipt className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-md mx-auto">
        <header className="text-white text-center py-6 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-2">
            <DollarSign className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Split Ease</h1>
          </div>
          <p className="text-white/80">간편한 더치페이 계산기</p>
        </header>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-3 transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6 min-h-[400px]">
            {activeTab === 'bill' && (
              <div className="space-y-6 animate-fade-in">
                <BillInput />
                <TipCalculator />
              </div>
            )}
            
            {activeTab === 'people' && (
              <div className="animate-fade-in">
                <PeopleList />
              </div>
            )}
            
            {activeTab === 'summary' && (
              <div className="animate-fade-in">
                <SplitSummary />
              </div>
            )}
          </div>

          {(totalAmount > 0 || people.length > 0) && (
            <div className="border-t border-gray-200 p-4">
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>초기화</span>
              </button>
            </div>
          )}
        </div>

        <footer className="text-center text-white/70 text-sm mt-6">
          <p>© 2025 Split Ease - 스마트한 정산의 시작</p>
        </footer>
      </div>
    </div>
  )
}

export default App