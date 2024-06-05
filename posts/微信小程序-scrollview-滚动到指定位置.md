---
title: 微信小程序 scrollview 滚动到指定位置
tags:
  - 小程序
categories:
  - 小程序
abbrlink: '7354e266'
date: 2023-11-16 11:24:46
---

在微信小程序中，实现 `ScrollView` 滚动到指定位置有多种方法，下面将介绍三种主要的实现方式。

![weapp && scrollview](https://tiven.cn/static/img/weapp-01-UZsuDKXN.jpg)

<!-- more -->

## 一、使用scroll-top属性实现滚动

通过设置 `scroll-view` 组件的 `scroll-top` 属性，我们可以实现滚动到指定位置。以下是具体实现方式：

```html
<scroll-view scroll-top="{{scrollTop}}" style="height: 500px;">
  <view style="height: 1000px; background-color: #eee;"></view>
</scroll-view>
```

滚动逻辑：

```js
Page({
  data: {
    scrollTop: 0
  },
  scrollToLower: function () {
    this.setData({
      scrollTop: 500
    })
  }
})
```

在上述代码中，scroll-top是一个动态数据，通过手动改变scroll-top的值来实现滚动。

## 二、使用scroll-into-view属性实现滚动

除了 `scroll-top` 属性，还可以使用 `scroll-into-view` 属性。该属性用于指定子组件的id，当子组件进入可视区域时，`scroll-view` 会滚动到该位置。以下是实现方式：

```html
<scroll-view scroll-into-view="{{toView}}" style="height: 400px;">
  <view id="item1" style="height: 600px; background-color: #bbb;"></view>
  <view id="item2" style="height: 600px; background-color: #fff;"></view>
  <view id="item3" style="height: 600px; background-color: #fff;"></view>
</scroll-view>
```

滚动逻辑：

```js
Page({
  data: {
    toView: 'item3'
  },
  scrollToView: function () {
    this.setData({
      toView: 'item1'
    })
  }
})
```

在上述代码中，通过改变 toView 的值来实现滚动到不同子组件的位置。

## 三、结合scroll-into-view和scroll-top属性实现更准确的滚动

在实际开发中，可以结合使用scroll-into-view和scroll-top属性，实现更准确的滚动。以下是具体实现方式：

```html
<scroll-view scroll-into-view="{{toView}}" scroll-top="{{scrollTop}}" style="height: 400px;">
  <view id="item1" style="height: 500px; background-color: #999;"></view>
  <view id="item2" style="height: 500px; background-color: #eee;"></view>
</scroll-view>
```

滚动逻辑：

```js
Page({
  data: {
    toView: 'item2',
    scrollTop: 0
  },
  scrollToView: function () {
    this.setData({
      toView: 'item1',
      scrollTop: 300
    })
  }
})
```

在上述代码中，通过改变 `toView` 和 `scrollTop` 的值来实现精确滚动到指定位置。

## 四、小结

通过设置 scroll-top 和 scroll-into-view 属性，我们可以实现小程序scroll-view组件在指定位置的滚动。在需要精确滚动到指定高度时，可以结合使用两者来实现。需要注意，在滚动过程中，需要在js中动态设置相应的属性值。

---

欢迎访问：[天问博客](https://tiven.cn/p/7354e266/ "天问博客-专注于大前端技术")

