---
title: "RxDart"
category: "Flutter"
date: "2022-06-14 12:56:00 +09:00"
desc: "RxDart와 반응형 프로그래밍"
thumbnail: "./images/flutter/flutter_logo.jpg"
alt: "flutter"
---
![reactive_x](https://user-images.githubusercontent.com/85836879/173492814-3412c81e-2a19-4c74-8a68-20fcd4fc8bca.png)

### 들어가며
반응형 프로그래밍은 어떠한 라이브러리나 구현체가 아닌 하나의 관점 또는 패러다임입니다.

하지만 구체적인 예시가 없는 설명은 이해를 어렵게 만들 뿐입니다.

이 글에서는 JavaScript와 Dart를 통해 반응형 프로그래밍을 설명하겠습니다.

( 객체지향을 Java를 통해 설명하듯 )

### 실제 문제를 상상해보자!
당신은 아래와 같은 자동완성을 구현해달라는 요청을 받았습니다.

어떻게 코딩할지 상상해 봅시다!

    타이핑 할때 마다 서버에서 데이터를 받아서 보여주세요.
    
    너무 잦은 요청은 부하가 심하니 타이핑 간격이 좁으면 대기하다가 입력이 늦어지면 그때 서버에 요청하세요.

    같은 내용일때는 요청하지 마세요.

    일정 시간 동안 응답이 없으면 3회 재시도하고 그대로 응답이 없으면 에러 메시지를 출력해 주세요.

    데이터는 캐시로 보관을 해서 먼저 보여주고 요청이 완료되면 새로 갱신된 데이터를 보여주세요.

    최종 입력 버튼을 누르면 요청한 건 취소하고 검색 결과를 보여주세요.

상상해 보셨나요?

![images_teo_post_779e322b-cd21-42bc-a6ce-d8ab6872bbd6_image](https://user-images.githubusercontent.com/85836879/173491742-6443d4e2-c6f5-4fa2-bbdb-ab8a484a468d.png)


JavsScript의 Promise, async/await가 이 문제를 해결 할 수 있을까요?

위의 내용을 기존 pull 기반의 비동기 순서를 맞추는 방식의 패러다임에서는 비동기가 복합적으로 존재하게되면 개발 난이도가 비약적으로 어려워지게 됩니다.

전통적인 백엔드에서는 하나의 request에서 비동기가 여러개가 있더라도 순차적으로 처리해 하나의 response를 만들어주면 되지만 프론트엔드는 사용자의 동작과 서버의 동작에 대한 비동기 동작이 혼재되어 있는 세상입니다.

어떻게 하면 이러한 복합적인 비동기 세상에서 조금 더 프로그래밍을 잘 할 수 있을까요?

Rx와 반응형 패러다임은 어떠한 방식으로 이 비동기 문제를 접근하는지 한번 살펴보도록 하겠습니다.

### 반응형 프로그래밍 
반응형 프로그래밍은 변경을 감지하고 전파하고 선언적으로 프로그래밍을 작성한다는 패러다임을 구현하기 위해서 아래와 같은 구조를 가지고 있습니다.

![images_teo_post_d7e1d6ef-5867-4566-a11f-e816fed8a3fd_image](https://user-images.githubusercontent.com/85836879/173492139-9e3084b2-b450-41df-81f7-223af455ca1c.png)

> JavaScript의 addEventlistener?

네, DOM에서 쓰는 이벤트 리스너를 등록하고 전달하는 방식 역시 반응형 프로그래밍입니다.

이러한 방식으로 웹은 자연스레 반응형 프로그래밍의 구조를 따르게 되었죠.

우리가 구현하고자 하는 방향은 이러한 Event Listener의 관점으로 프로그래밍을 하는 것입니다.

### ReactiveX
#### Stream을 이용한 개발!
우리는 Rx와 같은 반응형 프로그래밍 라이브러리를 이용해서 이러한 구조를 만들게되면 보다 프로그래밍을 단순한 관점으로 개발할 수 있게 됩니다.

### Rx는 무엇인가요?
> ReactiveX
> 
> An API for asynchronous programming with observable streams
> 
> 관측가능한 스트림을 통한 비동기 프로그래밍을 하기 위한 API

Rx를 알고나면 이 정의가 너무나 당현하지만 이해하는 과정이 길고 복잡합니다.
비동기(asynchronous), 옵저버블(observable), 스트림(streams)이라는 키워드만 일단 기억합시다!

비동기 프로그래밍은 실행 순서와 데이터를 제어하기가 어렵습니다.

하지만 프론트엔드는 비동기 프로그래밍 덩어리입니다.

그렇기에 조금 더 간결하고 쉬운 개발을 하기 위한 관점과 체계가 필요했고 그것이 바로 반응형 프로그래밍입니다.

반응형 프로그래밍은 변경사항의 전파와 데이터 흐름을 중심으로 선언적으로 작성하여 어려움을 해결합니다.

그러기 위해서는 Pull -> Push의 패러다임 전환이 필요하고 이를 구현하기 위해서는 Event와 같은 방식을 통해 제어의 역전을 만들어야 합니다.

( SOLID의 I, IOC가 맞습니다! )

여기서 우리는 다음과 같은 사실을 하나 얻을 수 있습니다.

> 변경사항의 전파 + 데이터의 흐름 = Event 이구나!

그래서 우리는 반응형 프로그래밍을 다음과 같이 확장을 할 수 있게 됩니다.

> Event + 선언형 프로그래밍 = 반응형 프로그래밍
>
> 즉, 반응형 프로그래밍이란 이벤트를 선언적으로 작성하는 프로그래밍 패러다임

### Event를 Stream으로 대체
Rx에서는 이러한 이벤트의 종류를 Next, Error, Complete의 3가지 Type을 정의해 조금 더 보편적인 상황을 처리할 수 있도록 정의하였습니다.

![images_teo_post_5300b104-dad8-4fa0-8253-c70760d670bd_image](https://user-images.githubusercontent.com/85836879/173493925-eb7cfa5b-1d26-435a-ac7a-01581e01e536.png)


(try, catch, finally와 같은 맥락으로 이해하시면 도움될 것 같아요.)

> 스트림 + 선언형 프로그래밍 = 반응형 프로그래밍
> 
> 반응형 프로그래밍이란 스트림을 선언적으로 작성하는 프로그래밍 패러다임!

### 선언형 프로그래밍이라는 것! 
반응형 프로그래밍을 이해하기 위해 살짝 돌아가겠지만 선언적 프로그래밍을 예시코드 하나로 생각해봅시다!

잘 알고 계시는 것으로 for 반복문과 Array Method의 차이입니다.

```js
    // 명령형 프로그래밍
    function total(numbers: int[]): int{
        let sum = 0;
        for(let i = 0; i < numbers.length; i++){
            sum += numbers[i];
        }
        return sum;
    }
    
    // 선언형 프로그래밍
    function total(numbers){
        return numbers.reduce((pre, cur)=> pre + cur);
    }

```

우리는 for가 아니라 .map, .reduce를 사용하게 되면 Array를 선언적으로 다룰 수 있다는 사실을 알고 있습니다.

이러한 방식처럼 Stream도 선언적으로 다룰 수 있지 않을까요? 

### 스트림을 선언적으로 작성한다는 것!
#### Stream을 Array Method처럼 만들어서 사용해보자

일단 배열을 선언형으로 랜덤한 숫자에서 짝수만 골라 출력하는 프로그램입니다.

```js
void main() {
  final random = Random();
  final ran = [1, 2, 3, 4, 5].map(
          (e) => random.nextInt(e * 10)).where((element) => element %  2 == 0);
  print(ran);
}
```

잘은 모르겠지만 Array의 값 대신 Stream 객체를 통해 1초마다 랜덤한 숫자를 받아서 짝수를 출력하기는 어떻까요.

그렇다면 다음과 같은 코드의 형태로 작성할 수 있을 것 같습니다.

```js
void main() {
  final random = Random();
  getNumberStream().listen((event) {
    var ranEvent = random.nextInt(event * 10);
    if(ranEvent % 2 == 0){
      print(ranEvent);
    }
  });
}

Stream<int> getNumberStream() async* {
  for (int i = 1; i < 11; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}
```

> 축하합니다! 이제 우리는 비동기 프로그래밍을 스트림을 통해 선언적으로 프로그래밍을 할 수 있게 되었습니다!

이렇듯 이벤트를 하나의 값으로 생각하고 이를 Array Method를 다루듯이 작성한다면 훨씬 더 직관적이고 간결하게 프로그래밍을 할 수 있을 것 같습니다.

( 실제로 1초마다 숫자를 받아서 짝수를 축력하기를 그냥 구현하면 어떻게 코딩을 할지 상상해보세요. )

### Rx는 무엇인가요?
![images_teo_post_2e9989a7-4280-4d72-9e1f-fbf0361d754a_image](https://user-images.githubusercontent.com/85836879/173501135-5f538d00-8c6b-41e9-b9f9-aecef34b45b4.png)

다시보는 Rx의 정의

> An API for asynchronous programming with observable streams
> 
> 관층가능한 스트림을 통해 비동기 프로그래밍을 하기 위한 API

![images_teo_post_5e9e8cf5-5706-4ccc-b4ba-ae1cb2389822_image](https://user-images.githubusercontent.com/85836879/173501322-a7a73f1e-9309-4624-8598-419c53d1082d.png)

> 스트림(Stream) + 선언형 프로그래밍 = 반응형 프로그래밍
> 
> 반응형 프로그래밍이란 스트림을 선언적으로 작성하는 프로그래밍 패러다임

결국 반응형 프로그래밍의 최종적인 정리는 이것입니다.

> 데이터의 흐름과 변경사항의 전파에 중점을 둔 선언적 프로그래밍 패러다임.
> 
> 즉, 모든 것을 스트림으로 간주하고 선언적으로 개발하는 것

![images_teo_post_1ec0239c-4abb-4de5-bbc6-4fefc9f0aee2_image](https://user-images.githubusercontent.com/85836879/173501650-1d3275bd-4f95-4653-8599-e670709e5811.png)

Array, Iterator, Promise, Callback, Event를 모두 스트림이라고 하는 하나의 관점으로 간주하고 개발을 하는 패러다임이 바로 반응형 프로그래밍입니다.

### 끝으로... 
객체지향 프로그래밍, 함수형 프로그래밍 같이 프로그래밍에는 여러가지 패러다임이 존재합니다. 이러한 패러다임을 이해하면 프ㅗ그램을 작성할 때 일관성있고 좋은 관점을 가질 수 있고 설계와 결정에 도움을 줍니다.

반응형 프로그래밍은 스프레드 시트와 같이 미리 선언된 방식에 데이터의 변경을 전파하여 프로그램이 동작하게 만드는 방식의 패러다임을 말합니다.

이러한 반응형 프로그래밍은 비동기 프로그래밍을 조금 더 간결하게 바라볼 수 있는 관점을 제공해줍니다.

프론트엔드는 비동기 프로그래밍 덩어리이므로 반응형 프로그래밍 패러다임은 프론트엔드에서 중요한 패러다임이 되었습니다.

상태관리 역시 그러합니다.

아직 RxDart를 이용한 내장 메소드로 테스트 코드 예시를 못 보여드렸는데요.

보여줄게 많은 것 같습니다.

감사합니다!