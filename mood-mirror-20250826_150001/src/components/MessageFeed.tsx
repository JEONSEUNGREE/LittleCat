import React, { useState } from 'react';
import { Send, Heart, Users } from 'lucide-react';
import { MoodMessage } from '../types';
import { useMoodStore } from '../store/useMoodStore';

export const MessageFeed: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const messages = useMoodStore((state) => state.messages);
  const addMessage = useMoodStore((state) => state.addMessage);
  const currentUser = useMoodStore((state) => state.currentUser);

  const handleSendMessage = () => {
    if (newMessage.trim() && currentUser) {
      const message: MoodMessage = {
        id: Date.now().toString(),
        fromUserId: currentUser.id,
        toUserId: 'all', // Broadcast to all users with similar mood
        message: newMessage,
        timestamp: new Date(),
        isAnonymous
      };
      
      addMessage(message);
      setNewMessage('');
    }
  };

  // Mock messages for demonstration
  React.useEffect(() => {
    const mockMessages: MoodMessage[] = [
      {
        id: '1',
        fromUserId: 'user1',
        toUserId: 'all',
        message: '오늘 정말 힘든 하루였어요. 같이 이겨내요 💪',
        timestamp: new Date(Date.now() - 3600000),
        isAnonymous: true
      },
      {
        id: '2',
        fromUserId: 'user2',
        toUserId: 'all',
        message: '좋은 일이 있었나봐요! 긍정적인 에너지 나눠주세요 ✨',
        timestamp: new Date(Date.now() - 7200000),
        isAnonymous: false
      }
    ];
    
    mockMessages.forEach(msg => addMessage(msg));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-4 max-h-96 flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>감정 공유 메시지</span>
        </h3>
        <span className="text-xs text-white/60">비슷한 기분의 사람들과 연결</span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-white/10 rounded-lg p-3 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">
                {message.isAnonymous ? '익명' : `User ${message.fromUserId}`}
              </span>
              <span className="text-xs text-white/40">
                {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <p className="text-white text-sm">{message.message}</p>
            <button className="text-white/60 hover:text-white transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="anonymous" className="text-xs text-white/70">
            익명으로 보내기
          </label>
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="따뜻한 메시지를 남겨주세요..."
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-white/30 text-white rounded-lg hover:bg-white/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};