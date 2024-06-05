---
title: n 管理 nodejs 版本不生效问题
tags:
  - Node
  - n
  - brew
categories:
  - Node
abbrlink: cca3a973
date: 2023-10-06 15:50:18
---

最近搭建鸿蒙开发环境，需要安装 **node v16.19.1** 的版本，因为之前安装的是 **node v20.x** 的版本，所以需要降级，使用 n 工具切换版本后，发现 nodejs 版本还是之前的，切换没有生效。

![n && brew](https://tiven.cn/static/img/nodejs-01-gv0ZongC.jpg)

[//]: # (<!-- more -->)

## 问题原因

使用 `n` 工具切换 nodejs 版本时，会将 nodejs 的可执行文件链接到 `/usr/local/bin` 目录下，而 `brew` 安装的 nodejs 可执行文件在 `/usr/local/opt/node@16/bin` 目录下，所以切换版本后，`brew` 安装的 nodejs 版本不会生效。

## 解决方法

将 `brew` 安装的 nodejs 可执行文件链接到 `/usr/local/bin` 目录下，如下：

```bash
brew unlink node
```

再次使用 `which node` 命令查看 nodejs 可执行文件路径，发现已经链接到 `/usr/local/bin` 目录下。

使用 n 工具切换，如下：

```bash
n use 16.19.1
```

使用 `node -v` 命令查看 nodejs 版本，发现已经切换成功。

```bash
node -v
```

---

欢迎访问：[天问博客](https://tiven.cn/p/cca3a973/ "天问博客-专注于大前端技术")

