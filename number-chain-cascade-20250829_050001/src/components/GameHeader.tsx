
import { Sparkles, HelpCircle, Volume2 } from 'lucide-react';

const GameHeader: React.FC = () => {
  const [showHelp, setShowHelp] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  return (
    <>
      <header className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            <h1 className="text-white text-xl sm:text-2xl font-bold">
              Number Chain Cascade
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-all ${
                soundEnabled ? 'bg-white/20 text-white' : 'bg-white/10 text-white/50'
              }`}
            >
              <Volume2 className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-all"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
      
      {showHelp && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 shadow-xl text-white">
          <h3 className="text-lg font-semibold mb-2">게임 방법</h3>
          <ul className="space-y-2 text-sm">
            <li>• 숫자 블록을 선택하고 인접한 위치로 이동시키세요</li>
            <li>• 연속된 숫자 (예: 3과 4)가 만나면 합쳐져서 더 큰 숫자가 됩니다</li>
            <li>• 연쇄 반응을 일으켜 높은 점수를 획득하세요</li>
            <li>• 연쇄 배율(x1.0~x5.0)이 높을수록 더 많은 점수를 얻습니다</li>
            <li>• 최대한 많은 연쇄 반응을 만들어 최고 점수에 도전하세요!</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default GameHeader;