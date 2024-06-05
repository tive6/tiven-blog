---
title: Vue3学习与实战 · Ref获取真实DOM
tags:
- Vue
- DOM
- JS
categories:
- Vue
abbrlink: 4c07e342
date: 2022-10-19 14:42:17
---

在使用 Vue 、React 等MVVM框架开发项目时，基本上很少需要直接手动去操作 DOM 了，但是也不可避免，例如获取元素的宽高、元素在屏幕的XY位置、DIV拖拽等等。随着 Vue 版本的升级，在 Vue3 中获取真实DOM的方法也有了变化。

![Vue3 && DOM](https://tiven.cn/static/img/img-vue-03-tmlDL4iULG4rKKWmGDCEN.jpg)

[//]: # (<!-- more -->)

## 一、前言

>**ref()**：用于注册元素或子组件的引用。接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 .value。

## 二、ref获取真实DOM

- 在选项式 API 中

```html
<template>
  <!-- 普通元素 -->
  <div ref='eleBox' class='box'></div>
  <!-- 子组件 -->
  <ChildComponent ref='childCom' />
</template>
<script>
  export default {
    components: {
      ChildComponent,
    },
    mounted() {
      let eleBox = this.$refs.eleBox
      // eleBox 就是获取的真实DOM对象，可以进行DOM相关的操作
      eleBox.style.backgroundColor = '#f0f'
      
      // 获取子组件实例
      console.log(this.$refs.childCom)
    }
  }
</script>
```

- 在组合式 API 中

```html
<!-- 普通元素 -->
<div ref='eleBox' class='box'></div>
<!-- 子组件 -->
<ChildComponent :ref="(el) => childCom = el" />

<script setup>
  import { ref } from 'vue'
  
  let eleBox = ref()
  // eleBox.value 就是获取的真实DOM对象
  eleBox.value.style.width = '200px'
  
  let childCom = ref()
  // childCom.value 就是获取的子组件实例对象
</script>
```

---

欢迎访问：[天问博客](https://tiven.cn/p/4c07e342/ "天问博客-专注于大前端技术")

