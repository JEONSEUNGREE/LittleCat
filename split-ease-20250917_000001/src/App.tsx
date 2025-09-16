import Header from './components/Header'
import BillInput from './components/BillInput'
import PeopleManager from './components/PeopleManager'
import SplitMethod from './components/SplitMethod'
import ItemManager from './components/ItemManager'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="max-w-4xl mx-auto p-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <BillInput />
            <SplitMethod />
            <ItemManager />
          </div>
          
          <div className="lg:sticky lg:top-4 h-fit">
            <PeopleManager />
          </div>
        </div>
      </main>
      
      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>Split Ease © 2025 - 모든 계산을 간편하게</p>
        <p className="mt-1">더치페이가 쉬워집니다 💰</p>
      </footer>
    </div>
  )
}

export default App