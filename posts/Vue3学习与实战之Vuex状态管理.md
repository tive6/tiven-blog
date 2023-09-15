---
title: Vue3学习与实战 · Vuex状态管理
abbrlink: de821c2f
date: 2021-12-06 16:24:07
tags:
- Vue
- Vuex
categories:
- Vue
top: 9
---

**Vuex** 是 **Vue** 全家桶重要组成之一，专为 **Vue.js** 应用程序开发的 **状态管理模式 + 库** ，它采用集中式存储管理应用的所有组件的`状态`，并以相应的规则保证状态以一种可预测的方式发生变化。

![Vue3 Vuex](https://tiven.cn/static/img/img-vuex-01-XEosOT7wDiqHheOzDZPTq.jpg)

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
            index.js
            modules/
                user.js
                common.js
        views/
            index.vue
        App.vue
        main.js            
```

## 二、版本依赖

>`vite`: ^2.0.0
`vue`: ^3.2.8
`vuex`: ^4.0.0

## 三、配置Vuex

>为了避免所有状态集中到一个对象或一个文件而变得臃肿，所以会按照不同的产品或业务线将状态树切割成多个 **模块** （`module`），并配置各自的 **命名空间** （`namespaced`），防止状态重复冲突。

* 3-1.配置`src/store/index.js`文件。

```js
// src/store/index.js

import Vuex from 'vuex'

import User from './modules/user'
import Common from './modules/common'

export default new Vuex.Store({
    modules: {
      User,
      Common,
    }
})
```

* 3-2.配置`src/store/modules/user.js`文件。

```js
// src/store/modules/user.js

import axios from 'axios'

const SET_USER_NAME = 'SET_USER_NAME'
const SET_RANDOM_IMG = 'SET_RANDOM_IMG'

export default {
  namespaced: true,

  state: {
    username: 'Tom',
    randomImg: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_8258.jpg',
  },

  getters: {
    getUsername (state) {
      return state.username
    },
    getRandomImg (state) {
      return state.randomImg
    },
  },

  mutations: {
    [SET_USER_NAME]: (state, username)=>{
      state.username = username
    },
    [SET_RANDOM_IMG]: (state, randomImg)=>{
      state.randomImg = randomImg
    },
  },

  actions: {
    async setUsername ({dispatch, commit, getters}, data) {
      let username = getters.getUsername
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          commit('GET_USER_NAME', data)
          resolve(data)
        }, 2000)
      })
    },
    async setRandomImg ({dispatch, commit, getters}, data) {
      // let randomImg = getters.getRandomImg
      return new Promise((resolve, reject) => {
        axios.get('https://dog.ceo/api/breeds/image/random').then((res) => {
          let img = res.data.message
          commit('SET_RANDOM_IMG', img)
          resolve(img)
        })
      })
    },
  },
}
```

* 3-3.在`src/main.js`入口文件中注册使用`Vuex`。

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

## 四、使用Vuex

* 这里主要介绍一下在`Vue3`的`Composition API`中的使用。

```html
// src/views/index.vue

<template>
    <div>
        <van-image
                round
                lazy-load
                width="200"
                height="200"
                :src="img">
            <template #loading>
                <van-loading type="spinner" size="30" />
            </template>
        </van-image>

        <br>

        <van-button type="primary"
                    icon="search"
                    zise="mini"
                    text="随机dog"
                    :loading="loading"
                    @click="getImg"
                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                    loading-text="loading..." />
    </div>
</template>

<script>
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'

    export default {
        setup () {
            const { state, getters, commit, dispatch } = useStore()
            let img = computed(()=>getters['User/getRandomImg'])
            let loading = ref(false)

            const getImg = async () => {
                loading.value = true
                await dispatch('User/setRandomImg')
                loading.value = false
            }

            return {
                img,
                loading,
                getImg,
            }
        },
    }
</script>
```

**提示：** 为了访问 `state` 和 `getter`，需要创建 `computed` 引用以保留`响应性`，这与在 **Options API** 中创建`计算属性`等效。

---

## 《Vue3学习与实战》系列

* [Vue3学习与实战 · 组件通信](https://tiven.cn/p/97da9e37/ "Vue3组件通信")
* [Vue3学习与实战 · 全局挂载使用Axios](https://tiven.cn/p/7f7ba3b2/ "全局挂载使用Axios")
* [Vue3学习与实战 · 配置使用vue-router路由](https://tiven.cn/p/3747153d/ "配置使用vue-router路由")
* [Vue3学习与实战 · Vuex状态管理](https://tiven.cn/p/de821c2f/ "Vuex状态管理")（本文）
* [vue3 + vite实现异步组件和路由懒加载](https://tiven.cn/p/d41c4425/ "vue3实现异步组件和路由懒加载")
* [Vite+Vue3+Vant快速构建项目](https://tiven.cn/p/de241e23/ "Vite+Vue3+Vant快速构建项目")

---

欢迎访问：[天问博客](https://tiven.cn/p/de821c2f/ "天問博客") 
