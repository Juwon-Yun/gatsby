---
title: "React Redux"
category: "React"
date: "2022-03-26 16:43:00 +09:00"
desc: "Redux"
thumbnail: "./images/react/react_logo.jpg"
alt: "react"
---

![redux_banner](https://user-images.githubusercontent.com/85836879/172310330-fd308319-c9f5-4101-9803-c20d24489ddb.jpeg)

### React-Redux

부모 컴포넌트에서 자식 컴포넌트에게 데이터를 전송할 때 Props를 이용해 데이터를 전달합니다.

하지만 데이터가 필요한 자식 컴포넌트의 깊이( Depth )가 늘어날수록 Props -> Props -> Props ->...처럼 필요한 컴포넌트 까지 계속 타고 들어가야하는 번거로움이 있습니다.

이를 해결하기 위한 라이브러리가 Redux입니다.

Redux는 React뿐만 아니라 Vue, Angular, Pure Js에서도 사용가능하지만 React 전용 Redux 라이브러리, React-Redux를 지원합니다. 

### React-Redux를 사용하는 이유

앞서 말한 연쇄적인 Props 전달을 피함과 State의 종속성 탈피입니다.

useState Hook을 사용할 경우 컴포넌트 내부에 State를 만들고, 함수로 State를 바꿉니다

```jsx
const [react, setReact] = useState(false)
```

그렇기에 위의 react state는 해당 컴포넌트에 종속되는 결과를 갖습니다.

하지만 Redux는 컴포넌트에 종속되지 않고, 상태 관리를 컴포넌트 바깥에서 합니다.

프로젝트의 루트 폴더에서 state를 store로 선언하고 모든 컴포넌트에 store를 구독하여 state와 해당 state를 바꾸는 함수를 전달받게 됩니다. 

함수를  state가 바뀌면 해당 state를 구독 중인 컴포넌트는 모두 재 랜더링 됩니다.

따라서 store를 구독하고 있는 모든 컴포넌트는 어느 위치에 있든 상관없이 한 번에 상태를 전달받을 수 있게 되는 장점이 있습니다.

### Redux의 원리 

Redux는 완전한 Flux 패턴을 따르고 있습니다. 

( Vue.js의 상태관리 라이브러리인 VueX의 경우 지향하는 정도이며 양방향 기능이 가능합니다. )

Flux 패턴이란 단방향 데이터 흐름의 패턴입니다.

![flux](https://user-images.githubusercontent.com/85836879/172310327-36a22a0f-6920-4122-9a44-2ba6ac612525.png)
Redux에서는 action, reducer로 나뉠 수 있습니다.

action은 구독 중인 컴포넌트가 호출하는 함수의 이름을 정의하는 공간이며

reducer는 호출된 해당 함수의 로직을 정의하는 공간입니다. 

컴포넌트에서는 dispatch(action명)으로 호출하여 flux 데이터 패턴의 흐름에 따라 데이터가 전달됩니다.

### Reducer 규칙

reducer는 정의된 로직에 따라 store에 들어갈 state와 state를 변경하는 함수를  저장하는 공간입니다.

기본적으로 순수 함수로 코딩하고 데이터의 불변성을 꼭 준수해야 합니다.

#### 불변성을 지켜야 하는 이유
Redux는 state와 바뀐 state를 구분하는 방법이 참조값의 변경 유무로 판단하기 때문에 참조값이 변경되면 state가 변경되었다고 redux가 인식해 해당 state를 사용하는 컴포넌트에게 재 랜더링을 요청합니다.

![immer](https://user-images.githubusercontent.com/85836879/172310320-97d5bcac-b899-4383-b0f1-6c87cc2d30c2.png)

불변성을 지키기 위해 위 그림에서 Spread 연산자를 이용해 상태 값을 변경하고 재랜더링을 요청하게 작성하였습니다.

위에서 정의한 reducer는 호출할 컴포넌트에서 useDispatch Hook과 useSelector Hook으로 MainState를 사용할 수 있습니다.

### Redux의 한계

Redux의 함수는 모두 동기적으로 데이터가 흘러가게 됩니다.

하지만 웹 개발을 하면서 비동기적 요청이 필요할 경우가 많습니다.

그래서 나오게 된 미들웨어 라이브러리가 Redux-Saga입니다.

React를 사용해 개발하며 redux와 redux-saga 두 가지를 동시에 사용함으로 동기, 비동기 두개의 메커니즘을 가져갈 수 있습니다.

이번 포스팅으로 React의 상태 관리 라이브러리 Redux에 대해 알아보았습니다.

Redux 이외의 Recoil 등의 다양한 상태 관리 라이브러리도 존재하니 참고해서 개발에 도움되었으면 좋겠네요.