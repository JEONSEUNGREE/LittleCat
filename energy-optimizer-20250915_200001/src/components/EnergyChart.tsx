
import { BarChart3, Clock } from 'lucide-react';
import { useEnergyStore } from '../store/useEnergyStore';

const EnergyChart: React.FC = () => {
  const { getEnergyPatterns } = useEnergyStore();
  const patterns = getEnergyPatterns();

  const maxLevel = Math.max(...patterns.map(p => p.averageLevel), 10);

  const getBarColor = (level: number) => {
    if (level >= 7) return 'bg-energy-high';
    if (level >= 4) return 'bg-energy-medium';
    return 'bg-energy-low';
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return '12am';
    if (hour === 12) return '12pm';
    if (hour < 12) return `${hour}am`;
    return `${hour - 12}pm`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Energy Patterns</h2>
        <BarChart3 className="w-6 h-6 text-primary" />
      </div>

      {patterns.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Start tracking your energy to see patterns
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Log entries throughout the day to build your energy profile
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-end space-x-2 h-48 mb-4">
            {Array.from({ length: 24 }, (_, hour) => {
              const pattern = patterns.find(p => p.hour === hour);
              const level = pattern?.averageLevel || 0;
              const height = (level / maxLevel) * 100;

              return (
                <div
                  key={hour}
                  className="flex-1 flex flex-col items-center justify-end"
                >
                  {pattern && (
                    <div className="relative w-full group">
                      <div
                        className={`w-full ${getBarColor(level)} rounded-t transition-all duration-300 hover:opacity-80`}
                        style={{ height: `${height * 1.8}px` }}
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {level.toFixed(1)}/10
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>12am</span>
            <span>6am</span>
            <span>12pm</span>
            <span>6pm</span>
            <span>11pm</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
              <p className="text-sm font-medium text-green-800 dark:text-green-400">Peak Hours</p>
              <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                {patterns
                  .filter(p => p.averageLevel >= 7)
                  .map(p => formatHour(p.hour))
                  .join(', ') || 'Not enough data'}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
              <p className="text-sm font-medium text-red-800 dark:text-red-400">Low Energy</p>
              <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                {patterns
                  .filter(p => p.averageLevel < 4)
                  .map(p => formatHour(p.hour))
                  .join(', ') || 'Not enough data'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyChart;