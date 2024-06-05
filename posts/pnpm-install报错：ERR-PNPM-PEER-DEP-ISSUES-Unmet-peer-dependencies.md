---
title: pnpm install出现：ERR_PNPM_PEER_DEP_ISSUES Unmet peer dependencies
tags:
- Node
- pnpm
- npm
categories:
- pnpm / npm / yarn
abbrlink: 310ff420
date: 2022-06-13 11:41:23
---

使用 `pnpm install` 安装项目依赖时出现：`ERR_PNPM_PEER_DEP_ISSUES Unmet peer dependencies`，在 **pnpm github issues** 中找到相关解决方案。

![pnpm && npm](https://tiven.cn/static/img/img-pnpm-01-uuy8Ng5U-8RCd9KU396Kj.jpg)

<!-- more -->

## 一、前言

1. 完整日志

```text
ERR_PNPM_PEER_DEP_ISSUES Unmet peer dependencies

.
└─┬ koa-views
  └─┬ consolidate
    └── ✕ unmet peer react@^16.13.1: found 18.1.0

hint: If you don't want pnpm to fail on peer dependency issues, set the "strict-peer-dependencies" setting to "false".
```

2. 问题原因：在 npm 3 中，不会再强制安装 `peerDependencies` （对等依赖）中所指定的包，而是通过警告的方式来提示我们。**pnpm** 会在全局缓存已经下载过的依赖包，如果全局缓存的依赖版本与项目 `package.json` 中指定的版本不一致，就会出现这种 `hint` 警告。

3. `pnpm` 团队成员给出的解答：
> There are two types of peer deps: optional peer dependencies and non-optional ones. The warnings are only printed for non-optional peer dependencies. If a package works without the peer dependencies, then it should be declared as optional peer dependency. Optional peer dependencies are supported by npm/yarn/pnpm for a long time.


## 二、处理方案

1. 在项目的 `package.json` 中配置 `peerDependencyRules` 忽略对应的警告提示：

```json
{
  "pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": [
        "react"
      ]
    }
  }
}
```

2. 在 `.npmrc` 配置文件中添加 `strict-peer-dependencies=false` ，这意味着将关闭严格的对等依赖模式。操作命令如下：

```shell
npm config set strict-peer-dependencies=false
```

**参考链接：**
* https://github.com/pnpm/pnpm/issues/4684

---

欢迎访问：[天问博客](https://tiven.cn/p/310ff420/ "天问博客")

