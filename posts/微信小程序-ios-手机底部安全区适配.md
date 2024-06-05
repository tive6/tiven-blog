---
title: 微信小程序 ios 手机底部安全区适配
tags:
  - 小程序
categories:
  - 小程序
abbrlink: 54abeaa4
date: 2023-11-19 17:41:09
---

在开发微信小程序中，遇到 IOS 全面屏手机，底部小黑条会遮挡页面按钮或内容，因此需要做适配处理。

![微信小程序](https://tiven.cn/static/img/weapp-01-UZsuDKXN.jpg)

[//]: # (<!-- more -->)

## 解决方案

通过 `wx.getSystemInfo()` 获取手机系统信息，需要拿到：**screenHeight**（屏幕高度），**safeArea**（安全区域对象），**pixelRatio**（像素比）。然后通过计算，得到底部安全区的高度，动态设置底部元素的高度。

```js
Page({
  data: {
    bottomHeight: 0,
  },
  onLoad() {
    this.safeAreaHandle()
  },
  async safeAreaHandle() {
    let {
      screenHeight,
      pixelRatio,
      safeArea: { bottom },
    } = await wx.getSystemInfo()
    this.setData({
      bottomHeight: (screenHeight - bottom) * pixelRatio,
    })
  },
})
```

`screenHeight` 是指屏幕高度，单位为 **px**。
`safeArea.bottom` 是指安全区域右下角纵坐标，单位为 **px**。
`pixelRatio` 设备像素比。
以 **iPhone 6/7/8** 为例，`pixelRatio` 为 **2**，即：`375px=750rpx`。

计算公式：`底部安全区高度 = (屏幕高度 - 安全区域右下角纵坐标) * 像素比` ，由此计算可得到底部安全区的高度，单位是 **rpx**。

动态设置底部安全区的高度：

```html
<template name="footer">
  <view class="page-footer" style="padding-bottom:{{bottomHeight + 20 +'rpx' }}">
    <view class="optional-li">
      <view wx:for="{{labels}}" wx:key="labelCode" bindtap="clickLabel" data-args="{{item}}" class="opt-item">
        {{item.labelName}}
      </view>
    </view>
  </view>
</template>
```

参考文档：https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemInfo.html

---

欢迎访问：[天问博客](https://tiven.cn/p/54abeaa4/ "天问博客-专注于大前端技术")

