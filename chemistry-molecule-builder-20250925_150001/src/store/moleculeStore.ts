import { create } from 'zustand'

export interface Atom {
  id: string
  element: string
  x: number
  y: number
  bonds: string[]
  charge: number
}

export interface Bond {
  id: string
  atom1: string
  atom2: string
  type: 'single' | 'double' | 'triple'
}

export interface Molecule {
  atoms: Atom[]
  bonds: Bond[]
  formula: string
  name: string
}

interface MoleculeStore {
  currentMolecule: Molecule
  selectedElement: string
  selectedAtom: string | null
  bondMode: boolean
  addAtom: (element: string, x: number, y: number) => void
  removeAtom: (id: string) => void
  selectAtom: (id: string | null) => void
  createBond: (atom1: string, atom2: string, type: 'single' | 'double' | 'triple') => void
  removeBond: (id: string) => void
  setSelectedElement: (element: string) => void
  setBondMode: (enabled: boolean) => void
  clearMolecule: () => void
  updateFormula: () => void
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

const calculateMolecularFormula = (atoms: Atom[]): string => {
  const counts: Record<string, number> = {}
  
  atoms.forEach(atom => {
    const symbol = elementSymbols[atom.element] || atom.element
    counts[symbol] = (counts[symbol] || 0) + 1
  })
  
  const order = ['C', 'H', 'N', 'O', 'P', 'S', 'Cl', 'Br']
  const formula = order
    .filter(symbol => counts[symbol])
    .map(symbol => symbol + (counts[symbol] > 1 ? counts[symbol] : ''))
    .join('')
  
  return formula || 'Empty'
}

const useMoleculeStore = create<MoleculeStore>((set, get) => ({
  currentMolecule: {
    atoms: [],
    bonds: [],
    formula: 'Empty',
    name: 'New Molecule'
  },
  selectedElement: 'Carbon',
  selectedAtom: null,
  bondMode: false,
  
  addAtom: (element, x, y) => {
    const newAtom: Atom = {
      id: `atom-${Date.now()}-${Math.random()}`,
      element,
      x,
      y,
      bonds: [],
      charge: 0
    }
    
    set(state => ({
      currentMolecule: {
        ...state.currentMolecule,
        atoms: [...state.currentMolecule.atoms, newAtom]
      }
    }))
    
    get().updateFormula()
  },
  
  removeAtom: (id) => {
    set(state => {
      const newAtoms = state.currentMolecule.atoms.filter(atom => atom.id !== id)
      const newBonds = state.currentMolecule.bonds.filter(
        bond => bond.atom1 !== id && bond.atom2 !== id
      )
      
      return {
        currentMolecule: {
          ...state.currentMolecule,
          atoms: newAtoms,
          bonds: newBonds
        },
        selectedAtom: state.selectedAtom === id ? null : state.selectedAtom
      }
    })
    
    get().updateFormula()
  },
  
  selectAtom: (id) => {
    set({ selectedAtom: id })
  },
  
  createBond: (atom1, atom2, type) => {
    if (atom1 === atom2) return
    
    const existingBond = get().currentMolecule.bonds.find(
      bond => (bond.atom1 === atom1 && bond.atom2 === atom2) ||
              (bond.atom1 === atom2 && bond.atom2 === atom1)
    )
    
    if (existingBond) return
    
    const newBond: Bond = {
      id: `bond-${Date.now()}-${Math.random()}`,
      atom1,
      atom2,
      type
    }
    
    set(state => ({
      currentMolecule: {
        ...state.currentMolecule,
        bonds: [...state.currentMolecule.bonds, newBond]
      }
    }))
  },
  
  removeBond: (id) => {
    set(state => ({
      currentMolecule: {
        ...state.currentMolecule,
        bonds: state.currentMolecule.bonds.filter(bond => bond.id !== id)
      }
    }))
  },
  
  setSelectedElement: (element) => {
    set({ selectedElement: element })
  },
  
  setBondMode: (enabled) => {
    set({ bondMode: enabled, selectedAtom: null })
  },
  
  clearMolecule: () => {
    set({
      currentMolecule: {
        atoms: [],
        bonds: [],
        formula: 'Empty',
        name: 'New Molecule'
      },
      selectedAtom: null
    })
  },
  
  updateFormula: () => {
    set(state => ({
      currentMolecule: {
        ...state.currentMolecule,
        formula: calculateMolecularFormula(state.currentMolecule.atoms)
      }
    }))
  }
}))

export default useMoleculeStore