
import Header from './components/Header';
import ElementGrid from './components/ElementGrid';
import CombinationArea from './components/CombinationArea';
import DiscoveryList from './components/DiscoveryList';
import { useGameStore } from './store/gameStore';

function App() {
  const {
    elements,
    recipes,
    selectedElements,
    score,
    discoveredCount,
    hint,
    selectElement,
    clearSelection,
    tryRecipe,
    getHint,
    resetGame
  } = useGameStore();

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header 
          score={score}
          discoveredCount={discoveredCount}
          totalRecipes={recipes.length}
          onReset={resetGame}
          onHint={getHint}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CombinationArea
              selectedElements={selectedElements}
              onCombine={tryRecipe}
              onClear={clearSelection}
              hint={hint}
            />
            
            <ElementGrid
              elements={elements}
              selectedElements={selectedElements}
              onElementClick={selectElement}
            />
          </div>
          
          <div className="lg:col-span-1">
            <DiscoveryList recipes={recipes} />
          </div>
        </div>
        
        <footer className="mt-8 text-center text-white/50 text-sm">
          <p>Combine elements to discover new ones! Start with the four basic elements.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;