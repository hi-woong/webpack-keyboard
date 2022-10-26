# webpack-keyboard
virtual-keyboard

![image](https://user-images.githubusercontent.com/105634994/198006851-4369efec-14f7-4b55-8067-7ed33ceaa465.gif)
### 클론코딩 강의 (개인공부 진행중)

## webpack 이용한 개발환경 구축
module bundler
웹개발에 필요한 html,css,javascript 등을 하나의 파일 또는 여러개의 파일로 병합하거나 압축해주는 역할을 한다

## 1. package.json 초기화
```
npm init -y
```
## 2. webpack 관련 패키지 설치
```
npm i -D webpack webpack-cli webpack-dev-server
```
-D 는 dev dependancies로써 설치를 하겠다는 뜻이고
local 개발이나 test 를 설치하는데에만 쓰이는 패키지를 뜻한다.

반면 dependacies 로 설치를 하게 되면
production 환경에서 필요한 패키지를 뜻한다.

## 3. src 폴더 생성
개발할 때 필요한 파일들을 생성 해 준다.

## 4. 추가 플러그인 설치
npm i -D terser-webpack-plugin //압축 플러그인 
npm i -D html-webpack-plugin //html 관련 모듈
npm i -D mini-css-extract-plugin css-loader css-minimizer-webpack-plugin //css 관련 모듈
## 5. webpack.config.js 세팅
각각 주석으로 해당에 관한 설명을 적어놨다.
```markdown
const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
```

```
module.exports = {
  entry: "./src/js/index.js", //js 파일의 진입점
  output: {
    // 빌드를 했을때 번들파일 관련 속성
    filename: "bundle.js", // 파일이름 지정(번들들파일)
    path: path.resolve(__dirname, "./dist"), //번들파일이 생성될 경로, path.resolve 메소드를 사용해서 __dirname 을사용해 웹팩이 절대경로를 찾을 수 있도록 해줌
    clean: true, //이미 번들파일이 있다면 다 지우고 다시 만들어주는 속성
  },
  devtool: "source-map", //build 한 파일과 원본 파일을 연결시켜주는 파일
  mode: "development", //production 과 devlopment 모드가 있는데 html,css,js 파일을 난독화 기능을 제공하는지에 대한 차이
  devServer:{
    host:"localhost",
    port:8080,
    open:true, // dev 서버를 열때 새창을 이용해서 열어줘라 
    watchFiles: "index.html" //html 변화 감지를 지켜봄, 변화가 있을때마다 reload
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: "keyboard", //title
      template: "./index.html", //lodash 파일 사용할 수 있게 해줌 -> 유틸성 메소드나 템플릿성 메소드를 제공해 주는 라이브러리
      inject: "body", //js 번들했을때 파일을 body 쪽에 넣어주겠다.
      favicon: "./favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], //css파일을 이런 로더를 사용해서 읽어들이도록 하겠다.
      },
    ],
  },

  optimization: {
    //압축해주는 친구들
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  },
};
```
## 6. index.html 파일 세팅
HtmlwebpackPlugin 플러그인을 설치하고, template: "./index.html" template 를 index.html 로 설정해 주었다. 
이렇게 하면 lodash 파일을 사용할 수 있게 해주는데 index.html 파일에 따로 lodash 문법을 사용해서 적어줘야한다. header 안에 적어줬다.

```
  <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  ```
  ## 7. eslint & prettier
- eslint 는 js linter 중에 하나로 정적 분석을 통해 문법적 오류를 찾아준다. 간단한 포맷팅 기능도 제공한다.
- prettier 는 코드 포맷팅 중에 하나이다.
- ^ 캐럿 표시는 npm 설치 시 마이너 버전이 업데이트가 되었으면 마이너 버전까지는 업데이트를 허용한다라는 뜻이다. (--save-exact 사용하여 설치)
- eslint 가 포맷팅 기능도 제공하다 보니까 prettier 가 formatting 이 겹치는 룰이 있어 충돌이 나게 된다. 그 충돌을 방지하기 위해 eslint-config-prettier 플러그인 추가해 준다.
- eslint-plugin-prettier 는 eslint에 prettier 플러그인을 추가해 주기 위한 패키지이다.

```
npm i -D eslint
npm install --save-dev --save-exact prettier 
npm i -D eslint-config-prettier eslint-plugin-prettier
```
