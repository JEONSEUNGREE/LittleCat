import React, { useState } from 'react'
import { Home, Plus, MapPin, Brain, Eye, Trash2 } from 'lucide-react'
import { useMemoryStore } from '../store/useMemoryStore'

const PalaceBuilder: React.FC = () => {
  const [showAddRoom, setShowAddRoom] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('living')
  
  const { currentPalace, currentRoom, selectRoom, addRoom, addMemoryItem, removeMemoryItem } = useMemoryStore()
  
  const roomThemes = [
    { id: 'living', name: '거실', color: 'bg-amber-500' },
    { id: 'bedroom', name: '침실', color: 'bg-blue-500' },
    { id: 'kitchen', name: '주방', color: 'bg-green-500' },
    { id: 'study', name: '서재', color: 'bg-purple-500' },
    { id: 'garden', name: '정원', color: 'bg-emerald-500' }
  ]

  const handleAddRoom = () => {
    if (newRoomName && currentPalace) {
      addRoom(currentPalace.id, {
        name: newRoomName,
        theme: selectedTheme,
        connections: []
      })
      setNewRoomName('')
      setShowAddRoom(false)
    }
  }

  const handleAddItem = (position: { x: number; y: number }) => {
    const content = prompt('기억할 내용을 입력하세요:')
    if (content && currentRoom) {
      addMemoryItem(currentRoom.id, {
        content,
        position,
        roomId: currentRoom.id
      })
    }
  }

  const handleRoomClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (currentRoom && e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect()
      const position = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      }
      handleAddItem(position)
    }
  }

  if (!currentPalace) return null

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-800">{currentPalace.name}</h2>
          </div>
          <button
            onClick={() => setShowAddRoom(!showAddRoom)}
            className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            방 추가
          </button>
        </div>
      </div>

      {/* 방 추가 패널 */}
      {showAddRoom && (
        <div className="bg-white border-b p-4 space-y-3">
          <input
            type="text"
            placeholder="방 이름"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-2">
            {roomThemes.map(theme => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  selectedTheme === theme.id
                    ? `${theme.color} text-white`
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddRoom}
            disabled={!newRoomName}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            방 생성
          </button>
        </div>
      )}

      {/* 방 목록 */}
      <div className="flex gap-2 p-4 overflow-x-auto">
        {currentPalace.rooms.map(room => {
          const theme = roomThemes.find(t => t.id === room.theme)
          return (
            <button
              key={room.id}
              onClick={() => selectRoom(room.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
                currentRoom?.id === room.id
                  ? `${theme?.color || 'bg-gray-500'} text-white shadow-lg scale-105`
                  : 'bg-white border hover:shadow-md'
              }`}
            >
              <MapPin className="w-4 h-4" />
              {room.name}
              <span className="text-xs opacity-75">({room.items.length})</span>
            </button>
          )
        })}
      </div>

      {/* 현재 방 뷰 */}
      {currentRoom && (
        <div className="flex-1 p-4">
          <div 
            onClick={handleRoomClick}
            className="relative w-full h-full bg-white rounded-xl shadow-inner border-2 border-gray-200 cursor-crosshair overflow-hidden"
            style={{ minHeight: '400px' }}
          >
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
              <Eye className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">클릭하여 아이템 추가</span>
            </div>
            
            {/* 메모리 아이템들 */}
            {currentRoom.items.map(item => (
              <div
                key={item.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ 
                  left: `${item.position.x}%`, 
                  top: `${item.position.y}%` 
                }}
              >
                <div className="relative">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg shadow-lg hover:scale-110 transition-transform cursor-pointer animate-float">
                    <Brain className="w-4 h-4 mb-1" />
                    <p className="text-xs font-medium max-w-[100px] break-words">
                      {item.content}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeMemoryItem(currentRoom.id, item.id)
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}