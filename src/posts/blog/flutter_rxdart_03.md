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

## 변형 함수 (Transformer)

### Window
Stream에서 수집한 항목의 Window를 내보내는 Stream을 반환합니다.

출력 Stream은 겹치지 않는 연결된 Window를 보냅니다.

Stream 항목을 내보낼 때마다 현재 Window를 내보내고 새로운 Window를 열게 됩니다.

각각의 Window는 Stream이므로 출력은 상위 Stream입니다. ( Stream<Stream>() )

![window](https://user-images.githubusercontent.com/85836879/177263992-22e3795a-7590-4454-8ceb-93fac53ce6d7.png)

```js
test('지정된 시간마다 새로운 상위 Stream을 만들어야 한다.', () {
    // given
    var a = Stream.value([0, 1]);

    // when
    Stream<List<List<int>>> result = a
        .window(
            Stream<void>.periodic(const Duration(milliseconds: 200)).take(3))
        .asyncMap((event) => event.toList());

    // then
    expectLater(
        result,
        emitsInOrder(<dynamic>[
          const [
            [0, 1]
          ],
          emitsDone
        ]));
  }, timeout: const Timeout(Duration(seconds: 10)));
```