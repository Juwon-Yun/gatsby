---
title: "Clean Code 7장"
category: "Etc"
date: "2022-04-10 19:17:00 +09:00"
desc: "오류 처리"
thumbnail: "./images/clean_code/cleancode_th.jpg"
alt: "오류 처리"
---

![Untitled](https://user-images.githubusercontent.com/85836879/170295027-fdccf73f-465c-4e3f-bbfa-a600ac89c472.png)

## 7장 오류 처리

---

깨끗하고 튼튼한 코드에 다가가는 오류를 처리하는 기법과 고려 사항을 소개하는 챕터.

오류 처리는 프로그램에 반드시 필요한 요소 중 하나이다.

무언가 잘못될 가능성은 늘 존재한다.

무언가 잘못되면 바로 잡을 책임은 우리 프로그래머에게 있다.

오류 처리 코드로 인해 프로그램의 논리를 이해하기 어렵다면 깨끗한 코드가 아니다.

## 목차

---

-   [x]  오류 코드보다 예외를 사용하라
-   [ ]  Try-Catch-Finally 문부터 작성하라
-   [ ]  미확인( unchecked ) 예외를 사용하라
-   [ ]  예외에 의미를 제공하라
-   [ ]  호출자를 고려해 예외 클래스를 정의하라
-   [ ]  정상 흐름을 정의하라
-   [x]  null을 반환하지 마라
-   [x]  null을 전달하지 마라
-   [ ]  결론

## 7-1. 오류 코드보다 예외를 사용하라

---

예외 처리를 지원하지 않는 언어의 경우 호출자에게 호류 코드를 반환하는 방법이 전부였다.

```java
public class DeviceController {

DeviceHandle handle = getHandle(DEV1);

    // 디바이스 상태 점검
    if (handle != DeviceHandle.INVALID) {

        // 레코드 필드에 디바이스 상태 저장
        retrieveDeviceRecord(handle);

        // 디바이스가 일시정지가 아니라면 종료
        if (record.getStatus() != DEVICE_SUSPENDED) {
            closeDevice(handle);
        } else {
            logger.log("Device suspended. Unable to shut down");
        } else {
            logger.log("Invalid handle");
        }
    }
}
```

예외 처리를 사용하지 않는 오류 코드는 오류 확인을 잊기 쉽다.

호출한 즉시 오류를 확인해야 하기 때문에 호출자 코드가 복잡해진다.

예외 처리를 사용한 코드

( 예외란? 프로그램이 실행 중에 정상적인 프로그램의 흐름에 어긋나는 이벤트 )

```java
public class DeviceController {

// 오류를 처리하는 알고리즘
public void sendShutDown() {
    try {
        tryToShutDown();
    } catch (DeviceShutDownError e) {
        logger.log(e);
    }
}

// 디바이스를 종료하는 알고리즘
private void tryToShutDown() {
    DeviceHandle handle = getHandle(DEV1);
    DeviceRecord record = retrieveDeviceRecord(handle);

    pauseDevice(handle);
    clearDeviceWorkQueue(handle);
    closeDevice(handle);
}

private DeviceHandle getHandle(DeviceId id) {
    ...
    throw new DeviceShutDownError("Invalid handle for: " + id.toString());
    ...
    }
}
```

디바이스를 종료하는 알고리즘과 오류를 처리하는 알고리즘을 분리했기 때문에

코드의 품질과 가시성이 좋아졌다.

이게는 각 개념을 독립적으로 보고 이해할 수 있다.

## 7-2. Try-Catch-Finally문부터 작성하라

---

프로그램 안에 예외 범위를 정의한다는 사실이 흥미롭다.

try 블록에 들어가는 코드를 실행하면 어느 시점에서든 실행이 중단된 후 catch 블록으로 넘어갈 수 있다.

try-catch-finally문을 시작으로 코드를 작성하면 호출자가 기대하는 상태를 정의하기 쉬워진다.

try 블록에서 무슨일이 생기든 catch 블록은 프로그램 상태를 일관성 있게 유지한다.

TDD ( 테스트 주도 개발 ) 방식으로 메서드 구현.

```java
@Test(expected = StorageException.class)
public void retrieveSectionShouldThrowOnInvalidFileName() {
    sectionStore.retrieveSection("invalid - file");
}
```

단위 테스트 단계부터 코드 리펙토링이 가능하다.

단위 테스트에 맞춰 구현한 예시코드.

```java
public List<RecordedGrip> retrieveSection(String sectionName) {
    try{
        FileInputStream stream = new FileInputStream(sectionName);
        stream.close();
    } catch (FileNotFoundException e) {
        throw new StorageException("retrieval error", e);
    }
    return new ArrayList<RecordedGrip>();
}
```

단위 테스트에 맞추어 코드를 작성하는 방법

1.  강제로 예외를 발생시키는 테스트 케이스를 작성한 후 테스트를 통과하게 코드를 작성한다.
2.  try-catc 구조로 범위를 정의하고 TDD를 사용해 필요한 나머지 알고리즘을 추가한다.

결과 : try 블록의 범위부터 구현하게 되므로 try 블록의 본질을 유지하기 쉬워진다.

## 7-3. 미확인(unchecked)예외를 사용하라

---

미확인 예외란 실행 단계에서 확인되며 명시적인 처리를 강제하지 않는 예외를 말한다.

-   NullPointerException
-   IllegalArgumentException
-   IndexOutOfBoundException
-   SystemException

확인 예외는 컴파일 단계에서 확인되며 반드시 처리해야 하는 예외를 말한다.

-   IOException
-   SQLException

확인된 예외는 선언부의 수정을 필요로 하기 때문에 모듈의 캡슐화를 깨버린다.

-   의존성의 비용

> OCP ( Open Closed Principle ), 개방 폐쇠 원칙

기능을 추가하거나 변경해야할 때 제대로 동작하고 있는 기존 코드를 변경하지 않아도

기존의 코드에 새로운 코드를 추가함으로써 기능의 추가나 변경이 가능하게 하는 규칙이다.

따라서 확인된 예외는 예상되는 모든 예외를 사전에 처리할 수 있다는 장점이 있지만 일반적인 애플리케이션은 의존성이라는 비용이 이익보다 더 크다.

단순히 출력을 하는 메소드

```java
public void printA(bool flag) {
    if(flag) System.out.println("called");
}

public void func(bool flag) {
    printA(flag);
}
```

출력 하지 않을때 예외를 던지는 메서드

```java
public void printA(bool flag) throws NotPrintException {
    if(flag){
        System.out.println("called");
    } else {
        throw new NotPrintException();
    }
}

public void func(bool flag) throws NotPrintException {
    printA(flag);
}
```

해당 함수 뿐만 아니라 호출하는 함수까지 수정을 해야하기 때문에 OCP를 위반하게 된다.

## 7-4. 예외에 의미를 제공하라

---

예외를 던질 때 전후 상황을 충분히 제공하면 오류가 발생하는 원인과 위치를 찾기가 쉬워진다.

호출 스택으로는 오류에 대한 정보가 부족하다.

오류 메세지에 정보( 실패한 연산 이름, 실패 유형 등 )을 충분히 추가 혹은 기재한다.

## 7-5. 호출자를 고려해 예외 클래스를 정의하라

---

오류를 정의해 분류하는 방법은 프로그래머에게 오류를 잡아내는 방법이 되어야 한다.

오류를 외부 라이브러리가 잡아내는 나쁜 코드

```java
ACMEPort port = new ACMEPort(12);

try {
    port.open();
} catch (DeviceResponseException e) {
    reportPortError(e);
    logger.log("Device response exception", e);
} catch (ATM1212UnlockedException e) {
    reportPortError(e);
    logger.log("Unlock exception", e);
} catch (GMXError e) {
    reportPortError(e);
    logger.log("Device response exception");
} finally {...}
```

호출하는 라이브러리 API를 감싸 예외 유형을 하나로 반환하는 코드로 고쳤을 때

```java
public class LocalPort {
    private ACMEPort innerPort;

    public LocalPort(int portNumber) {
        innerPort = new ACMEPort(portNumber);
    }

    public void open() {
        try {
            innerPort.open();
        } catch (DeviceResponseException e) {
            throw new PortDeviceFailure(e);
        } catch (ATM1212UnlockedException e) {
            throw new PortDeviceFailure(e);
        } catch (GMXError e) {
            throw new PortDeviceFailure(e);
        }
    }

/*
LocalPort는 ACMEPort 클래스가 던지는 예외를 잡아 반환하는 Wrapper 클래스이다.
*/
LocalPort port = new LocalPort(12);

    try {
        port.open();
    } catch (PortDeviceFailure e) {
        reportError(e);
        logger.log(e.getMessage(), e);
    } finally {...}
}
```

위의 코드대로 외부 라이브러리 ACMEPort 클래스를 감쌌을 때의 장점

-   에러처리가 간결해진다.
-   외부 라이브러리와 프로그램 사이의 의존성이 크게 줄어든다.
-   프로그램 테스트가 쉬워진다.
-   외부 API 설계 방식에 의존하지 않아도 된다.

## 7-6. 정상 흐름을 정의하라

---

클래스나 객체가 예외적인 상황을 캡슐화하여 처리해 클라이언트 코드가 예외적인 상황을 처리할 필요가 없도록 할 수 있다.

총계를 계산하는 예시코드이다.

```java
try {
    MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
    total += expenses.getTotal();
} catch(MealExpencesNotFound e) {
    total += getMealPerPrice();
}

public class PerDiemMealExpenses implements MealExpenses {
    public int getTotal() {
        // 일일 기본 식비를 반환
        // 예외를 처리하는 코드 작성
        try{...} catch (Exception e){...}
    }
}

// 결과적으로 예외적인 상황을 캡슐화함
MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
m_total += expenses.getTotal();
```

## 7-7. null을 반환하지 마라

---

null을 반환하는 습관은 좋은 습관이 아니다.

호출자에게 null 여부를 체크할 의무를 준다.

NullPointerException의 발생 위험이 있음

null 유효성 검사가 너무 많아진다.

null을 반환하기 보다 예외를 던지거나 특정한 객체를 반환하는 것이 낫다.

```java
List<Employee> employees = getEmployees();
    for(Employee employee : employees) {
        totalPay += employee.getPay();
    }

public List<Employee> getEmployees() {
    if (employees.size() == 0){
        return Collections.emptyList();
    }
}
```

코드가 깔끔해지며 NullPointerException이 발생할 가능성도 줄어든다.

자바는 null에 대한 명시가 없기 때문에 NullPointException을 가늠하기 어렵다.

## 7-8. null을 전달하지 마라

---

메서드에서 null을 반환하는 방식도 나쁘지만 null을 전달하는 방식은 더 나쁘다.

프로젝트 초기단계에 null을 전달하는 경우를 금지하는 것이 바람직하다.

## 결론

---

깨끗한 코드는 읽기에도 좋지만 안정성도 고려해야한다.

오류 처리를 프로그램 알고리즘과 분리하는 깨끗한 코드를 작성하면 읽는 사람의 독립적인 추론이 가능해지며

유지보수성도 올라간다.

## 책에 없는 예외 이야기

---

예외와 에러의 차이점

 - 에러는 메모리 부족( OutOfMemoryError )이나 스택오버플로우( StackOverFlowError )와 같이 발생하면 복구할 수 없는 심각한 오류

 - 예외는 발생하더라도 수습될 수 있는 오류
  
예외 클래스 계층 구조

-   Object
    -   Throwable
    -   Exception
        -   RuntimeException
        -   ArithmeticException
        -   ClassCastException
        -   NullPointerException
        -   IndexOutOfBoundException
        -   IOException
    -   Error

예외 클래스는 Exception 클래스와 해당 자식들과 RuntimeException 클래스와 자식들로 나뉜다.

Exception 클래스 : 사용자의 실수와 같은 외적인 요인에 의해 발생하는 예외

RuntimeException 클래스 : 개발자의 실수로 발생하는 예외

## 8장 경계

---