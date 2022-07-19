---
title: "Dart mixin"
category: "Flutter"
date: "2022-06-12 12:59:00 +09:00"
desc: "mixin이 필요한 이유"
thumbnail: "./images/flutter/flutter_logo.jpg"
alt: "flutter"
---

### mixin이 필요한 이유
여러 클래스 게층에서 클래스의 코드를 재사용할 수 있는 방법이 필요할 때

mixin은 여러 클래스 계층에서 클래스의 코드를 재사용하는 방법입니다.

### mixin을 써야할 때
mixin은 동일한 클래스 게층 구조를 공유하지 않는 여러 클래스에서 동작을 공유하려는 경우와 
super class에서 이러한 동작을 구현하는 것이 타당하지 않을 경우 유용합니다.

일반적으로는 직렬화 또는 persistence와 유틸리티 기능을 제공할 때 사용합니다.

(Flutter의 RenderSliverHelpers)

mixin을 적극 활용해 사용한다면 유연한 usecase를 설계할 수 있게 됩니다.

--- 

### 문법
mixin은 일반적인 클래스 선언을 통해 암시적으로 정의됩니다.

```java
class Walker{
    void walk(){
        print("I'm walking");
    }
}
```

![99F2493B5CA40E0A0E](https://user-images.githubusercontent.com/85836879/173213727-dd6c5a5b-8cfe-45fa-bb05-40c4964ef7f5.png)


### 확장 막기
mixin을 인스턴스화되거나 확장되지 않도록하려면 다음과 같이 정의할 수 있습니다.

mixin을 사용하기 위한 클래스이므로 직접적인 확장을 해서는 안됩니다.

또한 상위 클래스 Walker는 기본 생성자를 가지고 있지 않습니다.

```java
abstract class Walker{
    factory Walker._() => null;

    void walk(){
        print("I'm walking");
    }
}

class A extends Walker{}
```

### 여러개 mixin 사용하기
mixin을 사용하려면 with 키워드를 쓰고 다음에 하나 또는 여러개의 mixin 이름을 사용합니다.

```java
class Walker{
    void walk(){
        print("I'm walking");
    }
}

class Flyer{
    void fly(){
        print("I'm flying");
    }
}

class Mamal{}
class Bird{}
class Cat extends Mamal with Walker {}
class Dove extends Bird with Walker, Flyer {}

void main(){
    Cat cat = Cat();
    Dove dove = Dove();

    cat.walk();

    dove.walk();
    dove.fly();
}
```

### on 키워드
다트의 mixin으로 여러가지 기능을 사용할 수 있지만 추가적인 키워드가 있습니다.

on 키워드로 mixin의 사용을 선언된 클래스를 확장하거나 구현하는 클래스로만 제한하는데 사용됩니다.

on 키워드를 사용하려면 mixin 키워드를 사용하여 mixin을 선언해야합니다.

```java
class A {}

mixin X on A {}

// Exception
class Y on A {}

class P extends A With X {}

// Exception
class Q extends X {}

```

### mixin 디테일
다음의 결과는 무엇일까요? AB 클래스와 BA 클래스 모두 A 및 B 믹스로 P 클래스를 확장하지만 다른 순서로 확장합니다.

```java
class A {
  String getMessage() => 'A';
}

class B {
  String getMessage() => 'B';
}

class P {
  String getMessage() => 'P';
}

class AB extends P with A, B {}

class BA extends P with B, A {}

void main(){
  String message = '';

  AB ab = AB();
  message = ab.getMessage();
  print(message); // B

  BA ba = BA();
  message = ba.getMessage();

  print(message); // A
}

```

mixin을 사용함에 있어서 선언된 순서가 중요합니다.

### 선형화
mixin은 mixin을 구현하는 클래스 위에 놓습니다.

상위 클래스의 옆이 아닌 위쪽으로 쌓아올리기 때문에 모호성이 없습니다.

![img](https://user-images.githubusercontent.com/85836879/173214655-35e98fb6-a19b-4e40-870a-a5b32778fa2c.png)


AB 클래스와 P 클래스 사이에 새로운 클래스가 생성됩니다. 

이 새로운 클래스는 super class P와 클래스 A와 B 사이의 혼합입니다.

이렇게 구현되므로 다중 상속이 없습니다.

mixin은 다중 상속을 구현하는 방법이 아닙니다.

mixin은 상태와 동작을 추상화하고 재사용하기 위한 방법입니다.

이것은 클래스 확장에서 얻은 재사용과 비슷하지만 선형이기 때문에 단일 상속으로 호환됩니다.

선형화에서 중요한 것은 mixin이 선언된 순서는 상속체인을 나타내는 것입니다.

### 타입
mixin 객체의 타입은 보통 부모의 하위타입입니다. 

그리고 with mixin 클래스의 하위 타입입니다.

```java
class A {}

class B {}

class P {}

class AB extends P with A, B {}

class BA extends P with B, A {}

void main(){
  AB ab = AB();

  print(ab is P); // true
  print(ab is A); // true
  print(ab is B); // true

  BA ba = BA();

  print(ba is P); // true
  print(ba is A); // true
  print(ba is B); // true
}
```

### 추가적인 설명
mixin은 새로운 클래스를 생성하고 또한 새로운 인터페이스를 생성합니다.

(Dart의 클래스도 인터페이스로 정의하기 때문입니다.)

새로운 클래스는 수퍼 클래스를 확장하고 mixin 클래스 멤버의 복사본을 포함하지만 mixin클래스, 인터페이스도 구현합니다.

```java
Super with Mixin

// 익명 슈퍼 클래스에 불과합니다.
class C extends Super with Mixin {}
```

이름을 지정하면 mixin 클래스와 해당 인터페이스를 참조할 수 있으며 Super 및 Mixin의 하위 클래스가 됩니다.
```java
class child = Super with Mixin;
```


### mixin 심화

mixin이 super에서 제공하는 기능을 사용하기 때문에 Client 클래스에 적용하려면 해당 클래스가 슈퍼 클래스를 확장하거나 구현해야합니다.

```java

abstract class Super {
  void method() {
    print("Super");
  }
}

class MySuper implements Super {
  void method() {
    print("MySuper");
  }
}

mixin Mixin on Super {
  void method() {
    super.method();
    print("Sub");
  }
}

class Client extends MySuper with Mixin {}

void main() {
  Client().method();
  // MySuper
  // Sub
}
```

### Animal 클래스 최종 구현
![99F2493B5CA40E0A0E](https://user-images.githubusercontent.com/85836879/173215547-c39f8ea8-c1b8-4337-b069-68dbd5c4b991.png)
```java
abstract class Animal {}

abstract class Mammal extends Animal {}

abstract class Bird extends Animal {}

abstract class Fish extends Animal {}

abstract class Walker {
  factory Walker._() => null;

  void walk() {
    print("I'm walking");
  }
}

abstract class Swimmer {
  factory Swimmer._() => null;

  void swim() {
    print("I'm swimming");
  }
}

abstract class Flyer {
  factory Flyer._() => null;

  void fly() {
    print("I'm flying");
  }
}

class Dolphin extends Mammal with Swimmer {}

class Bat extends Mammal with Walker, Flyer {}

class Cat extends Mammal with Walker {}

class Dove extends Bird with Walker, Flyer {}

class Duck extends Bird with Walker, Swimmer, Flyer {}

class Shark extends Fish with Swimmer {}

class FlyingFish extends Fish with Swimmer, Flyer {}

```

중요한 것은 mixin은 다중 상속이 아닌 선형화 구조를 통한 단일 상속입니다.