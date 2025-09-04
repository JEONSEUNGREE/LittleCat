import { useStoryStore } from '../store/storyStore'
import { Wand2, Heart, Laugh, Search, Castle, Utensils, Rocket, Diamond } from 'lucide-react'

const templates = [
  { id: 'adventure', name: 'Adventure', icon: Rocket, color: 'from-orange-400 to-red-500', emojis: '🚀🌟🏔️' },
  { id: 'romance', name: 'Romance', icon: Heart, color: 'from-pink-400 to-red-500', emojis: '❤️🌹💕' },
  { id: 'comedy', name: 'Comedy', icon: Laugh, color: 'from-yellow-400 to-orange-500', emojis: '😂🤪🎭' },
  { id: 'mystery', name: 'Mystery', icon: Search, color: 'from-gray-400 to-gray-600', emojis: '🔍🗝️🎩' },
  { id: 'fantasy', name: 'Fantasy', icon: Castle, color: 'from-purple-400 to-pink-500', emojis: '🧙🐉🏰' },
  { id: 'food', name: 'Food Story', icon: Utensils, color: 'from-green-400 to-teal-500', emojis: '🍕🍔🍰' }
]

export default function TemplateSelector() {
  const { loadTemplate, generateStory } = useStoryStore()

  const handleTemplateSelect = (templateId: string) => {
    loadTemplate(templateId)
    setTimeout(() => generateStory(), 500)
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Story Templates</h2>
        <p className="text-gray-600">Choose a template to get started quickly!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = template.icon
          return (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className="group relative bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-2xl hover:scale-105 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              
              {/* Content */}
              <div className="relative z-10 space-y-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${template.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
                
                <div className="text-3xl">{template.emojis}</div>
                
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                  <Wand2 className="w-4 h-4" />
                  <span>Quick Start</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full filter blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="absolute bottom-2 left-2 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full filter blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            </button>
          )
        })}
        
        {/* Custom Template */}
        <button className="group relative bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-6 transition-all hover:border-primary hover:shadow-lg hover:scale-105">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Diamond className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-600">Custom Story</h3>
            
            <div className="text-3xl">✨🎨📝</div>
            
            <p className="text-sm text-gray-500">Create from scratch</p>
          </div>
        </button>
      </div>
    </div>
  )
}