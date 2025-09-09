import { useState } from 'react';
import { useStore } from './store/useStore';
import DeckList from './components/DeckList';
import StudySession from './components/StudySession';
import CreateDeck from './components/CreateDeck';

type ViewMode = 'list' | 'study' | 'create' | 'edit';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingDeckId, setEditingDeckId] = useState<string | undefined>();
  const { selectDeck } = useStore();

  const handleSelectDeck = (deckId: string) => {
    selectDeck(deckId);
    setViewMode('study');
  };

  const handleCreateDeck = () => {
    setEditingDeckId(undefined);
    setViewMode('create');
  };

  const handleEditDeck = (deckId: string) => {
    selectDeck(deckId);
    setEditingDeckId(deckId);
    setViewMode('edit');
  };

  const handleBack = () => {
    setViewMode('list');
    setEditingDeckId(undefined);
  };

  return (
    <>
      {viewMode === 'list' && (
        <DeckList 
          onSelectDeck={handleSelectDeck}
          onCreateDeck={handleCreateDeck}
          onEditDeck={handleEditDeck}
        />
      )}
      
      {viewMode === 'study' && (
        <StudySession onBack={handleBack} />
      )}
      
      {(viewMode === 'create' || viewMode === 'edit') && (
        <CreateDeck 
          onBack={handleBack}
          editDeckId={editingDeckId}
        />
      )}
    </>
  );
}

export default App;