import { useState } from 'react';
import { useStore } from '../store/useStore';
import { ChevronLeft, Save, Plus, Trash2, Sparkles } from 'lucide-react';

interface CreateDeckProps {
  onBack: () => void;
  editDeckId?: string;
}

interface NewCard {
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const CreateDeck: React.FC<CreateDeckProps> = ({ onBack, editDeckId }) => {
  const { addDeck, addCard, currentDeck } = useStore();
  
  const [deckName, setDeckName] = useState(editDeckId && currentDeck ? currentDeck.name : '');
  const [deckDescription, setDeckDescription] = useState(editDeckId && currentDeck ? currentDeck.description : '');
  const [selectedIcon, setSelectedIcon] = useState(editDeckId && currentDeck ? currentDeck.icon : '📚');
  const [selectedColor, setSelectedColor] = useState(editDeckId && currentDeck ? currentDeck.color : 'bg-blue-500');
  
  const [cards, setCards] = useState<NewCard[]>([]);
  const [currentCard, setCurrentCard] = useState<NewCard>({
    question: '',
    answer: '',
    category: '',
    difficulty: 'medium',
  });

  const icons = ['📚', '🎓', '💡', '🚀', '🌟', '🎯', '🧠', '📖', '✨', '🔥'];
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-teal-500',
  ];

  const handleAddCard = () => {
    if (currentCard.question && currentCard.answer) {
      setCards([...cards, currentCard]);
      setCurrentCard({
        question: '',
        answer: '',
        category: currentCard.category,
        difficulty: currentCard.difficulty,
      });
    }
  };

  const handleRemoveCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleSaveDeck = () => {
    if (!deckName) {
      alert('덱 이름을 입력해주세요');
      return;
    }

    if (editDeckId && currentDeck) {
      // Edit existing deck - add new cards
      cards.forEach(card => {
        addCard(editDeckId, card);
      });
    } else {
      // Create new deck
      const newDeck = {
        name: deckName,
        description: deckDescription,
        icon: selectedIcon,
        color: selectedColor,
        cards: [],
      };
      
      const deckId = Date.now().toString();
      addDeck(newDeck);
      
      // Add cards to the new deck
      cards.forEach(card => {
        addCard(deckId, card);
      });
    }
    
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>취소</span>
            </button>
            
            <h1 className="text-2xl font-bold text-gray-800">
              {editDeckId ? '덱 수정' : '새 덱 만들기'}
            </h1>
            
            <button
              onClick={handleSaveDeck}
              className="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>저장</span>
            </button>
          </div>
        </header>

        {/* Deck Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">덱 정보</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">덱 이름</label>
              <input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="예: 기초 영어 단어"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                value={deckDescription}
                onChange={(e) => setDeckDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="이 덱에 대한 간단한 설명"
                rows={2}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">아이콘</label>
              <div className="flex space-x-2">
                {icons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setSelectedIcon(icon)}
                    className={`text-2xl p-2 rounded-lg transition-all ${
                      selectedIcon === icon ? 'bg-indigo-100 ring-2 ring-indigo-500' : 'hover:bg-gray-100'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">색상</label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-lg ${color} ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-800' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Cards */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
            카드 추가
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">질문</label>
              <input
                type="text"
                value={currentCard.question}
                onChange={(e) => setCurrentCard({ ...currentCard, question: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="예: Apple"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">답변</label>
              <input
                type="text"
                value={currentCard.answer}
                onChange={(e) => setCurrentCard({ ...currentCard, answer: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="예: 사과"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
              <input
                type="text"
                value={currentCard.category}
                onChange={(e) => setCurrentCard({ ...currentCard, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="예: Fruits"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">난이도</label>
              <select
                value={currentCard.difficulty}
                onChange={(e) => setCurrentCard({ ...currentCard, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="easy">쉬움</option>
                <option value="medium">보통</option>
                <option value="hard">어려움</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={handleAddCard}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>카드 추가</span>
          </button>
        </div>

        {/* Card List */}
        {cards.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">추가된 카드 ({cards.length}개)</h2>
            
            <div className="space-y-2">
              {cards.map((card, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{card.question}</p>
                    <p className="text-sm text-gray-600">{card.answer}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">{card.category}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {card.difficulty === 'easy' ? '쉬움' :
                         card.difficulty === 'medium' ? '보통' : '어려움'}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRemoveCard(index)}
                    className="ml-4 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateDeck;