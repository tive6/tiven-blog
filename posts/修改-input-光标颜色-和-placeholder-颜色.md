---
title: 修改 input 光标颜色 和 placeholder 颜色
tags:
  - CSS3
categories:
  - CSS3
abbrlink: f1de9271
date: 2024-01-03 19:58:42
---

在前端开发中，美观的用户界面往往是吸引用户的重要因素之一。定制化输入框（`Input`）的外观是其中的一个关键点，而修改光标颜色和 `Placeholder` 颜色是实现这一目标的一部分。在本篇博客中，我将介绍如何使用 CSS 来轻松地实现这两个效果。

![CSS Input](https://tiven.cn/static/img/img-css-01--0G8QBvgAStc0_UaZvcp_.jpg)

<!-- more -->

## 一、修改 Input 光标颜色

1. 如果要同时修改 Input 的文字颜色和光标颜色，可以使用 `color` 属性。

```css
/* 修改文字颜色为红色，光标颜色为红色 */
input {
  color: red;
}
```

2. 如果仅仅修改 Input 的光标颜色，我们可以使用 `caret-color` 属性。这个属性允许我们指定光标的颜色，让用户输入时更符合整体设计。

```css
/* 修改光标颜色为红色 */
input {
  caret-color: red;
}
```

在上面的例子中，我们将光标的颜色设置为红色。您可以根据实际需求调整颜色值。

## 二、修改 Placeholder 颜色

占位符（`Placeholder`）是在输入框为空时显示的文本，通常用于提示用户输入内容。修改 Placeholder 的颜色也是改善输入框外观的一种方式。我们可以使用 `::placeholder` 伪元素来实现这个效果。

```css
/* 修改 Placeholder 颜色为灰色 */
input::placeholder {
  color: gray;
}
```

兼容写法：

```css
input::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #666;
}
input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #666;
}
input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #666;
}
input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #666;
}
```

在上面的例子中，我们将 Placeholder 的颜色设置为灰色。同样，您可以根据设计需要选择合适的颜色。

如果您希望同时修改光标颜色和 Placeholder 颜色，可以将上述两段 CSS 合并到一起。

```css
/* 修改光标颜色为红色，Placeholder 颜色为灰色 */
input {
  caret-color: red;
}

input::placeholder {
  color: gray;
}
```

通过以上简单的 CSS 调整，您可以轻松地实现定制化输入框的光标颜色和 Placeholder 颜色，使用户界面更加吸引人。

---

欢迎访问：[天问博客](https://tiven.cn/p/f1de9271/ "天问博客-专注于大前端技术")

