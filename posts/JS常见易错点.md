---
title: JS常见易错点
abbrlink: a8974376
date: 2020-09-18 17:38:14
tags:
- JS
categories:
- JavaScript
---

`Javascript`是一门`弱类型`语言，很灵活，学习门槛低，容易上手。但同时也容易出现误区，遇到很多坑。本篇就专门用来记录日常开发中的易错点。

![Javascript](https://tiven.cn/static/img/img-js-01-an40onMK-Y-Y6IeYxOwDH.jpg)

<!-- more -->

## 一、参数为`引用类型`的函数

* eg：

```js
let object = { a: 0 }; 
function fun(obj) {
  obj.a = 1;       
  obj = { a: 2 };  
  obj.b = 2;       
}
fun(object);
console.log(object);
// 对于这个输出结果估计很多人都容易出错  
// 你想的结果：
{ a: 2, b: 2 }
// 实际的结果：
{ a: 1 }
```

### 解析：
1. `obj.a = 1` 引用类型可直接修改新增属性值
2. `obj = { a: 2 }` 改变了引用类型指向
3. `obj.b = 2` 新的obj属性值改变 和 `原object` 无关

## 二、== 和 === 的区别

1. 基础类型会做隐式转换再进行比较。

```js
NaN == NaN          // false
null == null        // true
null == undefined   // true
null == 0           // false
null == false       // false
undefined == 0      // false
undefined == false  // false
0 == '0'            // true

NaN === NaN         // false
null === undefined  // false
0 === '0'           // false
```

2. 引用类型会调用 `valueOf` 或者 `toString` 方法再进行比较，valueOf 优先于 toString。

```js
var o = {}
var a = o
var b = o
a == b        // true

var c = {}
var d = {}
c == d        // false
c.valueOf() == d.valueOf()    // false
c.toString() == d.toString()  // true

var d1 = new Date('2022-01-01')
var d2 = new Date('2022-01-01')
d1 == d2      // false
```



---

欢迎访问：[个人博客地址](https://tiven.cn/p/a8974376/ "天問博客")
