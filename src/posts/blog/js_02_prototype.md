---
title: "JavaScript ProtoType"
category: "Js"
date: "2022-03-04 16:38:00 +09:00"
desc: "프로토타입"
thumbnail: "./images/js/js_logo.jpg"
alt: "js"
---

자바스크립트에는 클래스 개념은 없습니다.

그럼 그동안 사용했던 클래스 문법은 무엇인지 예시를 통해 자바스크립트가 클래스 문법을 표현하는 방식에 대해 알아보겠습니다.

### 사용하던 클래스 문법은 무엇인가요?

```js
export class sheep extends animal{
	...
}
```

JavsScript의 class 키워드와 마찬가지로 Java, Python 등 객체 지향 언어에서는 빠질 수 없는 개념입니다.

하지만 자바스크립트에는 클래스의 개념이 없는 대신 프로토타입(prototype)이 있습니다.

자바스크립트가 프로토타입 기반 언어라고 불리는 이유이기도 합니다.

따라서, 클래스 개념이 없으니 상속 개념또한 존재하지 않습니다.

그래서 보통 프로토타입을 기반으로 상속을 흉내내어 구현해 사용합니다.

[ES6 표준명세](https://tc39.es/ecma262/#sec-ordinary-and-exotic-objects-behaviours)에서 클래스 문법이 추가되었지만 문법이 추가되었다는 것뿐이지

자바스크립트가 클래스 기반으로 바뀌었다는 것은 아닙니다.

자바스크립트의 모든 객체는 자신의 부모객체와 연결되어있습니다.

이것이 객체지향의 상속개념과 같이 부모객체의 프로퍼티 혹은 메서드를 상속받아 사용할 수 있게합니다.

이러한 부모객체를 prototype object 또는 prototype이라고 합니다.

prototype 객체는 생성자 함수에 의해 생성된 각각의 공유 프로퍼티를 제공하기 위해 사용합니다.

```js
let yun = {
    name : 'juwon',
    age : '1'
}

console.log(yun.hasOwnProperty('name'))

console.dir(yun)
```

예시 하단에 [[Prototype]] 속성이 있습니다.

![01](https://user-images.githubusercontent.com/85836879/174017002-82508122-16ee-4b23-b202-d9d7b9a69907.png)

> 자바스크립트의 모든 객체는 [[Prototype]]이라는 인터널 슬록(internal slot)을 갖습니다.

[[Prototype]]의 값은 null 또는 객체이며 상속을 구현하는 것에 사용됩니다.

[[Prototype]] 객체의 데이터 프로퍼티는 get 액세스를 위해 상속되어 자식 객체의 프로퍼티처럼 사용할 수 있습니다.

하지만 set 액세스는 허용하지 않는다며 ECMA에 명시되어 있습니다.

이제 [[Prototype]]의 값은 Prototype Object이며 \_\_proto__ accessor property로 접근할 수 있는 사실을 알 수 있습니다.

\_\_proto__ property에 접근하면 내부에서 Object.getPrototypeOf가 호출되어 Prototype Object를 반환합니다.

예시처럼 yun 객체는 __proto__ Property로 자신의 부모 객체인 Object.prototype을 가리키고 있습니다.

```js
let yun = {
    name : 'juwon',
    age : '1'
}

console.log(yun.__proto__ === Object.prototype)
```

![02](https://user-images.githubusercontent.com/85836879/174016995-406d659d-21af-4479-8507-d9fb1177658a.png)

우리는 이제 자바스크립트에서 객체를 생성할 때 프로토타입이 결정되며 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있는 사실 또한 알 수 있습니다.

이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미하며 이러한 프로토타입의 특징을 활용해 객체의 상속을 흉내내 구현할 수 있게됩니다.

그러면 [[Prototype]]과 prototype property는 어떤 차이가 있을까요??

### [[Prototype]] vs prototype property


모든 객체는 자신의 프로토타입 객체를 가리키는 [[Prototype]] 인터널 슬롯 ( internal slot )을 가지며 상속을 위해 사용됩니다.

함수도 객체이므로 [[Prototype]] 인터널 슬롯을 갖습니다.

동시에 함수 객체는 일반 객체와 달리 prototype property도 갖습니다.

    주의!
    prototype property는 prototype Object를 가리키는 [[Prototype]] 인터널 슬롯과는 다릅니다.
    prototype property와 [[Prototype]]은 모두 프로토타입 객체를 가리키지만 관점의 차이가 존재합니다.

![03](https://user-images.githubusercontent.com/85836879/174016991-a151e146-7d30-473a-8dd0-40571218c09f.png)

함수의 [[Prototype]]과 prototype property
```js
function person(name){
    this.name = name;
}

let foo = new person('Yun')

console.dir(person)

console.dir(foo)
```

![04](https://user-images.githubusercontent.com/85836879/174016989-34a9c1c5-10f6-4f9c-9dac-7080b8a4ec82.png)

---

### [[Prototype]]

![05](https://user-images.githubusercontent.com/85836879/174016984-cf44acce-9ae9-4c1c-9796-60b070358f95.png)

함수를 포함한 모든 객체가 가지고 있는 인터널 슬롯입니다.
객체의 입장에서 자신의 부모 역할을 하는 프로토타입 객체를 가리키며 함수 객체인 경우 Function.prototype을 가리킵니다. 

---

### prototype property

![06](https://user-images.githubusercontent.com/85836879/174016979-4d981ae3-15d7-44e4-a47e-3308c00acbb3.png)

함수 객체만 가지고 있는 프로퍼티입니다.
함수 객체가 생성자로 사용될 때 해당 함수를 통해 생성될 객체의 부모 역할을 하는 객체( prototype Object )를 가리킵니다.

---

![07](https://user-images.githubusercontent.com/85836879/174016977-69906f00-7230-44d8-ae1a-7c371945b230.png)

다시말해 person.prototype Object가 메모리 어딘가에 존재하고 person 함수로 부터 생성된 객체 ( foo )는 Object에 들어있는 값을 모두 사용할 수 있습니다.

![08](https://user-images.githubusercontent.com/85836879/174016972-b6af4a07-6cf1-4b75-a85a-8e680b8d923a.png)

person 타입의 다른 객체 또한 Object에 들어있는 값을 사용할 수 있습니다.

![09](https://user-images.githubusercontent.com/85836879/174016968-1f276937-c50d-4918-b847-960ae3efbd7f.png)

이렇게 prototype을 이용해 상속을 흉내내어 사용할 수 있습니다.

foo와 boo가 person 함수를 통해 생성되었으니 person.prototype을 참조 ( 상속 )할 수 있게 됩니다.

---

### 왜 이것이 가능할 까요?? 

모든 객체는 빠짐없이 \_\_proto__ 속성을 가지고 있기 때문입니다.

__proto__는 객체가 생성될 때 최상위 부모이었던 Prototype Object를 가리킵니다.

![10](https://user-images.githubusercontent.com/85836879/174016966-981b06c8-efef-40dc-ab0e-2ad0033e4329.png)

따라서 foo와 boo 객체는 person 함수로부터 생성되었으니 person함수의 Prototype Object를 가리키고 있는것입니다.

이것을 Prototype Chain이라고 합니다. 

![11](https://user-images.githubusercontent.com/85836879/174016951-aa1d9598-1639-4fbb-99af-9908eada4c72.png)

이러한 프로토타입 체인 구조에 의해 모든 객체는 최상위 객체 Object의 자식 객체로 존재하고 

부모인 Object Prototype Object에 존재하는 속성을 사용할 수 있습니다.

__proto__속성과 Prototype Chain을 통해 자바스크립트는 클래스가 아닌 프로토타입을 사용하는 객체 지향 언어라는 것을 알 수 있습니다.