import React from 'react'
import { Calculator } from 'lucide-react'
import CategorySelector from './components/CategorySelector'
import ConverterPanel from './components/ConverterPanel'
import HistoryPanel from './components/HistoryPanel'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 pt-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-blue-500 text-white rounded-xl shadow-lg">
              <Calculator size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Unit Converter Pro
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Convert between units instantly
          </p>
        </header>
        
        {/* Main Content */}
        <div className="space-y-4">
          {/* Category Selector */}
          <CategorySelector />
          
          {/* Converter and History Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <ConverterPanel />
            <HistoryPanel />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center mt-8 pb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Unit Converter Pro • All units are approximate
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App