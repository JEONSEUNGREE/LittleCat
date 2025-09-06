import { useState } from 'react'
import { Calculator, Users, Receipt, Settings, Trash2, RefreshCw } from 'lucide-react'
import useBillStore from './store/billStore'
import PeopleManager from './components/PeopleManager'
import ItemManager from './components/ItemManager'
import BillSummary from './components/BillSummary'
import SettingsPanel from './components/SettingsPanel'

function App() {
  const [activeTab, setActiveTab] = useState<'people' | 'items' | 'summary' | 'settings'>('people')
  const { reset, totalBill, people } = useBillStore()

  const tabs = [
    { id: 'people', label: '참가자', icon: Users },
    { id: 'items', label: '항목', icon: Receipt },
    { id: 'summary', label: '정산', icon: Calculator },
    { id: 'settings', label: '설정', icon: Settings }
  ] as const

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <header className="mb-8 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Calculator className="w-10 h-10 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-800">Split Bill Genius</h1>
          </div>
          <p className="text-gray-600">스마트한 더치페이 계산기</p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 animate-slide-up">
          <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">총 금액</p>
            <p className="text-2xl font-bold text-primary-600">
              ₩{totalBill.toLocaleString('ko-KR')}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">참가자</p>
            <p className="text-2xl font-bold text-secondary-600">{people.length}명</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                activeTab === id
                  ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-6 min-h-[400px] animate-fade-in">
          {activeTab === 'people' && <PeopleManager />}
          {activeTab === 'items' && <ItemManager />}
          {activeTab === 'summary' && <BillSummary />}
          {activeTab === 'settings' && <SettingsPanel />}
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (confirm('모든 데이터를 초기화하시겠습니까?')) {
                reset()
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-lg active:scale-95 transform"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="font-medium">초기화</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App