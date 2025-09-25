import React from 'react'
import { Atom } from 'lucide-react'
import ElementSelector from './components/ElementSelector'
import MoleculeCanvas from './components/MoleculeCanvas'
import ControlPanel from './components/ControlPanel'

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative">
              <Atom className="w-10 h-10 text-cyan-400 animate-spin-slow" />
              <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-30 animate-pulse-slow" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Chemistry Molecule Builder
            </h1>
          </div>
          <p className="text-gray-400">Interactive 3D molecule creation and visualization</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <ElementSelector />
            <div className="hidden lg:block">
              <ControlPanel />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <MoleculeCanvas />
            
            <div className="lg:hidden mt-6">
              <ControlPanel />
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-center">
          <p className="text-xs text-gray-500">
            Build complex molecules • Visualize chemical structures • Educational chemistry tool
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App