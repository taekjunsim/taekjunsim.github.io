---
title: "Hoisting"
date: "2021-11-03"
categories: ["develop"]
---

<p class="content-subtitle">Hoisting은</p>

**변수 또는 함수를 최상단으로 끌어올려서 사용하는 것처럼 보이는 현상을 말한다.**<br>

- 자바스트립트 엔진은 코드를 실행하기 전에 선언된 변수 또는 함수의 정보를 수집한다. 이로 인해 코드를 실행할 때 변수 또는 함수를 최상단으로 끌어올려서 사용하는 것처럼 보인다. 하지만 실제로 최상단으로 끌어올려지는 것은 아니다.

- 선언과 할당은 총 3단계에 걸쳐 진행된다.

  - **선언** 단계 (Declaration phase)

    - 변수를 실행 컨텍스트의 변수 객체(variable environment)에 등록한다.
    - 등록된 변수의 Reference를 메모리에 저장한다.
    - 변수에 값은 저장되지 않은 상태이다.
    - 스코프를 참조하는 단계이다. (대부분의 스코프는 선언 단계에서 정해진다.)

  - **초기화** 단계 (Initialization phase)

    - 변수의 값은 메모리에 undefined로 초기화한다.

  - **할당** 단계 (Assignment phase)
    - 초기화된 변수에 실제 값을 할당한다.

```
// 선언 단계

let test;
const test2;
```

```
// 초기화 및 할당 단계

test = 10;
test2 = 100;
```

##### TDZ (Temporal Dead Zone)

**스코프를 참조하는 지점(선언 단계)부터 초기화 단계 직전까지의 구간**을 말한다.<br>
초기화 단계가 진행된 이후부터는 메모리에 undefined로 값이 저장된다.

##### 변수

**변수를 선언하는 모든 방식은 호이스팅이 발생한다.**

- ##### var

  - **선언 단계와 초기화 단계가 동시에 진행**된다.<br> 즉, 선언하자마자 바로 메모리에 저장되기 때문에 TDZ가 존재하지 않는다.

```
// (선언 및 초기화 - hoisting)

console.log(test) // undefined

var test = 2;

console.log(test) // 2
```

① **(실행 컨텍스트 생성 단계)** 선언과 초기화 단계가 동시에 진행되었다.<br>
② 초기화로 인해 변수 test는 메모리에 undefined라는 값으로 저장되었다.<br>
③ **(코드 실행 단계)** 선언과 할당이 이루어지기 전에 변수가 사용되었다. (console.log)<br>
④ 값이 할당되지는 않았지만 초기화가 완료되었기 때문에, 메모리에 저장된 값인 undefined가 콘솔에 출력된다.

- ##### let & const

  - **선언 단계와 초기화 단계가 분리**되어 있다.<br> 초기화하기 전까지는 메모리에 저장되지 않은 상태라서 접근조차 할 수 없기 때문에 ReferenceError가 발생한다. 이 구간이 바로 TDZ다.

```
// (선언 - hoisting)

console.log(test) // ReferenceError: test is not defined

let test; (초기화)

또는

const test; (초기화);

console.log(test) // undefined
```

① **(실행 컨텍스트 생성 단계)** 선언 단계만 진행되었다.<br>
② **(코드 실행 단계)** 변수가 선언(초기화 단계) 이전에 사용되었다. (console.log)<br>
③ 변수 test는 초기화 단계가 진행되지 않았기 때문에, 메모리에 값이 할당되지 않아 ReferenceError가 발생한다.<br>
④ 선언이 되면서 초기화 단계가 진행되어 콘솔에 undefined가 출력되는 모습을 확인할 수 있다.

#### function

함수를 생성하는 6가지 방법 중에서 함수 선언식만 호이스팅이 발생한다.

- 함수 선언식은 선언 단계, 초기화 단계, 할당 단계가 모두 동시에 진행된다.

```
// (선언, 초기화, 할당 - hoisting)

console.log(test()) // 2

function test() {
  return 2;
}
```

- 함수 표현식은 변수를 선언하여 변수에 함수를 할당하는 것으로 인식한다.

```
// (선언 및 초기화 - hoisting)

console.log(test) // undefined

var test = function () {
  return 2;
}
```

\*\* 힘수 선언식과는 달리 할당 단계가 동시에 진행되지 않기 때문에, undefined가 출력되는 모습을 확인할 수 있다.

```
// (선언 - hoisting)

console.log(test()) // ReferenceError: test is not a function

let test = function () {
  return 2;
}

또는

const test = function () {
  return 2;
}
```

\*\* 메모리에 저장이 되어 있지 않기 때문에 ReferenceError가 뜨고, 함수인지 확인이 되지 않으므로 'test is not a function'이 뜬다.

끝!

**참고**

- [DevStore](https://jwlee.dev/js-visualized/hoisting/)
- [HANAMON](https://ui.toast.com/weekly-pick/ko_20191014)
- [noogoona](https://noogoonaa.tistory.com/78)
- [TOASTUI](https://ui.toast.com/weekly-pick/ko_20191014)

(update: 21.12.27.)
