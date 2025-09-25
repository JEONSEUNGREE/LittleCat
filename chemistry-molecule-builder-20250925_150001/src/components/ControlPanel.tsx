import React from 'react'
import { Trash2, Link2, Beaker, Download, RefreshCw } from 'lucide-react'
import useMoleculeStore from '../store/moleculeStore'

const ControlPanel: React.FC = () => {
  const {
    currentMolecule,
    bondMode,
    setBondMode,
    clearMolecule
  } = useMoleculeStore()

  const exportMolecule = () => {
    const data = JSON.stringify(currentMolecule, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `molecule-${currentMolecule.formula}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const predefinedMolecules = [
    { name: 'Water', formula: 'H2O' },
    { name: 'Methane', formula: 'CH4' },
    { name: 'Ethanol', formula: 'C2H6O' },
    { name: 'Benzene', formula: 'C6H6' }
  ]

  const loadPredefinedMolecule = (moleculeName: string) => {
    clearMolecule()
    
    switch (moleculeName) {
      case 'Water':
        useMoleculeStore.getState().addAtom('Oxygen', 200, 150)
        useMoleculeStore.getState().addAtom('Hydrogen', 150, 100)
        useMoleculeStore.getState().addAtom('Hydrogen', 150, 200)
        setTimeout(() => {
          const atoms = useMoleculeStore.getState().currentMolecule.atoms
          if (atoms.length >= 3) {
            useMoleculeStore.getState().createBond(atoms[0].id, atoms[1].id, 'single')
            useMoleculeStore.getState().createBond(atoms[0].id, atoms[2].id, 'single')
          }
        }, 100)
        break
        
      case 'Methane':
        useMoleculeStore.getState().addAtom('Carbon', 200, 150)
        useMoleculeStore.getState().addAtom('Hydrogen', 150, 100)
        useMoleculeStore.getState().addAtom('Hydrogen', 250, 100)
        useMoleculeStore.getState().addAtom('Hydrogen', 150, 200)
        useMoleculeStore.getState().addAtom('Hydrogen', 250, 200)
        setTimeout(() => {
          const atoms = useMoleculeStore.getState().currentMolecule.atoms
          if (atoms.length >= 5) {
            for (let i = 1; i < 5; i++) {
              useMoleculeStore.getState().createBond(atoms[0].id, atoms[i].id, 'single')
            }
          }
        }, 100)
        break
    }
  }

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Beaker className="w-5 h-5 text-cyan-400" />
          Controls
        </h3>
        <div className="text-sm text-cyan-400 font-mono">
          {currentMolecule.formula}
        </div>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={() => setBondMode(!bondMode)}
          className={`
            w-full atom-button flex items-center justify-center gap-2
            ${bondMode 
              ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}
          `}
        >
          <Link2 className="w-4 h-4" />
          {bondMode ? 'Bond Mode ON' : 'Bond Mode OFF'}
        </button>
        
        <button
          onClick={clearMolecule}
          className="w-full atom-button bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
        
        <button
          onClick={exportMolecule}
          className="w-full atom-button bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400 mb-2">Load Example:</p>
        <div className="grid grid-cols-2 gap-2">
          {predefinedMolecules.map(mol => (
            <button
              key={mol.name}
              onClick={() => loadPredefinedMolecule(mol.name)}
              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
            >
              {mol.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-700 bg-opacity-50 rounded-lg">
        <p className="text-xs text-gray-400">
          <span className="text-cyan-400">Tips:</span><br/>
          • Click canvas to add atoms<br/>
          • Drag atoms to move<br/>
          • Shift+Click to delete<br/>
          • Enable Bond Mode to connect
        </p>
      </div>
    </div>
  )
}

export default ControlPanel