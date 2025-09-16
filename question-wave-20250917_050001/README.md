# Question Wave - 질문으로 연결되는 소셜 플랫폼

매일 새로운 질문을 받고 친구들과 답변을 공유하는 소셜 Q&A 플랫폼입니다.

## 주요 기능

- 📝 **매일 새로운 질문**: 매일 다른 주제의 흥미로운 질문 제공
- 🎭 **익명/실명 선택**: 답변 시 익명 또는 실명 선택 가능
- 💬 **실시간 답변 공유**: 다른 사용자들의 답변 실시간 확인
- ❤️ **좋아요 기능**: 마음에 드는 답변에 좋아요 표시
- 📱 **모바일 최적화**: 모든 디바이스에서 완벽한 반응형 디자인

## 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 디렉토리 구조

```
src/
├── components/       # React 컴포넌트
│   ├── Header.tsx
│   ├── QuestionCard.tsx
│   ├── AnswerInput.tsx
│   ├── AnswerList.tsx
│   └── FloatingButton.tsx
├── store/           # 상태 관리
│   └── questionStore.ts
├── App.tsx          # 메인 앱 컴포넌트
├── App.css         # 앱 스타일
└── main.tsx        # 엔트리 포인트
```

## 라이선스

MIT