---
title: "Clean Code 8장"
category: "Etc"
date: "2022-04-14 23:42:00 +09:00"
desc: "경계"
thumbnail: "./images/clean_code/cleancode_th.jpg"
alt: "경계"
---

![Untitled](https://user-images.githubusercontent.com/85836879/170295027-fdccf73f-465c-4e3f-bbfa-a600ac89c472.png)

## 8장 경계

---

시스템에 들어가는 모든 소프트웨어를 직접 개발하는 경우는 드물다.

오픈소스를 이용하거나 사내에 다른 개발팀이 제공하는 컴포넌트를 이용하거나, 어떤 식으로든 이 외부코드를 우리 코드에 깔끔하게 통합해야 한다.

이 장에서는 소프트웨어 경계를 깔끔하게 처리하는 기법과 기교를 살펴본다.

## 목차

---

-   [ ]  외부 코드 사용하기
-   [x]  경계 살피고 익히기
-   [ ]  log4j 익히기
-   [ ]  학습 테스트는 공짜 이상이다
-   [x]  아직 존재하지 않는 코드를 사용하기
-   [ ]  깨끗한 경계

## 8-1. 외부 코드 사용하기

---

패키지 제공자나 프레임워크 제공자는 적용성을 최대한 넓히려 애쓴다.

더 많은 환경에서 돌아가야 더 많은 고객이 구매하기 때문

반면 사용자는 자신의 요구에 집중하는 인터페이스를 바란다.

이러한 차이로 시스템 경계에 문제가 생길 소지가 많다.

java.util.Map이 예시다.

Map이 제공하는 기능과 유연성은 확실하지만 그 만큼 위헝성도 크다.

Map의 clear() 메서드는 Map의 사용자라면 누구나 Map 내용을 지울 권한이 있다.

설계시 Map에 특정 유형만 저장하기로 결정했지만 Map에서 객체 유형을 제한하지 않기 때문에 사용자는 어떤 객체 유형도 추가할 수 있다.

```java
Map sensors = new HashMap();
Sensor senser = (Sensor) sensor.get(sensorId);
```

위의 코드는 Map을 사용하는 클라이언트에게 형 변환할 책임을 부여하기 때문에 아래와 같이 제네릭을 사용하는 것이 좋다.

```java
Map<String, Sensor> sensors = new HashMap<>();
Sensor senser = sensors.get(sensorId);
```

하지만 이 방법도 사용자에게 필요하지 않은 기능까지 제공하는 문제를 해결하지 못한다.

아래처럼 조금 더 깔끔하게 Sensor 안에서 제네릭 사용여부를 결정하면 어떨까

```java
public class Sensor{
    private Map sensors = new HashMap();

    public Sensor getById(String id){
        return (Sensor) sensors.get(Id);
    }
}
```

경계 인터페이스인 Map을 Sensor 클래스 안으로 숨긴다.

Map 인터페이스가 변하더라도 나머지 프로그램에는 영향을 미치지 않는다.

제네릭을 사용하든 하지 않든 더 이상 문제가 안된다.

Sensor 클래스 안에서 객체 유형을 관리하고 변환하기 때문이다.

Map 인터페이스를 사용할 때마다 위와 같이 캡슐화하라는 말이 아니다.

Map을 여기저기 넘기지 말라는 말이다.

Map과 같은 경계 인터페이스를 사용할 때는 이를 이용하는 클래스나 클래스 계열 밖으로 노출되지 않도록 주의한다.

Map 인스턴스를 공개 API 인수로 넘기거나 반환값으로 사용하지 않는다.

## 8-2. 경계 살피고 익히기

---

외부 코드를 사용하면 적은 시간에 더 많은 기능을 출시하기 쉬워진다.

외부 패키지 테스트는 우리 책임이 아니지만 우리 자신을 위해 우리가 사용할 코드는 테스트하는 편이 바람직하다.

다른 회사 라이브러리를 가져왔으나 사용법이 분명하지 않을 때 대개 하루나 이틀 이상 문서를 읽으며 사용법을 결정한다.

그런 다음 우리쪽 코드를 작성해 라이브러리가 예상대로 동작하는지 확인한다.

외부 코드를 익히기는 어렵다.

외부 코드를 통합하기도 어렵다.

만약 곧바로 우리쪽 코드를 작성해 외부 코드를 호출하는 대신 먼저 간단한 테스트 케이스를 작성해 외부 코드를 익히면 어떻까?

짐 뉴커크는 이를 학습 테스트라고 부른다.

학습 테스트는 프로그램에서 사용하려는 방식대로 외부 API를 호출한다.

통제된 환경에서 API를 제대로 이해하는 지를 확인하는 셈이다.

학습 테스트는 API를 사용하려는 목적에 초점을 맞춘다.

## 8-3. log4j 익히기

---

로깅 기능을 직접 구현하는 대신 아파치 log4j 패키지를 사용한다고 가정한다.

문서를 자세히 읽기 전에 먼저 첫 번째 테스트 케이스를 작성한다.

```java
@Test
public void testLogCreate(){
    Logger logger = Logger.getLogger("NewLogger");
    logger.info("hello");
}
```

테스트를 돌렸더니 consoleAppender라는 클래스가 필요하다는 오류가 발생했다.

```java
@Test
public void testLogAddAppender() {
    Logger logger = Logger.getLogger("NewLogger");
    ConsoleAppender appender = new ConsoleAppender();
    logger.addAppender(appender);
    logger.info("hello");
}
```

ConsoleAppender.SYSTEM\_OUT 인수를 제거했더니 문제가 없다.

PatternLayout을 제거했더니 출력 스트림이 없다는 오류가 뜬다.

log4j가 돌아가는 방식을 이해하고 여기서 얻은 지식을 간단한 단위 테스트 케이스 몇 개로 표현했다.

```java
public class LogTest {
    private Logger logger;
@Before
public void initialize() {
    logger = Logger.getLogger("NewLogger");
    logger.removeAllAppenders();
    Logger.getRootLogger().removeAllAppenders();
}

@Test
public void basicLogger() {
    BasicConfigurator.configure();
    logger.info("basicLogger");
}

@Test
public void addAppenderWithStream() {
    logger.addAppender(new ConsoleAppender(new PatternLayout("%p %t %m%n"), ConsoleAppender.SYSTEM_OUT));
    logger.info("addAppenderWithStream");
}

@Test
public void addAppenderWithoutStream() {
    logger.addAppender(new ConsoleAppender(new PatternLayout("%p %t %m%n")));
    logger.info("addAppenderWithoutStream");
    }
}
```

이제 필요한 부분을 독자적인 클래스로 캡슐화한다.

## 8-4. 학습 테스트는 공짜 이상이다.

---

학습 테스트에 드는 비용은 없다.

API를 배워야 하므로 필요한 지식만 확보하는 손쉬운 방법이다.

학습 테스트는 이해도를 높여주는 정확한 실험이다.

학습 테스트는 공짜 이상이다.

투자하는 노력보다 얻는 성과가 더 크다.

패키지 새 버전이 나온다면 학습 테스트를 돌려 차이가 있는지 확인한다.

학습 테스트는 패키지가 예상대로 작동하는지 검증한다.

패키지가 우리 코드와 호환되리라는 보장은 없다.

패키지 작성자에게 코드를 변경할 필요가 생길지도 모른다.

패키지 작성자는 버그를 수정하고 기능도 추가한다.

패키지 새 버전이 나올 때마다 새로운 위험이 생긴다.

새 버전이 우리 코드와 호환되지 않으면 학습 테스트가 이 사실을 곧바로 밝혀낸다.

학습 테스트를 이용한 학습이 실제 코드와 동일한 방식으로 인터페이스를 사용하는 테스트 케이스가 필요하다.

이러한 경계 테스트가 있다면 패키지의 새 버전으로 이전하기 쉬워진다.

그렇지 않다면 낡은 버전을 필요 이상으로 오래 사용하려는 유횩에 빠지기 쉽다.

## 8-5. 아직 존재하지 않는 코드를 사용하기

---

경계와 관련해 또 다른 유형은 아는 코드와 모르는 코드를 분리하는 경계다.

때로는 우리 지식이 경계를 너머 미치지 못하는 코드 영역도 있다.

때로는 알려고 해도 알 수가 없다.

때로는 더 이상 내다보지 않기로 결정한다.

## 8-6. 깨끗한 경계

---

경계는 변경이 많고 소프트웨어 설계가 우수하다면 변경하는데 많은 투자와 재작업이 필요하지 않다.

엄청난 시간과 노력과 재작업을 요구하지 않는다.

통제하지 못하는 코드를 사용할 때는 너무 많은 투자를 하거나 향후 변경 비용이 지나치게 커지지 않도록 각별히 주의해야 한다.

경계에 위치하는 코드는 깔끔히 분리한다.

기대치를 정의하는 테스트 케이스도 작성한다.

작성하는 코드에서 외부 패키지를 세세하게 알아야 할 필요는 없다.

통제가 불가능한 외부 패키지에 의존하는 대신 통제가 가능한 우리 코드에 의존하는 편이 훨씬 좋다.

잘못 사용한다면 외부 코드에 휘둘리고 만다.

외부 패키지를 호출하는 코드를 가능한 줄여 경계를 관리하자.

Map에서 봤듯이 새로운 클래스로 경계를 감싸거나 아니면 ADAPTER 패턴을 이용해 우리가 원하는 인터페이스를 패키지가 제공하는 인터페이스로 변환하자.

어느 방법이든 코드 가독성이 높아지며 경계 인터페이스를 사용하는 일관성도 높아지고 외부 패키지가 변했을 때 변경할 코드도 줄어든다.

## 결론

---

어댑터 패턴 ( ADAPTER )

어댑터 패턴은 하나의 클래스의 인터페이스를 사용하려는 다른 인터페이스로 형 변환할 때 주로 사용한다.

어댑터 패턴은 인터페이스 호환성이 맞지 않아 같이 쓸 수 없는 클래스와 연관 관계로 연결해서 사용할 수 있게 해주는 패턴이다.

어댑터 패턴의 장점

-   관계가 없는 인터페이스간 같이 사용 가능
-   프로그램 검사가 용이하다
-   클래스 재활용성 증가

어댑터 패턴은 기존 클래스의 소스코드를 수정해 사용할 인터페이스에 적용하는 작업보단

기존 클래스의 코드 수정을 전혀 하지 않고 타겟 인터페이스에 맞춰서 동작을 가능하게 한다.

기존 클래스의 명세( 사양 )만 알면 얼마든지 새로운 클래스로 작성할 수 있다는 것이다.

이를 통해 코드가 깨끗해지도 유지보수성도 증가한다.

# 9장 단위테스트

---