### 安装 webpack4.x

```js
// 安装 webpack v4+ 版本需要安装 webpack-cli
npm install webpack@4 webpack-cli@3 --save-dev
```

#### 版本问题

```
"css-loader": "^5.2.7",
"style-loader": "^2.0.0",
"webpack": "^4.46.0",
"webpack-cli": "^3.3.12",
"webpack-dev-server": "^3.11.2"
```

#### loader

* pre 放在前面执行的loader
* normal 普通loader
* 内联loader - expose-loader: 暴露全局的loader
* 后置loader
* 全局loader