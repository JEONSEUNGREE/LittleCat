import { useHabitStore } from '../store/habitStore';
import { Trophy, Flame, MessageCircle } from 'lucide-react';

export default function FriendsList() {
  const { friends } = useHabitStore();

  return (
    <div className="space-y-3">
      {friends.map((friend) => (
        <div key={friend.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xl">
                  {friend.avatar}
                </div>
                {friend.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{friend.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Flame size={12} className="text-orange-500" />
                    {friend.streak}일
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Trophy size={12} className="text-yellow-500" />
                    {friend.habitsCompleted}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 bg-primary-50 hover:bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 transition-colors">
                <MessageCircle size={16} />
              </button>
              <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors">
                응원하기
              </button>
            </div>
          </div>

          {friend.streak > 10 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                  🔥 연속 {friend.streak}일 달성!
                </span>
                {friend.habitsCompleted > 100 && (
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                    🏆 습관 마스터
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <button className="w-full py-4 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-600 font-medium transition-colors">
        + 친구 초대하기
      </button>
    </div>
  );
}