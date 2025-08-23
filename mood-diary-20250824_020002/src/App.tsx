import React, { useState } from 'react'
import { MoodEntry } from './components/MoodEntry'
import { MoodHistory } from './components/MoodHistory'
import { MoodStats } from './components/MoodStats'
import { Navigation } from './components/Navigation'
import { Heart, Settings as SettingsIcon, User } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-2">
          <Heart className="text-primary-500" size={24} />
          <h1 className="text-xl font-bold text-gray-800">Mood Diary</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                안녕하세요! 👋
              </h2>
              <p className="text-gray-600">
                오늘 하루는 어떠셨나요?
              </p>
            </div>
            <MoodHistory />
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <MoodStats />
            <div className="mood-card p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                감정 패턴 분석
              </h3>
              <p className="text-sm text-gray-600">
                꾸준히 기록하면 감정 패턴을 발견할 수 있어요.
                매일 기록해서 나만의 감정 지도를 만들어보세요!
              </p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="mood-card p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="text-primary-500" size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">나의 프로필</h2>
                <p className="text-sm text-gray-600">감정 기록 마스터</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">가입일</span>
                <span className="text-gray-800 font-medium">2025년 8월 24일</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">총 기록 수</span>
                <span className="text-gray-800 font-medium">0개</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">목표</span>
                <span className="text-gray-800 font-medium">매일 감정 기록하기</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="mood-card p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                <SettingsIcon className="inline mr-2" size={20} />
                설정
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">알림 설정</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">다크 모드</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <button className="text-red-500 text-sm">데이터 초기화</button>
                </div>
              </div>
            </div>
            <div className="mood-card p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">정보</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>버전: 1.0.0</p>
                <p>개발: Mood Diary Team</p>
                <p>© 2025 All rights reserved</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <MoodEntry />
    </div>
  )
}

export default App