---
title: JavaScript中的内存泄漏
abbrlink: cbdc36eb
date: 2021-11-20 21:03:47
tags:
- JS
categories:
- JavaScript
---

JavaScript中的`内存泄漏`（Memory leak）问题经常不经意就会出现，这是由于疏忽或错误造成程序未能释放已经不再使用的内存。

![Javascript 内存泄漏](https://tiven.cn/static/img/hong-kong-city-urban-skyscrapers-preview-0S2nD6dOICqzC39ZR9PLX.jpg)

[//]: # (<!-- more -->)

## 一、概念

- `内存泄漏`并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，导致在释放该段内存之前就失去了对该段内存的控制，从而造成了内存的浪费。

- 程序的运行需要内存。只要程序提出要求，操作系统或者运行时就必须供给内存。

- 对于持续运行的服务进程，必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。


## 二、Javascript中的垃圾回收机制

详见本站另一篇文章：[Javascript中的垃圾回收机制](https://www.tiven.cn/p/c062304d/ "天问博客")

## 三、常见内存泄露情况

- 意外的全局变量

```js
function foo(arg) {  
    bar = "this is a hidden global variable";  
}  
```

- 另一种意外的全局变量可能由 `this` 创建：

```js
function foo() {  
    this.variable = "potential accidental global";  
}  
// foo 调用自己，this 指向了全局对象（window）  
foo();  
```

- 上述使用严格模式，可以避免意外的全局变量

- 定时器也常会造成内存泄露

```js
var someResource = getData();  
setInterval(function() {  
    var node = document.getElementById('Node');  
    if(node) {  
        // 处理 node 和 someResource  
        node.innerHTML = JSON.stringify(someResource));  
    }  
}, 1000);  
```

- 如果`id`为Node的元素从`DOM`中移除，该定时器仍会存在，同时，因为回调函数中包含对`someResource`的引用，定时器外面的`someResource`也不会被释放。

- 包括我们之前所说的闭包，维持函数内局部变量，使其得不到释放。

```js
function bindEvent() {  
  var obj = document.createElement('XXX');  
  var unused = function () {  
    console.log(obj, '闭包内引用obj obj不会被释放');  
  };  
  obj = null; // 解决方法  
}  
```

- 没有清理对`DOM`元素的引用同样造成内存泄露

```js
const refA = document.getElementById('refA');  
document.body.removeChild(refA); // dom删除了  
console.log(refA, 'refA'); // 但是还存在引用能console出整个div 没有被回收  
refA = null;  
console.log(refA, 'refA'); // 解除引用  
```

- 包括使用事件监听`addEventListener`监听的时候，在不监听的情况下使用`removeEventListener`取消对事件监听。

---

欢迎访问：[天问博客](https://tiven.cn/p/cbdc36eb/ "天問博客")

