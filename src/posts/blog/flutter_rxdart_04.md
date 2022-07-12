---
title: "RxDart 변형 함수"
category: "Flutter"
date: "2022-07-09 15:13:00 +09:00"
desc: "테스트코드로 알아보는 변형 함수 "
thumbnail: "./images/flutter/reactivex_logo.jpg"
alt: "flutter"
---

### 들어가며

RxDart는 'dart:async' 패키지의 Dart Stream을 대체하기 위해 자체 Observable 클래스를 제공하지 않습니다.

기본 제공되는 'dart:async' 패키지의 Stream 및 StreamController에 확장 기능을 구현한 것입니다.

<a href="https://api.dart.dev/stable/2.9.0/dart-async/Stream-class.html" target="_blank">기본 제공되는 Stream 보러가기</a>

### 표준 Rx와 RxDart(Stream API) 비교해보기
Stream과 Observable은 같은 방식으로 구현하지만 표준 Rx에 익숙하다면 RxDart의 일부 기능에 놀랄 수 있습니다.

아래 표준 Rx와 RxDart를 비교해 보겠습니다.

|  | **표준 Rx** | **Rx Dart** |
|---| --- | --- |
| 오류가 발생했을때 | 오류 출력과 Observable 종료  | 오류가 발생하고 스트림은 계속됨 |
| Cold Observable | 여러 구독자가 동일한 Cold Observable을 구독할 수 있으며 각 구독은 고유한 데이터 스트림을 받음 | 단일 구독만 가능 |
| Hot Observable 사용 | 사용 가능 | BroadCastStream으로 사용 가능 |
| Publish, Behavior, ReplaySubject를 HotObservable로 사용하는지? | 사용 가능 | 사용 가능 |
| Single / Maybe / Complete 사용 여부 | 사용 가능 | 사용 불가, Dart Future로 대체 사용 |
| Back pressure 지원 여부 | 지원함 | 지원함 |
| null을 emit할 수 있는지? | RxJava만 불가능 이외에는 사용 가능 | 사용 가능 |
| Sync by default | 사용 가능 | 사용 불가 |
| 구독을 일시중지, 다시시작 할 수 있는지? | 사용 불가 | 사용 가능 |

<br>

<a href="https://pub.dev/documentation/rxdart/latest/rx/Rx-class.html" target="_blank">Rx Dart 공식 홈페이지 방문하기</a>
<br>
<a href="http://reactivex.io/RxJava/javadoc/io/reactivex/Observable.html" target="_blank">reactiveX.io 방문하기</a>


## 변형 함수 (Transformer)
Rx 라이브러리는 변형(backpressured)함수와 변형(non-backpressured)함수, 두 가지 변형 함수를 제공합니다.

배압의 유무는 Observable 클래스의 포함 유무 차이로 많은 함수가 Observable 클래스를 기반으로 구현되어 있습니다.

### ConcatWith
Stream에서 모든 항목을 방출한 다음 지정된 Stream의 모든 항목을 차례대로 내보내는 Stream을 반환합니다.

![ConcatWith](https://user-images.githubusercontent.com/85836879/178094248-62d3b159-37e3-4e3e-9590-bf8b0e53cd11.png)

```js
test('Stream을 방출한 뒤 지정된 Stream을 순서대로 이어서 방출해야 한다.', () async {
    // given
    final delayedStream = Rx.timer(1, const Duration(milliseconds: 10));
    final immediateStream = Stream.value(2);

    // when
    final concatWithStream = delayedStream.concatWith([immediateStream]);

    // then
    await expectLater(concatWithStream, emitsInOrder([1, 2, emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### StartWith
Stream이 값을 방출할 때 방출되는 항목 앞에 값을 추가합니다.

![StartWith](https://user-images.githubusercontent.com/85836879/178416757-bbbcc20f-871a-4b30-bf45-37aaffcd4a9e.png)

```js
class StreamUtil{
    Stream<int> getIterableStream({required int length, int? start}) =>
        Stream.fromIterable(
            List.generate(length, (index) => index + (start ??= 0)));
}

test('Stream을 방출할 때 첫 번째 항목으로 지정된 값을 추가해야 한다.', () async {
    // given
    final temp = StreamUtil.getIterableStream(length: 5, startWith: 1);

    // when
    final stream = temp.startWith(0);

    // then
    await expectLater(stream, emitsInOrder([0, 1, 2, 3, 4, 5, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));
```

### StartWithMany
Stream이 값을 방출할 때 방출되는 값 앞에 List 타입을 추가합니다.

```js
test('Stream을 방출할 때 첫 번째 항목으로 List 값을 추가해야 한다.', () async {
    // given
    final temp = StreamUtil.getIterableStream(length: 5, startWith: 1);

    // when
    final stream = temp.startWithMany([-1, 0]);

    // then
    await expectLater(stream, emitsInOrder([-1, 0, 1, 2, 3, 4, 5, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));
```

### EndWith
Stream이 값을 방출한 후에 방출된 항목 뒤에 값을 추가합니다.

```js
test('Stream을 방출할 때 마지막 항목으로 지정된 값을 추가해야 한다.', () async {
    // given
    final temp = StreamUtil.getIterableStream(length: 5, start: 1);

    // when
    final stream = temp.endWith(6);

    // then
    await expectLater(stream, emitsInOrder([1, 2, 3, 4, 5, 6, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));
```

### EndWithMany
Stream이 값을 방출한 후에 방출된 항목 뒤에 List 타입을 추가합니다.

```js
test('Stream을 방출할 때 마지막 항목으로 List 값을 추가해야 한다.', () async {
    // given
    final temp = StreamUtil.getIterableStream(length: 5, start: 1);

    // when
    final stream = temp.endWithMany([6, 7]);

    // then
    await expectLater(stream, emitsInOrder([1, 2, 3, 4, 5, 6, 7, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));
```

### ZipWith
주어진 Zip 함수를 사용하여 현재 Stream을 다른 Stream과 결합한 Stream을 방출합니다.

![ZipWith](https://user-images.githubusercontent.com/85836879/178418266-1f650989-f657-4926-8cb5-d3128c2a7404.png)

```js
test('주어진 Zip 함수를 이용해 Stream과 결합해 방출해야 한다.', () async {
    // given
    final temp = Stream<int>.value(1);

    // when
    final stream =
        temp.zipWith(Stream<int>.value(2), (int temp, int zip) => temp + zip);

    // then
    await expectLater(stream, emitsInOrder([3]));
}, timeout: const Timeout(Duration(seconds: 10)));
```

### MergeWith
