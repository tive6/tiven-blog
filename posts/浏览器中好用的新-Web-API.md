---
title: 浏览器中好用的新 Web API
tags:
- DOM
- JS
categories:
- JavaScript
abbrlink: 22715997
date: 2023-01-24 16:43:23
---

持续更新浏览器中有特色、实验性、好用的 Web API，以备不时之需。

![JS Web API](https://tiven.cn/static/img/img-dom-02-666sMo60NVZuDqajcVpqW.jpg)

[//]: # (<!-- more -->)

## 一、VisualViewport

Visual Viewport API 提供了当前页面的视觉视口接口，即 **VisualViewport** 。对于每个页面容器来说（如 iframe），都存在有一个独立的 window 对象。每个页面容器的 window 对象都有一个独立的 **VisualViewport** 属性。

例：

```js
var bottomBar = document.getElementById('bottombar');
var viewport = window.visualViewport;

function resizeHandler() {
   if (viewport.scale > 1.3)
     bottomBar.style.display = "none";
   else
     bottomBar.style.display = "block";
}

window.visualViewport.addEventListener('resize', resizeHandler);
```

参考地址：https://developer.mozilla.org/zh-CN/docs/Web/API/VisualViewport

## 二、getSelection

`Window.getSelection` 返回一个 **Selection** 对象，表示用户选择的文本范围或光标的当前位置。

例：

```js
function foo() {
    let selObj = window.getSelection();
    console.log(selObj);
    let selRange = selObj.getRangeAt(0);
    // 其他代码
}
function fn() {
  let selObj = window.getSelection();
  alert(selObj.toString());
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/22715997/ "天问博客-专注于大前端技术")

