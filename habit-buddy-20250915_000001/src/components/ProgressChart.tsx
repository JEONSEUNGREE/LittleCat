import { useHabitStore } from '../store/habitStore';

export default function ProgressChart() {
  const { stats } = useHabitStore();
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const maxValue = Math.max(...stats.weeklyProgress, 100);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">주간 진행률</h3>
      <div className="flex items-end justify-between gap-2 h-32">
        {stats.weeklyProgress.map((value, index) => {
          const height = (value / maxValue) * 100;
          const isToday = index === new Date().getDay() - 1;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center justify-end h-24">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    isToday
                      ? 'bg-gradient-to-t from-primary-500 to-primary-400'
                      : 'bg-gradient-to-t from-gray-300 to-gray-200'
                  }`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className={`text-xs ${isToday ? 'text-primary-600 font-semibold' : 'text-gray-500'}`}>
                {days[index]}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">이번 주 평균</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {Math.round(stats.weeklyProgress.reduce((a, b) => a + b, 0) / stats.weeklyProgress.length)}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">지난 주 대비</p>
            <p className="text-lg font-semibold text-green-600 mt-1">+12%</p>
          </div>
        </div>
      </div>
    </div>
  );
}