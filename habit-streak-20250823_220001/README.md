# Habit Streak - 습관 트래커 앱

매일 습관을 체크하고 연속 기록을 시각화하는 모바일 웹 앱

## 기능

- ✅ 습관 추가/삭제
- 📊 스트릭(연속 기록) 추적
- 📅 캘린더 뷰로 습관 완료 현황 확인
- 📈 통계 대시보드
- 💾 로컬 스토리지 자동 저장
- 📱 모바일 최적화 반응형 디자인

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
├── components/      # React 컴포넌트
│   ├── Header.tsx
│   ├── HabitList.tsx
│   ├── HabitCard.tsx
│   ├── AddHabitModal.tsx
│   ├── CalendarView.tsx
│   └── StatsCard.tsx
├── store/          # 상태 관리
│   └── habitStore.ts
├── App.tsx         # 메인 앱
├── main.tsx        # 엔트리 포인트
└── index.css       # 전역 스타일
```

## 생성 정보

- **생성일**: 2025-08-23 22:00:01
- **생성자**: Claude Code Auto App Generator
- **버전**: 0.0.0