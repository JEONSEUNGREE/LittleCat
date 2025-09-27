# Memory Wave - 메모리 웨이브

음파 패턴을 기억하고 재현하는 청각 기반 리듬 메모리 게임

## 특징

- 🎵 8개의 음계 패드로 다양한 멜로디 생성
- 🧠 레벨이 올라갈수록 더 긴 패턴 기억
- 🎯 콤보 시스템으로 연속 성공 보상
- 📱 모바일 우선 반응형 디자인
- 🌊 실시간 음파 시각화

## 기술 스택

- Vite + React 18 + TypeScript
- Tailwind CSS
- Zustand (상태 관리)
- Web Audio API (사운드 엔진)
- Lucide React (아이콘)

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 게임 방법

1. Start Game 버튼을 눌러 게임 시작
2. 화면에 표시되는 음파 패턴을 잘 듣기
3. 같은 순서로 사운드 패드를 눌러 패턴 재현
4. 정확하게 재현하면 다음 레벨로 진행
5. 실수하면 하트를 잃음 (총 3개)

## 생성 정보

- 생성 일시: 2025년 9월 27일 10:00:01
- 경로: /home/tory/cronjob/frontApp/LittleCat/memory-wave-20250927_100001/