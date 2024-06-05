---
title: JS中对象和属性的连续赋值
tags:
- JS
categories:
- JavaScript
abbrlink: 4f221238
date: 2022-12-07 16:30:00
---

前端面试中的疑难杂症——JS 中对象和属性的连续赋值问题。

![JavaScript](https://tiven.cn/static/img/img-js-7Uw2ZXg53OAQ0e4FUUFDc.jpg)

[//]: # (<!-- more -->)

## 一、经典面试题

```js
let a = {n:1}
let b = a
a.x = a = {n:2}

console.log(a.x)
console.log(b.x)
```

## 二、关键考点

1. 值类型 vs 引用类型

```js
// 值类型，赋值后相互独立
let a = 100
let b = a

// 引用类型，赋值后指向堆中的引用
let c = {n:1}
let d = c
```

2. 连续赋值，倒序执行

```js
let a1, a2
a1 = a2 = 10

// 相当于
a2 = 10
a1 = a2
```

3. **a.x** 比 **赋值**(=) 的优先级高

_值类型赋值：_

```js
let a = {}
a.x = 100

// 拆解为
// 1. a.x = undefined // 初始化 a.x 属性
// 2. a.x = 100 // 为 x 属性赋值
```

_引用类型赋值：_

```js
let a = {n:1}
let b = a
a.x = a = {n:2}

// a.x = a = {n:2} 拆解为
// 1. a = b = {n:1, x: undefined}
// 2. a = {n:2}
// 3. a.x = {n:2}
// 4. b = {n:1, x: {n:2}}
```

![堆栈示例图](https://tiven.cn/static/img/img-js-04-kWYCilXe88NQ8QeRjOm62.jpg)

## 三、输出

```js
console.log(a.x) // undefined
console.log(b.x) // {n:2}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/4f221238/ "天问博客-专注于大前端技术")

