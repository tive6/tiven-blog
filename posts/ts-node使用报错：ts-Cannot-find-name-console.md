---
title: ts-node使用报错：Cannot find name 'console'
abbrlink: e4f8cbf2
date: 2022-04-18 15:43:17
tags:
- Node
- TS
- npm
categories:
- TypeScript
description: ts-node运行ts代码报错：Cannot find name 'console'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'
---

`ts-node` 是一个可以直接运行 `ts` 文件的 `npm` 工具包。如果是初次使用，直接运行 `typescript` 代码可能会遇到这种报错：`Cannot find name 'console'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.`。本文介绍一下两种解决方法。

![ts-node](https://tiven.cn/static/img/kpl-direnjie-WNPM9MKWYUHoO46xkxGSE.jpg)

[//]: # (<!-- more -->)

## 一、完整报错

```txt
D:\dev\node\node_modules\ts-node\src\index.ts:820
    return new TSError(diagnosticText, diagnosticCodes);
           ^
TSError: ⨯ Unable to compile TypeScript:
demo.ts:11:1 - error TS2584: Cannot find name 'console'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.

11 console.log(n)
   ~~~~~~~

    at createTSError (D:\dev\nvm\v12.5.0\node_modules\ts-node\src\index.ts:820:12)
    at reportTSError (D:\dev\nvm\v12.5.0\node_modules\ts-node\src\index.ts:824:19)
    at getOutput (D:\dev\nvm\v12.5.0\node_modules\ts-node\src\index.ts:1014:36)
    at Object.compile (D:\dev\nvm\v12.5.0\node_modules\ts-node\src\index.ts:1322:43)
    at Module.m._compile (D:\dev\nvm\v12.5.0\node_modules\ts-node\src\index.ts:1454:30)
    at Module._extensions..js (internal/modules/cjs/loader.js:787:10)
    at Object.require.extensions.<computed> [as .ts] (D:\dev\nvm\v12.5.0\node_modules\ts-node\src\index.ts:1458:12)
    at Module.load (internal/modules/cjs/loader.js:643:32)
    at Function.Module._load (internal/modules/cjs/loader.js:556:12)
    at Function.Module.runMain (internal/modules/cjs/loader.js:839:10) {
  diagnosticCodes: [ 2584 ]
}
```

## 二、解决方法

以下两种方法任选其一即可：

1. `ts-node` 版本过高，降低一下版本就好了。

```shell
npm i -g ts-node@8.5.4
```

2. 全局安装 `ts-node` 运行依赖包 `tslib` 和 `@types/node`。

```shell
npm i -g tslib @types/node
```

---

欢迎访问：[天問博客](https://tiven.cn/p/e4f8cbf2/ "天問博客")

