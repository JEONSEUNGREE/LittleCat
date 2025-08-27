
import { Calendar, Clock, Lock, Unlock, Heart, MessageCircle, Share2 } from 'lucide-react';
import useStore from '../store';
import { VoiceCapsule } from '../types';

const CapsuleCard: React.FC<{ capsule: VoiceCapsule }> = ({ capsule }) => {
  const { openCapsule, addReaction } = useStore();
  const canOpen = new Date() >= capsule.openAt;
  const daysLeft = Math.ceil((capsule.openAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const handleOpen = () => {
    if (canOpen && !capsule.isOpened) {
      openCapsule(capsule.id);
    }
  };

  const handleReaction = () => {
    const reactions = ['❤️', '👍', '🎉', '🔥', '💫'];
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    addReaction(capsule.id, randomReaction);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{capsule.title}</h3>
        <div className="flex items-center gap-2">
          {capsule.isPublic ? (
            <Unlock className="w-4 h-4 text-green-400" />
          ) : (
            <Lock className="w-4 h-4 text-yellow-400" />
          )}
        </div>
      </div>
      
      <p className="text-white/70 mb-4 text-sm">{capsule.message}</p>
      
      <div className="flex items-center gap-4 text-white/60 text-sm mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{capsule.openAt.toLocaleDateString('ko-KR')}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{capsule.duration}초</span>
        </div>
      </div>

      {!canOpen ? (
        <div className="bg-yellow-500/20 rounded-lg p-3 text-center">
          <p className="text-yellow-300 font-medium">
            {daysLeft}일 후 열 수 있어요! 🔒
          </p>
        </div>
      ) : capsule.isOpened ? (
        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg hover:opacity-90 transition-opacity">
            재생하기 ▶️
          </button>
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {capsule.reactions.slice(0, 5).map((reaction, idx) => (
                <span key={idx} className="text-lg">{reaction}</span>
              ))}
              {capsule.reactions.length > 5 && (
                <span className="text-white/60 text-sm">+{capsule.reactions.length - 5}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={handleReaction} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={handleOpen}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity animate-pulse-slow"
        >
          캡슐 열기 🎁
        </button>
      )}
    </div>
  );
};

const CapsuleList: React.FC = () => {
  const { capsules } = useStore();

  return (
    <div className="max-w-6xl mx-auto px-4 pb-32">
      <h2 className="text-2xl font-bold mb-6 text-white">내 보이스 캡슐</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capsules.map((capsule) => (
          <CapsuleCard key={capsule.id} capsule={capsule} />
        ))}
      </div>
      {capsules.length === 0 && (
        <div className="text-center py-12 text-white/60">
          <p className="text-lg mb-2">아직 캡슐이 없어요</p>
          <p>첫 번째 음성 메시지를 녹음해보세요! 🎤</p>
        </div>
      )}
    </div>
  );
};

export default CapsuleList;