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


