---
title: Retina(视网膜)屏幕的1px如何实现
abbrlink: 79655102
date: 2022-03-14 16:04:35
tags:
- CSS
- H5
categories:
- H5
---

开发过移动H5或者混合APP的前端小伙伴，估计都体会过各个机型兼容适配的痛苦。有时候为了 `1px` 而绞尽脑汁，本文就详细介绍一下 **Retina (视网膜)屏幕的 1px** 的实现方法。

![DPR 1PX](https://tiven.cn/static/img/kpl-caiwenji-bkSbaqsOs7QzN8IxSxTd6.jpg)

<!-- more -->

## 背景

如果仅仅使用 css 的 **1px** 来设置 **border** ，那可能会出现比较粗的情况。因为有些手机屏幕的 `DPR = 2`，还有 `DPR = 3` 的情况，即 **1px** 它会用`两个物理像素`来显示，自然就粗了。
而这时候，你不能直接写 `0.5px` ，因为浏览器兼容性不好，渲染出来可能还是 `1px` 的效果，甚至无法正常显示。

PS：**DPR 即为像素比**，是 Window 对象下的一个属性，可以用以下方法获取。

```js
const DPR = window.devicePixelRatio
```

## 解决单边框 border 问题

我们可以使用 `css` 伪类 + `transform` 缩小来优化这一问题。即把默认的 1px 宽度给压缩 0.5 倍。

```css
#box {
    width: 200px;
    height: 100px;
    padding: 10px 0;
    position: relative;
}

#box::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #333;
    transform: scaleY(0.5);
    transform-origin: 0 0;
}
```

## 解决 border-radius 为 1px 的情况

如果有 `border-radius` 就不能使用 `transform` 进行缩放了，因为如果是整体缩放，肯定会影响其中的content内容，这时就可以巧用 `box-shadow` 设置来解决。

box-shadow属性的值依次是：
- X 偏移量 0
- Y 偏移量 0
- 阴影模糊半径 0
- 阴影扩散半径 0.5px
- 阴影颜色 #333

```css
#box {
    width: 200px;
    height: 100px;
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    /* border: 1px solid #333; */
    box-shadow: 0 0 0 0.5px #333;
}
```
<br>

> Perfect solution ^_^

---

欢迎访问：[天问博客](https://tiven.cn/p/79655102/ "天问博客")
