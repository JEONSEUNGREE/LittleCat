import React, { useEffect } from 'react'
import { Activity } from 'lucide-react'
import PulseMonitor from './components/PulseMonitor'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import BudgetSettings from './components/BudgetSettings'
import { useBudgetStore } from './store/useBudgetStore'

function App() {
  const addTransaction = useBudgetStore(state => state.addTransaction)
  
  useEffect(() => {
    // Add some sample data for demonstration
    const sampleTransactions = [
      {
        amount: 45.99,
        category: 'Food & Dining',
        description: 'Lunch at restaurant',
        timestamp: new Date(Date.now() - 86400000),
        type: 'expense' as const
      },
      {
        amount: 25.00,
        category: 'Transportation',
        description: 'Gas refill',
        timestamp: new Date(Date.now() - 172800000),
        type: 'expense' as const
      },
      {
        amount: 150.00,
        category: 'Shopping',
        description: 'Grocery shopping',
        timestamp: new Date(Date.now() - 259200000),
        type: 'expense' as const
      }
    ]
    
    // Only add sample data if there are no transactions
    const currentTransactions = useBudgetStore.getState().transactions
    if (currentTransactions.length === 0) {
      sampleTransactions.forEach(transaction => {
        addTransaction(transaction)
      })
    }
  }, [addTransaction])
  
  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md shadow-lg mb-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center sm:justify-start">
            <Activity className="w-8 h-8 text-white mr-3" />
            <h1 className="text-2xl font-bold text-white">Budget Pulse</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Pulse Monitor */}
          <div className="lg:col-span-1">
            <PulseMonitor />
          </div>
          
          {/* Middle Column - Transaction Form & Settings */}
          <div className="lg:col-span-1 space-y-6">
            <TransactionForm />
            <BudgetSettings />
          </div>
          
          {/* Right Column - Transaction List */}
          <div className="lg:col-span-1">
            <TransactionList />
          </div>
        </div>
        
        {/* Mobile-optimized layout for small screens */}
        <style>{`
          @media (max-width: 1023px) {
            .container {
              max-width: 100%;
            }
          }
          
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 3px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
        `}</style>
      </main>
    </div>
  )
}

export default App