---
title: "Destructuring assignment"
date: "2021-12-09"
categories: ["develop"]
---

<p class="content-subtitle">Destructuring assignment는</p>

**구조 분해 할당, 즉 배열 또는 객체의 구조를 분해하여 변수에 할당하는 것을 의미한다.**

- 구조 분해 할당은 설명을 읽는 것보다 코드를 보고 직접 따라 쳐보는 것이 더욱 효과적인 학습 방법이므로 궁금한 건 직접 코드로 확인해보자.

**배열**을 구조 분해 할당하는 기본적인 형태를 먼저 살펴보자.

```
const array = [1, 2, 10, 4, 6, 7, 34];
const [a, b, c] = array; // 구조 분해 할당

console.log(a, b, c) // 1, 2, 10
```

<p class="comment-text">* let으로 선언해도 무방하다.</p>

**const [ a, b, c ] = array**를 풀어서 설명하면 아래와 같다.

```
const a = array[0];
const b = array[1];
const c = array[2];
```

이제 응용을 해보자.

```
const array = [1, 2, 10, 4, 6, 7, 34];
const [d, , f] = array;

console.log(d, f) // 1, 10
```

spread operator를 사용할 수도 있고,

```
const [g, h, ...i] = array;

console.log(g, h, i) // 1, 2, [10, 4, 6, 7, 34]
```

기본값을 설정할 수도 있다.

```
let [firstName, surname] = [];

console.log(firstName); // undefined
console.log(surname); // undefined
```

아무 값도 입력하지 않으면 undefined가 반환되고,

```
let [name = 'Guest', job)] = ['fodi'];

console.log(nickname); // fodi
console.log(job); // undefined
```

prompt에서 받아오는 값을 기본값으로 사용할 수도 있다.

```
let [name = 'Guest', job = prompt('직업을 입력하세요')] = ['fodi'];

console.log(nickname); // fodi
console.log(job); // prompt에서 받아온 값
```

다음은 **객체**를 구조 분해 할당 해보자.

```
const basic = {
  'nickname': 'fodi',
  'job': 'developer',
}
const {nickname, job} = basic;

console.log(nickname); // fodi
console.log(job); // developer
```

**const {nickname, job} = basic**을 풀어서 설명하면 아래와 같다.

```
const nickname = basic.nickname;
const job = basic.job;
```

기본값을 설정하여 key값을 추가할 수도 있다.

```
let bedOptions:any = {
'title': 'menu',
};
let {width: x = 200, height: y = 400} = bedOptions;

console.log(x); // 200
console.log(y); // 400
```

위의 코드는,
객체에 key값과 value값을 할당하는 ①과 객체의 value값을 각각의 변수에 할당하는 ②로 나누어 진다는 것을 아래에서 확인할 수 있다.

```
① let {width = 200, height = 400} = bedOptions;
② let {width:x, height:y} = bedOptions;

let x = bedOptions.width;
let y = bedOptions.height;
```

단, value값이 이미 할당된 key값에는 기본값을 입력하더라도 value값이 재할당되지 않는다.

```
let tableOptions = {
'title': 'menu',
'width': 100,
'height': 200,
}

let {width: w = 200, height: h = 400} = tableOptions;

console.log(w); // 100
console.log(h); // 200
```

그 외에 배열과 마찬가지로 spread operator를 활용할 수도 있다.

```
let {title, ...others} = tableOptions;

console.log(title, others); // menu, {width: 100, height: 200};
```

```
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

let { size: {width} } = options;

console.log(width); // 100
console.log(size); // error
```

매개변수에 응용

```
const test = ({nickname, job, gender = 'male'}) => {
  console.log(nickname, job, gender); // fodi, developer, male
}

const outer = () => {
  const obj = {
    'nickname' : 'fodi',
    'job' : 'developer',
  }

  test(obj);
}

outer();
```

기본값을 입력해줘야 예상치 못한 error를 방지할 수 있다.

```
const test = ({nickname, job, gender = 'male'}) => {
  console.log(nickname, job, gender); // fodi, developer, male
}

const outer = () => {
  const obj = {
    'job' : 'developer',
  }

  test(obj);
}

outer();
```

인자(obj)에는 nickname이 없는데 매개변수에는 있으니 error를 반환

```
let salaries = {
"John": 100,
"Pete": 300,
"Mary": 250
};

const topSalary = (salaries) => {
let max:any = 0;
let maxName:any = null;

    // [
    //   ['John', 100],
    //   ['Pete', 300],
    //   ['Mary', 250]]
    // ]

    for(const [name, salary] of Object.entries(salaries)) {
      if (max < salary) {
        max = salary;
        maxName = name;
      }
    }

    console.log(max, maxName);

}

topSalary(salaries);
```

**참고**

- [벨로퍼트](https://ko.javascript.info/destructuring-assignment#ref-585)
