
import { useGameStore } from '../store/gameStore';
import { levels } from '../data/levels';
import { RefreshCw, Lightbulb, ChevronRight } from 'lucide-react';

const ToolBar: React.FC = () => {
  const { 
    currentLevel, 
    selectedTool, 
    selectTool, 
    resetLevel, 
    useHint, 
    hints,
    nextLevel,
    levelComplete
  } = useGameStore();
  
  const level = levels.find(l => l.id === currentLevel);
  if (!level) return null;
  
  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* 도구 선택 영역 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">도구 선택</h3>
        <div className="flex flex-wrap gap-2">
          {level.tools.map((tool, index) => (
            <button
              key={index}
              onClick={() => selectTool(selectedTool === tool.type ? null : tool.type)}
              className={`
                tool-button
                px-4 py-3 rounded-lg
                border-2 transition-all duration-200
                ${selectedTool === tool.type 
                  ? 'border-laser-blue bg-laser-blue/20 scale-105' 
                  : 'border-gray-600 hover:border-gray-400'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <div className={`
                  w-6 h-6 rounded
                  ${tool.type === 'mirror' ? 'mirror-surface' : 'prism-glass'}
                `} />
                <span className="text-sm capitalize">
                  {tool.type === 'mirror' ? '거울' : 
                   tool.type === 'prism' ? '프리즘' : 
                   '분할기'}
                </span>
                <span className="text-xs text-gray-400">×{tool.count}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* 액션 버튼 영역 */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={resetLevel}
          className="tool-button px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-400 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>리셋</span>
        </button>
        
        <button
          onClick={useHint}
          disabled={hints === 0}
          className={`
            tool-button px-4 py-2 rounded-lg border flex items-center gap-2
            ${hints > 0 
              ? 'border-yellow-600 hover:border-yellow-400 text-yellow-400' 
              : 'border-gray-700 text-gray-600 cursor-not-allowed opacity-50'
            }
          `}
        >
          <Lightbulb className="w-4 h-4" />
          <span>힌트 ({hints})</span>
        </button>
        
        {levelComplete && (
          <button
            onClick={nextLevel}
            className="tool-button px-4 py-2 rounded-lg border border-green-600 hover:border-green-400 text-green-400 flex items-center gap-2 animate-pulse"
          >
            <span>다음 레벨</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ToolBar;