---
title: "Vue.Js란? "
category: "Vue"
date: "2022-01-07 18:44:00 +09:00"
desc: "Vue의 특징은 무엇일까"
thumbnail: "./images/vue/vue_thumbnail.jpg"
alt: "vue"
---

![vue'](https://user-images.githubusercontent.com/85836879/170812108-41de980d-4454-401f-8929-60521b13bf58.png)
#
    Vue 3 버전 기준으로 작성된 포스트입니다.
#
React, Anguler, Vue등 수 많은 자바스크립트 기반 프레임워크 또는 라이브러리가 있습니다.
#
이러한 프레임워크의 특징은 Single Page Application이라는 것입니다.
#
브라우저의 종류에 무관하게 es6 문법을 사용하게 도와주는 Babel
#
Entry 파일 기준으로 여러개의 모듈을 하나로 묶어주는 Webpack
#
SPA 안에는 개발자를 위한 많은 도구들이 구성되어 있습니다.
#
### Single Page Application (SPA)
---

SPA는 하나의 페이지 혹은 화면에서만 동작하는 방식을 의미합니다.
#
하나의 페이지에서 Webpack으로 한줄로 묶여진 스크립트를 컴포넌트 기준으로
#
사용자의 입력을 기준으로 하나의 페이지에서 다른 출력을 보여주는 기법입니다.

#
### Component
---

Component는 개별적인 레고 블록 혹은 HTML Element라고 쉽게 설명할 수 있습니다.
#
여러개의 컴포넌트를 조합하여 화면을 구성할 수 있는 블록 또한 컴포넌트입니다.
#
공식 문서에서의 컴포넌트란 Vue의 컴파일러에 의해 동작이 추가된 사용자 지정 엘리먼트( Element )입니다.
#
Vue의 Component는 Vue의 Instance이며 기존 HTML의 모든 옵션을 사용할 수 있습니다.
#
Vue.Js에는 프레임워크라는 타이틀에 알맞게 프레임워크에서 사전에 정의한 간단한 코드로 
기존 Javascript의 다양한 기능을 표현할 수 있습니다.
#
Vue 공식 문서를 통해 다양한 구문, 문법들을 알 수 있습니다.

[https://v3.vuejs-korea.org/](https://v3.vuejs-korea.org/)
#
### 선언적 렌더링
---
Vue.js의 핵심은 간단한 마크업으로 DOM에서 데이터를 선언적으로 렌더링 할 수 있는 시스템입니다.
#
사용자는 단순 Vue Style의 마크업을 사용하지만 내부에 있는 Vue.Js의 컴파일러는
개발자를 위해 작업을 하고 있습니다.
#
DOM과 데이터는 연결되어 모든 요소들이 반응형(reactive)이 되었습니다.

기초적인 Vue.Js의 코드 구조입니다.
```js
<template>
  <div id="counter">
    Counter: {{ counter }}
  </div>
</template>

export default {
  data() {
    return {
      counter: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}
```
Vue.Js가 DOM에 mount된 시점부터 선언한 변수 counter의 값이 1초마다 1씩 증가하는 것을 확인할 수 있습니다.
#
Vue.Js는 렌더링을 지원하는 동적 웹사이트를 구현하기에 최적화되어있습니다.
#
Vue-Cli가 아닌 Nuxt.Js를 이용해 동적 렌더링을 부분 정적 렌더링으로 커스텀할 수 있습니다.
#
### 사용자 입력 핸들링
---
사용자 입력 핸들링으로 **디렉티브**라는 Vue.Js만의 문법이 있습니다.
#
디렉티브는 특수 속성임을 나타내는 **v-** 접두어가 붙어 있으며 렌더링 된 DOM에 유니크한 반응형 동작을 합니다.
#
Vue에는 많은 기능과 구문의 디렉티브가 있으며 강력한 기능을 제공합니다.