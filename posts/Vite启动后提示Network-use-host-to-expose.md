---
title: 'Vite启动后提示Network: use `--host` to expose'
abbrlink: a57bb1ad
date: 2021-05-07 10:02:25
tags:
- Vite
- Vue
categories:
- Vite
---

当使用 `Vite` 构建项目后，发现只有`localhost` + `端口` 服务，没有 `IP` + `端口`服务。
运行`npm run dev`，终端提示`Vite启动后提示Network: use '--host' to expose`。

![Vite](https://tiven.cn/static/img/img-vite-01-qXyz73DxsLe-cWhwRDezi.jpg)

<!-- more -->

## package.json中脚本配置

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "serve": "vite preview"
}
```

## 问题复现

当运行 `npm run dev | serve` 命令时，会显示一下内容。

```sh
> vite-vue-demo@1.0.0
> vite | vite preview

vite v2.5.1 build preview server running at:

> Local: http://localhost:3000 | 5000/
> Network: use `--host` to expose
```

## 解决 

* 配置`vite.config.js`

```js
export default defineConfig(({ mode })=>({
  // ..
  server: {
    host: '0.0.0.0',
  },
  // ..
}))
```

* 配置`package.json`

```json
"scripts": {
  "dev": "vite --host",
  "build": "vite build",
  "serve": "vite preview --host"
}
```

## 执行`npm run dev`命令

```sh
vite v2.5.1 dev server running at:

> Local:    http://localhost:3000/
> Network:  http://xxx.xx.xxx.xx:3000/
```

---

## 《Vue3学习与实战》系列

* [Vue3学习与实战 · 组件通信](https://tiven.cn/p/97da9e37/ "Vue3组件通信")
* [Vue3学习与实战 · 全局挂载使用Axios](https://tiven.cn/p/7f7ba3b2/ "全局挂载使用Axios")
* [Vue3学习与实战 · 配置使用vue-router路由](https://tiven.cn/p/3747153d/ "配置使用vue-router路由")
* [Vue3学习与实战 · Vuex状态管理](https://tiven.cn/p/de821c2f/ "Vuex状态管理")
* [vue3 + vite实现异步组件和路由懒加载](https://tiven.cn/p/d41c4425/ "vue3实现异步组件和路由懒加载")
* [Vite+Vue3+Vant快速构建项目](https://tiven.cn/p/de241e23/ "Vite+Vue3+Vant快速构建项目")

---

欢迎访问：[个人博客地址](https://tiven.cn/p/a57bb1ad/ "天問博客")
