import React, { useEffect, useState } from 'react'
import { Plus, Receipt } from 'lucide-react'
import Header from './components/Header'
import BillForm from './components/BillForm'
import SplitSummary from './components/SplitSummary'
import BillHistory from './components/BillHistory'
import { useBillStore, Bill } from './store/useBillStore'

function App() {
  const { currentBill, setCurrentBill, addBill } = useBillStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState<'current' | 'history'>('current')
  
  useEffect(() => {
    // Initialize with an empty bill if no current bill
    if (!currentBill) {
      const newBill: Bill = {
        id: Date.now().toString(),
        title: '',
        totalAmount: 0,
        tax: 0,
        tip: 0,
        date: new Date().toISOString(),
        people: [],
        items: [],
        settled: false
      }
      setCurrentBill(newBill)
    }
  }, [currentBill, setCurrentBill])
  
  const handleNewBill = () => {
    // Save current bill if it has content
    if (currentBill && (currentBill.people.length > 0 || currentBill.items.length > 0)) {
      const subtotal = currentBill.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const total = subtotal + currentBill.tax + currentBill.tip
      addBill({
        ...currentBill,
        totalAmount: total
      })
    }
    
    // Create new bill
    const newBill: Bill = {
      id: Date.now().toString(),
      title: '',
      totalAmount: 0,
      tax: 0,
      tip: 0,
      date: new Date().toISOString(),
      people: [],
      items: [],
      settled: false
    }
    setCurrentBill(newBill)
    setActiveView('current')
  }
  
  const handleSaveBill = () => {
    if (currentBill && (currentBill.people.length > 0 || currentBill.items.length > 0)) {
      const subtotal = currentBill.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const total = subtotal + currentBill.tax + currentBill.tip
      addBill({
        ...currentBill,
        totalAmount: total,
        settled: true
      })
      
      // Create new bill after saving
      handleNewBill()
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Mobile Tab Bar */}
        <div className="md:hidden mb-6">
          <div className="flex gap-2 p-1 bg-white dark:bg-gray-800 rounded-lg shadow">
            <button
              onClick={() => setActiveView('current')}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-colors ${
                activeView === 'current'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Current Bill
            </button>
            <button
              onClick={() => setActiveView('history')}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-colors ${
                activeView === 'history'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              History
            </button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleNewBill}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            New Bill
          </button>
          
          {currentBill && (currentBill.people.length > 0 || currentBill.items.length > 0) && (
            <button
              onClick={handleSaveBill}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Receipt className="w-5 h-5" />
              Save & Settle
            </button>
          )}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Bill Section - Mobile Responsive */}
          <div className={`lg:col-span-2 space-y-6 ${activeView === 'history' ? 'hidden md:block' : ''}`}>
            <BillForm />
            <SplitSummary />
          </div>
          
          {/* History Section - Mobile Responsive */}
          <div className={`lg:col-span-1 ${activeView === 'current' ? 'hidden md:block' : ''}`}>
            <BillHistory />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App