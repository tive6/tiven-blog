---
title: MacOS 系统下 electron 常用的程序目录
tags:
- Node
- Electron
- Mac
categories:
- Electron / Tauri
abbrlink: adb73d96
date: 2023-06-22 18:34:30
---

使用 Electron 开发桌面应用，经常需要做数据持久化、查看 log 日志等操作，这就不得不了解一下对应文件存储的位置。

![Electron](https://tiven.cn/static/img/img-electron-02-pznVUBgmCrxh1oUUwK1e3.jpg)

<!-- more -->

## 前言

* 系统：MacOS
* 用户名：tiven
* 应用（软件名称）：Post Tools 

## API

electron 提供了对应的 `getPath` 方法获取相应的目录：

```js
app.getPath(name)
```

name 参数类型：

```ts
Electron.App.getPath(name: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps'): string;
```

## 常用的目录路径和描述

1. home：用户的 home 文件夹（主目录）
  * `/Users/tiven`
2. appData：每个用户的应用程序数据目录
  * `/Users/tiven/Library/Application Support`
3. userData：储存你应用程序配置文件的文件夹
  * `/Users/tiven/Library/Application Support/Post Tools`
4. sessionData：此目录存储由 Session 生成的数据，例如 localStorage，cookies，磁盘缓存，下载的字典，网络 状态，开发者工具文件等
  * `/Users/tiven/Library/Application Support/Post Tools`
5. desktop：当前用户的桌面文件夹
  * `/Users/tiven/Desktop`
6. documents：用户文档目录的路径
  * `/Users/tiven/Documents`
7. downloads：用户下载目录的路径
  * `/Users/tiven/Downloads`
8. logs：应用程序的日志文件夹
  * `/Users/tiven/Library/Logs/Post Tools`


---

欢迎访问：[天问博客](https://tiven.cn/p/adb73d96/ "天问博客-专注于大前端技术")

