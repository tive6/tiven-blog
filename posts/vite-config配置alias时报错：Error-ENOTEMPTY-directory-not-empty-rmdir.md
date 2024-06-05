---
title: 'vite.config配置alias时报错：Error: ENOTEMPTY: directory not empty, rmdir'
tags:
- Node
- Vite
- React
categories:
- Vite
abbrlink: 4335e9ee
date: 2022-05-20 00:08:37
---

使用 `vite` 工具构建项目时，为了 `import` 方便，一般会配置 `alias` 别名。例如：**@ 代表 src 目录** 。配置完成后重启服务出现报错：`Error: ENOTEMPTY: directory not empty, rmdir 'D:/project/vite-react/node_modules/.vite/deps'`。

![Vite](https://tiven.cn/static/img/img-vite-02-K96QMI1AHD56Igz67ML5T.jpg)

<!-- more -->

## 一、前言

1. alias 配置：

```js
// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@css': '/src/styles',
    }
  },
})
```

2. 报错日志：

```txt
> vite-react@0.0.0 dev D:\project\vite-react
> vite

error when starting dev server:
Error: ENOTEMPTY: directory not empty, rmdir 'D:/project/vite-react/node_modules/.vite/deps'
    at rmdirSync (fs.js:735:3)
    at removeDirSync (D:\project\vite-react\node_modules\_vite@2.9.9@vite\dist\node\chunks\dep-59dc6e00.js:2566:9)
    at loadCachedDepOptimizationMetadata (D:\project\vite-react\node_modules\_vite@2.9.9@vite\dist\node\chunks\dep-
59dc6e00.js:39428:5)
```

## 二、报错原因

vite 在启动本地服务后，会生成一些缓存文件，以提高性能提升速度。在配置 `alias` 后没有清空缓存文件，所以出现报错。

## 三、解决办法

1. 删除 vite 的缓存目录，默认缓存目录在 `node_modules/.vite` 中，删除 `.vite` 文件夹即可。
2. 还有另一种方法，使用 `--force` 命令行选项，试了几次发现并不好使。于是配置了一个 `npm` 的 `pre` 钩子来处理，当执行 `npm run dev` 命令的时候，会先执行 `rd /s /q node_modules\\.vite` 命令删除缓存目录 `node_modules/.vite`。

**windows** 系统：

```json
{
  "scripts": {
    "predev": "rd /s /q node_modules\\.vite",
    "dev": "vite --host"
  }
}
```

**macOS** 、 **Linux** 系统：

```json
{
  "scripts": {
    "predev": "rm -rf ./node_modules/.vite",
    "dev": "vite --host"
  }
}
```

再次启动服务，一切正常。

---

## Vite 相关系列

* [Vite+Vue3+Vant快速构建项目](https://tiven.cn/p/de241e23/ "Vite+Vue3+Vant快速构建项目 | 天问博客")
* [vue3 + vite实现异步组件和路由懒加载](https://tiven.cn/p/d41c4425/ "vue3 + vite实现异步组件和路由懒加载 | 天问博客")
* [Vite启动后提示Network: use `--host` to expose](https://tiven.cn/p/a57bb1ad/ "Vite启动后提示Network: use `--host` to expose | 天问博客")
* [vite.config配置alias时报错：Error: ENOTEMPTY: directory not empty, rmdir](https://tiven.cn/p/4335e9ee/ "vite.config配置alias时报错：Error: ENOTEMPTY: directory not empty, rmdir | 天问博客")
* [Vue3+Vite+Vant报错Uncaught SyntaxError: The requested module '/node_modules/.vite/vue.js?v=xxxx'](https://tiven.cn/p/7fcc5985/ "Vue3+Vite+Vant报错Uncaught SyntaxError: The requested module '/node_modules/.vite/vue.js?v=xxxx' | 天问博客")

---

欢迎访问：[天问博客](https://tiven.cn/p/4335e9ee/ "天问博客")


