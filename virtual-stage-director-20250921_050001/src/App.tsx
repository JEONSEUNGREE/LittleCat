import { Header } from './components/Header'
import { Stage } from './components/Stage'
import { ToolPanel } from './components/ToolPanel'

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <Stage />
        <ToolPanel />
      </div>
    </div>
  )
}

export default App