---
title: "Webpack"
date: "2021-11-01"
categories: ["develop"]
---

CRA를 사용하지 않고 Webpack과 Babel을 직접 설정하고 바닐라JS로 SPA를 구현해보려 한다. 우선 Webpack을 설정하는 방법부터 알아보자.

#### package.json 파일 만들기

:: Webpack을 설치하려면 우선 package.json파일이 있어야 한다.

```
npm init -y
```

• **npm init**<br>

:: `package.json을 생성하는 명령어`이자 새로운 프로젝트나 패키지를 만들 때 사용한다.

• **-y**<br>
:: package.json의 내용을 `default값으로 채워준다`. package.json의 내용을 직접 설정하려거든 -y를 생략하면 된다.

#### Webpack 설치하기

```
npm i -D webpack webpack-cli
```

• **i**<br>
:: install의 줄임말
• **-D**<br>
:: --save-dev의 줄임말로 특정 모듈을 `개발 과정에서만 사용`하려고 할 때 입력한다. (해당 모듈은 release 단계에서 사용하지 않기때문에 빌드 파일이 가벼워진다.)
<br>본래 build할 때 package.json의 dependencies영역에 있는 모듈을 포함한다. 하지만 -D(--save-dev)를 입력하면 devDependendices가 생성되며 dependencies에 있던 모듈이 devDependencies로 이동하는 것을 확인할 수 있다. 어플리케이션에 직접 쓰이는 것이 아니라면 devDependencies에 설치하자.

• **webpack**<br>
:: 웹팩 코어

• **webpack-cli**<br>
:: 웹팩 커맨드라인 제어<br> (터미널에서 웹팩 명령어를 입력하기 위해서는 반드시 필요)

#### Webpack.config.js 파일 만들기

:: Webpack의 옵션을 설정하는 파일로 `root폴더에 파일을 생성`한다.

**webpack.config.js**

```
const path = require("path")

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist'),
  }
}
```

• **path**<br>
:: webpack의 내장 모듈이다. 운영체제별로 구분자가 달라지는 문제를 쉽게 해결하기 위해 등장했다.

• Window <br>- C:\Users\username\desktop처럼 `\`를 사용해서 폴더를 구분한다.

• Mac<br>- /Users/username/desktop처럼 `/`를 사용해서 폴더를 구분한다.

• **entry** 속성<br>
:: 웹 자원을 변환하기 시작하는 `JS파일의 경로를 입력`한다. 즉, entry 속성에 입력한 파일을 기점으로 번들링을 진행한다. 위의 코드를 예로 들자면, src폴더 아래에 있는 index.js파일에 연결되지 않은 내용은 번들링에 포함되지 않는다.

자세한 내용은 [해당 블로그](https://joshua1988.github.io/webpack-guide/concepts/entry.html)를 참조하길 바란다.

#### npm build 설정하기

**package.json**

```
scripts: {
  "build": "webpack --mode=production",
}
```

• **--mode=production**<br>
:: webpack은 3가지 모드가 존재한다.<br> 개발자들이 보기 편하게 웹팩 로그나 결과물이 보이는 `Development(개발)`,  
 컴파일 및 번들링을 수행하며 기본적인 파일 압축 등 `성능 최적화가 적용된 Production(배포)`, 그리고 `none`이다.
default값은 production이다.

#### 번들을 포함하는 HTML을 자동으로 생성하기

:: 원래는 번들된 CSS파일과 JS파일을 별도로 HTML파일에 추가해야 한다. 하지만 HtmlWebpackPlugin은 이 과정을 알아서 처리해준다.

```
npm i -D html-webpack-plugin
```

**webpack.config.js**

```
const HtmlWebpackPlugin = require('html-webpack-plugin');

plugin: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]
```

• **template** 속성<br>
:: 지정한 HTML문서의 Template을 참고해서 HTML문서를 생성한다. Template을 입력하지 않는 경우, HTML의 기본 형태로 생성된다.

• entry 포인트가 여러 개인 경우(= entry 속성에 여러 개의 파일을 입력하는 경우), 하나의 HTML에 각각의 script 태그로 포함된다. `entry 포인트로 나누는 것만으로도 code splitting이 가능`하다.

#### npm start 설정하기

:: 이전까지는 HTML파일을 live server(VSC 플러그인)로 열어야 했다면, 이후부터는 localhost에서 확인 가능하다. 즉, 프론트엔드 개발환경에서 이러한 개발용 서버를 제공해 주는 것이 바로 `webpack-dev-server`이다.

```
npm i -D webpack-dev-server
```

**package.json**

```
scripts: {
  "start": "webpack serve --open --mode=development",
}
```

여기까지만으로 `npm start` 명령어를 실행하여 개발용 서버를 구동할 수 있다.
하지만, webpack-dev-server는 옵션을 설정하는 것만으로도 많은 기능을 사용할 수 있으니 맛보기로 조금만 알아보자.

**webpack.config.js**

```
devServer: {
  static: {
    directory: path.resolve(__dirname, 'dist')
  },
  hot: false,
  liveReload: true,
  watchFiles: ['src/'],
  historyApiFallback: true,
  port: 8080,
  proxy: [
    {
      context: ['/api'],
      target: 'http://localhost:3000',
    }
  ]
}
```

• **hot** 속성<br>
:: 모듈이 추가, 수정, 삭제될 때 새로고침할 필요 없이 런타임에 즉각 반영되는 Hot Module Replacement(HMR) 기능. 다시 말해서, 변경 내용을 확인하기 위해 새로고침을 누를 필요가 없어진다.

• **liveReload** 속성<br>
:: 파일의 변화가 감지되었을 때 자동으로 reload/refresh하는 기능. hot 기능이 false상태이거나, watchFiles 속성과 함께 사용해야 liveReload가 정상적으로 동작한다. HMR과 유사한 기능을 한다.

• **watchFiles** 속성 <br>
:: 해당 파일 혹은 폴더 내의 파일에 변화가 생기는지 관찰하는 기능을 한다.

• **historyApiFallback** 속성<br>
:: 404에러가 뜰 경우, index.html로 리다이렉트한다.

• **port** 속성 <br>
:: port번호를 지정한다. 3000으로 입력할 경우, localhost:3000으로 접속할 수 있다.

• **proxy** 속성 <br>
:: 프록시 기능

• **context** <br>
:: URL에 지정한 텍스트(`/api`)가 있을 경우, 프록시 서버를 이용한다는 의미이다.
ex. `/api/users`로 요청하면, 프록시 서버를 이용해서 `http://localhost:3000/api/users`로 요청을 전달한다.

• **target** <br>
:: 데이터를 받아올 API의 URL이 가상 도메인이라면 target에 해당 도메인 주소를 입력한다.<br>
ex. `https://api.twitter.com`<br>

• CRA를 이용할 때는 package.json에 프록시를 설정할 수 있다.

끝!
