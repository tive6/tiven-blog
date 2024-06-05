---
title: Vite3 + Svelte3构建Web应用报错：'process is not defined'
tags:
- Vite
- Svelte
categories:
- Vite
abbrlink: f040b1b8
date: 2022-09-18 13:07:32
---

**Vite爬坑日记：** 在使用 `Vite3 + Svelte3` 构建 Web 应用时，控制台报错：`process is not defined`。

![Vite](https://tiven.cn/static/img/img-svelte-01-hhx5v16WhRd3jTpXst242.jpg)

<!-- more -->

## 问题原因

在 **Vite** 中 `process.env` 全局环境变量被移除了，相当于 `process.env = null`，如果项目中有依赖 `process.env` 这个对象，并进行了 **get/set** 操作时就会出现报错。

## 解决办法

* 在 `vite.config.js` 配置文件中增加 `define: { "process.env": {} } `

```js
import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
  define: {
    "process.env": {}
  }
})
```

**PS：** 这里涉及到 **Vite3** 配置 / *共享选项* 中的 **define** 变量。[官网地址](https://cn.vitejs.dev/config/shared-options.html#define "Vite共享配置 | define")

>**define**
类型： Record<string, string>
定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。

---

欢迎访问：[天问博客](https://tiven.cn/p/f040b1b8/ "天问博客-专注于大前端技术")

