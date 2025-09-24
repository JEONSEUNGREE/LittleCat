# Posture Mirror - 자세 거울

## 앱 정보
- **선정된 앱**: 자세 거울 (Posture Mirror)
- **영문명**: posture-mirror
- **기능 요약**: 실시간 자세 분석 및 교정 가이드 제공
- **생성 경로**: /home/tory/cronjob/frontApp/LittleCat/posture-mirror-20250924_150001
- **테스트 결과**: 통과

## 차별화 포인트
기존 앱들이 호흡(breath-flow), 예산(budget-pulse), 음악(beat-pattern) 등에 집중한 반면, 이 앱은 **자세 교정**이라는 완전히 새로운 건강 영역을 다룹니다.

## 주요 기능
1. **실시간 자세 모니터링**: AI 기반 자세 분석
2. **점수 시스템**: 목, 어깨, 허리 자세를 종합한 점수 제공  
3. **일일 목표 관리**: 개인 맞춤형 목표 설정
4. **주간 진행 상황**: 7일간 자세 개선 추적
5. **다크 모드**: 눈 보호를 위한 다크 테마 지원

## 기술 스택
- **Frontend**: Vite + React 18 + TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS + CSS Modules  
- **Icons**: Lucide React
- **Design**: Mobile-first 반응형 디자인

## 컴포넌트 구조
```
src/
├── App.tsx                 # 메인 앱 컴포넌트
├── components/
│   ├── Header.tsx          # 상단 헤더 및 네비게이션
│   ├── PostureMonitor.tsx  # 자세 모니터링 화면
│   ├── DailyStats.tsx      # 일일 통계 대시보드
│   └── Settings.tsx        # 설정 모달
├── store/
│   └── usePostureStore.ts  # Zustand 상태 관리
├── index.css              # 글로벌 스타일
└── main.tsx               # 앱 진입점
```

## UI/UX 특징
- 그라디언트 배경과 글래스모피즘 효과
- 실시간 애니메이션으로 사용자 피드백
- 직관적인 점수 시각화
- 모바일 최적화된 터치 인터페이스
- 다크/라이트 테마 자동 전환

## 실행 방법
```bash
cd /home/tory/cronjob/frontApp/LittleCat/posture-mirror-20250924_150001
npm install
npm run dev
```

## 빌드 상태
✅ 모든 파일 생성 완료
✅ TypeScript 설정 완료
✅ Tailwind CSS 설정 완료
✅ ESLint 설정 완료
✅ 컴포넌트 구조 완성

---
생성일: 2025-09-24 15:00:01
개발자: LittleCat