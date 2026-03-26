# Kalpie Frontend

> 북마크 기반 AI Q&A 노트북 서비스 — 웹 클라이언트

## 기술 스택

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logo=react&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

## 시작하기

### 사전 요구사항

- Node.js 20+
- pnpm

### 설치 및 실행

```bash
cd frontend
pnpm install
```

`.env.local` 파일을 생성하고 환경 변수를 설정합니다:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<Google OAuth Client ID>
```

```bash
pnpm dev    # 개발 서버 (http://localhost:3000)
pnpm build  # 프로덕션 빌드
pnpm start  # 프로덕션 서버
```

## 프로젝트 구조

```
src/
├── app/                        # Next.js App Router
│   ├── login/                  #   로그인
│   ├── signup/                 #   회원가입
│   ├── auth/callback/          #   Google OAuth 콜백
│   └── notebook/[id]/          #   노트북 상세
│
├── containers/                 # 페이지별 컨테이너
│   ├── landing/                #   랜딩 페이지
│   ├── home/                   #   홈
│   ├── notebooks/              #   노트북 목록 (CRUD, 검색)
│   └── notebook/               #   노트북 상세 (3-Panel 레이아웃)
│       ├── left/               #     소스 패널 (북마크, URL 추가)
│       ├── center/chat/        #     AI 채팅 (SSE 스트리밍)
│       ├── center/preview/     #     소스 프리뷰
│       ├── right/              #     에이전트 스텝
│       └── bookalpie/          #     익스텐션 연동
│
└── shared/                     # 공통 모듈
    ├── api/                    #   API 클라이언트 (auth, chat, notebook 등)
    ├── components/ui/          #   UI 컴포넌트 (Radix 기반)
    ├── hooks/                  #   커스텀 훅
    ├── store/                  #   전역 스토어
    ├── types/                  #   타입 정의
    └── utils/                  #   유틸리티
```

## 주요 기능

### 인증
- 이메일/비밀번호 로그인 및 회원가입 (React Hook Form + Zod 유효성 검증)
- Google OAuth 2.0 소셜 로그인
- JWT 기반 인증 상태 관리 (Access Token + Refresh Token 자동 갱신)
- AuthGuard를 통한 비인증 사용자 라우트 보호

### 노트북 관리
- 노트북 생성 / 이름 변경 / 삭제
- 노트북 고정(Pin) 기능으로 상단 고정
- 정렬 옵션 (최근 생성순, 생성일순, 이름순)
- 카드 그리드 레이아웃 + 배경 이미지

### 소스 관리 (Left Panel)
- URL 추가 시 자동 크롤링 + 실시간 상태 추적 (pending → success / failed)
- 계층형 디렉토리(폴더) 구조로 소스 정리
- 폴더/소스 이름 변경 및 삭제
- 소스 활성화/비활성화 토글 (개별 + 전체 일괄)
- 실시간 검색 (제목/URL 기반)
- 소스 요약 팝오버 (호버 시 크롤링된 요약 표시)
- 크롤링 진행 상태 SSE 실시간 업데이트

### Chrome 익스텐션 연동
- API 동기화 키 생성
- 클립보드 복사 + 만료 시간 표시
- 익스텐션에서 북마크 동기화 시 디렉토리 구조 자동 생성

### AI 채팅 (Center Panel — Chat Mode)
- 소스 기반 AI Q&A 대화 (SSE 스트리밍, 실시간 토큰 렌더링)
- AI 모델 선택 (GPT-4o-mini, GPT-5.4-mini, EXAONE)
- 응답 중 참조 소스 표시 (번호 버튼 → 팝오버로 제목/내용/URL 확인)
- 대화 중단(Abort) 기능
- 채팅 히스토리 유지 및 불러오기
- Enter 전송 / Shift+Enter 줄바꿈

### AI 리포트 워크플로우 (Center + Right Panel — Agent Mode)
- 4단계 구조화된 문서 생성 워크플로우:
  1. 요구사항 분석 → 2. 목차 구성 → 3. 초안 작성 → 4. 최종 문서
- 각 단계별 진행 상태 시각화 (진행중 / 완료 / 승인 대기)
- 단계별 산출물 마크다운 프리뷰
- 사용자 승인/수정 요청/리셋 흐름
- 워크플로우 상태 서버 동기화 + localStorage 영속화
- 최종 문서 마크다운 렌더링 + Raw 코드 보기 + 클립보드 복사

### UI/UX
- 다크/라이트 테마 전환
- 3-Panel 리사이즈 가능한 레이아웃
- 삭제/종료 등 위험 동작에 확인 다이얼로그
- 통합 ErrorAlert 에러 처리
- 로딩 스피너 및 상태 표시

## 담당

| 이름 | 역할 |
|------|------|
| 박내은 | 프론트엔드 + 백엔드 + 크롬 익스텐션 + RAG 개발 및 다수 |
| 최자슈아주원 | 프론트엔드 + 크롬 익스텐션 개발 |
