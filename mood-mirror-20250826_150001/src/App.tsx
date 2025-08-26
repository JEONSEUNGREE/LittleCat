import React, { useEffect } from 'react';
import { Brain, Users, MessageCircle, BarChart3 } from 'lucide-react';
import { useMoodStore } from './store/useMoodStore';
import { MoodSelector } from './components/MoodSelector';
import { MoodVisualization } from './components/MoodVisualization';
import { MessageFeed } from './components/MessageFeed';
import { MoodHistory } from './components/MoodHistory';

function App() {
  const [activeTab, setActiveTab] = React.useState<'mood' | 'connect' | 'messages' | 'history'>('mood');
  const { currentUser, setCurrentUser, connectedUsers, generateMockUsers } = useMoodStore();

  useEffect(() => {
    // Initialize user on mount
    if (!currentUser) {
      setCurrentUser({
        id: 'user-' + Date.now(),
        username: 'Me',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me'
      });
    }
    
    // Generate mock connected users
    generateMockUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const tabs = [
    { id: 'mood' as const, label: '기분', icon: Brain },
    { id: 'connect' as const, label: '연결', icon: Users },
    { id: 'messages' as const, label: '메시지', icon: MessageCircle },
    { id: 'history' as const, label: '기록', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-2 pt-8">
          <h1 className="text-4xl font-bold text-white">
            Mood Mirror
          </h1>
          <p className="text-white/80 text-sm">
            당신의 감정을 공유하고 연결하세요
          </p>
        </header>

        {/* Content */}
        <main className="space-y-6">
          {activeTab === 'mood' && <MoodSelector />}
          {activeTab === 'connect' && (
            <div className="space-y-4">
              <MoodVisualization users={connectedUsers} currentUser={currentUser} />
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <p className="text-white text-sm text-center">
                  비슷한 기분의 {connectedUsers.length}명과 연결되었습니다
                </p>
              </div>
            </div>
          )}
          {activeTab === 'messages' && <MessageFeed />}
          {activeTab === 'history' && <MoodHistory />}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-4">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`
                    py-3 px-4 flex flex-col items-center space-y-1 transition-colors
                    ${activeTab === id ? 'text-white' : 'text-white/60'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;