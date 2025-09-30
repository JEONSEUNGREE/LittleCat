import React, { useState } from 'react';
import { BarChart3, ListTodo, Menu, X } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'tasks'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Daily Impact</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeView === 'dashboard'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </span>
              </button>
              <button
                onClick={() => setActiveView('tasks')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeView === 'tasks'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <ListTodo className="w-4 h-4" />
                  Tasks
                </span>
              </button>
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setActiveView('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors text-left ${
                  activeView === 'dashboard'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveView('tasks');
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors text-left mt-1 ${
                  activeView === 'tasks'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <ListTodo className="w-4 h-4" />
                  Tasks
                </span>
              </button>
            </nav>
          )}
        </div>
      </header>
      
      <main className="container mx-auto max-w-6xl">
        {activeView === 'dashboard' ? <Dashboard /> : <TaskList />}
      </main>
      
      <TaskInput />
    </div>
  );
}

export default App;