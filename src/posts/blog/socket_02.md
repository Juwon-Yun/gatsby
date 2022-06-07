---
title: "STOMP"
category: "Etc"
date: "2022-02-10 15:39:00 +09:00"
desc: "STOMP는 무엇일까"
thumbnail: "./images/socket/stomp_logo.jpg"
alt: "socket"
---


![stomp](https://user-images.githubusercontent.com/85836879/172349220-6574434a-9427-49c3-b2c9-667a2d85905d.png)

### STOMP

STOMP는 ( Simple / Stream Text Oriented Messaging Protocol )의 약자입니다. 

말 그대로 간단한 문자열 기반의 메세지 프로토콜 입니다.

프로토콜이란 메세지를 서로 주고 받을때 정의된 규칙 체계를 의미하며 

STOMP는 즉 텍스트 송신, 수신을 위한 미리 정의된 어떠한 규칙입니다.

STOMP가 정의한 규칙을 통해 다양한 언어, 플랫폼 간에 메세지를 주고 받을 수 있습니다.

물론 AMQP와 MQTT와 같은 메세지 전송 프로토콜이 존재하지만 STOMP는 Binary 기반이 아닌 텍스트 기반의 프로토콜이라는 점이 특징입니다. ( 개발자가 읽기 쉽고 사용하기 좋습니다. )

이러한 특징들이 마치 HTTP와 유사한 부분이 있고, 그렇기에 다양한 언어, 호스트, 런타임 환경에서의 기능 구현을 위한 시간이 많이 단축되는 장점이 있습니다.

TCP 기반의 보조 프로토콜인 STOMP Frame은 클라이언트와 서버간에 메세지에 대한 상호 요청과 응답을 주고 받습니다.

STOMP Frame의 구성은 아래 예시와 같은 형식입니다.

> COMAND  
> header1 : value1  
> header2 : value2  
> header3 : value3  
>   
> Body^@

맨 첫줄은 명령어( Command )이며 이후에 Key : value와 같은 형태의 header 정보를 포함합니다.

이러한 미리 정해놓은 규칙들을 준수하면 다양한 언어와 플랫폼에서 사용할 수 있습니다.

STOMP가 정의한 맨 첫줄에 올 수 있는 명령어들과 해당 명령어의 표준 Header들입니다.

-   CONNECT or STOMP  
    -   REQUIRED : accept-version, host
    -   OPTIONAL : login, passcode, heart-beat
-   SEND 
    -   REQUIRED : destination
    -   OPTIONAL : transaction
-   SUBSCRIBE
    -   REQUIRED : destination, id
    -   OPTIONAL : ack
-   UNSUBSCRIBE
    -   REQUIRED : id
    -   OPTIONAL : none
-   BEGIN or COMMIT or ABORT
    -   REQUIRED : transaction
    -   OPTIONAL : none
-   DISCONNECT
    -   REQUIRED : none
    -   OPTIONAL : receipt

등의 규칙이 있습니다.

--- 

STOMP로 구현된 구현체들입니다.

### Client

| 구현체 | 언어 |
| --- | --- |
| Apache CMS | C++ |
| Gozirra | Java |
| stomp.py | Python |
| stomp-php | PHP |
| stompngo | Go |
| stomp.js | JavaScript |
| activemessaging | Ruby |
| libstomp | C |

### Server

| 구현체 | 언어 |
| --- | --- |
| Gozirra | Java |
| StompServer | Ruby |
| Stampy | Java |
| Sprinkle | Python |
| CoilMQ | Python |

링크를 통해 STOMP의 자세한 정보를 얻을 수 있습니다.

[STOMP 공식문서](https://stomp.github.io/stomp-specification-1.2.html#STOMP_Frames)