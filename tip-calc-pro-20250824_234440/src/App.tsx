import { Calculator } from 'lucide-react'
import BillInput from './components/BillInput'
import TipSelector from './components/TipSelector'
import ResultDisplay from './components/ResultDisplay'
import History from './components/History'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center py-6 mb-6">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Tip Calculator Pro
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Smart tip calculations with international standards
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BillInput />
            <TipSelector />
            <History />
          </div>
          
          <div className="lg:col-span-1">
            <ResultDisplay />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App