---
title: CSS3学习与总结 · 高斯模糊背景滤镜效果
tags:
- CSS
categories:
- CSS3
abbrlink: 53db1d13
date: 2023-05-13 10:55:16
---

在做一些比较炫酷效果时，经常会使用到 **毛玻璃效果**（光学上称之为 **高斯模糊**），在 CSS 中使用 **filter** 、**backdrop-filter** 属性均可实现。

![backdrop filter](https://tiven.cn/static/img/backdrop-filter-TPco6NPk.jpg)

[//]: # (<!-- more -->)

## 一、filter 实现

* filter 特点：模糊内容
* 语法：

```css
.box {
    background-color: rgba(0, 0, 0, 0.5);
    filter: blur(20px);
}
```

## 二、backdrop-filter 实现

* backdrop-filter 特点：透过该层的底部元素模糊化
* 语法：

```css
.box {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: saturate(150%) contrast(50%) blur(8px);
    -webkit-backdrop-filter: saturate(150%) contrast(50%) blur(8px);
}
```

参数说明：
* **saturate** 相当于饱和度，`<` 100%变暗，`>` 100%变亮
* **contrast** 相当于对比度，100%为原图，0%为全灰色图像
* **blur** 模糊或颜色偏移

```css
/* <filter-function> 滤镜函数值 */
backdrop-filter: blur(2px);
backdrop-filter: brightness(60%);
backdrop-filter: contrast(40%);
backdrop-filter: drop-shadow(4px 4px 10px blue);
backdrop-filter: grayscale(30%);
backdrop-filter: hue-rotate(120deg);
backdrop-filter: invert(70%);
backdrop-filter: opacity(20%);
backdrop-filter: sepia(90%);
backdrop-filter: saturate(80%);
```

## 三、代码实现

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>高斯模糊背景滤镜</title>
  <style>
    * {
      padding: 0;
      margin: 0;
    }
    .blur-box {
      width: 100%;
      position: relative;
      margin: 20px 0;
    }
    .blur-img {
      display: block;
      width: 100%;
    }
    .box-inner {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 3em;
      width: 30%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
    }
    .overlay-inner {
      left: 30%;
    }
    .blur-inner {
      right: 0;
      /*backdrop-filter: blur(8px);*/
      backdrop-filter: saturate(150%) contrast(50%) blur(8px);
      -webkit-backdrop-filter: saturate(150%) contrast(50%) blur(8px);
    }
    .blur-box .caption {
      display: none;
    }
  </style>
</head>
<body>

<div class="blur-box">
  <img src="https://tiven.cn/static/img/kpl-zhuangzhou-EyrrgiRNZ9wBA-HXw8OJt.jpg" alt="blur-img" class="blur-img">
  <div class="box-inner overlay-inner">普通遮罩层</div>
  <div class="box-inner blur-inner">模糊遮罩层</div>
</div>

</body>
</html>
```

demo演示地址：https://tiven.cn/demo/backdrop-filter.html

参考文档：https://www.runoob.com/cssref/css-backdrop-filter.html

---

欢迎访问：[天问博客](https://tiven.cn/p/53db1d13/ "天问博客-专注于大前端技术")

