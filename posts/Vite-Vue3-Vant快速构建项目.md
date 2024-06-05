---
title: "Vite+Vue3+Vant快速构建项目"
abbrlink: de241e23
date: 2021-12-08 17:20:34
tags:
- Vue
- Vite
- tive-cli
categories:
- 开源造轮子
description: 利用Vite工具可以很轻松生成Vue3工程，但是作为Vue全家桶的vue-router、vuex、axios等成员，需要自己一个一个去配置。于是开发了tive-cli脚手架模板工具，只需短短几个命令便能快速生成配置健全的Vue3全家桶项目，并且集成了VantUI，内置了rem移动端适配，真正做到了开箱即用。
#top: 8
---

随着`Vue3` 和 `Vite` 版本的不断更新完善，开发体验有了质的飞跃。因此，越来越多的大厂也逐步拥抱 `Vue3`。
利用`Vite` 脚手架工具可以很轻松生成以 `Vue3` 为模板的项目，但是作为`Vue`全家桶的 `vue-router`、`vuex`、`axios`等成员，需要自己一个一个去配置。于是便自行开发了本文讲到的 `tive-cli` 脚手架模板工具，只需短短几个命令便能快速生成配置健全的`Vue3全家桶`项目，并且集成了`VantUI`，内置了`rem`移动端适配，真正做到了`开箱即用`。

![Vite + Vue3](https://tiven.cn/static/img/img-tive-cli-5HtE0nI2K7Ug3p0aKGqWj.jpg)

[//]: # (<!-- more -->)

## 一、vue3全家桶模板介绍

### 1.版本依赖

```json
{
  "dependencies": {
    "axios": "^0.21.1",
    "vant": "^3.0.7",
    "vue": "^3.2.24",
    "vue-router": "^4.0.4",
    "vuex": "^4.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^1.1.4",
    "@vue/compiler-sfc": "^3.2.24",
    "autoprefixer": "^10.2.4",
    "lib-flexible": "^0.3.2",
    "postcss-loader": "^4.1.0",
    "postcss-px2rem": "^0.3.0",
    "postcss-px2rem-exclude": "^0.0.6",
    "sass": "^1.32.8",
    "vite": "^2.0.0"
  }
}
```

### 2.全家桶内置集成

1. `vue-router`路由，配置了`路由懒加载`，全局`路由守卫`，组合式API中路由跳转，参数获取。
2. `vuex`状态管理，配置命名空间（`namespaced`）的业务模块（`modules`），`vuex actions`异步状态流管理。 
3. `axios`实例全局引用。
4. `vant`移动端组件库。
5. `lib-flexible`+`rem`移动端适配，默认为`375px`设计稿的适配，若是`750px`的设计稿可调整`remUnit`的值，轻松适配。
6. `sass`预处理器。
7. `vue.config.js`本地跨域处理，更改对应的`url`和`path`即可使用。
8. `nodemon`动态监听`vue.config.js`，有更改自动重启服务，执行`npm run dev`时生效。
9. `Composition API`（`<script setup>`）搭配`ref`和`reactive`数据绑定、`computed`计算属性、`watch`监听、`props`组件传参等等常用API的使用都有完整事例，以供参考。 
10. 配置了 `tive-cli` 自动化执行shell脚本功能。提示： `tive-cli` 工具需要使用 `npm i -g tive-cli` 全局安装。
11. 自动化打包和zip压缩。
12. 提供了 `WebAssembly`（`Wasm`）使用案例，以及对应的交互展示页面。

## 二、安装 `tive-cli` 命令行工具

>前提：`node`和`npm`已经安装可用。

* 像使用`vue-cli`脚手架工具一样，第一步全局安装 `tive-cli` 命令行脚手架工具。

```sh
npm i -g tive-cli
# or
cnpm i -g tive-cli
```

## 三、生成项目

```sh
tive create vue3-demo
```

执行次命令后，会出现命令行交互式选择，可使用上（`↑`）下（`↓`）箭头进行选择，如下：

```txt
E:\dev>tive create vue3-demo
? 请选择要创建的脚手架或Demo (Use arrow keys)
> vue2.0+VantUI移动端Demo
  vue3.0+vite2+VantUI移动端Demo
```

**提示：** 该脚手架内置了`Vue2.0`和`Vue3.0`两个版本所对应的 **Vue全家桶** 模板，可根据项目需要自行选择。

回车（`enter`）确认后，会输出：

```txt
E:\dev>tive create vue3-demo
? 请选择要创建的脚手架或Demo vue3.0+vite2+VantUI移动端Demo
{ tel: 'tive6/tive-vue3-vite-demo' }
√ tive-vue3-vite-demo 下载成功

Done. Now run:

   cd vue3-demo
   npm install
   npm start

```

接下来就可以按照提示的命令进行操作：

```sh
cd vue3-demo

npm install

npm start
```

不出意外项目就成功启动了。

## 四、项目体验

1. 项目展示：![tive-vue3-vite-demo](https://tiven.cn/static/img/img-demo-vue-03-ObdZTqwopBJ4wF6GZoo-0.jpg)
<br>    
2. Demo演示：[地址](https://tiven.cn/tive-vue3-vite-demo/ "tive-vue3-vite-demo")，进入后可以进行交互体验。
3. 附带上`vue2.0+VantUI移动端模板`演示Demo地址：[tive-vue2-mobile-demo](https://tiven.cn/tive-vue2-mobile-demo/ "tive-vue2-mobile-demo")

## 五、注意事项

* px2rem不能转HTML中的内联样式，所以样式请写在css单独文件中或组件的style区域中，详细说明请查看：[Vue项目配置rem移动端适配](https://tiven.cn/p/b1ab6b72/ "Vue项目配置rem移动端适配")

---

## 《Vue3学习与实战》系列

* [Vue3学习与实战 · 组件通信](https://tiven.cn/p/97da9e37/ "Vue3组件通信")
* [Vue3学习与实战 · 全局挂载使用Axios](https://tiven.cn/p/7f7ba3b2/ "全局挂载使用Axios")
* [Vue3学习与实战 · 配置使用vue-router路由](https://tiven.cn/p/3747153d/ "配置使用vue-router路由")
* [Vue3学习与实战 · Vuex状态管理](https://tiven.cn/p/de821c2f/ "Vuex状态管理")
* [vue3 + vite实现异步组件和路由懒加载](https://tiven.cn/p/d41c4425/ "vue3实现异步组件和路由懒加载")
* [Vite+Vue3+Vant快速构建项目](https://tiven.cn/p/de241e23/ "Vite+Vue3+Vant快速构建项目")（本文）

---

欢迎访问：[天问博客](https://tiven.cn/p/de241e23/ "天問博客") 
