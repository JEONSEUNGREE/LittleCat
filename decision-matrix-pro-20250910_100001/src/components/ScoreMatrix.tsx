import { useState } from 'react'
import { Grid3x3, TrendingUp, Award } from 'lucide-react'
import useStore from '../store/useStore'

export default function ScoreMatrix() {
  const { currentDecision, updateScore, calculateWeightedScore } = useStore()
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  if (!currentDecision) return null

  const getScore = (optionId: string, criterionId: string) => {
    const score = currentDecision.scores.find(
      s => s.optionId === optionId && s.criterionId === criterionId
    )
    return score?.value || 0
  }

  const handleScoreChange = (optionId: string, criterionId: string, value: number) => {
    updateScore(optionId, criterionId, value)
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-700'
    if (score >= 6) return 'bg-blue-100 text-blue-700'
    if (score >= 4) return 'bg-yellow-100 text-yellow-700'
    if (score >= 2) return 'bg-orange-100 text-orange-700'
    return 'bg-gray-100 text-gray-600'
  }

  const optionScores = currentDecision.options.map(option => ({
    option,
    score: calculateWeightedScore(option.id)
  })).sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-6">
      {/* Score Rankings */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5 text-yellow-500" />
          <span>Overall Rankings</span>
        </h3>
        <div className="space-y-3">
          {optionScores.map((item, index) => (
            <div key={item.option.id} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === 0 ? 'bg-yellow-100' : 'bg-gray-100'
              }`}>
                <span className={`text-sm font-bold ${
                  index === 0 ? 'text-yellow-600' : 'text-gray-600'
                }`}>
                  {index + 1}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{item.option.name}</span>
                  <span className="text-sm font-bold text-purple-600">
                    {item.score.toFixed(1)}/10
                  </span>
                </div>
                <div className="mt-1 bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === 0 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                        : 'bg-gradient-to-r from-purple-400 to-purple-500'
                    }`}
                    style={{ width: `${item.score * 10}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Matrix */}
      <div className="card overflow-x-auto">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Grid3x3 className="w-5 h-5 text-purple-500" />
          <span>Decision Matrix</span>
        </h3>
        
        <div className="min-w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-3 font-medium text-gray-700 bg-gray-50">
                  Options / Criteria
                </th>
                {currentDecision.criteria.map(criterion => (
                  <th key={criterion.id} className="text-center p-3 bg-gray-50">
                    <div className="font-medium text-gray-700">{criterion.name}</div>
                    <div className="text-xs text-gray-500 mt-1">Weight: {criterion.weight}</div>
                  </th>
                ))}
                <th className="text-center p-3 font-medium text-gray-700 bg-purple-50">
                  Total Score
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDecision.options.map((option, optionIndex) => {
                const totalScore = calculateWeightedScore(option.id)
                return (
                  <tr key={option.id} className="border-t">
                    <td className="p-3 font-medium text-gray-700 bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-purple-600">
                            {optionIndex + 1}
                          </span>
                        </div>
                        <span>{option.name}</span>
                      </div>
                    </td>
                    {currentDecision.criteria.map(criterion => {
                      const score = getScore(option.id, criterion.id)
                      const cellKey = `${option.id}-${criterion.id}`
                      
                      return (
                        <td 
                          key={criterion.id} 
                          className="p-2 text-center relative"
                          onMouseEnter={() => setHoveredCell(cellKey)}
                          onMouseLeave={() => setHoveredCell(null)}
                        >
                          <select
                            value={score}
                            onChange={(e) => handleScoreChange(
                              option.id,
                              criterion.id,
                              parseInt(e.target.value)
                            )}
                            className={`w-full py-2 px-3 rounded-lg font-semibold text-center cursor-pointer transition-all duration-200 ${
                              getScoreColor(score)
                            } hover:ring-2 hover:ring-purple-300`}
                          >
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                              <option key={val} value={val}>{val}</option>
                            ))}
                          </select>
                          {hoveredCell === cellKey && score > 0 && (
                            <div className="absolute z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap">
                              Weighted: {(score * criterion.weight / currentDecision.criteria.reduce((sum, c) => sum + c.weight, 0)).toFixed(2)}
                            </div>
                          )}
                        </td>
                      )
                    })}
                    <td className="p-3 text-center bg-purple-50">
                      <div className="flex items-center justify-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span className="font-bold text-purple-700">
                          {totalScore.toFixed(1)}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Tip:</strong> Rate each option from 0-10 for each criterion. 
            Higher scores mean better performance. The final score is weighted based on criterion importance.
          </p>
        </div>
      </div>
    </div>
  )
}