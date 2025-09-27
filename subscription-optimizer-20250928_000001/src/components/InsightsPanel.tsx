import React from 'react';
import { TrendingDown, AlertTriangle, DollarSign, Zap } from 'lucide-react';
import useSubscriptionStore from '../store/subscriptionStore';

const InsightsPanel: React.FC = () => {
  const { insights, subscriptions } = useSubscriptionStore();
  
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'duplicate':
        return <AlertTriangle className="w-5 h-5" />;
      case 'unused':
        return <TrendingDown className="w-5 h-5" />;
      case 'annual_discount':
        return <DollarSign className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };
  
  if (insights.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            You're doing great!
          </h3>
          <p className="text-gray-500">
            No optimization opportunities found. Your subscriptions are well managed.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Savings Insights</h2>
        <p className="text-sm text-gray-500 mt-1">
          Opportunities to optimize your subscriptions
        </p>
      </div>
      
      <div className="p-6 space-y-4">
        {insights.map((insight) => {
          const relatedSubs = subscriptions.filter(s => 
            insight.subscriptions.includes(s.id)
          );
          
          return (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border ${getPriorityColor(insight.priority)}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getInsightIcon(insight.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {insight.description}
                      </p>
                      
                      {relatedSubs.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {relatedSubs.map(sub => (
                            <span
                              key={sub.id}
                              className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700"
                            >
                              {sub.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-gray-900">
                        ${insight.savingsAmount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">per month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total potential savings</p>
            <p className="text-xl font-bold text-green-600">
              ${insights.reduce((sum, i) => sum + i.savingsAmount, 0).toFixed(2)}/mo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;