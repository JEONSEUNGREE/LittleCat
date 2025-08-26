# Mood Mirror - 감정 공유 소셜 앱

감정을 색상과 패턴으로 표현하고 비슷한 감정 상태의 사람들과 연결되는 소셜 네트워크 앱입니다.

## 주요 기능

- 🎨 **감정 시각화**: 7가지 기분을 색상과 패턴으로 표현
- 🔗 **감정 기반 연결**: 비슷한 감정 상태의 사용자와 자동 매칭
- 💬 **익명 메시지**: 감정 지원 메시지를 익명으로 교환
- 📊 **기분 추적**: 시간에 따른 감정 변화 패턴 분석
- 📱 **반응형 디자인**: 모바일 우선 디자인

## 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 디렉토리 구조

```
src/
├── components/       # React 컴포넌트
│   ├── MoodSelector.tsx
│   ├── MoodVisualization.tsx
│   ├── MessageFeed.tsx
│   └── MoodHistory.tsx
├── store/           # 상태 관리
│   └── useMoodStore.ts
├── types/           # TypeScript 타입 정의
│   └── index.ts
└── App.tsx          # 메인 앱 컴포넌트
```

## 생성 정보

- **앱 이름**: Mood Mirror
- **생성 시간**: 2025-08-26 15:00:01
- **카테고리**: 소셜
- **차별점**: 감정 기반 소셜 연결 (기존 앱들은 개인 활동 중심)