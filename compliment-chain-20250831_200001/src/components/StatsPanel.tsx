import { Heart, Send, Link, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function StatsPanel() {
  const { userStats } = useStore();

  const stats = [
    {
      icon: <Send className="w-5 h-5" />,
      label: '보낸 칭찬',
      value: userStats.complimentsSent,
      color: 'text-primary',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: '받은 반응',
      value: userStats.complimentsReceived,
      color: 'text-secondary',
      bgColor: 'bg-pink-50'
    },
    {
      icon: <Link className="w-5 h-5" />,
      label: '연속 체인',
      value: userStats.chainLength,
      color: 'text-accent',
      bgColor: 'bg-cyan-50'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: '긍정 점수',
      value: userStats.positivityScore,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-xl p-4 text-center transform hover:scale-105 transition-transform animate-slide-up`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`${stat.color} mb-2 flex justify-center`}>
            {stat.icon}
          </div>
          <div className="text-2xl font-bold text-dark">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}