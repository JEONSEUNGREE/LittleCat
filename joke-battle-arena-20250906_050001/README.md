# Joke Battle Arena - 실시간 농담 배틀 플랫폼

## 프로젝트 소개
Joke Battle Arena는 사용자들이 실시간으로 농담 배틀을 펼치고 투표로 승자를 결정하는 소셜 엔터테인먼트 플랫폼입니다.

## 주요 기능
- 🎭 실시간 1:1 농담 배틀
- 🗳️ 관객 투표 시스템  
- 🏆 랭킹 및 리더보드
- 👤 프로필 커스터마이징
- 🎯 일일 챌린지

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

## 디렉토리 구조
```
src/
├── components/       # React 컴포넌트
│   ├── HomePage.tsx
│   ├── BattleArena.tsx
│   ├── Leaderboard.tsx
│   └── PlayerProfile.tsx
├── store/           # 상태 관리
│   └── gameStore.ts
├── App.tsx          # 메인 앱 컴포넌트
├── main.tsx        # 엔트리 포인트
└── index.css       # 글로벌 스타일
```

## 게임 규칙
1. 각 라운드마다 30초 안에 농담 작성
2. 총 3라운드 진행
3. 관객 투표로 승자 결정
4. 승리 시 100포인트 획득

## 생성 정보
- 생성일: 2025-09-06 05:00:01
- 버전: 0.0.0
- 카테고리: 엔터테인먼트