---
title: 基于Node和Electron开发了轻量版API接口请求调试工具——Post-Tool
abbrlink: 4dc21784
date: 2022-01-14 17:36:53
tags:
- node
- React
- Electron
categories:
- 开源造轮子
top: 8
description: Post-Tool 就是基于 Node.js、React.js、Electron.js 和 Axios.js 开发的轻量版API接口请求调试工具。
---

**Electron** 是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 `Chromium` 和 `Node.js` 到 二进制的 `Electron` 允许您保持一个 `JavaScript` 代码代码库，支持跨平台，一套代码可同时打包为Windows、macOS、Linux应用。
而 **Post-Tool** 就是基于 **Node.js、React.js、Electron.js 和 Axios.js** 开发的轻量版API接口请求调试工具。 

![Post-Tool](https://tiven.cn/static/img/img-post-tool-RQRg1E7_FxKwhMgeCYOPX.jpg)

[//]: # (<!-- more -->)

## 前言

作为前端开发，经常要和后端联调数据接口，所以就需要一个好的http/https接口调试工具。之前用的比较多的就是`postman`，用过的可能都知道，postman安装包超级大，启动比较慢，还比较耗内存。如果开发的时候，打开的工具或进程比较多，再去使用postman，可能你就有砸键盘的冲动。
所以我曾经考虑使用其他工具来代替，但是一直没有找到合适的替代品。后来根据调研得知，使用`Electron`可以构建桌面应用，然后就突发灵感： **web端有跨域问题，但是服务端`NodeJs`就可以完美避开跨域。** 因此就开发了这个轻量版API接口请求调试工具——`Post-Tool`。

## 功能介绍

1. 支持http/https的`GET`和`POST`请求。
2. 请求参数有`Form`表单录入和`JSON`录入两种形式。
3. 可自定义传入`Headers`请求头参数。
4. 展示完整的请求返回结果： **status、statusText、headers、config、data** 。并可自由选择展示为`树形`结构和`JSON`结构。
5. Data数据独立展示。
6. 记录每一次的请求，并保存到本地，提供历史请求列表和分页，可以快捷的再次请求，并回填url和参数。


## 工具展示

- 请求参数 `Params`

![Post-Tool Params](https://tiven.cn/download/post-tool-01.jpg)

- 请求头 `Headers`

![Post-Tool Headers](https://tiven.cn/download/post-tool-02.jpg)

- 请求返回体 `Response`

![Post-Tool Response](https://tiven.cn/download/post-tool-03.jpg)

- 请求结果数据 `Data`

![Post-Tool Data](https://tiven.cn/download/post-tool-04.jpg)

- 请求历史 `History`

![Post-Tool History](https://tiven.cn/download/post-tool-05.jpg)

## 在线查看和下载

地址：[进入](https://tiven.cn/service/tools/post-tool "Post-Tool工具")

进入后可点击右上角按钮下载`Post-Tool`安装包。

欢迎下载安装体验，可以在下边的评论提需求和建议 ^_^

---

欢迎访问：[天问博客](https://tiven.cn/p/4dc21784/ "天問博客") 
