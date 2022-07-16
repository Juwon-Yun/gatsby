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
| 구독을 일시중지, 다시 시작 할 수 있는지? | 사용 불가 | 사용 가능 |

<br>

<a href="https://pub.dev/documentation/rxdart/latest/rx/Rx-class.html" target="_blank">Rx Dart 공식 홈페이지 방문하기</a>
<br>
<a href="http://reactivex.io/RxJava/javadoc/io/reactivex/Observable.html" target="_blank">RxJava 방문하기</a>
<br>
<a href="https://rxjs-dev.firebaseapp.com/api/index" target="_blank">RxJs 방문하기</a>

## 변형 함수 (Transformer)
Rx 라이브러리는 배압-변형(backpressured)함수와 일반-변형(non-backpressured)함수, 두 가지 변형 함수를 제공합니다.

배압의 유무는 Observable 클래스의 포함 유무 차이로 많은 함수가 Observable 클래스를 기반으로 구현되어 있습니다.

### ConcatWith
Stream에서 모든 항목을 방출한 다음 지정된 Stream의 모든 항목을 차례대로 내보내는 Stream을 반환합니다.

![ConcatWith](https://user-images.githubusercontent.com/85836879/178094248-62d3b159-37e3-4e3e-9590-bf8b0e53cd11.png)

<details>

<summary> ConcatWith </summary>

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
</details>

### StartWith
Stream이 값을 방출할 때 방출되는 항목 앞에 값을 추가합니다.

![StartWith](https://user-images.githubusercontent.com/85836879/178416757-bbbcc20f-871a-4b30-bf45-37aaffcd4a9e.png)

<details>

<summary> StartWith </summary>

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
</details>

### StartWithMany
Stream이 값을 방출할 때 방출되는 값 앞에 List 타입을 추가합니다.

<details>

<summary> StartWithMany </summary>

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
</details>

### EndWith
Stream이 값을 방출한 후에 방출된 항목 뒤에 값을 추가합니다.

<details>

<summary> EndWith </summary>

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
</details>

### EndWithMany
Stream이 값을 방출한 후에 방출된 항목 뒤에 List 타입을 추가합니다.

<details>

<summary> EndWithMany </summary>

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
</details>

### ZipWith
주어진 Zip 함수를 사용하여 현재 Stream을 다른 Stream과 결합한 Stream을 방출합니다.

![ZipWith](https://user-images.githubusercontent.com/85836879/178418266-1f650989-f657-4926-8cb5-d3128c2a7404.png)

<details>

<summary> ZipWith </summary>

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
</details>

### MergeWith
여러 Stream이 방출한 항목을 단일 Stream으로 결합합니다.

항목은 Stream에서 방출되는 순서로 방출됩니다.

![MergeWith](https://user-images.githubusercontent.com/85836879/178880050-5a5ad516-cf3b-43c9-b2e9-b6a9b626f004.png)

<details>

<summary> MergeWith </summary>

```js
test('여러 Stream에서 방출된 순서대로 항목을 단일 Stream으로 결합하여 방출합니다.', () async {
    // given
    final delayedStream = Rx.timer(1, const Duration(milliseconds: 10));
    final immediateStream = Stream.value(2);

    // when
    final stream = delayedStream.mergeWith([immediateStream]);

    // then
    await expectLater(stream, emitsInOrder([2, 1, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### DefaultIfEmpty
Stream에서 아무것도 방출하지 않는 경우 단일 Stream을 방출합니다.

![DefaultIfEmpty](https://user-images.githubusercontent.com/85836879/178880538-580e4680-e0ce-4121-875a-44a30fc3d582.png)

<details>

<summary> DefaultIfEmpty </summary>

```js
test('Stream에서 아무것도 내보내지 않는 경우 지정된 기본값을 방출합니다.', () async {
    // given
    var temp = const Stream<bool>.empty();

    // when
    final stream = temp.defaultIfEmpty(false);

    // then
    await expectLater(stream, emitsInOrder([false, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### SwitchIfEmpty
Stream에서 아무것도 방출하지 않으면 SwitchIfEmpty 연산자로 지정된 Stream을 구독하고 해당 Stream의 항목을 방출합니다.

SwitchIfEmpty는 여러가지 데이터를 사용할 때 유용할 수 있습니다.

> 메모리 내 데이터를 조회한 다음 파일 시스템의 데이터베이스를 조회한 다음 데이터가 로컬 시스템에 없으면 네트워크로 조회합니다.
>
> 불어와야할 데이터가 있다고 가정하면 가장 빠른 액세스 포인트로 시작하고 이후에 가장 느린 액세스 포인트로 돌아가는것이 좋습니다.

이것을 SwitchIfEmpty 연산자로 아주 간단하게 달성할 수 있습니다.

```java
Stream<Data> memory, Stream<Data> disk, Stream<Data> network;

Stream<Data> fetchData = memory.switchIfEmpty(disk).switchIfEmpty(network);
```

![SwitchIfEmpty](https://user-images.githubusercontent.com/85836879/178882186-43fa3aeb-69ee-4e77-a8db-cb2b6d5e9078.png)

<details>

<summary> SwitchIfEmpty </summary>

```js
test('Stream이 아무것도 내보내지 않는 경우 다른 Stream을 방출합니다.', () async {
    // given
    var temp = const Stream<int>.empty();

    // when
    final stream = temp.switchIfEmpty(Stream.value(1));

    // then
    await expectLater(stream, emitsInOrder([1, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));

test('Stream이 항목을 내보낸다면 다른 항목을 방출하지 않는다.', () async {
    // given
    var temp = Stream<dynamic>.value(1);

    // when
    final stream = temp.switchIfEmpty(Stream.value(false));

    // then
    await expectLater(stream, emitsInOrder([1, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### Distinct
현재 Stream에서 중복을 제거합니다.

![Distinct](https://user-images.githubusercontent.com/85836879/178882901-0ce3c45e-af3a-47cc-9f64-37341f65d33e.png)

<details>

<summary> Distinct </summary>

```js
test('Stream 항목에서 중복되는 항목 없이 방출해야 한다.', () async {
    // given
    var temp = Stream.fromIterable([1, 1]);

    // when
    final stream = temp.distinct();

    // then
    await expectLater(stream, emitsInOrder([1, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### DistinctUnique
데이터가 이전에 이미 생성된 경우 건너뛰는 Stream을 생성합니다.

같음을 나타내는 조건은 제공되어진 equals 함수와 hashCode 함수에 의해 결정됩니다.

생략한다면 마지막으로 생성 혹은 제공된 데이터의 equals 연산자와 hashCode 함수가 사용됩니다.

DistinctUnique으로 반한되는 Stream은 BroadCastStream입니다.

BroadCastStream이 두 번이상 수신되는 경우 각각의 구독은 equals 함수와 hashCode 함수를 개별적으로 수행합니다.

<details>

<summary> DistinctUnique </summary>

```js
class TestModel {
  final String key;

  const TestModel({required this.key});

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is TestModel &&
          runtimeType == other.runtimeType &&
          key == other.key;

  @override
  int get hashCode => key.hashCode;

  @override
  String toString() => key;
}

test(
    'Stream 항목에서 해당 클래스의 equals와 hashCode 값비교를 통해 중복되는 항목 없이 broadCast Stream을 방출해야 한다.',
    () async {
    // given
    final temp = Stream.fromIterable(const [
      TestModel(key: 'a'),
      TestModel(key: 'b'),
      TestModel(key: 'a'),
      TestModel(key: 'a'),
      TestModel(key: 'c'),
      TestModel(key: 'a'),
      TestModel(key: 'b'),
    ]);

    // when
    final stream = temp.distinctUnique();

    // then
    await expectLater(
        stream,
        emitsInOrder([
          const TestModel(key: 'a'),
          const TestModel(key: 'b'),
          const TestModel(key: 'c'),
          emitsDone
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

test(
    'Stream 항목에서 조건으로 제공된 equals와 hashCode 값비교를 통해 중복되는 항목 없이 broadCast Stream을 방출해야 한다.',
    () async {
    // given
    final temp = Stream.fromIterable(const [
      TestModel(key: 'a'),
      TestModel(key: 'b'),
      TestModel(key: 'a'),
      TestModel(key: 'a'),
      TestModel(key: 'c'),
      TestModel(key: 'a'),
      TestModel(key: 'b'),
    ]);

    // when
    final stream = temp.distinctUnique(
      equals: (a, b) => a.key == b.key,
      hashCode: (source) => source.key.hashCode,
    );

    // then
    await expectLater(
        stream,
        emitsInOrder([
          const TestModel(key: 'a'),
          const TestModel(key: 'b'),
          const TestModel(key: 'c'),
          emitsDone
        ]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### FlatMap
주어진 매핑 함수를 사용하여 방출된 각 항목을 Stream으로 변환합니다.

새로 생성된 Stream이 수신되고 항목을 방출하기 시작합니다.

각각의 Stream에서 방출되는 항목은 도착한 순서대로 방출됩니다.

따라서 Sequence가 함께 병합됩니다.

![FlatMap](https://user-images.githubusercontent.com/85836879/178884998-f6b6b068-05d6-4938-bd62-54387a1d6ab3.png)

<details>

<summary> FlatMap </summary>

```js
test('Stream 항목을 방출할 때마다 순서대로 조건에 맞게 변환하여 방출합니다.', () async {
    // given
    var temp = Rx.range(1, 4);

    // when
    Stream<int> stream = temp.flatMap((idx) => Stream<int>.value(idx * 2));

    // then
    await expectLater(stream, emitsInOrder([2, 4, 6, 8, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### FlatMapIteratorble
Stream이 방출될 때마다 List 타입의 Stream으로 변환하여 방출합니다.

![FlatMapIteratorble](https://user-images.githubusercontent.com/85836879/178904225-f46da1a2-fd03-46b5-b3c1-1216c794d3fb.png)

<details>

<summary> FlatMapIteratorble </summary>

```js
test('Stream 항목을 방출할 때마다 순서대로 List 타입을 방출합니다.', () async {
    // given
    var temp = Rx.range(1, 4);

    // when
    Stream<int> stream = temp.flatMapIterable(
        (value) => Stream<List<int>>.value([value, value + 1]));

    // then
    await expectLater(
        stream, emitsInOrder([1, 2, 2, 3, 3, 4, 4, 5, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### SwitchMap
주어진 매핑 함수를 사용해 방출된 각각의 항목을 Stream으로 변환합니다.

새로 생성된 Stream은 항목을 수신하고 방출을 시작하며 이전에 생성된 방출은 중지합니다.

SwitchMap 연산자는 flatMap 연산자와 concatMap 함수와 유사하지만 가장 최근에 생성된 Stream에서만 항목을 내보냅니다.

> 비동기 요청에 대한 API의 응답이 최신 상태만 원할 때 유용할 수 있습니다.

![FlatMapIteratorble](https://user-images.githubusercontent.com/85836879/178904632-6f6fe09f-33d7-4b36-b640-3263008b2fc0.png)

<details>

<summary> SwitchMap </summary>

```js
class StreamUtil{
    Stream<int> getControllerStream({required int count, int? increase}) {
    final streamController = StreamController<int>();

    for (var i = 1; i <= count; i++) {
      if (i == count) {
        Timer(Duration(milliseconds: i * 100), () {
          streamController.add(i + (increase ??= 0));
          streamController.close();
        });
        continue;
      }
      Timer(Duration(milliseconds: i * 100),
          () => streamController.add(i + (increase ??= 0)));
    }
    return streamController.stream;
  }

  Stream<int> getOtherStream(int value) {
    final streamController = StreamController<int>();

    Timer(const Duration(milliseconds: 15),
        () => streamController.add(value + 1));
    Timer(const Duration(milliseconds: 20),
        () => streamController.add(value + 2));
    Timer(const Duration(milliseconds: 25),
        () => streamController.add(value + 3));
    Timer(const Duration(milliseconds: 30), () {
      streamController.add(value + 4);
      streamController.close();
    });

    return streamController.stream;
  }
}

test('기본 Stream과 다른 Stream 중 가장 최근에 방출한 항목들만 방출해야 한다.', ()      async {
    // given
    var temp = StreamUtil.getControllerStream(count: 4);

    // when
    final stream = temp.switchMap((_) => StreamUtil.getOtherStream(5));

    // then
    await expectLater(stream, emitsInOrder([6, 7, 8, 9]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### ExhaustMap
지정된 매핑 함수를 사용해 Stream의 항목들을 Stream으로 변환합니다.

새로운 Stream이 완료될 때까지 기존 Stream의 모든 항목을 무시합니다.

> 기존 Stream의 이전 비동기 작업이 완료된 후에만 응답하려는 경우 유용할 수 있습니다.

<details>

<summary> ExhaustMap </summary>

```js
test(
      '지정된 Mapper를 사용하여 새로운 Stream이 완료될 떄까지 항목들을 Stream으로 변환한다. 기존 스트림의 모든 항목은 무시한다.',
      () async {
    // given
    var count = 0;
    var temp = Rx.range(1, 9);

    // then
    final stream = temp.exhaustMap((_) {
      count++;
      return Rx.timer(5, const Duration(milliseconds: 100));
    });

    // when
    await expectLater(stream, emitsInOrder([5, emitsDone]));
    await expectLater(count, 1);
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### MapTo
Stream이 값을 방출할 때마다 무조건 방출될 항목에서 주어진 상수 값을 방출합니다.

![MapTo](https://user-images.githubusercontent.com/85836879/178905367-0cc8e6f1-4373-4807-8c9e-1455fde77e19.png)

<details>

<summary> MapTo </summary>

```js
test('Stream이 값을 내보낼 때마다 무조건 주어진 상수 값을 내보냅니다.', () async {
    // given
    var temp = Rx.range(1, 4);

    // when
    final stream = temp.mapTo(true);

    // then
    await expectLater(
        stream,
        emitsInOrder([
          true,
          true,
          true,
          true,
          emitsDone,
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

test('Stream이 값을 내보낼 때 무조건 에러를 동반해야 한다.', () async {
    // given
    var temp = Rx.range(1, 2)
        .concatWith([Stream<int>.error(ArgumentError('error message'))]);

    // when
    final stream = temp.mapTo(true);

    // then
    await expectLater(
        stream,
        emitsInOrder([
          true,
          true,
          emitsError(const TypeMatcher<ArgumentError>()),
        ]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### GroupBy
각각의 항목을 그룹지어 GroupByStream으로 방출합니다.

GroupByStream은 일반적인 Stream처럼 작동하지만

Fuction Type에서 값을 받는 'Key' 속성이 존재합니다.

![GroupBy](https://user-images.githubusercontent.com/85836879/178906047-74a04f63-160d-45c9-b086-1b9e42637869.png)

<details>

<summary> GroupBy </summary>

```js
class StreamUtil{
    String toEvenOdd(int value) => value % 2 == 0 ? 'even' : 'odd';
}

test('Stream의 각각의 항목을 묶어 key 속성이 있는 Stream으로 방출해야 한다.', () async {
    // given
    var temp = Stream.fromIterable(List.generate(3, (index) => index + 1));

    // when
    final stream = temp.groupBy((value) => value);

    // then
    await expectLater(
        stream,
        emitsInOrder(<Matcher>[
          const TypeMatcher<GroupedStream<int, int>>()
              .having((stream) => stream.key, 'key', 1),
          const TypeMatcher<GroupedStream<int, int>>()
              .having((stream) => stream.key, 'key', 2),
          const TypeMatcher<GroupedStream<int, int>>()
              .having((stream) => stream.key, 'key', 3)
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

test('Stream의 각각의 항목을 묶어 Map 타입으로 방출해야 한다.', () async {
    // given
    var temp = Stream.fromIterable([1, 2, 3, 4]);

    // when
    final stream = temp
        .groupBy((int value) => StreamUtil.toEvenOdd(value))
        .flatMap((GroupedStream<int, String> stream) =>
            stream.map((int event) => {stream.key: event}));

    // then
    await expectLater(
        stream,
        emitsInOrder(<Map<String, int>>[
          {'odd': 1},
          {'even': 2},
          {'odd': 3},
          {'even': 4},
        ]));
}, timeout: const Timeout(Duration(seconds: 10)));

test('Stream의 각 항목을 짝수 혹은 홀수를 구분해 Map의 항목으로 방출해야 한다.', () async {
    // given
    var temp = Stream.fromIterable(List.generate(5, (index) => index + 1));

    // fold 함수는 Stream 타입의 onDone 트리거에 의해 호출됩니다.
    // when
    final stream = temp
        .groupBy((value) => StreamUtil.toEvenOdd(value))
        .map((stream) async => await stream.fold(
              {stream.key: <int>[]},
              (Map<String, List<int>> previous, element) {
                return previous..[stream.key]?.add(element);
              },
            ));

    // then
    await expectLater(
        stream,
        emitsInOrder([
          {
            'odd': [1, 3, 5]
          },
          {
            'even': [2, 4]
          },
          emitsDone
        ]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### Interval
지정된 기간마다 Stream의 항목을 방출하는 Stream을 만듭니다.

![Interval](https://user-images.githubusercontent.com/85836879/178906523-987010f3-c4ed-47e6-bc41-ade363ae7e0e.png)

<details>

<summary> Interval </summary>

```js
class StreamUtil{
    Stream<int> getStream(int n) async* {
        var temp = 0;
        while (temp < n) {
        await Future<void>.delayed(const Duration(milliseconds: 100));

        yield temp++;
        }
  }
}

test('지정된 기간(interval) 마다 Stream의 항목을 방출해야 한다.', () async {
    // given
    var temp = StreamUtil.getStream(5),
        count = 0,
        lastInterval = -1,
        expectOutput = [0, 1, 2, 3, 4];
    final stopWatch = Stopwatch()..start();

    // when
    final stream = temp.interval(const Duration(milliseconds: 100));

    // then
    stream.listen(
        expectAsync1(
          (result) {
            expect(expectOutput[count++], result);

            if (lastInterval != -1) {
              expect(stopWatch.elapsedMilliseconds - lastInterval >= 1, true);
            }

            lastInterval = stopWatch.elapsedMilliseconds;
          },
          count: expectOutput.length,
        ),
        onDone: stopWatch.stop);
  }, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### Max
Stream에서 방출된 가장 큰 항목으로 완성되는 Future로 Stream을 변환합니다.

Max 연산자는 목록에서 최대값을 찾는 것과 유사하지만 값은 비동기적입니다.

반환 값은 Future 타입입니다.

![Interval](https://user-images.githubusercontent.com/85836879/178907135-e0f5e2b8-7386-4658-ae3c-899762ce28c2.png)

```js
completion은 Future<dynamic> 타입을 가지고 성공적으로 완료된 Future와 일치하는 값을 찾습니다.

비동기 expect를 생성하며 또한 호출이 즉시 반환되고 실행이 계속됩니다.

나중에 Future가 완료되면 기대하는 matcher가 실행됩니다.

Future가 완성되고 실행될 것으로 예상되기를 기다리려면 expectLater를 사용하고 반환될 Future를 기다립니다.
```

<details>

<summary> Max </summary>

```js
class ComparableTest implements Comparable<ComparableTest> {
  final int value;

  const ComparableTest(this.value);

  @override
  String toString() => 'ComparableTest(value : $value)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ComparableTest &&
          runtimeType == other.runtimeType &&
          value == other.value;

  @override
  int get hashCode => value.hashCode;

  @override
  int compareTo(ComparableTest other) => value.compareTo(other.value);
}

test('Stream에서 방출된 가장 큰 항목을 Futrue로 완성되는 Stream을 방출해야 한다.', () async {
    // given
    var temp = StreamUtil.getStream(5);

    // when
    final stream = temp.max();

    // then
    await expectLater(stream, completion(4));

    expect(await Stream.fromIterable([1, 2, 2.5]).max(), 2.5);
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('Comparable 인터페이스를 상속받아 가장 큰 항목을 방출해야 한다.', () async {
    // given
    const expected = ComparableTest(3);
    var temp = Stream.fromIterable(const [
      ComparableTest(0),
      expected,
      ComparableTest(2),
      ComparableTest(-1),
      ComparableTest(2),
    ]);

    // when
    final stream = await temp.max();

    // then
    expect(stream, expected);
  }, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### Min
Stream에서 내보낸 항목 중 가장 작은 항목으로 완료되는 Future로 Stream을 변환합니다.

Min 연산자는 목록에서 최솟값을 찾는 것과 유사하지만 값은 비동기 적입니다.

<details>

<summary> Min </summary>

```js
test('Stream에서 방출된 가장 작은 항목을 Futrue로 완성되는 Stream을 방출해야 한다.', () async {
    // given
    var temp = StreamUtil.getStream(5);

    // when
    final stream = temp.min();

    // then
    await expectLater(stream, completion(0));
    expect(
        await Stream.fromIterable(
          List.generate(10, (index) => index),
        ).min(),
        0);
  }, timeout: const Timeout(Duration(seconds: 10)));

test('Comparable 인터페이스를 상속받아 가장 작은 항목을 방출해야 한다.', () async {
    // given
    const expected = ComparableTest(-2);
    var temp = Stream.fromIterable(const [
      ComparableTest(0),
      expected,
      ComparableTest(2),
      ComparableTest(-1),
      ComparableTest(3),
    ]);

    // when
    final stream = await temp.min();

    // then
    expect(stream, expected);
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### PairWise
지정된 인덱스와 인덱스-1의 이벤트를 묶어 방출합니다.

> Groups pairs of consecutive emissions together and emits them as an array of two values.

```java
pairwise<T>(): OperatorFunction<T, [T, T]>
```

![PairWise](https://user-images.githubusercontent.com/85836879/178907946-d4b7c5a6-1e5d-40d9-a191-18bd70c118cb.png)

<details>

<summary> PairWise </summary>

```js
test('index와 index-1 이벤트를 Iterable 타입으로 방출해야 한다.', () async {
    // given
    var temp = Rx.range(0, 4);

    // when
    Stream<Iterable<int>> stream = temp.pairwise();

    // then
    await expectLater(
        stream,
        emitsInOrder(const [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
        ]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### SkipUntil
Stream이 항목을 방출한 후에만 방출을 시작합니다.

![SkipUntil](https://user-images.githubusercontent.com/85836879/178910642-916bedd6-3206-4b64-8f3f-ca9a8cfc5ef3.png)

<details>

<summary> SkipUntil </summary>

```js
class StreamUtil{
    Stream<int> getControllerStream({required int count, int? increase}) {
        final streamController = StreamController<int>();

        for (var i = 1; i <= count; i++) {
            if (i == count) {
                Timer(Duration(milliseconds: i * 100), () {
                    streamController.add(i + (increase ??= 0));
                    streamController.close();
                });
                continue;
            }

            Timer(Duration(milliseconds: i * 100),
                () => streamController.add(i + (increase ??= 0)));
        }

        return streamController.stream;
    }
}
test('지정된 Stream이 항목을 방출한 이후에만 방출을 시작합니다.', () async {
    // given
    var temp = StreamUtil.getControllerStream(count: 5);

    // when
    final stream = temp.skipUntil(StreamUtil.getControllerStream(count: 1));

    // then
    await expectLater(
        stream,
        emitsInOrder([
          2,
          3,
          4,
          5,
          emitsDone,
        ]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### TakeUntil
다른 Stream의 항목을 생성할때까지만 기존 Stream의 항목을 방출합니다.

![TakeUntil](https://user-images.githubusercontent.com/85836879/178911029-ddb8c85c-124d-45b9-b167-c3b22a514a0c.png)

<details>

<summary> TakeUntil </summary>

```js
test('다른 스트림의 값이 방출될 때까지만 소스 스트림의 값들을 방출해야 한다.', () async {
    // given
    var temp = StreamUtil.getControllerStream(count: 5);

    // when
    final stream = temp.takeUntil(StreamUtil.getControllerStream(count: 2));

    // then
    await expectLater(
        stream,
        emitsInOrder(
          [1, emitsDone],
        ));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### TakeWhileInclusive
Stream의 각각의 항목이 주어진 조건을 충족할 때까지만 Stream에서 항목을 방출합니다.

조건으로 값이 만족되지 않으면 항목을 모두 방출합니다.

![TakeWhileInclusive](https://user-images.githubusercontent.com/85836879/178912514-3b7646dd-d454-45e7-8333-e20992546e3b.png)

<details>

<summary> TakeWhileInclusive </summary>

```js
test('정해진 조건을 만족할 때까지만 Stream의 항목을 방출해야 한다.', () async {
    // given
    var temp = Stream.fromIterable(List.generate(5, (index) => index + 1));

    // when
    final stream = temp.takeWhileInclusive((element) => element < 4);

    // then
    await expectLater(
        stream,
        emitsInOrder([
            1,
            2,
            3,
            4,
            emitsDone,
        ]));
}, timeout: const Timeout(Duration(seconds: 10)));

test('정해진 조건에 일치하는 값이 없을 때, Stream의 첫 번째 값을 방출한다.', () async {
    // given
    var temp = Stream.fromIterable(List.generate(5, (index) => index + 1));

    // when
    final stream = temp.takeWhileInclusive((element) => element > 4);

    // then
    await expectLater(
        stream,
        emitsInOrder([
          1,
          emitsDone,
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### TimeStamp
Stream에서 내보낼 각 항목을 항목이 내보내진 시간을 포함하는 객체에 랩핑하여 방출합니다.

![TimeStamp](https://user-images.githubusercontent.com/85836879/178913246-c907d9f8-a0ec-4a13-93cb-e9246e722694.png)

<details>

<summary> TimeStamp </summary>

```js
test('Stream에서 방출한 각각의 항목을 항목이 내보내진 시간을 포함하는 객체와 감싸져야 한다.', () async {
    // given
    var temp = Stream.fromIterable(List.generate(5, (index) => index + 1));

    // when
    final stream = temp.timestamp();

    // then
    await expectLater(
        stream,
        emitsInOrder(const [
          TypeMatcher<Timestamped>(),
          TypeMatcher<Timestamped>(),
          TypeMatcher<Timestamped>(),
          TypeMatcher<Timestamped>(),
          TypeMatcher<Timestamped>(),
        ]));
    // TimeStamp{timestamp: 2022-07-13 19:39:40.883533, value: 1}
    // TimeStamp{timestamp: 2022-07-13 19:39:40.910490, value: 2}
    // TimeStamp{timestamp: 2022-07-13 19:39:40.914601, value: 3}
    // TimeStamp{timestamp: 2022-07-13 19:39:40.915421, value: 4}
    // TimeStamp{timestamp: 2022-07-13 19:39:40.915920, value: 5}
  }, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### WhereType
조건의 타입과 일치하지 않는 항목은 필터링되며 방출되어질 Stream의 타입은 조건이 가지고있는 타입입니다.

> WhereTypeStreamTransformer< S, T > class

<details>

<summary> WhereType </summary>

```js
test('정해진 조건의 타입과 일치하지 않는 항목은 필터링되어 방출해야 한다.', () async {
    // given
    var temp = Stream.fromIterable([
      1,
      'two',
      3,
      false,
      [1, 2],
      {'six': 6},
    ]);

    // when
    final stream = temp.whereType<int>();

    // then
    await expectLater(stream, emitsInOrder([1, 3]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

## 마치며...
소프트웨어 개발을 하면서 만나게되는 반응형 프로그래밍을 ReactiveX의 내장 함수로 간접적으로 느껴보았습니다.

작성한 내용 이외에도 공식 문서에서 엄청나게 많은 정보를 제공하고 있습니다.

포스팅에 올려놓은 이미지 캡쳐본은 RxJava와 RxJs를 오가며 캡처하였어요.

테스트 코드의 Should Be 문구에서 자주 등장한 '방출' 용어는 Apache Kafka Streams가 언급한 Streams Architecture에서의 데이터 파이프라인을 표방했습니다.

용어가 다소 어색하지만 참고하면 Stream을 이해하는데 도움될 것 같아요.

우린 이제 반응형 프로그래밍의 대표주자인 Rx 패키지를 Dart 언어를 통해 알게되었습니다!
