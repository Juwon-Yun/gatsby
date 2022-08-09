---
title: "Clean Code 17장"
category: "Etc"
date: "2022-05-14 14:37:00 +09:00"
desc: "냄새와 휴리스틱"
thumbnail: "./images/clean_code/cleancode_th.jpg"
alt: "냄새와 휴리스틱"
---

![Untitled](https://user-images.githubusercontent.com/85836879/170295027-fdccf73f-465c-4e3f-bbfa-a600ac89c472.png)

## 17장 냄새와 휴리스틱

---

Refactoring의 저자 마틴 파울러는 다양한 코드 냄새를 거론한다.

이번 챕터에서는 마틴 파울러가 맡은 냄새에 저자가 맡은 냄새를 추가헀다.

이번에 나올 목차들을 다양하게 검토하고 리팩터링 하는 챕터.

프로그램을 수정할 때마다 나는 왜?라는 자문한 다음 그 답을 기록했다.

## 목차

---

-   [ ]  주석
-   [ ]  환경
-   [ ]  함수
-   [ ]  일반
-   [ ]  자바
-   [ ]  이름
-   [ ]  테스트

## 17-1. 주석

---

### 부적절한 정보

변경 이력, 이슈 추적 등 다른 시스템에 저장할 정보는 주석으로 적절하지 못하다.

작성자, 최종 수정일, SRP 번호와 같은 정보만 주석으로 남긴다.

주석은 코드와 설계에 기술적인 설명을 부연하는 수단이기 때문에 필수적인 정보만 넣어준다.

### 쓸모없는 주석

쓸모 없는 주석은 넣지 않는게 가장 좋다.

무의미한 주석은 삭제하는 것이 좋다.

이는 코드와 연관성이 적으며 코드를 그릇된 방향으로 이끈다.

### 중복된 주석

코드만으로 설명이 충분한 곳에는 굳이 주석을 달지 않는다.

주석은 코드만으로 불충분한 설명을 보완한다.

아래처럼 코드만으로 이해 가능한 부분에는 주석이 필요없다.

### 성의 없는 주석

주석을 단다면 코드를 잘 설명할 수 있는 적잘한 단어를 사용하여 시간을 들여 작성한다.

문법과 구두점을 올바르게 사용하고 간결하고 명료하게 작성한다.

## 주석 처리된 코드

주석으로 처리된 코드는 타인이 삭제하기도 어려울뿐더러 더이상 존재하지 않는 함수나 변수를 사용하는 경우에 모듈을 오염시키고 가독성을 떨어트린다.

따라서 주석으로 처리된 코드는 무조건 삭제하라.

꼭 필요한 경우 이전 버전을 불러온다.

## 17-2. 환경

---

### 여러 단계로 빌드해야 한다.

빌드는 간단하게 한 단계로 끝나야 한다.

별도의 명령이나 스크립트를 실행할 필요 없이 한 명령으로 전체를 체크아웃해서 빌드할 수 있어야 한다.

### 여러 단계로 테스트해야 한다.

모든 단위 테스트는 한 명령으로 돌려야 한다.

IDE에서 버튼 하나로 모든 테스트를 돌리거나 셸에서 명령 하나로 테스트 실행이 가능해야 한다.

이는 아주 근본적이고 중요하기 때문에 그 방법이 빠르고, 쉽고, 명백해야 한다.

## 17-3. 함수

---

### 너무 많은 인수

함수에서 인수는 작을수록 좋고 없으면 더 좋다. 넷 이상은 최대한 지양해야 한다.

### 출력 인수

일반적으로 독자는 인수를 입력으로 간주한다.

객체 지향 언어에서는 출력 인수를 사용할 필요가 거의 없다.

출력인수로 사용하라고 설계한 변수가 this 이기 때문이다.

따라서 함수의 상태를 변경하고자 할때는 출력인수가 아닌 함수가 속한 객체의 상태를 변경해야 한다.

### 플래스 인수

boolean 인수는 혼란을 초래할 수 있기 때문에 피하는 것이 좋다.

함수로 플래그 값을 넘기는 것은 함수가 한번에 여러가지를 처리함을 의미한다.

함수는 한번에 한가지 기능을 하기때문에 인수로 플래그 값을 전달하는것은 좋지 못하다.

### 죽은 함수

아무도 호출하지 않는 함수는 삭제한다.

  
필요할 경우 소스 코드 관리 시스템이 있기 때문에 걱정할 필요 없다.

## 17-4. 일반

---

### 한 소스 파일에 여러 언어를 사용한다.

오늘날 프로그래밍 환경은 한 소스 파일 내에서 다양한 언어를 지원한다.

하나의 파일에서 여러 언어를 사용하는 것은 혼란스럽기때문에 소스파일 하나에 언어 하나만 사용하는 방식이 가장 좋다.

현실적으로 어렵더라도 최대한 언어의 수와 범위를 줄여야 한다.

### 당연한 동작을 구현하지 않는다.

최소 놀람의 원칙에 의거하여 함수나 클래스는 다른 프로그래머가 당연하게 여길 동작과 기능을 제공해야 한다.

기대한것과 다른 동작을 하게 되면 저자를 신뢰할 수 없어 다른 코드를 모두 살펴야 한다.

최소 놀람의 원칙 : 코드가 읽는 이를 놀라게 해서는 안된다. 읽었을때 당연한 기능을 해야한다.

### 경계를 올바로 처리하지 않는다.

모든 코드는 올바르게 동작해야 한다.

코드 실행에 그치지 말고 모든 경계, 예외에 대한 조건을 찾고 이를 테스트하는 테스트 케이스를 작성해야한다.

### 안전 절차 무시

컴파일러가 보내는 경고 메시지를 끄게 되면 빌드는 쉬워지지만 끝없는 디버깅에 시달리게 된다.

실패하는 테스트 케이스를 나중으로 미루는 태도는 아주 나쁘다.

### 중복

DRY(Don’t Repeat Yourself)법칙이라고도 한다.

또는 Once and only Once라고도 한다.

코드에서 중복을 발견할 때마다 추상화할 기회로 간주하고 하위 루틴이나 다른 클래스로 분리하라.

이렇게 추상화 수준을 높이게 되면 구현이 빨라지고 오류가 적어진다.

템플릿 메소드 패턴 : 전체적으로 동일하면서 부분적으로는 다른 구문으로 구성된 메서드의 코드 중복을 최소화 하고

특정한 계열의 알고리즘들을 정의하고 각 알고리즘을 캡슐화하며 이 알고리즘들을 해당 계열 안에서 상호 교체가 가능하게 만든다.

최근 15년 간 나온 디자인 패턴은 대다수가 중복 제거를 위한 방법이다.

이를 활용해 어디서든 중복을 발견하면 없애라.

### 추상화 수준이 올바르지 못하다.

우리는 추상 클래스와 파생 클래스를 생성해 추상화를 수행한다.

추상화로 개념을 분리할때는 저차원 개념들 즉 세부 동작에 대한 내용들은 파생 클래스에 넣고, 어떤 클래스인지, 어떤 알고리즘을 사용하는

지에 대한 큰 개념인 고차원 개념은 기초 클래스에 넣는다.

```java
public interface Stack {
  Object pop() throws EmptyException;
  void push(Object o) throws FullException;
  double percentFull(); // 추상화 수준이 올바르지 못하기 때문에 파생 인터페이스에 넣어줘야한다.
  class EmptyException extends Exception {}
  class FullException extends Exception {}
}
```

![image](https://user-images.githubusercontent.com/85836879/183282206-05523d8d-98b6-4a25-8e50-0d10c9f3365d.png)

추상화 수준이 낮을 수록 저차원 함수를 정의하며 세부 동작을 정의한다.

### 기초 클래스가 파생 클래스에 의존한다.

기초 클래스와 파생 클래스를 나누는 이유는 독립성을 보장하기 위해서다.

그러므로 기초 클래스는 파생 클래스를 몰라야 한다.

하지만 예외적으로 파생 클래스의 개수가 고정되었다면, 기초 클래스는 파생 클래스를 고르기 위한 코드를 포함한다.

이는 FSM 에서 볼 수 있는 사례이다.

예외적으로 FSM은 기초 클래스와 파생 클래스 간의 관계가 밀접하며 항상 같은 JAR 파일을 배포한다.

그렇지만 일반적으로 기초 클래스와 파생 클래스는 다른 JAR 파일로 배포하는 것이 좋다.

기초 클래스와 파생 클래스를 다른 JAR 파일로 배포하면 독립적인 개별 컴포넌트 단위로 시스템 배치가 가능하고, 이렇게 되면 변경이 시스

템에 미치는 영향이 작아지기 때문에 시스템 유지보수에 용이하다.

FSM : 컴퓨터 프로그램과 전자회로 설계 시 사용하는 이산적 입력과 출력을 가지는 시스템 모형

JAR : 여러개의 자바 클래스 파일과 클래스들이 이용하는 관련 리소스 및 메타 데이터를 하나의 파일로 모아 자바 플랫폼에 응용 소프트웨어나 라이브러리를 배포하기 위한 소프트웨어 패키지 파일 포맷

### 과도한 정보

잘 정의된 모듈은 인터페이스가 작고, 많은 함수를 제공하지 않아 낮은 결합도를 가진다.

반면 부실한 모듈은 이와 반대로 불필요한 정보를 많이 담고 있어 결합도가 높다.

또한 메서드 수는 적을수록, 함수가 아는 변수 수도 적을수록 잘 정의된 모듈이라고 할 수있다.

따라서 인터페이스는 작게하고 낮은 결합도를 갖도록 설계해야 한다.

### 죽은 코드

죽은 코드는 실행되지 않는 코드를 말한다.

불가능한 조건을 확인하는 if 문과 throw 문이 없는 try 문에서 catch 블록이 좋은 예다.

이러한 죽은 코드는 설계가 변하더라도 제대로 수정되지 않기 때문에 발견할 경우 시스템에서 삭제하는게 좋다.

### 수직 분리

변수와 함수는 사용되는 위치에 가깝게 정의한다.

지역 변수는 처음으로 사용하기 직전에 선언하며 수직으로 가까운 곳에 위치해야 한다.

비공개 함수는 처음으로 호출한 직후에 정의하며, 정의하는 위치와 호출하는 위치를 가깝게 한다.

### 일관성 부족

어떤 내용을 특정 방식으로 구현했다면 이와 유사한 개념또한 같은 방식으로 구현한다.

이는 앞서 언급한 최소 놀람의 원칙에도 부합한다.

처음 표기법을 결정할 때 신중해야 하며, 이때 결정한 내용을 다른 곳에서도 적용해야 한다.

해당 내용을 지킨다면 일관성을 유지하고 코드를 읽고 수정하기 쉬워진다.

### 잡동사니

아무도 사용하지 않고 호출하지 않는 함수, 정보를 제공하지 않는 주석 등은 모두 코드만 복잡하게 만들기 때문에 삭제하는것이 좋다.

소스 코드는 언제나 깔끔하게 정리되어야 한다.

### 인위적 결합

무관한 개념을 인위적으로 결합하지 않는다.

목적 없이 특정 위치에 변수나 상수, 함수를 배치하는 것으로 인해 인위적인 결합이 직접적인 상호작용이 없는 두 모듈 사이에서 발생한다.

따라서 이를 배치할때는 목적을 가지며 올바른 위치에 배치해야 한다.

### 기능 욕심

클래스 메서드는 자기 클래스의 변수와 함수에만 관심을 가져야 한다.

메서드가 다른 객체의 내용을 바꾼다면 이는 클래스 메서드가 객체 클래스의 범위를 욕심내는 것이다.

### 선택자 인수

함수의 인수에 선택자가 들어가는 것은 좋지 못하다.

인수가 선택자일 경우 목적을 파악하기 어려울 뿐만 아니라 선택자에 따라 다른 함수 여럿을 하나로 조합하는게 된다.

```java
public int calculateWeeklyPay(boolean overtime) {
    int tenthRate = getTenthRate();
    int tenthsWorked = getTenthsWorked();
    int straightTime = Math.min(400, tenthsWorked);
    int overTime = Math.max(0, tenthsWorked - straightTime);
    int straightPay = straightTime * tenthRate;
    double overtimeRate = overtime ? 1.5 : 1.0 * tenthRate;
    int overtimePay = (int)Math.round(overTime * overtimeRate);
    return straightPay + overtimePay;
}
```

위의 코드에서 초과근무 수당을 1.5배로 지급하면 true고 아니면 false를 나타낸다.

여기서 calculateWeeklyPay(false) 라고 함수를 실행한다고 하면 이것이 무엇을 의미하는지 직관적으로 알 수 없다.

따라서 아래와 같이 수당에 따라 함수를 달리하는 코드로 수정한다.

```java
public int straightPay() {
    return getTenthsWorked() * getTenthRate();
}

public int overTimePay() {
    int overTimeTenths = Math.max(0, getTenthsWorked() - 400);
    int overTimePay = overTimeBonus(overTimeTenths);
    return straightPay() + overTimePay;
}

private int overTimeBonus(int overTimeTenths) {
    double bonus = 0.5 * getTenthRate() * overTimeTenths;
    return (int) Math.round(bonus);
}
```

인수를 넘겨 동작을 선택하는 것보다 함수화 하는것이 가장 좋다.

### 모호한 의도

코드를 짤 때는 의도를 최대한 분명히 밝힌다.

행을 바꾸지 않고 표현한 수식, 헝가리식 표기법, 매직 번호 등은 모두 저자의 의도를 흐리기 때문에 시간을 써서 저자의 의도를 분명하게 표현할 수 있도록 한다.

### 잘목 지운 책임

코드 설계 시 코드 배치 위치를 결정하는 것은 중요하다.

여기서 배치 위치는 독자가 여기에 있겠다 싶은 곳에 배치하는것이 좋다.

때로는 독자에게 직관적인 위치가 아니라 개발자에게 편한 곳에 배치하기도 한다.

이때 결정을 내리는 기준 중 한가지는 함수의 이름을 살펴보는 것이다.

근무 시간 총계를 보고서로 출력하는 함수가 필요하다고 했을때, 보고서 모듈의 getTotalHours 함수와 근무시간을 입력받는

saveTimeCard 함수 중 어느쪽에서 계산하는 것이 맞을까?

성능을 높이고자 근무시간을 입력 받는 곳에서 총계를 계산한다고 하면 computeRunningTotalOfHours 이라는 함수를 내부에 넣어주는것이 좋다.

### 부적절한 static 함수

static 함수는 재정의 불가능한 함수를 의미한다.

아래의 함수는 수당을 계산하는 함수이다.

```java
HourlyPayCalculator.calculatePay(employee, overtimeRate);
```

여기서 수당을 계산하는 알고리즘은 여러개가 나올 수 있다.

따라서 재정의할 가능성이 충분히 존재한다.

따라서 해당 함수는 static으로 정의하면 안되며, Employee 클래스에 속하는 인스턴스 함수여야 한다.

### 서술적 변수

프로그램의 가독성을 높이는 가장 효과적인 방법 중 하나가 계산을 여러 단계로 나누고 중간 값으로 서술적인 변수 이름을 사용하는 방법이다.

아래의 코드에서 서술적 변수 이름을 사용했기 때문에 첫번째로 일치하는 그룹이 key에 해당되며 두번째 그룹은 value라는 부분이 명백하게 드러난다.

```java
Matcher match = headerPattern.matcher(line);
if(match.find())
{
  String key = match.group(1);
  String value = match.group(2);
  headers.put(key.toLowerCase(), value);
}
```

따라서, 위와 같이 서술적인 변수 이름을 최대한 많이 사용해서 연산 단계를 분리하고 그 사이에 적절한 변수명을 사용해준다면 모듈의 가독성이 높아진다.

### 이름과 기능이 일치하는 함수

```java
Date newDate = date.add(5);
```

위의 함수를 보면 date.add가 의미하는 바가 날짜인지, 시간인지, 주인지 모호하다.

5일을 더해 date 인스턴스를 변경하는 함수라면 addDaysTo 혹인 increaseByDays라는 이름이 좋다.

이름에 기능이 분명하게 드러날 수 있도록 적절한 이름을 고르고, 적절한 이름을 붙일 수 있도록 기능을 정리해야한다.

### 알고리즘을 이해하라

코드가 단순히 '돌아간다' 에서 그치면 안된다.

이렇게 실행 가능한 코드를 만들고 구현 완료를 선언하기 전에 함수가 동작하는 방식을 완전하게 이해하는지 확인해야한다.

테스트 코드만을 통과하는 것에서 그치지 않고, 코드 작성자가 해당 알고리즘이 올바르다는 것을 알아야 한다.

이를 위해서는 기능이 직관적으로 보일 수 있도록 깔끔하게 재구성 하는 방법이 좋다.

### 논리적 의존성은 물리적으로 드러내라

한 모듈이 다른 모듈에 의존하다면 물리적인 의존성도 있어야 한다.

물리적으로 의존하면 의존하는 정보를 명시적으로 요청하는 것이 좋다.

근무 시간 보고서를 가공되지 않은 상태로 출력하는 함수를 만든다고 할때 HourlyReporter 클래스는 정보를 모아 HourlyReportFormatter 클래스에 넘기고 HourlyReportFormatter 는 넘어온 정보를 출력한다.

```java
public class HourlyReporter {
  private HourlyReportFormatter formatter;
  private List<LineItem> page;
  private final int PAGE_SIZE = 55;

  public HourlyReporter(HourlyReportFormatter formatter) {
    this.formatter = formatter;
    page = new ArrayList<LineItem>();
  }

  public void generateReporter(List<HourlyEmployee> employees) {
    for (HourlyEmployee e : employees) {
      addLineItemToPage(e);
      if (page.size() == PAGE_SIZE) {
        printAndClearItemList();
      }
    }
    if (page.size() == 0)
      printAndClearItemList();
  }

  private void printAndClearItemList() {
    formatter.format(page);
    page.clear();
  }

  private void addLineItemToPage(HourlyEmployee e) {
    LineItem item = new LineItem();
    item.name = e.getName();
    item.hours = e.getTenthsWorked() / 10;
    item.tenths = e.getTenthsWorked() % 10;
    page.add(item);
  }

  private class LineItem {
    public String name;
    public int hours;
    public int tenths;
  }
}
```

해당 코드에서 PAGE\_SIZE라는 상수를 통해 논리적 의존성을 가진다.

해당 상수는 HourlyReporter 클래스는 HourlyReportFormatter 클래스가 페이지 크기를 알 것이라고 가정한다.

이렇러한 가정을 논리적 의존성이라고 하는데 이때 HourlyReportFormatter 가 페이지 크기를 처리하지 못한다면 오류가 발생하게 된다.

이를 해결하고자 HourlyReportFormatter 에 getMaxPageSize() 메서드를 추가하게 되면 위와 같은 논리적 의존성이 물리적 의존성으로 변환된다.

그래서 상수 대신 함수를 이용하여 논리적 의존성으로 인한 문제 대신 물리적 의존성 갖도록 변환해준다.

### If/Else 혹은 Switch/Case 문보다 다형성을 사용하라

대다수 개발자가 switch 문을 사용하는 이유는 올바르기보다는 손쉬운 선택이기 때문이다.

따라서 그 이전에 다형성을 먼저 고려하라는 의미다.

유형보다 함수가 더 쉽게 변하는 경우는 극히 드물기 때문에 switch 문을 의심해야 한다.

선택 유형 하나에는 switch 문을 한번만 사용하고, 같은 선택을 수행하는 다른 코드에서는 다형성 객체를 생성해 switch 문을 대신한다.

### 표준 표기법을 따르라

인스턴스 변수 선언 위치, 이름을 정하는 방법, 괄호를 넣는 위치 등에 대한 구현 표준을 따라야 한다.

이는 코드 자체로 충분해야 하며 별도의 문서로 설명할 필요가 없어야 하며 이렇게 정한 표준은 모든 팀원이 따라야 한다.

### 매직 숫자는 명명된 상수로 교체하라

가장 오래된 규칙 중 하나로 일반적으로 코드에서 숫자를 직접 사용하지 말라는 규칙이며 이는 숫자를 명명된 상수 뒤로 숨기는 것을 의미한다.

그렇지만 어떤 상수는 이해하기 쉽기 때문에 코드 자체가 자명하다면 굳이 상수 뒤로 숨길 필요는 없다.

```java
double hour = minutes / 60.0;
// 단위 환산을 한다고 했을때,
// 한시간이 60분이라는 사실은 잘 알려진 고유 수 이기 때문에 굳이 상수 뒤로 숨길 필요 없음

double circleArea = radius * radius * Math.PI
// 원주율은 근사값이 존재하기 때문에 Math.PI를 이용해 오차를 줄인다.
```

### 정확하라

-   검색 결과 중 첫 번째 결과만 유일한 결과로 간주
-   부동소수점으로 통화를 표현
-   모든 변수를 protected 로 선언

위와 같은 것들은 부정확한 방법이다.

코드에서 무언가를 결정할 때는 정확하게 결정한다.

결정을 내리면 그에 대한 타당한 이유와 예외를 처리할 방법을 분명하게 알아야 한다.

null을 반환할 수 있는 경우는 이를 반드시 점검하고, 통화를 다룰 경우 정수를 사용하기위해 Money 클래스를 사용한다.

### 관례보다 구조를 사용하라

설계 결정을 강제할 때는 규칙보다 관례를 사용한다.

명명 관례도 좋지만 구조 자체로 강제하면 더 좋다.

예를 들어, enum 변수가 멋진 switch/case 문보다 추상 메서드가 있는 기초 클래스가 더 좋다.

switch/case 문을 매번 똑같이 구현하게 강제하기는 어렵지만, 추상 메서드가 정의되어 있으면 해당 추상 클래스를 상속받는 파생 클래스

는 해당 메서드를 모두 구현하지 않으면 안 되기 때문이다.

### 조건을 캡슐화하라

부울 논리는 if나 while문에 넣어 생각하지 않아도 이해하기 어렵기 때문에 조건의 의도를 분명히 밝히는 함수로 표현하라

```java
if (shouldBeDeleted(timer)) // better

if (timer.haseExpired() && !timer.isRecurrent())
```

### 부정 조건은 피하라

부정 조건은 긍정 조건보다 이해하기 어렵다.

가능하면 긍정 조건을 표현한다.

```java
if (buffer.shouldCompact())

if (!buffer.shouldNotCompact())
```

### 함수는 한 가지만 해야 한다.

함수는 한가지 기능만을 해야한다.

```java
public void pay(){
    for (Employee e : employees) { // 직원 목록 for loop 통해 돌기
        if (e.isPaypay()) { // 월급일인지 확인
            Money pay = e.calculatePay(); // 급여 계산
            e.deliverPay(pay); // 급여 지급
        }
    }
}
```

위와 같이 하나의 함수에서 여러기능을 하는 것을 아래와 같이 변경한다.

```java
public void pay(){
    for (Employee e : employees)
        payIfNecessary(e);
}

private void payIfNecessary(Employee e) {
    if(e.isPayday()){
        calculateAndDeliverPay(e)
    }
}

private void calculateAndDeliverPay(Employee e) {
    Money pay = e.calculatePay();
    e.deliverPay(pay);
}
```

### 숨겨진 시간적인 결합

때로는 시간적인 결합이 필요하지만 이를 숨겨서는 안 된다.

함수 인수를 적절히 배치해 함수가 호출되는 순서를 명백히 드러낸다.

```java
  public class MoogDiver {
    Gradient gradient;
    List<Spline> splines;

    public void dive(String reason) {
      saturateGradient(); ...1
      reticulateSplines(); ...2
      diveForMoog(reason); ...3
    }
    ...
  }
```

세 함수가 순서대로 실행되는것이 목적이지만, 프로그래머가 2를 먼조 호출하고 1을 호출하는 경우 발생하는 오류를 막을 수가 없다.

따라서 실행 순서를 명확하게 표현할 수 있도록 아래와 같이 수정한다.

```java
  public class MoogDiver {
    Gradient gradient;
    List<Spline> splines;

    public void dive(String reason) {
      Gradient gradient = saturateGradient();
      List<Spline> splines = reticulateSplines(gradient);
      diveForMoog(splines, reason);
    }
    ...
  }
```

위처럼 코드를 짜게 되면 각 함수가 실행된 결과가 다음 함수의 실행을 위해 필요하기 때문에 순서를 암시할 수 있다.

이렇게 되면 좀 더 명백하게 함수의 실행 순서를 나타낼 수 있게 된다.

### 일관성을 유지하라

코드 구조를 잡을 때는 왜 그런 구조로 짰는지에 대해 생각하고, 그 이유를 코드에 나타내라.

구조에 일관성이 없어 보인다면 독자는 해당 부분을 수정해도 괜찮다고 여긴다.

일관성을 갖고있다면 수정 시에도 해당 일관성을 따르고 보존할 수 있다.

### 경계 조건을 캡슐화하라

경계 조건은 빼먹거나 놓치기 쉽기 때문에 코드 여기저기에서 처리하지 않고 한 곳에서 별도로 처리한다.

```java
if (level + 1 < tags.length)
{
  parts = new Parse(body, tags, level + 1, offset + endTag;
  body = null;
}
```

위 코드에서 level + 1 이 두 번 나오기 때문에 변수로 캡슐화하는 것이 좋다.

적절한 변수이름을 nextLevel로 한다.

```java
int nextLevel = level + 1;
if (nextLevel < tags.length)
{
  parts = new Parse(body, tags, nextLevel, offset + endTag;
  body = null;
}
```

### 함수는 추상화 수준을 한 단계만 내려가야 한다

함수 내 모든 문장은 추상화 수준이 동일해야 한다.

그리고 그 추상화 수준은 함수 이름이 의미하는 작업보다 한 단계만 낮아야 한다.

```java
  public String render() throws Exception {
    StringBuffer html = new StringBuffer("<hr");
    if(size > 0)
      html.append(" size=\"").append(size + 1).append("\"");
    html.append(">");

    return html.toString();
  }
```

위의 함수에서는 페이지를 나누는 수평자를 만드는 HTML 태그를 생성한다.

높이는 size 변수로 지정한다.여기서 추상화 수준은 여러개 섞여있다.

-   수평선에 크기가 있다.
-   HR 태그를 만들 때 네개 이상의 연이은 - 기호를 감지해 HR 태그로 변환한다. (Fitness 모듈 HruleWidget에서 가져옴)

위의 코드를 아래와 같이 변경한다.

아래에서 size 변수는 추가된 대시의 개수를 저장하고, render 함수는 HR 태그만 생성하고, HTML HR 태그 문법은 HTMLTag 모듈이 처리해준다.

이를 통해 위와 다르게 추상화 수준을 분리해준다.

이렇게 추상화 수준을 분리하다 보면 새로운 추상화 수준을 찾아낼 수 있고 해당 과정을 거치며 더 좋은 코드가 만들어진다.

```java
  public String render() throws Exception
  {
    HtmlTag hr = new HtmlTag("hr");
    if (extraDashes > 0)
      hr.addAttributes("size", hrSize(extraDashes));
    return hr.html();
  }

  private String hrSize(int height)
  {
    int hrSize = height + 1;
    return String.format("%d", hrSize);
  }
```

### 설정 정보는 최상위 단계에 둬라

추상화 최상위 단계에 두어야 할 기본값 상수나 설정 관련 상수를 저차원 함수에 숨겨서는 안된다.

대신 고차원 함수에서 저차원 함수를 호출할때 인수로 넘긴다.

아래 코드는 Fitness에서 가져온 코드이다.

Fitness 첫 행은 명령행 인수의 구문을 분석한다.

그래서 인수의 기본값은 Arguments클래스의 맨 처음에 나타내 준다.

이렇게 구현해야 독자는 시스템의 저수준을 찾아볼 필요가 없다.

이렇게 해야 변경하기도 쉽다.

```java
  public static void main(String[] args) throws Exception
  {
    Arguments arguments = parseCommandLine(args);
    ...
  }

  public class Arguments
  {
    public static final String DEFAULT_PATH = ".";
    public static final String DEFAULT_ROOT = "FitNesseRoot";
    public static final int DEFAULT_PORT = 80; // 기본값
    public static final int DEFAULT_VERSION_DAYS = 14;
    ...
  }
```

### 추이적 탐색을 피하라

일반적으로 한 모듈은 주변 모듈을 모를수록 좋다.

이는 A가 B를 사용하고 B가 C를 사용한다 하더라도 A가 C를 알아야 할 필요가 없다는 것을 의미한다.

즉, 자신이 직접 사용하는 모듈만 알아야한다.

내가 사용하는 모듈이 내게 필요한 서비스를 모두 제공하게 해서 원하는 메서드를 찾아 시스템을 탐색할 필요가 없도록 한다.

이는 myCollaborator.doSomething()과 같이 간단한 코드로 변경하는 것이 좋다는 것을 의미한다.

## 17-5. 자바

---

### 긴 import 목록을 피하고 와일드카드를 사용하라

패키지에 클래스를 둘 이상 사용한다면 와일드 카드를 사용해 패키지 전체를 가져오라.

import 문이 길어지면 가독성이 떨어지기 때문에 사용하는 패키지를 간단하게 명시해준다.

때로는 이름 충돌이나 모호성 때문에 명시적으로 import 문을 길게 나열해야 하는 경우가 생길 수 있지만, 이러한 경우는 극히 드물다.

결과적으로 와일드 카드문을 사용하는 편이 더 좋다.

```java
  import package.*;
```

### 상수는 상속하지 않는다

아래의 코드를 살펴보자.

해당 클래스에서 사용하는 TENTHS\_PER\_WEEK 와 OVERTIME\_RATE 상수의 출처는 어디일까?

```java
  public class HourlyEmployee extends Employee {
    private int tenthsWorked;
    private double hourlyRate;

    public Money calculatePay() {
      int straightTime = Math.min(tenthsWorked, TENTHS_PER_WEEK);
      int overTime = tenthsWorked - straightTime;
      return new Money(
        hourlyRate * (tenthsWorked + OVERTIME_RATE * overTime)
      );
    }
    ...
  }
```

부모 클래스를 살펴보자.

```java
  public abstract class Employee implements PayrollConstants {
    public abstract boolean isPayday();
    public abstract Money calculatePay();
    public abstract void deliverPay(Money pay);
  }
```

해당 클래스에도 상수는 존재하지 않는다.

그렇다면 PayrollConstants 인터페이스를 살펴보자.

```java
    public interface PayrollConstants {
        public static final int TENTHS_PER_WEEK = 400; // 여기
        public static final double OVERTIME_RATE = 1.5;  / 여기
    }
```

상수가 해당 계층의 가장 위에 선언되어 있다.

이런 방법 보다는 아래와 import static을 사용하는것이 좋다.

static import는 일반적인 import와는 다르게 메소드나 변수를 패캐지, 클래스명없이 접근가능하게 해준다.

```java
import static PayrollConstants.*;

public class HourlyEmployee extends Employee {
    private int tenthsWorked;
    private double hourlyRate;

    public Money calculatePay() {
      int straightTime = Math.min(tenthsWorked, TENTHS_PER_WEEK);
      int overTime = tenthsWorked - straightTime;
      return new Money(
        hourlyRate * (tenthsWorked + OVERTIME_RATE * overTime)
      );
    }
    ...
  }
```

### 상수 대 Enum

자바 5에서는 enum을 제공한다.

  
이름이 부여된 열거체에 속하는 enum을 이용하게 되면 해당 열거체를 메서드나 필드에서도 사용이 가능하다.

```java
  public class HourlyEmployee extends Employee {
    private int tenthsWorked;
    HourlyPayGrade grade; // 객체 생성

    public Money calculatePay() {
      int straightTime = Math.min(tenthsWorked, TENTHS_PER_WEEK);
      int overTime = tenthsWorked - straightTime;
      return new Money(
        grade.rate() * (tenthsWorked + OVERTIME_RATE * overTime) // enum에서 rate()함수의 return 값 가져옴
      );
    }
  }

  public enum HourlyPayGrade {
    APPRENTICE {
      public double rate() {
        return 1.0;
      }
    },
    LIEUTENANT_JOURNEYMAN {
      public double rate() {
        return 1.2;
      }
    },
    JOURNEYMAN {
      public double rate() {
        return 1.5;
      }
    },
    MASTER {
      public double rate() {
        return 2.0;
      }
    };

    public abstract double rate();
  }
```

## 17-6. 이름

---

### 서술적인 이름을 사용하라

서술적인 이름을 신중하게 골라야 하며, 소프트웨어 진화에 따라 선택한 이름이 적합한지 계속 확인한다.

아래 코드는 서술적이지 못한 이름을 사용한 좋지 못한 예시이다.

```java
  public int x() {
    int q = 0;
    int z = 0;
    for (int kk = 0; kk < 10; kk++) {
      if (l[z] == 10)
      {
        q += 10 + (l[z + 1] + l[z + 2]);
        z += 1;
      }
      else if (l[z] + l[z + 1] == 10)
      {
        q += 10 + l[z + 2];
        z += 2;
      } else {
        q += l[z] + l[z + 1];
        z +=2;
      }
    }
    return q;
  }
```

이를 명명법에 신경써서 코드를 수정한다.

아래와 같이 변경하면 코드의 의도를 알 수 있어 기능 추가를 하거나 수정을 하기 쉽고, 독자가 알고리즘 구조를 파악하기에도 편리하다.

```java
 public int score() {
    int score = 0;
    int frame = 0;
    for (int frameNumber = 0; frameNumber < 10; frameNumber++) {
      if (isStrike(frame)) {
        score += 10 + nextTwoBallsForStrike(frame);
        frame += 1;
      }
      else if (isSpare(frame)) {
        score += 10 + nextBallForSpare(frame);
        frame += 2;
      } else {
        score += twoBallsInFrame(frame);
        frame += 2;
      }
    }
    return score;
  }
```

적절한 이름을 고르게 되면 부연 설명이나 주석이 필요가 없으며, 독자는 모듈 내 함수가 어떤 역할을 하는지 예측이 가능하다.

### 적절한 추상화 수준에서 이름을 선택하라

구현을 드러내는 이름을 피하라.

작업 대상 클래스나 함수가 위치하는 추상화 수준을 반영하는 이름을 선택하라.

```java
  public interface Modem {
    boolean dial(String phoneNumber); // phoneNumber
    boolean disconnect();
    boolean send(char c);
    char recv();
    String getConnectedPhoneNumber()l
  }

  public interface Modem {
    boolean connect(String connectionLocator); // connectionLocator
    boolean disconnect();
    boolean send(char c);
    char recv();
    String getConnectedLocator();
  }
```

전화번호 외에 다른 번호 (포트번호) 를 보낼 수 있기 때문에 추상화하여 connectionLocator라는 이름을 사용하는 것이 더 좋다.

### 가능하다면 표준 명명법을 사용하라

기존 명명법을 사용하는 이름은 이해하기 더 쉽다.

예를 들어 DECORATOR 패턴을 활용한다면 장식하는 클래스 이름에 Decorator라는 단어를 사용해야 한다.

이렇게 보편적으로 사용되는 단어들을 굳이 변경하는 것보다 기존 관례를 따르는 편이 더 좋다.

프로젝트에 유효한 의미가 담긴 이름(유비쿼터스 언어)을 많이 사용할수록 독자가 코드를 이해하기 쉬워지기 때문이다.

### 명확한 이름

함수나 변수의 목적을 명확히 밝히는 이름을 선택한다.

```java
  private String doRename() throws Exception
  {
    if(refactorReferences)
      renameReferences();
    renamePage();

    pathToRename.removeNameFromEnd();
    pathToRename.addNameToEnd();
    return PathParser.render(pathToRename);
  }
```

해당 함수에서 doRename함수와 renamePage 함수의 이름을 봤을 때 직관적으로 두 함수의 차이점을 알 수 없다.

renamePageAndOptionallyAllReferences라는 이름을 통해 함수의 기능을 나타낼 수 있다.

이렇게 하면 이름이 길어진다는 단점을 가지지만, 서술성은 이런 단점을 커버한다.

### 긴 범위는 긴 이름을 사용하라

이름 길이는 범위 길이에 비례해야 한다.

범위가 작으면 아주 짧은 이름을 사용해도 괜찮지만 범위가 길어지면 긴 이름을 사용한다.

범위가 5줄 안팎이라면 i나 j와 같은 변수 이름도 괜찮다.

```java
  private void rollMany(int n, int pins)
  {
    for (int i=0; i<n; i++)
      g.roll(pins);
  }
```

반면 이름이 짧은 변수나 함수는 범위가 길어지면 의미를 잃기 때문에 범위가 길수록 정확하고 길게 짓는다.

### 인코딩을 피하라

이름에 유형 정보나 범위 정보를 넣어서는 안 된다.

오늘날 개발 환경에서는 이름 앞에 m\_이나 f와 같은 접두어가 는 중복된 정보를 나타내기 때문에 지양해야 한다.

### 이름으로 부수 효과를 설명하라

함수, 변수, 클래스가 하는 일을 모두 기술하는 이름을 사용한다.

이름에 부수 효과를 숨기지 않는다.

실제 여러 작업을 수행하는 함수에다가 동사 하나만 달랑 사용하면 좋지못하다.

```java
  public ObjectOutputStream getOos() throws IOException {
    if (m_oos == null) {
      m_oos = new ObjectOutputStream(m_socket.getOutputStream());
    }
    return m_oos;
  }
```

위 코드에서 if문을 보면 기존 "oos"가 없으면 새로 생성하고, 결과적으로 oos를 return 해준다.

이때 해당 함수는 getOos() 라고 되어있는데 이 부분은 생성에 대한 언급이 없다.

따라서 생성과 반환의 기능을 모두 나타낼 수 있는 createOrReturnOos 라는 이름이 더 적합하다.

## 17-7. 테스트

---

### 불충분한 테스트

테스트 케이스가 확인하지 않는 조건이나 검증하지 않는 계산이 있다면 그 테스트는 불완전하다.

따라서 잠재적으로 깨질 만한 부분을 모두 테스트해야 한다.

### 커버리지 도구를 사용하라!

커버리지 도구는 테스트가 빠뜨리는 공백을 알려준다.

대다수 IDE는 테스트 커버리지를 시각적으로 표현한다.

예를 들어 테스트되는 행은 녹색으로 아닌 것은 붉은색으로 표기한다.

그러므로 전혀 실행되지 않는 if 혹은 case 문 블록이 금방 드러난다.

### 사소한 테스트를 건너뛰지 마라

사소한 테스트는 짜기 쉽다.

사소한 테스트가 제공하는 문서적 가치는 구현에 드는 비용을 넘어선다.

### 무시한 테스트는 모호함을 뜻한다.

때로는 요구사항이 불분명하기에 프로그램이 돌아가는 방식을 확신하기 어렵다.

불분명한 요구사항은 테스트 케이스를 주석으로 처리하거나 테스트 케이스에 @Ignore를 붙여 표현한다.

불분명한 요구사항을 판별하는 기준은 테스트 케이스의 컴파일 여부에 달려있다.

### 경계 조건을 테스트하라

알고리즘의 중앙 조건은 올바로 짜놓고 경계 조건에서 실수하는 경우가 흔하기 때문에 경계 조건은 각별히 신경 써서 테스트한다.

### 버그 주변은 철저히 테스트하라

버그는 서로 모이는 경향이 있기 때문에 한 함수에서 버그를 발견했다면 그 함수를 철저히 테스트하는 편이 좋다.

### 실패 패턴을 살펴라

테스트 케이스가 실패하는 패턴으로 문제를 진단할 수 있다.

꼼꼼히 짠 테스트 케이스는 실패 패턴을 드러낸다.

### 테스트 커버리지 패턴을 살펴라

통과하는 테스트가 실행하거나 실행하지 않는 코드를 살펴보면 실패하는 테스트 케이스의 패턴을 찾을 수 있다.

이를 통해 실패 원인을 찾는다.

### 테스트는 빨라야 한다.

느린 테스트 케이스는 실행하지 않게 된다.

일정이 촉박하면 느린 테스트 케이스를 제일 먼저 건너뛴다.

그러므로 테스트 케이스가 빨리 돌아가게 최대한 노력한다.

## 결론

---

이 챕터에서 소개한 휴리스틱과 냄새 목록이 완전하다는 것이 아니다.

하지만 완전확 목록이 목표가 아닌 위에서 언급한 목록은 가치 체계를 치력할 뿐이다.

가치 체계는 이 책의 주제이자 목표다.

일군의 규칙만 따른다고 깨끗한 코드가 얻어지지 않으며 휴리스틱 목록을 익힌다고 소프트웨어 장인이 되지는 못한다.

전문가 정신과 장인 정신은 가치에서 나온다.

그 가치에 기반한 규율과 절제가 필요하다고 저자는 말하는 것 같다.