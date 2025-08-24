# Split Ease - 더치페이 계산기

간편한 그룹 정산을 위한 모바일 우선 웹 애플리케이션

## 기능

- 💰 **스마트한 금액 분할**: 균등 분할 및 커스텀 분할 지원
- 💵 **팁 계산기**: 자동 팁 계산 및 프리셋 비율
- 👥 **인원 관리**: 최대 20명까지 추가 가능
- ✅ **지불 추적**: 실시간 지불 상태 관리
- 📱 **모바일 최적화**: 반응형 디자인

## 기술 스택

- React 18 + TypeScript
- Vite (빌드 도구)
- Tailwind CSS (스타일링)
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
split-ease-20250825_000001/
├── src/
│   ├── components/       # React 컴포넌트
│   │   ├── BillInput.tsx     # 금액 입력
│   │   ├── TipCalculator.tsx # 팁 계산
│   │   ├── PeopleList.tsx    # 인원 관리
│   │   └── SplitSummary.tsx  # 정산 요약
│   ├── store/           # 상태 관리
│   │   └── useBillStore.ts
│   ├── App.tsx          # 메인 앱 컴포넌트
│   ├── main.tsx        # 진입점
│   └── index.css       # 글로벌 스타일
├── public/             # 정적 파일
└── package.json        # 프로젝트 설정
```

## 사용 방법

1. **금액 입력 탭**: 총 금액과 팁 비율을 입력
2. **인원 관리 탭**: 정산할 인원을 추가하고 관리
3. **정산 요약 탭**: 최종 정산 내역 확인

## 특징

- 실시간 계산 및 업데이트
- 직관적인 UI/UX
- 빠른 퀵 버튼 제공
- 지불 완료 상태 추적
- 진행률 시각화

---

© 2025 Split Ease - 스마트한 정산의 시작