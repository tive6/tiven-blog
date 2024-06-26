---
title: 努力一周，开源一个超好用的接口Mock工具——Msw-Tools
tags:
- Vite
- Svelte
- Mock
categories:
- 开源造轮子
abbrlink: a0368a1d
date: 2022-09-27 17:18:28
top: 9
---

作为一名前端开发，是不是总有这样的体验：**基础功能逻辑和页面UI开发很快速，本来可以提前完成，但是接口数据联调很费劲，耗时又耗力，有时为了保证进度还不得不加加班。**
为了摆脱这种痛苦，经过一周的努力，从零开发了一个灵活无依赖，且集成简单的数据接口 Mock 工具——[Msw-Tools](https://www.npmjs.com/package/msw-tools "msw-tools")，已开源到 [NPM](https://www.npmjs.com/ "msw-tools | npm")，希望对前端小伙伴有所帮助。

![Msw-Tools](https://tiven.cn/static/img/img-msw-03-dA86Pu7lh9jy53sdkzhCz.jpg)

[//]: # (<!-- more -->)

## 一、前言

**`Msw-Tools`（Mock Service Worker Tools）是一个基于 `Msw.js` 和 `Svelte` 构建的数据 Mock 工具，用于前后端接口数据联调，方便开发者在不同数据、不同场景下进行功能测试。**

* **`Msw-Tools` 能做什么？**
* **`Msw-Tools` 能做什么？**
* **`Msw-Tools` 能做什么？**

**`Msw-Tools` 以浏览器 `localStorage` 为`数据库`，能让开发者分布式的在浏览器上建立一套独立的接口服务，前端人员在不依赖后端接口完成的情况下走正常的开发调试流程，开发者可以很精确自由的控制哪些接口使用 `Msw-Tools` 提供的本地 `Mock` 数据服务，哪些接口使用后端提供的接口数据服务。** 再也不用担心加班熬夜调接口了，摸鱼什么的统统到碗里来 `^_^`。

>痛点引导需求，需求决定产品。

开发 **Msw-Tools** 最初为了解决我日常开发中遇到的痛点，也就是前边说的，前后端接口数据联调比较耗时，很容易影响开发进度。
早在以前也使用过很多相应的 Mock 方案，但是总感觉不够灵活，而大部分都需要在项目中写 Mock 数据的逻辑代码，这一点是我比较抵制的。因为这样做很容易造成代码耦合，甚至一不小心就会把Mock代码打包到生产环境。

## 二、前端常用的MOCK方案

前端常用的常用的MOCK方案有以下几类：

1. **代码侵入：** 直接在代码中写死 Mock 数据，或者请求本地的 **JSON** 文件，总之，一切需要侵入代码切换环境的行为都是不好的，实际开发中最常用，但不推荐。
2. **接口管理工具：** 代表为 [Apifix](https://www.apifox.cn/ "Apifix")、[Swagger](https://swagger.io/ "swagger")、[Yapi](https://github.com/YMFE/yapi "yapi")、[Moco](https://github.com/dreamhead/moco "moco")、[Rap](https://github.com/thx/RAP "rap")等，配置功能强大，有统一的接口管理后台，查找使用方便。但是重度依赖后端，前端发挥空间小，一般会作为大团队的基础建设而存在，维护成本比较高。
3. **本地 node 服务器：** 代表为 [Json-server](https://www.npmjs.com/package/json-server "json-server | npm")，基于本地 json 文件的增删改查，配置简单，自定义程度高。但是无法随着后端 API 的修改而自动修改。
4. **请求拦截：** 代表为 [Mockjs](http://mockjs.com/ "mockjs")，通过拦截特定的AJAX请求，并生成给定的数据类型的随机数，但是需要在业务代码中调用，有入侵性。
5. **抓包工具：** 代表为 [Charles](https://www.charlesproxy.com/ "Charles") 、[Fiddler](https://www.telerik.com/fiddler "Fiddler") 等软件工具，便于混合开发的问题排查、线上问题排查，但是使用和调试相对繁琐。
6. **组合模式：** 代表为 [Easy-mock](https://github.com/easy-mock/easy-mock "easy-mock")，提供在线服务和接口代理，官网建设中。
7. **其他方案：** 代表为 [Jsonplaceholder](https://jsonplaceholder.typicode.com/ "jsonplaceholder")，直接 fetch 远程的数据，文档简单。

## 三、Msw-Tools 灵感火花

很早以前用过 `mockjs` 来拦截数据，于是就很好奇，网络请求是怎么拦截的？恰好最近在 npm 上看到一个很不错的开源库 [msw](https://www.npmjs.com/package/msw "msw | npm")，原来这个也是做 Mock 数据的。于是就大概看了一下 [mswjs](https://mswjs.io/ "msw | npm")官网介绍，其中提供了很灵活的API，让我们以 **Express** 路由的形式去配置 Mock 接口，但是所有的 mock 数据都是提前在代码中集成的。然后，我就在想能不能由 Mock 调试者或使用者自由的去配置接口 Url 和 Mock 数据，如果能实现，不仅开发者能灵活的配置想要的接口数据，而且测试人员也能很方便的来修改接口数据，以达到测试不同数据、不同场景的情况，并且还能避免修改数据库。

## 四、Msw-Tools 功能特点

- **无框架限制：** 使用 `Svelte` 独立封装的 `Custom Web Components`，像使用 `div、span` 等原生标签一样无感使用，不管是 **Vue2/Vue3、React、Angular、Svelte、SolidJs** 等流行框架，还是传统的多页面 **HTML、JQuery、JSP、PHP** 都可以轻松集成。
- **无侵入性：** 根据开发环境动态加载，与业务功能代码无依赖、无耦合、无关联。
- **配置范围广：** 个性化配置 Mock 接口，Response Data、Status Code、Request Pending Time。
- **控制粒度细：** 可以精确控制到每一个数据接口是否使用 Mock。
- **操作友好性：** 一键编辑，数据格式化，一键配置，即刻生效。
- **数据便捷性：** Mock 数据支持以 JSON 文件的形式一键导入，一键导出。

## 五、接入使用

### Method 1: Using npm：(Recommended)

- install `msw-tools` 和 `msw`

```shell
npm install -D msw-tools

npm install -D msw
```

- install `mockServiceWorker.js`。每个脚手架生成的项目，静态文件目录可能不同，具体请参考：[Common public directories](https://mswjs.io/docs/getting-started/integrate/browser#where-is-my-public-directory "Common public directories")

```shell
npx msw init public/ --save
```

### Method 2: Using CDN in HTML:

```html
<body>
  <msw-tools base="/"></msw-tools>

  <script src="https://unpkg.com/msw-tools@latest/dist/msw-tools.min.umd.js"></script>
</body>
```

## 六、Example

以 **Vue3** 项目为例：

1. 在入口文件 `main.js` 中根据环境来动态加载

```js
// main.js

import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './assets/css/style.scss'

// 只在开发环境使用
if (import.meta.env.MODE === 'development') {
  const MswTools = require('msw-tools')
  new MswTools()
}

const app = createApp(App)

app.use(router).use(store)
app.mount('#app')

```

2. 在根组件 `App.vue` 中使用 `<msw-tools />` 导入

```html
<template>
  <msw-tools :base="env.baseUrl" v-if="env.isDev" />

  <router-view />
</template>

<script setup>
  import { reactive } from 'vue'

  const env = reactive({
    baseUrl: '',
    isDev: true,
  })
  
  const { BASE_URL, MODE } = import.meta.env
  env.baseUrl = BASE_URL
  env.isDev = MODE === 'development'
</script>
```

## 七、参数配置

**base**：开发或生产环境服务的公共基础路径。
* 类型： `string`
* 默认： `/`

使用参照：
1. 访问 URL：`https://tiven.cn`， 对应的 Base：`/`， 使用 `<msw-tools base="/" />`。
2. 访问 URL：`https://tiven.cn/service/` ，对应的 Base：`/service/`，使用 `<msw-tools base="/service/" />`。

需要与打包工具和 **Router** 路由的 **base** 保持一致。请参考：
* **Vite** 的 `base` 配置：[Vite Base](https://cn.vitejs.dev/config/shared-options.html#base "Base | Vite")
* **Vue3** 的 `Router/base` 路由配置：[Vue3 Base](https://router.vuejs.org/zh/api/#createwebhistory "Vue3 | createWebHistory base")

## 八、注意事项

1. `mockServiceWorker.js` 文件只能放在静态文件目录中（`/public`），作为 `Service Worker` 服务的注册文件，不参与打包编译，只能以 **相对路径** 的形式引用，不然 `Service Worker` 服务无法注册，会导致请求拦截不生效。
2. 由于浏览器 `service Worker` API 使用限制：只能在 **https（已安装证书）、localhost、127.0.0.1** 等服务下使用，否则控制台会出现 `[MSW] Mocking enabled (fallback mode)` 日志，也就是说 **http** 域名服务，包括本地 **IP** 服务，例如：`http://10.168.44.123:3000/` 等服务下不可用。

## 九、演示体验

>**Msw-Tools** 在线体验：[msw-tools](https://tiven.cn/service/demos/msw-tools "msw-tools online demo")
>**Msw-Tools** 在线体验：[msw-tools](https://tiven.cn/service/demos/msw-tools "msw-tools online demo")
>**Msw-Tools** 在线体验：[msw-tools](https://tiven.cn/service/demos/msw-tools "msw-tools online demo")

![Msw-Tools](https://tiven.cn/assets/img/msw-tools-demos.gif "msw-tools")

## 十、TODO

* 开启控制台的按钮可拖拽移动 `✔`
* **Msw-Tools** 功能持续优化 `doing`
* 封装 **mswjs** 相关API，减小打包体积
* 规划中...

## 十一、使用反馈

- **Email：** [tw.email@qq.com](mailto:tw.email@qq.com "天问eMail | msw-tools")
- **Issues：** [msw-tools](https://github.com/tive6/msw-tools/issues "Issues | msw-tools")

欢迎广大 **Front-ender** 、**Tester** 体验使用，如有疑问或需求建议请到 [Github Issues](https://github.com/tive6/msw-tools/issues "Issues | msw-tools") 提出。

>闭门造车造轮子，过程很艰难，坚持才有收获。

**Thank you ♪(･ω･)ﾉ**

---

欢迎访问：[天问博客](https://tiven.cn/p/a0368a1d/ "天问博客-专注于大前端技术")

