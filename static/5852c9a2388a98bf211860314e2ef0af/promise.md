---
title: "Promise"
date: "2021-11-09"
categories: ["develop"]
---

<p class="content-subtitle">Promise 객체는</p>

**비동기 처리에 대한 결과값을, 동기적으로 처리하기 위해 사용되는 객체다.**

서버에서 데이터를 받아온다고 가정해보자.<br>
ajax, fetch, axios는 모두 **비동기를 기반으로 서버와 통신**한다.<br>
다시 말해서, **모든 동기 처리가 완료된 후에 비로소 결과값을 반환**한다.

아래의 코드를 살펴보자.

```
let test = fetch('url', {
  method: `POST`
  body: JSON.stringify(data),
})

console.log(test); // undefined
```

콘솔창을 확인해보면 undefined가 반환되는 것을 알 수 있다. <br>
fetch는 비동기적으로 통신하고, console.log(test)는 동기적으로 처리하기 때문에
**fetch로 데이터를 받아오기 이전에 console.log(test)가 실행**된다.<br>
즉, **console.log(test)를 먼저 처리**하고 모든 동기 처리가 완료된 이후에, fetch가 결과값을 반환하면 비로소 test에 결과값이 할당된다.
그렇기 때문에 undefined가 반환된다.

그러면 Promise와 then을 활용하면 어떻게 달라지는지 확인해보자. <br>

- fetch는 Promise 객체를 반환한다.

```
let test = fetch('url', {
  method: `POST`
  body: JSON.stringify(data),
})


test.then(res => res.json())
.then(response => console.log(response))
.catch(error => console.log(error));
```

데이터를 정상적으로 받아올 경우에는 콘솔창에서 받아온 값을 확인할 수 있을 것이고,
데이터를 받아오지 못한 경우에는 error 내용이 반환되는 것을 확인할 수 있다. <br>
fetch가 비동기적으로 통신을 하지만, 서버에서 **데이터를 받아오고 나서야 비로소 then 메소드가 실행**되기 때문에 가능한 일이다.

즉, Promise는 동기 처리를 비동기적으로 처리할 수 있게 변환해주는 것이 아니라
**비동기 처리에 대한 반환값을 동기적으로 처리**할 수 있게 해주는 객체다. <br>
로직의 연산이 성공적으로 완료되면 then 메소드를 실행하고, 연산이 실패하면 then (reject) 메소드 또는 catch 메소드를 실행시킨다.

끝!

**참고**

- [CAPTAIN PANGYO](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)
