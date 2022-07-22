---
title: "Clean Code 6장"
category: "Etc"
date: "2022-04-10 18:57:00 +09:00"
desc: "객체와 자료구조"
thumbnail: "./images/clean_code/cleancode_th.jpg"
alt: "형식 맞추기"
---

![Untitled](https://user-images.githubusercontent.com/85836879/170295027-fdccf73f-465c-4e3f-bbfa-a600ac89c472.png)

## 6장 객체와 자료구조

---

다른 개발자가 변수에 의존하지 않도록 변수는 비공개로 정의한다.

그렇다면 왜 조회함수(getter)와 설정함수(setter)를 당연하게 공개해 변수를 외부에 노출할까?

객체는 동작을 공개하고 자료는 숨긴다.

그래서 기존 동작을 변경하지 않으면서 새 객체 타입을 추가하기 쉬운 반면에 기존 객체에 새 동작을 추가하기는 어렵다.

자료구조는 별다른 동작 없이 자료를 노출한다.

그래서 기존 자료 구조에 새로운 동작을 추가하기는 쉽지만 기존 함수에 새 자료 구조를 추가하기는 어렵다.

## 목차

---

-   [x]  자료 추상화
-   [ ]  자료/객체 비대칭
-   [ ]  디미터 법칙
    -   [ ]  기차 충돌
    -   [x]  잡종 구조
    -   [ ]  구조체 감추기
-   [x]  자료 전달 객체
    -   [ ]  활성 레코드
-   [ ]  결론

## 6-1. 자료 추상화

---

변수 사이에 함수라는 계층을 넣는다고 구현이 저절로 감춰지지 않는다.

구현을 감추려면 추상화가 필요하다.

변수를 private으로 선언하더라도 각 값마다 조회 함수와 설정 함수를 제공한다면 구현을 외부로 노출하는 셈이다.

조회 함수와 설정 함수로 변수를 다룬다고 클래스가 되지는 않는다.

추상 인터페이스를 제공해 사용자가 구현을 모른 채 자료의 핵심을 조작할 수 있어야 진정한 클래스다.

구체적인 클래스 (구현을 외부로 노출하는 경우)

```java
public class Point{
    private double x;
    private double y;
}
```

추상적인 클래스 (구현을 완전히 숨기는 경우)

```java
public interface Point {
  double getX();
  double getY();
  void setCatesian(double x, double y);
  double getR();
  double getTheta();
  void setPolar(double r, double theta);
}
```

구체적인 함수 (구현을 외부로 노출하는 경우)

```java
public interface Vehicle {
  double getFuelTankCapacityInGallons();
  double getGallonsOfGasoline();
}
```

추상적인 함수 (구현을 완전히 숨기는 경우)

```java
public interface Vehicle {
  double getPercentFuelRemaining();
}
```

자료를 세세하게 공개하기보다는 추상적인 개념으로 표현해야 한다.

인터페이스와 조회 함수, 설정 함수만으로 추상화가 이뤄지지 않는다.

## 6-2. 자료/객체 비대칭

---

객체는 추상화 뒤로 자료를 숨긴 채 자료를 다루는 함수만 공개한다.

자료 구조는 자료를 그대로 공개하며 별다른 함수는 제공하지 않는다.

절차적인 도형 클래스 ( 자료 구조형 )

```java
public class Square {
    public Point topLeft;
    public double side;
}

public class Rectangle {
    public Point topLeft;
    public double height;
    public double width;
}

public class Circle {
    public Point center;
    public double radius;
    public double width;
}

public class Geometry {
    public final double PI = 3.141592653585793;

    public double area(Object shape) throws NoSuchShapeException {
        if(shape instanceOf Square) {
            Square s = (Square)shape;
            return s.side * s.side;
        }
    else if(shape instanceOf Rectangle) {
            Rectangle r = (Rectangle)shape;
            return r.height * r.width;
        }
    else if(shape instanceOf Circle) {
            Circle c = (Circle)shape;
            return PI * c.radius * c.radius
        }
    }
}
```

Geometry 클래스는 세 가지 도형 클래스를 다룬다.

절차적인 도형 클래스를 아무 메서드를 제공하지 않고, 자료 구조로 변환한 결과이다.

새 도형을 추가하고 싶다면 Geometry 클래스에 속함 함수를 모두 고쳐야한다.

자료 구조를 사용하는 절차적인 코드는 기존 자료 구조를 변경하지 않으면서 새 함수를 추가하기 쉽다.

절차지향 코드는 새로운 자료 구조를 추가하기 어렵고 추가하려면 모든 함수를 고쳐야 한다.

객체 지향적인 도형 클래스

```java
public class Square implements Shape {
    public Point topLeft;
    public double side;

    public double area() {
        return side*side;
    }
}

public class Rectangle implements Shape {
    public Point topLeft;
    public double height;
    public double width;

    public double area() {
        return height*width;
    }
}

public class Circle implements Shape {
    public Point center;
    public double radius;
    public double width;

    public double area() {
        return PI*radius*radius;
    }
}
```

area()는 다형 메서드라고 부른다.

새 도형을 추가해도 기존 함수에 아무런 영향을 미치지 않는다.

반면에 새 함수를 추가하고 싶다면 도형 클래스를 전부 고쳐야한다.

객체 지향 코드는 기존 함수를 변경하지 않으면서 새 클래스를 추가하기 쉽고 새로운 함수를 추가하기 어렵다.

추가하려면 모든 클래스를 수정해야 한다.

## 6-3. 디미터 법칙

---

> 메소드가 반환하는 객체의 메소드를 사용하면 안되는 법칙.

모듈은 자신이 조작하는 객체의 속성을 몰라야 한다.

객체는 자료를 숨기고 함수는 공개한다.

즉, 객체는 조회 함수로 내부를 공개하면 안 된다는 의미이다.  
  

내부구조를 숨기지 않고 노출하는 셈이다.

### 6-3-1. 기차 충돌

---

```java
String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
```

여러 객체가 한 줄로 이어진 기차처럼 보인다.

메소드가 반환하는 객체의 메소드를 사용하므로 디미터 법칙 위반이다.

JavaScript 메소드 체이닝은 자료구조만 반환하기 때문에 가능한 이유다.

아래 코드로 변환하는 것이 바람직한 객체지향 표현이다.

```java
Options opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
String outputDir = scratchDir.getAbsolutePath();
```

ctxt, opts, scratchDir이 객체라면 디미터 법칙을 위반한다.

하지만 자료 구조라면 내부 구조를 노출하므로 디미터 법칙이 적용되지 않는다.

```java
final String outputDir = cxtx.opts.scratchDir.absolutePath;
```

코드를 위와 같이 구현했다면 디미터 법칙을 거론할 필요가 없이 자료 구조는 무조건 함수 없이 공개 변수만 포함하고 객체는 비공개 변수와 공개 함수를 포함한다면 된다.

### 6-3-2. 잡종 구조

---

절반은 객체이며 절반은 자료 구조인 잡종 구조가 존재한다.

공개 변수, 공개 함수, 주요 함수, getter와 setter가 모두 섞여 있는 구조

클래스, 자료 구조 양쪽에서 단점만 모아 놓은 프로그래머가 피해야 할 구조

( 새로운 함수와 새로운 자료 구조도 추가하기 어렵다 )

### 6-3-3. 구조체 감추기

---

```java
BufferedOutputStream bos = ctxt.createScratchFileStream(classFileName);
```

폴더 경로를 얻는 목적이 임시 파일 생성을 위함이라면 ctxt 객체가 최종 목적인 임시 파일을 생성하도록 지시한다.

결과적으로 ctxt 객체는 내부구조를 드러내지 않으며 함수는 자신이 몰라야 하는 여러 객체를 탐색할 필요가 없다.

## 6-4. 자료 전달 객체

---

자료 구조체의 전형적인 형태는 공개 변수만 존재하고 함수는 없는 클래스이다.

이런 자료 구조를 DTO라고 한다.

💡 DTO : 공개 변수만 존재하고 함수가 없는 클래스

Bean : 비공개 변수와 getter, setter가 존재하는 클래스

활성 레코드 : 공개, 비공개 변수와 getter, setter, 탐색 함수가 존재하는 클래스

## 결론

---

> 객체는 동작을 공개하고 자료는 숨긴다.

-   기존 동작을 변경하지 않으면서 새로운 객체 타입을 추가하기 쉽다.
-   기존 객체에 새로운 동작을 추가하기 어렵다.

> 자료 구조는 별다른 동작 없이 자료를 노출한다.

-   기존 자료구조에 새로운 동작을 추가하기 쉽다.
-   기존 함수에 새로운 자료 구조를 추가하기 어렵다.

이상적인 구조

객체 : 비공개 변수와 공개 함수만 포함한다.

자료 구조 : 함수 없이 공개 변수만 포함한다.

적합한 쓰임새

객체 : 새로운 자료 타입의 추가

자료 구조 : 새로운 메서드 추가

## 7\. 오류 처리

---