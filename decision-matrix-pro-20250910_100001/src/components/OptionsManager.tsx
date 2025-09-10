import { useState } from 'react'
import { Plus, Edit2, Trash2, Layers } from 'lucide-react'
import useStore from '../store/useStore'

export default function OptionsManager() {
  const { currentDecision, addOption, updateOption, deleteOption, calculateWeightedScore } = useStore()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')

  if (!currentDecision) return null

  const handleAdd = () => {
    if (newName.trim()) {
      addOption(newName.trim(), newDescription.trim() || undefined)
      setNewName('')
      setNewDescription('')
      setIsAdding(false)
    }
  }

  const handleEdit = (id: string) => {
    const option = currentDecision.options.find(o => o.id === id)
    if (option) {
      setEditingId(id)
      setEditName(option.name)
      setEditDescription(option.description || '')
    }
  }

  const handleSaveEdit = () => {
    if (editingId && editName.trim()) {
      updateOption(editingId, {
        name: editName.trim(),
        description: editDescription.trim() || undefined
      })
      setEditingId(null)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this option?')) {
      deleteOption(id)
    }
  }

  return (
    <div className="space-y-4">
      {/* Add Button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full card hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 py-4"
        >
          <Plus className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-gray-700">Add Option</span>
        </button>
      )}

      {/* Add Form */}
      {isAdding && (
        <div className="card animate-slide-up">
          <div className="space-y-4">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Option name (e.g., Option A, Product 1)"
              className="input-field"
              autoFocus
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description (optional)"
              className="input-field resize-none"
              rows={2}
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newName.trim()}
                className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                Add Option
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Options List */}
      {currentDecision.options.map((option, index) => {
        const score = calculateWeightedScore(option.id)
        const hasScore = currentDecision.scores.some(s => s.optionId === option.id)
        
        return (
          <div key={option.id} className="card animate-slide-up">
            {editingId === option.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="input-field"
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description (optional)"
                  className="input-field resize-none"
                  rows={2}
                />
                <div className="flex space-x-3">
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{option.name}</h3>
                      {option.description && (
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      )}
                    </div>
                  </div>
                  {hasScore && (
                    <div className="mt-3 flex items-center space-x-3">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${score * 10}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-700">
                        {score.toFixed(1)}/10
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(option.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(option.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {currentDecision.options.length === 0 && !isAdding && (
        <div className="text-center py-8 text-gray-500">
          <Layers className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No options added yet</p>
          <p className="text-sm mt-1">Add options to compare</p>
        </div>
      )}
    </div>
  )
}