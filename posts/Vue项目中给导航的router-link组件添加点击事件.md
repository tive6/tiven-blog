---
title: Vue项目中给导航的router-link组件添加点击事件
abbrlink: e2528169
date: 2022-01-05 10:34:28
tags:
- Vue
- Router
categories:
- Vue
---

最近开发`Vue`项目过程中遇到一个问题，在给 `<router-link />` 添加 `@click` 点击事件时，不起任何作用，后来经过查阅文档才得知，给一个封装的组件上直接添加原生事件需要使用 `.native` 修饰符。

![Vue router-link](https://tiven.cn/static/img/hudson-bay-canada-sea-ocean-preview-7aQDoB77LVvviBS1Dqq1o.jpg)

<!-- more -->

## 开发场景

一个使用 `Vue2.x` 构建的移动H5项目，为了拥有原生APP和小程序的体验，在一级页面底部设计了 `navbar` 快捷入口。所以自然就选择了 `Vue-router` 提供的 `<router-link />` 组件来做。但是在 `router-link` 组件中只有 `to` 参数指定跳转页面的 `path`，没有提供对应的 `click` 方法。
本次需求是要在点击导航栏的时候加上埋点事件，所以需要给 `<router-link />`加上点击事件来处理。

```html
// navbar.vue

<template>
  <div class="navbar">
    <router-link v-for="item in list" :key="item.path" tag="div"
                 :to="{ path: item.path }"
                 class="nav-list">
      <div class="nav-ico" :class="[item.className]" />
      <div class="nav-text" @click="click('home')"> {{ item.title }} </div>
    </router-link>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: [
          {
            path: '/home',
            className: 'nav-ico-home',
            title: '首页',
          },
          {
            path: '/list',
            className: 'nav-ico-list',
            title: '列表',
          },
        ]
      }
    },
    methods: {
      click(text) {
        console.log(text)
        // 埋点事件
      },
    },
  }
</script>
```

## 解决

>`native`修饰符官方介绍：你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符：

- 例：

```html
<custom-component v-on:click.native="onClick" />
```

所以要解决 `router-lick` 添加 `@click` 点击事件失效的问题，需要这样来解决：

```html
<router-link v-for="item in list" :key="item.path" tag="div"
             :to="{ path: item.path }"
             class="nav-list">
  <div class="nav-ico" :class="[item.className]" />
  <div class="nav-text" @click.native="click('home')"> {{ item.title }} </div>
</router-link>
```

---

欢迎访问：[天问博客](https://tiven.cn/p/e2528169/ "天問博客") 







