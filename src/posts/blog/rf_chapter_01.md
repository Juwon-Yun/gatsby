---
title: "Refactoring 1장"
category: "Etc"
date: "2022-06-06 12:54:00 +09:00"
desc: "리팩터링: 첫 번째 예시"
thumbnail: "./images/refactoring/refactoring_book.jpg"
alt: "리팩터링"
---
![refa](https://user-images.githubusercontent.com/85836879/172093645-3f2f7f9f-b9bc-4723-88f6-dd81dfddd498.jpeg)

## 리팩터링 책을 선택한 이유
앞선 클린코드 책을 읽으며 마지막에 로버트 C 마틴이 언급하는 코드의 냄새와 냄새맡기 장인이라는 마틴 파울러를 보고 마침 깊게 알고싶은 언어인 자바스크립트로 개정된 책이 있다는 걸 알고 이책이다! 싶어서 선택하였다. 이 책을 읽으며 마틴 파울러와 로버트 C 마틴이 언급하는 코드 냄새를 알아보고 내 코드에 적용하고 싶어서도 한 몫한 것 같다.

---
## 이 책을 읽어야 하는 사람
이 책의 주 대상은 리팩터링을 배우려는 개발자와 이미 리팩터링을 이해하고 있는 개발자에게도 읽으면 좋은 책이다.

이 책을 읽음으로써 교육용 자료로 활용할 수 있고 숙련된 개발자가 동료들에게 멘토링을 할 수 있는 다양한 리팩터링의 작동 원리를 제공한다.

---
> 마틴 파울러 (Martin Fowler, 1963년 12월 18일 ~)
![Webysther_20150414193208_-_Martin_Fowler](https://user-images.githubusercontent.com/85836879/172094236-093fa532-4324-41b3-b82c-707f98dfaa48.jpeg)

## 들어가며
리팩터링이란 겉으로 드러나는 코드의 기능은 바꾸지 않으면서 내부 구조를 개선하는 방식으로 소프트웨어 시스템을 수정하는 과정이다.

버그가 생길 가능성을 최소로 줄이면서 코드를 정리하는 정제된 방법이며 리팩터링한다는 것은 코드를 작성하고 난 뒤에 설계를 개선하는 일이다.

좋은 설계후에 코드를 작성하지만 시간이 흐르면서 코드는 수정되고 시스템의 무결성, 즉 설계에 맞춘 구조는 점차 엉켜지며 공학에 가깝던 코드는 서서히 해킹에 가까워진다.

이 과정을 반대로 한 것이 리팩터링이다.

이 책을 읽으며 리팩터링이란 무엇인지 어떻게 재설계와 코드 수정을 통해 설계의 체계를 바로잡는지를 배울 수 있다.

리팩터링 2판은 예시코드가 자바스크립트로 되어있어 자바 개발을 하거나 준비하는 개발자는 1판을 추천한다.

### 1장 리팩터링: 첫 번째 예시
저자는 리팩터링의 역사와 여러 원칙을 하나씩 나열하며 설명하는건 지루하고 졸린 과정이라고 한다.

저자가 선보이는 일반화된 원칙이 아닌 실제 적용하는 방법을 파악하고 리팩터링 과정을 따라오면서 어떻게 수행하는지 감 잡는 방법을 전해준다.

초판에서 100쪽이 넘는 코드를 글로 작성했지만 그냥 빼버렸다.

이 책에서 나오는 길이가 비교적 짧은 예제들은 대규모 시스템에서 발췌한 코드라고 생각하면서 따라오기를 바란다.

---
### 목차
1-1. 자, 시작해보자!

1-2. 예시 프로그램을 본 소감

1-3. 리팩터링의 첫 단계

1-4. statement() 함수 쪼개기

1-5. 중간 점검: 난무하는 중첩 함수

1-6. 계산 단계와 포맷팅 단계 분리하기

1-7. 중간 점검: 두 파일(과 두 단계)로 분리됨

1-8. 다형성을 활용해 계산 코드 재구성하기

1-9. 상태 점검: 다형성을 활용하여 데이터 생성하기

1-10. 마치며

---

### 1-1. 자, 시작해보자!

---

다양한 연극을 외주로 받아서 공연하는 극단이 있다고 생각해보자.

공연 요청이 들어오면 연극의 장르와 관객 규모를 기초로 비용을 책정한다.

이 극단은 두 가지 장르로 비극(tragedy)과 희극(comedy)만 공연한다.

그리고 공연료와 별개로 포인트(volume credit)를 지급해서 다음번 의뢰 시 공연료를 할인받을 수도 있다.

극단은 공연할 연극 정보를 다음과 같이 간단한 JSON 파일에 저장한다.

```json
{
    "hamlet" : {"name" : "Hamlet", "type" : "tragedy"},
    "as-like" : {"name" : "As You Like It", "type" : "comedy"},
    "othello" : {"name" : "Othello", "type" : "tragedy"},
}
```

공연료 청구서에 들어갈 데이터도 다음과 같이 JSON 파일로 저장한다.

```json
[
    {
        "customer" : "BigCo",
        "performances" : [
            {
                "playID" : "hamlet",
                "audience" : 55,
            },
            {
                "playID" : "as-like",
                "audience" : 35,
            },
            {
                "playID" : "othello",
                "audience" : 40,
            },
        ],
    }
]
```

공연료 청구서를 출력하는 코드는 다음과 같이 간단히 함수로 구현했다.

```js
function statement(invoice, plays){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명 : ${invoice.customer})\n`;
    const format = new Intl.NumberFormat(
        "en-us",
        {
            style : "currency", 
            currency: "USD", 
            minimumFractionDigits : 2
        }).format;
    
    for(let perf of invoice.performances){
        const play = plays[perf.playID];        
        let thisAmount = 0;

        switch(play.type){
            case "tragedy" :
                thisAmount = 40000;
                if(perf.audience > 30){
                    this.Amount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy" :
                thisAmount = 30000;
                if(perf.audience > 20){
                    this.Amount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${play.type}`);
        }

        // 포인트를 적립한다.
        volumeCredits += Math.max(perf.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        // 청구 내역을 출력한다.
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
        totalAmount += thisAmount;
    }
    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;
}
```

이 코드에 앞의 두 테스트 데이터 파일을 입력해 실행한 결과는 다음과 같다.

```
청구 내역 (고객명: BigCo)
Hamlet: $650.00 (55석)
As You Like It: $580.00 (35석)
Othello: $500.00 (40석)
총액: $1,730,00
적립 포인트: 47점
```

### 1-2. 예시 프로그램을 본 소감

---

프로그램이 잘 작동하는 상황에서 그저 코드가 '지저분하다'는 이유로 불평하는 것은 프로그램의 구조를 너무 미적인 기준으로만 판단하는 건 아닐까?

설계가 나쁜 시스템은 수정하기 어렵다.

무엇을 수정할지 찾기 어렵다면 실수를 저질러서 버그가 생길 가능성도 높아진다.

수백 줄 짜리 코드를 수정할 때면 먼저프로그램의 작동 방식을 더 쉽게 파악할 수 있도록 코드를 여러 함수와 프로그램 요소로 재구성한다.

프로그램의 구조가 빈약하다면 대체로 구조부터 바로잡은 뒤에 기능을 수정하는 편이 작헙하기 수월하다.

> 프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면, 먼저 기능을 추가하기 쉬운 형태로 리팩터링하고 나서 원하는 기능을 추가한다.

잘 작동하고 나중에 변경할 일이 절대 없다면 코드를 현재 상태로 놔둬도 아무런 문제가 없다.

하지만 다른 사람이 읽고 이해해야 할 일이 생겼는데 로직을 파악하기 어렵다면 대책을 마련해야 한다.

### 1-3. 리팩터링의 첫 단게  

---

리팩터링의 첫 단계는 항상 똑같다.

리팩터링할 코드 영역을 꼼꼼하게 검사해줄 테스트 코드부터 마련해야 한다.

리팩터링에서 테스트의 역할은 굉장히 중요하다.

프로그램이 클수록 수정 과정에서 예상치 못한 문제가 발생할 가능성이 크다.

테스트 코드 작성도 중요하지만 테스트 결과를 보고하는 방식도 중요하다.

테스트 결과를 성공/실패로 판단하는 자가진단 테스트를 만든다.

자가진단 여부는 매우 중요하다.

최신 테스트 프레임워크는 자가진단 테스트를 작성하고 실행하는데 필요한 모든 기능을 제공한다.

> 리팩터링하기 전에 제대로 된 테스트부터 마련한다. 테스트는 반드시 자가진단하도록 만든다.

내가 리팩터링하면서 저지른 실수로부터 보호해주는 버그 검출기 역할을 테스트 코드가 해주기 때문에 의지해야 한다.

테스트를 작성하는 데 시간이 좀 걸리지만, 신경 써서 만들어두면 디버깅 시간이 줄어서 전체 작업 시간은 오히려 단축된다.

### 1-4. statement() 함수 쪼개기

---

statement()처럼 긴 함수를 리팩터링할 때 중간 즈음 switch문이 가장 먼저 눈에 띌 것이다.

switch문을 살펴보면 한 번의 공연에 대한 요금을 계산하고 있다.

이러한 사실은 코드를 분석해서 얻은 정보다.

워드 커닝햄이 말하길, 이런 식으로(코드를 분석해서 얻은 정보를 얻는 방식) 파악한 정보는 **휘발성이 높기로 악명 높은 저장 장치인 내 머릿속에 기록되므로, 잊지 않으려면 재빨리 코드에 반영**해야 한다.

그렇게 해야 다음번에 코드를 볼 때, 다시 분석하지 않아도 코드 스스로가 자신이 하는일이 무엇인지 이야기해줄 것이다.

switch문 코드 조각을 별도 함수로 추출하는 방식으로 반영할 것이다.

추출한 함수에는 그 코드가 하는 일을 설명하는 이름을 지어준다.

이렇게 코드 조각을 함수로 추출할 때 실수를 최소화해주는 절차를 따로 기록해두고 나중에 참조하기 쉽도록 **함수 추출하기**란 이름을 붙였다.

다음 별도 함수로 추출했을 때 유효범위를 벗어나는 변수, 즉 새 함수에서는 곧바로 사용할 수 없는 변수가 있는지 확인한다.

예시에서는 perf, play, thisAmount가 여기 속한다.

perf와 play는 추출한 새 함수에서도 값을 변경하지 않기 때문에 매개변수로 전달하면 된다.

하지만 thisAmount는 함수 안에서 값이 바뀌는데 이러한 변수는 조심해서 다뤄야 한다.

이번 예시에서는 함수 안에서 값이 바뀌는 변수가 하나뿐이므로 이 값을 반환하도록 작성했다.

```js
function amountFor(perf, play){
    let thisAmount = 0; // 변수를 초기화하는 코드
    switch(play.type){
        ...
    }
    return thisAmount;
}
```

이제 thisAmount 값을 채울 때 방금 추출한 amountFor() 함수로 호출한다.

```js
function statement(invoice, plays){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명 : ${invoice.customer})\n`;
    const format = new Intl.NumberFormat(
        "en-us",
        {
            style : "currency", 
            currency: "USD", 
            minimumFractionDigits : 2
        }).format;
    
    for(let perf of invoice.performances){
        const play = plays[perf.playID];        
        let thisAmount = amountFor(perf, play); // 반환값으로 초기화한다.
```
이렇게 수정하고 나면 곧바로 컴파일하고 테스트해서 실수한 게 없는지 확인한다.

아무리 간단한 수정이라도 리팩터링 후에는 항상 테스트하는 습관을 들이는 것이 바람직하다.

한 가지를 수정할 때마다 테스트하면, 오류가 생기더라도 변경 폭이 작기 때문에 문제를 찾고 해결하기가 훨씬 쉽다.

이처럼 조금씩 변경하고 매번 테스트하는 것은 리팩터링 절차의 핵심이다.

조금씩 수정하여 피드백 주기를 짧게 가져가는 습관이 재앙을 피하는 길이다.

> 리팩터링은 프로그램 수정을 작은 단계로 나눠 진행한다. 그래서 중간에 실수하더라도 버그를 쉽게 찾을 수 있다.

수정한 사항을 테스트해보니 문제가 없다.

그래서 다음 단계로 변경 사항을 로컬 버전 관리 시스템에 커밋한다.

하나의 리팩터링을 문제없이 끝낼 때마다 커밋한다.

이러한 자잘한 변경들이 어느정도 의미 있는 단위로 뭉쳐지면 공유 저장소로 푸시한다.

**함수 추출하기**는 흔히 IDE에서 자동으로 수행해준다.

하지만 자바스크립트용 자동 리팩터링 도구가 없기 때문에 수작업으로 진행한다.

추출된 함수 코드를 자세히 들여다 보면서 지금보다 명확하게 표현할 수 있는 간단한 방법은 없는지 검토한다.

가장 먼저 변수의 이름을 더 명확하게 바꿔보자.

자바스크립트와 같은 동적 타입 언어를 사용할 때는 타입이 드러나게 작성하면 도움된다.

저자는 매개변수 이름에 접두어로 타입 이름을 적는데, 지금처럼 매개변수의 역할이 뚜력하지 않을 때는 부정 관사(a/an)를 붙인다.

방식은 켄트 백에게 배웠는데 쓰면 쓸수록 정말 유용한 것 같다.

*Smalltalk Best Practice Patterns(Addison-Wesley, 1997)*

> 컴퓨터가 이해하는 코드는 바보도 작성할 수 있다. 사람이 이해하도록 작성하는 프로그래머가 진정한 실력자다.

이렇게 이름을 바꿀만한 가치가 있을까? 물론이다.

좋은 코드라면 하는 일이 명확히 드러나야 하며, 이때 변수 이름은 커다란 역할을 한다.

그러니 명확성을 높이기 위한 이름 바꾸기에는 조금도 망설이지 말기 바란다.

### 1-4-1. play 변수 제거하기

---

저자는 긴 함수를 잘게 쪼갤 때마다 play 같은 변수를 최대한 제거한다.

이런 임시 변수들 때문에 로컬 범위에 존재하는 이름이 늘어나서 추출 작업이 복잡해지기 때문이다.

이를 해결해주는 리팩터링으로는 **임시 변수를 질의 함수로 바꾸기**가 있다.

컴파일 - 테스트 - 커밋한 다음 **변수 인라인하기**를 적용한다.

변수를 인라인한 덕분에 amountFor()에 **함수 선언 바꾸기**를 적용해서 play 매개변수를 제거할 수 있게 되었다.

지금까지 수행한 리팩터링에서 주목할 점이 몇 가지 있다.

이전 모드는 루프를 한 번 돌때마다 공연을 조회했는데 반해 리팩터링한 코드에서는 세 번이나 조회한다.

나중에 리팩터링과 성능 관계를 자세히 설명하겠지만, 지금 확인한 바로는 변경해도 성능에 큰 영향은 없다.

설사 심각하게 느려지더라도 제대로 리팩터링 된 코드베이스는 그렇지 않은 코드보다 성능을 개선하기가 훨씬 수월하다.

지역 변수를 제거해서 얻는 가장 큰 장점은 추출 작업이 훨씬 쉬워진다는 것이다.

유효 범위를 신경 써야 할 대상이 줄어를기 때문이다.

실제로 추출 작업 전에는 거의 항상 지역 변수부터 제거한다.

따라서 **변수 인라인하기**를 적용한다.

```js
function statement(invoice, plays){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명 : ${invoice.customer})\n`;
    const format = new Intl.NumberFormat(
        "en-us",
        {
            style : "currency", 
            currency: "USD", 
            minimumFractionDigits : 2
        }).format;
    
    for(let perf of invoice.performances){
        const play = playeFor(perf);
        ...
        // 청구 내역을 출력한다.     thisAmount 변수를 인라인한다.
        result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
        totalAmount += amountFor(perf);
    }
    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;
}
```

### 1-4-2. 적립 포인트 계산 코드 추출하기

---

지금까지 statement() 함수를 리팩터링한 결과는 다음과 같다.

```js
function statement(invoice, plays){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역(고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat(
        "en-us",
        {
            style : "currency", 
            currency: "USD", 
            minimumFractionDigits : 2
        }).format;

    for(let perf of invoice.performances){
        
        // 포인트를 적립한다.
        volumeCredits += Math.max(perf.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if("comedy" === playFor(perf).type)
            volumeCredits += Math.floor(perf.audience / 5);

        // 청구 내역을 출력한다.
        result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
        totalAmount += amountFor(perf);
    }
    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;
}
```
volumeCredits은 반복문을 돌 때마다 값을 누적해야 하기 때문에 살짝 까다롭다.

최선의 방법은 추출한 함수에서 volumeCredits의 복제본을 초기화한 뒤 계산 결과를 반환토록 하는 것이다.

누적하는 기능을 추출하자.

```js
function volumeCreditsFor(perf) { // 새로 추출한 함수
    let volumeCredits = 0;
    volumeCredits += Math.max(perf.audience - 30, 0);
    if("comedy" === playFor(perf).type)
            volumeCredits += Math.floor(perf.audience / 5);
    return volumeCredits;
}

function statement(invoice, plays){
    ...
    let volumeCredits = 0;
    ...

    for(let perf of invoice.performances){
        volumeCredits += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적한다.
        ...
    }
}
```
다시 컴파일-테스트-커밋을 한 다음 새로 추출한 함수에서 쓰이는 변수들 이름을 적절히 바꾼다.

```js
function volumeCreditsFor(perf) { // 새로 추출한 함수
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if("comedy" === playFor(perf).type)
            result += Math.floor(perf.audience / 5);
    return result;
}
```
변수 이름을 바꿨으니 컴파일-테스트-커밋을 한다.

### 1-4-2. format 변수 제거하기
앞에서 설명했듯이 임시 변수는 나중에 문제를 일으킬 수 있다.

임시 변수는 자신이 속한 루틴에서만 의미가 있어서 루틴이 길고 복잡해지기 쉽다.

따라서 다음으로 할 리팩터링은 이런 변수들을 제거하는 것이다.

format은 임시 변수에 함수를 대입한 형태인데

저자는 함수를 직접 선언해 사용하도록 바꾸는 편이다.

```js
function format(aNumber){
    return new Intl.NumberFormat("en-us",
        {
            style : "currency", 
            currency: "USD", 
            minimumFractionDigits : 2
        }).format(aNumber);
}
```
"format"은 함수가 하는 일을 충분히 설명해주지 못한다.

템플릿 문자열 안에서 사용될 이름이라서 "formatAsUSD"라고 하기에는 또 너무 장황하다.

이 함수의 핵심은 화폐 단위 맞추기다.

그래서 다음과 같이 **함수 선언 바꾸기**를 적용했다.

```js
function usd(aNumber){
    return new Intl.NumberFormat("en-us",
        {
            style : "currency", 
            currency: "USD", 
            minimumFractionDigits : 2
        }).format(aNumber/100); // 단위 변환 로직도 이 함수 안으로 이동
}

function statement(invoice, plays){
    ...
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    ...
}

```

이름짓기는 중요하면서도 쉽지 않은 작업이다.

긴 함수를 작게 쪼개는 리팩터링은 이름을 잘 지어야만 효과가 있다.

이름이 좋으면 함수 본문을 읽지 않고도 무슨 일을 하는지 알 수 있다.

당연히 단번에 좋은 이름을 짓기는 쉽지 않다.

처음에는 당장 떠오르는 최선의 이름을 사용하다가, 나중에 더 좋은 이름이 떠오를 때 바꾸는 식이 좋다.

흔히 코드를 두 번 이상 읽고 나서야 가장 적합한 이름이 떠오르곤 한다.

### 1-4-3. volumeCredits 변수 제거하기

---

이 변수는 반복문을 한 바퀴 돌 때마다 값을 누적하기 때문에 리팩터링하기가 더 까다롭다.

따라서 **반복문 쪼개기**로 volumeCredits 값이 누적되는 부분을 따로 빼낸다.

```js
for(let perf of invoice.performances){
    // 청구 내역을 출력한다.
    result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
}

for(let perf of invoice.performances){
    volumeCredits += volumeCreditsFor(perf); // 값 누적 로직을 별도의 for문으로 분리한다.
}
```

이어서 **문장 슬라이드하기**를 적용해서 volumeCredits 변수를 선언하는 문장을 반복문 바로 앞으로 옮긴다.


```js
    ...
let volumeCredits = 0; // 변수 선언(초기화)을 반복문 앞으로 이동한다.
for(let perf of invoice.performances){
    volumeCredits += volumeCreditsFor(perf);
}
    ...
```

volumeCredits 값 갱신과 관련된 문장들을 한곳에 모아두면 **임시 변수를 질의 함수로 바꾸기**가 수월해진다.

이번에도 volumeCredits 값 계산 코드를 **함수로 추출**하는 작업부터 한다.

```js
function totalVolumeCredits(){
    let volumeCredits = 0;

    for(let perf of invoice.performances){
       volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
}
```
함수 추출이 끝났다면 다음은 volumeCredits **변수를 인라인**할 차례다.

```js
function statement(invoice, plays){
    let totalAmount = 0;
    let result = `청구 내역(고객명: ${invoice.customer})\n`;
    for(let perf of invoice.performances){

        // 청구 내역을 출력한다.
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
        totalAmount += amountFor(perf);
    }
    result += `총액: ${usd(totalAmount)}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`; // 변수 인라인
    return result;
}
```
여기서 잠시 방금 한 일에 대해 생각해보자. 무엇보다도 반복문을 쪼개서 성능이 느려지지 않을까 걱정할 수 있다.

이처럼 반복문이 중복되는 것을 꺼리는 이들이 많지만, 이 정도 붕복은 성능에 미치는 영향이 미미할 때가 많다.

경험 많은 프로그래머조차 코드의 실제 성능을 정확히 예측하지 못한다.

똑똑한 컴파일러들은 최신 캐싱 기법 등으로 무장하고 있어서 우리의 직관을 초월하는 결과를 내어주기 때문이다.

때로는 리펙터링이 성능에 상당한 영향을 주기도 한다.

저자는 이런 경우라도 개의치 않고 리팩터링한다.

잘 다듬어진 코드이어야 성능 개선 작업도 훨씬 수월하기 때문이다.

리팩터링 과정에서 성능이 크게 떨어진다면 리팩터링 후 시간을 내어 성능을 개선한다.

이 과정에서 리팩터링된 코드를 예전으로 되돌리는 경우도 있지만 대체로 리팩터링 덕분에 성능 개선을 더 효과적으로 수행할 수 있다.

결과적으로 더 깔끔하면서 더 빠른 코드를 얻게 된다.

리팩터링으로 인한 성능 문제에 대한 저자의 조언은 **특별한 경우가 아니라면 일단 무시하라**는 것이다.

리택터링 때문에 성능이 떨어진다면, 하던 리팩터링을 마무리하고 나서 성능을 개선하자.

각 단계마다 컴파일-테스트-로컬 저장소에 커밋했다.

```
1. 반복문 쪼개기로 변수 값을 누적시키는 부분을 분리한다.

2. 문장 슬라이드하기로 변수 초기화 문장을 값 누적 코드 바로 앞으로 옮겼다.

3. 함수 추출하기로 적립 포인트 계산 부분을 별도 함수로 추출한다.

4. 변수 인라인하기로 volumeCredits 변수를 제거한다.
```

항상 단계를 잘게 나누는 것은 아니지만, 상황이 복잡해지면 단게를 더 작게 나누는 일을 가장 먼저 한다.

특히 리팩터링 중간에 테스트가 실패하고 원인을 바로 찾지 못하면 가장 최근 커밋으로 돌아가서 테스트에 실패한 단계를 더 작게 나눠 다시 시도한다.

이렇게 하면 문제를 해결할 수 있다.

반복문을 쪼개고, 변수 초기화 문장을 앞으로 옮긴 다음, 함수를 추출한다.

추출할 함수의 이름으로는 totalAmount가 가장 좋지만 이미 같은 이름의 변수가 있어서 쓸 수 없다.

그래서 아무 이름인 appleSauce를 붙여준다.

```js
function appleSauce(){
    let totalAmount = 0;
    for(let perf of invoice.performances){
        totalAmount += amountFor(perf);
    }
    return totalAmount;
}

function statement(invoice, plays){
    ...
    let totalAmount = appleSauce(); // 함수 추출 & 임시 이름 부여
    ...
}
```
변수를 인라인 한 후에 함수명을 totalAmount로 바꾸었다.

컴파일 - 테스트 - 로컬 저장소 커밋하고 추출한 totalAmount 함수 내에서 쓰인 변수명도 코딩 스타일에 맞게 변경한다.

### 1-5. 중간 점검: 난무하는 중첩 함수
코드 구조가 한결 깔끔해져서 결과적으로 각 계산 과정은 물론 전체 흐름을 이해하기가 훨씬 쉬워졌다.


```js
function statement(invoice, plays){
    let result = `청구 내역(고객명: ${invoice.customer})\n`;
    for(let perf of invoice.performances){
        // 청구 내역을 출력한다.
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    }
    result += `총액: ${usd(totalAmount())}\n`; // 변수 인라인 후 함수 이름을 바꾸었다.
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    return result;

    function totalAmount(){
        let result = 0;
        for(let perf of invoice.performances){
            result += amountFor(perf);
        }
        return result;
    }
    // 여기서부터 중첩 함수 시작
    function totalVolumeCredits(){
        let result = 0;
        for(let perf of invoice.performances){
            result += volumeCreditsFor(perf);
        }
        return result;
    }

    function usd(aNumber){
        return new Intl.NumberFormat("en-us",
            {
                style : "currency", 
                currency: "USD", 
                minimumFractionDigits : 2
            }).format(aNumber/100); // 단위 변환 로직도 이 함수 안으로 이동
    }

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if("comedy" === playFor(aPerformance).type)
                result += Math.floor(aPerformance.audience / 5);
        return result;
    }

    function playFor(aPerformance){
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance){
        let result = 0;
        switch(playFor(aPerformance).type){
            case "tragedy" :
                result = 40000;
                if(aPerformance.audience > 30){
                    this.Amount += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy" :
                result = 30000;
                if(aPerformance.audience > 20){
                    this.Amount += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
        }
        return result;
    } // amountFor() 끝
} // statement() 끝
```

### 1-6. 계산 단계와 포맷팅 단계 분리하기
지금까지는 프로그램의 논리적인 요소를 파악하기 쉽도록 코드의 구조를 보강하는 데 주안점을 두고 리팩터링했다.

리팩터링 초기 단계에서 흔히 수행하는 일이다.

복잡하게 얽힌 덩어리를 잘게 쪼개는 작업은 이름을 잘 짓는 일만큼 중요하다.

골격은 충분히 개선됐으니 이제 원하던 기능 변경, 즉 statement()의 HTML 버전을 만드는 작업을 살펴보자.

다양한 해결책 중 저자가 선호하는 방식은 **단계 쪼개기**다.

statement() 로직을 두 단계로 나누는 것이다.

첫 단계에서 statement()에 필요한 데이터를 처리하고 두 번째 단계에서는 앞서 처리한 결과를 텍스트나 HTML로 표현하도록 하자.

다시 말해 첫 번째 단게에서는 두 번째 단계로 전달할 중간 데이터 구조를 생성하는 것이다.

단계를 쪼개려면 먼저 두 번째 단계가 될 코드들을 **함수 추출하기**로 뽑아내야 한다.

```js
function statement(invoice, plays){
    return renderPlainText(invoice, plays); // 본문 전체를 별도 함수로 추출한다.
}

function renderPlainText(invoice, plays){
    let result = `청구 내역(고객명: ${invoice.customer})\n`;
    for(let perf of invoice.performances){
        // 청구 내역을 출력한다.
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    }
    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    return result;

    function totalAmount(){...}
    function totalVolumeCredits(){...}
    function usd(aNumber){...}
    function volumeCreditsFor(aPerformance) {...}
    function playFor(aPerformance){...}
    function amountFor(aPerformance){...}
}
```

