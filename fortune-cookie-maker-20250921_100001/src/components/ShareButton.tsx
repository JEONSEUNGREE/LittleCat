import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, Copy, Check, Camera } from 'lucide-react';
import { shareUtils } from '../utils/share';

interface ShareButtonProps {
  fortuneText: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ fortuneText }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleShareText = async () => {
    await shareUtils.shareText(fortuneText);
    setIsMenuOpen(false);
  };

  const handleCopyText = async () => {
    await shareUtils.copyToClipboard(fortuneText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setIsMenuOpen(false);
  };

  const handleShareImage = async () => {
    setIsCapturing(true);
    try {
      const blob = await shareUtils.captureElement('fortune-display');
      if (blob) {
        await shareUtils.shareImage(blob);
      }
    } finally {
      setIsCapturing(false);
      setIsMenuOpen(false);
    }
  };

  const handleDownloadImage = async () => {
    setIsCapturing(true);
    try {
      const blob = await shareUtils.captureElement('fortune-display');
      if (blob) {
        shareUtils.downloadImage(blob);
      }
    } finally {
      setIsCapturing(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Main share button */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="bg-gradient-to-r from-fortune-red to-fortune-gold text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isCapturing}
      >
        {isCapturing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Camera size={24} />
          </motion.div>
        ) : (
          <Share2 size={24} />
        )}
      </motion.button>

      {/* Share menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-xl p-2 min-w-[160px] z-50"
          >
            {/* Share as text */}
            <button
              onClick={handleShareText}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              <Share2 size={18} className="text-gray-600" />
              <span className="text-sm text-gray-700">Share Text</span>
            </button>

            {/* Copy to clipboard */}
            <button
              onClick={handleCopyText}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              {copied ? (
                <Check size={18} className="text-green-600" />
              ) : (
                <Copy size={18} className="text-gray-600" />
              )}
              <span className="text-sm text-gray-700">
                {copied ? 'Copied!' : 'Copy Text'}
              </span>
            </button>

            {/* Share as image */}
            <button
              onClick={handleShareImage}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              <Camera size={18} className="text-gray-600" />
              <span className="text-sm text-gray-700">Share Image</span>
            </button>

            {/* Download image */}
            <button
              onClick={handleDownloadImage}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              <Download size={18} className="text-gray-600" />
              <span className="text-sm text-gray-700">Save Image</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton;