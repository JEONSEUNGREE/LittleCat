import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Camera, Upload, Copy, Save } from 'lucide-react'
import QrScanner from 'qr-scanner'
import useNotesStore from '../store'

interface QRScannerProps {
  onBack: () => void
}

export default function QRScanner({ onBack }: QRScannerProps) {
  const [scannedData, setScannedData] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scannerRef = useRef<QrScanner | null>(null)
  
  const { addNote } = useNotesStore()

  useEffect(() => {
    if (isScanning && videoRef.current) {
      const qrScanner = new QrScanner(
        videoRef.current,
        result => {
          setScannedData(result.data)
          setIsScanning(false)
          qrScanner.stop()
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      )
      
      scannerRef.current = qrScanner
      qrScanner.start().catch(err => {
        setError('Unable to access camera. Please check permissions.')
        setIsScanning(false)
      })

      return () => {
        qrScanner.stop()
      }
    }
  }, [isScanning])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true })
        setScannedData(result.data)
        setError('')
      } catch (err) {
        setError('No QR code found in the image')
      }
    }
  }

  const handleStartScan = () => {
    setIsScanning(true)
    setError('')
    setScannedData('')
  }

  const handleStopScan = () => {
    setIsScanning(false)
    if (scannerRef.current) {
      scannerRef.current.stop()
    }
  }

  const handleSaveAsNote = () => {
    if (scannedData) {
      const lines = scannedData.split('\n')
      const title = lines[0] || 'Scanned Note'
      const content = lines.slice(2).join('\n') || scannedData
      
      addNote({
        title: `Scanned: ${title}`,
        content,
        category: 'personal',
        isLocked: false,
      })
      
      onBack()
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(scannedData)
    alert('Copied to clipboard!')
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <h2 className="text-xl font-semibold text-white">Scan QR Code</h2>
        </div>

        {/* Scanner Area */}
        <div className="mb-6">
          {isScanning ? (
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full rounded-lg bg-black aspect-square object-cover"
              />
              <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
              </div>
              <button
                onClick={handleStopScan}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                Stop Scanning
              </button>
            </div>
          ) : (
            <div className="bg-slate-900/50 rounded-lg p-12 text-center">
              <Camera className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">Ready to scan QR codes</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleStartScan}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Start Camera</span>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Image</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Scanned Result */}
        {scannedData && (
          <div className="animate-slide-up">
            <h3 className="text-lg font-medium text-white mb-3">Scanned Content</h3>
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap break-words">
                {scannedData}
              </pre>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Copy className="w-5 h-5" />
                <span>Copy</span>
              </button>
              <button
                onClick={handleSaveAsNote}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save as Note</span>
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!isScanning && !scannedData && (
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="text-sm font-medium text-blue-400 mb-2">How to use:</h4>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Click "Start Camera" to scan QR codes in real-time</li>
              <li>• Or upload an image containing a QR code</li>
              <li>• Scanned content can be saved as a new note</li>
              <li>• All notes are stored locally for privacy</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}