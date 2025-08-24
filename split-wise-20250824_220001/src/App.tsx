import { useState } from 'react'
import { Calculator, List, PlusCircle, TrendingUp } from 'lucide-react'
import BillForm from './components/BillForm'
import BillList from './components/BillList'
import useBillStore from './store/useBillStore'

function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form')
  const { bills } = useBillStore()

  const totalAmount = bills.reduce((sum, bill) => sum + bill.totalAmount, 0)
  const totalParticipants = new Set(bills.flatMap(bill => bill.participants.map(p => p.name))).size

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <Calculator className="w-10 h-10 md:w-12 md:h-12" />
            Split Wise
          </h1>
          <p className="text-white/90 text-lg">
            스마트한 정산으로 깔끔한 관계를 유지하세요
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center py-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl font-bold gradient-text">{bills.length}</div>
            <div className="text-sm text-gray-600 mt-1">총 정산</div>
          </div>
          <div className="card text-center py-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold gradient-text">{totalParticipants}</div>
            <div className="text-sm text-gray-600 mt-1">참여자</div>
          </div>
          <div className="card text-center py-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-2xl font-bold gradient-text">
              {new Intl.NumberFormat('ko-KR', { 
                style: 'currency', 
                currency: 'KRW',
                notation: 'compact',
                maximumFractionDigits: 0
              }).format(totalAmount)}
            </div>
            <div className="text-sm text-gray-600 mt-1">총 금액</div>
          </div>
          <div className="card text-center py-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-2xl font-bold gradient-text">
              {bills.length > 0 
                ? new Intl.NumberFormat('ko-KR', { 
                    style: 'currency', 
                    currency: 'KRW',
                    notation: 'compact',
                    maximumFractionDigits: 0
                  }).format(totalAmount / bills.length)
                : '₩0'
              }
            </div>
            <div className="text-sm text-gray-600 mt-1">평균 정산</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'form'
                ? 'bg-white text-primary-600 shadow-xl'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            새 정산
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'list'
                ? 'bg-white text-primary-600 shadow-xl'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <List className="w-5 h-5" />
            정산 목록
            {bills.length > 0 && (
              <span className="ml-2 px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                {bills.length}
              </span>
            )}
          </button>
        </div>

        {/* Main Content */}
        <main>
          {activeTab === 'form' ? <BillForm /> : <BillList />}
        </main>

        {/* Footer */}
        <footer className="text-center text-white/70 text-sm mt-12">
          <p>© 2024 Split Wise - Smart Bill Splitting</p>
          <p className="mt-2 flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4" />
            공정한 정산으로 더 나은 관계를
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App