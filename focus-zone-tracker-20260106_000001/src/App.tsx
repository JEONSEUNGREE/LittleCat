import { useMemo } from 'react';
import { Header } from './components/Header';
import { FocusGauge } from './components/FocusGauge';
import { SessionTracker } from './components/SessionTracker';
import { HeatmapChart } from './components/HeatmapChart';
import { RecommendationCard } from './components/RecommendationCard';
import { useFocusStore } from './store/focusStore';

function App() {
  const { isTracking, getTimeSlots, getTodayStats, getBestHours } = useFocusStore();

  const timeSlots = useMemo(() => getTimeSlots(), [getTimeSlots]);
  const todayStats = useMemo(() => getTodayStats(), [getTodayStats]);
  const bestHours = useMemo(() => getBestHours(), [getBestHours]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-8">
      <Header todaySessionCount={todayStats.sessionsCount} />

      <main className="px-4 -mt-4 space-y-4 max-w-lg mx-auto">
        {/* Focus Gauge */}
        <FocusGauge
          focusLevel={todayStats.avgFocusLevel}
          totalMinutes={todayStats.totalFocusTime}
          isActive={isTracking}
        />

        {/* Session Tracker */}
        <SessionTracker />

        {/* Heatmap Chart */}
        <HeatmapChart slots={timeSlots} bestHours={bestHours} />

        {/* Recommendation Card */}
        <RecommendationCard slots={timeSlots} bestHours={bestHours} />
      </main>
    </div>
  );
}

export default App;
