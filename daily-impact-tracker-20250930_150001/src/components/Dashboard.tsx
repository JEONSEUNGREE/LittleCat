import React from 'react';
import { TrendingUp, Clock, Target, Award, Activity, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Dashboard: React.FC = () => {
  const metrics = useStore(state => state.getTodaysMetrics());
  const weeklyStats = useStore(state => state.getWeeklyStats());
  const todaysTasks = useStore(state => state.getTodaysTasks());
  
  const getImpactColor = (score: number) => {
    if (score >= 7) return 'text-impact-high';
    if (score >= 4) return 'text-impact-medium';
    return 'text-impact-low';
  };
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };
  
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Impact Dashboard</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span className="text-sm md:text-base">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="impact-card">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className={`text-2xl font-bold ${getImpactColor(metrics.averageImpact)}`}>
              {metrics.totalImpact}
            </span>
          </div>
          <p className="text-sm text-gray-600">Total Impact</p>
          <p className="text-xs text-gray-500 mt-1">Today's accumulated score</p>
        </div>
        
        <div className="impact-card">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-secondary" />
            <span className="text-2xl font-bold text-gray-900">
              {formatTime(metrics.totalTimeSpent)}
            </span>
          </div>
          <p className="text-sm text-gray-600">Time Invested</p>
          <p className="text-xs text-gray-500 mt-1">Total focus time</p>
        </div>
        
        <div className="impact-card">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-impact-high" />
            <span className="text-2xl font-bold text-gray-900">
              {metrics.highImpactTasks}
            </span>
          </div>
          <p className="text-sm text-gray-600">High Impact</p>
          <p className="text-xs text-gray-500 mt-1">Tasks with score ≥7</p>
        </div>
        
        <div className="impact-card">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-impact-medium" />
            <span className="text-2xl font-bold text-gray-900">
              {metrics.efficiency.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-gray-600">Efficiency</p>
          <p className="text-xs text-gray-500 mt-1">Impact per hour</p>
        </div>
      </div>
      
      <div className="impact-card">
        <h2 className="text-lg font-semibold mb-4">Weekly Impact Trend</h2>
        <div className="flex items-end justify-between h-32 gap-2">
          {weeklyStats.map((stat, index) => {
            const maxImpact = Math.max(...weeklyStats.map(s => s.metrics.totalImpact), 1);
            const height = (stat.metrics.totalImpact / maxImpact) * 100;
            const isToday = index === weeklyStats.length - 1;
            
            return (
              <div key={stat.date} className="flex-1 flex flex-col items-center">
                <div className="relative w-full flex items-end justify-center h-24">
                  <div 
                    className={`w-full max-w-[40px] transition-all rounded-t-lg ${
                      isToday ? 'bg-primary' : 'bg-gray-300'
                    } hover:opacity-80`}
                    style={{ height: `${height}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                      {stat.metrics.totalImpact || 0}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2">
                  {new Date(stat.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {todaysTasks.length > 0 && (
        <div className="impact-card">
          <h2 className="text-lg font-semibold mb-4">Today's Completed Tasks</h2>
          <div className="space-y-2">
            {todaysTasks
              .filter(task => task.completedAt)
              .sort((a, b) => b.impactScore - a.impactScore)
              .slice(0, 5)
              .map(task => (
                <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">{formatTime(task.timeSpent)}</span>
                      <span className={`impact-badge ${
                        task.impactScore >= 7 ? 'bg-green-100 text-green-800' :
                        task.impactScore >= 4 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Impact: {task.impactScore}/10
                      </span>
                    </div>
                  </div>
                  <Award className={`w-5 h-5 ${getImpactColor(task.impactScore)}`} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};