---
title: CSS3学习与总结 · 实现渐变色文字
abbrlink: 78a164b7
date: 2021-11-30 18:23:21
tags:
- CSS
categories:
- CSS3
---

随着浏览器的快速更新迭代，支持的DOM、BOM、CSS新特性越来越多，功能也越来越健全。本文就简单介绍一下使用CSS3的`linear-gradient`、`background-clip`和`box-decoration-break`属性来实现`渐变色`文字。

![CSS3 渐变色文字](https://tiven.cn/static/img/img-font-color-6Dgzq08tH7Fi1nILPzDex.jpg)

<!-- more -->

## 一、属性说明

主要用到CSS3的新特性：
* `linear-gradient`：该函数用于创建一个表示两种或多种颜色线性渐变的图片。
* `background-clip`：该属性规定背景的绘制区域。
* `box-decoration-break`：该属性规定当元素框被分段时，如何应用元素的 `background`、`padding`、`border`、`border-image`、`box-shadow`、`margin` 以及 `clip-path`。

`linear-gradient`线性渐变平时使用的比较多，这里就不再详细说明了。主要来看看`background-clip`和`box-decoration-break`的属性值以及相应的作用。

### 1-1.background-clip

|值|描述|
|:---:|:---:|
|border-box|默认值。背景绘制在边框方框内（剪切成边框方框）。|
|padding-box|背景绘制在衬距方框内（剪切成衬距方框）。|
|content-box|背景绘制在内容方框内（剪切成内容方框）。|
|text|以文字的范围来裁剪背景图片|

### 1-2.box-decoration-break

|值|描述|
|:---:|:---:|
|slice|默认。框装饰作为整体应用于元素，并在元素片段的边缘断裂。|
|clone|框装饰适用于元素的每个片段，就像片段是单个元素一样。边框包裹元素的每个片段的四个边缘，并且完整地重绘每个片段的背景。|
|initial|将此属性设置为其默认值。|
|inherit|从其父元素继承此属性。|

## 二、具体实现

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CSS3实现渐变文字 | 天问</title>
  <style>
    * {
        padding: 0;
        margin: 0;
    }
    .box {
        background-color: #002240;
        min-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .img {
        width: 80px;
        border-radius: 40px;
    }
    .text {
        margin-left: 20px!important;
        font-size: 1.5em;
        background-image: linear-gradient(135deg, #2DD7A6, #FADBD8, #FB5430);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
        -moz-box-decoration-break: clone;
        color: transparent;
        word-break: keep-all;
    }
  </style>
</head>
<body>

<div class="box">
  <img class="img" src="https://tiven.cn/assets/img/icon-128.png">
  <h1 class="text">天问的个人博客</h1>
</div>

</body>
</html>
```

demo演示地址：https://tiven.cn/demo/gradient-text.html

---

欢迎访问：[天问博客](https://tiven.cn/p/78a164b7/ "天问博客")
