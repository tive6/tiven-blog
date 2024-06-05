---
title: css文本超出隐藏
tags:
- Html
- CSS
categories:
- CSS3
abbrlink: c1b24445
date: 2023-02-05 18:13:57
---

记录一下 css 中常用的单行文本超出隐藏、多行文本超出隐藏的方法。

![css3](https://tiven.cn/static/img/img-css-01--0G8QBvgAStc0_UaZvcp_.jpg)

<!-- more -->

## 单行文本超出隐藏

```css
.text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
```

## 多行文本超出隐藏

```css
.box {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
```

## VantUI中内置的文字省略方法

```html
<!-- 最多显示一行 -->
<div class="van-ellipsis">这是一段最多显示一行的文字，多余的内容会被省略</div>

<!-- 最多显示两行 -->
<div class="van-multi-ellipsis--l2">
  这是一段最多显示两行的文字，多余的内容会被省略
</div>

<!-- 最多显示三行 -->
<div class="van-multi-ellipsis--l3">
  这是一段最多显示三行的文字，多余的内容会被省略
</div>
```

---

欢迎访问：[天问博客](https://tiven.cn/p/c1b24445/ "天问博客-专注于大前端技术")

