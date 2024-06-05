---
title: js实现base64转字符串
tags:
  - Node
  - JS
categories:
  - JavaScript
abbrlink: e515dcf3
date: 2024-02-14 10:29:38
---

介绍两种 js 中 `base64` 转 `string` 的方法。

[//]: # (![title]&#40;https://tiven.cn/static/img/img-2018-01-0De2-KDyBGM1FyOdo6hy2.jpg&#41;)

<!-- more -->

## 1. Buffer.from

```js
let base64Data = 'aGVsbG8=' // hello
let data = Buffer.from(base64Data, 'base64').toString('utf-8')
console.log('hello')
```

## 2. atob

```js
let str = 'hello' // aGVsbG8=
let base64Data = btoa(str) 
let data = atob(base64Data)
console.log('hello')
```

---

欢迎访问：[天问博客](https://tiven.cn/p/e515dcf3/ "天问博客-专注于大前端技术")

