import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { useQRStore } from '../store/qrStore'
import { 
  Type, Link, Wifi, Mail, Phone, Download, Save, 
  Palette, Copy, CheckCircle, AlertCircle 
} from 'lucide-react'

type QRType = 'text' | 'url' | 'wifi' | 'email' | 'phone'

interface WifiData {
  ssid: string
  password: string
  encryption: 'WPA' | 'WEP' | 'nopass'
}

export default function QRGenerator() {
  const [qrType, setQrType] = useState<QRType>('text')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [qrCodeDataURL, setQrCodeDataURL] = useState('')
  const [color, setColor] = useState('#000000')
  const [wifiData, setWifiData] = useState<WifiData>({
    ssid: '',
    password: '',
    encryption: 'WPA'
  })
  const [email, setEmail] = useState({ to: '', subject: '', body: '' })
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { addQRCode } = useQRStore()

  const qrTypes = [
    { type: 'text' as QRType, icon: Type, label: '텍스트' },
    { type: 'url' as QRType, icon: Link, label: 'URL' },
    { type: 'wifi' as QRType, icon: Wifi, label: 'WiFi' },
    { type: 'email' as QRType, icon: Mail, label: '이메일' },
    { type: 'phone' as QRType, icon: Phone, label: '전화' },
  ]

  const generateQRCode = async () => {
    let qrContent = content
    
    if (qrType === 'wifi') {
      qrContent = `WIFI:T:${wifiData.encryption};S:${wifiData.ssid};P:${wifiData.password};;`
    } else if (qrType === 'email') {
      qrContent = `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`
    } else if (qrType === 'phone') {
      qrContent = `tel:${content}`
    } else if (qrType === 'url' && !content.startsWith('http')) {
      qrContent = `https://${content}`
    }

    if (!qrContent) return

    try {
      const dataURL = await QRCode.toDataURL(qrContent, {
        width: 400,
        margin: 2,
        color: {
          dark: color,
          light: '#FFFFFF'
        }
      })
      setQrCodeDataURL(dataURL)
    } catch (error) {
      console.error('QR 코드 생성 실패:', error)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content || (qrType === 'wifi' && wifiData.ssid) || (qrType === 'email' && email.to)) {
        generateQRCode()
      }
    }, 500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, qrType, color, wifiData, email])

  const handleSave = () => {
    if (!qrCodeDataURL) return
    
    let finalContent = content
    if (qrType === 'wifi') {
      finalContent = `SSID: ${wifiData.ssid}`
    } else if (qrType === 'email') {
      finalContent = email.to
    }

    addQRCode({
      type: qrType,
      content: finalContent,
      title: title || finalContent.substring(0, 30),
      color
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleDownload = () => {
    if (!qrCodeDataURL) return
    const link = document.createElement('a')
    link.download = `qr-code-${Date.now()}.png`
    link.href = qrCodeDataURL
    link.click()
  }

  const handleCopy = async () => {
    if (!qrCodeDataURL) return
    try {
      const blob = await (await fetch(qrCodeDataURL)).blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('복사 실패:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {qrTypes.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => setQrType(type)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
              qrType === type
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="제목 (선택사항)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />

        {qrType === 'text' && (
          <textarea
            placeholder="텍스트를 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field min-h-[100px] resize-none"
          />
        )}

        {qrType === 'url' && (
          <input
            type="url"
            placeholder="https://example.com"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field"
          />
        )}

        {qrType === 'wifi' && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="네트워크 이름 (SSID)"
              value={wifiData.ssid}
              onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
              className="input-field"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={wifiData.password}
              onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
              className="input-field"
            />
            <select
              value={wifiData.encryption}
              onChange={(e) => setWifiData({ ...wifiData, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' })}
              className="input-field"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">암호 없음</option>
            </select>
          </div>
        )}

        {qrType === 'email' && (
          <div className="space-y-3">
            <input
              type="email"
              placeholder="받는 사람 이메일"
              value={email.to}
              onChange={(e) => setEmail({ ...email, to: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="제목"
              value={email.subject}
              onChange={(e) => setEmail({ ...email, subject: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="내용"
              value={email.body}
              onChange={(e) => setEmail({ ...email, body: e.target.value })}
              className="input-field min-h-[80px] resize-none"
            />
          </div>
        )}

        {qrType === 'phone' && (
          <input
            type="tel"
            placeholder="+82 10-1234-5678"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field"
          />
        )}

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-white">
            <Palette size={20} />
            <span>색상:</span>
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
          />
          <span className="text-white/80 text-sm">{color}</span>
        </div>
      </div>

      {qrCodeDataURL && (
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <img src={qrCodeDataURL} alt="QR Code" className="w-64 h-64" />
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={handleSave} className="button-primary flex items-center gap-2">
              <Save size={18} />
              {saved ? '저장됨!' : '저장'}
            </button>
            <button onClick={handleDownload} className="button-secondary flex items-center gap-2">
              <Download size={18} />
              다운로드
            </button>
            <button onClick={handleCopy} className="button-secondary flex items-center gap-2">
              {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
              {copied ? '복사됨!' : '복사'}
            </button>
          </div>
        </div>
      )}

      {!qrCodeDataURL && (content || wifiData.ssid || email.to) && (
        <div className="flex items-center justify-center text-white/60 gap-2">
          <AlertCircle size={20} />
          <span>QR 코드를 생성 중...</span>
        </div>
      )}
    </div>
  )
}