---
title: null和undefined的区别
tags:
- JS
categories:
- JavaScript
abbrlink: 2a59aceb
date: 2023-08-26 15:50:59
---

**null** 和 **undefined** 是 JavaScript 中的两个基础类型特殊值。它们都表示“空”，但是有一些区别。

![null & undefined](https://tiven.cn/static/img/js-null-XaF4oSVY.jpg)

[//]: # (<!-- more -->)

## 一、null

* 在 JavaScript 内部，**null** 被视为一个表示空值或缺少值的对象指针。在计算机内存中，它通常被表示为一个指向内存空间的空指针。这意味着 null 实际上是一个被明确赋予的值，用来表示没有有效的对象引用。
* 当使用 **null** 进行数学运算时，JavaScript 引擎会将它视为数字 **0**。

## 二、undefined

**undefined** 表示一个未定义的值，通常用于表示尚未赋值的变量。
在 JavaScript 内部，**undefined** 是一个全局变量，并且在没有被赋值的情况下，默认的初始值就是 undefined。
当你尝试使用一个未初始化的变量时，JavaScript 引擎会返回 **undefined**。

## 三、null vs undefined 

* 值相等，但类型不同

```js
console.log(null == undefined); // true

console.log(null === undefined); // false

console.log(Boolean(null)); // false

console.log(Boolean(undefined)); // false
```

* 数学运算中，null 会被视为 **0**，而 undefined 参与数学运算时会产生 **NaN**（非数字）。

经典面试题：`null+1=? ; undefined+1=?`

解答：`null+1=1 ; undefined+1=NaN`

```js
console.log(Number(null)); // 0

console.log(Number(undefined)); // NaN
```

* typeof 操作符返回的类型不同

经典面试题：`为什么 typeof null 是 object ?`

可从以下两方面解答：

1. 计算机底层存储来看，在 JavaScript 中二进制前三位都为 0 的话会被判断为 object  类型，null 的二进制全部都为 0 ，前三位自然也是 0 ，所以执行 **typeof** 值会返回 `"object"` 。
2. 从逻辑角度来看，null 值表示一个空对象指针，它代表的其实就是一个空对象，所以使用 typeof 操作符检测时返回 `"object"` 也就合情合理。

```js
console.log(typeof null); // object

console.log(typeof undefined); // undefined
```

---

欢迎访问：[天问博客](https://tiven.cn/p/2a59aceb/ "天问博客-专注于大前端技术")

