---
title: 使用nrm use npm出现const open=require(open)的问题
tags:
- nrm
- npm
categories:
- pnpm / npm / yarn
abbrlink: a997c659
date: 2023-02-26 15:11:04
---

使用 **nrm** 管理 npm 的镜像，当执行 nrm 相关命令是却出现报错：`const open = require('open');`。

![npm && nrm](https://tiven.cn/static/img/img-npm-02-fxFXF8douEz-BeV-vnEmk.jpg)

[//]: # (<!-- more -->)

## 问题原因

因为 **nrm** 依赖于一个名为 **open** 的 npm 包。

## 问题解决

npm 全局安装 open 

```shell
npm i -g open
# or
pnpm i -g open
```

如果还出现报错，可降低 open 的版本。
尝试安装 8.x.x 的版本，如：

```shell
pnpm i -g open@8
```

安装完 open 之后，使用 nrm ls 测试一下。

```shell
PS D:\project\hexo> nrm ls

  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/

```

出现以上展示说明 **nrm** 可正常使用了。

---

欢迎访问：[天问博客](https://tiven.cn/p/a997c659/ "天问博客-专注于大前端技术")

