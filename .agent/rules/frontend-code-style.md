---
trigger: always_on
---

# 폴더구조

next의 app router를 사용합니다
src

- containers: 페이지 단위로 폴더를 생성하고, 페이지 안에 있는 섹션단위로 파일을 생성
  - index.container.tsx : 페이지마다 하나씩 맵핑된 최상위 클라이언트 컴포넌트
  - ui: 섹션의 하위, 섹션단위로 폴더를 생성하고 컴포넌트 단위로 파일을 생성
  - utils: 해당 container에 필요한 함수, 타입, 클래스 등등 컴포넌트가 아닌 것들
- shared: 2개의 페이지 이상에서 사용되는 모든 로직, 컴포넌트 등등
  - style: 글로벌 스타일 관련설정, tailwind, theme등등
    - utils: 스타일 관련 tailwind 혹은 cva 유틸 등등
  - components: 여러 군데에서 재사용되는 컴포넌트 재사용이 최우선순위로 제작되어야 함.
    - ui: shadcn의 atomic한 컴포넌트가 포함되어있음 index.ts에서 export함.
  - utils: axios, 2 페이지 이상에서 사용되는 공용 유틸함수
    $정의되지 않는 폴더는 **FSD**를 기준으로 생성하고 관리합니다$

# 코드 컨벤션

컴포넌트는 function으로 제작하며, 그 외 함수는 Arrow함수로 제작하세요.
불필요한 주석은 추가하지 않습니다.
단일 책임을 최대한 반영하세요. 많은 내용을 하나에 몰아 담지 마세요.
shared에 있는 컴포넌트, 유틸함수 등은 모두 2군데 이상에서 사용되어야 합니다.
shared에 있는 유틸함수, 컴포넌트는 재사용을 최우선을 고려합니다.
하나의 컴포넌트가 너무 많은 일을 하게 된다면 파일을 분할하여 컴포넌트를 분할하세요.
any타입은 사용하지 마세요.
타입을 억지로 맞추기위해 주석으로 숨기지 마세요.
타입을 반드시 맞춰서 생성하세요.
components, ui는 index.ts파일을 생성하여 import시 결합도를 낮춰 사용합니다.

# 사용기술

shadcn
tailwind
cva
next.js
typescript
axios
zustand
reactjs
$명시되지 않은 기술이 필요한 경우는 확인이 필요하며, 가장 사용자가 많고 안정적인 기술을 선택합니다.$
