import { useState } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { SubscriptionFormData, SubscriptionCategory } from '../types';
import { ArrowLeft, Save, Calendar, DollarSign, Tag, Bell, Globe, FileText } from 'lucide-react';
import { addMonths, addWeeks, addYears, format } from 'date-fns';

interface AddSubscriptionProps {
  onBack: () => void;
}

const AddSubscription: React.FC<AddSubscriptionProps> = ({ onBack }) => {
  const { addSubscription } = useSubscriptions();
  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: '',
    description: '',
    cost: 0,
    billingCycle: 'monthly',
    nextPayment: format(addMonths(new Date(), 1), 'yyyy-MM-dd'),
    category: 'other',
    reminderDays: 3,
    color: '#3B82F6',
    website: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Partial<SubscriptionFormData>>({});

  const categories: SubscriptionCategory[] = [
    'entertainment', 'productivity', 'utilities', 'health',
    'education', 'business', 'lifestyle', 'other'
  ];

  const categoryIcons: Record<SubscriptionCategory, string> = {
    entertainment: '🎬',
    productivity: '💼',
    utilities: '⚡',
    health: '🏥',
    education: '📚',
    business: '🏢',
    lifestyle: '🌟',
    other: '📦'
  };

  const billingCycles = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const reminderOptions = [
    { value: 0, label: 'No reminder' },
    { value: 1, label: '1 day before' },
    { value: 3, label: '3 days before' },
    { value: 7, label: '1 week before' },
    { value: 14, label: '2 weeks before' }
  ];

  const presetColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<SubscriptionFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.cost <= 0) {
      newErrors.cost = 'Cost must be greater than 0';
    }

    if (!formData.nextPayment) {
      newErrors.nextPayment = 'Next payment date is required';
    } else {
      const paymentDate = new Date(formData.nextPayment);
      const today = new Date();
      if (paymentDate < today) {
        newErrors.nextPayment = 'Next payment date cannot be in the past';
      }
    }

    if (formData.website && !isValidUrl(formData.website)) {
      newErrors.website = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const subscription = {
      ...formData,
      isActive: true,
      website: formData.website ? 
        (formData.website.startsWith('http') ? formData.website : `https://${formData.website}`) :
        undefined
    };

    addSubscription(subscription);
    onBack();
  };

  const handleInputChange = (field: keyof SubscriptionFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Auto-calculate next payment date when billing cycle changes
    if (field === 'billingCycle') {
      const today = new Date();
      let nextPayment: Date;
      
      switch (value) {
        case 'weekly':
          nextPayment = addWeeks(today, 1);
          break;
        case 'yearly':
          nextPayment = addYears(today, 1);
          break;
        default:
          nextPayment = addMonths(today, 1);
      }
      
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        nextPayment: format(nextPayment, 'yyyy-MM-dd')
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Subscription</h1>
          <p className="text-gray-600">Track a new subscription and set reminders</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Tag className="h-5 w-5" />
                <span>Basic Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Netflix, Spotify, Adobe..."
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {categoryIcons[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the service..."
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Payment Details</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.cost || ''}
                      onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || 0)}
                      className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.cost ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="9.99"
                    />
                  </div>
                  {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Billing Cycle
                  </label>
                  <select
                    value={formData.billingCycle}
                    onChange={(e) => handleInputChange('billingCycle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {billingCycles.map(cycle => (
                      <option key={cycle.value} value={cycle.value}>
                        {cycle.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Next Payment *
                  </label>
                  <input
                    type="date"
                    value={formData.nextPayment}
                    onChange={(e) => handleInputChange('nextPayment', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.nextPayment ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.nextPayment && <p className="text-red-500 text-sm mt-1">{errors.nextPayment}</p>}
                </div>
              </div>
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Reminder Settings</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder
                  </label>
                  <select
                    value={formData.reminderDays}
                    onChange={(e) => handleInputChange('reminderDays', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {reminderOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Theme
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <div className="flex space-x-1">
                      {presetColors.map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleInputChange('color', color)}
                          className={`w-6 h-6 rounded-full border-2 ${
                            formData.color === color ? 'border-gray-400' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Additional Information</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.website ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="netflix.com"
                    />
                  </div>
                  {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional notes about this subscription..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Add Subscription</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubscription;