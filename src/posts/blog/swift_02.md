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
