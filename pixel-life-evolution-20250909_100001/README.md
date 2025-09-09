# Pixel Life Evolution - 픽셀 생명체 진화 게임

## 프로젝트 정보
- **앱 이름**: Pixel Life Evolution
- **생성 시간**: 2025-09-09 10:00:01
- **카테고리**: 게임 (진화 시뮬레이션)
- **기능 요약**: 픽셀 생명체 진화 클리커 게임

## 주요 기능
- 클릭으로 DNA 수집
- 생명체 진화 시스템
- 자동 진화 모드
- 다중 생명체 관리
- 진화 단계별 픽셀 아트 변화
- 실시간 자원 관리

## 기술 스택
- Vite + React 18 + TypeScript
- Tailwind CSS
- Zustand (상태 관리)
- Lucide React (아이콘)

## 설치 및 실행
```bash
npm install
npm run dev
```

## 빌드
```bash
npm run build
```

## 게임 플레이
1. "Collect DNA" 버튼을 클릭하여 DNA 수집
2. 생명체를 선택하고 먹이 주기로 경험치 획득
3. 충분한 DNA가 모이면 생명체 진화
4. 새로운 생명체 구매로 생태계 확장
5. 자동 진화 모드로 자동 진행 가능

## 파일 구조
```
src/
├── App.tsx                 # 메인 앱 컴포넌트
├── components/
│   ├── CreatureDisplay.tsx # 생명체 표시 컴포넌트
│   ├── ResourcePanel.tsx   # 자원 패널
│   └── ControlPanel.tsx    # 컨트롤 패널
├── store/
│   └── gameStore.ts        # Zustand 게임 상태 관리
├── index.css              # 글로벌 스타일
└── main.tsx               # 앱 진입점
```