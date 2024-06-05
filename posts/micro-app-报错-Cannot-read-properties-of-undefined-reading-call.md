---
title: micro-app 报错 Cannot read properties of undefined (reading 'call')
tags:
  - Node
  - npm
  - JS
categories:
  - Node
abbrlink: 626a0378
date: 2024-03-10 10:51:23
---

使用 `micro-app` 微前端框架集成子应用报错：`[micro-app from runScript] app finance-child-app: TypeError: Cannot read properties of undefined (reading 'call') `。

[//]: # (![title]&#40;https://tiven.cn/static/img/img-2018-01-0De2-KDyBGM1FyOdo6hy2.jpg&#41;)

<!-- more -->

## 报错原因 

由主应用和子应用 `package.json` 中的 **name** 相同所导致，修改成不同，重启一下服务即可。

都是 CV 大法惹的祸 😂

参考文档：https://github.com/micro-zoe/micro-app/issues/413

---

欢迎访问：[天问博客](https://tiven.cn/p/626a0378/ "天问博客-专注于大前端技术")

