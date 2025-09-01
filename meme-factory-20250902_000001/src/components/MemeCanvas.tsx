import { useRef, useEffect } from 'react'
import { Upload, RefreshCw, Download } from 'lucide-react'
import { useMemeStore } from '../store/memeStore'

export default function MemeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { currentMeme, texts, setCurrentMeme } = useMemeStore()

  useEffect(() => {
    if (!canvasRef.current || !currentMeme) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      // Draw text overlays
      texts.forEach(textObj => {
        ctx.font = `bold ${textObj.fontSize}px Impact, sans-serif`
        ctx.fillStyle = textObj.color
        ctx.strokeStyle = textObj.strokeColor
        ctx.lineWidth = 3
        ctx.textAlign = textObj.align as CanvasTextAlign
        
        const x = (textObj.x / 100) * canvas.width
        const y = (textObj.y / 100) * canvas.height
        
        ctx.strokeText(textObj.text, x, y)
        ctx.fillText(textObj.text, x, y)
      })
    }
    img.src = currentMeme.url
  }, [currentMeme, texts])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setCurrentMeme({
        id: 'custom',
        name: 'Custom Image',
        url: event.target?.result as string,
        width: 500,
        height: 500,
        category: 'custom'
      })
    }
    reader.readAsDataURL(file)
  }

  const downloadMeme = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'meme-factory.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  if (!currentMeme) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center">
        <div className="max-w-md mx-auto">
          <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h3 className="text-xl font-semibold mb-3">Start Creating Your Meme</h3>
          <p className="text-gray-400 mb-6">
            Upload an image or choose from our templates to get started
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-meme-purple to-meme-pink px-6 py-3 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
          >
            Upload Image
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-2xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Canvas</h3>
        <div className="flex gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            title="Change Image"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={downloadMeme}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            title="Download"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="relative bg-black/50 rounded-xl overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-auto max-h-[600px] object-contain"
        />
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  )
}