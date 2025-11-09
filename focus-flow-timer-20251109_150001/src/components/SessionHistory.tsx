import { TrendingUp, Clock, Target } from 'lucide-react';
import { useTimerStore } from '../stores/useTimerStore';

export const SessionHistory = () => {
  const sessions = useTimerStore((state) => state.sessions);

  const totalSessions = sessions.length;
  const avgFocusScore = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + s.focusScore, 0) / sessions.length)
    : 0;
  const totalMinutes = Math.round(
    sessions.reduce((sum, s) => sum + s.duration, 0) / 60
  );

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
        Your Focus Stats
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-effect rounded-xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <Target className="w-5 h-5 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gradient">{totalSessions}</div>
          <div className="text-xs text-gray-600">Sessions</div>
        </div>

        <div className="glass-effect rounded-xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-focus-600" />
          </div>
          <div className="text-2xl font-bold text-gradient">{avgFocusScore}%</div>
          <div className="text-xs text-gray-600">Avg Focus</div>
        </div>

        <div className="glass-effect rounded-xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <Clock className="w-5 h-5 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gradient">{totalMinutes}</div>
          <div className="text-xs text-gray-600">Minutes</div>
        </div>
      </div>

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <div className="glass-effect rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Recent Sessions
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {sessions.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-2 bg-white/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      session.focusScore >= 70
                        ? 'bg-green-500'
                        : session.focusScore >= 40
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      {session.type.charAt(0).toUpperCase() + session.type.slice(1)} Focus
                    </div>
                    <div className="text-xs text-gray-600">
                      {new Date(session.completedAt).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-primary-600">
                  {session.focusScore}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {sessions.length === 0 && (
        <div className="glass-effect rounded-xl p-8 text-center">
          <div className="text-gray-400 mb-2">
            <TrendingUp className="w-12 h-12 mx-auto opacity-30" />
          </div>
          <p className="text-gray-500 text-sm">
            No sessions yet. Start your first focus session!
          </p>
        </div>
      )}
    </div>
  );
};
