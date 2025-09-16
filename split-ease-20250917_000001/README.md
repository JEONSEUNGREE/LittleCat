# Split Ease - 더치페이 간편 계산기

## 프로젝트 정보
- **앱 이름**: Split Ease
- **영문명**: split-ease-20250917_000001
- **기능 요약**: 그룹 식사비를 실시간으로 균등/항목별 분할 계산
- **생성 경로**: /home/tory/cronjob/frontApp/LittleCat/split-ease-20250917_000001

## 주요 기능
1. **실시간 계산**: 금액 입력 시 즉시 분할 계산
2. **다양한 분할 방식**: 
   - 균등 분할 (모두 동일 금액)
   - 항목별 분할 (주문한 메뉴별로 계산)
3. **팁 & 세금 자동 계산**: 슬라이더로 쉽게 조절
4. **참여자 관리**: 추가/삭제 및 정산 완료 체크
5. **모바일 최적화**: 반응형 디자인으로 모든 기기 지원

## 기술 스택
- **Frontend**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 차별점
- **budget-pulse와 차별화**: 장기 예산 관리가 아닌 일회성 정산 특화
- **실시간 그룹 계산**: 여러 명이 함께 사용하는 사회적 상황 해결
- **직관적 UI**: 복잡한 계산을 단순하고 명확하게 표현