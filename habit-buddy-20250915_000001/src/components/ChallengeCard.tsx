import { Challenge } from '../store/habitStore';
import { Users, Calendar, TrendingUp } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progressPercentage = (challenge.progress / 100) * 100;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{challenge.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{challenge.description}</p>
        </div>
        <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
          D-{challenge.daysRemaining}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">진행률</span>
          <span className="text-xs font-semibold text-gray-700">{challenge.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-primary-400 to-primary-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-gray-600">
            <Users size={14} />
            <span className="text-xs">{challenge.participants.length}명</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Calendar size={14} />
            <span className="text-xs">{challenge.totalDays}일</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <TrendingUp size={14} />
            <span className="text-xs">진행중</span>
          </div>
        </div>

        <div className="flex -space-x-2">
          {challenge.participants.slice(0, 3).map((participant) => (
            <div
              key={participant.id}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-purple-400 flex items-center justify-center text-white text-sm font-medium border-2 border-white"
            >
              {participant.avatar}
            </div>
          ))}
          {challenge.participants.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
              +{challenge.participants.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}