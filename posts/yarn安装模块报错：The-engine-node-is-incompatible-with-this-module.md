---
title: yarn安装模块报错：The engine 'node' is incompatible with this module
tags:
- Node
- npm
- yarn
categories:
- pnpm / npm / yarn
abbrlink: d06f2bc6
date: 2022-04-27 10:40:33
---

在使用 **yarn** 全局安装 **umi** 脚手架工具时报错：`The engine "node" is incompatible with this module.`

![yarn](https://tiven.cn/static/img/img-yarn-02-yxqjB6cHzG2hmzKs8l2jm.jpg)

[//]: # (<!-- more -->)

## 一、报错原因

主要是因为 `nodejs` 版本冲突了，所以使用 yarn 命令在进行版本检查时报错。

## 二、解决办法

忽略引擎版本检查，设置 **ignore-engines=true** 修复版本不兼容的问题。执行以下命令：

```shell
yarn config set ignore-engines true
```

再次使用 yarn 来构建、下载安装就畅通无阻了。

> 让记录成为一种习惯 ^_^

---

欢迎访问：[天问博客](https://tiven.cn/p/d06f2bc6/ "天问博客")



