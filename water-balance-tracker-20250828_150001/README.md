# Water Balance Tracker 💧

개인 맞춤형 수분 섭취 관리 앱

## 📱 주요 기능

- **맞춤형 수분 목표**: 체중과 활동량 기반 일일 권장량 자동 계산
- **실시간 트래킹**: 다양한 음료 종류별 수분 섭취 기록
- **시각적 피드백**: 실시간 애니메이션과 진행률 표시
- **기록 관리**: 오늘의 수분 섭취 내역 확인 및 관리
- **통계 분석**: 수분 상태 분석 및 건강 팁 제공
- **프로필 설정**: 개인 정보 기반 맞춤 설정

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📁 프로젝트 구조

```
src/
├── components/       # UI 컴포넌트
│   ├── ProfileSetup.tsx
│   ├── WaterTracker.tsx
│   ├── History.tsx
│   ├── Statistics.tsx
│   ├── Settings.tsx
│   └── BottomNav.tsx
├── store/           # 상태 관리
│   └── useWaterStore.ts
├── App.tsx          # 메인 앱 컴포넌트
├── main.tsx         # 엔트리 포인트
└── index.css        # 글로벌 스타일
```

## 🎨 주요 화면

- **프로필 설정**: 이름, 체중, 활동량 입력
- **홈**: 수분 섭취 추가 및 진행률 확인
- **기록**: 오늘의 섭취 내역 관리
- **통계**: 수분 상태 분석 및 팁
- **설정**: 프로필 수정 및 알림 설정

## 📄 라이선스

© 2025 Water Balance Tracker. All rights reserved.