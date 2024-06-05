---
title: 'Cannot use [chunkhash] or [contenthash] for chunk in ''[name].[chunkhash].js'''
abbrlink: '4352e508'
date: 2022-01-16 11:01:55
tags:
- Webpack
categories:
- webpack / parcel
description: Vue项目启动本地服务时报错：`Cannot use [chunkhash] or [contenthash] for chunk in '[name].[chunkhash].js' (use [hash] instead)`，经查询发现是webpack配置的问题。
---

**Vue CLI** 构建的项目，执行 `npm run dev` 启动开发服务时报错： `in [name].[chunkhash].js` 、`Cannot use [chunkhash] or [contenthash] for chunk in '[name].[chunkhash].js' (use [hash] instead)`，查询文档后，发现是webpack配置的问题。

![Webpack](https://tiven.cn/static/img/kpl-aguduo-zMZbnVA2cROrVmF2Yg7zK.jpg)

[//]: # (<!-- more -->)

## 报错原因

因为本地服务启动的是 `webpack-dev-server` ,一般都是内置了 `HotModuleReplacementPlugin` 热更新，而这个热更新恰恰与配置的 `chunkhash` 或 `contenthash` 有冲突。所以只能在生产环境（`production`）下使用 `chunkhash` 或 `contenthash` 。

## 解决

根据 **process.env.NODE_ENV** 环境变量来选择是否使用 `chunkhash` 或 `contenthash` 。

修改 `webpack` 配置，这里以Vue的 `vue.config.js` 为例

```js
// vue.config.js

const mode = process.env.NODE_ENV
const isDev = mode === 'development'
module.exports = {
  // ... 其他配置

  // 关键配置
  configureWebpack: {
    output: {
      filename: isDev ? `[name].js` : `[name].[contenthash:5].js`,
      chunkFilename: isDev ? `[name].js` : `[name].[contenthash:5].js`,
    },
  },
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/4352e508/ "天問博客")
