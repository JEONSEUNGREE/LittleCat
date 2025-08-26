import { Trash2, ArrowRight } from 'lucide-react';
import { useConverterStore } from '../store/useConverterStore';

export const FavoritesList = () => {
  const { favorites, removeFavorite, applyFavorite } = useConverterStore();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 mt-6">
      <h3 className="text-white text-sm font-medium mb-3 px-2">즐겨찾기</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {favorites.map((favorite, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-all cursor-pointer group"
            onClick={() => applyFavorite(favorite)}
          >
            <div className="flex items-center gap-2 text-white">
              <span className="text-sm font-medium">{favorite.category}</span>
              <span className="text-xs opacity-80">
                {favorite.from} <ArrowRight size={12} className="inline mx-1" /> {favorite.to}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFavorite(index);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
            >
              <Trash2 size={16} className="text-red-200" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};