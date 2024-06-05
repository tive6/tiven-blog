---
title: 解决H5中IOS手机底部被弹出键盘遮挡问题
tags:
  - H5
  - IOS
  - JS
categories:
  - H5
abbrlink: 635b9e20
date: 2024-01-14 17:20:08
---

在开发移动端的H5应用时，我们经常会遇到一个问题，就是在iOS手机上，当输入框获取焦点并弹出键盘时，键盘会遮挡住页面底部的内容，给用户带来不便。本文将介绍一种很巧妙的解决方案，通过滚动页面的方式，动态的将页面滚动到最底部，以确保底部区域不被键盘遮挡。

![H5 IOS 键盘遮挡](https://tiven.cn/static/img/h5-03-wGyNxWYZ.jpg)

[//]: # (<!-- more -->)

## 解决方案

在 `onFocus` 获取焦点弹出键盘的时候，通过 `scrollIntoView` 方法将页面滚动到最底部，这样就可以确保底部区域不被键盘遮挡。

```js
export function scrollIntoEnd() {
  let $ele = document.body
  $ele?.scrollIntoView({
    // behavior: 'smooth', // 平滑滚动
    block: 'end',
  })
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/635b9e20/ "天问博客-专注于大前端技术")

