---
title: 在svg或canvas中获取text文字宽度
tags:
- svg
categories:
- JavaScript
abbrlink: 65cf97cf
date: 2022-07-19 11:11:26
top: 9
---

使用 **svg** （`D3.js`）或 **canvas** （`PIXI.js`）绘图时，经常要考虑文字长度和一些动态边界问题，所以还是有必要弄清楚：在 svg 或 canvas 中获取 text 文字宽度的方法。

![SVG && Canvas](https://tiven.cn/static/img/img-svg-02-2zQQR7DnKbv-xbP8_vCHQ.jpg)

[//]: # (<!-- more -->)

## 一、在 SVG 中获取文字元素宽度

因为 **svg** 中是一个一个元素组成的，和原生 **DOM** 元素差不多，所以就可使用获取普通元素宽度的API， `getComputedTextLength` 、`getBoundingClientRect`。

```js
let $text = document.querySelector('.text')

// 方法 1
let w = $text.getComputedTextLength()

// 方法 2
let w = $text.getBoundingClientRect().width
```

## 二、在 Canvas 中获取文字元素宽度

Canvas 相当于是一个黑盒，内部没有元素的概念，所以就不能使用原生DOM提供的方法，但是可以使用 Canvas 提供的API， `measureText` 。

```js
const c = document.getElementById("myCanvas")
const ctx = c.getContext("2d")
ctx.font = "30px Arial"
const txt = "Hello World"
let w = ctx.measureText(txt).width
```

---

欢迎访问：[天问博客](https://tiven.cn/p/65cf97cf/ "天问博客-专注于大前端技术")

