---
title: "VueX"
category: "Vue"
date: "2022-01-08 12:11:00 +09:00"
desc: "VueX로 상태관리해요"
thumbnail: "./images/vue/vuex.jpg"
alt: "vue"
---


### Vue X

Vuex는 Vue 프레임워크의 라이브러리이며 상태 관리(state management) 역할을 합니다.

모든 컴포넌트에서 접근할 수 있는 중앙 데이터 저장소로 코드의 재사용성을 확장시켜주는 기능이 있습니다.

컴포넌트간의 데이터 공유를 효율적으로 관리해주는 라이브러리로써 개발시간을 단축시키는 효과가 있습니다. 

또한 데이터에 대한 동시성을 제공합니다.

Vue X 4버전은 Vue 3 버전을 호환하며 

Vue X 3버전은 Vue 2 버전을 호환합니다.

### VueX 설치하기
```js
npm install vuex@next --save

yarn add vuex@next --save
```


### Vuex 사용을 선언하기

```js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'

const app = createApp(App)

app.use(store).mount('#app')
```

Entry Point에서 VueX를  store로 선언하고 사용할 수 있습니다.

상위 store, 하위 store를 구분하여 

store를 모듈화 하여 부모에 속한 store로 정의할 수 있습니다.

모듈화하지 않은 단일 store의 사용 방식 예제입니다.

```js
import { createStore } from 'vuex'

const singleStore = createStore({
    state(){
        return{
            data : '데이터를 저장하는 state 입니다.'
        }
    },
      mutations : {
        setData(state){
            state.data = '동기 함수를 담당하는 mutations 입니다.'
        }
    },
      actions : {
        setData(context){
            setInterVal({
              this.commit('setData', '비동기 함수를 담당하는 actions 입니다.')
            }, 5000)
        }
    }
})

export default singleStore
```

### Vuex는 Flux 패턴을 지향합니다.
지향할 뿐이지 기능 자체로는 양방향이 가능한 아이러니한 점이 있습니다.

![flux](https://user-images.githubusercontent.com/85836879/174552402-cf96bc1c-39ab-42fd-946a-fb094bbf94de.png)

Flux패턴의 단방향 데이터 흐름입니다.

 - 데이터의 흐름이 나뉘지 않고 단방향으로만 처리합니다.

 - 패턴 자체에서 데이터 흐름을 정형화하여 향후에 발생하는 문제점들을 방지합니다.
 
store의 mutations와 actions 함수의 첫 매개변수는 항상 proxy 타입을 갖습니다.

첫 매개변수에는 state와 context로 접근할 수 있습니다.

state는 모듈화된 모든 store에 접근할 수 있으며

context는 현재 사용중인 store에만 접근할 수 있습니다.

store의 함수는 두개까지 매개변수로 받을 수 있지만

Object 타입을 통해 다양한 매개변수를 가질 수 있습니다.

### 매개변수 넘기기
```js
// 매개변수가 1개일 경우
setData(state, text){
    state.data = text
}

// 매개변수가 2개 이상일 경우
setData(state, {text, id}){
    state.data = text + id
}
```

일반적으로 state에는 상태 관리를 위한 변수를 선언하는 공간이며

mutations는 동기 함수를 사용하기 위한 공간이고

actions는 비동기 함수를 사용하기 위한 공간입니다.

### 상태 관리 패턴이란?

![vuex02](https://user-images.githubusercontent.com/85836879/174552386-11f60b98-e5f5-4f2c-ab3c-bfa5b3f14f28.png)

### 상태 관리 패턴의 3요소
    state == 데이터

    view => 데이터를 렌더링 하는 UI
    
    actions => 사용자의 입력에 따른 반응형 데이터 변경 함수

### VueX를 사용하는 관습...
Vuex의 state에 저장된 변수의 값은 항상 mutations와 actions의 함수로 변경되어야 합니다.

이를테면 OOP의 getter와 setter로 인스턴스에 접근하여

상태를 변경해주어야 어플리케이션의 규모가 커질 수록 데이터 관리와 추적이 용이해집니다.

```js
const singleStore = createStore({
    state(){
        data : ''
    },

    mutations(){
        setData(state, text){
            state.data = text
        }
    }
})

export defualt singleStore

...

import { mapMutations } from 'vuex'

<script>
    methods : {
        // 컴포넌트에서 선언된 singleStore를 사용하려면 사전에 선언해야 합니다.
        ...mapMutations({
            setData : 'setData'
        })
    },

    ...

    this.$store.state.data = '직접 변경은 가능하지만 권장하지 않습니다.'
</script>
```

### 마무리...
기본적인 Vuex 사용방법을 익혀봤습니다.

중앙 데이터 저장소 같은 Vuex는 Vue의 선언적 렌더링을 더 빛나게 해 주는 것 같습니다.

React의 Redux와 Redux-Saga보다 사용하기 쉬운 라이브러리인 느낌이 아직까진 들기도 합니다.

공부를 하며 각 프레임워크나 라이브러리의 차이점을 알수록 묘한 재미가 있네요. 

여러분들도 느껴보셨으면 합니다.

감사합니다👨🏻‍🔧

