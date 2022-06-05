---
title: "Flutter & Dart"
category: "Flutter"
date: "2022-04-27 21:00:00 +09:00"
desc: "다트와 플러터"
thumbnail: "./images/flutter/flutter_logo.jpg"
alt: "flutter"
---


![flutter dart](https://user-images.githubusercontent.com/85836879/170853141-e5a9ce19-3c5b-4888-baf6-9a2e1a2e27b3.png)

이번 포스팅에서 다룰 내용은 Flutter와 Dart입니다.

---

# 🎯
## Dart?

다트는 2011년 10월 GOTO 콘퍼런스에서 구글이 공개한 객체지향 프로그래밍 언어입니다.

구글이 멀티 플랫폼 상에서 동작되도록 하는 앱을 위해 디자인되었습니다.

기본적으로 C언어의 문법과 거의 유사하며 간결하고 강력한 기능을 지원합니다.

Dart의 용도는 모바일, 데스크톱, 서버, 웹 앱 용도로 사용됩니다.

Dart는 DVM( Dart VM )상에서 동작하거나 네이티브 컴파일링을 통해 모바일, 데스크톱, 브라우저, 서버 플랫폼 상에서 애플리케이션을 실행하고 지원합니다.

Dart의 유연한 컴파일링 덕에 대상 플랫폼 및 목적에 따라 다양한 방식으로 실행할 수 있습니다.

---

### Dart Native

모바일, 데스크톱, 서버, 임베디드를 대상으로 하는 프로그램의 경우에 사용합니다.

Native에는 순수 Dart 인터프리터와 JIT( Just-In-Time ), AOT( Ahead-Of-Time ) 컴파일러가 모두 포함되어 있습니다.

### Dart Web

웹을 대상으로 하는 프로그램의 경우 Dart Web을 이용합니다.

개발 시에 사용하는 컴파일러( dartdevc )와 프로덕션 환경에 사용하는 컴파일러(dart2 js)가 모두 포함되어 있습니다.

---

### Develop WorkFlow( JIT + Dart VM )

Dart 앱을 프로덕션 환경에 배포할 준비가 되면 ( 앱 스토어에 게시할 때 ) Dart AOT 컴파일러를 사용하여 네이티브 ARM 또는 X64 코드 머신 코드로 앱을 사전에 컴파일할 수 있다.

AOT 컴파일된 애플리케이션은 즉시 시작하고 원할하게 실행됩니다. 

AOT로 컴파일 된 코드는 Dart 타입 시스템을 실행하고 빠른 객체 할당 및 가비지 콜렉터를 사용하여 메모리를 관리하는 효율적인 Dart 런타임에서 실행됩니다.

### Compile to Native ( AOT + Runtime )

Dart Native는 모바일, 데스크톱 및 서버 애플리케이션용 네이티브 ARM 또는 X64 시스템 코드로 컴파일된 Dart 코드를 실행할 수 있게 한다.

모바일, 데스크톱, 웹, 임베디드 장치를 대상으로 할 때 Flutter는 Dart Native가 제공하는 인기 있는 멀티 플랫폼 UI 툴킷입니다.

---

### Dart의 특징 

### 모든 것들을 전부 Object로 취급합니다.

Variable안에 넣을 수 있는 것은 전부 Object로 취급하며 Function, number, null 전부 Object로 취급합니다.

변수에 넣을 수 있는 모든 것은 객체이며, 모든 객체는 클래스의 인스턴스로 취급합니다.
#
### List <int>, List <dynamic> 같은 제너릭 type을 지원합니다.

다음과 같은 형식이 가능합니다. ( 전부 Object이기 때문 )
```java
List<dynamic> list = [0, 1, "2", false, true]
```
#
### Typed 언어지만 자유도를 제공합니다.

기본은 typed 언어지만 Var, dynamic으로 선언하면 동적 type으로 사용 가능합니다.

Var로 선언된 변수는 type을 지정하지 않아도 dart에서 알아서 variable의 type이 뭔지 추측을 합니다.

하지만 다른 타입을 재할당 할 수 없습니다.
#
### 접근 제한자의 정의가 없으며 \_function()으로 정의됩니다.

private인 \_(언더바)은 class안에서만 접근 가능한 것이 아닌 dart page 단위에서 정의합니다.
#

## 그러면 Flutter??
---

Flutter는 구글에서 2017년 5월에 출시한 모바일, 웹, 데스크톱 크로스 플랫폼 GUI SDK입니다.

한 종류의 코드로 안드로이드, 아이폰, 리눅스, 윈도, 맥 및 웹 브라우저에서 모두 동작되는 앱을 위해 출시되었습니다.

사용하는 언어는 역시 Dart입니다.

리눅스, 윈도우, 맥에서 플러터 앱 실행은 2021년 3월부터 공식적으로 지원하고 있습니다. (구글 차기 OS인 퓨시아 포함)

엔지니어의 선택에 따라 iOS 앱에서 구글의 테마 디자인과 애니메이션을 사용하는 것이 가능하며 

안드로이드 앱에서 애플의 테마를 적용하는 것도 가능합니다.

크로스 플랫폼 환경이면서도 네이티브 성능과 UI, 여러 확장 기능을 제공하는 프레임워크입니다.

iOS 앱에서는 소스코드를 Xcode에서 실행하면 잘 작동합니다.

Hot Reload 기능을 사용하면 디버깅을 중지하지 않고 소스 수정 후 저장만 하면 에뮬레이터나 기기에 바로 반영되어 UI와 로직이 모두 업데이트됩니다.

Hot Restart 기능까지 사용하면 프로젝트 프로그램을 종료하기 전까지 디버깅을 중지할 필요가 없습니다.

Flutter와 Dart의 역사와 특징에 대해 알아보았습니다.

![dartworld](https://user-images.githubusercontent.com/85836879/170853303-4efb2d27-2abe-4aa7-aebb-870d4083815c.png)
![printdart](https://user-images.githubusercontent.com/85836879/170853304-2525e733-7cc2-4992-ad37-f9c000f37fc7.png)
