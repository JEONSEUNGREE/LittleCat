import { Heart, Clock } from 'lucide-react';
import { Compliment } from '../types';
import { useStore } from '../store/useStore';

interface ComplimentCardProps {
  compliment: Compliment;
}

export default function ComplimentCard({ compliment }: ComplimentCardProps) {
  const { reactToCompliment } = useStore();

  const getCategoryEmoji = (category: Compliment['category']) => {
    switch (category) {
      case 'kindness': return '🤝';
      case 'achievement': return '🏆';
      case 'personality': return '✨';
      case 'effort': return '💪';
      case 'creativity': return '🎨';
      default: return '💫';
    }
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  return (
    <div 
      className="card-hover bg-white rounded-xl shadow-md p-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${compliment.color}15 0%, white 100%)`
      }}
    >
      {/* Category Badge */}
      <div className="absolute top-4 right-4 text-2xl">
        {getCategoryEmoji(compliment.category)}
      </div>

      {/* Message */}
      <div className="mb-4 pr-8">
        <p className="text-gray-800 leading-relaxed">
          {compliment.message}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => reactToCompliment(compliment.id)}
          className="btn-press flex items-center space-x-1 text-gray-500 hover:text-secondary transition-colors"
        >
          <Heart className="w-4 h-4" fill={compliment.reactions > 0 ? 'currentColor' : 'none'} />
          <span className="text-sm">{compliment.reactions}</span>
        </button>

        <div className="flex items-center text-gray-400 text-sm">
          <Clock className="w-3 h-3 mr-1" />
          <span>{formatTime(compliment.timestamp)}</span>
        </div>
      </div>

      {/* Decorative element */}
      <div 
        className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full opacity-10"
        style={{ backgroundColor: compliment.color }}
      />
    </div>
  );
}