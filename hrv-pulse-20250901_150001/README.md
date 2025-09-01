# HRV Pulse - 심박 변이도 트래커

심박 변이도(HRV)를 측정하고 스트레스 수준을 모니터링하는 건강 관리 앱

## 주요 기능

- **실시간 HRV 측정**: 30초 간단 측정으로 현재 HRV 확인
- **스트레스 수준 분석**: HRV 데이터 기반 스트레스 레벨 표시
- **24시간 추이 차트**: 시각적 그래프로 HRV 변화 추적
- **측정 기록 관리**: 과거 측정 데이터 저장 및 조회
- **건강 인사이트**: 개인화된 건강 권장사항 제공

## 기술 스택

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Zustand (상태 관리)
- Lucide React (아이콘)

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
├── components/
│   ├── HRVMeasurement.tsx  # HRV 측정 컴포넌트
│   ├── HRVChart.tsx        # 차트 시각화
│   ├── StressIndicator.tsx # 스트레스 지표
│   └── HistoryView.tsx     # 측정 기록
├── store/
│   └── hrvStore.ts         # Zustand 상태 관리
├── App.tsx                 # 메인 앱 컴포넌트
└── main.tsx               # 엔트리 포인트
```

## 생성 정보

- 생성일: 2025-09-01 15:00:01
- 카테고리: 건강
- 차별점: 심박 변이도 전문 측정 및 스트레스 관리