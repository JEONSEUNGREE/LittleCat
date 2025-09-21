import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Save, X } from 'lucide-react';

interface CustomFortuneInputProps {
  onSave: (text: string) => void;
}

const CustomFortuneInput: React.FC<CustomFortuneInputProps> = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (customText.trim().length < 10) {
      setError('Fortune must be at least 10 characters long');
      return;
    }
    if (customText.trim().length > 200) {
      setError('Fortune must be less than 200 characters');
      return;
    }
    
    onSave(customText.trim());
    setCustomText('');
    setIsOpen(false);
    setError('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setCustomText('');
    setError('');
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="bg-white text-amber-600 border-2 border-amber-400 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Edit3 size={18} />
        <span className="text-sm font-medium">Create Custom Fortune</span>
      </motion.button>

      {/* Custom fortune modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-lg shadow-xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Create Your Fortune</h3>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <textarea
                    value={customText}
                    onChange={(e) => {
                      setCustomText(e.target.value);
                      setError('');
                    }}
                    placeholder="Write your custom fortune here..."
                    className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none resize-none"
                    rows={4}
                    maxLength={200}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <span className={`text-xs ${customText.length > 180 ? 'text-amber-600' : 'text-gray-400'}`}>
                      {customText.length}/200 characters
                    </span>
                    {error && (
                      <span className="text-xs text-red-500">{error}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    Save Fortune
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomFortuneInput;