---
title: 'export * from 与 export {default} from用法总结'
tags:
- JS
- ES6
categories:
- 前端工程化
abbrlink: 77fafd4d
date: 2023-05-09 15:05:55
---

**ES6** 设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量，因此前端模块化日益趋向 **ESModule** 规范。

![import & export](https://tiven.cn/static/img/img-esm-01-5N83Wj3wcsVhg-eyeRLQL.jpg)

[//]: # (<!-- more -->)

## 常见导入导出结构

```js
// index.js 导出
export const a = "a"
export const n = 111
export default [1,2,3]

// main.js 导入
import arr, { a, n } from './index.js'
```

## 导出简写模式

* 导出所有 **非default** 模块

```js
// index.js 导出
export * from './a.js'
export { Aa , Bb  } from './b.js'
// 无法在外部 import {default} from "xxx"

// 导入
import M from './index.js'
export { Aa, Bb } from './index.js'
```

## 模块设置别名

```js
export { default } from './xxx'
// 或
export { default as A } from './xxx'
```

---

欢迎访问：[天问博客](https://tiven.cn/p/77fafd4d/ "天问博客-专注于大前端技术")

