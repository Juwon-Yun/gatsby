---
title: "Dart에서 멀티스레드 돌리기"
category: "Flutter"
date: "2023-01-04 23:53:00 +09:00"
desc: "Concurrency in Dart"
thumbnail: "./images/flutter/flutter_logo.jpg"
alt: "flutter"
---

### 들어가며

[다트의 동시성](https://dart.dev/guides/language/concurrency)

Flutter는 단일 스레드 기반 프레임워크입니다.

앱에서 원하는 기능을 제공함과 동시에 동일한 프레임을 제공해야 할 때, 할 수 있는 방법 중 하나인 다트의 멀티스레드 Isolate를 소개하는 글입니다.

다트의 Isolate를 사용하는 장점 중 하나로 앱의 프레임을 유지한채로 메인 스레드에 부담을 주지않고 Widget Tree를 재빌드하고 다시 렌더링 할 수 있습니다.

각각의 Isolate(스레드)는 서로 분리된 메모리 공간이며, 각자의 고유한 이벤트 루프를 가지게 됩니다.

> 이벤트 루프 - 이벤트 큐에서 가장 오래된 이벤트를 처리하고 다음 순서의 이벤트 큐가 없을 때 까지 반복 수행함.

또한 각각의 Isolate 간에 메세지를 주고받을 수 있으며, 서로 메세지를 주고받게 되면 다른 스레드 공간에서 동시에 이벤트 루프를 수행할 수 있습니다.

우선 Isolate를 다루기 전에 비동기 다트인 Future와 Stream이 Dart VM에서 어떻게 작동되는지 알아야 합니다.

![image](https://user-images.githubusercontent.com/85836879/210585348-eeecb8b1-4d99-4cb5-a408-fdbc23182d15.png)

Dart 언어의 Future와 Stream 객체는 향후 제공될 값을 나타냅니다.

예를 들어, 값을 제공하겠다는 약속은 Future<T>로 사용하며, 연속된 값을 제공하겠다는 약속은 Stream<T> 입니다.

그림에서 볼 수 있듯이 readAsString()은 다트 VM 또는 운영 체제에서 다트 이외에(Non-Dart) 것을 실행하는 동안 일시 중지 됩니다.

값을 반환하면 readAsString() 코드가 실행이 재개됩니다. 

await 와 async 그리고 Future 사용에 대해 자세히 알아보려면 [Codelab](https://dart.dev/codelabs/async-await)을 방문하세요!

### Isolate가 어떻게 동작하는지
대부분의 최신 장치에서는 멀티 코어 CPU가 있지만, 모든 코어를 활용하기 위해 개발자는 가끔 동시에 실행되는 공유 메모리 스레드를 사용합니다.

하지만 공유 상태 동시성은 예외가 발생하기 쉽고, 복잡한 코드로 이어질 수 있습니다.

쓰레드 이외에 모든 다트 코드는 분리되어 내부에서 실행됩니다.

각각의 Isolate에는 메모리 힙이 있으므로 서로 다른 Isolate의 어떠한 상태도 다른 Isolate에서 접근할 수 없습니다.

공유되는 메모리가 없기 때문에 뮤텍스나 잠금(mutexed or locks)에 대해 걱정할 필요가 없습니다.

Isolate를 사용하면 다트 코드가 사용가능 한 경우 추가 코어를 사용하여 한 번에 여러개의 독립적인 작업을 수행할 수 있습니다. 

Isolate는 쓰레드 또는 프로세스와 비슷하지만 각각의 Isolate에는 고유한 메모리와 이벤트 루프를 실행하는 단일 스레드가 존재합니다. 

### 메인 Isolate

![image](https://user-images.githubusercontent.com/85836879/212456603-6d95a6da-32ef-4ef3-889f-c22e9552d2cf.png)

일반적인 다트 앱은 Isolate에 고려할 필요가 없는 경우가 많습니다.

위 그림처럼 앱의 기본적인 메인 Isolate에서 모든 코드를 실행합니다.

단일 스레드 앱도 async-await를 사용해 비동기 작업이 완료될 때까지 기다렸다가 다음 코드 줄을 계속 진행하면 원활하게 실행할 수 있습니다.

제대로 작동하는 앱은 빠르게 시작해 가능한 빨리 이벤트 루프에 도달합니다. 그런 다음 앱은 필요에 따라서 비동기 작업을 사용해 대기 중인 각각의 이벤트에 즉시 응답합니다.

### Isolate의 생명주기

![image](https://user-images.githubusercontent.com/85836879/212456804-1e474097-eac8-46f8-986f-25581978bf4e.png)
