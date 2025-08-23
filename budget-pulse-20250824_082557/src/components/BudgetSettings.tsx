import React, { useState } from 'react'
import { Settings, Save, DollarSign } from 'lucide-react'
import { useBudgetStore } from '../store/useBudgetStore'

const BudgetSettings: React.FC = () => {
  const { monthlyBudget, setMonthlyBudget } = useBudgetStore()
  const [isEditing, setIsEditing] = useState(false)
  const [tempBudget, setTempBudget] = useState(monthlyBudget.toString())
  
  const handleSave = () => {
    const newBudget = parseFloat(tempBudget)
    if (!isNaN(newBudget) && newBudget > 0) {
      setMonthlyBudget(newBudget)
      setIsEditing(false)
    }
  }
  
  const handleCancel = () => {
    setTempBudget(monthlyBudget.toString())
    setIsEditing(false)
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Budget Settings
        </h3>
      </div>
      
      {isEditing ? (
        <div className="space-y-4">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="number"
              step="100"
              value={tempBudget}
              onChange={(e) => setTempBudget(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/20 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Enter monthly budget"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex-1 py-2 bg-pulse-green text-white font-medium rounded-lg hover:bg-pulse-green/80 transition-all flex items-center justify-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 py-2 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <span className="text-white/80">Monthly Budget</span>
            <span className="text-2xl font-bold text-white">
              ${monthlyBudget.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 w-full py-2 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-all"
          >
            Edit Budget
          </button>
        </div>
      )}
      
      <div className="mt-6 pt-6 border-t border-white/20">
        <h4 className="text-white font-medium mb-3">Quick Tips</h4>
        <ul className="space-y-2 text-white/70 text-sm">
          <li className="flex items-start">
            <span className="text-pulse-green mr-2">•</span>
            <span>Keep your pulse below 100 BPM for optimal financial health</span>
          </li>
          <li className="flex items-start">
            <span className="text-pulse-blue mr-2">•</span>
            <span>Track every expense to maintain accurate health monitoring</span>
          </li>
          <li className="flex items-start">
            <span className="text-pulse-yellow mr-2">•</span>
            <span>Review your spending trends weekly to stay on track</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BudgetSettings