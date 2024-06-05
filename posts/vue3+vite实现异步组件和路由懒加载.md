---
title: vue3 + vite实现异步组件和路由懒加载
abbrlink: d41c4425
date: 2021-09-09 09:54:56
tags:
- Vite
- Vue
- import
categories:
- Vue
#top: 8
---

在 `Vue2` 中，异步组件和路由懒加载处理使用 `import` 就可以很轻松实现。但是在`Vue 3.x` 中异步组件的使用与 `Vue 2.x` 完全不同了。本文就详细讲讲`vue3`中`异步组件`和`路由懒加载`的实现。

![Vue3 异步组件/路由](https://tiven.cn/static/img/img-vue3-o3P3q8Ib9Nmwe82obmD9-.jpg)

<!-- more -->

## 一、前言

### 1-1.三点变化：

1. 异步组件声明方法的改变：`Vue 3.x` 新增一个辅助函数`defineAsyncComponent`，用来显示声明异步组件
2. 异步组件高级声明方法中的 `component` 选项更名为`loader`
3. `loader`绑定的组件加载函数不再接收`resolve`和`reject`参数，而且必须返回一个`Promise`

### 1-2.引入辅助函数`defineAsyncComponent`的原因：

>现在，在 `Vue 3` 中，由于`函数组件`被定义为`纯函数`，异步组件定义需要通过将其包装在一个新的 `defineAsyncComponent helper` 中来显式定义。

## 二、Vue 2.x与Vue 3.x定义比较

### 2-1.异步组件/路由定义比较

* 1.在 `Vue 2.x` 中，声明一个异步组件只需这样：

```js
const asyncPage = () => import('./views/home.vue')
```

* 2.在 `Vue 3.x` 中，异步组件的导入需要使用辅助函数`defineAsyncComponent`来进行显式声明。如下：

```html
<template>
  <div>
    <h2>Async Components</h2>
    <p>异步组件测试</p>
    <child />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const child = defineAsyncComponent(() => import('@/components/async-component-child.vue'))

export default {
  name: 'async-components',
  components:{
    'child': child
  }
};
</script>
```

### 2-2.声明方式比较

* 1.`Vue 2.x`中异步组件的声明有更高级的声明方式。如下：

```js
const asyncPageWithOptions  = {
  component: () => import('./views/home.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
}
```

所以，下面的异步组件声明：

```js
const asyncPage = () => import('./views/home.vue')
```

等价于：

```js
const asyncPageWithOptions  = {
  component: () => import('./views/home.vue')
}
```

* 2.`Vue 3.x`中也可以这样声明异步组件。只是其中的`component`需要改为`loader`。如下：

```js
const asyncPageWithOptions  = defineAsyncComponent({
  loader: () => import('./views/home.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
})
```

### 2-3.异步组件`加载函数`返回比较


* 1.在`Vue 2.x`中接收`resolve`和`reject`：

```js
// 2.x version
const oldAsyncComponent = (resolve, reject) => {
  /* ... */
}
```

* 2.在`Vue 3.x`中始终返回`Promise`：

```js
// 3.x version
const asyncComponent = defineAsyncComponent(
  () => new Promise((resolve, reject) => {
      /* ... */
  })
)
```

Vue 3.x的异步组件加载函数将不再接收`resolve`和`reject`，而且必须始终返回`Promise`。也就是说，工厂函数接收 `resolve` 回调的方式定义异步组件在 `Vue 3.x` 不能使用了。

```js
// 在 Vue 3.x 中不适用
export default {
  components: {
    asyncPage: resolve => require(['@/components/list.vue'], resolve)
  },
}
```

## 三、`Vue3`实践

**提示：** 如果是用`vite`工具来构建项目，在本地开发使用`import`做`路由懒加载`，可以正常加载，但是会报警告；打包到`生产环境`会报错，页面不会正常展示，可以使用以下两种方法来实现。

### 3-1.路由懒加载实现

* 1.`defineAsyncComponent`方法

```js
// router/index.js
import { defineAsyncComponent } from 'vue'
const _import = (path) => defineAsyncComponent(() => import(`../views/${path}.vue`));

const routes = [
  {
    path: '/async-component',
    name: 'asyncComponent',
    component: _import('home'),
  }
];
```

* 2.`import.meta.glob`方法

```js
// 1.上面的方法相当于一次性加载了 views 目录下的所有.vue文件，返回一个对象
const modules = import.meta.glob('../views/*/*.vue');
const modules ={
    "../views/about/index.vue": () => import("./src/views/about/index.vue")
}

// 2.动态导入的时候直接，引用
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ...
    {
      path: 'xxxx',
      name: 'xxxxx',
      // 原来的方式，这个在开发中可行，但是生产中不行
      // component: () => import(`../views${menu.file}`),
      // 改成下面这样
      component: modules[`../views${filename}`]
    }
    // ...          
  ],
})
```

### 3-2.异步组件实现

```html
<template>
  <div>
    <h2>Async Components</h2>
    <p>异步组件测试</p>
    <child></child>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const child = defineAsyncComponent(() => import('@/components/async-component-child.vue'))

export default {
  name: 'async-components',
  components:{
    'child': child
  }
};
</script>
```

## 四、总结

>简单来说，写在`路由`配置文件中的异步加载就是`路由懒加载`的用法，而写在`组件内部`的异步加载就是异步组件用法。

---

## 《Vue3学习与实战》系列

* [Vue3学习与实战 · 组件通信](https://tiven.cn/p/97da9e37/ "Vue3组件通信")
* [Vue3学习与实战 · 全局挂载使用Axios](https://tiven.cn/p/7f7ba3b2/ "全局挂载使用Axios")
* [Vue3学习与实战 · 配置使用vue-router路由](https://tiven.cn/p/3747153d/ "配置使用vue-router路由")
* [Vue3学习与实战 · Vuex状态管理](https://tiven.cn/p/de821c2f/ "Vuex状态管理")
* [vue3 + vite实现异步组件和路由懒加载](https://tiven.cn/p/d41c4425/ "vue3实现异步组件和路由懒加载")（本文）
* [Vite+Vue3+Vant快速构建项目](https://tiven.cn/p/de241e23/ "Vite+Vue3+Vant快速构建项目")

---

欢迎访问：[个人博客地址](https://tiven.cn/p/d41c4425/ "天問博客") 
