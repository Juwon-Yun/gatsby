---
title: "RxDart 맛보기"
category: "Flutter"
date: "2022-06-23 19:07:00 +09:00"
desc: "RxDart 테스트코드 작성기"
thumbnail: "./images/flutter/flutter_logo.jpg"
alt: "flutter"
---

### 들어가며

RxDart는 'dart:async' 패키지의 Dart Stream을 대체하기 위해 자체 Observable 클래스를 제공하지 않습니다.

기본 제공되는 'dart:async' 패키지의 Stream 및 StreamController에 확장 기능을 구현한 것입니다.

<a href="https://api.dart.dev/stable/2.9.0/dart-async/Stream-class.html" target="_blank">기본 제공되는 Stream보러가기</a>

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
| null을 emit할 수 있는지? | RxJava만 불가능 이외에는 가능 | 가능 |
| Sync by default | 가능 | 불가능 |
| 구독을 일시중지, 다시시작 할 수 있는지? | 불가능 | 가능 |



<a href="https://pub.dev/documentation/rxdart/latest/rx/Rx-class.html" target="_blank">Rx Dart 보러가기</a>

## Factory(생성 함수)

### CombineLatest
Stream 중 하나가 아이템을 방출할 때마다 결합하여 Stream을 하나의 Stream 시퀀스로 병합하는 메소드

모든 Stream이 하나 이상의 아이템을 방출할 때까지 Stream이 방출되지 않습니다.

![image](https://user-images.githubusercontent.com/85836879/175301530-0124e7ce-ba7c-4f60-891a-8ad9c461806f.png)

```js
import 'package:flutter_test/flutter_test.dart';
import 'package:rxdart/rxdart.dart';

void main() {
    test('test 1 : 각 스트림에서 모든 값이 한 개 이상 방출되었을 때 가장 최근 값들을 합쳐 방출해야 한다.', () async {
    // given
    var a = Stream.fromIterable(['a']),
        b = Stream.fromIterable(['b']),
        c = Stream.fromIterable(['c', 'd']);

    // when
    final stream = Rx.combineLatestList([a, b, c]);

    // then
    await expectLater(
        stream,
        emitsInOrder([
          ['a', 'b', 'c'],
          ['a', 'b', 'd'],
          emitsDone
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

    test('test 2 : 각 스트림에서 모든 값이 한 개 이상 방출되었을 때, 가장 최근값들의 가장 마지막 값을 합쳐 방출해야 한다.',  () async {
    // given
    var a = Stream.fromIterable(['a']),
        b = Stream.fromIterable(['b']),
        c = Stream.fromIterable(['c', 'd']);

    // when
    // 가장 마지막 값을 합치는 조건 추가
    final stream =
        Rx.combineLatest([a, b, c], (List<String> values) => values.last);

    // then
    await expectLater(stream, emitsInOrder(['c', 'd', emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 10)));
}

```

> test 1의 emitsInOrder 매개변수를 다르게 작성한 경우 가장 최근 값들을 방출하는 것을 알 수 있다.
![스크린샷 2022-06-23 오후 9 37 05](https://user-images.githubusercontent.com/85836879/175300264-251caf3a-5aa3-4dae-b664-48c4eb05ac9f.png)



<a href="https://pub.dev/documentation/rxdart/latest/rx/Rx/combineLatest.html" target="_blank">combineLatest 보러가기</a>

### Concat
이전 Stream 순서가 성공적으로 종료되는 한 지정된 모든 Stream 순서를 연결합니다.

각 Stream을 하나씩 구독하여 모든 항목을 방출하고 다음 Stream을 구독하기 전에 완료하여 이를 수행합니다.

![image](https://user-images.githubusercontent.com/85836879/175303129-c5ea9e16-504d-4d80-9296-2d3bb52c11db.png)

```js
  test('test 3 : 0, 1, 2, 3, 4, 5가 순차적으로 발행되어야 한다.', () {
    //given
    var a = Stream.fromIterable([0, 1, 2]), b = Stream.fromIterable([3, 4, 5]);

    // when
    final stream = Rx.concat([a, b]);

    // then
    expect(stream, emitsInOrder([0, 1, 2, 3, 4, 5]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### ConcatEager
이전 Stream 순서가 성공적으로 종료되는 한 지정된 모든 Stream 순서로 연결합니다.

다음 스크림 이후에 하나의 Stream을 구독하지 않고 모든 Stream이 구독됩니다.

그런 다음 이전 Stream이 아이템을 방출한 이후에 이벤트가 생성됩니다.

![ismage](https://user-images.githubusercontent.com/85836879/175467063-872b046d-3c99-4055-9276-6519782f0d14.png)

```js
test('test 4 : 0, 1, 2, 3, 4, 5가 순차적으로 발행되어야 한다.', () {
    //given
    var a = Stream.fromIterable([0, 1, 2]), b = Stream.fromIterable([3, 4, 5]);

    // when
    final stream = Rx.concatEager([a, b]);

    // then
    expect(stream, emitsInOrder([0, 1, 2, 3, 4, 5]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### Defer 
Defer는 Stream이 구독할 때까지 기다린 다음 지정된 팩토리 기능으로 스트림을 만듭니다.

경우에 따라 Stream을 생성하기 위해 마지막 구독 시간까지 대기하며 Stream에 최신 데이터가 포함됩니다.

기본적으로 DeferStreams는 단일 구독이지만 재사용할 수 있습니다.

![ismage](https://user-images.githubusercontent.com/85836879/175467865-5d932893-be0f-4f90-85ad-d339e9ba5b68.png)

```js
test('defer 기본', () {
    // given
    var a = Stream.value(1);

    // when
    final stream = Rx.defer(() => a);

    // then
    stream.listen(expectAsync1(
      (event) {
        expect(event, 1);
      },
      count: 1,
    ));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('defer는 단일 구독이 기본이므로 여러번 구독했을때 실패해야한다.', () {
    // given
    var a = Stream.value(1);

    // when
    final stream = Rx.defer(() => a);

    // then
    try {
      stream.listen(null);
      stream.listen(null);
    } catch (error) {
      print(error); // Bad state: Stream has already been listened to.
      expect(error, isStateError);
    }
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('reusable이 true일때 defer는 재구독이 가능해야 한다.', () {
    // given
    var a = Stream.value(1);

    // when
    final stream = Rx.defer(
        () => Stream.fromFuture(
              Future.delayed(
                const Duration(seconds: 1),
                () => a,
              ),
            ),
        reusable: true);

    // then
    stream.listen(expectAsync1((actual) => expect(actual, a), count: 1));
    stream.listen(expectAsync1((actual) => expect(actual, a), count: 1));
  }, timeout: const Timeout(Duration(seconds: 10)));
```