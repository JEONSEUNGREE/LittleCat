import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import FormulaCard from './components/FormulaCard';
import FilterBar from './components/FilterBar';
import StatsPanel from './components/StatsPanel';
import { useFormulaStore } from './store/formulaStore';

function App() {
  const { getFilteredFormulas } = useFormulaStore();
  const filteredFormulas = getFilteredFormulas();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Formula Master</h1>
                <p className="text-sm text-gray-600">Master math, physics & chemistry formulas</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-indigo-600">
              <Sparkles className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Interactive Learning</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Panel */}
        <StatsPanel />
        
        {/* Filter Bar */}
        <FilterBar />
        
        {/* Formula Cards Grid */}
        {filteredFormulas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFormulas.map(formula => (
              <FormulaCard key={formula.id} formula={formula} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-gray-400 mb-4">
              <Brain className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No formulas found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-600">
        <p>© 2024 Formula Master - Interactive Learning Platform</p>
      </footer>
    </div>
  );
}

export default App;