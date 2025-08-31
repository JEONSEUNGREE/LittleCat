import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Compliment } from '../types';

const categories: { value: Compliment['category']; label: string; emoji: string }[] = [
  { value: 'kindness', label: '친절함', emoji: '🤝' },
  { value: 'achievement', label: '성취', emoji: '🏆' },
  { value: 'personality', label: '성격', emoji: '✨' },
  { value: 'effort', label: '노력', emoji: '💪' },
  { value: 'creativity', label: '창의성', emoji: '🎨' }
];

const templates = [
  "당신의 미소가 오늘 하루를 밝게 만들어요",
  "당신의 노력이 정말 멋져요",
  "당신은 특별한 재능을 가지고 있어요",
  "당신의 친절함에 감동받았어요",
  "당신과 함께라면 뭐든 할 수 있을 것 같아요"
];

export default function ComplimentInput() {
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Compliment['category']>('kindness');
  const [showTemplates, setShowTemplates] = useState(false);
  const { addCompliment } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < 5) return;

    addCompliment(message.trim(), selectedCategory);
    setMessage('');
    setShowTemplates(false);
  };

  const useTemplate = (template: string) => {
    setMessage(template);
    setShowTemplates(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 animate-slide-up">
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 mr-2 text-primary" />
        <h3 className="text-lg font-bold text-dark">칭찬 보내기</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Selection */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Message Input */}
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="누군가에게 전하고 싶은 따뜻한 말을 적어주세요..."
            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-primary resize-none"
            rows={3}
            maxLength={200}
          />
          <span className="absolute bottom-3 right-3 text-xs text-gray-400">
            {message.length}/200
          </span>
        </div>

        {/* Template Suggestions */}
        <div>
          <button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            className="text-sm text-primary hover:text-secondary transition-colors"
          >
            💡 예시 문구 보기
          </button>
          
          {showTemplates && (
            <div className="mt-2 space-y-1 animate-fade-in">
              {templates.map((template, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => useTemplate(template)}
                  className="block w-full text-left text-sm p-2 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  "{template}"
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={message.trim().length < 5}
          className={`w-full py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all btn-press ${
            message.trim().length >= 5
              ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
          <span>익명으로 칭찬 보내기</span>
        </button>
      </form>
    </div>
  );
}