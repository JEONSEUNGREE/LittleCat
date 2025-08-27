import React, { useState } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { Subscription, SubscriptionCategory } from '../types';
import { 
  Calendar, 
  DollarSign, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Bell,
  BellOff,
  Power,
  PowerOff
} from 'lucide-react';
import { format, addDays } from 'date-fns';

interface SubscriptionCardProps {
  subscription: Subscription;
  viewMode: 'grid' | 'list';
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, viewMode }) => {
  const { deleteSubscription, toggleSubscription, updateSubscription } = useSubscriptions();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const categoryColors: Record<SubscriptionCategory, string> = {
    entertainment: 'bg-red-100 text-red-800 border-red-200',
    productivity: 'bg-blue-100 text-blue-800 border-blue-200',
    utilities: 'bg-green-100 text-green-800 border-green-200',
    health: 'bg-pink-100 text-pink-800 border-pink-200',
    education: 'bg-purple-100 text-purple-800 border-purple-200',
    business: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    lifestyle: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    other: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const billingCycleDisplay = {
    monthly: 'per month',
    yearly: 'per year',
    weekly: 'per week'
  };

  const getNextPaymentStatus = () => {
    const nextPayment = new Date(subscription.nextPayment);
    const today = new Date();
    const daysUntil = Math.ceil((nextPayment.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return { text: 'Overdue', color: 'text-red-600', bgColor: 'bg-red-50' };
    if (daysUntil <= 3) return { text: `${daysUntil} days`, color: 'text-orange-600', bgColor: 'bg-orange-50' };
    if (daysUntil <= 7) return { text: `${daysUntil} days`, color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { text: `${daysUntil} days`, color: 'text-green-600', bgColor: 'bg-green-50' };
  };

  const paymentStatus = getNextPaymentStatus();

  const handleDelete = () => {
    if (showDeleteConfirm) {
      deleteSubscription(subscription.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      // Auto-hide confirm dialog after 3 seconds
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const handleToggleActive = () => {
    toggleSubscription(subscription.id);
  };

  const handleUpdateReminder = () => {
    const newReminderDays = subscription.reminderDays === 3 ? 7 : subscription.reminderDays === 7 ? 1 : 3;
    updateSubscription(subscription.id, { reminderDays: newReminderDays });
  };

  if (viewMode === 'list') {
    return (
      <div className={`card ${subscription.isActive ? 'border-l-4 border-l-blue-500' : 'opacity-60 border-l-4 border-l-gray-300'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${subscription.isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <DollarSign className={`h-6 w-6 ${subscription.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900">{subscription.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[subscription.category]}`}>
                  {subscription.category}
                </span>
              </div>
              {subscription.description && (
                <p className="text-sm text-gray-600 mb-1">{subscription.description}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>${subscription.cost} {billingCycleDisplay[subscription.billingCycle]}</span>
                <span>Next: {format(new Date(subscription.nextPayment), 'MMM dd')}</span>
                <span className={`px-2 py-1 rounded-full ${paymentStatus.bgColor} ${paymentStatus.color}`}>
                  {paymentStatus.text}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleActive}
              className={`p-2 rounded-lg transition-colors ${
                subscription.isActive
                  ? 'text-green-600 hover:bg-green-50'
                  : 'text-gray-400 hover:bg-gray-50'
              }`}
              title={subscription.isActive ? 'Deactivate' : 'Activate'}
            >
              {subscription.isActive ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
            </button>
            
            <button
              onClick={handleUpdateReminder}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title={`Reminder: ${subscription.reminderDays} days`}
            >
              {subscription.reminderDays > 0 ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            </button>

            {subscription.website && (
              <a
                href={subscription.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                title="Visit website"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            <button
              onClick={handleDelete}
              className={`p-2 rounded-lg transition-colors ${
                showDeleteConfirm
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
              title={showDeleteConfirm ? 'Click again to confirm' : 'Delete subscription'}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card card-hover relative ${subscription.isActive ? '' : 'opacity-60'}`}>
      {/* Status Indicator */}
      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${subscription.isActive ? 'bg-green-400' : 'bg-gray-300'}`}></div>
      
      {/* Main Content */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{subscription.name}</h3>
        </div>
        
        {subscription.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{subscription.description}</p>
        )}

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-gray-900">${subscription.cost}</p>
            <p className="text-sm text-gray-500">{billingCycleDisplay[subscription.billingCycle]}</p>
          </div>
          <span className={`px-3 py-1 text-xs rounded-full ${categoryColors[subscription.category]}`}>
            {subscription.category}
          </span>
        </div>
      </div>

      {/* Next Payment */}
      <div className={`p-3 rounded-lg ${paymentStatus.bgColor} mb-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Next Payment</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {format(new Date(subscription.nextPayment), 'MMM dd, yyyy')}
            </p>
            <p className={`text-xs ${paymentStatus.color}`}>in {paymentStatus.text}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleActive}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              subscription.isActive
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {subscription.isActive ? <Power className="h-3 w-3" /> : <PowerOff className="h-3 w-3" />}
            <span>{subscription.isActive ? 'Active' : 'Inactive'}</span>
          </button>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={handleUpdateReminder}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title={`Reminder: ${subscription.reminderDays} days before`}
          >
            {subscription.reminderDays > 0 ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
          </button>

          {subscription.website && (
            <a
              href={subscription.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}

          <button
            onClick={handleDelete}
            className={`p-2 rounded-lg transition-colors ${
              showDeleteConfirm
                ? 'bg-red-100 text-red-700'
                : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
            }`}
            title={showDeleteConfirm ? 'Click again to confirm' : 'Delete subscription'}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Notes */}
      {subscription.notes && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">{subscription.notes}</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;