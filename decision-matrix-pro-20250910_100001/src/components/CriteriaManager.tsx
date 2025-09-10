import { useState } from 'react'
import { Plus, Edit2, Trash2, Save, X, Weight } from 'lucide-react'
import useStore from '../store/useStore'

export default function CriteriaManager() {
  const { currentDecision, addCriterion, updateCriterion, deleteCriterion } = useStore()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const [newWeight, setNewWeight] = useState('5')
  const [newDescription, setNewDescription] = useState('')
  const [editName, setEditName] = useState('')
  const [editWeight, setEditWeight] = useState('')
  const [editDescription, setEditDescription] = useState('')

  if (!currentDecision) return null

  const handleAdd = () => {
    if (newName.trim()) {
      addCriterion(newName.trim(), parseInt(newWeight), newDescription.trim() || undefined)
      setNewName('')
      setNewWeight('5')
      setNewDescription('')
      setIsAdding(false)
    }
  }

  const handleEdit = (id: string) => {
    const criterion = currentDecision.criteria.find(c => c.id === id)
    if (criterion) {
      setEditingId(id)
      setEditName(criterion.name)
      setEditWeight(criterion.weight.toString())
      setEditDescription(criterion.description || '')
    }
  }

  const handleSaveEdit = () => {
    if (editingId && editName.trim()) {
      updateCriterion(editingId, {
        name: editName.trim(),
        weight: parseInt(editWeight),
        description: editDescription.trim() || undefined
      })
      setEditingId(null)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this criterion?')) {
      deleteCriterion(id)
    }
  }

  const totalWeight = currentDecision.criteria.reduce((sum, c) => sum + c.weight, 0)

  return (
    <div className="space-y-4">
      {/* Add Button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full card hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 py-4"
        >
          <Plus className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-gray-700">Add Criterion</span>
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
              placeholder="Criterion name (e.g., Cost, Quality)"
              className="input-field"
              autoFocus
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span className="font-bold text-purple-600">{newWeight}</span>
                <span>High</span>
              </div>
            </div>
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
                Add Criterion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Criteria List */}
      {currentDecision.criteria.map((criterion) => (
        <div key={criterion.id} className="card animate-slide-up">
          {editingId === criterion.id ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="input-field"
                autoFocus
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={editWeight}
                  onChange={(e) => setEditWeight(e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span className="font-bold text-purple-600">{editWeight}</span>
                  <span>High</span>
                </div>
              </div>
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
                <h3 className="font-semibold text-gray-800">{criterion.name}</h3>
                {criterion.description && (
                  <p className="text-sm text-gray-600 mt-1">{criterion.description}</p>
                )}
                <div className="flex items-center space-x-3 mt-3">
                  <div className="flex items-center space-x-1">
                    <Weight className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-gray-700">Weight:</span>
                    <span className="text-sm font-bold text-purple-600">{criterion.weight}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    ({Math.round((criterion.weight / totalWeight) * 100)}% of total)
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(criterion.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDelete(criterion.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {currentDecision.criteria.length === 0 && !isAdding && (
        <div className="text-center py-8 text-gray-500">
          <Weight className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No criteria added yet</p>
          <p className="text-sm mt-1">Add criteria to evaluate your options</p>
        </div>
      )}
    </div>
  )
}