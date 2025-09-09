
import { useStore } from '../store/useStore';
import { BookOpen, Plus, ChevronRight } from 'lucide-react';
import { Deck } from '../types';

interface DeckListProps {
  onEditDeck?: (deckId: string) => void;
  onSelectDeck: (deckId: string) => void;
  onCreateDeck: () => void;
}

const DeckList: React.FC<DeckListProps> = ({ onSelectDeck, onCreateDeck }) => {
  const { decks } = useStore();

  const getDeckStats = (deck: Deck) => {
    const totalCards = deck.cards.length;
    const masteredCards = deck.cards.filter(card => card.streak >= 5).length;
    return { totalCards, masteredCards };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">플래시카드 마스터</h1>
          <p className="text-gray-600">스마트한 학습을 시작하세요</p>
        </header>

        <button
          onClick={onCreateDeck}
          className="w-full mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-medium">새 덱 만들기</span>
        </button>

        <div className="grid gap-4 md:grid-cols-2">
          {decks.map((deck) => {
            const { totalCards, masteredCards } = getDeckStats(deck);
            const progressPercentage = totalCards > 0 ? (masteredCards / totalCards) * 100 : 0;

            return (
              <div
                key={deck.id}
                onClick={() => onSelectDeck(deck.id)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                <div className={`h-2 ${deck.color}`} />
                
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{deck.icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{deck.name}</h3>
                        <p className="text-sm text-gray-500">{deck.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">카드 수</span>
                      <span className="font-medium">{totalCards}개</span>
                    </div>
                    
                    {totalCards > 0 && (
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">마스터</span>
                          <span className="font-medium">{masteredCards}/{totalCards}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDeck(deck.id);
                      }}
                      className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>학습 시작</span>
                    </button>
                    
                    <span className="text-xs text-gray-400">
                      {new Date(deck.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {decks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">아직 덱이 없습니다</p>
            <p className="text-gray-400 text-sm mt-1">새 덱을 만들어 학습을 시작하세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckList;