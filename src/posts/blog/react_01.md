---
title: "React란? "
category: "React"
date: "2022-03-12 18:34:00 +09:00"
desc: "React의 탄생과 React-Native"
thumbnail: "./images/react/react_thumbnail.jpg"
alt: "react"
---

![re1](https://user-images.githubusercontent.com/85836879/170816631-22dfd633-de98-49fd-9318-9998a24b9f91.png)

### React

React.Js는 자바스크립트 라이브러리로서 사용자 인터페이스를 만들기 위해 사용됩니다.
#
페이스북과 개별 개발자 및 여러 기업에 의해 유지 보수되고 있습니다.
#
리액트는 Vue, Angular와 같은 싱글 페이지 애플리케이션( Single Page Application : SPA )입니다.
#
React는 2011년 페이스북의 뉴스피드에 처음 적용되었으며 페이스북의 소프트웨어 엔지니어 Jordan Walke가 개발하였습니다.

![re2](https://user-images.githubusercontent.com/85836879/170816654-833324af-46c9-4266-9b54-b977a3fc64ad.jpeg)


2012년 인스타그램에 적용되었습니다.
#
2013년 5월 JSConf( JavaScript Conference ) US에서 오픈 소스화 되었습니다.
#
### React의 특징
---
### 함수형 문법과 클래스형 문법

```tsx
import React from 'react'

{/* 함수형 문법 */}

function App(){
    return (
    	<div>
          <h1> Hello React!!! </h1>
        </div>
    )
}


{/* 클래스형 문법 ( 비권장 ) */}

class App extends React.Component{
     render(){
    	return(
            <div>
              <h1> Hello React!!! </h1>
            </div>
        )
    }
}
```

위의 코드처럼 React는 함수형, 클래스형 문법으로 나누어 표현할 수 있습니다.

해당 코드는 Babel을 통해 대부분의 브라우저가 사용할 수 있는 Javascript 코드로 변환한 후 사용할 수 있습니다.
#

### Virtual DOM ( 가상 DOM )
---
서버와의 데이터 통신과는 별도의 DOM을 직접적으로 조작해야 하는 기존 웹 개발 방식과는 다르게 React는 DOM을 직접적으로 조작하지 않고 데이터가 변화할 때 변경사항이 적용된 Virtual DOM을 만듭니다.
#
실제 DOM과 Virtual DOM의 차이점을 비교한 후에 변견 된 부분을 실제 DOM에 적용합니다.
#
데이터의 찾은 변경이 필요한 웹 애플리케이션의 경우 이러한 가상 DOM방식을 통해 성능을 크게 향상할 수 있습니다.
#
하지만 데이터가 자주 변경되지 않은 비교적 정적 웹 페이지에 React를 사용할 경우 오히려 성능면에서 손해일 수 있습니다.
#
### Lifecycle Method ( Lifecycle Hook )

Lifecycle Method는 Component가 존재하는 동안 set point에 코드를 실행할 수 있게 하는 hook을 의미합니다.
#
shouldComponentUpdate : render가 필요하지 않는 경우 false을 반환함으로써 컴포넌트의 불필요한 렌더링을 막을 수 있습니다.
#
componentDidMount : 컴포넌트가 Mount 되면 호출됩니다. 또한 API를 통해 원본 소스로부터의 데이터를 trigger 하기 위해 사용됩니다.
#
render : 가장 중요한 Lifecycle Method이며 어떤 컴포넌트일지라도 존재해야 하는 필수 조건입니다. 컴포넌트의 상태( state )가 업데이트될 때마다 호출되는 것이 보통이며 사용자 인터페이스의 변경사항을 반영합니다.
#

### React Hooks

React의 Hook은 다양합니다.

    useState
    useContext
    useReducer
    useMemo
    useEffect
    useCallback
    useSelector
    useParam
    uselocation

이외에도 많은 Hook이 있습니다.
#
성능 최적화를 위한 훅인 useMemo와 useCallback은 필수로 사용하는 대표적인 훅입니다.
#
#### JSX ( JavaScript Syntax Extension )

```js
{ console.log('Hello React World!!!') }
```

React에서 HTML를 표현할 때 JSX를 사용합니다. 

겉으로는 HTML 같은 마크업 언어를 리터럴 방식으로 입력하는 것으로 보이지만 빌드 시에 Babel에 의해 자바스크립트로 변환됩니다.

자바스크립트 코드를 HTML처럼 표현할 수 있습니다.

HTML과 매우 흡사하지만 XML을 기반으로 JavaScript 내부에서 사용하다 보니 HTML과의 차이점이 존재합니다.

HTML요소에 class값을 정의할 때 class라는 단어가 ECMAScript6의 클래스 문법과 겹치는 예약어이기 때문에 className이라는 단어를 사용합니다.
#
반복문 for문과 예약어가 겹쳐 htmlFor를 사용합니다.
#

HTML요소에서 이벤트를 핸들링하는 onclick 등의 단어들을 카멜 표기법으로 onClick으로 표기해야 합니다.
#
HTML에서의 주석은 <!-- comment -->로 표현했지만 JSX에서는 {/\* comment \*/}으로 표현합니다.
#
HTML Custom-Element는 <juwon-element>로 표기했지만 React의 Custom Element는 <JuwonElement>처럼 Pascal Case로 표기하고 태그를 닫을 때는 꼭 />를 표기합니다.
#
JSX 문법 내부에서도 JS를 {}로 사용할 수 있습니다.
#
### React CRA (boilerplate) 
---

![re4foot](https://user-images.githubusercontent.com/85836879/170816730-941100b6-5e54-47ca-a487-cfe4e2f57be2.png)

```bash
npx create-react-app myreact

cd myreact && npm start
```
터미널 명령어로 React를 실행할 수 있습니다.
#

### React Native
---
![re3na](https://user-images.githubusercontent.com/85836879/170816721-71b7cac6-8e1c-434b-a1e6-ca890c851bee.png)

React Native (RN)는 React 문법으로 andriod, iOS 애플리케이션을 개발할 수 있는 하이브리드 모바일 앱 프레임워크입니다.
#
2015년 페이스북에서 발표되었으며 Andriod, iOS 애플리케이션에 리액트 아키텍처를 적용합니다.
#
React Native는 React와 유사한 문법을 가지고 있습니다.
#
React와의 차이점은 브라우저의 HTML Element를 사용하는 것이 아닌 View, Text 등의 자체 태그를 사용하는 점과 CSS를 사용하지 않으며 오직 CreateStyleSheet를 이용한 디자인만을 지원합니다.
#
현재는 웹과 동일한 CSS 사용을 위한 Styled Component 및 PostCSS를 지원하여 무리 없이 사용자 인터페이스 구성이 가능합니다.