---
title: "React 성능 최적화 Hook "
category: "React"
date: "2022-04-03 20:15:00 +09:00"
desc: "useCallback과 useMemo"
thumbnail: "./images/react/react_logo.jpg"
alt: "react"
---

useMemo Hook과 useCallback Hook은 메모이제이션 기법을 활용하는 React Hook입니다.

### Memoization
어떠한 연산의 수행한 결과값을 메모리 내에 저장하여 동일한 입력이 들어오는 경우 기존에 메모리에 저장된 연산 결과를 그대로 반환해주는 프로그래밍 기법입니다.

Memoization은 중복된 연산을 피하기 때문에 메모리를 조금 더 사용하더라도 애플리케이션의 성능을 최적화 할 수 있습니다.

이러한 특성을 이용해 React의 Component가 동일한 입력에 대해 재렌더링 되는 상황을 막을 수 있는 유용한 Hook입니다.

### useMemo
useMemo 함수는 메모이제이션된 값을 반환하는 Hook입니다.

하위 컴포넌트에서 2개의 props 인자를 받는 컴포넌트가 존재할 때

메모이제이션되지 않은 컴포넌트인 경우 2개 인수 중 1개의 인수만 state가 변경되어 부모로부터 전달받을때

2개의 인자 모두 재랜더링이 진행됩니다.

이를 useMemo 함수를 이용한다면 2개 인자 중에 1개만 state가 변경되어도 변경된 인자에게만 영향받는 값만 재랜더링됩니다.

### React 공식 홈페이지의 useMemo 문법

![usememo](https://user-images.githubusercontent.com/85836879/172298188-4ce75e8b-f7ef-4247-b620-e86cf6cb269c.png)

useMemo가 적용되지 않은 부모 컴포넌트.

```jsx
import react, { useState, useMemo, useCallback } from "react";
import "./styles.css";

export default function App() {
  console.log("부모!");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  //기존 유저 이름 변경 함수
  const onChangeName = (e) => {
    const data = e.target.value;
    console.log("data : ", data);

    setName(data);
  };

  //기존 유저 이름 변경 함수
  const onChangeAge = (e) => {
    const age = e.target.value;
    console.log("age : ", age);

    setAge(age);
  };

  return (
    <div className="App">
      <h1>부모 컴포넌트</h1>

      <User
        name={name}
        age={age}
        onChangeName={onChangeName}
        onChangeAge={onChangeAge}
      />
    </div>
  );
}
```

useMemo가 적용되지 않은 부모 컴포넌트에 속한 자식 컴포넌트.

```jsx
import react from "react";

const setNameTag = (name) => {
  console.log("이름 태그");

  return `이름은 : ${name}`;
};

const setAgeTag = (name) => {
  console.log("나이 태그");

  return `나이는 : ${name}`;
};

const User = (props) => {
  console.log("자식");

  //일반적인 props 받은 값
  const naem = setNameTag(props.name);
  const age = setAgeTag(props.age);

  return (
    <div>
      <h1>{naem}</h1>
      <h1>{age}</h1>
      <div>
        <input type="text" onChange={(e) => props.onChangeName(e)} />
      </div>

      <div>
        <input type="text" onChange={(e) => props.onChangeAge(e)} />
      </div>
    </div>
  );
};
```

useMemo를 적용하지 않은 결과
![usememo](https://user-images.githubusercontent.com/85836879/172306068-e8692877-2505-4b02-b53c-68d17236b720.gif)

### useMemo를 적용한 자식 컴포넌트

```jsx
import react, { useMemo } from "react";

const User = (props) => {
  console.log("자식");

  // //일반적인 방식
  // const naem = setNameTag(props.name);
  // const age = setAgeTag(props.age);

  //useMemo 적용
  const naem = useMemo(() => setNameTag(props.name), [props.name]);
  const age = useMemo(() => setAgeTag(props.age), [props.age]);

  return (
    <div>
      <h1>{naem}</h1>
      <h1>{age}</h1>
      <div>
        <input type="text" onChange={(e) => props.onChangeName(e)} />
      </div>

      <div>
        <input type="text" onChange={(e) => props.onChangeAge(e)} />
      </div>
    </div>
  );
};
```

useMemo를 적용한 결과

![usememo_res](https://user-images.githubusercontent.com/85836879/172306276-3fd1b2cd-d6f4-41c9-992d-5b001480207d.gif)

onChange로 props에 입력받은 값만 재랜더링되는 결과를 볼 수 있습니다.

### useCallback
useCallback 함수는 메모이제이션된 콜백 함수를 반환하는 Hook입니다.

React 공식 홈페이지의 useCallback Hook 문법
![usecallback](https://user-images.githubusercontent.com/85836879/172306353-b440be9a-a1d8-42f8-8935-e01eb5a7cfa1.png)

반환하는 콜백함수의 반환값이 0인 경우와 1인 경우가 있다고 가정했을 때

0을 반환하는 함수와 1을 반환하는 함수는 서로 다른 참조값을 갖습니다.

이를 통해 메모리에 메모이제이션함으로써 반환값이 같은 경우 연산하지 않고 해당 함수의 주소값을 참조해 반환합니다.

아래 onChangeAge 함수에만 useCallback Hook을 사용하였습니다.

```jsx
import react, { useState, useMemo, useCallback } from "react";
import "./styles.css";

export default function App() {
  console.log("부모!");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  let count = 0;

  //기존 유저 이름 변경 함수
  const onChangeName = (e) => {
    console.log("onChangeName count 값 : ", count);

    count++;

    const data = e.target.value;
    console.log("data : ", data);

    setName(data);
  };

  //useCallback 사용
  const onChangeAge = useCallback((e) => {
    console.log("onChangeAge count 값 : ", count);
    count++;

    const age = e.target.value;
    console.log("age : ", age);

    setAge(age);
  }, []);

  return (
    <div className="App">
      <h1>부모 컴포넌트</h1>

      <User
        name={name}
        age={age}
        onChangeName={onChangeName}
        onChangeAge={onChangeAge}
      />
    </div>
  );
}
```

onChangeAge만 useCallback을 사용한 결과

![useCallback](https://user-images.githubusercontent.com/85836879/172306406-a935c276-4cac-4548-9480-59c132ec8ce7.gif)

onChangeAge의 함수만 변경되는 결과를 확인할 수 있습니다.
