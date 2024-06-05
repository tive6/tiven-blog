---
title: setTimeout引发的刨根问底
abbrlink: 9f4bb84d
date: 2022-02-08 16:33:01
tags:
- JS
categories:
- JavaScript
---

**setTimeout**（`定时器`）是`JavaScript`中一个比较重要且常用的方法，该方法用于在指定的毫秒数后调用函数或计算表达式。平时开发可能基本都是使用 `setTimeout(fn, ms)` 的形式，当然还有比较神奇的用法，特别是在前端面试中，经常被问到。

![JavaScript setTimeout](https://tiven.cn/static/img/img-js-03-fs67PSGCGxT3ZB1PBaDhg.jpg)

[//]: # (<!-- more -->)

## 一、setTimeout 介绍

1. 定义: **setTimeout()** 方法用于在指定的毫秒数后调用函数或计算表达式。

2. 语法

```
setTimeout(code, milliseconds, param1, param2, ...)
setTimeout(function, milliseconds, param1, param2, ...)
```

|参数|描述|
|:---:|:---:|
|code/function|必需。要调用一个代码串，也可以是一个函数。|
|milliseconds|可选。执行或调用 code/function 需要等待的时间，以毫秒计。默认为 0。|
|param1, param2, ...|可选。 传给执行函数的其他参数（IE9 及其更早版本不支持该参数）。|

## 二、使用

1. 第一个参数为 `code` 字符串形式：

```js
setTimeout("console.log('Hello setTimeout')", 2000)
```

2. 第一个参数为 `function` 函数形式（推荐）：

```js
setTimeout(function(){
  console.log('Hello setTimeout')
}, 2000)
```

3. 传参：

```js
setTimeout(function(params){
  console.log(`参数：${params}`)
  console.log('Hello setTimeout')
}, 2000, 'setTimeout params')

/* 打印输出 */

// 参数：setTimeout params
// Hello setTimeout
```

## 三、经典面试题

1. 基础

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000 * i);
}
```

**输出：** 开始输出一个 5，然后每隔一秒再输出一个 5，一共 5 个 5。
**解析：** var声明的 i 变量提升

2. 优化：输出 0 到 4，且每个间隔一秒

```js
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}
```

**解析：** `自执行函数`形成`闭包`，而 JS 函数中`基本类型`的参数传递是`按值传递`。
更加直观的形式：

```js
function output(i) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}

for (var i = 0; i < 5; i++) {
  output(i);
}
```

3. 其他方法：

* 利用 `ES6` 中的 `let` 声明的变量形成`块级作用域`。

```js
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000 * i);
}
```

* 利用 `setTimeout` 中第三个参数，保持参数的引用。

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function(i) {
    console.log(i);
  }, 1000 * i, i);
}
```

## 四、举一反三

1. 删除自执行函数的参数

```js
for (var i = 0; i < 5; i++) {
  (function() {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}
```

**输出：** 开始输出一个 5，然后每隔一秒再输出一个 5，一共 5 个 5。

2. 变形

```js
for (var i = 0; i < 5; i++) {
  setTimeout((function(i) {
    console.log(i);
  })(i), i * 1000);
}
```

直接看不太容易理解，拆解一下：

```js
for (var i = 0; i < 5; i++) {
  var fn = (function(i) {
    console.log(i);
  })(i);
  setTimeout(fn, i * 1000);
  
  // 相当于下边的
  // setTimeout(undefined, i * 1000)
}
```

**输出：** 直接输出 0 到 4，中间没有间隔。
**解析：** fn 接收的是一个没有返回值的自执行函数，所以这里的 fn 为 `undefined`，相当于执行了 `setTimeout(undefined, i * 1000)` 无效，也不会报错。 


---

欢迎访问：[天问博客](https://tiven.cn/p/9f4bb84d/ "天问博客") 
