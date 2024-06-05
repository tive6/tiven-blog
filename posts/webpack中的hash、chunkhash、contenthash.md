---
title: webpack中的hash、chunkhash、contenthash
abbrlink: 337f88a7
date: 2022-01-21 11:00:11
tags:
- Webpack
categories:
- webpack / parcel
---

随着前端工程化越来越成熟，目前比较流行的打包工具 `webpack`、`gulp`、`rollup`等等，都全面、系统、科学的支持了打包文件指纹（`hash`）。其中 `webpack` 中有三种形式的指纹，分别是： **hash、chunkhash、contenthash** 。本文就具体讲讲这三种`Hash`各自的作用和使用场景。

![Webpack Hash](https://tiven.cn/static/img/kpl-ailin-02-CTLwCMCZ_MASGAG8AKiNn.jpg)

[//]: # (<!-- more -->)

## 前言

- **文件指纹** 是指打包后输出的文件名和后缀。

文件`hash`：一般是结合`CDN缓存`来使用，通过webpack构建之后，生成对应文件名自动带上对应的`MD5值`。如果文件内容改变的话，那么对应`文件哈希值`也会改变，对应的HTML引用的`URL地址`也会改变，触发`CDN服务器`从源服务器上拉取对应数据，进而更新`本地缓存`。

## hash

**hash：** 是整个项目的hash值，其根据`每次编译`内容计算得到，每次编译之后都会生成新的`hash`,即修改任何文件都会导致 **所有文件的hash发生改变** 。

## chunkhash

**chunkhash：** `chunkhash`和`hash`不一样，它根据不同的入口文件(`Entry`)进行依赖文件解析、构建对应的`chunk`，生成对应的哈希值。我们在生产环境里把一些`公共库`和程序`入口文件`区分开，单独打包构建，接着我们采用`chunkhash`的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。

场景：如果采用hash计算的话，每一次构建后生成的哈希值都不一样，即使文件内容压根没有改变。这样子是没办法实现`缓存`效果，我们需要换另一种哈希值计算方式，即 `chunkhash`。

## contenthash

**contenthash：** 使用`chunkhash`存在一个问题，就是当在一个JS文件中引入CSS文件，编译后它们的`hash`是相同的，而且只要js文件发生改变 ，关联的css文件hash也会改变,这个时候可以使用mini-css-extract-plugin里的`contenthash`值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建。


## 指纹占位符

|占位符|含义|
|:---:|:---:|
|ext|资源后缀名|
|name|文件名称|
|path|文件的相对路径|
|folder|文件所在的文件夹|
|hash|每次webpack构建时生成一个唯一的hash值|
|chunkhash|根据chunk生成hash值，来源于同一个chunk，则hash值就一样|
|contenthash|根据内容生成hash值，文件内容相同hash值就相同|

_提示：_ **hash、chunkhash、contenthash** 可以设定长度，类似这样定义`[hash:5]`。

配置使用：

```js
// vue.config.js

const mode = process.env.NODE_ENV
const isDev = mode === 'development'
module.exports = {
  // ... 其他配置

  // 关键配置
  configureWebpack: {
    output: {
      filename: isDev ? `[name].js` : `[name].[chunkhash:5].js`,
      chunkFilename: isDev ? `[name].js` : `[name].[chunkhash:5].js`,
    },
  },
}
```

**注意：** 本地开发环境不要配置 `chunkhash` 或 `contenthash`，因为编译后文件只存在于内存中，没有实际的磁盘文件，也会与`热更新`功能冲突。

---

欢迎访问：[天问博客](https://tiven.cn/p/337f88a7/ "天問博客")
