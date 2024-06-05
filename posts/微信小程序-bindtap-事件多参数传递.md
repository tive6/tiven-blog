---
title: 微信小程序 bindtap 事件多参数传递
tags:
  - 小程序
categories:
  - 小程序
abbrlink: '41166485'
date: 2023-11-18 16:43:24
---

在微信小程序中，我们无法直接通过 `bindtap="handleClick(1,2,3)"` 的方式传递参数，而是需要通过自定义属性 `data-` 的方式进行传递，并在事件回调函数中通过 `event.currentTarget.dataset` 来获取这些参数。然而，这种传参方式不够友好，尤其是在传递多个参数时，需要特别注意参数的形式和命名方式。

![微信小程序](https://tiven.cn/static/img/weapp-01-UZsuDKXN.jpg)

<!-- more -->

## 代码示例

* index.wxml

```html
<template name="like">
  <view class="like-line"></view>
  <view class="like-wrap">
    <view class="like {{ item.feedbackType === 1 ? 'selected' : '' }}" bindtap="like" data-args="{{ {item, index, type: 1} }}">
      <!--      👍-->
    </view>
    <view class="dislike {{ item.feedbackType === 2 ? 'selected' : '' }}" bindtap="like" data-args="{{ {item, index, type: 2} }}">
      <!--      👎-->
    </view>
  </view>
</template>
```

* index.js

```js
Page({
  async like(e) {
    let { item, type, index } = e.currentTarget.dataset['args']
    let { feedbackType, recordId } = item
    console.log({ type, index, feedbackType, recordId })
    
    // do something
  },
})
```

注意：
* 自定义属性命名，不能包含大写字母，大写会自动转成小写，可能会导致获取不到参数。如 `data-recordId` 会自动转成 `data-recordid`；
* 如果使用 `data-record-id` 的形式，最终在 **event.target.dataset** 中会将 `-` 转成驼峰的形式，即 `recordId`，取值需要用 `event.target.dataset['recordId']`。


---

欢迎访问：[天问博客](https://tiven.cn/p/41166485/ "天问博客-专注于大前端技术")

