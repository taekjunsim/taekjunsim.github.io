---
title: "Proxy서버"
date: "2021-10-22"
categories: ["develop"]
---

CORS를 해결하는 과정에서 Proxy서버를 이용하는 방법에 대해 알게 되었다.

브라우저가 동일 출처 정책(Same-Origin Policy, SOP)를 지켜서 다른 출처의 리소스 접근을 금지하기 때문에,
CORS에러는 클라이언트(브라우저)가 데이터 서버에 직접 데이터를 요청할 때 발생한다.

만약, 트위터 API를 사용하는 경우를 가정해보자. 아래와 같이 URI를 작성하면 <br>
`클라이언트에서 서버의 주소(https://api.twitter.com)에 데이터를 직접 요청`하게 된다. 즉, CORS 에러가 발생할 여지가 있다.

```
const res = await axios
  .get(`https://api.twitter.com/2/tweets/search/recent?query=${검색어}`, {
  headers: { Authorization: `Bearer ${TWIT_API.BEARER_TOKEN}` },
});
```

트위터를 제외한 다른 오픈API를 사용하는 경우도 마찬가지이다. 클라이언트에서 데이터 서버에 직접 요청하는 경우에는
예외없이 CORS에러가 발생할 여지가 있다.

<img src="./cors.png"><br>
이런 CORS오류는 생각보다 쉽게 해결할 수 있다. <br>
`서버를 거쳐서 데이터를 요청`하면 된다.

Apache나 Nignx로 웹서버를 구축하는 방법도 있겠지만, <br>오늘은 좀 더 쉬운 방법인
Proxy를 활용하는 방법에 대해 알아보자.

Proxy를 한 마디로 요약하면 중계자라고 말할 수 있다.<br>
아래의 그림처럼 Proxy를 이용하면 브라우저는 프론트엔드 서버와 통신한다.<br>

<img src="./proxy-draw.png"><br>
요청하는 데이터가 프론트엔드 서버에 없는 경우에는,
프론트엔드 서버가 지정해둔 주소(proxy 설정)와 통신을 해서 데이터를 받아오고,
이렇게 받아온 데이터를 브라우저에 건네준다.

서버 간 통신에서는 origin을 확인하지 않는 데다가, 프론트엔드 서버와 브라우저는 같은
origin을 공유하므로 CORS에러를 해결할 수 있다.

예를 들어, proxy를 사용하여 twitter API에서 데이터를 받아온다면

1. package.json파일에 proxy 주소를 지정한다.

- proxy 주소에는 데이터를 받아올 URI 중 origin영역을 입력한다.

```
package.json 파일

{
  {
    "development": [
      ...
    ]
  },
  "proxy": "https://api.twitter.com",
}

```

2. axios(혹은 fetch)의 URI에는 proxy 주소를 제외한 나머지 부분을 입력한다.

```
const res = await axios
  .get(`/2/tweets/search/recent?query=${inputValue}`, {
  headers: { Authorization: `Bearer ${TWIT_API.BEARER_TOKEN}` },
});
```

#### 추가

- proxy가 정상적으로 작동하지 않는다면 cache가 원인일 가능성이 높다. (21.12.14.)
  <br>
  <br>
  **해결방법**

1. 아래의 코드를 입력하여 package-lock.json과 node_modules를 삭제한다. <br>
   `rm -r package-lock.json node_modules`
2. `npm install`을 입력한다.
3. `npm start`로 확인한다.

끝!

**참고**

- [생활코딩](https://www.youtube.com/watch?v=VaAWIAxvj0A&ab_channel=%EC%83%9D%ED%99%9C%EC%BD%94%EB%94%A9)
