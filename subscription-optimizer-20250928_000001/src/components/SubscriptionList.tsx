import React, { useState } from 'react';
import { 
  Edit2, 
  Trash2, 
  Power, 
  Calendar,
  DollarSign,
  ChevronRight,
  Filter,
  Search 
} from 'lucide-react';
import useSubscriptionStore from '../store/subscriptionStore';
import { Subscription, SubscriptionCategory } from '../types';

const categoryColors: Record<SubscriptionCategory, string> = {
  'Entertainment': 'bg-purple-500',
  'Productivity': 'bg-blue-500',
  'Education': 'bg-indigo-500',
  'Health & Fitness': 'bg-green-500',
  'Food & Delivery': 'bg-orange-500',
  'Transportation': 'bg-yellow-500',
  'Shopping': 'bg-pink-500',
  'Finance': 'bg-emerald-500',
  'Cloud Storage': 'bg-cyan-500',
  'Security': 'bg-red-500',
  'Other': 'bg-gray-500',
};

interface Props {
  onEdit: (subscription: Subscription) => void;
}

const SubscriptionList: React.FC<Props> = ({ onEdit }) => {
  const { subscriptions, deleteSubscription, toggleSubscriptionStatus } = useSubscriptionStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<SubscriptionCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date'>('date');
  
  const filteredSubscriptions = subscriptions
    .filter(sub => {
      const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sub.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || sub.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return b.price - a.price;
        case 'date':
          return new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime();
        default:
          return 0;
      }
    });
  
  const calculateMonthlyPrice = (sub: Subscription): number => {
    switch (sub.billingCycle) {
      case 'weekly':
        return sub.price * 4.33;
      case 'monthly':
        return sub.price;
      case 'quarterly':
        return sub.price / 3;
      case 'yearly':
        return sub.price / 12;
      default:
        return sub.price;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search subscriptions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as SubscriptionCategory | 'all')}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {Object.keys(categoryColors).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'date')}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Next Payment</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {filteredSubscriptions.length === 0 ? (
          <div className="p-12 text-center">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No subscriptions found</p>
            <p className="text-sm text-gray-400 mt-2">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Add your first subscription to get started'}
            </p>
          </div>
        ) : (
          filteredSubscriptions.map((sub) => (
            <div 
              key={sub.id} 
              className={`p-4 lg:p-6 hover:bg-gray-50 transition-colors ${!sub.isActive ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg ${categoryColors[sub.category]} bg-opacity-20 flex items-center justify-center`}>
                    <div className={`w-6 h-6 rounded ${categoryColors[sub.category]}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{sub.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{sub.category}</p>
                        {sub.description && (
                          <p className="text-sm text-gray-400 mt-2">{sub.description}</p>
                        )}
                      </div>
                      
                      <div className="text-right ml-4">
                        <p className="font-bold text-lg text-gray-900">
                          ${sub.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">/{sub.billingCycle}</p>
                        {sub.billingCycle !== 'monthly' && (
                          <p className="text-xs text-gray-400 mt-1">
                            ${calculateMonthlyPrice(sub).toFixed(2)}/mo
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Next payment: {new Date(sub.nextPaymentDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={() => toggleSubscriptionStatus(sub.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            sub.isActive 
                              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                          title={sub.isActive ? 'Active' : 'Paused'}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => onEdit(sub)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${sub.name}?`)) {
                              deleteSubscription(sub.id);
                            }
                          }}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubscriptionList;