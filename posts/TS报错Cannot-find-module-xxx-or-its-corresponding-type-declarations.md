---
title: TS报错Cannot find module 'xxx' or its corresponding type declarations
tags:
- TS
- npm
- Vite
categories:
- TypeScript
abbrlink: 9a54f6b7
date: 2023-05-18 15:28:37
---

最近使用 vite + vue3 + ts 开发一个文本标注的 web 平台，在项目中使用了一个 `js-mark` 的 npm 包，但是在 import 导入后出现了 TS 报错：`TS2307: Cannot find module 'js-mark' or its corresponding type declarations.`、`无法解析模块 'js-mark' 的定义`。

![TS declare module](https://tiven.cn/static/img/img-ts-01-Xyj6BEm7dx6FDpFKrbJGp.jpg)

<!-- more -->

## 报错原因

依赖引入报错是因为ts没有识别当前引入的依赖

## 问题解决

在 `src/vite-env.d.ts` 文件中声明该依赖即可解决，语法：`declare module "xxx"`。

例：声明 `js-mark` 模块依赖：

```ts
/// <reference types="vite/client" />

declare module "js-mark";

// 解决找不到模块“*.vue”或其相应的类型声明。
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```


---

欢迎访问：[天问博客](https://tiven.cn/p/9a54f6b7/ "天问博客-专注于大前端技术")

