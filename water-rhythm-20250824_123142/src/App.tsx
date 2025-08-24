import WaterTracker from './components/WaterTracker'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">💧 Water Rhythm</h1>
          <p className="text-blue-100 text-lg">규칙적인 수분 섭취를 도와드립니다</p>
        </div>
        
        <WaterTracker />
        
        <div className="text-center mt-6 text-blue-100 text-sm">
          <p>하루 권장량: 2000ml</p>
          <p>규칙적인 수분 섭취로 건강한 하루를 시작하세요!</p>
        </div>
      </div>
    </div>
  )
}

export default App