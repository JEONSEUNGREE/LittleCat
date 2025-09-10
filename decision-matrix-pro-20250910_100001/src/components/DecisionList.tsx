import { ChevronRight, Calendar, Grid3x3, Trash2 } from 'lucide-react'
import useStore from '../store/useStore'

interface DecisionListProps {
  onSelectDecision: () => void
}

export default function DecisionList({ onSelectDecision }: DecisionListProps) {
  const { decisions, setCurrentDecision, deleteDecision } = useStore()

  const handleSelectDecision = (id: string) => {
    setCurrentDecision(id)
    onSelectDecision()
  }

  const handleDeleteDecision = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this decision?')) {
      deleteDecision(id)
    }
  }

  if (decisions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white">
        <Grid3x3 className="w-20 h-20 mb-4 opacity-50" />
        <h2 className="text-2xl font-bold mb-2">No Decisions Yet</h2>
        <p className="text-white/80 text-center mb-6 max-w-sm">
          Start making informed decisions by creating your first decision matrix
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Your Decisions</h2>
      
      {decisions.map((decision) => {
        const criteriaCount = decision.criteria.length
        const optionsCount = decision.options.length
        const completeness = 
          criteriaCount > 0 && optionsCount > 0
            ? Math.round((decision.scores.length / (criteriaCount * optionsCount)) * 100)
            : 0

        return (
          <div
            key={decision.id}
            onClick={() => handleSelectDecision(decision.id)}
            className="card hover:shadow-2xl transition-all duration-200 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {decision.title}
                </h3>
                {decision.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {decision.description}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(decision.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-600">{criteriaCount} criteria</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-600">{optionsCount} options</span>
                  </div>
                </div>

                {criteriaCount > 0 && optionsCount > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Completion</span>
                      <span className="text-xs font-semibold text-gray-700">{completeness}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${completeness}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={(e) => handleDeleteDecision(e, decision.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}