import React, { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import { Download, Copy, Share2, Palette, Type, Wifi, Mail, Phone, Link } from 'lucide-react'
import useQRStore from '../store/useQRStore'

const QRGenerator: React.FC = () => {
  const [content, setContent] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState<'url' | 'text' | 'wifi' | 'email' | 'phone'>('url')
  const [color, setColor] = useState('#000000')
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { addQRCode } = useQRStore()

  const typeConfig = {
    url: { icon: Link, placeholder: 'https://example.com', label: 'URL' },
    text: { icon: Type, placeholder: 'Enter your text', label: 'Text' },
    wifi: { icon: Wifi, placeholder: 'SSID:password', label: 'WiFi' },
    email: { icon: Mail, placeholder: 'email@example.com', label: 'Email' },
    phone: { icon: Phone, placeholder: '+1234567890', label: 'Phone' }
  }

  useEffect(() => {
    if (content && canvasRef.current) {
      generateQR()
    }
  }, [content, color])

  const generateQR = async () => {
    if (!canvasRef.current) return
    
    try {
      await QRCode.toCanvas(canvasRef.current, content, {
        width: 256,
        color: {
          dark: color,
          light: '#FFFFFF'
        },
        margin: 2
      })
      
      const dataUrl = canvasRef.current.toDataURL()
      setQrDataUrl(dataUrl)
    } catch (err) {
      console.error('QR Generation failed:', err)
    }
  }

  const handleSave = () => {
    if (!content || !name) return
    
    addQRCode({
      content,
      name,
      type,
      color,
      logo: qrDataUrl
    })
    
    // Reset form
    setContent('')
    setName('')
    setQrDataUrl('')
  }

  const handleDownload = () => {
    if (!qrDataUrl) return
    
    const link = document.createElement('a')
    link.href = qrDataUrl
    link.download = `qr-${name || 'code'}.png`
    link.click()
  }

  const handleCopy = async () => {
    if (!canvasRef.current) return
    
    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvasRef.current!.toBlob((blob) => resolve(blob!))
      })
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <div className="card animate-slide-up">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create QR Code</h2>
      
      <div className="space-y-4">
        {/* Type selector */}
        <div className="flex gap-2 flex-wrap">
          {Object.entries(typeConfig).map(([key, config]) => {
            const Icon = config.icon
            return (
              <button
                key={key}
                onClick={() => setType(key as typeof type)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  type === key 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{config.label}</span>
              </button>
            )
          })}
        </div>

        {/* Name input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            QR Code Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My QR Code"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Content input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={typeConfig[type].placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Color picker */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            QR Color
          </label>
          <div className="flex items-center gap-2">
            <Palette size={20} className="text-gray-500" />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <span className="text-sm text-gray-600">{color}</span>
          </div>
        </div>

        {/* QR Code preview */}
        {content && (
          <div className="flex flex-col items-center space-y-4 p-6 bg-gray-50 rounded-lg">
            <canvas
              ref={canvasRef}
              className="border-8 border-white shadow-lg rounded-lg"
            />
            
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 btn-secondary"
              >
                <Download size={18} />
                Download
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 btn-secondary"
              >
                <Copy size={18} />
                Copy
              </button>
              <button
                onClick={() => {}}
                className="flex items-center gap-2 btn-secondary"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!content || !name}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            content && name
              ? 'bg-primary text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save to Hub
        </button>
      </div>
    </div>
  )
}

export default QRGenerator