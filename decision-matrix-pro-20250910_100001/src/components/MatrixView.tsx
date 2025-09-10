import { useState } from 'react'
import { ArrowLeft, Plus, Edit2, Trash2, Trophy, TrendingUp, AlertCircle } from 'lucide-react'
import useStore from '../store/useStore'
import CriteriaManager from './CriteriaManager'
import OptionsManager from './OptionsManager'
import ScoreMatrix from './ScoreMatrix'

interface MatrixViewProps {
  onBack: () => void
}

type TabType = 'matrix' | 'criteria' | 'options'

export default function MatrixView({ onBack }: MatrixViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('matrix')
  const { currentDecision, getTopOption } = useStore()

  if (!currentDecision) {
    return null
  }

  const topOption = getTopOption()
  const hasEnoughData = currentDecision.criteria.length > 0 && currentDecision.options.length > 0

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-4 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors mt-1"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{currentDecision.title}</h2>
              {currentDecision.description && (
                <p className="text-sm text-white/80 mt-1">{currentDecision.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Best Option Display */}
        {topOption && topOption.score > 0 && (
          <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-400/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium text-white">Best Option:</span>
                <span className="font-bold text-white">{topOption.option.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm font-bold text-white">
                  {topOption.score.toFixed(1)}/10
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="glass-effect rounded-full p-1 mb-6 flex">
        <button
          onClick={() => setActiveTab('criteria')}
          className={`flex-1 py-2 px-4 rounded-full transition-all duration-200 ${
            activeTab === 'criteria'
              ? 'bg-white text-purple-600 shadow-lg'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <span className="font-medium">Criteria</span>
          <span className="ml-2 text-xs opacity-80">({currentDecision.criteria.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('options')}
          className={`flex-1 py-2 px-4 rounded-full transition-all duration-200 ${
            activeTab === 'options'
              ? 'bg-white text-purple-600 shadow-lg'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <span className="font-medium">Options</span>
          <span className="ml-2 text-xs opacity-80">({currentDecision.options.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex-1 py-2 px-4 rounded-full transition-all duration-200 ${
            activeTab === 'matrix'
              ? 'bg-white text-purple-600 shadow-lg'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <span className="font-medium">Matrix</span>
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'criteria' && <CriteriaManager />}
        {activeTab === 'options' && <OptionsManager />}
        {activeTab === 'matrix' && (
          hasEnoughData ? (
            <ScoreMatrix />
          ) : (
            <div className="card text-center py-12">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Setup Required
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Please add at least one criterion and one option to start scoring
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setActiveTab('criteria')}
                  className="button-secondary !bg-purple-600 !text-white"
                >
                  Add Criteria
                </button>
                <button
                  onClick={() => setActiveTab('options')}
                  className="button-secondary !bg-purple-600 !text-white"
                >
                  Add Options
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}