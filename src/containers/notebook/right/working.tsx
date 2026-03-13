import AgentStep from '@/containers/notebook/right/components/agent-step'
import * as S from './working.style'

function WorkingSection() {
  return (
    <section className={S.section()}>
      <AgentStep title="요구사항을 분석합니다." content="" status="completed" />
      <AgentStep title="구조화 작업을 진행합니다." content="" status="completed" />
      <AgentStep title="초안을 작성합니다." content={mookData} status="working" />
      <AgentStep title="최종 문서를 작성합니다." content="" status="pending" />
    </section>
  )
}

export default WorkingSection

export const mookData = `# SK네트웍스 Family AI 과정 21기

| 팀원 구성 |
|-----------------|
| 박내은 |
| 우재현 |
| 최자슈아주원 |
| 이명준 |

---
## 1. 프로젝트 주제

"사용자의 브라우저 북마크 및 웹 URL을 지식 베이스로 활용하는 오픈소스 RAG(검색 증강 생성) 서비스"  

단순한 링크 저장을 넘어, 저장된 웹 콘텐츠의 내용을 분석하고  
사용자의 질문에 근거(Source)를 제시하며 답변하는 지능형 도우미 구축.

---

## 2. 문제 정의

- **정보의 파편화**  
  유익한 아티클을 북마크에 저장해도 나중에 다시 찾아 읽거나 내용을 요약하기 어려움.

- **기존 서비스의 폐쇄성**  
  NotebookLM 등은 훌륭하지만 데이터 프라이버시나 모델 선택의 자유도가 낮음.

- **비용 부담**  
  유료 LLM API를 사용하여 개인 지식 베이스를 구축하기에는 지속적인 비용 발생 우려.

- **해결책**  
  무료/오픈소스 모델(Llama 3, Mistral 등)을 활용하여 누구나 무료로 개인 서버나 로컬에서 운영할 수 있는 환경 제공.

---

## 3. 시장조사 및 BM

### 3.1 시장 조사

- **타겟**  
  연구자, 개발자, 대학생 등 방대한 웹 정보를 수집하지만 관리에 어려움을 느끼는 사용자.

- **유사 서비스**  
  Google NotebookLM, Perplexity, Coral(Cohere).

- **차별점**  
  '북마크'라는 기존 습관을 데이터 소스로 활용하며, 완전한 오픈소스 및 로컬 실행 옵션 제공.

---

### 3.2 BM (Business Model)

- **Open Source Strategy**  
  핵심 엔진은 Github에 공개하여 커뮤니티 기여 유도.

- **B2B 확장**  
  기업 내 내부 위키/문서 링크를 기반으로 한 사내 지식 베이스 솔루션으로 커스텀 제공.

- **Managed Service**  
  인프라 관리가 어려운 사용자를 위해 소액의 구독형 호스팅 서비스(SaaS) 제공 가능.

---

## 4. 시스템 구성 기획

- **Frontend**  
  Next.js (사용자 인터페이스 및 북마크 업로드), Chrome Extension

- **Backend**  
  FastAPI (Python 기반의 고속 API 서버)

- **Crawler**  
  FireCrawl (URL 콘텐츠 추출), DuckDuckGo (관련 내용 재검색)

- **Database**  
  PostgreSQL + pgvector (RDB + Vector DB)

- **LLM agent**  
  LangGraph, LLM 모델

---

## 5. 모델링 계획 (무료/오픈소스 중심)

- **LLM (추론)**  
  HuggingFace의 무료 모델 (예정)

- **Embedding (벡터화)**  
  HuggingFace의 무료 모델 (예정)

- **Framework**  
  LangGraph 또는 LlamaIndex를 사용하여 RAG 파이프라인 구축.

---

## 6. 사용 데이터

- **사용자 제출 북마크**  
  브라우저에 저장된 북마크 정보 수집.

- **웹 스크래핑 데이터**  
  수집된 URL의 텍스트 본문, 메타데이터(제목, 설명).

- **사용자 쿼리**  
  지식 베이스에 질문하는 자연어 텍스트.

---

## 7. 역할 분담 (R&R)

| 역할 | 주요 업무 |
|------|-----------|
| Project Manager | 요구사항 구체화, 일정 관리, 오픈소스 라이선스 검토 |
| Frontend Developer | Next.js 기반 UI 구현, 북마크 수집용 확장프로그램 구현, 챗 인터페이스 구축, 수집된 자료 기반 컨텐츠 제작 |
| Backend Developer | FastAPI 서버 구축, 웹 크롤링 로직 및 데이터 전처리 파이프라인 설계 |
| AI/ML Engineer | RAG 파이프라인 설계, 임베딩 모델 최적화, 프롬프트 엔지니어링, LangGraph 에이전트 로직 설계 |
| DevOps | Docker를 이용한 배포 환경 구축, 서버 운영 관리 |

`
