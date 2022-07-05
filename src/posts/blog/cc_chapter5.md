---
title: "Clean Code 5장"
category: "Etc"
date: "2022-04-07 23:58:00 +09:00"
desc: "형식 맞추기"
thumbnail: "./images/clean_code/cleancode_th.jpg"
alt: "형식 맞추기"
---

![Untitled](https://user-images.githubusercontent.com/85836879/170295027-fdccf73f-465c-4e3f-bbfa-a600ac89c472.png)

## 5장 형식 맞추기

---

코드 형식을 맞추기 위한 규칙 정하는 방법을 알려주는 챕터.

협업을 한다면 서로 합의해 규칙을 정하고 참여 인원은 해당 규칙을 따라야 한다.

필요하다면 규칙을 자동으로 적용하는 도구를 활용한다.

## 목차

---

-   [x]  형식을 맞추는 목적
-   [ ]  적절한 행 길이를 유지하라
-   [ ]  신문 기사처럼 작성하라
-   [x]  개념은 빈 행으로 분리하라
-   [ ]  세로 밀집도
-   [x]  수직 거리
-   [ ]  세로 순서
-   [ ]  가로 형식 맞추기
-   [ ]  가로 공백과 밀집도
-   [ ]  가로 정렬
-   [ ]  들여쓰기
-   [x]  가짜 범위
-   [ ]  팀 규칙
-   [ ]  밥 아저씨의 형식 규칙

## 5-1. 형식을 맞추는 목적

---

코드의 형식은 중요하다.

너무 중요해서 무시하기 어려울 정도이다.

형식을 융퉁성 없이 맹목적으로 따르기 보다는 의사소통의 한 가지 방법으로

전문성 이있는 프로그래머의 일차적인 의무이다.

돌아가는 코드가 전문 개발자의 일차적인 의무라 여길수도 있지만

오늘 구현한 기능이 다음 릴리즈 버전에서 바뀔 확률이 매우 높다.

오늘 구현한 코드의 가독성은 미래의 바뀔 코드의 품질에 지대한 영향을 미친다.

오랜 시간이 지나서 원본 코드의 흔적을 더 이상 찾아보기 어려울 정도로 코드가 바뀌어도 맨 처음 작성한 구현 스타일과 가독성 수준은 유지보수 용이성과 확장성에 계속해서 영향을 미친다.

## 5-2. 적절한 행 길이를 유지하라

---

![5-1](https://user-images.githubusercontent.com/85836879/177247235-f4ed87b5-24d9-44e8-96bc-2185b7848419.png)


프로젝트 7개를 묘사한 그래프이다.

상자를 관통하는 세로 선은 해당 프로젝트의 최대 파일 길이와 최소 파일 길이를 나타낸다.

상자는 대략 파일의 1/3을 차지하고 상자의 중간은 평균값을 의미한다.

일반적으로 큰 파일보다 작은 파일이 이해하기 쉽다.

### 5-2-1. 신문 기사처럼 작성하라

---

좋은 신문 기사를 떠올려보면 독자는 위에서 아래로 읽는다.

최상단에 기사를 요약하는 표제가 나오며 독자는 표제를 보고나서 기사를 읽을지 말지 결정한다.

첫 문단은 전체 내용을 요약하고 세세한 사실은 숨기고 커다란 그림을 보여준다.

코드도 기사와 비슷하게 작성한다.

이름은 간단 명료하면서도 설명이 가능하게 작명한다.

신문은 다양한 기사로 이뤄지며 대부분 길이가 아주 짧다.

한 면을 채우는 기사는 거의 드물다.

신문이 읽을 만한 이유는 여기에 있다.

### 5-2-2. 개념은 빈 행으로 분리하라

---

모든 코드는 왼쪽에서 오른쪽으로 그리고 위에서 아래로 읽힌다.

각 행은 수식이나 절을 나타내며, 일력의 행 묶음은 완결된 생각 하나를 표현한다.

생각 사이는 빈 행을 넣어 분리해야 마땅하다.

```java
public class BoldWidget extends ParentWidget {
    public static final String REGEXP = "'''. +?'''";
    
    private static final Pattern pattern = Pattern.compile("'''(.+?)'''", Pattern.MULTILINE + Pattern.DOTALL);

    public BoldWidget(ParentWidget parent, String text) throws Exception {
        super(parent);
        // ...
    }

    public String render() throws Exception {
        StringBuffer html =. new StringBuffer("<b>");
    //...
}
}
```

패키지 선언부, import 문, 각 함수 사이에 빈 행이 들어간다.

너무 간단한 규칙이지만 코드의 세로 레이아웃에 심오한 영향을 미친다.

빈행은 새로운 개념을 시작한다는 시각적인 단서이다.

코드를 읽어 내려가다 보면 빈 행 바로 다음 줄에 눈길이 멈춘다.

빈 행을 없애게 되면 코드 가독성은 현저히 떨어진다.

```java
public class BoldWidget extends ParentWidget {
    public static final String REGEXP = "'''. +?'''";
    
    private static final Pattern pattern = Pattern.compile("'''(.+?)'''", Pattern.MULTILINE + Pattern.DOTALL);
    
    public BoldWidget(ParentWidget parent, String text) throws Exception {
        super(parent);
    // ...
    }

    public String render() throws Exception {
        StringBuffer html =. new StringBuffer("<b>");
        //...
    }
}
```

### 5-2-3. 세로 밀집도

---

빈 행 혹은 줄 바꿈이 개념을 분리한다면 세로 밀집도는 연관성을 의미한다.

서로 밀접한 코드 행은 세로로 가까이 놓여야 한다는 뜻이다.

### 5-2-4. 수직거리

---

함수의 연관 관계와 작동 방식을 이해하려고 함수를 오가며 코드를 위 아래로 뒤지는 등 결국은 미로 같은 코드 때문에 혼란만 가중된 경험이 있는가?

함수나 변수가 정의된 코드를 찾으려 상속 관계를 줄줄이 거슬러 올라간 경험이 있는가?

좋은 경험이 아니다.

시스템이 무엇을 하는지 이해하고 싶은데 이 함수 저 함수가 어디에 있는지 찾고 기억하느라 시간과 노력을 소모한다.

서로 밀접한 개념은 세로로 가까이 둬야 한다.

물론 두 개념이 서로 다른 파일에 속한다면 규칙이 통하지 않는다.

하지만 타당한 이유가 없다면 서로 밀접한 개념은 하나의 파일에 속해야한다.

이게 바로 protected 접근 제한자를 피해야 하는 이유 중 하나이다.

같은 파일에 속할 정도로 밀접한 개념들은 세로 거리로 연관성을 표현한다.

연관성이란 하나의 개념을 이해하는 것에 다른 개념이 중요한 정도이다.

연관성이 깊은 두 개념이 멀리 떨어져 있으면 읽는 사람이 클래스를 여기저기 찾게된다.

### 5-2-5. 변수 선언

---

변수는 사용하는 위치에 최대한 가까이 선언한다.

우리가 만들 함수는 매우 짧으므로 지역 변수는 각 함수 맨 처음에 선언한다.

### 5-2-6. 종속 함수

---

한 함수가 다른 함수를 호출한다면 두 함수는 세로로 가까이 배치한다.

가능하다면 호출하는 함수를 호출되는 함수보다 먼저 배치한다.

규칙을 일관적으로 적용한다면 읽는 사람은 방금 호출한 함수가 잠시 후에 정의될거라는 사실을 예측한다.

### 5-2-7. 개념적 유사성

---

어떤 코드는 서로 끌어당긴다.

개념적인 친화도가 높기 때문이다.

친화도가 높을수록 서로 가까이 배치한다.

친화도가 높은 요인은 한 함수가 다른 함수를 호출해 생기는 직접적인 종속성이 예시다.

변수와 그 변수를 사용하는 함수도 한 예시이다.

또한 비슷한 동작을 수행하는 일군의 함수가 좋은 예시이다.

```java
public class Assert {
static public void assertTrue(String message, boolean condition) {
    if(!condition) {
        fail(message)
    }
}

static public void assertTure(boolean condition) {
    asertTrue(null, condition);
}

static public void assertFalse(String message, boolean condition) {
    assertTrue(message, !condition);
}

static public void assertFalse(boolean condition) {
    assertFalse(null, condition)
}
}
```

위의 함수들은 개념적인 친화도가 매우 높다.

명명법이 똑같고 기본 기능이 유사하고 간단하다.

서로가 서로를 호출하는 관계는 부차적인 요인이고 종속적인 관계가 없더라도 가까이 배치할 함수이다.

### 5-2-8. 세로 순서

---

일반적으로 함수 호출의 종속성은 아래 방향으로 유지한다.

자연스럽게 모듈이 고차원에서 저차원으로 내려간다.

### 5-3. 가로 형식 맞추기

---

가로의 길이는 짧은 편이 바람직하다.

100~120자 정도까지는 나쁘지 않다.

그 이상은 주의 부족을 나타낸다.

lint를 사용해서 120자가 넘어간다면 경고줄을 그어주는 도구를 사용하는게 좋다.

### 5-3-1. 가로 공백과 밀집도

---

가로로 공백을 사용해 밀접한 개념과 느슨한 개념을 표현한다.

```java
private void measureLine(String line) {
    lineCount++;

    // 할당 연산자가 강조되어 왼쪽/오른쪽 요소가 나뉨
    int lineSize = line.length();
    totalChars += lineSize;

    // 함수와 인수는 밀접하기에 공백을 넣지 않는다.
    // 인수들은 공백으로 분리(별개라는 점을 보여줌)
    lineWidthHistogram.addLine(lineSize, lineCount);
    recordWidestLine(lineSize);
}
```

### 5-3-2. 가로 정렬

---

유용하지 않은 가로 정렬.

```java
public class FitNesseExpediter implements ResponseSender {
    private     Socket         socket;
    private     InputStream    input;
    private     OutputStream   output;
    private     Reques         request;      
    private     Response       response; 
    private     FitNesseContex context; 
    protected   long           requestParsingTimeLimit;
    private     long           requestProgress;
    private     long           requestParsingDeadline;
    private     boolean        hasError;

	public FitNesseExpediter(Socket          s,
							 FitNesseContext context) throws Exception
	{
		this.context =            context;
		socket =                  s;
		input =                   s.getInputStream();
		output =                  s.getOutputStream();
		requestParsingTimeLimit = 10000;
	}
```

코드가 엉뚱한 부분을 강조해 진짜 의도를 감춘다.

선언부를 읽다 보면 변수 유형은 무시하고 이름만 읽게된다.

할당 연산자는 보이지 않고 오른쪽 피연산자에 시선이 집중된다.

코드 정렬을 자동으로 해주는 도구가 위와 같은 정렬을 무시한다.

아래와 같이 정렬해 작성한다.

```java
public class FitNesseExpediter implements ResponseSender {
    private Socket socket;
    private InputStream input;
    private OutputStream output;
    private Request request;      
    private Response response; 
    private FitNesseContex context; 
    protected long requestParsingTimeLimit;
    private long requestProgress;
    private long requestParsingDeadline;
    private boolean hasError;

	public FitNesseExpediter(Socket s,
		FitNesseContext context) throws Exception {
		this.context = context;
		socket = s;
		input = s.getInputStream();
		output = s.getOutputStream();
		requestParsingTimeLimit = 10000;
	}
}
```

### 5-3-3. 들여쓰기

---

소스 파일은 윤곽도와 계층이 비슷하다.

파일 전체에 적용되는 정보

파일 내 개별 클래스에 적용되는 정보

클래스 내 각각의 메서드에 적용되는 정보

블록 내 블록에 재귀적으로 적용되는 정보

계층에서 각 수준은 이름을 선언하는 범위이자 선언문과 실행문을 해석하는 범위이다.

이러한 범위를 표현하기 위해 들여쓰기를 사용한다.

각 코드를 들여쓰는 정도는 계층에서 코드가 자리잡은 수준에 비례한다.

파일 수준인 문장은 클래스정의와 같이 들여쓰지 않는다.

클래스 내의 메서드는 클래스보다 한 수준 들여쓴다.

블록 코드는 블록을 포함하는 코드보다 한 수준 들여쓴다.

들여쓰기를 통해 왼쪽으로 코드를 맞춰 코드가 속하는 범위를 시각적으로 표현할 수 있다.

### 5-3-4. 가짜 범위

---

비어있는 반복문은 쓰지 않는 것이 좋다.

불가피하게 사용할 경우 세미콜론을 다음 새 행에 들여써서 작성한다.

### 5-4. 팀 규칙

---

프로그래머라면 각자 선호하는 규칙이 있다.

팀에 속한다면 자신이 선호해야할 규칙은 팀 규칙이다.

팀은 한 가지 규칙에 합의해야 한다.

또한 모든 팀원은 규칙을 이행해야 한다.

개개인이 국밥처럼 맘대로 짜는 코드는 피해야 한다.

좋은 소프트웨어 시스템은 읽기 쉬운 문서로 이뤄진다는 사실을 기억해야 한다.

스타일은 일관적이고 매끄러워야 하며 하나의 파일에서 보았던 형식이 다른 파일에서도 쓰일 것이라는 신뢰감을 독자에게 심어줘야한다.

온갖 스타일을 뒤섞어 소스코드를 필요 이상으로 복잡하게 만드는 실수는 반드시 피한다.

### 결론

---

형식 맞추기란 단순 코드 스타일링과 가독성뿐만이 아니더라고 읽는 사람에게 정보를 전달하는 신문같은 역할을 한다.

eslint, prettier같은 형식 맞추는 도구로 팀 규칙을 정해 코드를 작성하는 것이 좋은 예시인 것 같다.

# 6장 객체와 자료구조
