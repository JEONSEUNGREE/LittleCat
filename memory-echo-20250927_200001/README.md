# Memory Echo - 메모리 에코

사운드 기반 리듬 메모리 게임

## 기술 스택
- **Frontend**: Vite + React 18 + TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 게임 특징
- 8개의 고유한 음계 사용
- 20개의 도전적인 레벨
- 콤보 시스템 (3연속 정답 시 x2 보너스)
- 하이스코어 추적
- 반응형 디자인 (모바일 우선)

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
1. 음계 시퀀스를 주의 깊게 들으세요
2. 색깔 버튼을 눌러 시퀀스를 반복하세요
3. 각 레벨마다 음계가 하나씩 추가됩니다
4. 3개의 생명을 가지고 시작합니다
5. 20레벨을 모두 클리어하면 승리!

## 디렉토리 구조
```
src/
├── components/
│   ├── GameMenu.tsx    # 게임 메뉴 및 시작 화면
│   ├── GamePad.tsx     # 8개 음계 버튼 패드
│   └── ScoreBoard.tsx  # 점수 및 게임 상태 표시
├── store/
│   └── gameStore.ts    # Zustand 게임 상태 관리
├── App.tsx             # 메인 애플리케이션
└── main.tsx           # 진입점
```

## 생성 정보
- 생성일: 2025-09-27 20:00:01
- 앱 영문명: memory-echo-20250927_200001
- 카테고리: 게임 (사운드/리듬)