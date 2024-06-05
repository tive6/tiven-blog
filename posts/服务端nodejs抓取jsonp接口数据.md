---
title: 服务端nodejs抓取jsonp接口数据
abbrlink: a99dbb56
date: 2022-04-07 11:14:42
tags:
- Node
- Axios
- Jsonp
categories:
- Node
description: jsonp接口返回的是一段js脚本，在浏览器中使用script标签引入、加载成功后，会直接执行其中的callback方法，以参数的形式直接返回真正有用的接口数据，以此达到跨域请求的目的。本文就主要介绍一下怎么使用服务端nodejs抓取jsonp接口数据。
---

众所周知，`jsonp` 接口返回的是一段 `js` 脚本，在浏览器中使用 `script` 标签引入、加载成功后，会直接执行其中的 `callback` 方法，以参数的形式直接返回真正有用的接口数据，以此达到跨域请求的目的。但是如果在非浏览器环境（node执行环境）中怎么来抓取呢，本文就主要介绍一下，**服务端nodejs抓取jsonp接口数据** 的思路方法和踩过的坑。

![Node+Axios Jsonp](https://tiven.cn/static/img/kpl-caocao-_5c1of3aPrOxvqnpJAr7q.jpg)

[//]: # (<!-- more -->)

## 前言

出于好奇，最近在研究使用 `node` 程序分析股票的数据，看看能不能找到一些规律。
但前提是要获取一批数据，所以查看了几个相关的网站平台，通过开发者工具的 `network` 查看，其中接口数据基本都是使用 `jsonp` 格式的。

**温馨提示：** 不要过度频繁爬取数据，可能涉及网络安全问题。

## 方法思路

1. 在 `node` 服务端使用 `axios` 获取 `jsonp` 返回的内容
2. 使用 `typeof` 查看返回内容的类型
3. 解析 `jsonp` 返回的内容、执行其中的 `callback` 方法

关键在于这第三步，在 `node` 环境中如何动态的执行这一段 `String` 类型的代码。

## Node环境动态执行脚本

1. `eval()` 

直接调用，使用本地作用域。
```js
function test() {
  let x = 10, y = 20;
  let sum = eval('x + y')
  console.log(sum);  // 30
}
```

2. `Function`

与 `eval` 不同的是，`Function` 创建的函数只能在`全局作用域`中运行。
`test()` 执行会报错：`ReferenceError: x is not defined`。

```js
// 报错
function test() {
  let x = 10, y = 20;
  let fn = new Function('return x + y')
  let sum = fn()
  console.log(sum) // ReferenceError: x is not defined
}

// 正常执行
global.x = 10
global.y = 20
function test() {
  let fn = new Function('return x + y')
  let sum = fn()
  console.log(sum) // 30
}
```

3. `vm.runInThisContext` （推荐）

**vm** 是 `node` 的核心模块，`vm` 可以使用 `v8` 的 **Virtual Machine contexts** 动态地编译和执行代码，而代码的执行上下文与当前进程隔离。
被执行的代码无法获取本地作用域，只能在当前的 `global` 对象的上下文中编译并执行 `code` 。

```js
const vm = require('vm')

global.x = 10
global.y = 20
function test() {
  let sum = vm.runInThisContext('x + y')
  console.log(sum) // 30
}
```

## 完整代码实现

```js
// index.js

const vm = require('vm')
const axios = require('axios')

// 在 global 对象上挂载对应的 callback 方法
global.jQuery11230971606670044967_1649312313646 = function(res) {
  // jsonp 接口返回的数据
  console.log(res)
  // do something
}

async function getData() {
  let { data } = await axios({
    url: 'https://push2.eastmoney.com/api/qt/clist/get?cb=jQuery11230971606670044967_1649312313646&fid=f62&po=1&pz=10&pn=1&np=1&fltt=2&invt=2&fs=m%3A90+t%3A3&stat=1&fields=f12%2Cf14%2Cf2%2Cf3%2Cf62%2Cf184%2Cf66%2Cf69%2Cf72%2Cf75%2Cf78%2Cf81%2Cf84%2Cf87%2Cf204%2Cf205%2Cf124&ut=b2884a393a59ad64002292a3e90d46a5'
  })
  
  // 查看返回内容的类型
  console.log(typeof data)
  
  // 执行 callback
  vm.runInThisContext(data)
}

// 调用抓取数据的方法
getData()
```

**特别提醒：** 
浏览器环境与 `Node` 执行环境挂载全局对象是有区别的。
在浏览器环境中，全局作用域可以使用 `var` 来声明一个变量或方法，会自动挂载到 `window` 对象上；
但是在 `Node` 环境中，每个文件或者模块，都会被封闭在一个单独的作用域，因此不管在哪里声明的变量，相对于当前模块或文件，都是在局部作用域，不会自动挂载到全局 `global` 对象中，如果要使用必须手动去挂载。

欢迎访问：[天问博客](https://tiven.cn/p/a99dbb56/ "天问博客")
