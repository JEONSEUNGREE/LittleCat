import { useState } from 'react';
import { X, Calendar, Users, Globe, Lock, Send, Mic } from 'lucide-react';
import useStore from '../store';
import { VoiceCapsule } from '../types';

interface CreateCapsuleProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCapsule: React.FC<CreateCapsuleProps> = ({ isOpen, onClose }) => {
  const { currentRecording, addCapsule } = useStore();
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentRecording || !title || !openDate) {
      alert('필수 정보를 모두 입력해주세요!');
      return;
    }

    const audioUrl = URL.createObjectURL(currentRecording);
    
    const newCapsule: VoiceCapsule = {
      id: `capsule-${Date.now()}`,
      title,
      audioUrl,
      audioBlob: currentRecording,
      createdAt: new Date(),
      openAt: new Date(openDate),
      isOpened: false,
      duration: 30,
      recipient: recipient || '미래의 나',
      message,
      isPublic,
      reactions: [],
    };

    addCapsule(newCapsule);
    
    // Reset form
    setTitle('');
    setRecipient('');
    setMessage('');
    setOpenDate('');
    setIsPublic(false);
    onClose();
  };

  if (!isOpen) return null;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-800 to-purple-800 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">새 보이스 캡슐 만들기</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {currentRecording && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 text-green-400">
              <Mic className="w-5 h-5" />
              <span className="font-medium">음성이 녹음되었어요!</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              캡슐 제목 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
              placeholder="예: 1년 후 나에게"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              받는 사람
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
              placeholder="예: 미래의 나, 친구 이름"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              메시지 설명
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary resize-none"
              placeholder="캡슐에 대한 간단한 설명..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              열 수 있는 날짜 *
            </label>
            <div className="relative">
              <input
                type="date"
                value={openDate}
                onChange={(e) => setOpenDate(e.target.value)}
                min={minDate}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary"
                required
              />
              <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-white/50 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              {isPublic ? (
                <Globe className="w-5 h-5 text-green-400" />
              ) : (
                <Lock className="w-5 h-5 text-yellow-400" />
              )}
              <span className="text-white/80">
                {isPublic ? '공개 캡슐' : '비공개 캡슐'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <button
            type="submit"
            disabled={!currentRecording}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            캡슐 만들기
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCapsule;