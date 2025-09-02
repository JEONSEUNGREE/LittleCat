
import { HelpCircle, X } from 'lucide-react';

export const Instructions: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-colors z-10"
      >
        <HelpCircle className="w-6 h-6 text-white" />
      </button>
      
      {isOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              How to Play 🚀
            </h2>
            
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">1.</span>
                <p>Click anywhere on the screen to launch your rocket in that direction</p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">2.</span>
                <p>Each planet has different gravity that will affect your trajectory</p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">3.</span>
                <p>Land on the green goal planet to complete the level</p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">4.</span>
                <p>You have limited jumps - use them wisely!</p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">5.</span>
                <p>Don't drift off into space or you'll be lost forever!</p>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-purple-900/50 rounded-lg">
              <p className="text-sm text-purple-300">
                <strong>Pro tip:</strong> Larger planets have stronger gravity. Use them to slingshot around!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};