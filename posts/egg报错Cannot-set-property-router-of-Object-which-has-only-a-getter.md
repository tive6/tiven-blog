---
title: 'egg报错Cannot set property router of #<Object> which has only a getter'
tags:
- Node
- Egg.js
categories:
- Egg.js
abbrlink: 27a86fd6
date: 2023-06-20 11:34:48
---

最近使用 **pnpm** 安装 `egg-init egg-example --type=simple` 生成项目的依赖，在运行后请求路由出现报错：`TypeError: Cannot set property router of #<Object> which has only a getter`。

![Egg.js](https://tiven.cn/static/img/eggjs-01-t4dYaNtm.jpg)

[//]: # (<!-- more -->)

## 报错原因

使用 **pnpm** 安装项目依赖，会锁定版本依赖。

## 问题解决

解决锁定版本依赖，有以下两种方案，可以根据自己的项目情况来选择。

1. 使用 **npm** 安装，删除 `node_modules` 和 `yarn.lock` 、 `pnpm-lock.yaml` 等文件，然后重新安装。

```shell
rm -rf node_modules yarn.lock pnpm-lock.yaml

npm i --no-package-lock
```

2. 使用 **pnpm** 安装，删除 **package.json** 中 egg 的依赖项，重新安装 **egg** 最新的版本。

```shell
pnpm add -D egg
```

参考文档：https://github.com/eggjs/egg/issues/3457

---

欢迎访问：[天问博客](https://tiven.cn/p/27a86fd6/ "天问博客-专注于大前端技术")

