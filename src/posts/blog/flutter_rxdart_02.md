---
title: "RxDart 생성 함수"
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



<a href="https://pub.dev/documentation/rxdart/latest/rx/Rx-class.html" target="_blank">Rx Dart docs</a>

## Factory(생성 함수)

### CombineLatest
Stream 중 하나가 아이템을 방출할 때마다 결합하여 Stream을 하나의 Stream 시퀀스로 병합하는 메소드

모든 Stream이 하나 이상의 아이템을 방출할 때까지 Stream이 방출되지 않습니다.

![image](https://user-images.githubusercontent.com/85836879/175301530-0124e7ce-ba7c-4f60-891a-8ad9c461806f.png)

<details>

<summary>> CombineLatestList </summary>

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

</details>

### Concat
이전 Stream 순서가 성공적으로 종료되는 한 지정된 모든 Stream 순서를 연결합니다.

각 Stream을 하나씩 구독하여 모든 항목을 방출하고 다음 Stream을 구독하기 전에 완료하여 이를 수행합니다.

![image](https://user-images.githubusercontent.com/85836879/175303129-c5ea9e16-504d-4d80-9296-2d3bb52c11db.png)

<details>

<summary>> Concat </summary>

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

</details>

### ConcatEager
이전 Stream 순서가 성공적으로 종료되는 한 지정된 모든 Stream 순서로 연결합니다.

다음 스크림 이후에 하나의 Stream을 구독하지 않고 모든 Stream이 구독됩니다.

그런 다음 이전 Stream이 아이템을 방출한 이후에 이벤트가 생성됩니다.

![ismage](https://user-images.githubusercontent.com/85836879/175467063-872b046d-3c99-4055-9276-6519782f0d14.png)

<details>

<summary>> ConcatEager </summary>


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

</details>

### Defer 
Defer는 Stream이 구독할 때까지 기다린 다음 지정된 팩토리 기능으로 스트림을 만듭니다.

경우에 따라 Stream을 생성하기 위해 마지막 구독 시간까지 대기하며 Stream에 최신 데이터가 포함됩니다.

기본적으로 DeferStreams는 단일 구독이지만 재사용할 수 있습니다.

![ismage](https://user-images.githubusercontent.com/85836879/175467865-5d932893-be0f-4f90-85ad-d339e9ba5b68.png)

<details>

<summary>> Defer </summary>


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

</details>

### ForkJoin
forkJoin은 Stream List가 있고 각각의 최종 결과값에만 관심이 있는 경우에 사용하기 적합합니다.

이에 대한 적용 사례는 페이지 로드에서 여러 요청이 발행하고 모두에 대한 응답이 수신된 경우에만 조치를 수행하려는 경우입니다.

forkJoin 오류에 공급된 내부 Stream 중 하나라도 오류를 잡지 않으면 이미 완료되었거나 완료된 다른 스트림의 값을 잃게 됩니다.

모든 내부 Stream만 성공적으로 완됴뇌는 데 관심이 있는 경우 외부에서 오류를 잡을 수 있습니다.

forkJoin은 Future.wait를 사용하는 방법과 비슷합니다.

하지만 하나 이상의 항목을 방출하는 Stream이 있고 이전 결과값의 반환을 고려하는 경우 올바른 선택이 아닙니다. 

(이 경우 combineLatest 또는 zip 연산자를 사용하는 것이 좋습니다.)

![image](https://user-images.githubusercontent.com/85836879/175762033-419b9618-5223-442a-a5f1-d04b49c1141d.png)

<details>

<summary>> ForkJoin </summary>


```js
test('각 스트림의 가장 최근 값을 합쳐 List로 반환합니다.', () async {
    // given
    var a = Stream.fromIterable(['a']),
        b = Stream.fromIterable(['b']),
        c = Stream.fromIterable(['c', 'd']);

    //when
    final stream = Rx.forkJoinList([a, b, c]);

    await expectLater(
        stream,
        emitsInOrder([
          ['a', 'b', 'd'],
          emitsDone
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
  

  test('각 스트림의 가장 최근 값을 합쳐 List로 방출하고 마지막 값만 반환합니다.', () async {
    // given
    var a = Stream.fromIterable(['a']),
        b = Stream.fromIterable(['b']),
        c = Stream.fromIterable(['c', 'd']);

    // when
    final stream =
        Rx.forkJoin([a, b, c], (List<String> returnList) => returnList.last);

    // then
    await expectLater(stream, emitsInOrder(['d', emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('ForkJoin N개의 (임의의 개수) 스트림이 존재하는 경우', () async {
    // given
    var a = Stream.fromIterable(['a']), b = Stream.fromIterable(['b', 'c']);

    // when
    final stream = Rx.forkJoin2(a, b, (String a, String b) => a + b);

    // then
    await expectLater(stream, emitsInOrder(['ac', emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('ForkJoin 스트림 중 에러가 포함되어 있는 경우 결합하지 않는다.', () async {
    // given
    var a = Stream.value('a'),
        b = Stream.value('b'),
        c = Stream<String>.error(Exception('it was error message'));

    // when
    final stream =
        Rx.forkJoin3(a, b, c, (String a, String b, String c) => a + b + c);

    // then
    await expectLater(stream, emitsError(const TypeMatcher<Exception>()));
  }, timeout: const Timeout(Duration(seconds: 10)));
  
```

</details>

### Merge
지정된 List에서 방출될 값을 병합하여 반환합니다.

![ismage](https://user-images.githubusercontent.com/85836879/175764017-ee2895ce-5a06-41e2-877a-02feef7566c2.png)

<details>

<summary>> Merge </summary>

```js
test('각 리스트에서 방출된 값을 리스트로 병합한다.', () async {
    // given
    var a = Stream.periodic(const Duration(milliseconds: 500), (count) => count)
            .take(3),
        b = Stream.fromIterable([1, 2, 3, 4]);

    // when
    final stream = Rx.merge([a, b]);

    await expectLater(stream, emitsInOrder([1, 2, 3, 4, 0, 1, 2]));
  }, timeout: const Timeout(Duration(seconds: 10)));

test('병합 도중 에러 발생시, 에러가 발생하기 이전 값들까지만 병합해 리스트로 반환하고 에러를 나타낸다.', () async {
    // given
    var a = Stream.periodic(const Duration(milliseconds: 500), (count) => count)
            .take(3),
        b = Stream.fromIterable([1, 2, 3, 4]),
        c = Stream<String>.error(Exception('merge error'));

    // when
    final stream = Rx.merge([a, b, c]);

    // then
    // Exception: merge error
    // await expectLater(stream, emitsInOrder([1, 2, 3, 4, 0, 1, 2]));

    stream.listen(null,
        onError: expectAsync2((p0, p1) => expect(p0, isException)));
  }, timeout: const Timeout(Duration(seconds: 10)));
```

</details>

### Never
무한 지속 시간을 나타내는 데 사용할 수 있는 종료되지 않는 Stream 시퀸스를 반환합니다.

never 연산자는 매우 구체적이고 제한된 동작을 가진 연산자입니다.

never 연산자는 테스트 목적으로 유용하며 때로는 다른 Stream과 함께 또는 다른 Stream을 매개 변수로 기대하는 Stream에 매개 변수로 결합하는 데 유용합니다.

<details>

<summary>> Never </summary>

```js
test('어떤 에러나 데이터등을 리턴하지 않아야 한다.', () async {
    // given
    var onDataCalled = false, onDoneCalled = false, onErrorCalled = false;

    // when
    final stream = Rx.never<void>();

    final subscription = stream.listen(
        expectAsync1((_) {
          onDataCalled = true;
        }, count: 0),
        onError: expectAsync2((Exception exception, StackTrace stackTrace) {
          onErrorCalled = true;
        }, count: 0),
        onDone: expectAsync0(() {
          onDataCalled = true;
        }, count: 0));

    await Future<void>.delayed(const Duration(seconds: 5));

    await subscription.cancel();

    // then
    // 어떠한 에러나 데이터등을 리턴하는 콜백함수가 호출되지 않아 모두 false값을 가지고 있음.
    await expectLater(onDataCalled, isFalse);
    await expectLater(onDoneCalled, isFalse);
    await expectLater(onErrorCalled, isFalse);

  }, timeout: const Timeout(Duration(seconds: 10)));
```

</details>

### Race
두 개 이상의 Stream이 주어지면 Stream List의 처음 항목에서만 모든 항목 Stream을 내보내 항목이나 알림을 방출합니다.

![image](https://user-images.githubusercontent.com/85836879/175802028-2dfc4fc7-6c2b-42f6-b2a1-9a2e0a9a7b8d.png)

<details>

<summary>> Race </summary>

```js
 test('race default', () {
   // given
    var a = Rx.timer(1, const Duration(seconds: 3)),
        b = Rx.timer(2, const Duration(seconds: 2)),
        c = Rx.timer(3, const Duration(seconds: 1));

    // when
    final stream = Rx.race([a, b, c]);

    // then
    stream.listen(expectAsync1((value) => expect(value, 3), count: 1));
  }, timeout: const Timeout(Duration(seconds: 5)));

  test('race 수행 중 에러가 발생하였을 경우', () {
    // given
    var a = Rx.timer(1, const Duration(seconds: 1)),
        b = Stream<void>.error(Exception('is was error on race'));

    // when
    final stream = Rx.race([a, b]);

    // then
    stream.listen(null,
        onError: expectAsync2((Exception exception, StackTrace stackTrace) =>
            expect(exception, isException)));
  }, timeout: const Timeout(Duration(seconds: 5)));
```

</details>

### Range
지정된 범위 내에서 정수를 방출하는 Stream을 반환합니다.

> Stream<int> range(
>   int startInclusive,
>   int endInclusive
> )

![image](https://user-images.githubusercontent.com/85836879/175802777-02497441-40f2-4439-b202-771757c2caf2.png)

<details>

<summary>> Range </summary>

```js
test('Range 1 ~ 3 범위 안의 값을 방출해야 한다.', () async {
    // when
    final stream = Rx.range(1, 3);
    // then
    await expectLater(stream, emitsInOrder([1, 2, 3, emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 3)));

test('Range의 시작과 끝이 같으면 1개의 항목만 방출해야 한다.', () {
    // when
    final stream = Rx.range(1, 1);
    // then
    stream.listen(expectAsync1((int actual) {
      expect(actual, 1);
    }, count: 1));
  }, timeout: const Timeout(Duration(seconds: 3)));

test('역순으로 방출해야 한다.', () async {
  // given
    // when
    final stream = Rx.range(3, 1);
    // then
    await expectLater(stream, emitsInOrder([3, 2, 1, emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 3)));
```

</details>

### Repeat
Stream이 성공적으로 종료될 때까지 지정한 횟수만큼 Stream을 재생성 및 재구독합니다.

>Stream<T> repeat<T>(
>Stream<T> streamFactory(
>int repeatIndex
>),
>[int? count]
>)

![image](https://user-images.githubusercontent.com/85836879/175852565-b33ca941-7586-4922-a341-82244d6063eb.png)

<details>

<summary>> Repeat </summary>

```js
class StreamUtil {
  static Stream<String> Function(int count) getRepeatStream(String element) =>
      (int count) async* {
        yield await Future.delayed(
          const Duration(milliseconds: 100),
          () => '$element$count',
        );
      };

  static Stream<String> Function(int count) getErrorRepeatStream(
          String element) =>
      (int repeatIndex) =>
          Stream.value(element).concatWith([Stream<String>.error(Error())]);
}


test('repeat 반복 횟수가 3일때 3번 반복해야 한다.', () async {
  // given
  var a = StreamUtil.getRepeatStream('A');

  // when
  final stream = Rx.repeat(a, 3);

  // then
  await expectLater(
      stream, emitsInOrder(<dynamic>['A0', 'A1', 'A2', emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));

test('반복 도중에 에러가 발생하더라도 정해진 횟수를 반복해야 한다.', () async {
  // given
  var a = StreamUtil.getErrorRepeatStream('A');

  // when
  final stream = Rx.repeat(a, 2);

  // then
  await expectLater(
      stream,
      emitsInOrder(<dynamic>[
        'A',
        emitsError(const TypeMatcher<Error>()),
        'A',
        emitsError(const TypeMatcher<Error>())
      ]));
}, timeout: const Timeout(Duration(seconds: 10)));
```

</details>

### Retry
Stream이 성공적으로 종료될 때까지 지정한 횟수만큼 소스 Stream을 재생성하고 다시 수신, 구독할 Stream을 만듭니다.

재시도 횟수를 지정하지 않으면 무한정 재시도합니다. 

재시도 횟수에 도달했지만 스트림이 성공적으로 종료되지 않은 경우 RetryError가 발생합니다.

RetryError에는 오류를 일으킨 모든 오류 및 StackTrace가 포함됩니다.

![image](https://user-images.githubusercontent.com/85836879/176113915-ea1d1bc3-9352-4042-bbe6-4f0eaedeea77.png)

<details>

<summary>> Retry </summary>

```js
class StreamUtil {
  static Stream<int> Function() getRetryStream(int failCount) {
    var count = 0;

      return () {
        if (count < failCount) {
          count++;
          return Stream<int>.error(
            Error(),
            StackTrace.fromString('retry stackTrace'),
          );
        }
        return Stream.value(1);
      };
    }
}

test('지정한 횟수만큼 재시도 해야한다.', () async {
  // given
    const retries = 3;
    var a = StreamUtil.getRetryStream(retries);

    // when
    final stream = Rx.retry(a, retries);

    // then
    await expectLater(
      stream,
      emitsInOrder(<dynamic>[1, emitsDone]),
    );
  }, timeout: const Timeout(Duration(seconds: 10)));

test('무한정 재시도해야 한다.', () async {
  // given
    const retries = 1000;
    var a = StreamUtil.getRetryStream(retries);

    // when
    final stream = Rx.retry(a);

    // then
    await expectLater(
      stream,
      emitsInOrder(<dynamic>[1, emitsDone]),
    );
  }, timeout: const Timeout(Duration(seconds: 5)));

```

</details>

### RetryWhen
에러가 발생하였을 때 Stream을 재생성하고 다시 구독할 Stream을 생성합니다.

소스 Stream에 오류가 발생하거나 완료되면 Stream이 종료됩니다.

retryWhenFactory 오류를 방출하는 RetryError가 발생합니다.

RetryError는 실패를 일으킨 모든 Error 및 StackTrace를 포함합니다.

>Stream<T> retryWhen<T>(
>Stream<T> streamFactory(),
>Stream<void> retryWhenFactory(
>Object error,
>StackTrace stackTrace
>)
>)

![image](https://user-images.githubusercontent.com/85836879/176116583-14f53b11-804e-40bc-99b6-a3e9ccee3c3a.png)

<details>

<summary>> RetryWhen </summary>

```js
class StreamUtil{
  static Iterable<int> range(int startOrStop, [int? stop, int? step]) sync* {
    final start = stop == null ? 0 : startOrStop;

    stop ??= startOrStop;
    step ??= 1;

    if (step == 0) throw ArgumentError('step con not be 0 value');
    if (step > 0 && stop < start) {
      throw ArgumentError(
          'if stop is positive, stop must be greater than start');
    }

    if (step < 0 && stop > start) {
      throw ArgumentError('if step is negative, stop must be less than start');
    }

    for (var value = start;
        step < 0 ? value > stop : value < stop;
        value += step) {
      yield value;
    }
  }

  static Stream<int> alwaysThrow(dynamic e, StackTrace stackTrace) =>
      Stream<int>.error(Error(),
          StackTrace.fromString('stackTrace ${stackTrace.toString()}'));

  static Stream<void> neverThrow(dynamic e, StackTrace stackTrace) =>
      Stream.value(null);

  static Stream<int> Function() sourceStream(int i, [int? throwAt]) {
    return throwAt == null
        ? () => Stream.fromIterable(range(i))
        : () => Stream.fromIterable(range(i))
            .map((el) => el == throwAt ? throw el : el);
  }
}

test('retryWhen 에러가 발생하지 않았을 때', () {
    // given
    var a = StreamUtil.sourceStream(3);
    var whenFactory = StreamUtil.alwaysThrow;

    // when
    final stream = Rx.retryWhen(a, whenFactory);

    // then
    expect(stream, emitsInOrder(<dynamic>[0, 1, 2, emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 5)));

test('retryWhen 에러 발생시에 whenFactory에서 다시 스트림으로 변환하여 무한으로 재시도한다.', () {
    // given
    var a = StreamUtil.sourceStream(1000, 2);
    var whenFactory = StreamUtil.neverThrow;

    // when
    final stream = Rx.retryWhen(a, whenFactory).take(5);

    // then
    expect(
      stream,
      emitsInOrder(<dynamic>[0, 1, 0, 1, 0, emitsDone]),

    );
  }, timeout: const Timeout(Duration(seconds: 5)));

```

</details>

### SequenceEqual
두개의 Stream이 동일한 순서의 항목을 방출하는지 확인합니다.

연산 과정을 결정하기 위해 부등호를 제공할 수 있습니다.

![image](https://user-images.githubusercontent.com/85836879/176472928-1239f7bc-fb23-43a0-9c01-324ff7c34d1e.png)

<details>

<summary>> SequenceEqual </summary>

```js
test('sequenceEqual default 두개의 스트림이 같아야 한다.', () {
    // given
    var a = Stream.fromIterable([0, 1, 2, 3, 4]),
        b = Stream.fromIterable([0, 1, 2, 3, 4]);

    // when
    final stream = Rx.sequenceEqual(a, b);

    // then
    expect(stream, emitsInOrder([true]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('시간차가 있어도 두개의 스트림이 같은지 비교한다.', () {
    // given
    var a = Stream.periodic(
            const Duration(milliseconds: 500), (index) => index + 1).take(5),
        b = Stream.fromIterable([1, 2, 3, 4, 5]);

    // when
    final stream = Rx.sequenceEqual(a, b);

    // then
    expect(stream, emitsInOrder([true]));
  }, timeout: const Timeout(Duration(seconds: 10)));

test('비교 조건을 임의로 항상 true일 때 비교값은 true이다.', () {
    // given
    var a = Stream.fromIterable([1, 1, 1, 1, 1]),
        b = Stream.fromIterable([2, 2, 2, 2, 2]);

    // when
    final stream = Rx.sequenceEqual(a, b, equals: (int a, int b) => true);

    // then
    expect(stream, emitsInOrder([true]));
  }, timeout: const Timeout(Duration(seconds: 10))); 

test('비교 조건이 없으니 비교했을 때 false를 반환한다.', () {
    // given
    var a = Stream.fromIterable([1, 1, 1, 1, 1]),
        b = Stream.fromIterable([2, 2, 2, 2, 2]);

    // when
    final stream = Rx.sequenceEqual(a, b);

    // then
    expect(stream, emitsInOrder([false]));
  }, timeout: const Timeout(Duration(seconds: 10)));

test('에러 역시 같은지 비교해야 한다.', () {
    // given
    var a = Stream<void>.error(ArgumentError('error')),
        b = Stream<void>.error(ArgumentError('error'));

    // when
    final stream = Rx.sequenceEqual(a, b,
        errorEquals: (ErrorAndStackTrace a, ErrorAndStackTrace b) =>
            a.stackTrace == b.stackTrace ? true : false);

    // then
    expect(stream, emitsInOrder([true]));
  }, timeout: const Timeout(Duration(seconds: 10)));

test('에러를 비교한값이 다를 경우 false를 방출한다.', () {
    // given
    var a = Stream<void>.error(ArgumentError('error')),
        b = Stream<void>.error(ArgumentError('is not same error'));

    // when
    final stream = Rx.sequenceEqual(a, b);

    // then
    expect(stream, emitsInOrder([false]));
  }, timeout: const Timeout(Duration(seconds: 10)));

```

</details>

### SwitchLatest
상위 Stream에서 가장 최근 방출된 Stream의 항목만 방출하는 용도로 쓰입니다.

switchLatest Stream은 새로운 Stream이 방출될 때 이전에 방출된 Stream 구독을 취소합니다.

> 상위 Stream 
> Stream.value(Stream.value())

<details>

<summary>> SwitchLatest </summary>

```js
  test('상위 Stream에서 가장 최근 방출된 데이터를 방출한다.', () {
    // given
    var a = Stream.value(Stream.fromIterable(const ['A', 'B', 'C']));

    // when
    final stream = Rx.switchLatest(a);

    // then
    expect(stream, emitsInOrder(['A', 'B', 'C', emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('상위 Stream의 가장 최근 방출된 값이 먼저 방출되어야 한다.', () {
    // given
    var a = Stream.fromIterable([
      Rx.timer('A', const Duration(seconds: 5)),
      Rx.timer('B', const Duration(seconds: 1)),
    ]);

    // when
    final stream = Rx.switchLatest(a);

    // then
    expect(stream, emits('B'));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('상위 Stream에서 방출된 오류를 방출해야 한다.', () {
    // given
    var a = Stream.fromIterable([
      Stream<Stream<void>>.error(Exception()),
      Rx.timer('A', const Duration(seconds: 3)),
      Rx.timer('B', const Duration(seconds: 5)),
    ]);

    // when
    final stream = Rx.switchLatest(a);

    // then
    expect(stream, emitsError(isException));
  }, timeout: const Timeout(Duration(seconds: 10)));

```

</details>

### Timer
지정된 시간이 지나면 주어진 값을 반환합니다.

![image](https://user-images.githubusercontent.com/85836879/176705639-8f336210-277b-47d6-86c0-ca6605d0b5a3.png)

<details>

<summary>> Timer </summary>

```js
test('지정된 시간이 지나면 주어진 값을 방출한다.', () async {
    // given
    const a = 1;

    // when
    final stream = Rx.timer(a, const Duration(seconds: 3));

    // then
    await expectLater(stream, emitsInOrder([1, emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 5)));
```

</details>

### Zip
각각의 Stream이 최소한 1개씩 값을 방출할 때마다 지정된 Zip 메소드를 사용하여 지정된 Stream을 하나의 Stream 시퀀스로 병합합니다.

![image](https://user-images.githubusercontent.com/85836879/176706607-0ac1d147-9f41-4523-b38a-5698ee269217.png)

<details>

<summary>> Zip </summary>

```js

test('지정된 Stream을 하나의 Stream 시퀸스로 병합한다.', () async {
    // given
    var a = Stream.fromIterable(['A']),
        b = Stream.fromIterable(['B']),
        c = Stream.fromIterable(['C', 'D']);

    // when
    final stream = Rx.zip([a, b, c], (values) => values);

    // then
    await expectLater(
        stream,
        emitsInOrder([
          ['A', 'B', 'C'],
          emitsDone
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('다수의 Stream을 Zip 메소드로 병합한다.', () async {
    // given
    var a = Stream.fromIterable(['1']), b = Stream.fromIterable(['2', '3']);

    // when
    final stream = Rx.zip2(a, b, (String a, String b) => a + b);

    // then
    await expectLater(stream, emitsInOrder(['12', emitsDone]));
  }, timeout: const Timeout(Duration(seconds: 10)));

  test('Stream 중에 에러가 포함되어 있는 경우 에러를 방출한다.', () async {
    // given
    var a = Stream.value(1),
        b = Stream.value(2),
        c = Stream<int>.error(Exception());

    // when
    final stream = Rx.zip3(a, b, c, (int a, int b, int c) => a + b + c);

    // then
    await expectLater(stream, emitsError(const TypeMatcher<Exception>()));
  }, timeout: const Timeout(Duration(seconds: 10)));

```

</details>


