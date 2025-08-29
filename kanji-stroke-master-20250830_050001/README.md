# Kanji Stroke Master - 한자 필순 마스터

## 프로젝트 정보
- **앱 이름**: Kanji Stroke Master (한자 필순 마스터)
- **생성 날짜**: 2025-08-30_050001
- **카테고리**: 교육 (Educational)
- **기능 요약**: 한자 필순 애니메이션 학습 앱

## 주요 특징
- 📚 한자 필순 애니메이션 표시
- ✏️ 터치/마우스로 직접 따라 쓰기
- 🎯 레벨별 학습 시스템 (기초/초급/중급)
- 🏆 진행도 추적 및 점수 시스템
- 📱 모바일 최적화 반응형 디자인

## 기술 스택
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## 설치 및 실행

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

## 컴포넌트 구조
- `Header`: 앱 헤더 및 점수 표시
- `KanjiCanvas`: 한자 그리기 캔버스
- `LevelSelector`: 레벨 선택 인터페이스
- `ProgressBar`: 학습 진행도 표시
- `ControlPanel`: 애니메이션 및 제어 버튼

## 학습 콘텐츠
10개의 기본 한자 포함:
- **레벨 1**: 一(하나), 二(둘), 三(셋), 人(사람)
- **레벨 2**: 大(크다), 小(작다), 日(해/날)
- **레벨 3**: 月(달), 水(물), 火(불)

## 차별화 포인트
기존 앱들(예산 관리, 암호화폐, 게임 등)과 완전히 다른 교육 분야에 특화된 한자 학습 앱으로, 필순 애니메이션과 직접 쓰기 연습 기능을 통해 효과적인 한자 학습 경험을 제공합니다.