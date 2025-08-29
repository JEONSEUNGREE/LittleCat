# Formula Master - 공식 마스터

수학과 과학 공식을 시각적으로 학습하는 인터랙티브 교육 앱

## 주요 기능

- **시각적 공식 학습**: 수학, 물리, 화학 공식을 시각적으로 표현
- **카테고리별 필터링**: 과목별로 공식을 쉽게 찾아볼 수 있음
- **퀴즈 모드**: 학습한 공식을 테스트하고 점수를 확인
- **난이도 표시**: 쉬움, 보통, 어려움으로 구분된 공식
- **변수 설명**: 각 공식의 변수와 단위를 상세히 설명
- **반응형 디자인**: 모바일 최적화된 인터페이스

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
├── components/       # React 컴포넌트
│   ├── Header.tsx   # 헤더 및 네비게이션
│   ├── CategoryFilter.tsx # 카테고리 필터
│   ├── FormulaCard.tsx   # 공식 카드
│   └── FormulaList.tsx   # 공식 목록
├── store/           # 상태 관리
│   └── useFormulaStore.ts
├── App.tsx          # 메인 앱 컴포넌트
├── main.tsx         # 앱 진입점
└── index.css        # 글로벌 스타일

## 특징

- 모바일 우선 반응형 디자인
- 직관적인 UI/UX
- 퀴즈를 통한 학습 효과 증대
- 다양한 과목의 핵심 공식 포함

## 라이센스

MIT License