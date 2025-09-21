import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FortuneCookieProps {
  onCrack: () => void;
  isCracked: boolean;
}

const FortuneCookie: React.FC<FortuneCookieProps> = ({ onCrack, isCracked }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-64 h-64 mx-auto">
      <AnimatePresence mode="wait">
        {!isCracked ? (
          <motion.div
            key="whole-cookie"
            className="relative cursor-pointer"
            onClick={onCrack}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ scale: 1, rotate: 0 }}
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              rotate: isHovered ? [0, -2, 2, -2, 0] : 0,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Cookie body */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-lg"
            >
              <defs>
                <linearGradient id="cookieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F4A460" />
                  <stop offset="50%" stopColor="#DEB887" />
                  <stop offset="100%" stopColor="#CD853F" />
                </linearGradient>
                <filter id="roughPaper">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                  <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1">
                    <fePointLight x="-50" y="60" z="200" />
                  </feDiffuseLighting>
                </filter>
              </defs>
              
              {/* Main cookie shape */}
              <path
                d="M 30 100 Q 100 40, 170 100 Q 100 160, 30 100"
                fill="url(#cookieGradient)"
                stroke="#CD853F"
                strokeWidth="2"
                filter="url(#roughPaper)"
              />
              
              {/* Cookie texture lines */}
              <path
                d="M 50 100 Q 100 80, 150 100"
                fill="none"
                stroke="#DEB887"
                strokeWidth="1"
                opacity="0.5"
              />
              <path
                d="M 50 100 Q 100 120, 150 100"
                fill="none"
                stroke="#DEB887"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>

            {/* Hover hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span className="text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                Click to crack open!
              </span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="cracked-cookie"
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Left half */}
            <motion.svg
              viewBox="0 0 100 200"
              className="absolute left-0 w-32 h-64 drop-shadow-lg"
              initial={{ x: 0, rotate: 0 }}
              animate={{ x: -20, rotate: -15 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <defs>
                <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F4A460" />
                  <stop offset="100%" stopColor="#CD853F" />
                </linearGradient>
              </defs>
              <path
                d="M 30 100 Q 70 40, 95 100 Q 70 160, 30 100"
                fill="url(#leftGradient)"
                stroke="#CD853F"
                strokeWidth="2"
              />
            </motion.svg>

            {/* Right half */}
            <motion.svg
              viewBox="100 0 100 200"
              className="absolute right-0 w-32 h-64 drop-shadow-lg"
              initial={{ x: 0, rotate: 0 }}
              animate={{ x: 20, rotate: 15 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <defs>
                <linearGradient id="rightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#CD853F" />
                  <stop offset="100%" stopColor="#F4A460" />
                </linearGradient>
              </defs>
              <path
                d="M 105 100 Q 130 40, 170 100 Q 130 160, 105 100"
                fill="url(#rightGradient)"
                stroke="#CD853F"
                strokeWidth="2"
              />
            </motion.svg>

            {/* Fortune paper in the middle */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <div className="w-40 h-8 bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-300 shadow-md" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FortuneCookie;