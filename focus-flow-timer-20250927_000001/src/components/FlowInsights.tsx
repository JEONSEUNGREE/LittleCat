import React from 'react';
import { TrendingUp, Activity, Zap, Calendar } from 'lucide-react';
import useTimerStore from '../store/useTimerStore';

const FlowInsights: React.FC = () => {
  const { sessions, flowPattern, preferences } = useTimerStore();
  
  const todaySessions = sessions.filter(s => {
    const sessionDate = new Date(s.startedAt);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString();
  });
  
  const totalFocusTime = todaySessions
    .filter(s => s.type === 'focus')
    .reduce((acc, s) => acc + s.duration, 0);
  
  const avgProductivity = todaySessions.length > 0
    ? Math.round(todaySessions.reduce((acc, s) => acc + s.productivity, 0) / todaySessions.length)
    : 0;
  
  const currentHour = new Date().getHours();
  const isPeakHour = flowPattern.peakHours.includes(currentHour);
  
  return (
    <div className="w-full max-w-sm mx-auto mt-8 space-y-4">
      {/* Flow Insights Header */}
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-slate-800">Flow Insights</h3>
      </div>
      
      {/* Insight Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Today's Focus */}
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-slate-600">Today's Focus</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {Math.floor(totalFocusTime / 60)}m
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {todaySessions.filter(s => s.type === 'focus').length} sessions
          </div>
        </div>
        
        {/* Productivity Score */}
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-slate-600">Productivity</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {avgProductivity}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {avgProductivity >= 80 ? 'Excellent!' : avgProductivity >= 60 ? 'Good' : 'Keep going'}
          </div>
        </div>
        
        {/* Current Streak */}
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-green-600" />
            <span className="text-xs text-slate-600">Streak</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {flowPattern.currentStreak}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            days
          </div>
        </div>
        
        {/* Peak Hour Status */}
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-purple-600" />
            <span className="text-xs text-slate-600">Peak Hour</span>
          </div>
          <div className={`text-2xl font-bold ${isPeakHour ? 'text-green-600' : 'text-slate-900'}`}>
            {isPeakHour ? 'Yes' : 'No'}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {isPeakHour ? 'Great time!' : `Next: ${flowPattern.peakHours.find(h => h > currentHour) || flowPattern.peakHours[0]}:00`}
          </div>
        </div>
      </div>
      
      {/* Smart Suggestion */}
      {preferences.adaptiveMode && (
        <div className="glass-effect rounded-xl p-4 mt-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 animate-pulse" />
            <div>
              <div className="text-sm font-medium text-slate-800">Smart Tip</div>
              <div className="text-xs text-slate-600 mt-1">
                {isPeakHour 
                  ? `Your focus is typically strong now. Consider a ${flowPattern.optimalFocusTime}min session.`
                  : avgProductivity > 70
                  ? "You're doing great! Keep this rhythm going."
                  : "Try shorter sessions to maintain focus better."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowInsights;