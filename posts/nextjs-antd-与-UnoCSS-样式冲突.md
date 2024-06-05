---
title: nextjs + antd 与 UnoCSS 样式冲突
tags:
- React
- UnoCSS
- NextJS
categories:
- React
abbrlink: 3b6e2011
date: 2023-11-06 16:05:46
---

使用 nextjs + UnoCSS 框架开发项目时，引入 antd 组件库，发现样式冲突，导致 antd 的按钮组件变成透明的了，如下图。

![antd 与 UnoCSS 样式冲突](https://tiven.cn/static/img/unocss-01-qUMPFlsn.jpg)

<!-- more -->

## 问题原因

集成 UnoCSS 时，导入了推荐的重置样式 `@unocss/reset/tailwind.css` 文件，与 antd 组件库样式冲突，如下：

```jsx
// pages/_app.js

import '@unocss/reset/tailwind.css'
import 'uno.css'

// ...
```

冲突的样式：

```css
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}
```

## 解决方案

使用 `'@unocss/reset/tailwind-compat.css'` 文件替换 `'@unocss/reset/tailwind.css'` 文件，如下：
这个样式表基于 [Tailwind reset](https://alfred-skyblue.github.io/unocss-docs-cn/guide/style-reset#tailwind "Tailwind reset")，只是去除了按钮的背景颜色覆盖，以避免与 UI 框架发生冲突。

```jsx
// pages/_app.js

import '@unocss/reset/tailwind-compat.css'
import 'uno.css'

// ...
```

解决后的样式：

```css
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  /*background-color: transparent; !* 2 *!*/
  background-image: none; /* 2 */
}
```

参考文档：

- https://alfred-skyblue.github.io/unocss-docs-cn/guide/style-reset#tailwind-compat
- https://alfred-skyblue.github.io/unocss-docs-cn/integrations/next
- https://github.com/unocss/unocss/issues/2127

---

欢迎访问：[天问博客](https://tiven.cn/p/3b6e2011/ "天问博客-专注于大前端技术")

