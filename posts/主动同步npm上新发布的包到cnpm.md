---
title: 主动同步npm上新发布的包到cnpm
tags:
- Node
- npm
categories:
- pnpm / npm / yarn
abbrlink: d44c603d
date: 2022-09-08 15:44:51
---

由于各种原因 `npm install` 的速度比较慢，通常会使用 cnpm 来代替 npm 下载，而 cnpm 同步会有延迟，所以需要主动同步npm的包到cnpm。

![NPM](https://tiven.cn/static/img/img-npm-02-fxFXF8douEz-BeV-vnEmk.jpg)

[//]: # (<!-- more -->)

## 背景

cnpm 同步频率目前为 **10分钟** 一次与 npm 官方服务同步。如果是自己开发的新包，想要快速的在项目中使用 cnpm 下载安装，难免会报错：`Install fail! Error: [msw-tools@^1.0.7] Can't find package msw-tools@^1.0.7`，这就说明在 cnpm 上还未找到对应版本的包。

## 主动同步

打开 cnpm 官网：[传送门](https://npmmirror.com/package/package 'cnpm')，如下图所示：

![CNPM Package](https://tiven.cn/static/img/img-cnpm-01-DhryQCjkmwe3GM7tXd4aT.jpg)

在搜索框中检索到想要同步的包，点击下边 `YSNC` 链接，就进入了包同步页面，如下图所示，等待一会就会提示（`Sync msw-tools complete!`）同步完成。

![CNPM SYNC](https://tiven.cn/static/img/img-cnpm-02-kO1e2D8_h4i7T1lmfNdig.jpg)

---

欢迎访问：[天问博客](https://tiven.cn/p/d44c603d/ "天问博客-专注于大前端技术")

