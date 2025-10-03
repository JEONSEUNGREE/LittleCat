import { useState } from 'react'
import { Header } from './components/Header'
import { DiaryEntry } from './components/DiaryEntry'
import { QRDisplay } from './components/QRDisplay'
import { EntryList } from './components/EntryList'
import { useDiaryStore } from './store/diaryStore'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'write' | 'list' | 'scan'>('write')
  const [selectedEntryQR, setSelectedEntryQR] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 max-w-lg">
        <Header />
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between mb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('write')}
              className={`pb-2 px-4 transition-colors ${
                activeTab === 'write'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              작성하기
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`pb-2 px-4 transition-colors ${
                activeTab === 'list'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              일기 목록
            </button>
            <button
              onClick={() => setActiveTab('scan')}
              className={`pb-2 px-4 transition-colors ${
                activeTab === 'scan'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              QR 스캔
            </button>
          </div>

          {activeTab === 'write' && (
            <DiaryEntry onGenerateQR={setSelectedEntryQR} />
          )}
          
          {activeTab === 'list' && (
            <EntryList onSelectEntry={setSelectedEntryQR} />
          )}
          
          {activeTab === 'scan' && (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                QR 코드를 스캔하여 저장된 일기를 확인하세요
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="qr-upload"
                onChange={(e) => {
                  // QR 스캔 로직 구현
                  console.log('QR scan feature to be implemented')
                }}
              />
              <label
                htmlFor="qr-upload"
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
              >
                QR 코드 업로드
              </label>
            </div>
          )}
        </div>

        {selectedEntryQR && (
          <QRDisplay 
            qrData={selectedEntryQR} 
            onClose={() => setSelectedEntryQR(null)} 
          />
        )}
      </div>
    </div>
  )
}

export default App