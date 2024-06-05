---
title: 移动H5调试神器vConsole
abbrlink: a570d170
date: 2021-11-05 22:02:32
tags:
- H5
- Hybrid
categories:
- H5
---

在做移动H5时，经常需要真机调试，但是手机端没有像Chrome`控制台`那样的开发者工具，对于`network`、`console日志`没办法查看，所以便有了今天的开发神器——`vConsole`。

![H5+vConsole](https://tiven.cn/static/img/home-office-workstation-office-business-preview-PI97QFc2LBFRFIINb3I9x.jpg)

<!-- more -->

## vConsole介绍

`vConsole`是一个第三方插件工具，封装了浏览器的一系列调试信息，如：`log日志`、`System`、`Network`、`Element`、`Storage`、`Cookie`这是都是开发中时常要查看使用的信息。

## 安装使用

* npm 安装

```shell
npm i -D vconsole
```

* npm 使用

```js
import VConsole from 'vconsole';

const vConsole = new VConsole();
// or init with options
const vConsole = new VConsole({ maxLogNumber: 1000 });

// call `console` methods as usual
console.log('Hello world');

// remove it when you finish debugging
vConsole.destroy();
```

* CDN使用

```js
<script src="https://unpkg.com/vconsole/dist/vconsole.min.js"></script>
<script>
    // VConsole will be exported to `window.VConsole` by default.
    var vConsole = new window.VConsole();
</script> 
```

## 手机端展现

![vConsole](https://tiven.cn/static/img/img-vconsole-3sBfRIEeEv9YwM8wF79vp.jpg)

自从有了`vConsole`，移动H5开发调试变得SoEasy。

* 还有另一个类似的调试工具：[eruda](https://www.npmjs.com/package/eruda "eruda")，可以根据喜好自行选择。

---

欢迎访问：[天问博客](https://tiven.cn/p/a570d170/ "天問博客") 
