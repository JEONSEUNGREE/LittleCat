# 시간 역행 퍼즐 (Time Reversal Puzzle)

## 앱 정보
- **앱명**: 시간 역행 퍼즐
- **영문명**: time-reversal-puzzle
- **생성일**: 2025-10-01 05:00:01
- **카테고리**: 게임 (퍼즐)
- **타겟**: 모바일 우선 반응형 웹앱

## 주요 특징
- **혁신적 게임플레이**: 시간을 거꾸로 되돌려 원인을 찾는 역발상 퍼즐
- **시간 조작 메커니즘**: 타임라인 슬라이더로 시간을 자유롭게 조작
- **연쇄 반응 시스템**: 셀 상호작용으로 복잡한 패턴 생성
- **프로그레시브 난이도**: 5개 레벨로 점진적 난이도 상승
- **모바일 최적화**: 터치 친화적 UI와 반응형 디자인

## 기술 스택
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
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

# 빌드 프리뷰
npm run preview
```

## 프로젝트 구조
```
time-reversal-puzzle/
├── src/
│   ├── components/
│   │   ├── GameBoard.tsx      # 메인 게임 보드
│   │   ├── LevelSelector.tsx  # 레벨 선택 화면
│   │   └── Settings.tsx       # 설정 화면
│   ├── store/
│   │   └── gameStore.ts      # Zustand 상태 관리
│   ├── App.tsx               # 메인 앱 컴포넌트
│   ├── main.tsx              # 엔트리 포인트
│   └── index.css             # 전역 스타일
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## 게임 방법
1. 레벨을 선택하여 게임 시작
2. 8x8 그리드의 셀을 터치하여 상태 변경
3. 값이 3인 셀은 인접 셀에 연쇄 반응 발생
4. 모든 셀을 활성화하면 레벨 클리어
5. 시간 조작 기능으로 이전 상태로 되돌리기 가능

## 차별화 포인트
- **기존 앱과 완전히 다른 컨셉**: 시간 역행이라는 독특한 메커니즘
- **직관적인 UI/UX**: 미니멀한 디자인과 시각적 피드백
- **프로그레시브 웹앱**: 모바일과 데스크톱 모두 지원

## 라이선스
MIT

## 개발자
LittleCat Team - 2025