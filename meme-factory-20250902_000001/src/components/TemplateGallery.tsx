import { Search, TrendingUp, Zap, Smile, Heart } from 'lucide-react'
import { useState } from 'react'
import { useMemeStore, MemeTemplate } from '../store/memeStore'

const MEME_TEMPLATES: MemeTemplate[] = [
  { id: '1', name: 'Drake', url: 'https://i.imgflip.com/30b1gx.jpg', width: 500, height: 500, category: 'trending' },
  { id: '2', name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1ur9b0.jpg', width: 500, height: 500, category: 'classic' },
  { id: '3', name: 'Woman Yelling at Cat', url: 'https://i.imgflip.com/345v97.jpg', width: 500, height: 500, category: 'trending' },
  { id: '4', name: 'Two Buttons', url: 'https://i.imgflip.com/1g8my4.jpg', width: 500, height: 500, category: 'classic' },
  { id: '5', name: 'Bernie Sanders', url: 'https://i.imgflip.com/3oevdk.jpg', width: 500, height: 500, category: 'trending' },
  { id: '6', name: 'Expanding Brain', url: 'https://i.imgflip.com/1jwhww.jpg', width: 500, height: 500, category: 'classic' },
  { id: '7', name: 'Surprised Pikachu', url: 'https://i.imgflip.com/2kbn1e.jpg', width: 500, height: 500, category: 'reaction' },
  { id: '8', name: 'This is Fine', url: 'https://i.imgflip.com/wxica.jpg', width: 500, height: 500, category: 'reaction' },
]

const CATEGORIES = [
  { id: 'all', name: 'All', icon: Zap },
  { id: 'trending', name: 'Trending', icon: TrendingUp },
  { id: 'classic', name: 'Classic', icon: Heart },
  { id: 'reaction', name: 'Reaction', icon: Smile },
]

interface Props {
  onSelectTemplate: () => void
}

export default function TemplateGallery({ onSelectTemplate }: Props) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const { setCurrentMeme } = useMemeStore()

  const filteredTemplates = MEME_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || template.category === category
    return matchesSearch && matchesCategory
  })

  const handleSelectTemplate = (template: MemeTemplate) => {
    setCurrentMeme(template)
    onSelectTemplate()
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="glass-effect rounded-xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition ${
                category === cat.id
                  ? 'bg-gradient-to-r from-meme-purple to-meme-pink text-white'
                  : 'glass-effect text-gray-300 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </button>
          )
        })}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTemplates.map(template => (
          <button
            key={template.id}
            onClick={() => handleSelectTemplate(template)}
            className="group relative glass-effect rounded-xl overflow-hidden hover:transform hover:scale-105 transition"
          >
            <img
              src={template.url}
              alt={template.name}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-semibold text-sm">{template.name}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No templates found</p>
        </div>
      )}
    </div>
  )
}