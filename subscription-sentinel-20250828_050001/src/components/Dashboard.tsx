import React, { useState } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import SubscriptionCard from './SubscriptionCard';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Filter,
  Search,
  Grid3X3,
  List,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { SubscriptionCategory } from '../types';

const Dashboard: React.FC = () => {
  const { state } = useSubscriptions();
  const { subscriptions, insights } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SubscriptionCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter subscriptions based on search and category
  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || sub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeSubscriptions = filteredSubscriptions.filter(sub => sub.isActive);
  const categories: (SubscriptionCategory | 'all')[] = [
    'all', 'entertainment', 'productivity', 'utilities', 'health', 
    'education', 'business', 'lifestyle', 'other'
  ];

  const categoryColors: Record<SubscriptionCategory, string> = {
    entertainment: 'bg-red-100 text-red-800',
    productivity: 'bg-blue-100 text-blue-800',
    utilities: 'bg-green-100 text-green-800',
    health: 'bg-pink-100 text-pink-800',
    education: 'bg-purple-100 text-purple-800',
    business: 'bg-yellow-100 text-yellow-800',
    lifestyle: 'bg-indigo-100 text-indigo-800',
    other: 'bg-gray-100 text-gray-800'
  };

  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-64 h-64 mb-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <DollarSign className="h-24 w-24 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No subscriptions yet</h2>
        <p className="text-gray-600 mb-8">Start tracking your subscriptions to take control of your spending.</p>
        <div className="glass rounded-2xl p-8 max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4">Get Started</h3>
          <ul className="text-left space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Click the + button to add your first subscription</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Set renewal reminders to never miss a payment</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span>Track spending across different categories</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Monthly Spending</p>
              <p className="text-2xl font-bold text-gray-900">
                ${insights.totalMonthly.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Yearly Total</p>
              <p className="text-2xl font-bold text-gray-900">
                ${insights.totalYearly.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900">
                {activeSubscriptions.length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Payments */}
      {insights.upcomingPayments.length > 0 && (
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Payments</h3>
          </div>
          <div className="space-y-3">
            {insights.upcomingPayments.slice(0, 3).map(sub => (
              <div key={sub.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{sub.name}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(sub.nextPayment), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${sub.cost}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[sub.category]}`}>
                    {sub.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as SubscriptionCategory | 'all')}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex border border-gray-200 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Subscriptions Grid/List */}
      {filteredSubscriptions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No subscriptions match your search criteria.</p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredSubscriptions.map(subscription => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;