---
title: Vant中Popover气泡弹出框位置错乱问题解决
tags:
- Vue
- Vant
- H5
categories:
- ElementUI / Vant
abbrlink: ab054a05
date: 2022-08-02 17:39:08
---

在使用 `VantUI` 开发 `H5` 应用时，引入了 **Popover** 气泡弹出框组件，其中弹出位置参数设置的是 `placement="bottom-end"`，但是最后 **Popover** 弹出层的位置出现了错乱，没有在指定的位置展示。

![Vant && Popover](https://tiven.cn/static/img/img-vant-01-7siKRiFzYfkPXxKehComz.jpg)

[//]: # (<!-- more -->)

## 一、代码展示

```html
<template>
  <div class="head-nav">
    <van-icon size="24"
              class="nav-icon-left"
              name="arrow-left"
              color="#333" />
    <van-popover :offset="[14,10]"  
                 v-model="showPopover"
                 trigger="click"
                 :actions="actions"
                 @select="selectMenu"
                 get-container=".head-nav"
                 placement="bottom-end" >
      <template #reference>
        <van-icon size="24"
                  class="nav-icon-right"
                  name="ellipsis"
                  color="#333" />
      </template>
    </van-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopover: false,
      actions: [
        { text: '选项一', icon: 'add-o' },
        { text: '选项二', icon: 'music-o' },
        { text: '选项三', icon: 'more-o' },
      ],
    }
  },
  methods: {
    selectMenu(action, index) {
      console.log(action, index)
    },
  },
}
</script>

<style lang="scss">
  .head-nav {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }
  
  .nav-icon-left {
    position: absolute;
    left: 30px;
    top: 20px;
  }
  
  .nav-icon-right {
    position: absolute;
    right: 30px;
    top: 20px;
  }
  
</style>
```

## 二、位置错乱原因

如上图所示，触发元素（按钮）正常情况下是跟随文档流布局，**Popover** 弹出层的位置会正常展示。但是如果设置了 **绝对定位 `position: absolute;`**，脱离了文档流，所以最后弹出的浮层却在别的位置展示。
F12打开控制台，审查元素发现触发元素外层包裹的 `.van-popover__wrapper` 宽高为 **0x0** ，位置也和内部元素不在一起。

## 三、解决办法

去掉触发元素（按钮）的定位，将定位加到 `.van-popover__wrapper` 包裹元素上。修改样式，如下：

```css
  .nav-icon-right {
    /*position: absolute;*/
    /*right: 30px;*/
    /*top: 20px;*/
  }
  .van-popover__wrapper {
    position: absolute;
    right: 30px;
    top: 20px;
  }
```

> 完美解决，耐思 ^_^

---

欢迎访问：[天问博客](https://tiven.cn/p/ab054a05/ "天问博客-专注于大前端技术")

