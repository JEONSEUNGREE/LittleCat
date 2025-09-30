import { useMemo } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, Clock, Award, Calendar, Target, Activity } from 'lucide-react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, subDays } from 'date-fns';
import { useApp } from '../context/AppContext';
import { clsx } from 'clsx';

const Dashboard: React.FC = () => {
  const { sessionHistory, userSettings } = useApp();

  // Calculate statistics
  const stats = useMemo(() => {
    const last7Days = subDays(new Date(), 7);
    const recentSessions = sessionHistory.filter(
      s => new Date(s.startTime) >= last7Days
    );

    const totalTime = recentSessions.reduce((sum, s) => sum + s.duration, 0);
    const avgScore = recentSessions.length > 0
      ? recentSessions.reduce((sum, s) => sum + s.averageScore, 0) / recentSessions.length
      : 0;
    
    const todaySessions = recentSessions.filter(
      s => format(new Date(s.startTime), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    );

    const improvement = recentSessions.length >= 2
      ? recentSessions[0].averageScore - recentSessions[recentSessions.length - 1].averageScore
      : 0;

    return {
      totalSessions: recentSessions.length,
      totalTime,
      averageScore: Math.round(avgScore),
      todayTime: todaySessions.reduce((sum, s) => sum + s.duration, 0),
      improvement: Math.round(improvement),
      streak: calculateStreak(sessionHistory),
    };
  }, [sessionHistory]);

  // Prepare chart data
  const weeklyData = useMemo(() => {
    const days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date(),
    });

    return days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const daySessions = sessionHistory.filter(
        s => format(new Date(s.startTime), 'yyyy-MM-dd') === dayStr
      );

      return {
        day: format(day, 'EEE'),
        date: format(day, 'MM/dd'),
        score: daySessions.length > 0
          ? Math.round(daySessions.reduce((sum, s) => sum + s.averageScore, 0) / daySessions.length)
          : 0,
        time: daySessions.reduce((sum, s) => sum + s.duration, 0),
        sessions: daySessions.length,
      };
    });
  }, [sessionHistory]);

  const postureDistribution = useMemo(() => {
    const distribution = {
      excellent: 0,
      good: 0,
      needsWork: 0,
      poor: 0,
    };

    sessionHistory.forEach(session => {
      if (session.averageScore >= 80) distribution.excellent++;
      else if (session.averageScore >= 60) distribution.good++;
      else if (session.averageScore >= 40) distribution.needsWork++;
      else distribution.poor++;
    });

    return [
      { name: 'Excellent', value: distribution.excellent, color: '#22c55e' },
      { name: 'Good', value: distribution.good, color: '#f59e0b' },
      { name: 'Needs Work', value: distribution.needsWork, color: '#fb923c' },
      { name: 'Poor', value: distribution.poor, color: '#ef4444' },
    ].filter(item => item.value > 0);
  }, [sessionHistory]);

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Avg Score"
          value={stats.averageScore}
          unit="%"
          color="primary"
          change={stats.improvement}
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Today"
          value={formatMinutes(stats.todayTime)}
          color="success"
        />
        <StatCard
          icon={<Activity className="w-5 h-5" />}
          label="Sessions"
          value={stats.totalSessions}
          unit="this week"
          color="primary"
        />
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label="Week Total"
          value={formatMinutes(stats.totalTime)}
          color="warning"
        />
        <StatCard
          icon={<Award className="w-5 h-5" />}
          label="Streak"
          value={stats.streak}
          unit="days"
          color="success"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Goal"
          value={userSettings.targetScore}
          unit="target"
          color="primary"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Score Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Weekly Score Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ fill: '#0ea5e9', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey={() => userSettings.targetScore}
                stroke="#22c55e"
                strokeDasharray="5 5"
                strokeWidth={1}
                dot={false}
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Time Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Daily Session Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => `${value} min`}
              />
              <Bar dataKey="time" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Posture Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Posture Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={postureDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {postureDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Sessions */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {sessionHistory.slice(0, 5).map((session) => (
              <SessionItem key={session.id} session={session} />
            ))}
            {sessionHistory.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No sessions recorded yet. Start monitoring to see your progress!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AchievementCard
          title="Posture Pro"
          description="Maintain 80+ score for 5 sessions"
          progress={calculateAchievementProgress(sessionHistory, 80, 5)}
          icon="🏆"
        />
        <AchievementCard
          title="Consistency King"
          description="Complete sessions 7 days in a row"
          progress={Math.min((stats.streak / 7) * 100, 100)}
          icon="👑"
        />
        <AchievementCard
          title="Marathon Sitter"
          description="Log 10 hours total time"
          progress={Math.min((stats.totalTime / 600) * 100, 100)}
          icon="🎯"
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  color: 'primary' | 'success' | 'warning' | 'danger';
  change?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, unit, color, change }) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50',
    success: 'text-success-600 bg-success-50',
    warning: 'text-warning-600 bg-warning-50',
    danger: 'text-danger-600 bg-danger-50',
  };

  return (
    <div className="card p-4">
      <div className={clsx('inline-flex p-2 rounded-lg mb-2', colorClasses[color])}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {unit && <div className="text-xs text-gray-500">{unit}</div>}
      {change !== undefined && change !== 0 && (
        <div className={clsx('text-xs mt-1', change > 0 ? 'text-success-600' : 'text-danger-600')}>
          {change > 0 ? '+' : ''}{change}% vs last
        </div>
      )}
    </div>
  );
};

interface SessionItemProps {
  session: any;
}

const SessionItem: React.FC<SessionItemProps> = ({ session }) => {
  const scoreColor = session.averageScore >= 80 ? 'text-success-600' : 
                     session.averageScore >= 60 ? 'text-warning-600' : 'text-danger-600';

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className={clsx('text-2xl font-bold', scoreColor)}>
          {session.averageScore}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">
            {format(new Date(session.startTime), 'MMM dd, HH:mm')}
          </div>
          <div className="text-xs text-gray-600">
            Duration: {session.duration}m
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs text-gray-600">
          {session.alerts} alerts
        </div>
        <div className="text-xs text-success-600">
          {session.improvements} improvements
        </div>
      </div>
    </div>
  );
};

interface AchievementCardProps {
  title: string;
  description: string;
  progress: number;
  icon: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, description, progress, icon }) => {
  const isCompleted = progress >= 100;
  
  return (
    <div className={clsx('card p-4', isCompleted && 'bg-gradient-to-br from-success-50 to-success-100')}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{icon}</div>
        {isCompleted && (
          <span className="px-2 py-1 bg-success-600 text-white text-xs rounded-full">
            Completed!
          </span>
        )}
      </div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-xs text-gray-600 mb-3">{description}</p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={clsx(
            'h-2 rounded-full transition-all duration-500',
            isCompleted ? 'bg-success-500' : 'bg-primary-500'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-gray-600 mt-1">{Math.round(progress)}% complete</div>
    </div>
  );
};

// Helper functions
function calculateStreak(sessions: any[]): number {
  if (sessions.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  for (let i = 0; i < 30; i++) {
    const checkDate = subDays(today, i);
    const hasSession = sortedSessions.some(s => 
      format(new Date(s.startTime), 'yyyy-MM-dd') === format(checkDate, 'yyyy-MM-dd')
    );
    
    if (hasSession) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  
  return streak;
}

function calculateAchievementProgress(sessions: any[], targetScore: number, targetCount: number): number {
  const qualifyingSessions = sessions.filter(s => s.averageScore >= targetScore);
  return Math.min((qualifyingSessions.length / targetCount) * 100, 100);
}

export default Dashboard;