import React from 'react';
import { Search, Filter, BookOpen, Award } from 'lucide-react';
import { useFormulaStore } from '../store/formulaStore';

const FilterBar: React.FC = () => {
  const { 
    currentCategory, 
    currentDifficulty, 
    searchTerm,
    showMasteredOnly,
    setCategory, 
    setDifficulty,
    setSearchTerm,
    toggleShowMasteredOnly
  } = useFormulaStore();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search formulas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="text-gray-600 w-5 h-5" />
          <select
            value={currentCategory}
            onChange={(e) => setCategory(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="all">All Categories</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
          </select>
        </div>
        
        {/* Difficulty Filter */}
        <div className="flex items-center gap-2">
          <BookOpen className="text-gray-600 w-5 h-5" />
          <select
            value={currentDifficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        {/* Mastered Toggle */}
        <button
          onClick={toggleShowMasteredOnly}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            showMasteredOnly
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Award className="w-5 h-5" />
          <span className="hidden sm:inline">Mastered</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;