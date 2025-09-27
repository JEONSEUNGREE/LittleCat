import React, { useState, useEffect } from 'react';
import { Plus, CreditCard, Menu, X, TrendingUp } from 'lucide-react';
import Dashboard from './components/Dashboard';
import SubscriptionList from './components/SubscriptionList';
import AddSubscriptionForm from './components/AddSubscriptionForm';
import InsightsPanel from './components/InsightsPanel';
import useSubscriptionStore from './store/subscriptionStore';
import { Subscription } from './types';

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'subscriptions' | 'insights'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { calculateSpending, generateInsights } = useSubscriptionStore();
  
  useEffect(() => {
    calculateSpending();
    generateInsights();
  }, []);
  
  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setShowAddForm(true);
  };
  
  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingSubscription(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Subscription Optimizer
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'overview' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('subscriptions')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'subscriptions' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Subscriptions
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'insights' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Insights
              </button>
            </nav>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Subscription
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <nav className="px-4 py-3 space-y-2">
              <button
                onClick={() => {
                  setActiveTab('overview');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'overview' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => {
                  setActiveTab('subscriptions');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'subscriptions' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                Subscriptions
              </button>
              <button
                onClick={() => {
                  setActiveTab('insights');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'insights' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                Insights
              </button>
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setMobileMenuOpen(false);
                }}
                className="block w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm"
              >
                Add Subscription
              </button>
            </nav>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <>
            <Dashboard />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Subscriptions</h2>
                <SubscriptionList onEdit={handleEdit} />
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Insights</h2>
                <InsightsPanel />
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'subscriptions' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Subscriptions</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <SubscriptionList onEdit={handleEdit} />
          </div>
        )}
        
        {activeTab === 'insights' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Savings Opportunities</h2>
              <p className="text-gray-500 mt-1">
                Discover ways to optimize your subscription spending
              </p>
            </div>
            <InsightsPanel />
          </div>
        )}
      </main>
      
      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <AddSubscriptionForm
          subscription={editingSubscription}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;