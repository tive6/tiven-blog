---
title: "Vue3+Vite+Vant报错Uncaught SyntaxError: The requested module '/node_modules/.vite/vue.js?v=xxxx'"
abbrlink: 7fcc5985
date: 2021-12-07 18:04:46
tags:
- Vue
- Vant
- Vite
categories:
- Vite
---

在使用 `Vue3` + `Vite` + `Vant` 搭建移动端项目时报错 **Uncaught SyntaxError: The requested module '/node_modules/.vite/vue.js?v=xxxx'** 。

![Vue3+Vite+Vant](https://tiven.cn/static/img/img-vite-01-qXyz73DxsLe-cWhwRDezi.jpg)

<!-- more -->

## 原因

在开发过程中`Vue3`的依赖版本有变更，直接使用的`npm install`下载新的版本，会导致`node_modules`下存在旧版本的缓存，从而影响了本地项目的启动编译。

## 解决方案

1. 删除项目的 `node_modules` 文件夹，如果根目录存在 `package-lock.json` ，最好也一并删除。

2. 修改 `package.json` ，`vue` 的版本如下：

```txt
"dependencies": {
    "axios": "^0.21.1",
    "vant": "^3.0.7",
    "vue": "^3.2.24",
    "vue-router": "^4.0.4",
    "vuex": "^4.0.0"
}
```

3. 重新 `npm install`

```sh
npm install
```

再 `npm run dev` 重启服务，报错问题就完美解决了。

---

## Vite 相关系列

* [Vite+Vue3+Vant快速构建项目](https://tiven.cn/p/de241e23/ "Vite+Vue3+Vant快速构建项目 | 天问博客")
* [vue3 + vite实现异步组件和路由懒加载](https://tiven.cn/p/d41c4425/ "vue3 + vite实现异步组件和路由懒加载 | 天问博客")
* [Vite启动后提示Network: use `--host` to expose](https://tiven.cn/p/a57bb1ad/ "Vite启动后提示Network: use `--host` to expose | 天问博客")
* [vite.config配置alias时报错：Error: ENOTEMPTY: directory not empty, rmdir](https://tiven.cn/p/4335e9ee/ "vite.config配置alias时报错：Error: ENOTEMPTY: directory not empty, rmdir | 天问博客")
* [Vue3+Vite+Vant报错Uncaught SyntaxError: The requested module '/node_modules/.vite/vue.js?v=xxxx'](https://tiven.cn/p/7fcc5985/ "Vue3+Vite+Vant报错Uncaught SyntaxError: The requested module '/node_modules/.vite/vue.js?v=xxxx' | 天问博客")

---

欢迎访问：[天问博客](https://tiven.cn/p/7fcc5985/ "天問博客") 

