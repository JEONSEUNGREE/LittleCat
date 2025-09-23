import React, { useRef, useEffect, useState } from 'react'
import { Palette, Camera, Upload } from 'lucide-react'
import { hexToRgb, colorToFrequency, frequencyToNote } from '../utils/colorUtils'
import useColorVoiceStore from '../store/useColorVoiceStore'

const ColorPicker: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('#FF6B6B')
  const [useCamera, setUseCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { setCurrentColor, addToHistory } = useColorVoiceStore()

  useEffect(() => {
    if (useCamera && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch(err => console.error('Camera error:', err))
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [useCamera])

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    const rgb = hexToRgb(color)
    const frequency = colorToFrequency(rgb)
    const noteData = frequencyToNote(frequency)
    
    const colorData = {
      hex: color,
      rgb,
      frequency,
      note: noteData.note,
      octave: noteData.octave,
    }
    
    setCurrentColor(colorData)
    addToHistory('color', colorData)
  }

  const captureFromCamera = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 1, 1)
        const pixel = context.getImageData(0, 0, 1, 1).data
        const hex = `#${[pixel[0], pixel[1], pixel[2]].map(x => 
          x.toString(16).padStart(2, '0')
        ).join('')}`
        handleColorSelect(hex)
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d')
            if (context) {
              context.drawImage(img, 0, 0, 1, 1)
              const pixel = context.getImageData(0, 0, 1, 1).data
              const hex = `#${[pixel[0], pixel[1], pixel[2]].map(x => 
                x.toString(16).padStart(2, '0')
              ).join('')}`
              handleColorSelect(hex)
            }
          }
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const presetColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#FFB6C1', '#87CEEB', '#F0E68C',
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Palette className="w-6 h-6 text-indigo-600" />
          색상 선택
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setUseCamera(!useCamera)}
            className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
            title="카메라로 색상 캡처"
          >
            <Camera className="w-5 h-5" />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
            title="이미지에서 색상 추출"
          >
            <Upload className="w-5 h-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {useCamera && (
        <div className="mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-48 object-cover rounded-lg mb-2"
          />
          <button
            onClick={captureFromCamera}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            색상 캡처
          </button>
        </div>
      )}

      <canvas ref={canvasRef} width="1" height="1" className="hidden" />

      <div className="mb-6">
        <div 
          className="w-full h-32 rounded-xl shadow-inner transition-all duration-300"
          style={{ backgroundColor: selectedColor }}
        />
        <div className="mt-3 text-center">
          <span className="text-2xl font-bold text-gray-800">{selectedColor}</span>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => handleColorSelect(e.target.value)}
          className="w-full h-12 rounded-lg cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-5 gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorSelect(color)}
            className="w-full aspect-square rounded-lg shadow-md hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ColorPicker