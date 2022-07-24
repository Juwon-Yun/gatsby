---
title: "Clean Code 11장"
category: "Etc"
date: "2022-04-18 00:33:00 +09:00"
desc: "시스템"
thumbnail: "./images/clean_code/cleancode_th.jpg"
alt: "시스템"
---

![Untitled](https://user-images.githubusercontent.com/85836879/170295027-fdccf73f-465c-4e3f-bbfa-a600ac89c472.png)

## 11장 시스템

---

> 복잡성은 죽음이다. 개발자에게서 생기를 앗아가며, 제품을 계획하고 제작하고 테스트하기 어렵게 만든다.

소프트웨어 시스템은 준비 과정과 준비 이후 런타임 로직을 분리해야 한다.

시스템 수준에 있어서 여러가지 깨끗함을 유지하는 방법, 기법을 알려주는 챕터.

## 목차

---

-   [ ]  도시를 세운다면?
-   [x]  시스템 제작과 시스템 사용을 분리하라
    -   [ ]  Main 분리
    -   [ ]  팩토리
    -   [ ]  의존성 주입
-   [ ]  확장
    -   [x]  횡단(cross-cutting)관심사
-   [x]  자바 프록시
-   [x]  순수 자바 AOP 프레임워크
-   [x]  AspectJ 관점
-   [ ]  테스트 주도 시스템 아키텍처 구축
-   [ ]  의사 결정을 최적화하라
-   [ ]  명백한 가치가 있을 때 표준을 현명하게 사용하라
-   [ ]  시스템은 도메인 특화 언어가 필요하다

## 11-1. 도시를 세운다면?

---

도시를 건설하고 관리하는 것에 한 사람 만으로는 충분하지 않지만 그래도 도시는 돌아간다.

그것은 도시라는 거대한 덩어리를 수도, 전원, 교통 등의 모듈로 모듈화하고 관리되기 때문이다.

일정 수준의 추상화를 통해 큰 그림에 대한 이해 없이도 도시는 돌아간다.

소프트웨어 또한 이와 비슷한 방식으로 구성되기는 하나 도시의 모듈화 만큼의 추상화를 이루지 못하는 경우가 많다.

깨끗한 코드를 구현하면 낮은 추상화 수준에서 관심사를 분리하기 쉬워진다.

높은 추상화 수준 ( 시스템 수준 )에서도 깨끗함을 유지하는 방법을 살펴본다.

## 11-2. 시스템 제작과 시스템 사용을 분리하라

---

제작과 사용은 아주 다르다는 사실을 명심한다.

시작 단계는 애플리케이션이 풀어야 할 관심사이다.

관심사 분리는 우리 분야에서 가장 오래되고 가장 중요한 설계 기법 중 하나이다.

시작 단계와 런타임 로직을 분리하지 않은 예시 코드

```java
public Service getService() {
    if (service == null)
        service = new MyServiceImpl(...); // 모든 상황에 적합한 기본값일까?
    return service;
}
```

초기화 지연 ( Lazy Initialization ) 혹은 계산 지연 ( Lazy Evaluation ) 방식의 장단점.

장점

-   실제 필요할 때까지 객체를 만들지 않는다. 따라서 애플리케이션 시작 시간이 빨라진다.
-   어떤 경우에도 null을 반환하지 않는다.

단점

-   런타임 로직에서 MyServiceImpl을 전혀 사용하지 않아도 의존성을 해결하지 않으면 컴파일이 안된다.
-   MyServiceImpl이 무거운 객체라면 단위 테스트에서 getService 메서드를 호출하기 위해 호출하기 적절한 테스트 전용 객체(Test double이나 Mock object)를 service 필드에 할당해야 한다.

```
체계적이고 탄탄한 시스템을 만들고 싶다면 설정 논리는 일반 실행 논리와 분리해야 모듈성이 높아진다.
```

또한 주요 의존성을 해소하기 위한 방식인 전반적이며 일관적인 방식도 필요하다.

### 11-2-1. Main 분리

---

시스템 생성과 시스템 사용을 분리하는 한 가지 방법

[##_Image|kage@8cwbN/btrzzo8wiQZ/CCxpG1nANJ35po6MBL919K/img.png|CDM|1.3|{"originWidth":484,"originHeight":242,"style":"alignCenter","filename":"Untitled 1.png"}_##]

생성과 관련한 코드는 모두 main이나 main이 호출하는 모듈로 옮기고 나머지 시스템은 모두 객체가 생성되었고 모든 의존성이 연결되었다고 가정한다.

-   main 함수에서 시스템에 필요한 객체를 생성한 후 이를 어플리케이션에 넘긴다.
-   어플리케이션은 해당 객체를 사용한다.
-   어플리케이션은 main이나 객체가 생성되는 과정은 전혀 모르고 단지 모든 객체가 적절히 생성되었다고 가정한다.

### 11-2-2. 팩토리

---

때로는 객체가 생성되는 시점을 어플리케이션이 결정해야할 필요도 생긴다.

![https://user-images.githubusercontent.com/37948906/125300462-03ce8400-e365-11eb-8354-3f8bbbf3563a.png](https://user-images.githubusercontent.com/37948906/125300462-03ce8400-e365-11eb-8354-3f8bbbf3563a.png)

예를 들어, 주문 처리 시스템에서 어플리케이션은 LineItem 인스턴스를 생성해 Order에 넘긴다. 이때는 Abstract Factory 패턴을 사용한다.

-   LineItem을 생성하는 시점은 어플리케이션이 결정하지만 LineItem을 생성하는 코드는 어플리케이션이 모른다.
-   마찬가지로 모든 의존성이 main에서 OrderProcessing 어플리케이션으로 향한다.
-   OrderProcessing 어플리케이션은 LineItem이 생성되는 구체적인 방법은 모른다.
-   방법은 LineItemFactoryImplementation이 알고 있다.
-   OrderProcessing 어플리케이션은 LineItem 인스턴스가 생성되는 시점을 완벽하게 통제하며 필요하다면 OrderProcessing 어플리케이션에서 사용하는 생성자 인수도 넘길 수 있다.

### 11-2-3. 의존성 주입

---

사용과 제작을 분리하는 강력한 매커니즘 중 하나가 `의존성 주입(Dependency Injection)` 이다.

의존성 주입은 `제어 역전 (Inversion of Control)` 기법을 의존성 관리에 적용한 메커니즘이다.

제어 역전에서는 한 객체가 맡은 보조 책임을 새로운 객체에게 전적으로 떠넘긴다.

새로운 객체는 넘겨받은 책임만 맡으므로 단일 책임 원칙 (SRP)을 지키게 된다.

의존성 관리 맥락에서는 객체는 의존성 자체를 인스턴스로 만드는 책임을 지지 않는다.

대신에 이런 책임을 다른 '전담' 메커니즘에 넘겨야 한다. 그렇게 함으로써 제어를 역전한다.

초기 설정은 시스템 전체에서 필요하므로 대개 '책임질' 메커니즘으로 'main' 루틴이나 특수 컨테이너를 사용한다.

## 11-3. 확장

---

성장에는 고통이 따른다.

꽉 막힌 도로를 처음부터 왜 넓게 만들지 않았는지에 대한 의문을 든적이 있는 것처럼 다른 방식으로 확장이 일어나기 어렵다.

성장할지 모르는 기대로 확장에 들어가는 비용을 정당화 할 수 있을까? ( 반길까? )

처음부터 올바르게 시스템을 만들 수 있다는 믿음은 미신이다.

오늘은 주어진 사용자 스토리에 맞춰 시스템을 구현하고

내일은 새로운 스토리에 맞춰 시스템을 조정하고 확장하면 된다.

이것이 반복적이고 점진적인 `애자일 방식의 핵심`이다.

테스트 주도 개발 ( TDD ), 리팩터링으로 얻어지는 깨끗한 코드는 코드 수준에서 시스템을 조정하고 확장하기 쉽게 만든다.

하지만 시스템 수준에서는 단순한 아키텍쳐를 복잡한 아키텍쳐로 조금씩 키울 수 없다는 현실이 정확하다.

> 소프트웨어 시스템은 물리적인 시스템과 다르다. 관심사를 적절히 분리해 관리한다면 소프트웨어 아키텍쳐는 점직적으로 발전 할 수 있다.

### 11-3-1. 횡단(cross-cutting) 관심사

---

모듈화되고 캡슐화된 방식으로 영속성 방식을 구상할 수 있다.

영속성 프레임워크 또한 모듈화 할 수 있다와 도메인 논리도 모듈화 할 수 있다라는 말에서 `횡단 관심사`라는 용어가 나온다.

원론적으로 모듈화되고 캡슐화된 방식으로 영속성 방식을 구상할 수 있다.

하지만 현실적으로 영속성 방식을 구현한 코드가 온갖 객체로 흩어진다.

AOP에서 특정 관점(Aspect)라는 모듈 구성 개념은 "특정 관심사를 지원하려면 시스템에서 특정 지점들이 동작하는 방식을 일관성 있게 바꿔야 한다"라고 명시한다.

영속성을 예로 들면 프로그래머는 영속성으로 저장할 객체와 속성을 선언한 후 영속성 책임을 영속성 프레임워크에게 위임한다.

AOP 프레임워크는 대상 코드에 영향을 미치지 않는 상태로 동작 방식을 변경한다.

자바에서 사용하는 Aspect or Aspect와 유사한 메커니즘 3가지를 소개한다.

## 11-4. 자바 프록시

---

단순한 상황에 적합하다.

개별 객체나 클래스에서 메서드 호출을 감싸는 경우이다.

JDK에서 제공하는 동적 프록시는 인터페이스만 지원한다.

코드의 행과 크기가 크다는 것이 프록시의 두가지 단점이다.

또한 프록시는 시스템 단위로 `실행 지점`을 명시하는 메커니즘을 제공하지 않는다.

은행 애플리케이션에서 계좌 목록을 가져오는 메서드 예시 코드.

```java
import java.utils.*;
// 은행 추상화
public interface Bank {
    Collection<Account> getAccounts();
    void setAccounts(Collection<Account> accounts);
}

// BackInpl.java
import java.utils.*;
// 추상화를 위한 POJO("Plain Old Java Object") 구현
public class BankImpl implements Bank {
    private List<Account> accounts;

    public Collection<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(Collection<Account> accounts) {
        this.accounts = new ArrayList<Account>();
        for (Account account: accounts) {
            this.accounts.add(account);
        }
    }
}

// BankProxyHandler.java
import java.lang.reflect.*;
import java.util.*;

// 프록시 API가 필요한 InvocationHandler
public class BankProxyHandler implements InvocationHandler {
    private Bank bank;

    public BankHandler (Bank bank) {
        this.bank = bank;
    }

    // InvocationHandler에 정의된 메서드
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        String methodName = method.getName();
        if (methodName.equals("getAccounts")) {
            bank.setAccounts(getAccountsFromDatabase());
            return bank.getAccounts();
        } else if (methodName.equals("setAccounts")) {
            bank.setAccounts((Collection<Account>) args[0]);
            setAccountsToDatabase(bank.getAccounts());
            return null;
        } else {
            ...
        }
    }

    // 세부사항은 여기에 이어진다.
    protected Collection<Account> getAccountsFromDatabase() { ... }
    protected void setAccountsToDatabase(Collection<Account> accounts) { ... }
}

// 다른 곳에 위치하는 코드
Bank bank = (Bank) Proxy.newProxyInstance(
    Bank.class.getClassLoader(),
    new Class[] { Bank.class },
    new BankProxyHandler(new BankImpl())
);
```

## 11-5. 순수 자바 AOP 프레임워크

---

순수 자바 관점을 구현하는 Spring AOP와 같은 여러 프레임워크는 내부적으로 프록시를 사용한다.

Spring의 비즈니스 논리를 POJO로 구현.

POJO는 순수하게 도메인에 초점을 맞추어 다른 프레임워크에 의존하지 않는다.

```java
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "BANKS")
public class Bank implements java.io.Serializable {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @Embeddable
    public class Address {
        protected String streetAddr1;
        protected String streetAddr2;
        protected String city;
        protected String state;
        protected String zipCode;
    }

    @Embedded
    private Address address;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="bank")
    private Collection<Account> accounts = new ArrayList<Account>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void addAccount(Account account) {
        account.setBank(this);
        accounts.add(account);
    }

    public Collection<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(Collection<Account> accounts) {
        this.accounts = accounts;
    }
}
```

## 11-6. AspectJ 관점

---

관심사를 관점으로 분리하는 가장 강력한 도구 AspectJ 언어

언어적 차원에서 관점을 모듈화 구성으로 지원하는 자바의 확장 언어

## 11-7. 테스트 주도 시스템 아키텍처 구축

---

코드 수준에서 아키텍처 관심사를 구분할 수 있다면, 진정한 테스트 주도 아키텍처 구축이 가능하다.

최선의 시스템 구조는 각기 POJO (또는 다른) 객체로 구현되는 모듈화된 관심사 영역(도메인)으로 구성된다.

서로 다른 영역은 해당 영역 코드에 최소한의 영향을 미치는 관점이나 유사한 도구를 사용해 통합한다.

이런 구조 역시 코드와 마찬가지로 테스트 주도 기법을 적용할 수 있다.

## 11-8. 의사 결정을 최적화하라

---

모듈을 나누고 관심사를 분리하면 지엽적인 관리와 결정이 가능해진다.

(한사람이 모든 것을 결정하기는 것은 어렵다.)

`지엽적: 근본적이거나 중요하지 않고 부수적인 것`

따라서 가장 적합한 사람에게 책임을 맡기면 가장 좋다.

가장 마지막 순간까지 결정을 미루어 최대한 정보를 모아 최선의 결정을 내리는 것은 때때로 좋은 선택일 수 있다.

관심사를 모듈로 분리한 POJO 시스템은 기민함을 제공한다.

이런 기민함 덕택에 최신 정보에 기반해 최선의 시점에 최적의 결정을 내리기가 쉬워진다.

또한 결정의 복잡성도 줄어든다.

## 11-9. 명백한 가치가 있을 때 표준을 현명하게 사용하라

---

표준을 사용하면 아이디어와 컴포넌트를 재사용하기 쉽고, 적절한 경험을 가진 사람을 구하기 쉬우며, 좋은 아이디어를 캡슐화 하기 쉽고, 컴포넌트를 엮기 쉽다.

하지만 때로는 표준을 만드는 시간이 너무 오래 걸려 업계가 기다리지 못한다.

어떤 표준은 원래 표준을 제정한 목적을 잊어버리기도 한다.

## 11-10. 시스템은 도메인 특화 언어가 필요하다.

---

도메인 특화 언어 (DSL)을 사용하면 고차원 정책에서 저차원 세부사항에 이르기까지

모든 추상화 수준과 모든 도메인을 POJO로 표현할 수 있다.

## 결론

---

시스템 역시 깨끗해야 한다.

깨끗하지 못한 시스템 아키텍처는 도메인 논리를 흐리며 기민성을 떨어뜨린다.

도메인 논리가 흐려지면 제품 품질이 떨어진다.

버그가 숨어들기 쉬워지고, 스토리를 구현하기 어려워지는 탓이다.

기민성이 떨어지면 생산성이 낮아져 TDD가 제공하는 장점이 사라진다.

모든 추상화 단계에서 의도는 명확히 표현해야 한다.

그러려면 POJO를 작성하고 관점 혹은 관점과 유사한 메커니즘을 사용해 각 구현 관심사르 분리해야 한다.

시스템을 설계하든 개별 모듈을 설계하든, 실제로 돌아가는 `가장 단순한 수단을 사용해야 한다는 사실을 명심`해야한다.

## 12장. 창발성

---

`창발 또는 떠오름 현상`은 하위 계층(구성 요소)에는 없는 특성이나 행동이 상위 계층(전체 구조)에서 자발적으로 돌연히 출현하는 현상이다.

또한 불시에 솟아나는 특성을 `창발성 ( emergent property ) 또는 이머전스( emergence )`라고도 부른다.