import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, X, Trash2, Copy, Check } from 'lucide-react';
import { Fortune } from '../types';
import { shareUtils } from '../utils/share';

interface FortuneHistoryProps {
  fortunes: Fortune[];
  onClear: () => void;
}

const FortuneHistory: React.FC<FortuneHistoryProps> = ({ fortunes, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (fortune: Fortune) => {
    await shareUtils.copyToClipboard(fortune.text);
    setCopiedId(fortune.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'love': return 'bg-red-100 text-red-700';
      case 'career': return 'bg-blue-100 text-blue-700';
      case 'life': return 'bg-green-100 text-green-700';
      case 'funny': return 'bg-purple-100 text-purple-700';
      case 'custom': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="relative bg-white text-gray-700 rounded-full p-3 shadow-md hover:shadow-lg transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <History size={20} />
        {fortunes.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {fortunes.length}
          </span>
        )}
      </motion.button>

      {/* History drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-bold text-gray-800">Fortune History</h3>
                <div className="flex items-center gap-2">
                  {fortunes.length > 0 && (
                    <button
                      onClick={onClear}
                      className="text-red-500 hover:text-red-600 transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {fortunes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                    <History size={48} className="mb-4" />
                    <p className="text-center">No fortunes yet!</p>
                    <p className="text-sm text-center mt-2">Your fortune history will appear here</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    {fortunes.map((fortune, index) => (
                      <motion.div
                        key={fortune.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(fortune.category)}`}>
                            {fortune.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(fortune.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{fortune.text}</p>
                        <button
                          onClick={() => handleCopy(fortune)}
                          className="text-xs text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
                        >
                          {copiedId === fortune.id ? (
                            <>
                              <Check size={14} />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              Copy
                            </>
                          )}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FortuneHistory;