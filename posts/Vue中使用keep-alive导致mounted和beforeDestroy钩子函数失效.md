---
title: Vue中使用keep-alive导致mounted和beforeDestroy钩子函数失效
tags:
- Vue
categories:
- Vue
abbrlink: c96cc6ee
date: 2022-08-16 15:32:28
---

最近在 **Vue** 项目中给页面加水印，发现了一个比较奇怪的现象，有的页面水印颜色深，有的页面水印颜色浅，特别是在主题色（背景色）很重的页面，水印看起来格外显眼。经 `code review` 发现页面使用了 `<keep-alive>` 组件缓存，导致 **mounted** 和 **beforeDestroy** 钩子函数中的方法不能正常被调用。

![Vue && Keep-Alive](https://tiven.cn/static/img/img-vue-02-vnCFBMX9o39TemLsW6asl.jpg)

<!-- more -->

## 一、原因

使用了缓存组件 **keep-alive** 之后，**mounted** 钩子函数只会在第一次进入页面被调用，之后再次进入不会被触发；而销毁组件的 **beforeDestroy** 钩子函数不会被执行，除非是主动销毁组件。
这样就会导致，有些页面水印不会被销毁，被重复添加，相当于是同一个地方盖上了两张水印，所以水印看起来很明显。

## 二、activated 和 deactivated 钩子函数

官方提供的API：
* **activated：** 被 `keep-alive` 缓存的组件激活时调用。
* **deactivated：** 被 `keep-alive` 缓存的组件失活时调用。

## 三、beforeRouteEnter 和 beforeRouteLeave 路由守卫

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.name = to.params.name
    next()
  }
}
```

## 四、解决方案

可以根据以上两组API来解决 ** `keep-alive` 导致 `mounted` 和 `beforeDestroy` 钩子函数失效** 的问题。

1. 根据 **activated** 和 **deactivated** 钩子函数的执行时机，调用水印生成和移除的函数方法。
2. 利用 **beforeRouteLeave** 路由守卫，在离开该页面时主动销毁组件，相当于主动清除了 `keep-alive` 的缓存。 ~~（不推荐）~~

```js
beforeRouteLeave (to, from, next) {
  this.destroy();
  next();
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/c96cc6ee/ "天问博客-专注于大前端技术")

