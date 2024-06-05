---
title: scrollIntoView 导致外层滚动问题解决
tags:
- JS
- H5
categories:
- JavaScript
abbrlink: 10d9b5b9
date: 2023-08-02 19:34:50
---

最近使用 `scrollIntoView` 方法实现一个移动端 H5 的吸底效果，但是在使用过程中发现了一个问题，就是在使用 **scrollIntoView** 方法后，外层（`body`）的滚动条也会跟着滚动，大大影响用户体验，经过白班折腾，最后使用 `scrollTop` 代替 `scrollIntoView` 实现滚动。

![scrollTop & scrollIntoView](https://tiven.cn/static/img/js-scroll-ya3srwz1.jpg)

[//]: # (<!-- more -->)

## 问题复现

如上图所示，下方的红色区域是一个滚动视口 (`scrollParentEle`)，蓝色区域是我们要滚动的内容(`srcollContentEle`)，使用 `scrollIntoView` 方法滚动 `srcollContentEle` 内容。

```js
// scrollContentEle 吸底
scrollContentEle.scrollIntoView({ behavior: 'smooth', block: 'end' });
```
 
这样实现能达到 `scrollContentEle` 的吸底效果，但是会发现外层（绿色部分）的滚动条也会跟着滚动。

## 解决方案

使用 **scrollTop** 代替 **scrollIntoView** 实现滚动，`scrollContentEle.offsetHeight` 是需要滚动吸底内容的高度，当然也可以根据具体需求来计算这个值，示例代码如下：

```js
scrollParentEle.scrollTop = scrollContentEle.offsetHeight;
```

## scrollTop 和 scrollIntoView 的区别

* **scrollTop** 是作用于父级视口元素
* **scrollIntoView** 是作用于需要滚动的元素

参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop

---

欢迎访问：[天问博客](https://tiven.cn/p/10d9b5b9/ "天问博客-专注于大前端技术")

