import { useState } from 'react'
import { Plus, X, Package, Users } from 'lucide-react'
import useBillStore from '../store/billStore'

export default function ItemManager() {
  const { items, people, addItem, removeItem, updateItem } = useBillStore()
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    quantity: '1',
    sharedBy: [] as string[]
  })

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.sharedBy.length > 0) {
      addItem({
        name: newItem.name,
        price: parseFloat(newItem.price),
        quantity: parseInt(newItem.quantity) || 1,
        sharedBy: newItem.sharedBy
      })
      setNewItem({
        name: '',
        price: '',
        quantity: '1',
        sharedBy: []
      })
    }
  }

  const togglePerson = (personId: string) => {
    setNewItem(prev => ({
      ...prev,
      sharedBy: prev.sharedBy.includes(personId)
        ? prev.sharedBy.filter(id => id !== personId)
        : [...prev.sharedBy, personId]
    }))
  }

  const toggleItemPerson = (itemId: string, personId: string) => {
    const item = items.find(i => i.id === itemId)
    if (item) {
      updateItem(itemId, {
        sharedBy: item.sharedBy.includes(personId)
          ? item.sharedBy.filter(id => id !== personId)
          : [...item.sharedBy, personId]
      })
    }
  }

  if (people.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500 mb-2">참가자를 먼저 추가해주세요</p>
        <p className="text-sm text-gray-400">참가자 탭에서 사람을 추가한 후 항목을 입력할 수 있습니다</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Package className="w-5 h-5 text-primary-500" />
        항목 관리
      </h2>

      {/* Add Item Form */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="항목명"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="가격"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="수량"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            className="input-field"
          />
        </div>

        {/* Person Selection */}
        <div>
          <p className="text-sm text-gray-600 mb-2">누가 나눌까요?</p>
          <div className="flex flex-wrap gap-2">
            {people.map((person) => (
              <button
                key={person.id}
                onClick={() => togglePerson(person.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  newItem.sharedBy.includes(person.id)
                    ? 'bg-primary-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {person.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddItem}
          disabled={!newItem.name || !newItem.price || newItem.sharedBy.length === 0}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          항목 추가
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>추가된 항목이 없습니다</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ₩{item.price.toLocaleString('ko-KR')} × {item.quantity}개 = 
                    <span className="font-semibold text-primary-600 ml-1">
                      ₩{(item.price * item.quantity).toLocaleString('ko-KR')}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {people.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => toggleItemPerson(item.id, person.id)}
                    className={`px-2 py-1 rounded text-xs transition-all duration-200 ${
                      item.sharedBy.includes(person.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {person.name}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}