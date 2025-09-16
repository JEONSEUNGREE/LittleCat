import { useState } from 'react'
import { ShoppingCart, Plus, X, Users } from 'lucide-react'
import { useBillStore } from '../store/billStore'

export default function ItemManager() {
  const { items, people, addItem, removeItem, updateItem, splitMethod, calculateSplit } = useBillStore()
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '1' })
  const [selectedPeople, setSelectedPeople] = useState<string[]>([])
  
  if (splitMethod !== 'items') {
    return null
  }
  
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItem.name && newItem.price && selectedPeople.length > 0) {
      addItem({
        name: newItem.name,
        price: parseFloat(newItem.price),
        quantity: parseInt(newItem.quantity) || 1,
        sharedBy: selectedPeople
      })
      setNewItem({ name: '', price: '', quantity: '1' })
      setSelectedPeople([])
      setTimeout(calculateSplit, 100)
    }
  }
  
  const togglePerson = (personId: string) => {
    setSelectedPeople(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    )
  }
  
  const togglePersonForItem = (itemId: string, personId: string) => {
    const item = items.find(i => i.id === itemId)
    if (item) {
      const newSharedBy = item.sharedBy.includes(personId)
        ? item.sharedBy.filter(id => id !== personId)
        : [...item.sharedBy, personId]
      updateItem(itemId, { sharedBy: newSharedBy })
      setTimeout(calculateSplit, 100)
    }
  }
  
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        주문 항목
      </h2>
      
      <form onSubmit={handleAddItem} className="space-y-3 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="input-field"
            placeholder="항목명"
            required
          />
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="input-field"
            placeholder="가격"
            min="0"
            step="0.01"
            required
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            className="input-field"
            placeholder="수량"
            min="1"
            required
          />
        </div>
        
        {people.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-1" />
              공유할 사람 선택
            </label>
            <div className="flex flex-wrap gap-2">
              {people.map(person => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => togglePerson(person.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedPeople.includes(person.id)
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {person.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <button 
          type="submit" 
          className="btn-secondary w-full flex items-center justify-center gap-2"
          disabled={!newItem.name || !newItem.price || selectedPeople.length === 0}
        >
          <Plus className="w-4 h-4" />
          항목 추가
        </button>
      </form>
      
      {items.length > 0 ? (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    ₩{item.price.toLocaleString()} × {item.quantity} = ₩{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-danger hover:bg-red-50 p-1 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {people.map(person => (
                  <button
                    key={person.id}
                    onClick={() => togglePersonForItem(item.id, person.id)}
                    className={`px-2 py-0.5 rounded-full text-xs transition-colors ${
                      item.sharedBy.includes(person.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {person.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>항목을 추가해주세요</p>
        </div>
      )}
    </div>
  )
}