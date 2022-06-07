---
title: "Next.Js를 왜 써야할까 "
category: "React"
date: "2022-04-24 17:34:00 +09:00"
desc: "Next.Js와 CRA의 차이"
thumbnail: "./images/react/react_logo.jpg"
alt: "react"
---

![next](https://user-images.githubusercontent.com/85836879/172306985-7e18e122-77a0-4944-8693-4c9daddc5abb.png)

---

### NextJs는 왜 사용할까?

NextJs는 React로 만드는 SSR(Server Side Rendering) 프레임워크 입니다.

( Create React App과는 다른 Create Next App 명령어를 사용합니다.)

    npx create-next-app@latest --typescript

클라이언트 사이드 렌더링이 특징인 SPA를 서버 사이드 렌더링을 함으로 다음과 같은 이점이 있습니다.

1\. 클라이언트 사이드 렌더링의 경우에는 모든 javascript 코드를 로드하고 난 이후에 사용자는 웹을 보게됩니다.

모든 javascript 코드를 읽을 때 까지 사용자는 많은 시간을 대기해야합니다.

2\. SEO(Search Engine Optimization) 문제 해결

SEO는 검색 엔진 최적화를 말합니다.

2-1. 검색 엔진을 최적화해야하는 이유

검색을 통해 사용자의 유입을 증가시켜야하는 필요가 있는 어떠한 웹사이트를 만들었을 때

각 브라우저의 검색엔진은 Javascript를 해석하기보다는 HTML에서 크롤링을하게 됩니다.

CSR 방식은 클라이언트 사이드에서 렌더링 되기 이전에는 텅 비어있으므로 크롤링을 하지못해 검색엔진에 노출이 어려운 것입니다.

비어있는 CSR의 마크업

![csr](https://user-images.githubusercontent.com/85836879/172306983-15c2b2b0-97bf-4a6c-b6a2-b546259bbc13.png)

서버를 통해 렌더링되는 SSR의 마크업

![ssr](https://user-images.githubusercontent.com/85836879/172306979-975320bb-ab8d-478d-bfaf-8f9cb4fd1844.png)

첫 번째 문제는 서버에서 자바스크립트를 로딩함으로 사용자 입장에서는 자바스크립트를 로딩하는 시간이 줄어들게 되는 것입니다.

두 번째 문제는 서버 사이드에서 HTML, CSS, 자바스크립트를 직접 만들어 검색엔진 크롤링에 걸리게 하는 것입니다.

( 또한 HTML의 meta 태그를 자유롭게 설정하여 SEO를 용이하게 할 수 있습니다 )

이 두가지를 해결하는 것이 NextJs의 서버렌더링입니다.

---

### NextJs가 제공하는 주요 기능

#### automatic routing

NextJs가 제공하는 기본 폴더 중 pages폴더에 있는 파일은 해당 파일 이름으로 라우팅합니다. 

( index.tsx = "/", about.tsx = "/about" )

기본 폴더 중 public 폴더도 동일하게 기능하지만 모든 사용자가 접근할 수 있는 페이지이므로 사용을 지양합니다.

#### single file components

style js를 사용함으로 컴포넌트 내부에 해당 컴포넌트만 스코프를 가지는 css를 만들 수 있습니다.

VueJs의 style scoped와 같습니다.

하지만 styled-component, metarial-ui와 같은 css 라이브러리를 사용할 경우 중첩 사용이 불가능합니다.

#### server landing

서버 사이드 렌더링을 합니다.

클라이언트 사이드 렌더링과는 다르게 서버에서 렌더링 한 페이지는 페이지 소스 보기를 클릭하면 내부에 소스가 있습니다.

#### code splitting

dynamic import를 이용하여 코드 스플리팅이 가능합니다.

코드 스플리팅이란 해당 페이지에서 원하는 자바스크립트와 라이브러리만 렌더링하는 것입니다.

따라서 모든 번들 (chunk.js)이 하나로 묶이지 않고 개발자가 번들을 나누어 좀 더 효율적으로 무거운 자바스크립트 로딩 시간을 개선할 수 있습니다.

#### prefetching

백그라운드에서 페이지를 미리 가져옵니다.

정적 생성을 사용하는 JSON페이지 같은 경우 더 빠른 페이지 전환을 위해 데이터가 포함된 파일을 미리 로드합니다.

#### title tag, meta tag custom

페이지 제목을 커스텀하거나 meta 태그를 자유롭게 변경할 수 있습니다.

#### typescript

타입스크립트를 지원함으로 활용을 위한 웹펙이나 바벨을 추가 설정할 필요없이 자동으로 tsconfig 파일과 next전용 ts파일이 생성됩니다.

#### hot reloading 

코드 저장시 자동 새로고침 기능을 지원합니다.

---

### server side lifecycle

NextJs 개발을 시작했다면 SSR LifeCycle을 이해할 수 있습니다.

1.  NextJs 서버가 요청을 받습니다
2.  Get 요청에 알맞는 pages 폴더 내부의 컴포넌트를 찾습니다.
3.  \_app.tsx에 설정한 initialProps가 존재한다면 실행합니다.
4.  route 요청에 알맞는 페이지의 컴포넌트에 initialProps가 있다면 실행한 후에 pageProps 데이터를 받아옵니다.
5.  \_document.tsx에 설정한 initialProps가 존재한다면 실행합니다. 실행 후에 pageProps 데이터를 받아옵니다.
6.  모든 Props를 구성하고난 이후에 \_app.tsx에서 pages/component.tsx 순서로 렌더링됩니다.
7.  모든 Content를 구성하고난 이후에 \_document.tsx를 실행하여 HTML형태로 응답합니다.

React의 프레임워크인 Next.Js에 대해 알아보았습니다.

Next.Js는 Vue.Js의 Nuxt.Js와 같은 서버 사이드 프레임워크입니다.