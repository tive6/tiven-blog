---
title: 一定要知道的JS高频面试题
abbrlink: 88e65d01
date: 2021-10-28 21:22:17
tags:
- JS
categories:
- JavaScript
---

在 `Javascript` 中有一些看似简单，而知之者甚少的基础知识，特别是在前端面试中高频出现，很考验面试者的基础功底，答不上来难免有些小尴尬，在此总结一下。

![Javascript](https://tiven.cn/static/img/img-js-03-pqLtfAZcQURmUDXYM4DYu.jpg)

<!-- more -->

## 1\. JavaScript 的数据类型？

`number`、`string`、`boolean`、`undefined`、`null`、`object`、`symbol`其中除了 `object` 以外，其他的类型统称为**基本数据类型**。
`object` 类型称为**引用数据类型**（复杂数据类型），它包含两个子类型（`array`、`function`）

## 2\. 字符串反转（'zbw'->'wbz'）？

```js
var name = 'zbw'  
var res = name.split('').reverse().join('')

console.log(res) // 'wbz'  
```

**先把字符串转为数组，然后调用数组的 `reverse` 方法反转数组元素，最后把数组转回字符串即可**

## 3\. 等式 0.1 + 0.2 === 0.3 不成立？

```js
0.1 + 0.2 === 0.3 // false  
```

**由于二进制浮点数中的 0.1 和 0.2 并不是十分精确，在两数相加时，会先转换成二进制，0.1 和 0.2 转换成二进制的时候尾数会发生无限循环，然后进行对阶运算，JS 引擎对二进制进行截断，所以造成精度丢失。所以它们相加的结果不是刚好等于 0.3，而是一个非常非常非常接近的数字：0.300000000000000004，所以条件判断为 false。**

## 4\. 为什么 typeof null === 'object' ？

```js
typeof null // object
```

由于 `JavaScript` 中，一个变量的值会被保存在一个 32 位的**内存单元**中。该单元包含一个 1 或 3 位的**类型标志**和**实际数据的值**。类型标志**存储在单元的最后**。

- 000：object - 对象
- 1：int - 整数
- 010：double - 浮点数
- 100：string - 字符串
- 110：boolean - 布尔值
- undefined -2^30
- null 空指针(全是 0)

结果很明显，**由于 `null` 的存储单元（全是 0）最后三位和 `object` 完全一样是 000**。


## 5\. a==1 && a==2 && a==3 成立？

```js
// 方法1  
var a = {  
    value: 1,  
    valueOf: function () {  
        return this.value++;  
    }  
};

// 方法2  
var a = {  
    value: 1,  
    toString: function () {  
        return this.value++;  
    }  
};

// 方法3  
var value = 1;  
Object.defineProperty(window, "a", {  
    get: function () {  
        return this.value++;  
    }  
});

if (a === 1 && a === 2 && a === 3) {  
    console.log("这也太神奇了吧！")  
}  
```

1. 方法一、二：利用 JS 对象有 **toString() 和 valueOf()** 两个方法，`toString()`将该对象的原始值以字符串的形式返回，`valueOf()`返回最适合该对象的原始值。
1. 用运算符对对象进行转换的时候 `valueOf()`的优先级高于 `toString()`
2. 对对象进行强字符串转换时会优先调用 toString()
3. toString()方法不能对 `null` 和 `undefined` 进行字符串转换，可以用 `String()`方法代替
4. 方法三：使用 `Object.defineProperty()`劫持变量 a，在 `get` 中返回变量 a++的值。


## 6\. 函数每秒依次输出 1,2,3,4,5...9？

```js
for(var i = 0; i < 10; i++) {  
  setTimeout(function timer() {  
    console.log(i)  
  }, i * 1000)  
}  
```

期望：每秒依次打印 1、2、3、4、5...9结果：每秒打印的都是 10

1. 利用 IIFE

```js
for(var i = 0; i < 10; i++) {  
  (function(i) {  
    setTimeout(function timer() {  
        console.log(i)  
    }, i * 1000)  
  })(i)  
}  
```

2. let 关键字
 
```js
for(var i = 0; i < 10; i++) {  
  let j = i // 闭包的块作用域  
  setTimeout(function timer() {  
    console.log(j)  
  }, j * 1000)  
} 
```

3. let 关键字（推荐写法）

```js
for(let i = 0; i < 10; i++) {  
  setTimeout(function timer() {  
    console.log(i)  
  }, i * 1000)  
} 
```

## 7\. 说一说 this 的指向问题？

要判断一个运行中的函数的 `this` 绑定，需要找到该函数的调用位置（结合调用栈），接着根据优先级得出的四条规则来判断 `this` 的绑定对象。

1.  函数由 new 调用？绑定到新创建的对象
2.  由 `call/apply/bind` 调用？绑定到指定对象
3.  由上下文对象调用？绑定上下文对象
4.  默认：严格模式下绑定到 `undefined`，否则绑定到`全局对象`

ES6 的箭头函数不适用以上四条规则，而是**根据当前的词法作用域来决定 this 绑定**，也就是说，箭头函数会**继承外层函数调用的 this 绑定**（无论绑定到什么），而且**箭头函数的 this 绑定无法被修改**。

## 8\. NaN 是什么？typeof NaN 输出？

**`NaN`（not a number）不是一个数字，但 `typeof` NaN 输出 'number'**。换句话说，`NaN` 可以理解为不是数字的数字（虽然有点绕口）。

## 9\. Symbol 类型有什么作用？

1.  可以用来表示一个独一无二的变量，防止命名冲突。
2.  可以用来模拟私有变量。（利用 `symbol` 不会被常规的方法（除了 Object.getOwnPropertySymbols 外）遍历）
3.  主要用来提供遍历接口，布置了 symbol.iterator 的对象才可以使用 for···of 循环，可统一处理数据结构。

## 10\. JavaScript 的隐式转换？

一般情况下，非基本数据类型的数据会 **优先调用 valueOf()** 来获取基本数据类型的值，如果无法获取则继续调用 **toString()** 获取基本数据类型的值。

- 字符串和数字相加

如果有一个为字符串，那么都转化为**字符串**然后执行字符串拼接

```js
'11' + 23 + '24' // 112324 
```

- 字符串和数字相减

转化为**数字**再进行运算

```js
'11' - 2 // 9  
```

- 布尔值和数字

转化为数字再进行运算

```js
1 + true // 2

1 + false // 1  
```

- 其他类型和布尔类型

将布尔类型转化为数字再进行运算

- 对象和非对象

执行对象 ToPrimitive(valueOf/toString）然后再进行比较。


---

欢迎访问：[个人博客地址](https://tiven.cn/p/88e65d01/ "天問博客")
