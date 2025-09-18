import { useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const Shop: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { coins, seeds, buySeed } = useGameStore();

  const shopItems = [
    { id: 'tomato' as const, emoji: '🍅', name: '토마토 씨앗', price: 5 },
    { id: 'carrot' as const, emoji: '🥕', name: '당근 씨앗', price: 8 },
    { id: 'sunflower' as const, emoji: '🌻', name: '해바라기 씨앗', price: 12 },
    { id: 'corn' as const, emoji: '🌽', name: '옥수수 씨앗', price: 18 },
    { id: 'pumpkin' as const, emoji: '🎃', name: '호박 씨앗', price: 25 },
  ];

  const handlePurchase = (itemId: keyof typeof seeds) => {
    buySeed(itemId);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition-colors z-40"
      >
        <ShoppingBag size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold pixel-text">🏪 상점</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4 bg-yellow-100 p-3 rounded-lg flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <span className="font-bold pixel-text">{coins} 코인</span>
              </div>
              
              <div className="space-y-3">
                {shopItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <div className="font-medium pixel-text">{item.name}</div>
                        <div className="text-sm text-gray-600">보유: {seeds[item.id]}개</div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handlePurchase(item.id)}
                      disabled={coins < item.price}
                      className={`
                        px-4 py-2 rounded-lg font-medium pixel-text transition-all
                        ${coins >= item.price 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }
                      `}
                    >
                      {item.price} 코인
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;