import { X, Download, Share2 } from 'lucide-react'

interface QRDisplayProps {
  qrData: string
  onClose: () => void
}

export function QRDisplay({ qrData, onClose }: QRDisplayProps) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.download = `diary-qr-${Date.now()}.png`
    link.href = qrData
    link.click()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const blob = await (await fetch(qrData)).blob()
        const file = new File([blob], 'diary-qr.png', { type: 'image/png' })
        await navigator.share({
          files: [file],
          title: 'QR Diary',
          text: '내 일기 QR 코드'
        })
      } catch (error) {
        console.error('공유 실패:', error)
      }
    } else {
      alert('이 브라우저는 공유 기능을 지원하지 않습니다.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            QR 코드 생성 완료
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
          <img src={qrData} alt="QR Code" className="w-full h-auto" />
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
          이 QR 코드를 스캔하면 일기 내용을 확인할 수 있습니다
        </p>
        
        <div className="flex space-x-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center space-x-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>다운로드</span>
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>공유</span>
          </button>
        </div>
      </div>
    </div>
  )
}