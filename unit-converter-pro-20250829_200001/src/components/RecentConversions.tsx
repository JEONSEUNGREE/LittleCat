
import { History, TrendingUp } from 'lucide-react';
import { useConverterStore } from '../store/converterStore';

export const RecentConversions: React.FC = () => {
  const { recentConversions } = useConverterStore();

  if (recentConversions.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <History size={20} className="text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          최근 변환 기록
        </h3>
      </div>
      
      <div className="space-y-2">
        {recentConversions.map((conversion, index) => (
          <div
            key={index}
            className="glass-effect p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <TrendingUp size={16} className="text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {conversion.category}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {conversion.fromValue} {conversion.from} → {conversion.toValue.toLocaleString('ko-KR', { maximumFractionDigits: 4 })} {conversion.to}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};