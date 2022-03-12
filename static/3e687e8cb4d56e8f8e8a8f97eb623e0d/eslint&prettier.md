---
title: "ESLint and Prettier"
date: "2021-12-13"
categories: ["develop"]
---

<p class="content-subtitle">ESLint는<p>

**코드에서 자바스크립트의 문법 오류 또는 안티 패턴을 찾아주는 정적 분석 도구다.**<br>

- 문법 오류 등을 경고 또는 에러로 처리하여 휴먼 오류를 컴파일 단계에서 잡아준다.
- 코드 스타일과 팀원 유무에 관계없이 설치하는 것을 권장한다.

##### 설치

1. ESLint <br>

   - `npm i -D eslint`
   - CRA에는 ESLint가 내장되어 있다.

2. 플러그인 <br>

   - React의 JSX문법을 ESLint가 인식하도록 만드는 플러그인

     - `npm i -D eslint-plugin-react`

   - ESLint가 타입스크립트의 오류를 인식하도록 만드는 parser

     - `@typescript-eslint/parser`

   - 타입스크립트에 구체화된 ESLint의 규칙을 포함하는 플러그인
     - `@typescript-eslint/eslint-plugin`

##### 설정

- Root폴더에 .eslintrc 파일을 생성하여 아래의 옵션 중 필요한 내용을 입력한다.

- **`env`**
  - 사전에 정의된 전역 변수의 사용을 정의한다.
  - browser, node를 설정하지 않으면 console, require 같은 전역변수 환경에 있는 메서드를 인식할 수 없어서 에러가 발생한다.

```
  env: {
    browser: true,
    es6: true,
    node: true,
  },
```

- **`globals`**
  - 선언되지 않은 전역변수를 사용하더라도 ESLint 경고가 발생하지 않도록 사용자의 전역 변수를 추가한다.

```
globals: {
  Atomics: 'readonly',
  SharedArrayBuffer: 'readonly',
},
```

- **`parserOptions`**
  - ESLint를 적용할 Javascript 언어의 옵션을 지정한다.
  - ecmaFeatures
    - ECMAScript의 언어 확장 기능을 설정한다. (React의 JSX)
  - sourceType
    - parser가 JS 파일을 모듈로 인식하도록 지정한다.
    - ES6의 import/export를 활용하기 위해서는 module로 지정해야 한다.

```
parserOptions: {
  ecmaFeatures: {
    jsx: true,
  },

  ecmaVersion: 6,
  sourceType: 'module',
},
```

- **`parser`**
  - Parser를 설정한다.
  - default값은 'Espree'이나 이외에 다른 Parser를 설정할 수 있다.

```
parser: [
  'babel-eslint',
  '@typescript-eslint/parser'
],
```

- **`plugins`**
  - 플러그인을 추가한다.
  - 플러그인은 규칙의 집합이다.
  - 플러그인을 추가하는 것과 규칙을 추가하는 것은 별개의 영역이다.

```
plugins: [
  'react',
  '@typescript-eslint'
],
```

- **`extends`**
  - 플러그인에서 사용할 규칙을 별도로 설정한다.

```
extends: [
  'plugin:react/recommended',
  'airbnb'
],
```

- **`rules`**
  - 규칙을 임의로 수정할 수 있다.
    - 다양한 종류가 있으니 필요한 내용을 가져다 쓰면 된다.
  - 규칙을 사용하지 않을 경우 **'off' 또는 0**을 입력한다.
  - 규칙을 경고로 처리하는 경우 **'warn' 또는 1**을 입력한다.
  - 규칙을 에러로 처리하는 경우 **'error' 또는 2**을 입력한다.

```
rules: {
  "no-unused-vars": "error",
  "no-console": "off",
  "no-else-return": "error",
  "semi": [1, "always"],
  "space-unary-ops": 2
},
```

#### Prettier는

**코드의 스타일을 관리하는 코드 formatter이다.**

- 본인만의 코드 스타일이 있고, 개인 토이 프로젝트라면 prettier를 설치하지 않아도 된다.

##### 설치

1. Prettier

   - `npm i -D prettier`

2. 플러그인
   - ESLint의 포맷팅 규칙 중 Prettier와 겹치는 내용을 삭제한다.
     - `npm i -D eslint-config-prettier`
   - Prettier를 ESLint의 플러그인으로 추가한다.<br>
     \*\* Prettier에서 인식하는 포맷 오류를 ESLint 오류로 출력한다.
     - `npm i -D eslint-plugin-prettier`

##### 설정

- Root폴더에 .prettierrc 파일을 생성하여 아래의 옵션 중 필요한 내용을 입력한다.

- **`printWidth`**

  - 한 줄에 들어갈 수 있는 글자 수 제한
    - ex) `"printWidth": 100`

- **`tabWidth`**

  - tab 클릭 시 space로 변환하여 들여쓰기 (숫자: space 횟수)
    - ex) `"tabWidth": 2`

- **`singleQuote`**

  - 작은 따옴표 사용 (true: 작은 따옴표, false: 모두 허용)
    - ex) `"singleQuote": true`

- **`jsxSingleQuote`**

  - JSX문법 안에서 작은 따옴표 사용 (true: 작은 따옴표, false: 모두 허용)
    - ex) `"jsxSingleQuote": true`

- **`jsxBracketSameLine`**

  - JSX의 닫힘 괄호(>)를 다음 줄로 내릴지 여부
    - ex) `"jsxBracketSameLine": false`

- **`bracketSpacing`**

  - 괄호에 공백 삽입 여부 (true: 공백 삽입, false: 공백 제외)
    - ex) `"bracketSpacing": true` // [1,2] → [ 1, 2 ]

- **`semi`**

  - 세미콜론 사용 여부 (true: 사용, false: 미사용)
    - ex) `"semi": true`

- **`arrowParens`**

  - 매개변수가 하나일 때 화살표 함수 괄호 사용 여부 (always: 사용, avoid: 미사용)
    - ex) `"arrowParens": "always"`

- **`endOfLine`**

  - 운영체제에 따른 EoF 포맷 설정 (Window: CRLF, 리눅스 및 Mac: LF)
    - ex) `"endOfLine": "lf"`

- **`trailingComma`**
  - 여러 줄을 사용할 때, 후행 콤마 사용 방식 (all: 모두 허용, es5: 사용 - 기본, none: 미사용)
    - ex) `"trailingComma": "none"`

##### Error

- ESLint parsing error

  - ESLint가 ES6 ~ 7을 파싱할 때 문제가 생기는 경우가 있다고 한다.<br>babel-eslint를 설치하여 해결한다.

    - `npm install babel-eslint --save-dev`
    - `yarn add babel-eslint --dev`

  - .eslintrc에 아래의 내용이 없다면 추가한다.

```
"parser": "babel-eslint"
```

- Delete `␍` eslint (prettier/prettier)
  - 엔드라인 시퀀스로 인해 발생하는 문제다.
  - .eslintrc에서 endOfLine 옵션을 'auto'로 설정하여 해결한다.

**.eslintrc**

```
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
```

\*\* Windows는 CRLF(\r\n)를 사용하는 반면에, Unix/Linux는 LF(\n)로 줄을 바꾼다. (Mac 의 초기 버전- 9 버전 이하 -는 CR (\r) 을 줄바꿈으로 사용한다.)<br>
\*\* CR: 현재 커서를 줄 올림 없이 가장 앞으로 옮기는 동작<br>
\*\* LF: 커서는 그 자리에 그대로 둔 채 종이만 한 줄 올려 줄을 바꾸는 동작

**참고**

- [kakao Tech](https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/)
- [INGG](https://ingg.dev/eslint/)
- [TriplexLab](https://triplexlab.tistory.com/40)
- [TechNote](https://technote.kr/300)
