---
title: css中通过attr函数获取html标签的属性值
tags:
- Scss
- CSS
- Html
categories:
- CSS3
abbrlink: d9feb356
date: 2023-03-03 17:37:18
---

最近做文本标注的项目，其中有个排序标记的需求，需要使用 `js` 动态修改元素的伪元素 `before` 或 `after` 中 `content` 的内容。

![CSS3 attr函数](https://tiven.cn/static/img/img-css-01--0G8QBvgAStc0_UaZvcp_.jpg)

<!-- more -->

## 代码展示

```html
<template>
  <div class="list">
    <div v-for="(item, index) in list" :key="item.id" :data-index="index" class="item"></div>
  </div>
</template>
<script setup lang="ts">
  let list = [
    {
      id: 1,
      text: "山重水复疑无路"
    },
    {
      id: 2,
      text: "柳暗花明又一村"
    },
  ]
</script>

<style lang="scss">
  .item {
    position: relative;
    border: 1px solid red;
    font-size: 20px;

    &:before {
     content: attr(data-index);
     position: absolute;
     top: -10px;
     display: inline-block;
     color: pink;
   }
  }
</style>
```

## css attr函数

* 这里的关键就是css的 `attr` 函数可以获取到对应html标签的属性。从而可以通过改变数据来修改元素的伪元素 `before` 或 `after` 中 `content` 的内容。
* 当然也可以通过js操作DOM属性的形式去动态修改。

```js
itemEle.setAttribute("data-index","100")
```

---

欢迎访问：[天问博客](https://tiven.cn/p/d9feb356/ "天问博客-专注于大前端技术")

