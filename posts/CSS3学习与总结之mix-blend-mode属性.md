---
title: CSS3学习与总结 · mix-blend-mode属性
abbrlink: 5183611c
date: 2021-11-16 13:40:12
tags:
- CSS
categories:
- CSS3
---

`CSS3` 新增了一个很奇妙的属性 -- `mix-blend-mode`，这个属性的作用根据名字翻译过来就是混合模式。可以根据这个新特性优化一些图形颜色展示。

![CSS3 mix-blend-mode 混合模式](https://tiven.cn/static/img/hedgehog-animal-baby-cute-preview-qdzC9BnxNAv6ir-VZsXmU.jpg)

[//]: # (<!-- more -->)

## 一、定义

* `mix-blend-mode` 属性描述了元素的内容应该与元素的直系`父元素`的内容和元素的`背景`如何混合。

## 二、浏览器支持

|属性|Chrome|Edge|Firefox|Safari|Opera|
|:---:|:---:|:---:|:---:|:---:|:---:|
|mix-blend-mode|41.0|不支持|32.0|8.0|35.0|

## 三、属性值

|属性值|含义|
|:---:|:---:|
|normal     |正常|
|multiply   |正片叠底|
|screen     |滤色|
|overlay    |叠加|
|darken     |变暗|
|lighten    |变亮|
|color-dodge|颜色减淡|
|color-burn |颜色加深|
|hard-light |强光|
|soft-light |柔光|
|difference |差值|
|exclusion  |排除|
|hue        |色相|
|saturation |饱和度|
|color      |颜色|
|luminosity |亮度|
|initial    |初始|
|inherit    |继承|
|unset      |复原|

## 四、实例

这里以`mix-blend-mode`的值`multiply`为例：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CSS3新属性：mix-blend-mode | 天問</title>
  <style>
      .container {
          padding: 30px 0;
      }
      h1 {
          text-align: center;
      }
      .box {
          text-align: center;
          padding: 30px;
          background: #E998A3;
          margin-top: 20px;
      }
      .img {
          height: 80px;
      }
      .mixin .img {
          mix-blend-mode: multiply;
      }
      .desc {
          padding: 30px 0;
      }
  </style>
</head>
<body>

<div class="container">
  <h1>CSS3新属性：mix-blend-mode</h1>

  <div class="box">
    <img src="https://tiven.cn/static/img/hourglass-time-hours-sand-preview-tOqBton_9Qy7cZsnLctFJ.jpg" alt="tiven.jpg" class="img">
    <div class="desc">原图展示</div>
  </div>

  <div class="box mixin">
    <img src="https://tiven.cn/static/img/hourglass-time-hours-sand-preview-tOqBton_9Qy7cZsnLctFJ.jpg" alt="tiven.jpg" class="img">
    <div class="desc">使用mix-blend-mode属性后展示</div>
  </div>
</div>

</body>
</html>
```

展示：

![CSS3混合模式](https://tiven.cn/static/img/img-css-mixin-Q3MIa5RspGOe0Mx1KX6qI.jpg)

使用了混合模式，图片和背景色融合在一起了，展示效果很神奇有木有。

demo演示地址：https://tiven.cn/demo/mix-blend-mode.html

---

欢迎访问：[天问博客](https://tiven.cn/p/5183611c/ "天问博客")

