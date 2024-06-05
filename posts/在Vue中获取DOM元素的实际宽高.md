---
title: 在Vue中获取DOM元素的实际宽高
tags:
- Vue
- DOM
- JS
categories:
- Vue
abbrlink: 2979bc10
date: 2022-07-13 16:36:41
---

最近使用 `D3.js` 开发可视化图表，因为移动端做了 `rem` 适配，所以需要动态计算获取图表容器的宽高，其中涉及到一些原生DOM API的使用，避免遗忘这里总结一下。

![Vue && DOM](https://tiven.cn/static/img/img-vue-01-LwJYB5ARGwBSqfpvKFEow.jpg)

[//]: # (<!-- more -->)

## 一、获取元素

在 `Vue` 中可以使用 `ref` 来获取一个真实的 DOM 元素。
为了保险起见，所有的 DOM 操作建议都放在 `$nextTick()` 方法中。

```html
<template>
  <div class="box" ref="wrap"></div>
</template>
<script>
export default {
  mounted() {
    // 获取 DOM 元素
    this.$nextTick(()=>{
      let $ele = this.$refs.wrap
    })
  },
}
</script>
<style scoped>
  .box {
    width: 100%;
    height: 200px;
    background-color: pink;
  }
</style>
```

## 二、获取元素宽高

1. 使用 **offsetWidth** 、 **offsetHeight** 方法，返回 **Number** 类型的值，如：`52`。

```js
let $ele = this.$refs.wrap
// 宽
let width = $ele.offsetWidth
// 高
let height = $ele.offsetHeight
```

2. 使用 window 全局对象中的 **getComputedStyle** API，返回 **String** 类型的值，包含px单位，如： `'100px'`。

```js
let $ele = this.$refs.wrap
// 宽
let width = window.getComputedStyle($ele).width
// 高
let height = window.getComputedStyle($ele).height
```

---

欢迎访问：[天问博客](https://tiven.cn/p/2979bc10/ "天问博客-专注于大前端技术")

