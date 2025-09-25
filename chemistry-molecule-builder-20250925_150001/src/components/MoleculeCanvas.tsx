import React, { useRef, useState } from 'react'
import useMoleculeStore from '../store/moleculeStore'

const elementColors: Record<string, string> = {
  'Carbon': 'element-carbon',
  'Hydrogen': 'element-hydrogen',
  'Oxygen': 'element-oxygen',
  'Nitrogen': 'element-nitrogen',
  'Sulfur': 'element-sulfur',
  'Phosphorus': 'element-phosphorus',
  'Chlorine': 'element-chlorine',
  'Bromine': 'element-bromine'
}

const elementSymbols: Record<string, string> = {
  'Carbon': 'C',
  'Hydrogen': 'H',
  'Oxygen': 'O',
  'Nitrogen': 'N',
  'Sulfur': 'S',
  'Phosphorus': 'P',
  'Chlorine': 'Cl',
  'Bromine': 'Br'
}

const MoleculeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedAtom, setDraggedAtom] = useState<string | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  
  const {
    currentMolecule,
    selectedElement,
    selectedAtom,
    bondMode,
    addAtom,
    removeAtom,
    selectAtom,
    createBond
  } = useMoleculeStore()

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || bondMode) return
    if (e.target !== canvasRef.current) return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    addAtom(selectedElement, x, y)
  }

  const handleAtomClick = (atomId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (bondMode) {
      if (selectedAtom && selectedAtom !== atomId) {
        createBond(selectedAtom, atomId, 'single')
        selectAtom(null)
      } else {
        selectAtom(atomId)
      }
    } else if (e.shiftKey || e.metaKey) {
      removeAtom(atomId)
    } else {
      selectAtom(atomId === selectedAtom ? null : atomId)
    }
  }

  const handleMouseDown = (atomId: string, e: React.MouseEvent) => {
    if (bondMode) return
    
    const atom = currentMolecule.atoms.find(a => a.id === atomId)
    if (!atom) return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    setIsDragging(true)
    setDraggedAtom(atomId)
    setOffset({
      x: e.clientX - rect.left - atom.x,
      y: e.clientY - rect.top - atom.y
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedAtom) return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const newX = e.clientX - rect.left - offset.x
    const newY = e.clientY - rect.top - offset.y
    
    const atomIndex = currentMolecule.atoms.findIndex(a => a.id === draggedAtom)
    if (atomIndex !== -1) {
      currentMolecule.atoms[atomIndex].x = Math.max(20, Math.min(rect.width - 20, newX))
      currentMolecule.atoms[atomIndex].y = Math.max(20, Math.min(rect.height - 20, newY))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggedAtom(null)
  }

  const renderBond = (bond: any) => {
    const atom1 = currentMolecule.atoms.find(a => a.id === bond.atom1)
    const atom2 = currentMolecule.atoms.find(a => a.id === bond.atom2)
    
    if (!atom1 || !atom2) return null
    
    const dx = atom2.x - atom1.x
    const dy = atom2.y - atom1.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx) * 180 / Math.PI
    
    const bondLines = bond.type === 'triple' ? 3 : bond.type === 'double' ? 2 : 1
    
    return (
      <div key={bond.id} className="absolute pointer-events-none">
        {Array.from({ length: bondLines }).map((_, i) => (
          <div
            key={i}
            className="bond-line"
            style={{
              left: `${atom1.x}px`,
              top: `${atom1.y + (i - (bondLines - 1) / 2) * 4}px`,
              width: `${distance}px`,
              height: '2px',
              transform: `rotate(${angle}deg)`,
              transformOrigin: '0 50%'
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      ref={canvasRef}
      className="molecule-canvas relative h-96 md:h-[500px] cursor-crosshair"
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {currentMolecule.bonds.map(renderBond)}
      
      {currentMolecule.atoms.map(atom => (
        <div
          key={atom.id}
          className={`
            element-badge absolute -translate-x-1/2 -translate-y-1/2
            ${elementColors[atom.element]}
            ${selectedAtom === atom.id ? 'ring-4 ring-cyan-400 ring-opacity-50 z-20' : 'z-10'}
            ${isDragging && draggedAtom === atom.id ? 'cursor-grabbing' : 'cursor-grab'}
          `}
          style={{
            left: `${atom.x}px`,
            top: `${atom.y}px`
          }}
          onClick={(e) => handleAtomClick(atom.id, e)}
          onMouseDown={(e) => handleMouseDown(atom.id, e)}
        >
          {elementSymbols[atom.element]}
        </div>
      ))}
      
      {currentMolecule.atoms.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Click to add atoms</p>
        </div>
      )}
    </div>
  )
}

export default MoleculeCanvas