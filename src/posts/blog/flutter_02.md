---
title: "Flutter 버전 3.0"
category: "Flutter"
date: "2022-05-14 00:55:00 +09:00"
desc: "업그레이드 변경사항"
thumbnail: "./images/flutter/flutter_logo.jpg"
alt: "flutter"
---


![image](https://user-images.githubusercontent.com/85836879/170488319-313c77bb-9b29-4d9e-90c5-afba56a08865.png)

이번 포스팅에서 알아볼 내용은 Flutter 3.0 버전의 변경 사항입니다.
#
5월 13일 Google I/O를 통해 Flutter 3.0 버전이 릴리즈 되었습니다.

( Dart도 버전업이 되었습니다. )
#
### Flutter 3.0 버전 변경 사항

---

### 1\. Apple Silicon의 Fully Native 지원

기존 Flutter에서는 Rosetta등을 통해 간접적으로 Fully 지원하였습니다.
#
Flutter 3.0버전에서 부터는 빌드 할 때 ARM칩을 지원하는 빌드를 별도로 추가 지원하며 Flutter 프레임워크가 애플 실리콘에서 작동되기 때문에 속도도 이전 버전보다 빨라지게 되었습니다.
#
### 2\. Yaru

Ubuntu를 만드는 회사 Canonial에서 Yaru Design Language를 Pub.dev를 통하여 지원합니다.
#
또한 블루투스 등의 Linux에 필요한 플러그인을 지원합니다.

( Android : Material Design, iOS : Cupertino Design ) 
#
#
### 3\. Image Processing 성능 향상

기존에 있던 Image Encoding, Decoding의 성능이 향상되어 기존보다 더 자연스러운 이미지 파일을 렌더링 할 수 있게되었습니다.
#
### 4\. Material Design Language 3

파스텔 톤과 같은 디자인으로 구성된 새로운 버전의 Material Design을 지원합니다.
[Meterial3 디자인 구경하기](https://m3.material.io/)
#
### 5\. Firebase

기존의 FireBase는 Andriod, iOS, Web, Desktop을 따로 설정해 Flutter를 개발해야 했습니다.
#
이번 Flutter 3.0버전에서는 Firebase에서 공식적으로 Flutter를 지원합니다.
#
[FlutterFire 방문하기](https://firebase.google.com/docs/flutter/setup?hl=ko&platform=ios)

복잡했던 기존의 Firebase 설정을 이번에 추가된 Firebase CLI 명령어를 통해 쉽게 설정할 수 있게 되었습니다.

```bash
$firebase login

$dart pub global activate flutterfire_cli

$flutterfire configure

#또는 firebase console

$flutterfire configure --project=projectName-code
```

( 각 OS 또는 Node.js를 통해 설치할 수 있습니다. )
#
또한 Firebase 에러 디버깅을 Flutter 3.0 버전에서 정의된 에러로 빠르게 디버깅 할 수 있게 되었습니다.
#
### 6\. Game Tools

Flutter 3.0 버전에서 Game 개발에 도움되는 도구들이 추가되었습니다.
#
[Flutter Game Tools 방문하기](https://flutter.dev/games)
#
### Dart 변경점

---

### Enum
#
Enumerate이 업그레이드 되었습니다.
#
기존에 Enum은 너무 단순한 바람에 잘 사용되지 않았었는데 
#
이번 버전업을 통해 기능이 추가되었고 형태는 class와 비슷하게 바뀌어 조금 더 Dynamic한 Dart Enum을 만들 수 있게 되었습니다.
#
argument 순서에 자유도가 생겼습니다.

```java
final factoriable = List<int>.generate(
    10,
    (int i){
        if (i == 0){
            return 1;
        } else {
            var result = 1;
            for(var r = 2; r <= i; r++){
                result *= r;
            }
            return result;
        }
    },
    growable : true,
);
```

growable과 같은 namedParameter의 순서가 강제되었던 것들이 바뀌었습니다.

```java
final factoriable = List<int>.generate(
    10,
    growable : true,
    (int i){
        if (i == 0){
            return 1;
        } else {
            var result = 1;
            for(var r = 2; r <= i; r++){
                result *= r;
            }
            return result;
        }
    },
);
```

따라서 코드 가독성이 향상되었습니다.
#
Flutter의 기존의 장점인 6개의 플랫폼에 이번 3.0 버전 릴리즈를 통해 더 빠른 속도로 다양한 기능들을 구현할 수 있게 되었습니다.
#
다른 변경사항들은 Flutter 공식 홈페이지를 통해 볼 수 있습니다.
[Flutter 3.0 릴리즈 공식 문서 방문하기](https://docs.flutter.dev/development/tools/sdk/release-notes/release-notes-3.0.0)