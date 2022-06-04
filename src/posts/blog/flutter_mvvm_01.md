---
title: "Flutter 개발을 위한 MVVM 아키텍처"
category: "Flutter"
date: "2022-06-04 13:32:00 +09:00"
desc: "MVVM 패턴이란"
thumbnail: "./images/flutter/flutter_thumbnail.jpg"
alt: "flutter"
---

![flutter_logo](https://user-images.githubusercontent.com/85836879/171982891-d73af907-3370-4127-a4a2-f16656a55dc9.png)

---

모바일 앱 개발을 하게되면 필요한 구조와 패턴이 있습니다.

Andriod, iOS, Flutter 모두 최종 기능은 같습니다.

앱을 개발한다면 앱의 확장성과 유지보수의 편의성을 고려해 적용하는 아키텍처는 다양하지만 많이 쓰이는 아키텍처 MVVM을 소개하려합니다.

Flutter 특성에 맞는 MVVM 디자인 패턴을 적용하여 사용하는 것이 목적입니다.
#

![flutter_data_layer](https://user-images.githubusercontent.com/85836879/171983717-d2c5769a-21fa-4c89-9672-0a0992c0904b.png)

## Flutter MVVM (Model View ViewModel)
3가지 레이어로 구성된 패턴입니다.
#
각 레이어별 역활을 파악하고 Data와 Action의 흐름을 일관되게 구현한다면 확장성있고 이해하기 쉬워지며 유지보수의 편의성이 좋은 앱을 만들 수 있게 됩니다.

### View Layer
UI/UX요소로 구성된 다양한 위젯으로 화면을 구성하는 레이어입니다.
(시각적인 요소 레이어)
#
Flutter에서는 Widget이라는 선언형 UI를 사용합니다.
#
MVVM패턴을 적용해 ViewModel에서 상태를 관리하는 경우 Stateless Widget으로 View를 만드는 것이 바람직합니다.
#
### ViewModel Layer
View Layer에 필요한 데이터(model)을 유지하고 View와 연관된 비즈니스 로직을 처리합니다.

(View 레이어의 데이터를 위한 레이어)
#
비스니스 로직 처리 중 필요한 데이터는 Data Layer를 통해 받아오거나 저장하는 레이어입니다.
#
Flutter에서 주로 사용하는 GetX, Provider와 같은 상태관리 라이브러리가 ViewModel 레이어에 사용되는 기술들입니다.
#
![dataLayer](https://user-images.githubusercontent.com/85836879/171984047-a10133d3-5d8a-43ce-95aa-9e1bb14339ff.png)
### Data Layer
앱 전체에 필요한 데이터를 제공하는 레이어이므로 Repository 패턴으로 구성되어 있습니다.
#
ViewModel이 요청한 필요한 정보를 제공하며 외부(Remote Data) 혹은 내부(Local Data) 스토리지 데이터를 가져오거나 갱신합니다.
#
Local Data의 경우 주로 Hive 또는 Sqlite와 같은 휴대폰에 저장된 데이터를 말합니다.
#
Remote Data는 http모듈을 이용한 API서버 통신을 의미합니다.
#
#### Repository
데이터 저장소라는 의미로 ViewModel에서 Data레이어에 접근하는 객체입니다.
#
보통은 특정 도메인 별로 Repository를 만들어 사용합니다.
(UserRepository, PostRepository)
#
하나의 ViewModel은 여러 Repository를 참조할 수 있습니다.
#
