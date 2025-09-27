import React from 'react';
import { DollarSign, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import useSubscriptionStore from '../store/subscriptionStore';

const Dashboard: React.FC = () => {
  const { 
    totalMonthlySpend, 
    totalYearlySpend, 
    subscriptions,
    insights,
    getUpcomingPayments 
  } = useSubscriptionStore();
  
  const activeSubscriptions = subscriptions.filter(s => s.isActive).length;
  const upcomingPayments = getUpcomingPayments(7);
  const totalSavings = insights.reduce((sum, insight) => sum + insight.savingsAmount, 0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-500">Monthly</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          ${totalMonthlySpend.toFixed(2)}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          {activeSubscriptions} active subscriptions
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-sm font-medium text-gray-500">Yearly</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          ${totalYearlySpend.toFixed(2)}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Projected annual cost
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-yellow-100 p-3 rounded-lg">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <span className="text-sm font-medium text-gray-500">Savings</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          ${totalSavings.toFixed(2)}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          {insights.length} optimization tips
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-gray-500">This Week</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          {upcomingPayments.length}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Upcoming payments
        </p>
      </div>
    </div>
  );
};

export default Dashboard;