import { useConverterStore } from '../store/useConverterStore';
import { Category } from '../types/converter';

export const CategorySelector = () => {
  const { categories, selectedCategory, selectCategory } = useConverterStore();

  return (
    <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6">
      <h2 className="text-white text-sm font-medium mb-3 px-2">카테고리 선택</h2>
      <div className="grid grid-cols-4 gap-2">
        {categories.map((category: Category) => (
          <button
            key={category.name}
            onClick={() => selectCategory(category)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-xl transition-all
              ${selectedCategory?.name === category.name 
                ? 'bg-white text-purple-600 shadow-lg scale-105' 
                : 'bg-white/20 text-white hover:bg-white/30'}
            `}
          >
            <span className="text-2xl mb-1">{category.icon}</span>
            <span className="text-xs font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};