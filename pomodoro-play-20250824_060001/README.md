# Pomodoro Play 🎵

음악과 함께하는 스마트한 포모도로 타이머 앱

## 주요 기능

### ⏱️ 타이머 기능
- 25분 집중 / 5분 휴식 / 15분 긴 휴식 사이클
- 커스터마이징 가능한 시간 설정
- 시각적 진행 표시 (원형 프로그레스바)
- 세션 스킵 및 리셋 기능

### 🎵 음악 플레이어
- Lo-Fi 힙합, 자연의 소리, 클래식 프리셋
- 볼륨 조절 기능
- 집중 시간 동안 자동 재생

### 📊 통계 추적
- 오늘의 집중 시간
- 총 누적 집중 시간
- 현재 연속 세션 수
- 최고 기록 추적

### 🎨 UI/UX
- 다크모드 지원
- 모바일 최적화 반응형 디자인
- 부드러운 애니메이션
- 직관적인 제스처 인터페이스

## 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 프로젝트 구조

```
src/
├── components/       # UI 컴포넌트
│   ├── TimerDisplay.tsx
│   ├── StatsCard.tsx
│   ├── MusicPlayer.tsx
│   └── Settings.tsx
├── store/           # 상태 관리
│   └── usePomodoroStore.ts
├── App.tsx          # 메인 앱
├── main.tsx         # 엔트리 포인트
└── index.css        # 글로벌 스타일
```

## 생성 정보

- **생성일**: 2025-08-24 06:00:01
- **버전**: 1.0.0
- **카테고리**: 생산성 / 집중력 향상

---

*자동 생성된 모바일 앱 - Pomodoro Play*