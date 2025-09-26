import React, { useRef } from 'react'
import { Upload, Image as ImageIcon } from 'lucide-react'

interface ImageUploaderProps {
  onImageUpload: (file: File) => void
  imageUrl: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onImageUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onImageUpload(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
        imageUrl
          ? 'border-purple-300 bg-purple-50'
          : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {imageUrl ? (
        <div className="space-y-4">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="max-h-64 mx-auto rounded-lg shadow-md object-cover"
          />
          <p className="text-sm text-gray-600">Click or drop another image to replace</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              Drop an image here or click to upload
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports JPG, PNG, GIF, WebP
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader