# Mood Echo - 감정 공유 소셜 앱

## 개요
Mood Echo는 이모지와 색상으로 현재 감정을 표현하고, 비슷한 감정을 느끼는 사람들과 연결되는 혁신적인 소셜 앱입니다.

## 주요 기능
- 😊 **7가지 감정 선택**: Happy, Sad, Angry, Calm, Excited, Anxious, Love
- 🌈 **색상 기반 UI**: 각 감정마다 고유한 색상 테마
- 💬 **익명 감정 공유**: 메시지와 함께 감정 브로드캐스트
- ❤️ **에코 시스템**: 공감하는 감정에 에코(좋아요) 전송
- 🌓 **다크 모드**: 사용자 선호에 따른 테마 전환

## 기술 스택
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## 차별점
기존 앱들(습관 추적, 예산 관리, 게임 등)과 달리 순수한 감정 기반 소셜 연결에 초점을 맞춘 독창적인 컨셉

## 설치 및 실행
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
mood-echo-20250825_030001/
├── src/
│   ├── components/     # React 컴포넌트
│   ├── store/          # Zustand 상태 관리
│   ├── App.tsx         # 메인 앱 컴포넌트
│   └── main.tsx        # 엔트리 포인트
├── package.json
├── vite.config.js
└── tailwind.config.js
```

생성일: 2025-08-25 03:00:01