---
title: "RxDart 변형 함수"
category: "Flutter"
date: "2022-07-01 00:32:00 +09:00"
desc: "테스트코드로 알아보는 변형 함수 "
thumbnail: "./images/flutter/reactivex_logo.jpg"
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
| null을 emit할 수 있는지? | RxJava만 불가능 이외에는 사용 가능 | 사용 가능 |
| Sync by default | 사용 가능 | 사용 불가 |
| 구독을 일시중지, 다시시작 할 수 있는지? | 사용 불가 | 사용 가능 |

<br>

<a href="https://pub.dev/documentation/rxdart/latest/rx/Rx-class.html" target="_blank">Rx Dart docs</a>
<br>
<a href="http://reactivex.io/RxJava/javadoc/io/reactivex/Observable.html" target="_blank">reactiveX.io</a>



## 변형 함수 (Transformer)

### Window
Stream에서 수집한 항목의 Window를 내보내는 Stream을 반환합니다.

출력 Stream은 겹치지 않는 연결된 Window를 보냅니다.

Stream 항목을 내보낼 때마다 현재 Window를 내보내고 새로운 Window를 열게 됩니다.

각각의 Window는 Stream이므로 출력은 상위 Stream입니다.

> Stream<\Stream>()

![window](https://user-images.githubusercontent.com/85836879/177263992-22e3795a-7590-4454-8ceb-93fac53ce6d7.png)

```js
  class StreamUtil{
    static Stream<int> getStream(int n) async* {
      var temp = 0;
      while (temp < n) {
        await Future<void>.delayed(const Duration(milliseconds: 100));

        yield temp++;
      }
    }
  }

  test('지정된 시간마다 새로운 상위 Stream을 만들어야 한다.', () {
    // given
    var temp = StreamUtil.getStream(4);

    // when
    Stream<List<int>> result = temp
        .window(
            Stream<void>.periodic(const Duration(milliseconds: 200)).take(3))
        .asyncMap((event) => event.toList());

    // then
    expectLater(
        result,
        emitsInOrder(<dynamic>[
          const [0, 1],
          const [2, 3],
          emitsDone
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### WindowCount
Stream에서 여러 값을 카운트, 버퍼링한 다음 Window로 내보내고 Stream은 각 startBufferEvery값마다 새 window를 시작합니다.

경우에는 startBufferEvery 값을 제공하지 않으면 새로운 카운트 개수마다 window가 닫히고 방출됩니다.

![windowCount](https://user-images.githubusercontent.com/85836879/177448733-b3574114-9c85-4535-b9c7-c70d4834ed29.png)

```js
  test('지정된 개수만큼 카운트하여 새로운 window를 열어야 한다.', () async {
    // given
    var temp = Rx.range(0, 4);

    // when
    Stream<List<int>> stream =
        temp.windowCount(3).asyncMap((event) => event.toList());

    // then
    await expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0, 1, 2],
          const [3, 4],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('지정된 개수만큼 새로운 window를 열고, startBufferEvery 값부터 다시 창을 열기 시작해야한다.',
      () async {
    // given
    var temp = Rx.range(0, 4);

    // when
    Stream<List<int>> stream =
        temp.windowCount(2, 1).asyncMap((event) => event.toList());

    // then
    await expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0, 1],
          const [1, 2],
          const [2, 3],
          const [3, 4],
          const [4],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
  
  test('횟수가 3인 windowCount와 startBufferEvery가 2일 때', () async {
    // given
    var temp = Rx.range(0, 8);

    // when
    Stream<List<int>> stream =
        temp.windowCount(3, 2).asyncMap((event) => event.toList());

    // then
    await expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0, 1, 2],
          const [2, 3, 4],
          const [4, 5, 6],
          const [6, 7, 8],
          const [8],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('횟수가 3인 windowCount와 startBufferEvery가 4일 때', () async {
    // given
    var temp = Rx.range(0, 8);

    // when
    Stream<List<int>> stream =
        temp.windowCount(3, 4).asyncMap((event) => event.toList());

    // then
    await expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0, 1, 2],
          const [4, 5, 6],
          const [8],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### WindowTest
Stream 항목을 포함하는 Stream을 작성하고 조건을 통과할 때마다 일괄적으로 처리합니다.

```js
 test('지정된 조건마다 혹은 지정된 조건까지 window를 열어야 한다.', () async {
    // given
    var temp = Rx.range(0, 5);
    // when
    Stream<List<int>> stream = temp
        .windowTest((idx) => idx % 2 == 0)
        .asyncMap((event) => event.toList());

    // then
    expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0],
          const [1, 2],
          const [3, 4],
          const [5],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('windowTest Transformer 함수를 사용하여 window를 열어야 한다.', () async {
    // given
    var temp = Rx.range(0, 4);
    final transformer =
        WindowTestStreamTransformer<int>((value) => value % 2 == 0);

    // when
    Stream<List<int>> stream =
        temp.transform(transformer).asyncMap((event) => event.toList());

    // then
    expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0],
          const [1, 2],
          const [3, 4],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### WindowTime
각 Stream 항목을 포함하는 Stream을 생성하고 주어진 시간마다 샘플링하여 window를 내보냅니다.

```js
test('지정된 시간마다 창을 새로 열어야 한다.', () async {
    // given
    var temp = StreamUtil.getStream(5);

    // when
    Stream<List<int>> stream = temp
        .windowTime(const Duration(seconds: 1))
        .asyncMap((event) => event.toList());

    // then
    await expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0, 1, 2, 3, 4],
          emitsDone
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### Buffer
각각의 요소를 Buffer에 쌓아 List 타입으로 방출하는 스트림을 만들어 window를 방출합니다.

![windowCount](https://user-images.githubusercontent.com/85836879/177741765-30cc8105-1bd3-40f5-9fe7-c59819ef5ef6.png)

```js
test('지정된 시간마다 buffer에 쌓아 List타입으로 방출해야 한다.', () async {
    // given
    var temp = StreamUtil.getStream(5);

    // when
    final stream = temp
        .buffer(Stream<void>.periodic(const Duration(milliseconds: 200)))
        .take(3);

    // then
    await expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0, 1],
          const [2, 3],
          const [4],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### BufferCount
Stream에서 Count만큼 buffering한 다음 buffer를 내보낸 뒤 지웁니다.

Stream은 각 startBufferEvery의 값마다 새로운 buffer를 시작합니다.

startBufferEvery를 제공하지 않는 경우에는 새로운 buffer는 소스의 개시 때마다 버퍼가 닫히고 즉시 방출됩니다.

![windowCount](https://user-images.githubusercontent.com/85836879/177742908-39aeac29-9ca0-448c-8d60-45448d612f88.png)

```js
test('지정된 startBufferEvery의 값마다 buffer에 쌓아 방출해야 한다.', () async {
    // given
    var temp = Rx.range(0, 4);
    // when
    Stream<List<int>> stream =
        temp.bufferCount(2).asyncMap((event) => event.toList());

    // then
    await expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0, 1],
          const [2, 3],
          const [4],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('지정된 개수만큼 buffer에 쌓아 내보낸 다음 startBufferEvery 값부터 새로운 buffer 쌓기 시작해야 한다.',
      () async {
    // given
    var temp = Rx.range(0, 4);

    // when
    Stream<List<int>> stream =
        temp.bufferCount(2, 3).asyncMap((event) => event.toList());

    // then
    await expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0, 1],
          const [3, 4],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('bufferCount가 3의 값을 가지며 startBufferEvery가 2의 값을 가지고 방출해야 한다.', () async {
    // given
    var temp = Rx.range(0, 4);

    // when
    Stream<List<int>> stream =
        temp.bufferCount(3, 2).asyncMap((event) => event.toList());

    // then
    await expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0, 1, 2],
          const [2, 3, 4],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('bufferCount가 3의 값을 가지며 startBufferEvery가 4의 값을 가지고 방출해야 한다.', () async {
    // given
    var temp = Rx.range(0, 16);

    // when
    Stream<List<int>> stream =
        temp.bufferCount(3, 4).asyncMap((event) => event.toList());

    // then
    await expectLater(
        stream,
        emitsInOrder(<dynamic>[
          const [0, 1, 2],
          const [4, 5, 6],
          const [8, 9, 10],
          const [12, 13, 14],
          const [16],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### BufferTest
각각의 Stream 항목을 작성하고 조건(테스트)를 통과할 때마다 일괄적으로 처리합니다.

```js
  test('조건을 만족할 때까지 항목을 buffer에 쌓고 조건을 통과하면 방출한다.', () async {
    // given
    var temp = Rx.range(0, 4);

    // when
    Stream<List<int>> stream = temp
        .bufferTest((idx) => idx % 2 == 0)
        .asyncMap((event) => event.toList());

    // then
    await expectLater(
        stream,
        emitsInOrder(<List<int>>[
          const [0],
          const [1, 2],
          const [3, 4],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('bufferTest Transformer 함수를 사용해야 한다.', () async {
    // given
    var temp = Rx.range(0, 4);
    final transformer =
        BufferTestStreamTransformer<int>((int value) => value % 3 == 0);

    // when
    Stream<List<int>> stream =
        temp.transform(transformer).asyncMap((event) => event.toList());

    // then
    await expectLater(
        stream,
        emitsInOrder(<List<int>>[
          const [0],
          const [1, 2, 3],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### BufferTime
각각의 Stream 항목을 생성하고 주어진 시간마다 샘플링하여 window를 방출합니다.

```js
  test('지정된 시간동안 buffer에 항목을 쌓고 지정된 시간이 지나면 방출해야 한다.', () async {
    // given
    var temp = StreamUtil.getStream(5);

    // when
    Stream<List<int>> stream =
        temp.bufferTime(const Duration(milliseconds: 200));

    // then
    await expectLater(
        stream,
        emitsInOrder(<List<int>>[
          const [0, 1],
          const [2, 3],
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### Debounce
Stream이 다른 항목을 방출하지 않고 완료된 경우에만 소스에서 항목을 방출하도록 변환합니다.

![Debounce](https://user-images.githubusercontent.com/85836879/178020492-137838a8-cf05-4f14-b280-28a7d65e29d9.png)

```js
  class StreamUtil{
    Stream<int> getControllerStream(int count) {
      final streamController = StreamController<int>();

      for (var i = 1; i <= count; i++) {
        if (i == count) {
          Timer(Duration(milliseconds: i * 100), () {
            streamController.add(i);
            streamController.close();
          });
          continue;
        }
        Timer(Duration(milliseconds: i * 100), () => streamController.add(i));
      }
      return streamController.stream;
    }
    
    test('지정된 시간동안 값이 방출되지 않았을 때, 값을 방출한다.', () async {
        // given
      var temp = StreamUtil.getControllerStream(4);

      // when
      final stream = temp.debounce((_) => Stream<void>.fromFuture(
        Future<void>.delayed(const Duration(milliseconds: 1000))));

      // then
      await expectLater(stream, emitsInOrder([4, emitsDone]));
      }, timeout: const Timeout(Duration(seconds: 10)));
  }
```

### DebounceTime
DebounceTimeStream이 지정한 시간 동안 다른 항목을 방출하지 않고 완료된 경우에만 항목을 방출하도록 변환합니다.

![DebounceTime](https://user-images.githubusercontent.com/85836879/178021288-0e2a4ac3-7a9b-47d7-b625-c1ca64086b2e.png)

```js
  test('지정된 시간동안 값이 방출되지 않았을 때, 값을 방출한다.', () async {
    // given
    var temp = StreamUtil.getControllerStream(5);

    // when
    final stream = temp.debounceTime(const Duration(milliseconds: 500));

    // then
    await expectLater(stream, emitsInOrder([5, emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

### Sample
SampleStream에서 방출된 Stream이 가장 최근에 방출된 항목을(있는 경우에) 방출합니다.

![Sample](https://user-images.githubusercontent.com/85836879/178024486-4722bcee-b46c-4120-a0b8-d0c4967edebe.png)

```js
  class StreamUtil{
    Stream<int> getSampleStream(
          {required int count, int? milliseconds, int? interval}) =>
      Stream<int>.periodic(Duration(milliseconds: milliseconds ??= 35),
          (idx) => idx + (interval ??= 0)).take(count);
    
    test('sample Stream이 방출될 때마다 Stream에서 가장 최근에 방출된 값을 방출한다.', () async {
      // given
      var temp = StreamUtil.getSampleStream(count: 5, milliseconds: 20);

      // when
      final stream = temp.sample(StreamUtil.getSampleStream(count: 10));

      // then
      await expectLater(stream, emitsInOrder([2, 3, 4, emitsDone]));
    }, timeout: const Timeout(Duration(seconds: 10)));
  }
```

### SampleTime
Sample의 방출 시간 범위내에서 이전 방출된 가장 최근의 값이 있는 경우 방출합니다.

![SampleTime](https://user-images.githubusercontent.com/85836879/178022303-9044b6d5-5227-4b38-8721-7cf3a09b38f3.png)

```js
  test('지정된 시간에서 방출된 Stream의 가장 최근에 방출된 값이 있는 경우 방출한다.', () async {
    // given
    var temp = StreamUtil.getSampleStream(count: 5, milliseconds: 20);

    // when
    final stream = temp.sampleTime(const Duration(milliseconds: 35));

    // then
    await expectLater(stream, emitsInOrder([2, 3, 4, emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```