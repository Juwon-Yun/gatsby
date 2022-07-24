---
title: "Clean Code 10장"
category: "Etc"
date: "2022-04-16 21:06:00 +09:00"
desc: "클래스"
thumbnail: "./images/clean_code/cleancode_th.jpg"
alt: "클래스"
---

![Untitled](https://user-images.githubusercontent.com/85836879/170295027-fdccf73f-465c-4e3f-bbfa-a600ac89c472.png)

## 10장 클래스

---

지금까지는 코드 행과 코드 블록 그리고 함수를 올바르게 작성하는 방법과 구현하는 방법에 초점을 맞춘 챕터였다.

이번 챕터에서는 코드의 표현력과 구성하고 있는 함수에서 좀 더 차원 높은 단계까지의 깨끗한 클래스를 작성하는 방법을 다룬다.

## 목차

---

-   [ ]  클래스 체계
    -   [x]  캡슐화
-   [ ]  클래스는 작아야 한다!
    -   [x]  단일 책임 원칙
    -   [ ]  응집도
    -   [ ]  응집도를 유지하면 작은 클래스 여럿이 나온다
-   [x]  변경하기 쉬운 클래스
    -   [ ]  변경으로부터 격리

## 10-1. 클래스 체계

---

클래스를 정의하는 표준 자바 관례를 보았을 때 순서이다.

먼저 변수 목록이 나온다.

> -   정적 공개 상수 ( static public 상수 )
> -   정적 비공개 변수 ( static private 변수 )
> -   비공개 인스턴스 변수 ( private instance 변수 )

공개 변수( public 변수 )가 필요한 경우는 거의 없다.

변수 목록 다음은 함수 목록이다.

> -   공개 함수 ( public method )
> -   비공개 함수 ( private method )

비공개 함수는 자신을 호출하는 공개 함수 직후에 작성한다.

즉 앞서 이야기한 추상화의 단계가 순차적으로 내려간다. ( 공개 → 비공개 순)

코드가 신문기사처럼 읽힌다.

### 10-1-1. 캡슐화

---

캡슐화란 하나의 책임에 연관되어있는 인스턴스 요소들을 하나의 클래스로 만드는 것을 말한다.

변수와 유틸성 함수는 공개하지 않는 편이 낫지만 반드시 숨겨야 한다는 법칙도 없다.

떄로는 접근 제한자를 protected로 선언하여 테스트 코드에 접근을 허용한다.

하지만 그 전에 비공개 상태를 유지할 온갖 방법을 찾는다.

캡슐화를 풀어주는 결정은 최후의 수단이다.

테스트 코드의 접근을 허용하는 방법 중 하나인 protected 클래스 캡슐화 요소의 접근 방법

```java
public class A extends B{
    public void run(){
        protectedMethod(); // B의 protected 요소 접근 
    }
}
```

별도의 인스턴스를 받지 않고 B의 변수와 메소드의 접근 권한을 승계받는다.

## 10-2. 클래스는 작아야 한다!

---

클래스를 만들 때 무조건 크기는 작아야한다.

함수를 작성할 때와 마찬가지로 작아야 한다.

작다의 기준을 함수에서는 물리적인 행의 개수, 크기로 측정했다. ( 기능의 수 )

클래스에서의 작은 기준은 맡은 책임의 수로 측정한다.

클래스가 작은 지 판별하기 어렵다면 해당 클래스를 설명할 때

if ( 만일 ), and ( 그리고 ), or ( ~하며 ), but ( 하지만 )을 제외하고 25단어 내외로 설명할 수 있어야 한다.

만약 ~하며( or )를 설명에 넣는다면 책임이 많다는 증거이다.

## 10-2-1. 단일 책임 원칙

---

SOLID의 원칙 중 하나인 단일 책임 원칙 ( Single Responsibility Principle, SRP )

클래스는 단 하나의 책임만을 가져야 한다를 의미하는 규칙이다.

( 하나의 책임은 클래스를 변경할 이유가 하나임을 의미한다. )

만일 하나의 클래스에 많은 책임이 있다면 이것은 응집되어 있지 않다는 것이고

클래스를 수정해야하는 많은 원인이 된다.

단일 책임 원칙을 위반한 코드

```java
class User{
    constructor(name: string){ ... }
    getUserName() { ... }
    saveUser(a: User) { ... }
}
```

나중에 애플리케이션이 DB 관리에 영향을 준다면 User 프로퍼티의 사용을 만드는 클래스는 반드시 변경해야한다.

이를 경직된 클래스라고도 부른다.

경직된 클래스를 응집된 클래스로 바꾼 예시코드

```java
class User{
    constructor(name: string){ ... }
    getUserName() { ... }
}

class UserDB {
    getUser(a: User) { ... }
    saveUser(a: User) { ... }
}
```

이러한 SRP 규칙을 따른다면 애플리케이션은 높은 응집력은 갖추게 된다.

### 10-2-2. 응집도

---

클래스(모듈)에 포함된 내부 변수(요소)들이 하나의 책임을 위해 연결되어 있는 정도를 말한다.

일반적으로 메서드가 변수를 많이 사용할 수록 메서드와 클래스는 응집도가 높다.

응집도가 높을 수록 유지보수가 쉽다.

낮을 수록 유지보수가 어렵다.

상수만 모아 놓아 유지보수가 쉬운 코드.

```js
export const ROUTE_PAGE = {
  SIGNIN: "/",
  DASHBOARD: "/dashBoard",
  DETAIL: "/detail/:id",
  NOT_FOUND: "/:id",
};

export const INPUT_TYPE = {
  TEXT: "text",
  PASSWORD: "password",
};

export const INPUT_LABEL = {
  ID: "ID",
  PASSWORD: "Password",
  REMEMBER_ME: "Remember Me",
  SIGN_IN: "Sign In",
  SIGN_UP: "Sign Up",
  GO_BACK: "뒤로가기",
};
```

응집도는 변수와 메서드를 적절히 쪼개어 새로운 클래스로 만들면 자연스럽게 높아진다.

## 책에 없는 결합도란?

---

결합도란 다른 모듈과 의존성의 정도를 말한다.

하나의 모듈을 수정하기 위해 다른 모듈의 변경을 요구하는 정도이다.

결합도가 높은 코드

```java
class A { 
  constructor(v : number) { 
    this.v = v; 
  } 
} 

class B { 
  constructor(a : A) { 
    this.v = a.v; 
  } 
} 

const b = new B(new A(3));
```

Lombok의 생성자 주입을 통한 순환참조( 결합도 )를 방지한다. (낮춘다)

```java
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final PasswordEncode passwordEncode;

    @Override
    public boolean getUserInfo(UserDto userDto) {
        UserDto selectUserDto = userMapper.select(userDto);

        if (selectUserDto == null){
            return false;
        }
        return passwordEncode.isMatch(userDto.getUserPw(), selectUserDto.getUserPw());
    }

    @Override
    public int postSignUp(UserDto userDto) {
        if(userDto.getUserPw().equals("") || userDto.getUserPw() == null) return 0;

        userDto.setUserPw(passwordEncode.bcryptEncode(userDto.getUserPw()));
        return userMapper.insert(userDto);
    }
}
```

### 10-2-3. 응집도를 유지하면 작은 클래스 여럿이 나온다

---

큰 함수를 작은 함수 여러개로 나누기만 해도 자연스레 클래스 수가 많아져 응집력이 높아진다.

큰 함수에서 정의된 변수를 작은 함수에서 인수로 사용한다면 인스턴스 변수로 승격해 사용하자. ( 독자적인 클래스로 분리하자. )

## 11-3. 변경하기 쉬운 클래스

---

깨끗한 시스템은 클래스를 체계적으로 정리해 코드 변경에 동반되는 위험도를 낮춘다.

### 11-3-1. 변경으로부터 격리

---

시스템의 결합도가 낮아지면 유연성과 재사용성도 더욱 높아진다.

결합도가 낮다는 것은 어떤 모듈의 요소가 변경으로부터와 다른 요소로부터 잘 격리되어 있다는 말이다.

격리가 잘 되어있으면 시스템을 이해하기도 수월해진다.

결합도를 최소한으로 줄이면 SOLID의 D, DIP ( 의존성 역전의 원칙)을 따르게 된다.

( 클래스가 상세한 구현이 아닌 추상화에 의존해야 한다는 원칙이다 )

DIP는 자신보다 변하기 쉬운것에 의존하지 마라 라는 뜻이다.

## 결론

---

이번 챕터에서 목차는 적지만 SOLID의 원칙 중 SRP와 DIP가 등장했다.

> Single Responsibility Principle ( 단일 책임 원칙 )

> Dependency Inversion Principle ( 의존성 역전의 원칙 )

10장에서 저자가 말하는 깨끗한 클래스는 단 하나의 책임을 가져야 하며 추상화에 의존해야한다는 것을 말하는 것 같다.

## 11장 시스템

---