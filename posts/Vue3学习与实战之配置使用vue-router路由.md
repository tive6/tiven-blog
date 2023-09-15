---
title: Vue3学习与实战 · 配置使用vue-router路由
abbrlink: 3747153d
date: 2021-11-26 16:02:41
tags:
- Vue
- Router
categories:
- Vue
top: 12
---

随着Vue版本的升级，`Vue 2.x`项目和`Vue 3.x`项目在使用vue-router上有些区别，本文就简单介绍下`vue-router`在`Vue3`中的配置和使用。

![Vue3 Router](https://tiven.cn/static/img/img-router-01-JeCRj_iQtGO4jfFUoctpg.jpg)

<!-- more -->

## 一、目录结构

```txt
demo/
    package.json
    vite.config.js
    index.html
    public/
    src/
        api/
        assets/
        common/
        components/
        store/
        views/
            home.vue
            list.vue
        router/
            index.js
        App.vue
        main.js            
```

## 二、版本依赖

>`vite`: ^2.0.0
`vue`: ^3.2.8
`vue-router`: ^4.0.1

## 三、配置路由

* 3-1.配置`src/router/index.js`路由文件

```js
// src/router/index.js

import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import { defineAsyncComponent } from 'vue'

const router = createRouter({ 
  // history: createWebHashHistory(),  // hash 模式
  history: createWebHistory(),  // history 模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: defineAsyncComponent(() => import(`../views/home.vue`)),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/list',
      name: 'list',
      component: defineAsyncComponent(() => import(`../views/list.vue`)),
      meta: {
        title: '列表页',
      },
    },
    {
      path: '/*',
      redirect: '/',
    },
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next)=>{
  // console.log(to, from)
  if (to.meta.title) {
    document.title = `${to.meta.title}`;
  }
  next()
})

router.afterEach((to, from)=>{
  // console.log(to, from)
  console.log('afterEach')
})

export default router
```

**说明：**
* 路由模式：
    1. `history`模式对应`createWebHistory()`方法
    2. `hash`模式对应`createWebHashHistory()`方法
* 路由懒加载：在`vite+Vue3`项目中使用`import()`会有报错，所以使用vue提供的一个方法`defineAsyncComponent`，详见另一篇：[vue3 + vite实现异步组件和路由懒加载](https://www.tiven.cn/p/d41c4425/ "Vue3异步组件和路由懒加载")

* 3-2.在`src/main.js`入口文件中注册使用路由

```js
// src/main.js

import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// ...

const app = createApp(App)

app.use(router).use(store);
app.mount('#app')
```

* 3-3.在`src/App.vue`文件中使用`<router-view/>`

```html
// src/App.vue

<template>
  <router-view/>
</template>
```

## 四、使用路由

* 4-1.在`Option API`中使用和`Vue 2.x`中使用没有差别。如下：

```html
<template>
  <div></div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      // 路由跳转 && 设置参数
      this.$router.push({
        path: '/list',
        query: {
          id: 123,
        },
      })
      
      // 获取参数
      let { id } = this.$route.query
    },
  }
</script>
```

* 4-2.在`Composition API`中不能再直接访问 `this.$router` 或 `this.$route`，所以要使用 `useRouter` 和 `useRoute` 函数。

```html
<template>
  <div></div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
  import ajax from "./ajax";

  export default {
    setup () {
      const router = useRouter()
      const route = useRoute()

      // 路由跳转 && 设置参数
      router.push({
        path: '/list',
        query: {
          id: 123,
        },
      })

      // 获取参数
      let { id } = route.query

      // 局部路由守卫
      onBeforeRouteLeave((to, from) => {
        const answer = window.confirm(
          '是否要离开本页面？'
        )
        // 取消导航并停留在同一页面上
        if (!answer) return false
      })

      const userData = ref()

      onBeforeRouteUpdate(async (to, from) => {
        //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
        if (to.params.id !== from.params.id) {
          userData.value = await ajax(to.params.id)
        }
      })

    },
  }
</script>
```

---

## 《Vue3学习与实战》系列

* [Vue3学习与实战 · 组件通信](https://tiven.cn/p/97da9e37/ "Vue3组件通信")
* [Vue3学习与实战 · 全局挂载使用Axios](https://tiven.cn/p/7f7ba3b2/ "全局挂载使用Axios")
* [Vue3学习与实战 · 配置使用vue-router路由](https://tiven.cn/p/3747153d/ "配置使用vue-router路由")（本文）
* [Vue3学习与实战 · Vuex状态管理](https://tiven.cn/p/de821c2f/ "Vuex状态管理")
* [vue3 + vite实现异步组件和路由懒加载](https://tiven.cn/p/d41c4425/ "vue3实现异步组件和路由懒加载")
* [Vite+Vue3+Vant快速构建项目](https://tiven.cn/p/de241e23/ "Vite+Vue3+Vant快速构建项目")

---

欢迎访问：[天问博客](https://tiven.cn/p/3747153d/ "天問博客") 

