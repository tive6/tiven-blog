---
title: vue cli构建的项目出现 Uncaught runtime errors
tags:
- Vue
categories:
- Vue
abbrlink: be7a6dcd
date: 2023-01-29 10:11:05
---

使用 **@vue/cli** 脚手架构建的项目，在 `npm run dev` 运行后，页面出现 `Uncaught runtime errors` 报错遮罩层，如下图所示。

![Vue Uncaught runtime errors](https://tiven.cn/static/img/vue-error-01-PvcMwlpl.jpg)

[//]: # (<!-- more -->)

## 报错原因

这种错误通常是运行时出的问题，可能是网络错误，可能是变量未定义等等。
这种错误默认在开发时直接显示在浏览器中，如果影响开发体验，可改变 devServer 配置关闭遮罩层报错。

## 配置

在 `vue.config.js` 中添加如下配置：

```js
module.exports = {
  devServer: {
    // 配置 start
    client: {
      overlay: false
    },
    // 配置 end
  }
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/be7a6dcd/ "天问博客-专注于大前端技术")

