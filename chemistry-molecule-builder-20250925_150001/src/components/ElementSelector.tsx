import React from 'react'
import { Atom as AtomIcon } from 'lucide-react'
import useMoleculeStore from '../store/moleculeStore'

const elements = [
  { name: 'Carbon', symbol: 'C', color: 'element-carbon' },
  { name: 'Hydrogen', symbol: 'H', color: 'element-hydrogen' },
  { name: 'Oxygen', symbol: 'O', color: 'element-oxygen' },
  { name: 'Nitrogen', symbol: 'N', color: 'element-nitrogen' },
  { name: 'Sulfur', symbol: 'S', color: 'element-sulfur' },
  { name: 'Phosphorus', symbol: 'P', color: 'element-phosphorus' },
  { name: 'Chlorine', symbol: 'Cl', color: 'element-chlorine' },
  { name: 'Bromine', symbol: 'Br', color: 'element-bromine' }
]

const ElementSelector: React.FC = () => {
  const { selectedElement, setSelectedElement } = useMoleculeStore()

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <AtomIcon className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Elements</h3>
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-4 gap-3">
        {elements.map((element) => (
          <button
            key={element.name}
            onClick={() => setSelectedElement(element.name)}
            className={`
              element-badge ${element.color}
              ${selectedElement === element.name ? 'ring-4 ring-cyan-400 ring-opacity-50' : ''}
            `}
            title={element.name}
          >
            {element.symbol}
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-700 bg-opacity-50 rounded-lg">
        <p className="text-xs text-gray-300">
          Selected: <span className="text-cyan-400 font-semibold">{selectedElement}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Tap canvas to add atoms
        </p>
      </div>
    </div>
  )
}

export default ElementSelector