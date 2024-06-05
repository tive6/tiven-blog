---
title: node使用nodemon来监听文件变化
abbrlink: 1f405e26
date: 2021-08-17 23:46:16
tags:
- Node
- Nodemon
categories:
- Node
---

`Nodemon` 是一款非常实用的工具，用来监控你 `node.js` 源代码的任何变化和自动重启你的服务器。`nodemon` 就像是vue里面的开启`热加载`功能一样，开发者只要放心开发，不用修改一点就需要重新启动项目。

![Nodemon](https://tiven.cn/static/img/img-nodemon-01-Bl6y7QdY1zoRK4LDD4UhT.jpg)

<!-- more -->

### 安装

```bash
# 全局安装
npm install -g nodemon
# or
# 项目局部安装
npm install -D nodemon
```

### 简单监听文件变化

* 使用 `--watch` 参数，在 `package.json` 中配置`scripts`脚本使用。
* 当然也可以同时监听多个文件，如 `dev:test` 命令。
* 以vue项目为例，监听`vue.config.js`文件的变化。当运行 `npm run dev` 命令后， `vue.config.js`配置改变会自动重启服务。

```bash
  "scripts": {
    "start": "npm run serve",
    "dev": "nodemon --watch vue.config.js --exec \"npm start\"",
    "dev:test": "nodemon --watch vue.config.js --watch babel.config.js --exec \"npm start\"",
  }
```

### 项目配置化监听

* 由于 `nodemon` 监听的文件范围是整个node项目可能有点广，所以通过配置文件监听我们需要的。
* 项目根目录下新建 `nodemon.json` 文件，配置如下：

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "sourceMap": true
  },
  "restartable": "rs",
  "verbose": true,
  "execMap": {
    "js": "node --harmony"
  },
  "events": {
  },
  "delay": 1000,
  "exclude": [
    "node_modules"
  ],
  "watch": [
    "./",
    "src"
  ],
  "ext": "js,ts",
  "env": {
    "NODE_ENV": "development"
  },
  "ignore": [
    "package.json",
    "nodemon.json",
    "public/*",
    "node_modules/*",
    ".git"
  ]
}
```

#### `package.json`中`scripts`脚本配置

```bash
 "scripts": {
    "start": "nodemon -e ts,js --exec \\\"npm run serve\\\"",
    "serve": "node index"
  },
```

#### 效果：

![Nodemon](https://tiven.cn/static/img/img-nodemon-02-r8CLDYa-REa76LVjuLwFl.jpg)

* 参考文档：
1. https://www.npmjs.com/package/nodemon

---

欢迎访问：[个人博客地址](https://tiven.cn/p/1f405e26/ "天問博客")
