import React from 'react'
import { Header } from './components/Header'
import { QuestionInput } from './components/QuestionInput'
import { FortuneCookie } from './components/FortuneCookie'
import { FortuneDisplay } from './components/FortuneDisplay'
import { FortuneHistory } from './components/FortuneHistory'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Header />
        <QuestionInput />
        <FortuneCookie />
        <FortuneDisplay />
      </div>
      <FortuneHistory />
    </div>
  )
}

export default App