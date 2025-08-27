import { useState, useEffect } from 'react';
import { Mic, Package, Bell, Info, Plus } from 'lucide-react';
import RecordButton from './components/RecordButton';
import CapsuleList from './components/CapsuleList';
import CreateCapsule from './components/CreateCapsule';
import useStore from './store';

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { currentRecording, capsules } = useStore();

  useEffect(() => {
    if (currentRecording) {
      setShowCreateModal(true);
    }
  }, [currentRecording]);

  const unOpenedCount = capsules.filter(c => !c.isOpened && new Date() >= c.openAt).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Voice Capsule</h1>
                <p className="text-white/60 text-sm">음성 메시지를 미래로 보내세요</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {unOpenedCount > 0 && (
                <div className="relative">
                  <Bell className="w-6 h-6 text-white/80 animate-pulse" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unOpenedCount}
                  </span>
                </div>
              )}
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Info className="w-6 h-6 text-white/80" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-float">
            미래로 보내는 음성 타임캡슐 
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            소중한 순간의 목소리를 녹음하고, 원하는 날짜에 열어보세요.
            친구들과 함께 추억을 공유하고 반응을 나눠보세요.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">{capsules.length}</div>
            <div className="text-white/60">총 캡슐</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-accent mb-2">
              {capsules.filter(c => c.isOpened).length}
            </div>
            <div className="text-white/60">열린 캡슐</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-primary mb-2">
              {capsules.filter(c => !c.isOpened).length}
            </div>
            <div className="text-white/60">대기 중</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => {
              const recordBtn = document.querySelector<HTMLButtonElement>('.animate-glow');
              recordBtn?.click();
            }}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-300 flex items-center gap-3 shadow-xl"
          >
            <Mic className="w-6 h-6" />
            새 캡슐 녹음하기
          </button>
        </div>
      </div>

      {/* Capsule List */}
      <CapsuleList />

      {/* Floating Record Button */}
      <RecordButton />

      {/* Create Modal */}
      <CreateCapsule isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
}

export default App;