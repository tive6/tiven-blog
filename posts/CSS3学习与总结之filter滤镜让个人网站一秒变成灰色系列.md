---
title: CSS3学习与总结 · filter滤镜让个人网站一秒变成灰色系列
abbrlink: a58442ee
date: 2021-12-13 18:52:31
tags:
- CSS
categories:
- CSS3
---

2021年12月13日是第八个 **国家公祭日** ， **悼血与火浸染之地，祭抗战死难之生灵** ，国家各种官网和各大在线电商，都把网站设置为`灰色系列`，以此来`悼念历史`，`缅怀先烈`。本文就介绍一下使用CSS3的`filter`滤镜属性让个人网站一秒变成`灰色系列`的具体方法。

![CSS3 神奇的Filter](https://tiven.cn/static/img/img-gray-theme-Nkzv8s4Usye5sEpzP6GQ8.jpg)

[//]: # (<!-- more -->)

## filter(滤镜) 属性

**定义：** `filter` 属性定义了元素(通常是`<img>`)的可视效果(例如：`模糊`与`饱和度`)。

**grayscale(%)值：** 将图像转换为`灰度图像`。值定义转换的比例。值为100%则完全转为灰度图像，值为0%图像无变化。值在0%到100%之间，则是效果的线性乘子。若未设置，值默认是0。

## 灰色系列实现

给`html`元素设置`filter`属性

```css
html {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
}
```

**提示：** 可能有会给`body`元素添加`filter`属性，确实也可以做到同样的效果，但是如果页面中有`fixed`固定定位的元素或内容，会出现`定位失效`的问题，因此建议直接给`html`元素加`filter`属性。

就是这么简单，网站瞬间变成灰色系列，很神奇有木有。

>祀我国殇，慰我英魂

---

欢迎访问：[天问博客](https://tiven.cn/p/a58442ee/ "天问博客")
