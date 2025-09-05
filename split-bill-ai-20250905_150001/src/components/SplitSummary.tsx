import React from 'react'
import { DollarSign, User, Share2, CheckCircle, Copy, Send } from 'lucide-react'
import { useBillStore } from '../store/useBillStore'

const SplitSummary: React.FC = () => {
  const { currentBill, calculateSplit } = useBillStore()
  const splits = calculateSplit()
  
  const handleCopyToClipboard = (personName: string, amount: number) => {
    const text = `${personName} owes $${amount.toFixed(2)} for ${currentBill?.title || 'the bill'}`
    navigator.clipboard.writeText(text)
      .then(() => {
        const button = document.getElementById(`copy-${personName}`)
        if (button) {
          button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
          setTimeout(() => {
            button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>'
          }, 2000)
        }
      })
      .catch(err => console.error('Failed to copy:', err))
  }
  
  const handleShare = async () => {
    if (!currentBill) return
    
    let shareText = `${currentBill.title || 'Bill'} Split Summary\n\n`
    shareText += `Total: $${(currentBill.totalAmount || 0).toFixed(2)}\n\n`
    
    currentBill.people.forEach(person => {
      const amount = splits[person.id] || 0
      shareText += `${person.name}: $${amount.toFixed(2)}\n`
    })
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Split Bill Summary',
          text: shareText
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(shareText)
    }
  }
  
  if (!currentBill || currentBill.people.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Share2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Add people and items to see the split</p>
        </div>
      </div>
    )
  }
  
  const totalAssigned = Object.values(splits).reduce((sum, amount) => sum + amount, 0)
  const subtotal = currentBill.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const grandTotal = subtotal + currentBill.tax + currentBill.tip
  const unassigned = grandTotal - totalAssigned
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Share2 className="w-6 h-6 text-primary-500" />
          Split Summary
        </h2>
        
        <button
          onClick={handleShare}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2 text-sm"
        >
          <Send className="w-4 h-4" />
          Share
        </button>
      </div>
      
      {unassigned > 0.01 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ Unassigned amount: <span className="font-bold">${unassigned.toFixed(2)}</span>
          </p>
          <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
            Some items haven't been assigned to anyone yet.
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        {currentBill.people.map(person => {
          const amount = splits[person.id] || 0
          const percentage = grandTotal > 0 ? (amount / grandTotal) * 100 : 0
          
          return (
            <div
              key={person.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow dark:border-gray-600"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: person.color }}
                  >
                    {person.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{person.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {percentage.toFixed(1)}% of total
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      ${amount.toFixed(2)}
                    </p>
                  </div>
                  <button
                    id={`copy-${person.name}`}
                    onClick={() => handleCopyToClipboard(person.name, amount)}
                    className="p-2 text-gray-500 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Copy amount"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${percentage}%`, backgroundColor: person.color }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                <p>Items assigned:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentBill.items
                    .filter(item => item.assignedTo.includes(person.id))
                    .map(item => (
                      <span
                        key={item.id}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                      >
                        {item.name} (${(item.price * item.quantity / item.assignedTo.length).toFixed(2)})
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {totalAssigned > 0 && Math.abs(totalAssigned - grandTotal) < 0.01 && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-800 dark:text-green-200">
            All items have been split successfully! Total: <span className="font-bold">${grandTotal.toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default SplitSummary