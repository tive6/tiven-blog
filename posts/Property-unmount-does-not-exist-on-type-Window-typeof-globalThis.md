---
title: Property 'unmount' does not exist on type 'Window & typeof globalThis'
tags:
- TS
- Vue
categories:
- TypeScript
abbrlink: 20891cab
date: 2023-10-03 11:32:02
---

在 Vue3 + Vite + TS 的项目中，接入 **MicroApp** 微前端时，编辑器出现 `TS2339: Property 'unmount' does not exist on type 'Window & typeof globalThis'.` 的错误提示。

![TS](https://tiven.cn/static/img/img-ts-01-Xyj6BEm7dx6FDpFKrbJGp.jpg)

[//]: # (<!-- more -->)

## 问题原因

在 **window** 上挂载了一个 `unmount` 方法，但是 TS 并不知道这个方法的存在，所以会报错。

## 问题解决

在 `shims-vue.d.ts` 或 `vite-env.d.ts` 文件中，当然也可以在 `scr` 目录下新建一个 `types.d.ts` 的类型文件，添加如下代码：

```typescript
interface Window {
  remount: any;
  unmount: any;
  readonly '__MICRO_APP_ENVIRONMENT__': any
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/20891cab/ "天问博客-专注于大前端技术")

