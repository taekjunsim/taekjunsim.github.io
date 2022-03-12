---
title: "Web Socket"
date: "2021-12-20"
categories: ["develop"]
---

<p class="content-subtitle">Web Socket은</p>

**ws프로토콜을 기반으로 양방향 통신을 가능하게 하는 API이다.**

- 클라이언트는 **서버가 보내는 데이터**를 받아들일 수 있고, **사용자가 페이지를 이동하지 않아도 최신 데이터가 적용된 웹을 볼 수 있다.** 채팅이나 게임, 실시간 주식차트 외에도 가상화폐의 분산화 기술의 핵심도 WebSocket으로 구현할 수 있다.

##### Web Socket으로 양방향 통신이 이루어지는 과정

1. 웹 소켓을 연결하기 위해 HTTP 기반의 핸드셰이크가 이루어진다. (한 번의 요청과 응답)
2. 교환이 성공하면 기존의 TCP 연결은 유지된 채 HTTP에서 ws프로토콜로 전환된다. 그러므로 연결 된 이후에도 연결을 할 때 사용했던 80포트와 443포트를 이용할 수 있다.
3. 웹 소켓 연결이 닫힐 때까지 데이터를 주고 받을 수 있다.
4. 클라이언트와 서버는 메세지라는 개념으로 데이터를 주고 받는다.

##### 주의사항

** 클라이언트에 의해 요청을 받는 방식이 아니다.<br>
** 서버가 메세지(데이터)를 클라이언트에게 보내는 표준화된 방식을 제공한다.

##### 기본 설정

- ws 모듈 설치<br>
  - `npm i ws`
- node에서 타입스크립트 적용하기<br>

  - `npm i @types/node`
  - `npm i typescript`<br>
  - `npm i ts-node-dev ts-node`<br>
  - `npm i @types/express @types/node`<br>

##### node로 서버 설정하기

- **server.ts**

```
// 1) ws 모듈 가져오기
const wsModule = require("ws");

export default function ServerFn(port) {
  // 2) WebSocket 서버의 Instance 생성
  const ws = new wsModule.Server({
    // server: HTTPServer 입력
    port: port
  });

  console.log("WebSocket Initialized", port);

  // 3) 클라이언트에 연결됐을 때 호출
  ws.on("connection", (ws, request) => {
    // 4) 클라이언트로부터 메시지를 수신했을 때 호출
    ws.on("message", (message) => {
      console.log("received: %s", message);
      // 클라이언트에게 보낼 메세지
      ws.send("Good, Nice to meet you, I am server");
    });
  });

  // 5) 연결이 종료됐을 때 호출
  ws.on("close", (error) => {
    console.log("webserver close", error);
  });

  // 6) 에러가 발생했을 때 호출
  ws.on("error", (error) => {
    console.log(error);
  });
}
```

- Server파일에 대한 부연 설명
  - ServerFn 함수를 생성할 때 port번호를 매개변수로 입력하여 index.ts에서 함수를 호출할 때 포트번호를 인자로 입력할 수 있도록 설정
  - connenction의 매개변수 request를 통해 연결된 클라이언트의 IP를 확인할 수 있다.
  - send 메서드는 client와 server 모두 사용 가능하다.

\*\* server에서 찍는 console.log는 서버의 console에서 확인 가능하다.

- **index.ts**

```
import ServerFn from "./jsserver";

// 포트 번호
ServerFn(1234);
```

##### React로 클라이언트 설정하기

- **client.ts**

```
import React, {useRef} from "react";
import "./App.css";

function Client() {
  // 1) 웹소켓 클라이언트 객체 생성
  let ws = new WebSocket("ws://localhost:1234/ws");

  // 2-1) 서버와 연결됐을 때 호출
  ws.onopen = () => {
    console.log("connected!!");
  };

  let count = useRef(1);

  const sendMessage = () => {
    // 2-2) 서버에 메세지 보내기
    if(ws.readyState === ws.OPEN){
      ws.send(`증가하는 숫자를 보냅니다 => ${count.current}`);
      count.current++;
    } else {
      alert("연결된 웹소켓 서버가 없습니다.");
    }

    // 2-3) 서버에서 보낸 메세지를 수신했을 때 호출
    ws.onmessage = (evt) => {
      console.log(evt.data);
    };
  };

  // 2-4) 연결이 종료됐을 때 호출
  const disconnect = () => {
    if(ws.readyState === ws.OPEN) {
      ws.close();
      console.log('disconnected');
    } else {
      alert("연결된 웹소켓 서버가 없습니다.");
    }
  }

  // 2-5) 에러가 발생했을 때 호출
  ws.onerror = (error) => {
    console.log(error);
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <button onClick={connect}>연결 하기</button> */}
        <button onClick={sendMessage}>메세지 보내기</button>
        <button onClick={disconnect}>연결 끊기</button>
      </header>
    </div>
  );

}

export default Client;
```

##### 내용 정리

- 프로토콜이란 무엇인가?

  - 엔드포인트 간에 통신이 이루어지려면 각 `엔드포인트는 일련의 규칙`을 따라야 한다. 이러한 규칙을 프로토콜이라고 한다.<br>

- HTTP 통신과 Socket통신에는 어떤 차이가 있는가?

  - 통신에는 Socket이 필요하기 때문에, `HTTP 통신 또한 Socket 통신이다.`

- 그렇다면 Socket은 무엇인가?
  - 아이피 주소와 포트 번호의 조합으로 이루어져 있으며, `엔드포인트를 의미`한다. 네트워크 환경에 연결할 수 있게 만들어진 연결부라고도 한다.

```
예를 들어,
http://www.naver.com:80으로 접근하면
DNS에 의해 202.43.54.222 IP가 반환되고,
HTTP 프로토콜을 이용하여 반환된 203.43.54.222 IP의 80포트에
매핑된 웹 서비스에 접근을 시도한다.
이 때 http://202.43.54.222:80가 Socket이다.
```

- TCP와 HTTP, Web Socket은 어떤 관계인가?

  - 한 줄 요약: TCP를 기반으로 만들어진 HTTP에서, Web Socket API를 이용하면 ws프로토콜로 전환되어 양방향 통신이 이루어진다.
  - HTTP 자체만으로는 소켓을 이용해서 데이터를 전달할 수 없기 때문에 TCP 상에서 동작하는 소켓을 주로 사용하는데, 이를 "TCP 소켓" 또는 "TCP/IP 소켓"이라고 부른다. (UDP에서 동작하는 소켓은 "UDP 소켓"이라고 한다.)

- net.socket이란?
  - HTTP를 거치지 않고 TCP에서 net 모듈로 통신을 가능하게 하는 방법을 말한다.
  - TCP 서버가 바닐라 자바스크립트라면, HTTP는 React나 Vue 같은 프레임워크 또는 라이브러리라고 할 수 있다.
  - 경우에 따라 바닐라 자바스크립트로 코드를 짜야할 때가 있듯이, 트래픽에 극도로 민감하고, 패킷 등 보안에 신경을 써야 할 때 TCP 단계에서부터 서버를 만들어 사용하기도 한다.
  - 이 때 TCP 단계에서 직접 net 모듈로 클라이언트와 서버를 연결시키고, 단방향 또는 양방향 통신을 임의로 결정하여 데이터를 전송할 수 있다.

** TCP 서버라고해서 4계층에서 바로 연결이 되는 것은 아니고 연결 자체는 7계층에서 이루어진다.<br>
** TCP 소켓을 사용하여 직접 HTTP 서버를 구축하기 위해서는 HTTP 사양(RFC2616)에 따라 메세지를 인코딩하고 디코딩하는 과정을 거쳐야 한다.

끝!

**참고**

- [TROLL](https://choseongho93.tistory.com/266)
- [Flying Whale](https://kellis.tistory.com/65)
- [카레유](https://curryyou.tistory.com/348)
- [OSC131](https://osc131.tistory.com/7)
- [뽀따](https://recipes4dev.tistory.com/153)
- [stackoverflow](https://stackoverflow.com/questions/15108139/difference-between-socket-programming-and-http-programming/47637847#47637847)
