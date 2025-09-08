import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { Download, Copy, Share2, Check, Palette } from 'lucide-react'
import { useQRStore } from '../store/qrStore'

const QRGenerator = () => {
  const [inputType, setInputType] = useState<'text' | 'url' | 'wifi' | 'contact'>('text')
  const [inputValue, setInputValue] = useState('')
  const [wifiData, setWifiData] = useState({ ssid: '', password: '', type: 'WPA' })
  const [contactData, setContactData] = useState({ name: '', phone: '', email: '' })
  const [qrColor, setQrColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [copied, setCopied] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { addToHistory, currentQR } = useQRStore()

  const generateQRCode = async () => {
    if (!canvasRef.current) return
    
    let content = ''
    let label = ''
    
    switch (inputType) {
      case 'text':
        content = inputValue
        label = inputValue.substring(0, 30)
        break
      case 'url':
        content = inputValue.startsWith('http') ? inputValue : `https://${inputValue}`
        label = new URL(content).hostname
        break
      case 'wifi':
        content = `WIFI:T:${wifiData.type};S:${wifiData.ssid};P:${wifiData.password};;`
        label = `WiFi: ${wifiData.ssid}`
        break
      case 'contact':
        content = `MECARD:N:${contactData.name};TEL:${contactData.phone};EMAIL:${contactData.email};;`
        label = `Contact: ${contactData.name}`
        break
    }
    
    if (!content) return
    
    try {
      await QRCode.toCanvas(canvasRef.current, content, {
        width: 256,
        margin: 2,
        color: {
          dark: qrColor,
          light: bgColor
        }
      })
      
      const qrData = {
        id: Date.now().toString(),
        type: inputType as any,
        content,
        label,
        timestamp: Date.now(),
        color: qrColor
      }
      
      addToHistory(qrData)
    } catch (err) {
      console.error('Error generating QR code:', err)
    }
  }

  const downloadQR = () => {
    if (!canvasRef.current) return
    
    const url = canvasRef.current.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = `qr-code-${Date.now()}.png`
    link.href = url
    link.click()
    
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2000)
  }

  const copyToClipboard = () => {
    const content = currentQR?.content || ''
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareQR = async () => {
    if (!canvasRef.current) return
    
    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvasRef.current!.toBlob((blob) => resolve(blob!), 'image/png')
      })
      
      if (navigator.share) {
        await navigator.share({
          files: [new File([blob], 'qr-code.png', { type: 'image/png' })],
          title: 'QR Code',
          text: currentQR?.label || 'Check out this QR code!'
        })
      }
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  useEffect(() => {
    if (inputValue || wifiData.ssid || contactData.name) {
      generateQRCode()
    }
  }, [inputValue, wifiData, contactData, qrColor, bgColor, inputType])

  return (
    <div className="space-y-6">
      {/* Input Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(['text', 'url', 'wifi', 'contact'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setInputType(type)}
            className={`py-2 px-4 rounded-lg font-medium capitalize transition-all ${
              inputType === type
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        {inputType === 'text' && (
          <textarea
            placeholder="Enter text to encode..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm resize-none h-32"
            maxLength={500}
          />
        )}
        
        {inputType === 'url' && (
          <input
            type="url"
            placeholder="Enter URL (e.g., example.com)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm"
          />
        )}
        
        {inputType === 'wifi' && (
          <div className="space-y-3">
            <input
              placeholder="Network Name (SSID)"
              value={wifiData.ssid}
              onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={wifiData.password}
              onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm"
            />
            <select
              value={wifiData.type}
              onChange={(e) => setWifiData({ ...wifiData, type: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>
        )}
        
        {inputType === 'contact' && (
          <div className="space-y-3">
            <input
              placeholder="Full Name"
              value={contactData.name}
              onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={contactData.phone}
              onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={contactData.email}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm"
            />
          </div>
        )}
      </div>

      {/* Color Customization */}
      <div className="flex gap-4 items-center justify-center">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-gray-600" />
          <input
            type="color"
            value={qrColor}
            onChange={(e) => setQrColor(e.target.value)}
            className="w-12 h-12 rounded cursor-pointer"
            title="QR Code Color"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">BG</span>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-12 h-12 rounded cursor-pointer"
            title="Background Color"
          />
        </div>
      </div>

      {/* QR Code Display */}
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-2xl">
          <canvas ref={canvasRef} className="max-w-full" />
        </div>

        {/* Action Buttons */}
        {currentQR && (
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={downloadQR}
              className="btn-primary flex items-center gap-2"
            >
              {downloaded ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5" />}
              {downloaded ? 'Downloaded!' : 'Download'}
            </button>
            
            <button
              onClick={copyToClipboard}
              className="btn-secondary flex items-center gap-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : 'Copy Data'}
            </button>
            
            {navigator.share && (
              <button
                onClick={shareQR}
                className="btn-secondary flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default QRGenerator