import { Share2, Download, Copy, Twitter, Facebook } from 'lucide-react'
import { useState } from 'react'

export default function SharePanel() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    const text = 'Check out my awesome meme!'
    const url = window.location.href
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    }
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank')
    }
  }

  return (
    <div className="glass-effect rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Share2 className="w-5 h-5" />
        Share Your Meme
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => handleShare('twitter')}
          className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition"
        >
          <Twitter className="w-5 h-5" />
          <span className="text-xs">Twitter</span>
        </button>

        <button
          onClick={() => handleShare('facebook')}
          className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition"
        >
          <Facebook className="w-5 h-5" />
          <span className="text-xs">Facebook</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition"
        >
          <Copy className="w-5 h-5" />
          <span className="text-xs">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition">
          <Download className="w-5 h-5" />
          <span className="text-xs">Download</span>
        </button>
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
        <p className="text-sm text-gray-300">
          💡 Tip: Save your meme to share it with friends or use it in your social media posts!
        </p>
      </div>
    </div>
  )
}