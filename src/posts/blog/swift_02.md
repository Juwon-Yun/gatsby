---
title: "SwiftUI"
category: "Swift"
date: "2022-08-15 14:32:00 +09:00"
desc: "UIKit과 SwiftUI"
thumbnail: "./images/swift/swiftUI_logo.jpg"
alt: "UIKit SwiftUI"
---

![image](https://user-images.githubusercontent.com/85836879/184581755-b14e6811-2726-435a-b69d-dc6faea13483.png)


## SwiftUI 개요
SwiftUI는 Swift의 성능을 바탕으로 모둔 Apple 플랫폼에서 사용자 인터페이스를 구축할 수 있는 혁신적이고 간소화된 방법입니다.

단 하나의 도구 구성과 API를 통해 모든 Apple 기기에서 사용할 수 있는 사용자 인터페이스를 구축합니다.

읽기 쉽고 작성하기 편한 선언적 Swift 구문을 통해 SwiftUI는 새로운 Xcode 디자인 도구와 매끄럽게 연동되면서 코드와 디자인이 완벽하게 동기화되도록 합니다.

또한, 유동적 글자 크기 조절, 다크 모드, 현지화 및 손쉬운 사용을 자동 지원하므로 SwiftUI 코딩 첫 줄부터 가장 강력한 UI 코드를 작성할 수 있습니다.

<br>
<a href="https://developer.apple.com/kr/xcode/swiftui/" target="_blank">Xcode SwiftUI 방문하기</a>

## SwiftUI의 장점 1 - 선언적 구문
SwiftUI는 선언적 구문을 사용하므로 사용자 인터페이스의 기능을 명시하기만 하면 됩니다.

이를테면, 텍스트 필드로 구성된 항목의 목록을 작성한 다음 각 필드의 정렬, 서체 및 색상을 설명하면 됩니다.

코드가 어느 때보다 간단하고 가독성이 향상되어 시간이 절약되고 유지 관리가 용이합니다.

```swift
import SwiftUI

struct AlbumDetail:View{
    var album: Album

    var body: some View {
        List(album.songs) { song in
            HStack {
                Image(album.cover)
                VStack(alignment: .leading){
                    Text(song.title)
                    Text(song.artist.name)
                        .foregroundStyle(.secondary)
                }
            }
        }
    }
}

```

이러한 선언적 스타일은 애니메이션과 같은 복잡한 개념에도 적용됩니다. 코드 몇 줄 만으로 거의 모든 컨트롤에 애니메이션을 손쉽게 추가하고 바로 사용할 수 있는 효과 모음을 선택할 수도 있습니다.

런타임 중에 시스템에서는 부드러운 움직임을 만들기 위해 필요한 모든 단계는 물론 사용자의 상호 작용 및 애니메이션 도중의 상태 변경까지도 처리합니다.

따라서 개발자는 이와같이 간단한 애니메이션을 사용하여 앱에 생동감을 불어넣어 줄 새로운 방법을 찾을 수 있습니다.

## SwiftUI의 장점 2 - 디자인 도구
Xcode에는 SwiftUI를 사용하여 드래그 앤 드롭만큼 간단하게 인터페이스를 빌드할 수 있는 직관적인 디자인 도구가 포함되어 있습니다.

디자인 캔버스에서 작업하면 편집하는 모든 내용이 옆에 표시되는 편집기의 코드와 완벽하게 동기화됩니다.

코드를 입력하는 동시에 미리보기로 바로 볼 수 있고 라이트 모드 및 다크 모드와 같이 다양한 구성에서 UI를 확인할 수도 있습니다.

Xcode는 변경 사항을 즉시 재컴파일하고 실행 중인 앱 버전에 삽입하므로 상시 확인 및 편집이 가능합니다.


## SwiftUI의 단점
iOS 13버전과 Xcode 11 이후의 버전만 지원하며 기존 UIKit의 전부를 대체하지는 못합니다.

또한, 낮은 버전에 대해 지원하지 않기 때문에 Deployment Target이 한정되어 있습니다.

버그가 많으며 다른 라이브러리들이 SwiftUI를 지원하지 않을 수 있습니다.

## SwiftUI와 UIkit
UIKit는 이벤트 중심의 프레임워크이며 SwiftUI는 상태 중심의 프레임워크입니다.

SwiftUI는 UIkit의 대체제가 아니며, SwiftUI의 많은 기능들이 UIkit 위에서 작동합니다.

UIkit 위에서 작동하기 때문에 코드가 내부적으로 UIkit에 있는 컴포넌트의 코드로 변환해 컴파일 한다는 것 입니다.

Swift UI는 iOS 13 이상 기기부터 지원하기 때문에 대부분의 앱은 SwiftUI를 사용하고 있지 않습니다.

하지만, 새로운 프로젝트에 기존의 UIKit과 AppKit만을 사용한다면 다음에 누군가가 지불할 기술 부채가 될 수 있습니다.

## UIKit
UIKit 프레임워크는 iOS, tvOS 앱에 필요한 인프라를 제공합니다. 

인터페이스를 구현하기 위한 창 및 보기 아키텍처, Multi-Touch 및 기타 유형의 입력을 앱에 제공하기 위한 이벤트 처리 인프라, 사용자, 시스템 및 앱 간의 상호 작용을 관리하는 데 필요한 기본 실행 루프를 제공합니다. 

프레임워크에서 제공하는 다른 기능으로는 애니메이션, 문서, 그리기 및 인쇄, 텍스트 관리 및 표시, 검색, 접근성, 앱 확장 및 리소스 관리가 있습니다.

UIKit은 시스템과 앱의 상호 작용을 관리하고 앱의 데이터 및 리소스를 관리할 수 있는 클래스를 제공합니다.

```swift
import UIkit

class ViewController : UIViewController {

    override func viewDidLoad(){
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
}
```

Xcode 기반으로 앱을 빌드하며, UI의 요소가 모두 Object로 기능합니다.

대부분의 상업용 앱들은 UIkit에 의존하며 이에 맞게 제공하는 기능이 다양하고 커스텀이 가능하기 때문에 많은 사용자 경험을 제공할 수 있게 됩니다.

AppDelegate는 앱의 전반적인 생명주기를 다루고 있습니다.

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions : [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.

    return true
}
```

<br>
<a href="https://developer.apple.com/tutorials/app-dev-training#uikit-essentials" target="_blank">  iOS App Dev 방문하기</a>

### SwiftUI에서 UIKit 사용하기
구조체 문법의 SwiftUI와 클래스 문법의 UIKit는 함께 사용될 수 있습니다.

SwiftUI에서 UIKit를 사용하려면 먼저 SwiftUI의 UIViewRepresentable 타입의 구조체를 작성해야합니다.

UIViewRepresentable 타입은 makeUIView, updateUIView 함수가 필수로 작성되어야 합니다.

```swift
struct UIKitToSwiftUI: UIViewRepresentable {
  func makeUIView(context: Context) -> UIViewType {
    let label = UILabel()
    label.textColor = .blue
    return label
  }

  func updateUIView(_ uiView: UILabel, context: Context) {
  }
}
```

또한 하나의 UIKit View가 아닌 Controller 일 때 UIViewControllerRepresentable 타입을 사용합니다.

```swift
struct UIKitControllerToSwiftUI: UIViewControllerRepresentable { 
	func makeUIViewController(context: Context) -> ViewController {
		
    }

	func updateUIViewController(_ uiViewController: ViewController, context: Context) { 
    
    } 
}
```

