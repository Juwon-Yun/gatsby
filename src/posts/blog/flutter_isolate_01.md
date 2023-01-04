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

Flutter는 단일 스레드 기반 프레임워크이다.

앱에서 원하는 기능을 제공함과 동시에 동일한 프레임을 제공해야 할 때, 할 수 있는 방법 중 하나인 다트의 멀티 스레드 Isolate를 다루는 글입니다.

다트의 Isolate를 사용하는 장점 중 하나로 앱의 프레임을 유지한채로 메인 스레드에 부담을 주지않고 Widget Tree를 재빌드하고 다시 렌더링 할 수 있습니다.

각각의 Isolate(스레드)는 서로 분리된 메모리 공간이며, 각자의 고유한 이벤트 루프를 가지게 됩니다.

*이벤트 루프 - 이벤트 큐에서 가장 오래된 이벤트를 처리하고 다음 순서의 이벤트 큐가 없을 때 까지 반복 수행한다.

또한 각각의 Isolate 간에 메세지를 주고받을 수 있으며, 서로 메세지를 주고받게 되면 다른 스레드 공간에서 동시에 이벤트를 수행할 수 있습니다.