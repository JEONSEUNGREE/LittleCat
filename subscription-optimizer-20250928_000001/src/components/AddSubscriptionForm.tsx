import React, { useState } from 'react';
import { X, Save, DollarSign, Calendar, Tag } from 'lucide-react';
import { Subscription, SubscriptionCategory, BillingCycle } from '../types';
import useSubscriptionStore from '../store/subscriptionStore';

interface Props {
  subscription?: Subscription | null;
  onClose: () => void;
}

const categories: SubscriptionCategory[] = [
  'Entertainment',
  'Productivity',
  'Education',
  'Health & Fitness',
  'Food & Delivery',
  'Transportation',
  'Shopping',
  'Finance',
  'Cloud Storage',
  'Security',
  'Other'
];

const billingCycles: { value: BillingCycle; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

const categoryColors = [
  '#8B5CF6', '#3B82F6', '#6366F1', '#10B981', 
  '#F97316', '#EAB308', '#EC4899', '#10B981',
  '#06B6D4', '#EF4444', '#6B7280'
];

const AddSubscriptionForm: React.FC<Props> = ({ subscription, onClose }) => {
  const { addSubscription, updateSubscription } = useSubscriptionStore();
  
  const [formData, setFormData] = useState({
    name: subscription?.name || '',
    category: subscription?.category || 'Entertainment' as SubscriptionCategory,
    price: subscription?.price || 0,
    billingCycle: subscription?.billingCycle || 'monthly' as BillingCycle,
    firstPaymentDate: subscription?.firstPaymentDate || new Date().toISOString().split('T')[0],
    color: subscription?.color || '#8B5CF6',
    description: subscription?.description || '',
    cancelUrl: subscription?.cancelUrl || '',
    reminders: subscription?.reminders !== undefined ? subscription.reminders : true,
    isActive: subscription?.isActive !== undefined ? subscription.isActive : true,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Subscription name is required';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.firstPaymentDate) {
      newErrors.firstPaymentDate = 'First payment date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (subscription) {
      updateSubscription(subscription.id, formData);
    } else {
      addSubscription(formData);
    }
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {subscription ? 'Edit Subscription' : 'Add New Subscription'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subscription Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="e.g., Netflix, Spotify, Adobe Creative Cloud"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as SubscriptionCategory })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <div className="flex gap-2 flex-wrap">
                {categoryColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-lg ${
                      formData.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="9.99"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Cycle *
              </label>
              <select
                value={formData.billingCycle}
                onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as BillingCycle })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {billingCycles.map((cycle) => (
                  <option key={cycle.value} value={cycle.value}>{cycle.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                First Payment Date *
              </label>
              <input
                type="date"
                value={formData.firstPaymentDate}
                onChange={(e) => setFormData({ ...formData, firstPaymentDate: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.firstPaymentDate ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.firstPaymentDate && (
                <p className="mt-1 text-sm text-red-500">{errors.firstPaymentDate}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation URL
              </label>
              <input
                type="url"
                value={formData.cancelUrl}
                onChange={(e) => setFormData({ ...formData, cancelUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add notes about this subscription..."
            />
          </div>
          
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.reminders}
                onChange={(e) => setFormData({ ...formData, reminders: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Enable payment reminders</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Active subscription</span>
            </label>
          </div>
          
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {subscription ? 'Update Subscription' : 'Add Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscriptionForm;