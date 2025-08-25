import { UnitCategory } from '../types';
import { unitData } from '../data/units';
import { useConverterStore } from '../store/useConverterStore';
import * as Icons from 'lucide-react';

const CategorySelector = () => {
  const { selectedCategory, setCategory, setFromUnit, setToUnit } = useConverterStore();

  const handleCategoryChange = (category: UnitCategory) => {
    setCategory(category);
    const units = Object.keys(unitData[category].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
        Select Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {(Object.keys(unitData) as UnitCategory[]).map((category) => {
          const IconComponent = Icons[unitData[category].icon as keyof typeof Icons] as any;
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200 transform hover:scale-105
                ${isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                <IconComponent 
                  size={24} 
                  className={isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}
                />
                <span className={`text-sm font-medium ${
                  isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {unitData[category].name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;