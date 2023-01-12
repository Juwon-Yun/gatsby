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