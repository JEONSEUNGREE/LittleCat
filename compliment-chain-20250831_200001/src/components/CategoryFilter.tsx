import { Filter } from 'lucide-react';
import { useStore } from '../store/useStore';

const categories = [
  { value: 'all', label: '전체', emoji: '✨' },
  { value: 'kindness', label: '친절함', emoji: '🤝' },
  { value: 'achievement', label: '성취', emoji: '🏆' },
  { value: 'personality', label: '성격', emoji: '💫' },
  { value: 'effort', label: '노력', emoji: '💪' },
  { value: 'creativity', label: '창의성', emoji: '🎨' }
];

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mt-6">
      <div className="flex items-center mb-3">
        <Filter className="w-4 h-4 mr-2 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">카테고리 필터</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.value
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}