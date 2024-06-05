---
title: 解决微信小程序中 '&nbsp;' 空格不生效的问题
tags:
  - 小程序
categories:
  - 小程序
abbrlink: 622f72ab
date: 2023-11-23 11:12:22
---

在微信小程序开发中，我们经常会使用 `&nbsp;` 来表示一个空格。这是因为在 **HTML** 中，空格会被解析为一个普通字符，而不会产生实际的空白间距。而 `&nbsp;` 是一种特殊的字符实体，它被解析为一个不可见的空格，可以在页面上产生真正的空白间距。但是会遇到 `&nbsp;` 空格不生效的问题，本文将介绍解决方法。

![小程序 &nbsp;](https://tiven.cn/static/img/weapp-01-UZsuDKXN.jpg)

[//]: # (<!-- more -->)

## 问题复现

以下代码在微信小程序中运行，会发现 `&nbsp;` 空格不生效，会把 `&nbsp;` 这几个字符原原本本的显示出来。

```html
<view>这是一行文本 &nbsp;&nbsp;&nbsp;&nbsp; 这里需要展示四个空格</view>
```

## 解决方法

将 `view` 组件换成 `text` 组件，并加上属性：`decode="true"` 即可解决问题。

```html
<text decode="true">这是一行文本 &nbsp;&nbsp;&nbsp;&nbsp; 这里需要展示四个空格</text>
```

## Bug & Tip

1. tip: decode可以解析的有 `&nbsp; &lt; &gt; &amp; &apos; &ensp; &emsp;`
2. tip: 各个操作系统的空格标准并不一致。
3. tip: text 组件内只支持 text 嵌套。
4. tip: 除了文本节点以外的其他节点都无法长按选中。
5. bug: 基础库版本低于 2.1.0 时， text 组件内嵌的 text style 设置可能不会生效。

参考文档：https://developers.weixin.qq.com/miniprogram/dev/component/text.html

---

欢迎访问：[天问博客](https://tiven.cn/p/622f72ab/ "天问博客-专注于大前端技术")

