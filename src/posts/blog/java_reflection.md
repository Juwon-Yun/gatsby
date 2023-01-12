---
title: "Java 리플렉션"
category: "Java"
date: "2023-01-09 00:36:00 +09:00"
desc: "자바의 Reflection API"
thumbnail: "./images/java/java_logo_2.jpg"
alt: "java"
---

![image](https://user-images.githubusercontent.com/85836879/211205537-228455cf-8780-440c-a18b-74cc7497f66a.png)

### 들어가며

컴파일 언어인 자바에선 동적으로 객체를 생성하는 방법이 없어 리플렉션(Reflection) 방법으로 객체를 동적으로 생성할 수 있게 되었습니다.

자바의 리플렉션은 다음과 같은 데이터를 분석하거나 가져올 수 있습니다.
- Class
- Constructor
- Method
- Field

자바의 리플렉션 API의 기능으로 객체의 타입은 모른채 해당 객체의 메모리 값만으로 객체의 메소드, 타입, 변수에 접근 가능하게 하는 것이 대표 기능입니다.

Class 문법을 사용한 리플렉션
```java
public class Person {
    private int age;

    public Person(int age){
        this.age = age;
    }

    public void setAge(int age){
        this.age = age;
    }

    public int getAge() {
        return age;
    }
}

///

public static void main(String[] args) {
    Object superPerson = new Person(10);

    superPerson.setAge(10); /// Error: cannot find symbol
}

```

자바는 컴파일 타임에 객체의 타입이 결정됩니다. 

즉, superPerson 객체는 Object 타입으로 결정되었기 때문에 Object의 인스턴스 변수와 메소드만 접근 가능합니다.

cannot find symbol 에러로 구체적인 하위 클래스를 모르면 해당 클래스의 정보에 접근할 수 없다는 걸 알 수 있습니다.

이러한 컴파일 타임에 불가능한 방법을 가능하게 해결해 주는 것이 Reflection API 입니다.

위의 Person 클래스를 Reflection API 를 사용해 코드를 작성해 보겠습니다.

```java
public static void main(String[] args) throws Exception{
    Object superPerson = new Person(10);

    Class personClass = Person.class;

    Method age = personClass.getMethod("setAge");
    
    // invoke(getMothod의 객체, 메소드의 매개변수)
    age.invoke(superPerson, 20);

    Method getAge = personClass.getMethod("getAge");

    int age = (int)getAge.invoke(superPerson);

    System.out.println("나이는 " + age.toString() + "세 입니다."); // 나이는 20세 입니다.
}
```

setAge 메소드가 실행되어 10으로 초기화 했던 Person 객체의 인스턴스 변수 age가 20으로 출력되는 것을 알 수 있습니다.

위의 방법으로 Reflection API는 구체적인 Person의 타입을 알지 못하여도 setAge, getAge 메소드에 접근해 값을 가져올 수 있습니다.

정리하면, Reflection API는 클래스의 이름만 가지고 생성자, 필드, 메소드등의 클래스에 대한 정보를 가져올 수 있는 기능입니다.

### Reflection API의 원리

Java Virtual Machine의 런타임 동안 작성된 소스코드가 컴파일러를 지나 바이트 코드로 변환되어 static 영역에 저장되었을 때 Reflection API는 이 바이트 코드를 활용합니다.

클래스의 이름만 알고 있다면 static 영역에서 클래스의 정보를 가져올 수 있습니다.

### Reflection API의 단점
- 성능 오버헤드

자바의 컴파일 타임이 아닌 런타임에 동적으로 타입을 분석하고 정보를 가져오므로 JVM을 최적화 할 수 없습니다. 

또한, 직접 접근이 불가능한 private 지역변수, 메소드에 접근하기 때문에 내부에 노출하며 동시에 추상화 개념이 사라지게 됩니다.

- 매개변수는 알 수 없다.

Reflection API로 접근할 수 없는 정보 중 하나인 생성자의 매개변수 입니다.

### Reflection API의 사용
Reflection API는 사용자가 어떤 객체를 만들지 예측할 수 없을 떄, 프레임워크나 플러그인이 동적으로 객체를 불러오는 방법에서 많이 사용됩니다.

jetbrain의 InteliJ Idea, Spring, Hibernate 등에서 Reflection API를 사용하고 있습니다. 

스프링에서는 Spring 컨테이너의 BeanFactory에서 사용되고 있으며, Java Bean은 런타임 동안 객체가 호출될 때 동적으로 객체의 인스턴스를 BeanFactory에서 Reflaction 합니다.

### 마무리
Spring 이외에도 Spring Data JPA의 기본 생성자가 필수인 이유도 동적으로 객체의 인스턴스 변수와 값에 접근할 수 있어 사용되고 있습니다.

자바의 Reflection API는 **구체적이지 않는 객체를 동적으로 해결해주는 기능**입니다.

