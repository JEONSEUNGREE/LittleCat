
import { useTaskStore } from '../store/useTaskStore';
import { BarChart3, CheckCircle2, Clock, Target } from 'lucide-react';

const StatsPanel: React.FC = () => {
  const stats = useTaskStore((state) => state.getStats());

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  const quadrantColors = {
    'urgent-important': 'text-red-500',
    'not-urgent-important': 'text-amber-500',
    'urgent-not-important': 'text-blue-500',
    'not-urgent-not-important': 'text-gray-500',
  };

  const quadrantLabels = {
    'urgent-important': 'Do First',
    'not-urgent-important': 'Schedule',
    'urgent-not-important': 'Delegate',
    'not-urgent-not-important': 'Eliminate',
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-white">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        Statistics
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold">{stats.totalTasks}</div>
          <div className="text-sm opacity-80">Total Tasks</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold">{stats.completedTasks}</div>
          <div className="text-sm opacity-80">Completed</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold">{completionRate}%</div>
          <div className="text-sm opacity-80">Completion Rate</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold">
            {stats.totalEstimatedTime > 0 ? `${Math.round(stats.totalEstimatedTime / 60)}h` : '0h'}
          </div>
          <div className="text-sm opacity-80">Est. Time</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold opacity-80">Tasks by Quadrant</h3>
        {Object.entries(quadrantLabels).map(([key, label]) => {
          const quadrant = key as keyof typeof quadrantColors;
          const count = stats.tasksByQuadrant[quadrant] || 0;
          const percentage = stats.totalTasks > 0 
            ? Math.round((count / stats.totalTasks) * 100) 
            : 0;

          return (
            <div key={key} className="flex items-center justify-between">
              <span className={`text-sm ${quadrantColors[quadrant]}`}>{label}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-white bg-opacity-20 rounded-full h-2">
                  <div 
                    className={`h-full rounded-full ${quadrantColors[quadrant].replace('text-', 'bg-')}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm min-w-[40px] text-right">{count}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsPanel;