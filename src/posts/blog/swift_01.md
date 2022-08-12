---
title: "Swift"
category: "Swift"
date: "2022-08-09 21:56:00 +09:00"
desc: "스위프트"
thumbnail: "./images/swift/swift_logo.jpg"
alt: "swift"
---

![image](https://user-images.githubusercontent.com/85836879/183657001-f846474d-64c2-45bc-b993-a3cd4de97bcb.png)

## Swift
스위프트는 2014년 6월 애플 세계 개발자 회의(WWDC)에서 처음 소개되었으며 iOS와 macOS 그리고 iPadOS를 위한 프로그래밍 언어입니다.

발표 초기에 스위프트 언어의 문법은 파이썬과 비슷하다고 알려졌습니다.

스위프트 언어는 기존의 애플 운영체제용 언어인 Objective-C와 함께 사용할 목적으로 만들어졌습니다.

이름의 유래로 신속한, 재빠른이라는 뜻의 영단어인 Swift입니다.

로고는 Swift라고 불리는 칼새(swift)를 상징하는 것으로 알려져 있습니다.

Objective-C와 함께 사용할 목적인 만큼 Objective-C의 단점을 보완하고 LLVM과 C언어 컴파일러로 빌드되는 애플의 새로운 프로그래밍 언어입니다.

기존 Objective-C에 비해 클로저, 멀티 리턴 타입, 네임스페이스, 제네릭, 타입 인터페이스 등등 Objective-C에는 없었던 Golang의 특성과 유사한 현대 프로그래밍 언어가 갖고 있는 기능을 많이 포함시켰으며, 이에 걸맞게 일정한 성능 향상을 보이고 있습니다.

2015년에는 프로그래밍 언어 중 가장 좋아하는 언어 1위를 기록하기도 하였습니다.

## Swift의 철학
Swift는 다음과 같이 코드의 표현력을 높이기 위한 다양한 기능을 제공합니다.

> 함수 포인터와 통합된 클로저
> 
> 튜플 및 멀티 리턴 값
>
> 제네릭
>
> 범위 또는 컬렉션에서의 빠르고 간결한 반복
>
> 메소드, 확장 프로그램과 프로토콜을 지원하는 구조
>
> 함수형 프로그래밍(map, filter 등)

처음 WWDC에서 공개된 Swift의 특징은 Fast, Modern, Safe, Interactive이었으나, 이후 Safe, Fast, Expressive로 바뀌었습니다.

어느정도 하위 언어와 호환성도 보장되어 있어, 코드 내부에 C언어 또는 Objective-C 코드를 섞어 프로그래밍할 수 있게 되어 있습니다.

## Objective-C와의 관계
많은 사람들이 Objective-C를 묻혀질 언어로만 생각하고 있지만, 의외로 그렇지 않습니다.

Swift 프로젝트에서 Objective-C는 아무런 제약 없이 사용 가능합니다.

Swift의 컴파일러와 Objective-C의 컴파일러 백엔드는 둘다 LLVM으로 동일하며, 어떤 언어를 사용해서 코드를 작성하더라도 같은 형태의 중간언어로 번역되어 컴파일 됩니다.

실제로 Swift에서 기존 Objective-C로 작성되어 있는 패키지를 사용하기 위해서라도 Objective-C는 현역으로 사용됩니다.

프로젝트 내부에서 대부분의 코드가 Swift로 작성되지만, Objective-C 기반으로 작성되어 있는 기존 코드가 상당수이기 때문에, Swift가 정착된 후에도 한동안 Objective-C의 사용은 계속될 것으로 보입니다.

Apple 계열의 많은 패키지가 Swift로 재작성되거나 Swift만으로 작성되고 있으며 Objective-C로 작성된 패키지라도 해도 Xcode 등의 IDE가 Swift에서 바로 사용할 수 있도록 적절히 처리해주기 때문에, Objective-C로 만들어진 패키지를 직접 수정할 일만 없다면 Objective-C를 전혀 몰라도 Swift를 작성하는데 아무런 문제가 없습니다.

굳이 새로운 프로젝트를 Objective-C로 진행하는 경우는 거의 없으므로 Swift를 주력 언어로 사용한다면 Objective-C는 코드 리딩 정도만 할 줄 알면 충분합니다.
(Swift와 Objective-C는 Cocoa Framework 기반으로 코드 리딩을 위해 별도의 공부까진 필요하지 않습니다.)

## Swift Playgrounds
Swift Playgrounds는 Swift의 iPad 버전으로 말할 수 있습니다.

WWDC16에서 최초로 공개되었으며, 라이센스는 무료입니다.

누구나 쉽게 프로그래밍을 배울 수 있게 하고자 개발된 앱입니다.

하지만 iPhone용 앱은 없으며 2.2버전에서는 수준급의 한글화도 지원하게 되었습니다.

또한 iPadOS 15에서는 iPad의 Swift Playgrounds앱 하나만으로 Mac의 도움 없이 iPadOS용 앱을 개발해 테스트하고 앱스토어에 등록하는 것까지 가능합니다.

## Swift의 단점
초창기 Swift는 Objective-C에 비해 문제가 있었지만 초기 출시 3년 후 엄청난 속도로 업데이트를 하면서 언어의 동작과 API가 변경되었습니다.

Swift 2 기반으로 코드를 다 짜 놓았는데 Swift 3.0이 릴리즈되며 코드가 싹 바뀌었고, 4.0에서 또 바뀌어 버려서 코드를 하나하나 수정해 주어야하는 일이 발생한 것입니다.

Swift 3.0에서 4.0버전 또는 4.2버전으로 마이그레이션 할 수 있는 가이드를 제공하고 있지만 버전 업이 되었을 때 Code Completion 기능이 안되는 것은 사실입니다.

LLVM/C언어 기반의 컴파일러에선 실시간 오류 검출 기능은 Xcode의 컨디션에 따라 다른 퍼포먼스를 제공합니다.

이미 Apple 개발자 커뮤니티에서는 이와 관련된 문제가 제시되고 있습니다.

대표적인 Swift 단점 몇가지 입니다.

> 컴파일 속도
>   Objective-C에 비해서 빌드 속도가 현저히 느려졌습니다.
> 
> Xcode의 전반적인 반응 속도
>   Xcode를 사용하면서 Swift 3.0버전으로 업데이트 되면서 CPU 사용이 크게 증가하였습니다. 하지만 Objective-C에서는 문제가 발생하지 않습니다.
>   
> 문자열 조작
>   문자열 조작이 무지하게 불편합니다. 유니코드 때문에 실제로 글자 1자가 일정한 바이트 수가 아닌 것은 프로그래밍 언어로써 이해하지만 어떠한 문자열의 인덱스 번위에 해당하는 부분 문자열을 가져오고 싶다면 다음과 같이 해야합니다.
> 

```swift
let text = "The Swift Programming Language"
let subText = text[text.index(text.startIndex, offsetBy: 4)..<text.index(text.startIndex, offsetBy: 8)]
// subText == "Swif"
```

## Swift 개발 환경
Swift를 공식적으로 지원하는 통합 개발 환경으로 Xcode가 있으며 JetBrains의 AppCode와 CLion(C, C++, Objective-C, Objective-C++)이 있습니다.

## Swift의 미래
애플이 적극적으로 밀어주는 언어라서 구글처럼 잘 안된다 싶으면 바로 접어버리는 것과는 달리 애플은 한번 밀기 시작하면 20년은 꾸준히 밀어준 역사가 있어서, Swift가 앞으로도 쭉 쓰일 것입니다.

2018년 7월을 시작으로 등장한지 4년이 채 안되고, 주로 iOS 개발에만 사용하고 있지만 2021년 1월 기준으로 Swiftsms Objective-C를 제치고 iOS의 미래는 Swift라는 걸 보여주고 있습니다.

경쟁사인 구글에서는 Java API 저작권을 오라클과의 분쟁 후 패소한 뒤로 다트와 플러터를 밀며 구글의 차세대 OS인 퓨시아에서도 Swift 코드가 일부 구동될 수 있도록 준비 중입니다.

또한, 성능적인 면에서 Swift는 Java와 C#의 장점을 가지고 있으면서도 LLVM 기반의 C/C++/Objective-C처럼 기계어로 번역된다는 점에서 성능상 우위에 있습니다.

## 마치며..
구글의 차세대 OS인 퓨시아 기반의 다트와 플러터, 그리고 애플의 iOS, macOS, iPadOS, watchOS 생태계에서의 Swift가 기대됩니다.

다트와 스위프트 언어를 사용하는 개발자라면 소프트웨어 개발자로서 살아남기 좋을 것 같습니다. 
