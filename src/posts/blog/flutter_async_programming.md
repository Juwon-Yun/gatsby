---
title: "Future와 Stream"
category: "Flutter"
date: "2022-06-12 14:32:00 +09:00"
desc: "반응형 프로그래밍"
thumbnail: "./images/flutter/flutter_logo.jpg"
alt: "flutter"
---

### 소개 
소프트웨어 개발을 하면서 비동기는 아주 중요한 개념이라고 생각합니다.

Flutter에서 사용되는 비동기 객체인 Future와 Stream 개념을 집고 넘어가려고 합니다.

Future와 Stream은 비동기적 로직을 통해 데이터를 가져와 반응형 프로그래밍을 할 때 사용됩니다.

### Future
Asynchronous operation은 다른 operation이 끝날 때까지 프로그램이 기다려주게 하는 것입니다.

네트워크에서 데이터를 fetch해 오거나, file에서 데이터를 가져오는 등의 작업은 많은 시간을 필요 하기 때문에 이러한 비동기적인 작업이 필요합니다.

future는 Future 클래스의 인스턴스이며 future는 비동기적인 operation의 결과를 나타내는 것에 사용됩니다.

### 두가지 또는 세가지 상태의 Future
#### Uncompleted
비동기 함수를 call 했을 때, uncompleted future를 반환합니다.

해당 future는 함수의 비동기적인 operation이 끝나는 것을 기다리고 있습니다.

#### Completing with a value
Future<T> 타입의 future는 T 타입을 반환합니다.

#### Completing with a error
어떠한 이유로 operation이 정상적으로 완료되지 않으면 future는 error를 반환하며 완료됩니다.

### async와 await
비동기 함수를 사용하기 위한 방법입니다.

JavsScript ES7 문법에 있는 async와 await 문법과 유사합니다.

async function을 정의하기 위해서는 function의 함수절 전에 async를 사용합니다.

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

future를 내보내는 함수 내부에서 callback을 통해 여러 일들을 추가할 수 있으며 

try/catch 구문으로 에러 또한 핸들링 할 수 있습니다.

[다트 Future 공식문서](https://dart.dev/codelabs/async-await)

### Stream
stream은 비동기 이벤트의 시퀀스입니다. 이것은 비동기식 Iterable과 같습니다.

즉, 요청할 때 다음 이벤트를 가져오는 대신 스트림이 준비되면 이벤트가 있다고 알려줍니다.

### Stream Event 받기
stream은 다양한 방법으로 생성할 수 있으며 비동기 for 루프는 for 루프가 반복되는 것처럼 스트림의 이벤트를 반복합니다.

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

루프 본문이 끝나면 다음 이벤트가 도착하거나 stream이 완료될 때까지 함수가 일시 중지됩니다.

### Stream Event 만들기
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

### 두가지 타입의 Stream

#### 단일 구독 스트림
Listener가 하나인 Stream입니다.

가장 일반적인 종류의 스트림으로 이벤트는 올바른 순서로 전달되어야합니다. 

단일 구독 스트림은 파일을 읽거나 웹 요청을 받을 때 얻을 수 있는 종류의 스트림입니다.

이러한 Stream은 한 번만 구독할 수 있습니다.

구독 후에 이벤트를 받기 시작하면 데이터를 가져와 chunk로 제공합니다. 

#### 방송 스트림
Listener가 두개 이상인 Stream입니다.

언제든지 Stream을 구독할 수 있으며 듣는 동안 발생하는 이벤트를 얻을 수 있으며 한 명이상의 구독자가 동시에 구독할 수 있습니다.

구독을 취소한 후 나중에 다시 구독할 수 있습니다.

#### 추가적인 설명
Stream의 단일 구독과 다중 구독(BroadCast Stream)이 이해하기 어렵다면 WebSocket의 ws 서버로 취급한다면 이해하는데 도움될 것입니다.

[다트 Stream 공식문서](https://dart.dev/tutorials/language/streams)
