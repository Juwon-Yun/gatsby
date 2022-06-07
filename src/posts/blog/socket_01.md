---
title: "Socket.io"
category: "Etc"
date: "2022-02-10 09:08:00 +09:00"
desc: "Socket.io에 대해"
thumbnail: "./images/socket/socket_logo.jpg"
alt: "socket"
---

실시간 채팅과 실시간 화상 통화 그리고 음성 통화로 유명한 Socket.io에 대해 알아보겠습니다.

---

### Socket.io

Socket.io는 실시간 Web을 위한 JavaScript 라이브러리입니다. ( Node.js에서도 실행할 수 있습니다. )

JavaScript뿐만 아닌 자바, C++, Swift, Dart, Python등의 다양한 언어로 구현된 클라이언트도 존재합니다. 

웹 클라이언트와 서버간의 실시간 양방향 통신이 가능합니다.

Socket.io는 실시간 분석, 바이너리 스트리밍, 인스턴스 메시지와 문서 협업을 구현하는 기능을 제공합니다.

또한 Socket.io는 WebSocket의 구현체가 아닙니다.

즉, Socket.io은 WebSocket을 기본 라이브러리로 사용하는 것 뿐이지 의존하지 않습니다.

( 따라서 WebSocket 기반 웹 클라이언트가 Socket.Io 서버에 연결할 수 없고 Socket.io 기반 웹 클라이언트도 일반 WebSocket 서버에 연결할 수 없습니다. )

Socket.io의 주요 기능으로는 

안정성 ( WebSocket 연결을 설정할 수 없는경우 즉, 인터넷이 안되는 경우에 HTTP Long Polling으로 대체함 )

자동 재접속 ( 접속이 끊켰을 때 자동으로 재접속을 시도합니다. ) 

패킷 버퍼링

서버와 연결된 모든 웹 클라이언트 또는 해당 클라이언트의 하위 집합에 **\*BroadCasting**합니다.

Multiplexing ( Namespaces, 하나의 공유된  Connection으로 통신하는 채널을 지원합니다.)

---

![socker02](https://user-images.githubusercontent.com/85836879/172347457-a0e9b621-f647-4bc4-a865-0c1348b77b15.png)

### BroadCasting

송신 호스트가 전송한 데이터가 네트워크에 연결된 모든 호스트에 전송되는 방식을 의미합니다.

이렇게 다양한 기능을 탑재한 강력한 JavaScript 라이브러리입니다.

그렇다면 어떤 방식들로 기능이 구현될까요?

> Polling

> Long Polling

> Streaming 

총 3가지 방식들로 구현됩니다.

### Polling

![socket03](https://user-images.githubusercontent.com/85836879/172347452-ec27a4fd-51c0-45ca-a4a3-8c3ddf88af55.png)

웹 클라이언트에서 일정 주기마다 서버에 요청을 보내고 서버는 현재 상태를 바로 응답하는 방식입니다.

이 방식은 서버에서 변화가 없더라도 매 주기마다 요청에 대한 응답을 보내기 때문에 불필요한 트래픽이 발생하게 됩니다.

그래서 실시간으로 반영되는 서비스에는 좋지않은 방식입니다. 

### Long Polling

![socker04](https://user-images.githubusercontent.com/85836879/172347446-602a7b72-b5b8-4046-8abd-7a994e3b8a01.png)

Long Polling은 Polling과 비슷한 구조를 가졌지만 즉시성을 갖습니다.

웹 클라이언트에서 요청( Request )를 보내고 바로 Request를 닫는 것이 아닌, 일정 시간 동안( 오랫동안 ) 열어 놓고

서버에서 클라이언트가 보내는 메세지가 있으면 HTTP Response로 실어 보낸 후 해당 연결( Conncection )을 끊습니다.

( 즉, 클라이언트가 응답을 받았을 때 다시 다음 응답을 기다리는 요청을 보냅니다 ) 

일정 시간 동안 Conntection을 열어 놓기 때문에 실시간 반응이 가능하고 Polling 방식에 비해 불필요한 트래픽을 유발하지 않지만 요청, 응답 이벤트가 잦다면 순간적으로 과부하가 걸릴 수 있습니다.

### Streaming

![socket05](https://user-images.githubusercontent.com/85836879/172347438-df5076b6-02a0-4385-ae3b-d3836f83bd16.png)

이벤트가 발생했을 때 응답을 내려주는데 응답을 완료 시키지 않고 계속 연결을 유지하는 방식입니다.

Long Polling이 요청, 응답 이벤트를 받을 때 마다 연결을 끊고 재연결을 한다면 Streaming 방식은 한번 연결되면 해당 연결을 계속해서 요청, 응답 이벤트를 처리하기 때문에 재연결에 대한 순간적인 과부하가 없습니다.

따라서 Long Polling에 비해 효율적이지만, 연결 시간이 길어질수록 연결의 유효성 관리의 부담이 발생합니다.

### WebSocket

위의 내용 중 3가지 방식과 같은 로직을 Ajax JavaScript로 구현하다보니 여러 브라우저마다 서로 다른 로직을 가져서 나오게된게 WebSocket 표준 라이브러리 입니다. 

WebSocket이 나오기 이전의 브라우저들은 지원하지 않게 되었습니다.

![socket06](https://user-images.githubusercontent.com/85836879/172347434-205250d9-791c-42e0-8abe-e84b57b8289f.png)

### WebSocket의 특징

Http Request를 사용하기 때문에 추가적인 방화벽, 보안 설정 없이 양방향 통신이 가능하고 CORS와 인증등의 과정을 기존과 동일하게 적용합니다.

양방향 통신 프로토콜로서 클라이언트와 서버는 TCP 방식의 통신을 합니다.

### WebSocket의 작동 원리

![socket07](https://user-images.githubusercontent.com/85836879/172347426-4a25b62a-5c53-4974-a013-891361ca30dc.png)

#### HandShake 요청

Http로 요청을하며 WebSocket 프로토콜로( Upgrade ) 응답 해줄 것을 요청합니다.

요청 헤더에는 소켓 버전과 소켓 보안키( magic key ) 정보 들을 포함합니다.

#### HandShanke 응답

http에서 WebSocket 프로토콜을 사용할 준비가 되면 Http status 101로 응답합니다.

연결이 정상적으로 이루어지면 서버와 클라이언트간에 WebSocket연결이 이루어지며 일정 시간이 지나면 Http 연결은 자동으로 끊어지게 됩니다.