---
title: "Future와 Stream"
category: "Flutter"
date: "2022-06-12 14:32:00 +09:00"
desc: "반응형 프로그래밍"
thumbnail: "./images/flutter/flutter_logo.jpg"
alt: "flutter"
---

## 들어가며... 
소프트웨어 개발에서의 비동기 개념은 빼놓을 수 없는 중요한 주제입니다.

Dart에서 사용하는 비동기 객체인 Future와 Stream을 알아보고 소개하는 글이에요.

Future와 Stream의 주된 사용은 비동기 로직으로 로컬, 네트워크등의 데이터를 가져와 반응형으로 UI를 렌더링할 때 사용됩니다.

## Future
비동기적인 연산자(Asynchronous operation)는 다른 연산이 끝날 때까지 프로그램이 기다려주게 하는 것입니다.

네트워크에서 데이터를 가져오거나, 파일에서 데이터를 가져오는 등의 작업은 많은 시간을 필요하기 때문에 이러한 비동기적인 작업이 필수입니다.

future는 Future 클래스의 인스턴스이며 future는 비동기적인 연산에 대한 결과를 나타내는 것에 사용됩니다.

## 두가지 또는 세가지 상태의 Future


### Uncompleted
비동기 함수를 호출 했을 때, uncompleted future를 반환합니다.

해당 future는 함수의 비동기적인 연산이 끝나는 것을 기다리고 있습니다.

### Completing with a value
Future T 타입의 future는 T 타입을 반환합니다.

### Completing with a error
어떠한 이유로 연산이 정상적으로 완료되지 않으면 future는 error를 반환하며 완료됩니다.

## async와 await
비동기 함수를 사용하기 위한 방법입니다.

JavsScript ES7 문법에 있는 async와 await 문법과 유사합니다.

async function을 정의하기 위해서는 function의 함수절 이전에 async를 사용합니다.

await은 async function 안에서만 사용합니다.

``` java
Future<String> createOrderMessage() async {
  final order = await fetchUserOrder();
  return '주문 내역 : $order';
}

Future<String> fetchUserOrder() =>
    Future.delayed(
      Duration(seconds: 2),
      () => '2초가 지났습니다.',
    );

Future<void> main() async {
  print('사용자의 주문을 요청하고 있습니다.');
  print(await createOrderMessage());
}
```
함수의 반한 타입이 달라진 것과 async, await 키워드가 추가된 것을 주목하세요.

future를 내보내는 함수 내부에서 콜백함수를 통해 여러가지 행동을 추가할 수 있으며 

try/catch 구문으로 에러 또한 핸들링 할 수 있습니다.

<a href="https://dart.dev/codelabs/async-await" target="_blank">Dart Future 공식문서 방문하기</a>

## Stream
stream은 비동기 이벤트의 시퀀스입니다. 이것은 비동기식 Iterable과 같습니다.

즉, 요청할 때 다음 이벤트를 가져오는 대신에 stream이 준비되면 이벤트가 있다고 알려줍니다.

## Stream Event 받기
stream은 다양한 방법으로 생성할 수 있으며 비동기적인 await for 반복문은 일반 for 루프가 반복되는 것처럼 stream의 이벤트를 반복합니다.

```java
Future<int> sumStream(Stream<int> stream) async {
  var sum = 0;
  await for (var value in stream) {
    sum += value;
  }
  return sum;
}
```

await for 구문을 주목해야 합니다.

한번의 반복이 끝나면 다음 이벤트가 도착하거나 stream이 완료될 때까지 함수가 일시 중지됩니다.

## Stream Event 만들기
```java
Future<int> sumStream(Stream<int> stream) async {
  var sum = 0;
  await for (var value in stream) {
    sum += value;
  }
  return sum;
}

Stream<int> countStream(int to) async* {
  for (int i = 1; i <= to; i++) {
    yield i;
  }
}

main() async {
  var stream = countStream(10);
  var sum = await sumStream(stream);
  print(sum); // 55
}
```

## 두가지 타입의 Stream

### 단일 구독 스트림
구독자가 하나만 존재하는 Stream입니다.

가장 일반적인 종류의 Stream으로 이벤트는 올바른 순서로 전달되어야합니다. 

단일 구독 Stream은 파일을 읽거나 요청을 할 때 데이터를 얻을 수 있는 종류의 Stream입니다.

단일 구독 Stream은 Stream은 한번만 구독할 수 있습니다.

한번의 구독 이후에 재구독을 실행하면 에러를 발생합니다.

구독 후에 이벤트를 받기 시작하면 데이터를 가져와 제공합니다. 

### 방송 스트림 ( BroadCast Stream )
구독자가 두개 이상인 Stream입니다.

언제든지 Stream을 구독할 수 있으며 또한 구독하는 동안 발생하는 이벤트를 얻을 수 있고 한개 이상의 구독자가 동시에 구독할 수 있습니다.

단일 구독 Stream과는 다르게 구독을 닫은 이후에 다시 구독할 수 있습니다.

## 마치며...
Stream의 단일 구독과 다중 구독(BroadCast Stream)이 이해하기 어렵다면 WebSocket의 ws 서버로 취급한다면 이해하는데 도움될 것 같아요.

<a href="https://dart.dev/tutorials/language/streams" target="_blank">Dart Stream 공식문서 방문하기</a>
