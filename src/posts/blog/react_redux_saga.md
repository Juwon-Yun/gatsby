---
title: "React Redux Saga"
category: "React"
date: "2022-03-26 17:44:00 +09:00"
desc: "Redux Middleware"
thumbnail: "./images/react/react_logo.jpg"
alt: "react"
---

![saga_banner](https://user-images.githubusercontent.com/85836879/172308741-74741527-54c5-49ca-94c9-7e9b716825f0.png)

이번 포스팅에서 알아볼 내용은 Redux의 미들웨어 관리 라이브러리인 Redux-Saga입니다.

Redux-Saga를 알아보기 이전에 React-Redux 라이브러리와 Pure Js의 Generator문법을 숙지해야 사용할 수 있습니다.

[redux-saga 공식 깃허브](https://github.com/redux-saga/redux-saga)


![saga_원리](https://user-images.githubusercontent.com/85836879/172308731-34ddf842-1967-4ded-91b1-841a56346b28.png)

### Redux-Saga

Redux 라이브러리는 동기적 순수함수 관리 라이브러리였습니다.

Redux는 무조건 동기 방식으로 dispatch가 이루어집니다. 또한 dispatch를 여러번 할 경우 컴포넌트 파일에서 dispatch를 여러번 작성해야하는 불편함도 있습니다. 

그래서 나오게된 라이브러리가 Redux-Saga입니다. 

Redux-Saga는 비동기 방식으로 dispatch를 사용할 수 있으며 ( put ), 내부 메소드를 활용하여 사용자 부주의로 인한 중복된API Request를 할 경우 가장 최근 혹은 가장 마지막( takeleast ) Request에 대한 Response만 받아오도록 하는 기능도 존재합니다. ( thuttle, debounce )

React-Saga는 MSA 아키텍처 중 하나인 SAGA의 명칭을 가져온 데이터 패턴입니다.

![saga_archi](https://user-images.githubusercontent.com/85836879/172308729-839c3dac-0d53-4fde-98d9-3819e23b0367.png)

### Saga Pattern 

SAGA 패턴이란 MicroService간에 이벤트를 주고 받아 특정 MicroService에서의 작업이 실패하면 이전까지의 작업이 완료된 MicroService들에게 보상 ( Complemetary ) 이벤트를 소싱함으로써 분산 환경에서 원자성 ( Atomicity )을 보장하는 패턴입니다.

이러한 과정을 통해 순차적으로 트랜잭션이 처리되며, 마지막 트랜잭션이 끝났을 때 데이터가 완전히 영속되었음을 확인하고 종료합니다.

이 패턴을 통해 최종 일관성 ( Eventually Consistency )를 달성할 수 있습니다. 

예시 코드로 redux-saga를 쉽게 구현해보겠습니다.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./modules/sagas/index";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

export const getStore = () => store;
```

React의 루트 index.tsx에 선언한 redux 라이브러리에 redux-saga를 함께 실행시키는 코드를 작성하면됩니다.

```jsx
import MainSaga from "./Main";
import DashBoardSaga from "./DashBoard";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([MainSaga(), DashBoardSaga()]);
}
```

사용할 Saga가 한개 파일이 아닐 경우에 all 함수로 saga를 통합하면 됩니다.

```jsx
import { call, select, takeEvery } from "redux-saga/effects";
import { getStore } from "index";

import * as A from "actions/index";
import * as T from "types/index";
import * as API from "api/index";

const mainState = () => getStore().getState().Main;

function* helloSaga() {
  const { lang } = yield select(mainState);
  const res: T.ResponseGenerator = yield call(API.sayHello, lang);
  console.log(res);
}

function* mainSaga() {
  yield takeEvery(A.Say_Hello, helloSaga);
}

export default mainSaga;
```

사용할 redux의 action와 reducer를 가져와서 import 합니다.

제너레이터 함수로 선언한 mainSaga()에서 호출할 action의 이름과 필요한 로직을 수행할 함수를 takeEvery함수의 매개변수로 작성합니다.

이렇게 되면 SayHello라는 action을 React 컴포넌트에서 호출할 때 비동기적으로 saga에서 호출을 중간에 가로채 helloSaga 함수를 실행하게됩니다. 

helloSaga 제너레이터 함수에서는 saga 함수인 call 함수를 사용해 ajax 요청을 할 수 있습니다. 

```jsx
function* callAPI(){
    const result = yield call(ajaxFunction, parameter);
    console.log(result.data)
}
```

위의 예시 코드로 redux-saga를 통해 비동기 요청을 구현해보았습니다.