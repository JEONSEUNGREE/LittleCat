# Habit Buddy - 함께하는 습관 형성 앱

소셜 기능을 통해 친구들과 함께 습관을 만들어가는 모바일 웹 애플리케이션

## 주요 기능

- 📱 **개인 습관 관리**: 일일 목표 설정 및 추적
- 👥 **소셜 챌린지**: 친구들과 함께 21일 습관 챌린지
- 📊 **진행 상황 시각화**: 주간/월간 통계 및 차트
- 🏆 **보상 시스템**: 연속 달성 스트릭 및 배지
- 💬 **친구 상호작용**: 응원 메시지 및 진행상황 공유

## 기술 스택

- **Frontend**: React 18, TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## 시작하기

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
│   ├── HabitList.tsx
│   ├── ChallengeCard.tsx
│   ├── AddHabitModal.tsx
│   ├── ProgressChart.tsx
│   ├── FriendsList.tsx
│   └── Navigation.tsx
├── store/           # Zustand 상태 관리
│   └── habitStore.ts
├── App.tsx          # 메인 앱 컴포넌트
├── main.tsx         # 엔트리 포인트
└── index.css        # 글로벌 스타일
```

## 기존 앱과의 차별점

기존 앱들이 개인용 도구나 엔터테인먼트 중심인 반면, Habit Buddy는:
- **소셜 상호작용**을 통한 동기부여
- **친구들과의 챌린지** 시스템
- **실시간 진행상황 공유**로 책임감 강화
- **커뮤니티 기반** 습관 형성 지원

## 생성 정보

- 생성일: 2025-09-15_000001
- 카테고리: 소셜
- 타겟: 습관 형성을 원하는 모든 연령층