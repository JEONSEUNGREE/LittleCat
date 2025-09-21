
import { motion } from 'framer-motion';
import { Heart, Briefcase, Star, Smile } from 'lucide-react';
import { FortuneCategory } from '../types';

interface CategorySelectorProps {
  selectedCategory: FortuneCategory;
  onCategoryChange: (category: FortuneCategory) => void;
  disabled?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  selectedCategory, 
  onCategoryChange,
  disabled = false 
}) => {
  const categories: { value: FortuneCategory; label: string; icon: React.ReactNode; color: string }[] = [
    { 
      value: 'love', 
      label: 'Love', 
      icon: <Heart size={18} />,
      color: 'from-red-400 to-pink-500'
    },
    { 
      value: 'career', 
      label: 'Career', 
      icon: <Briefcase size={18} />,
      color: 'from-blue-400 to-indigo-500'
    },
    { 
      value: 'life', 
      label: 'Life', 
      icon: <Star size={18} />,
      color: 'from-green-400 to-emerald-500'
    },
    { 
      value: 'funny', 
      label: 'Funny', 
      icon: <Smile size={18} />,
      color: 'from-purple-400 to-pink-500'
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <motion.button
          key={category.value}
          onClick={() => !disabled && onCategoryChange(category.value)}
          disabled={disabled}
          className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all ${
            selectedCategory === category.value
              ? 'text-white shadow-lg'
              : 'text-gray-600 bg-white shadow-md hover:shadow-lg'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
        >
          {selectedCategory === category.value && (
            <motion.div
              layoutId="category-bg"
              className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-full`}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className={`relative flex items-center gap-2 ${
            selectedCategory === category.value ? 'text-white' : ''
          }`}>
            {category.icon}
            {category.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategorySelector;