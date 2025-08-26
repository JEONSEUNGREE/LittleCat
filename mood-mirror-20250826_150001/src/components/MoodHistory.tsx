
import { Calendar, TrendingUp, Activity } from 'lucide-react';
import { useMoodStore } from '../store/useMoodStore';
import { Mood } from '../types';

const moodColors: Record<Mood, string> = {
  happy: '#FFD93D',
  calm: '#6BCFFF',
  sad: '#4A90E2',
  anxious: '#F5A623',
  angry: '#FF6B6B',
  excited: '#FF69B4',
  neutral: '#95A5A6'
};

const moodEmoji: Record<Mood, string> = {
  happy: '😊',
  calm: '😌',
  sad: '😢',
  anxious: '😰',
  angry: '😠',
  excited: '🤩',
  neutral: '😐'
};

export const MoodHistory: React.FC = () => {
  const moodHistory = useMoodStore((state) => state.moodHistory);

  // Calculate mood statistics
  const moodStats = React.useMemo(() => {
    const stats: Record<Mood, number> = {
      happy: 0,
      calm: 0,
      sad: 0,
      anxious: 0,
      angry: 0,
      excited: 0,
      neutral: 0
    };

    moodHistory.forEach(entry => {
      stats[entry.mood]++;
    });

    return Object.entries(stats)
      .filter(([, count]) => count > 0)
      .map(([mood, count]) => ({
        mood: mood as Mood,
        count,
        percentage: (count / moodHistory.length) * 100
      }))
      .sort((a, b) => b.count - a.count);
  }, [moodHistory]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>기분 기록</span>
        </h3>
        <span className="text-xs text-white/60">
          총 {moodHistory.length}개 기록
        </span>
      </div>

      {moodHistory.length > 0 ? (
        <>
          {/* Mood Statistics */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white/80">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">기분 통계</span>
            </div>
            
            {moodStats.map(({ mood, count, percentage }) => (
              <div key={mood} className="space-y-1">
                <div className="flex items-center justify-between text-sm text-white">
                  <span className="flex items-center space-x-2">
                    <span>{moodEmoji[mood]}</span>
                    <span className="capitalize">{mood}</span>
                  </span>
                  <span className="text-white/60">{count}회</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: moodColors[mood]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Moods */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white/80">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium">최근 기록</span>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {moodHistory.slice(-5).reverse().map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white/5 rounded-lg p-3 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{moodEmoji[entry.mood]}</span>
                      <span className="text-white text-sm capitalize">
                        {entry.mood}
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(entry.intensity)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-white/40">
                      {new Date(entry.timestamp).toLocaleString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-xs text-white/60 italic">"{entry.note}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-white/60">
          <p className="text-sm">아직 기록된 기분이 없어요</p>
          <p className="text-xs mt-2">첫 기분을 기록해보세요!</p>
        </div>
      )}
    </div>
  );
};