import { useState } from 'react'
import { X, Check, Lightbulb } from 'lucide-react'
import useStore from '../store/useStore'

interface CreateDecisionProps {
  onComplete: () => void
  onCancel: () => void
}

const templates = [
  { title: 'Job Offer Evaluation', description: 'Compare multiple job opportunities' },
  { title: 'Investment Decision', description: 'Evaluate investment options' },
  { title: 'Product Purchase', description: 'Choose the best product to buy' },
  { title: 'Location Choice', description: 'Decide on location for home or office' },
]

export default function CreateDecision({ onComplete, onCancel }: CreateDecisionProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { createDecision } = useStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      createDecision(title.trim(), description.trim() || undefined)
      onComplete()
    }
  }

  const handleTemplate = (template: typeof templates[0]) => {
    setTitle(template.title)
    setDescription(template.description)
  }

  return (
    <div className="animate-fade-in">
      <div className="card max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">New Decision</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Decision Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Choose new laptop"
              className="input-field"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more context about this decision..."
              className="input-field resize-none"
              rows={3}
            />
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Quick Templates</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleTemplate(template)}
                  className="p-3 text-left border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                >
                  <p className="text-sm font-medium text-gray-800">{template.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 button-primary flex items-center justify-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Create Decision</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}