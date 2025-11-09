import Header from './components/Header'
import TransactionForm from './components/TransactionForm'
import EmotionChart from './components/EmotionChart'
import TransactionList from './components/TransactionList'

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <TransactionForm />
            <EmotionChart />
          </div>
          <div>
            <TransactionList />
          </div>
        </div>
      </main>

      <footer className="text-center text-white/60 py-6 mt-8">
        <p className="text-sm">
          감정과 소비 패턴을 분석하여 더 나은 재정 습관을 만들어보세요
        </p>
      </footer>
    </div>
  )
}
