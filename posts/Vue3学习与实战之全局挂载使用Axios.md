---
title: Vue3学习与实战 · 全局挂载使用Axios
abbrlink: 7f7ba3b2
date: 2021-11-24 17:27:29
tags:
- Vue
- Vue3
- Axios
categories:
- Vue
top: 11
---

在`vue2`中会习惯性的把`axios`挂载到全局，以方便在各个组件或页面中使用`this.$http`请求接口。但是在`vue3`中取消了`Vue.prototype`，在全局挂载方法和属性时，需要使用官方提供的`globalProperties`API。

![Vue3 全局Axios](https://tiven.cn/static/img/img-vue3-02-l72KcVTsGMBlekQUqFBAi.jpg)

<!-- more -->

## 一、全局挂载

* 在`vue2`项目中，入口文件`main.js`配置`Vue.prototype`挂载全局方法对象：

```js
// vue 2.x

import Vue from 'vue'
import router from '@/router'
import store from '@vuex'
import Axios from 'axios'
import Utils from '@/tool/utils'
import App from './App.vue'

// ...

/* 挂载全局对象 start */
Vue.prototype.$http = Axios;
Vue.prototype.$utils = Utils;
/* 挂载全局对象 end */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

* 在`vue3`项目中，入口文件`main.js`配置`globalProperties`挂载全局方法对象：

```js
// vue 3.x

import { createApp } from 'vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Utils from '@/tool/utils'
import App from './App.vue'

// ...

const app = createApp(App)

/* 挂载全局对象 start */
app.config.globalProperties.$http = Axios
app.config.globalProperties.$utils = Utils
/* 挂载全局对象 end */

app.use(router).use(store);
app.mount('#app')
```

## 二、全局使用

* 在`vue2`中使用`this.$http`：

```html
// vue 2.x

<template>
  <div></div>
</template>
<script>
  export default {
    data() {
      return {
        list: []
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.$http({
          url: '/api/v1/posts/list'
        }).then(res=>{
          let { data } = res.data
          this.list = data
        })
      },
    },
  }
</script>
```

* 在`vue3`的`setup`中使用`getCurrentInstance`API获取全局对象：

```html
// vue 3.x

<template>
  <div class="box"></div>
</template>
<script>
  import { ref, reactive, getCurrentInstance } from 'vue'
  export default {
    setup(props, cxt) {
      // 方法一 start
      const currentInstance = getCurrentInstance()
      const { $http, $message, $route } = currentInstance.appContext.config.globalProperties
      
      function getList() {
        $http({
          url: '/api/v1/posts/list'
        }).then(res=>{
          let { data } = res.data
          console.log(data)
        })
      }
      // 方法一 end

      // 方法二 start
      const { proxy } = getCurrentInstance()
      
      function getData() {
        proxy.$http({
          url: '/api/v1/posts/list'
        }).then(res=>{
          let { data } = res.data
          console.log(data)
        })
      }
      // 方法二 end

    }  
  }
</script>
```

1. 方法一：通过`getCurrentInstance`方法获取当前实例，再根据当前实例找到全局实例对象`appContext`，进而拿到全局实例的`config.globalProperties`。
2. 方法二：通过`getCurrentInstance`方法获取上下文，这里的`proxy`就相当于`this`。

**提示：** 可以通过打印`getCurrentInstance()`看到其中有很多全局对象，如：`$route`、`$router`、`$store`。如果全局使用了`ElementUI`后，还可以拿到`$message`、`$dialog`等等。

---

## 《Vue3学习与实战》系列

* [Vue3学习与实战 · 组件通信](https://tiven.cn/p/97da9e37/ "Vue3组件通信")
* [Vue3学习与实战 · 全局挂载使用Axios](https://tiven.cn/p/7f7ba3b2/ "全局挂载使用Axios")（本文）
* [Vue3学习与实战 · 配置使用vue-router路由](https://tiven.cn/p/3747153d/ "配置使用vue-router路由")
* [Vue3学习与实战 · Vuex状态管理](https://tiven.cn/p/de821c2f/ "Vuex状态管理")
* [vue3 + vite实现异步组件和路由懒加载](https://tiven.cn/p/d41c4425/ "vue3实现异步组件和路由懒加载")
* [Vite+Vue3+Vant快速构建项目](https://tiven.cn/p/de241e23/ "Vite+Vue3+Vant快速构建项目")

---

欢迎访问：[天问博客](https://tiven.cn/p/7f7ba3b2/ "天問博客") 
