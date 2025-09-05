import { useState } from 'react'
import { Plus, X, DollarSign, Users, ShoppingCart, Calculator, Check, Receipt } from 'lucide-react'
import { useBillStore, Person, BillItem } from '../store/useBillStore'

const BillForm: React.FC = () => {
  const { currentBill, addPerson, removePerson, addItem, updateItem, removeItem, assignItemToPerson, unassignItemFromPerson, setCurrentBill } = useBillStore()
  
  const [newPersonName, setNewPersonName] = useState('')
  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')
  const [newItemQuantity, setNewItemQuantity] = useState('1')
  const [billTitle, setBillTitle] = useState(currentBill?.title || '')
  const [tax, setTax] = useState(currentBill?.tax.toString() || '0')
  const [tip, setTip] = useState(currentBill?.tip.toString() || '0')
  
  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9'
  ]
  
  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      const person: Person = {
        id: Date.now().toString(),
        name: newPersonName.trim(),
        color: colors[Math.floor(Math.random() * colors.length)]
      }
      addPerson(person)
      setNewPersonName('')
    }
  }
  
  const handleAddItem = () => {
    if (newItemName.trim() && newItemPrice) {
      const item: BillItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        price: parseFloat(newItemPrice),
        quantity: parseInt(newItemQuantity) || 1,
        assignedTo: []
      }
      addItem(item)
      setNewItemName('')
      setNewItemPrice('')
      setNewItemQuantity('1')
    }
  }
  
  const toggleItemAssignment = (itemId: string, personId: string) => {
    const item = currentBill?.items.find(i => i.id === itemId)
    if (item?.assignedTo.includes(personId)) {
      unassignItemFromPerson(itemId, personId)
    } else {
      assignItemToPerson(itemId, personId)
    }
  }
  
  const updateBillDetails = () => {
    if (currentBill) {
      setCurrentBill({
        ...currentBill,
        title: billTitle,
        tax: parseFloat(tax) || 0,
        tip: parseFloat(tip) || 0
      })
    }
  }
  
  const subtotal = currentBill?.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
  const total = subtotal + (parseFloat(tax) || 0) + (parseFloat(tip) || 0)
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Receipt className="w-6 h-6 text-primary-500" />
          Bill Details
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Bill title"
            value={billTitle}
            onChange={(e) => setBillTitle(e.target.value)}
            onBlur={updateBillDetails}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="number"
              placeholder="Tax"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              onBlur={updateBillDetails}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
              step="0.01"
            />
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="number"
              placeholder="Tip"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              onBlur={updateBillDetails}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
              step="0.01"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-500" />
          People
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {currentBill?.people.map(person => (
            <div
              key={person.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
              style={{ backgroundColor: person.color }}
            >
              <span>{person.name}</span>
              <button
                onClick={() => removePerson(person.id)}
                className="hover:bg-white/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add person"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddPerson()}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={handleAddPerson}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary-500" />
          Items
        </h3>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {currentBill?.items.map(item => (
            <div key={item.id} className="border rounded-lg p-3 dark:border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {currentBill?.people.map(person => (
                  <button
                    key={person.id}
                    onClick={() => toggleItemAssignment(item.id, person.id)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                      item.assignedTo.includes(person.id)
                        ? 'text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    style={{
                      backgroundColor: item.assignedTo.includes(person.id) ? person.color : undefined
                    }}
                  >
                    {person.name}
                    {item.assignedTo.includes(person.id) && (
                      <Check className="inline w-3 h-3 ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="sm:col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="number"
            placeholder="Price"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            step="0.01"
          />
          <input
            type="number"
            placeholder="Qty"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="1"
          />
        </div>
        
        <button
          onClick={handleAddItem}
          className="w-full sm:w-auto px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>
      
      <div className="border-t pt-4 dark:border-gray-600">
        <div className="space-y-2 text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Subtotal: <span className="font-medium">${subtotal.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tax: <span className="font-medium">${(parseFloat(tax) || 0).toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tip: <span className="font-medium">${(parseFloat(tip) || 0).toFixed(2)}</span>
          </p>
          <p className="text-lg font-bold text-gray-800 dark:text-white flex items-center justify-end gap-2">
            <Calculator className="w-5 h-5 text-primary-500" />
            Total: ${total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BillForm