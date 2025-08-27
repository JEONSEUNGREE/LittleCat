import React, { useState } from 'react';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Dashboard from './components/Dashboard';
import AddSubscription from './components/AddSubscription';
import Header from './components/Header';
import { Plus, Shield } from 'lucide-react';

type ViewType = 'dashboard' | 'add-subscription' | 'insights';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <Header currentView={currentView} onViewChange={setCurrentView} />
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section - Only show on dashboard */}
          {currentView === 'dashboard' && (
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Shield className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Subscription Sentinel
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Take control of your subscriptions. Track spending, get renewal reminders, and optimize your monthly expenses.
              </p>
            </div>
          )}

          {/* View Content */}
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'add-subscription' && <AddSubscription onBack={() => setCurrentView('dashboard')} />}
          {currentView === 'insights' && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Insights Coming Soon</h2>
              <p className="text-gray-600">Advanced analytics and spending insights will be available here.</p>
            </div>
          )}

          {/* Floating Add Button - Only show on dashboard */}
          {currentView === 'dashboard' && (
            <button
              onClick={() => setCurrentView('add-subscription')}
              className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-10"
              aria-label="Add new subscription"
            >
              <Plus className="h-6 w-6" />
            </button>
          )}
        </main>

        {/* Background decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>
    </SubscriptionProvider>
  );
}

export default App;