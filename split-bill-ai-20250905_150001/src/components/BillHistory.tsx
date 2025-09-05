import React from 'react'
import { Clock, Receipt, Users, DollarSign, Trash2, Eye } from 'lucide-react'
import { useBillStore, Bill } from '../store/useBillStore'

const BillHistory: React.FC = () => {
  const { bills, setCurrentBill, deleteBill } = useBillStore()
  
  const handleViewBill = (bill: Bill) => {
    setCurrentBill(bill)
  }
  
  const handleDeleteBill = (billId: string) => {
    if (confirm('Are you sure you want to delete this bill?')) {
      deleteBill(billId)
    }
  }
  
  if (bills.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-500" />
          Recent Bills
        </h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No bills yet</p>
          <p className="text-sm mt-1">Start by creating your first bill split</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary-500" />
        Recent Bills
      </h2>
      
      <div className="space-y-3">
        {bills.map(bill => (
          <div
            key={bill.id}
            className="border rounded-lg p-4 hover:shadow-md transition-all dark:border-gray-600 cursor-pointer"
            onClick={() => handleViewBill(bill)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {bill.title || 'Untitled Bill'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(bill.date).toLocaleDateString()}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                    <Users className="w-4 h-4" />
                    {bill.people.length} people
                  </span>
                  <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                    <Receipt className="w-4 h-4" />
                    {bill.items.length} items
                  </span>
                  <span className="flex items-center gap-1 font-medium text-primary-600 dark:text-primary-400">
                    <DollarSign className="w-4 h-4" />
                    {bill.totalAmount.toFixed(2)}
                  </span>
                </div>
                
                {bill.settled && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 mt-2 text-xs font-medium text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30 rounded-full">
                    Settled
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleViewBill(bill)
                  }}
                  className="p-2 text-gray-500 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="View bill"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteBill(bill.id)
                  }}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete bill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BillHistory