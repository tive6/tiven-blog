---
title: Parcel配置public静态文件目录
tags:
- Node
- Parcel
- 前端工程化
categories:
- webpack / parcel
abbrlink: 1109943e
date: 2022-08-31 10:42:58
---

最近使用 **Parcel** 搭建一个 `Mock Service Worker` （`MSW`）的测试服务，遇到一个问题：在 **MSW** 中注册 `Service Worker` 的文件（`mockServiceWorker.js`）是以静态文件相对路径加载，但是在 `Parcel` 启动的服务中加载不到此文件，导致 `Service Worker` 服务无法注册。  

![Parcel && Public](https://tiven.cn/static/img/img-parcel-02-CNX0p6DL5IpDt52RYJmKR.jpg)

<!-- more -->

## 一、前言

**`Mock Service Worker` (`MSW`) 是一个令人兴奋的 `API` 模拟工具，它使用 `Service Worker` 拦截您的 `HTTP` 请求。这将允许您发出可以使用 DevTools 检查的实际 HTTP 请求，因为 MSW 在服务工作者级别上工作。**
**MSW** 也可以在您的测试代码中使用，这样您就不必为 **HTTP** 响应设置额外的测试模拟。

## 二、问题解析

`Parcel` 默认是将所有文件打包进 `js` 包中，不存在有单独的静态文件目录，类似于 `Vue` 和 `React` 脚手架生成项目的根目录下的 `public/` 文件夹。

## 三、解决方案

下载插件 `parcel-plugin-static-files-copy` 来支持单独的静态文件打包。

1. 安装插件

```shell
npm install -D parcel-plugin-static-files-copy
```

2. 配置 `package.json`

```js
// package.json
{
    // ...
    "staticFiles": {
        "staticPath": "public",
        "watcherGlob": "**"
    }
}
```

3. 重启服务

```shell
npm start
```

**拓展：**

* 多静态文件夹配置

```js
// package.json
{
    // ...
    "staticFiles": {
        "staticPath": ["public", "src/assets"]
    }
}
```

* 指定输出文件夹

```js
// package.json
{
    // ...
    "staticFiles": {
        "staticPath": [
            {
                "outDirPattern": "**/assets",
                "staticPath": "dir1"
            },
            {
                "outDirPattern": "**/static",
                "staticPath": "dir2"
            }
        ]
  },
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/1109943e/ "天问博客-专注于大前端技术")

