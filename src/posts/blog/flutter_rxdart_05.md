---
title: "RxDart 기타 함수"
category: "Flutter"
date: "2022-07-14 15:51:00 +09:00"
desc: "테스트코드로 알아보는 기타 함수 "
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

## 기타 함수
기타 함수에서는 Do 함수와 Subject 함수를 다루고 있습니다.

Do 함수는 Stream 방출 이후의 시점에서 콜백 함수를 의미하며, Subject 함수는 Stream 구독 시작 또는 구독 이후에 옵저버에게 제공하는 함수를 의미합니다.

## Subject 함수
## PublishSubject
PublishSubject는 구독 이후에 Stream이 방출한 항목들만 옵저버에게 방출합니다.

![PublishSubject](https://user-images.githubusercontent.com/85836879/179347921-b16819f4-2d68-48aa-984e-2c0e469da82b.png)

<details>

<summary> PublishSubject </summary>

```js
test('PublishSubject를 이용해 구독한 모든 항목들을 옵저버에게 방출해야 한다. ', () async {
    // given
    final subject = PublishSubject<int>();

    // when
    scheduleMicrotask(() {
      subject.add(1);
      subject.add(2);
      subject.add(3);
      subject.close();
    });

    // then
    await expectLater(subject.stream, emitsInOrder([1, 2, 3, emitsDone]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>


## BehaviorSubject
BehaviorSubject는 구독을 시작하면 Stream이 가장 최근에 방출한 항목 또는 기본값(없다면 첫 번째 항목)의 방출을 시작하며 이후 Stream에 의해 방출된 항목들을 이어서 방출합니다.

![BehaviorSubject](https://user-images.githubusercontent.com/85836879/179347859-3026f13d-89f5-47f4-920d-b7b262daf872.png)

<details>

<summary> BehaviorSubject </summary>

```java
test(
      'BehaviorSubject를 이용해 구독 이후 Stream이 최근에 방출한 항목을 방출하고 없는 경우 기본값 또는 최근값을 옵저버에게 방출해야 한다.',
      () async {
    // given
    final unseeded = BehaviorSubject<int>(),
        seeded = BehaviorSubject<int>.seeded(0);

    // when
    unseeded.add(1);
    unseeded.add(2);
    unseeded.add(3);

    // then
    await expectLater(unseeded.stream, emits(3));
    await expectLater(unseeded.stream, emits(3));
    await expectLater(unseeded.stream, emits(3));

    await expectLater(seeded.stream, emits(0));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

## ReplaySubject
ReplaySubject는 옵저버가 구독을 시작한 시점과 관계없이 Stream을 처음부터 모두 방출합니다.

![ReplaySubject](https://user-images.githubusercontent.com/85836879/179347886-b173de5b-0a04-4a53-ac5c-2e43aab389d6.png)

<details>

<summary> ReplaySubject </summary>


```js
test('ReplaySubject를 이용해 옵저버가 Stream을 처음부터 방출해야 한다.', () async {
    // given
    final subject = ReplaySubject<int>();

    // when
    subject.add(1);
    subject.add(2);
    subject.add(3);

    // then
    await expectLater(subject.stream, emitsInOrder([1, 2, 3]));
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

---
## Do 함수

## doOnData
Stream이 항목을 내보낼 때 지정된 콜백 함수를 호출합니다.

다른 Rx 구현체에서는 doOnNext로 사용합니다.

<details>

<summary> doOnData </summary>

```java
test('Stream이 항목을 방출할 때 지정된 콜백 함수를 호출해야 한다.', () async {
    // given
    var onDataCalled = false;
    var temp = Stream.value(1);

    // when
    final stream = temp.doOnData((_) => onDataCalled = true);

    // then
    await expectLater(stream, emits(1));
    await expectLater(onDataCalled, true);
}, timeout: const Timeout(Duration(seconds: 10)));

test('BroadCastStream에서 doOnData는 1번만 호출되어야 한다.', () async {
    // given
    final actual = <int>[];
    final controller = BehaviorSubject<int>(sync: true);

    // when
    final stream = controller.stream.transform(
      DoStreamTransformer(onData: (element) => actual.add(element)),
    );
    stream.listen(null);
    stream.listen(null);
    controller.add(1);
    controller.add(2);

    // then
    await expectLater(actual, const [1, 2]);
    await controller.close();
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### doOnDone
Stream의 방출이 완료되면 지정된 콜백 함수를 호출합니다.

다른 Rx 구현체에서는 doOnComplete로 사용합니다.

<details>

<summary> doOnDone </summary>

```java
test('Stream이 종료되면 doOnDone 콜백 함수가 호출되어야 한다.', () async {
    // given
    var onDoneCalled = false;
    const temp = Stream<void>.empty();

    // when
    final stream = temp.doOnDone(() => onDoneCalled = true);

    // then
    await expectLater(stream, emitsDone);
    await expectLater(onDoneCalled, isTrue);
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### doOnError
Stream에서 에러가 방출되면 지정된 콜백 함수를 호출합니다.

<details>

<summary> doOnError </summary>

```js
test('에러가 방출되었을때 doOnError가 호출되어야 한다.', () async {
    // given
    var onErrorCalled = false;
    final temp = Stream<void>.error(Exception());

    // when
    final stream = temp.doOnError(
      (_, StackTrace stackTrace) => onErrorCalled = true,
    );

    // then
    await expectLater(stream, emitsError(isException));
    await expectLater(onErrorCalled, isTrue);
}, timeout: const Timeout(Duration(seconds: 10)));

test('broadCastStream에서 에러가 발생했을떄, doOnError는 1번만 호출되어야 한다.', () async {
    // given
    var count = 0;
    final subject = BehaviorSubject<int>(sync: true);

    // when
    final stream = subject.stream.doOnError((_, __) => count++);
    stream.listen(null, onError: (_, __) {});
    stream.listen(null, onError: (_, __) {});
    subject.addError(Exception());
    subject.addError(Exception());
    subject.addError(Exception());

    // then
    await expectLater(count, 3);
    await subject.close();
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### doOnEach
Stream이 데이터를 내보내거나 에러를 내보내거나 완료를 표시하는 경우 지정된 콜백 함수를 호출합니다.

콜백은 Notification 객체로 수산합니다.

Notification 객체는 onData, onDone, onError 3개의 Kind를 가지고 있습니다.

데이터는 onData 콜백함수에 담기고 완료시에는 onDone 콜백을 호출하고, 에러 발생시 onError 함수를 호출합니다.

Notification의 매개변수 중에 ErrorAndStackTrace를 갖지만 onError 콜백함수는 Error와 StackTrace 타입을 나눠 갖습니다.

<details>

<summary> doOnEach </summary>

```java
test('Data, Error, Done의 Notification이 있을때 doOnEach를 호출해야 한다.', () async {
    // given
    StackTrace? stackTrace;
    final exception = Exception();
    final actual = <Notification<int>>[];
    final temp = Stream.value(1).concatWith([Stream<int>.error(exception)]);

    // when
    final stream = temp.doOnEach((notification) {
      actual.add(notification);

      if (notification.isOnError) {
        stackTrace = notification.errorAndStackTrace?.stackTrace;
      }
    });

    // then
    await expectLater(
      stream,
      emitsInOrder(<dynamic>[1, emitsError(isException), emitsDone]),
    );

    await expectLater(actual, [
      Notification.onData(1),
      Notification<int>.onError(exception, stackTrace),
      Notification<int>.onDone(),
    ]);
}, timeout: const Timeout(Duration(seconds: 10)));

test('BroadCastStream에서 doOnEach는 1번만 호출되어야 한다.', () async {
    // given
    var count = 0;
    final controller = StreamController<int>.broadcast(sync: true);
    final stream = controller.stream.transform(
      DoStreamTransformer(onEach: (_) => count++),
    );

    // when
    stream.listen(null);
    stream.listen(null);
    controller.add(1);
    controller.add(2);
    controller.add(3);

    // then
    await expectLater(count, 3);
    await controller.close();
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### doOnCancel
Stream 구독이 취조되면 지정된 콜백 함수를 호출합니다.

다른 Rx 구현테에서는 doOnUnsubscribe 또는 doOnDispose로 사용합니다.

<details>

<summary> doOnCancel </summary>

```java
test('구독을 취소하였을 때, doOnCancel가 호출되어야 한다.', () async {
    // given
    var onCancelCalled = false;
    final stream = Stream.value(1);

    // when
    await stream.doOnCancel(() => onCancelCalled = true).listen(null).cancel();

    // then
    await expectLater(onCancelCalled, isTrue);
}, timeout: const Timeout(Duration(seconds: 10)));

test('BroadCastStream에서 dpOnCancel가 1번만 호출되어야 한다.', () async {
    // given
    var count = 0;
    final subject = BehaviorSubject<int>(sync: true);

    // when
    final stream = subject.doOnCancel(() => count++);
    await stream.listen(null).cancel();
    await stream.listen(null).cancel();

    // then
    await expectLater(count, 2);
    await subject.close();
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### doOnPause
Stream 구독이 일시 중지 되면 지정된 콜백 함수를 호출합니다.

<details>

<summary> doOnPause </summary>

```java
test('구독이 일시 중지되면 doOnPause가 호출되어야 한다.', () async {
    // given
    var onPauseCalled = false;
    var temp = Stream.value(1);

    // when
    final stream = temp.doOnPause(() => onPauseCalled = true);

    // then
    stream.listen(null, onDone: expectAsync0(() {
      expect(onPauseCalled, isTrue);
    }))
      ..pause()
      ..resume();
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### doOnResume
Stream 구독이 수신을 재개할 때 지정된 콜백 함수를 호출합니다.

<details>

<summary> doOnResume </summary>

```java
test('구독 취소후 재구독을 할 때 doOnResume가 호출되어야 한다.', () async {
    // given
    var onResumeCalled = false;
    var temp = Stream.value(1);

    // when
    final stream = temp.doOnResume(() => onResumeCalled = true);

    // then
    stream.listen(null, onDone: expectAsync0(() {
      expect(onResumeCalled, isTrue);
    }))
      ..pause()
      ..resume();
}, timeout: const Timeout(Duration(seconds: 10)));
```
</details>

### 마치며..
포스팅한 내용이외에도 많은 Do 함수와 Subject 함수가 존재합니다.

궁금하다면 <a href="https://github.com/ReactiveX/rxdart" target="_blank">RxDart 공식 깃허브</a>를 방문하세요!
