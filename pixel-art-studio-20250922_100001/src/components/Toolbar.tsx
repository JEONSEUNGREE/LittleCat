import React from 'react'
import {
  Pencil,
  Eraser,
  PaintBucket,
  Pipette,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Grid3x3
} from 'lucide-react'
import { usePixelStore } from '../store/pixelStore'

export const Toolbar: React.FC = () => {
  const {
    tool,
    setTool,
    undo,
    redo,
    clearCanvas,
    exportAsPNG,
    gridSize,
    setGridSize
  } = usePixelStore()

  const tools = [
    { id: 'pen' as const, icon: Pencil, label: '펜' },
    { id: 'eraser' as const, icon: Eraser, label: '지우개' },
    { id: 'fill' as const, icon: PaintBucket, label: '채우기' },
    { id: 'eyedropper' as const, icon: Pipette, label: '스포이드' }
  ]

  const gridSizes = [8, 16, 24, 32]

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center bg-slate-800 p-3 rounded-lg">
      {/* Tool Selection */}
      <div className="flex gap-1 bg-slate-700 rounded-lg p-1">
        {tools.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTool(id)}
            className={`p-2 rounded transition-all ${
              tool === id
                ? 'bg-pixel-primary text-white'
                : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
            }`}
            title={label}
            aria-label={label}
          >
            <Icon size={20} />
          </button>
        ))}
      </div>

      {/* History Controls */}
      <div className="flex gap-1 bg-slate-700 rounded-lg p-1">
        <button
          onClick={undo}
          className="p-2 bg-slate-600 text-gray-300 hover:bg-slate-500 rounded transition-all"
          title="실행 취소"
          aria-label="실행 취소"
        >
          <Undo2 size={20} />
        </button>
        <button
          onClick={redo}
          className="p-2 bg-slate-600 text-gray-300 hover:bg-slate-500 rounded transition-all"
          title="다시 실행"
          aria-label="다시 실행"
        >
          <Redo2 size={20} />
        </button>
      </div>

      {/* Grid Size */}
      <div className="flex gap-1 bg-slate-700 rounded-lg p-1 items-center">
        <Grid3x3 size={20} className="text-gray-400 ml-1" />
        {gridSizes.map((size) => (
          <button
            key={size}
            onClick={() => setGridSize(size)}
            className={`px-3 py-1 rounded text-sm font-medium transition-all ${
              gridSize === size
                ? 'bg-pixel-secondary text-white'
                : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-1 bg-slate-700 rounded-lg p-1">
        <button
          onClick={clearCanvas}
          className="p-2 bg-red-600 text-white hover:bg-red-500 rounded transition-all"
          title="전체 지우기"
          aria-label="전체 지우기"
        >
          <Trash2 size={20} />
        </button>
        <button
          onClick={exportAsPNG}
          className="p-2 bg-green-600 text-white hover:bg-green-500 rounded transition-all"
          title="PNG로 내보내기"
          aria-label="PNG로 내보내기"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  )
}