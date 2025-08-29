import React from 'react';
import { 
  Ruler, Scale, Thermometer, Beaker, Square, Zap, Clock, HardDrive 
} from 'lucide-react';
import { useConverterStore } from '../store/converterStore';
import { Category } from '../types/converter';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Ruler, Scale, Thermometer, Beaker, Square, Zap, Clock, HardDrive
};

export const CategorySelector: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useConverterStore();

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        변환 카테고리 선택
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const isSelected = selectedCategory?.id === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`
                category-card flex flex-col items-center justify-center p-4 gap-2
                ${isSelected ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''}
              `}
            >
              <div className={`p-3 rounded-full ${category.color} text-white`}>
                {Icon && <Icon size={24} />}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};