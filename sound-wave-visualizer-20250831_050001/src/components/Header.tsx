import { Waves, Info } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <header className="w-full p-4 md:p-6 glass-effect">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neon-blue/20 rounded-lg">
            <Waves size={28} className="text-neon-blue" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Sound Wave Visualizer
            </h1>
            <p className="text-sm text-gray-400 mt-1">Turn sound into art</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-3 rounded-lg glass-effect hover:bg-white/10 transition-all duration-300"
        >
          <Info size={20} />
        </button>
      </div>
      
      {showInfo && (
        <div className="absolute top-20 right-4 md:right-6 p-4 glass-effect rounded-lg max-w-sm z-50">
          <h3 className="font-semibold mb-2 text-neon-blue">How to use:</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Click "Start Recording" to capture audio</li>
            <li>• Watch real-time visualizations</li>
            <li>• Change visualization types in settings</li>
            <li>• Adjust sensitivity for better response</li>
            <li>• Try different color schemes</li>
          </ul>
          <button 
            onClick={() => setShowInfo(false)}
            className="mt-3 text-xs text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;