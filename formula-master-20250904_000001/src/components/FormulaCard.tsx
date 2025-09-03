import React, { useState } from 'react';
import { Formula } from '../types/formula';
import { Brain, CheckCircle, RotateCcw, Eye, BookOpen } from 'lucide-react';
import { useFormulaStore } from '../store/formulaStore';

interface FormulaCardProps {
  formula: Formula;
}

const FormulaCard: React.FC<FormulaCardProps> = ({ formula }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { toggleMastered, updateReview } = useFormulaStore();
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      updateReview(formula.id);
    }
  };
  
  const handleMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMastered(formula.id);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'math': return 'bg-blue-500';
      case 'physics': return 'bg-purple-500';
      case 'chemistry': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className={`card-flip w-full h-64 ${isFlipped ? 'card-flipped' : ''}`}>
      <div className="card-inner relative w-full h-full">
        {/* Front of card */}
        <div 
          className="card-front absolute w-full h-full bg-white rounded-xl shadow-lg cursor-pointer overflow-hidden"
          onClick={handleFlip}
        >
          <div className={`h-2 ${getCategoryColor(formula.category)}`} />
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-2">
                <span className={`inline-block px-2 py-1 text-xs rounded ${getDifficultyColor(formula.difficulty)}`}>
                  {formula.difficulty}
                </span>
                <span className="text-sm text-gray-500">{formula.subcategory}</span>
              </div>
              <button 
                onClick={handleMastered}
                className={`p-2 rounded-full transition-colors ${
                  formula.mastered 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{formula.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>Click to reveal formula</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>Reviews: {formula.reviewCount}</span>
              </div>
              {formula.mastered && (
                <div className="flex items-center gap-1 text-green-600">
                  <Brain className="w-4 h-4" />
                  <span className="text-sm font-medium">Mastered!</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className="card-back absolute w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg cursor-pointer text-white"
          onClick={handleFlip}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold">{formula.name}</h4>
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                <p className="text-2xl font-mono text-center">{formula.formula}</p>
              </div>
              
              <p className="text-sm text-white/90 mb-3">{formula.description}</p>
              
              {formula.example && (
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs uppercase tracking-wider text-white/70 mb-1">Example:</p>
                  <p className="text-sm font-mono">{formula.example}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaCard;