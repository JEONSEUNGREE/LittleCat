# Posture Mirror - 자세 거울

실시간 자세 분석과 교정을 위한 AI 기반 모바일 헬스 앱

## 주요 기능

- 📸 **실시간 자세 분석**: 카메라를 통한 실시간 자세 모니터링
- 📊 **상세한 분석 리포트**: 목, 어깨, 척추 각 부위별 점수 제공
- 💪 **맞춤형 운동 가이드**: 개인 자세에 맞는 운동 추천
- 📈 **진행 상황 추적**: 일간/주간/월간 개선도 모니터링
- 🏆 **업적 시스템**: 동기부여를 위한 목표 달성 시스템

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
│   ├── PostureCamera.tsx    # 실시간 카메라 분석
│   ├── PostureAnalysis.tsx  # 자세 분석 리포트
│   ├── ExerciseGuide.tsx    # 운동 가이드
│   └── ProgressTracker.tsx  # 진행 상황 추적
├── store/           # 상태 관리
│   └── postureStore.ts      # Zustand 스토어
├── App.tsx          # 메인 앱 컴포넌트
├── main.tsx         # 앱 진입점
└── index.css        # 전역 스타일
```

## 특징

- **모바일 최적화**: 반응형 디자인으로 모든 기기에서 완벽 작동
- **실시간 피드백**: 자세 점수를 실시간으로 확인
- **개인화된 추천**: AI 기반 맞춤형 운동 프로그램
- **진도 추적**: 시각적 차트로 개선도 확인

## 라이선스

Private - Internal Use Only

---

생성일: 2025-10-02 20:00:01