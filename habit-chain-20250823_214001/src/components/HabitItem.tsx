import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Edit3, 
  Trash2, 
  Target, 
  Heart, 
  Book, 
  Dumbbell, 
  Coffee, 
  Moon, 
  Sun, 
  Droplet, 
  Zap, 
  Star,
  Leaf,
  Brain,
  MoreVertical,
  Archive
} from 'lucide-react';
import { HabitWithStats } from '../types/habit';
import { useHabitStore } from '../store/habitStore';

interface HabitItemProps {
  habit: HabitWithStats;
}

const iconMap = {
  target: Target,
  heart: Heart,
  book: Book,
  dumbbell: Dumbbell,
  coffee: Coffee,
  moon: Moon,
  sun: Sun,
  droplet: Droplet,
  zap: Zap,
  star: Star,
  leaf: Leaf,
  brain: Brain,
};

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    icon: 'text-blue-600',
    completed: 'bg-blue-500',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    icon: 'text-green-600',
    completed: 'bg-green-500',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    icon: 'text-purple-600',
    completed: 'bg-purple-500',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    icon: 'text-red-600',
    completed: 'bg-red-500',
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-600',
    icon: 'text-yellow-600',
    completed: 'bg-yellow-500',
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    text: 'text-pink-600',
    icon: 'text-pink-600',
    completed: 'bg-pink-500',
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-600',
    icon: 'text-indigo-600',
    completed: 'bg-indigo-500',
  },
  gray: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-600',
    icon: 'text-gray-600',
    completed: 'bg-gray-500',
  },
};

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
  const { toggleHabitCompletion, openModal, deleteHabit, archiveHabit } = useHabitStore();
  const [showMenu, setShowMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const Icon = iconMap[habit.icon] || Target;
  const colors = colorMap[habit.color] || colorMap.blue;

  const handleToggleCompletion = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    toggleHabitCompletion(habit.id);
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleEdit = () => {
    setShowMenu(false);
    openModal(habit);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this habit? This action cannot be undone.')) {
      deleteHabit(habit.id);
    }
    setShowMenu(false);
  };

  const handleArchive = () => {
    archiveHabit(habit.id);
    setShowMenu(false);
  };

  // Create chain visualization
  const chainLinks = Array.from({ length: Math.min(habit.stats.currentStreak, 7) }, (_, i) => i);

  return (
    <motion.div
      layout
      className={`relative bg-white rounded-xl border-2 ${colors.border} ${
        habit.isCompletedToday ? colors.bg : 'bg-white'
      } habit-card-shadow habit-card-hover transition-all duration-200`}
    >
      {/* Main Content */}
      <div className="p-4">
        <div className="flex items-center space-x-4">
          {/* Completion Button */}
          <motion.button
            onClick={handleToggleCompletion}
            className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 touch-active ${
              habit.isCompletedToday
                ? `${colors.completed} border-transparent text-white shadow-lg animate-pulse-success`
                : `${colors.border} hover:${colors.bg} ${colors.text}`
            }`}
            whileTap={{ scale: 0.95 }}
            disabled={isAnimating}
          >
            <AnimatePresence>
              {habit.isCompletedToday ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Habit Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className={`font-semibold text-gray-900 truncate ${
                habit.isCompletedToday ? 'opacity-75' : ''
              }`}>
                {habit.name}
              </h3>
              
              {/* Menu Button */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                    >
                      <button
                        onClick={handleEdit}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Edit3 className="w-4 h-4 mr-3" />
                        Edit
                      </button>
                      <button
                        onClick={handleArchive}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Archive className="w-4 h-4 mr-3" />
                        Archive
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-3" />
                        Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {habit.description && (
              <p className={`text-sm text-gray-500 mt-1 ${
                habit.isCompletedToday ? 'opacity-75' : ''
              }`}>
                {habit.description}
              </p>
            )}

            {/* Stats Row */}
            <div className="flex items-center space-x-4 mt-3">
              {/* Current Streak */}
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  habit.stats.currentStreak > 0 ? colors.completed : 'bg-gray-300'
                }`} />
                <span className="text-xs font-medium text-gray-600">
                  {habit.stats.currentStreak} day{habit.stats.currentStreak !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Completion Rate */}
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500">
                  {habit.stats.completionRate}% rate
                </span>
              </div>

              {/* Best Streak */}
              {habit.stats.longestStreak > habit.stats.currentStreak && (
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-400">
                    best: {habit.stats.longestStreak}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chain Visualization */}
        {habit.stats.currentStreak > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-1 overflow-x-auto">
              <span className="text-xs text-gray-500 mr-2 whitespace-nowrap">
                Streak:
              </span>
              <div className="flex items-center space-x-1">
                {chainLinks.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-6 h-6 rounded-full ${colors.completed} flex items-center justify-center chain-link`}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                ))}
                {habit.stats.currentStreak > 7 && (
                  <span className="text-xs text-gray-400 ml-2">
                    +{habit.stats.currentStreak - 7}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click overlay to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-[5]"
          onClick={() => setShowMenu(false)}
        />
      )}
    </motion.div>
  );
};

export default HabitItem;