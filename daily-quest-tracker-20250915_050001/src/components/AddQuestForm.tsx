import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Quest } from '../store/questStore'

interface AddQuestFormProps {
  onAdd: (quest: Omit<Quest, 'id' | 'completed' | 'createdAt'>) => void
  onClose: () => void
}

const AddQuestForm: React.FC<AddQuestFormProps> = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Quest['category']>('daily')
  const [difficulty, setDifficulty] = useState<Quest['difficulty']>('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onAdd({
      title: title.trim(),
      description: description.trim(),
      category,
      difficulty,
      xpReward: 0, // Will be calculated by store
      goldReward: 0, // Will be calculated by store
      dueDate: dueDate || undefined
    })

    // Reset form
    setTitle('')
    setDescription('')
    setCategory('daily')
    setDifficulty('medium')
    setDueDate('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-xl p-6 w-full max-w-md border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">New Quest</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-white text-sm font-medium mb-1">
              Quest Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-quest-primary"
              placeholder="Enter quest title..."
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-white text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-quest-primary h-20 resize-none"
              placeholder="Quest details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-white text-sm font-medium mb-1">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Quest['category'])}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-quest-primary"
              >
                <option value="daily">Daily Quest</option>
                <option value="main">Main Quest</option>
                <option value="side">Side Quest</option>
              </select>
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-white text-sm font-medium mb-1">
                Difficulty
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Quest['difficulty'])}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-quest-primary"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="epic">Epic</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-white text-sm font-medium mb-1">
              Due Date (Optional)
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-quest-primary"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 quest-button bg-quest-success hover:bg-green-600 text-white flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Quest
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 quest-button bg-gray-600 hover:bg-gray-700 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddQuestForm