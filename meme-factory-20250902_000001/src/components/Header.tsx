import { Sparkles, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-meme-purple to-meme-pink p-2 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Meme Factory
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <button className="text-gray-300 hover:text-white transition">
            Trending
          </button>
          <button className="text-gray-300 hover:text-white transition">
            My Memes
          </button>
          <button className="bg-gradient-to-r from-meme-purple to-meme-pink px-4 py-2 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
            Create New
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-effect border-b border-white/10 p-4">
          <nav className="flex flex-col gap-3">
            <button className="text-left text-gray-300 hover:text-white transition py-2">
              Trending
            </button>
            <button className="text-left text-gray-300 hover:text-white transition py-2">
              My Memes
            </button>
            <button className="bg-gradient-to-r from-meme-purple to-meme-pink px-4 py-3 rounded-xl text-white font-semibold">
              Create New
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}