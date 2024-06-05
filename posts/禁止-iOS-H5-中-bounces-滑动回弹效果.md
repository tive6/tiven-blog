---
title: 禁止 ios H5 中 bounces 滑动回弹效果
tags:
  - H5
  - CSS3
  - IOS
categories:
  - H5
abbrlink: 33b266e
date: 2024-01-28 16:13:41
---

在开发面向 iOS 设备的 HTML5 应用时，控制页面的滚动行为至关重要，特别是禁用在 Safari 中默认的滑动回弹效果。本文旨在提供一个简洁明了的解决方案，帮助开发者在特定的 Web 应用中禁用这一效果。

![H5 IOS bounces](https://tiven.cn/static/img/h5-01-Vixni482.jpg)

[//]: # (<!-- more -->)

## 1. 什么是滑动回弹效果？

在 iOS 设备上，当用户在 Safari 或其他基于 WebKit 的浏览器中上下滑动页面时，一旦滚动超过边界，就会触发一个名为 **bounces** 的回弹效果。虽然这增强了用户体验，但在某些应用场景下可能需要禁用它。

## 2. 禁用回弹效果的 CSS 方法

简单的 CSS 解决方案是设置 `body` 或具体容器的 `overscroll-behavior` 属性。这个属性允许开发者控制滚动到容器边界时的行为。

`overscroll-behavior` ：使用两个关键字来指定 overscroll-behavior 分别在 x 和 y 轴的值。只用一个值的话，x 和 y 轴都被指定为该值。有以下三个值可用： 

- `auto`：默认值，当用户在滚动到容器边界时，浏览器会自动滚动页面。
- `contain`：设置这个值后，默认的滚动边界行为不变（“触底”效果或者刷新），但是临近的滚动区域不会被滚动链影响到，比如对话框后方的页面不会滚动。
- `none`：临近滚动区域不受到滚动链影响，而且默认的滚动到边界的表现也被阻止。

使用：

```css
body {
  overscroll-behavior-y: none;
}
```

这段代码设置了 `body` 元素的垂直 overscroll 行为为 `none`，有效地禁用了回弹效果。

## 3. 使用 JavaScript 进行精细控制

如果需要更细粒度的控制，比如只在特定元素上禁用回弹效果，可以使用 JavaScript 进行处理。

```javascript
document.addEventListener('touchmove', function(event) {
  if (event.scale !== 1) { 
    event.preventDefault(); 
  }
}, { passive: false });
```

这段代码会阻止在触摸事件中的默认滚动行为，尤其是当页面放大时。

## 4. 处理常见陷阱

在禁用回弹效果时，要注意不要影响到页面的正常滚动功能。确保测试你的解决方案在各种情况下都能平稳运行，包括不同的设备和浏览器环境。

## 5. 结论

禁用 iOS 中 HTML5 页面的滑动回弹效果可以通过 CSS 或 JavaScript 实现。这种方法可以提高那些需要精细滚动控制的应用的用户体验。然而，考虑到默认的回弹效果也能提升体验，建议只在必要时才进行禁用。

参考文档：

- [https://developer.mozilla.org/zh-CN/docs/Web/CSS/overscroll-behavior](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overscroll-behavior)


---

欢迎访问：[天问博客](https://tiven.cn/p/33b266e/ "天问博客-专注于大前端技术")

