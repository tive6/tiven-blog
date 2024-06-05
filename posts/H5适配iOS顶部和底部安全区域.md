---
title: H5适配iOS顶部和底部安全区域
tags:
  - H5
  - CSS3
categories:
  - H5
abbrlink: d2dfc858
date: 2024-01-10 15:42:23
---

在移动端Web开发中，适配不同设备的屏幕是一个重要且挑战性的任务。对于iOS设备来说，这一任务尤为关键，因为自iPhone X起，苹果的设备引入了刘海屏、圆角等设计，这就要求开发者在Web页面中特别处理顶部和底部的安全区域。本文将介绍如何在H5应用中适配iOS设备的顶部和底部安全区域，包括对旧版iOS的兼容处理。

![H5 IOS安全区域适配](https://tiven.cn/static/img/h5-02-Xx-YiljE.jpg)

<!-- more -->

## 一、理解安全区域（Safe Area）

从iPhone X开始，iOS设备的屏幕设计包括了刘海和圆角，这些元素影响了屏幕的实际可用区域。iOS系统引入了“安全区域”（Safe Area）的概念，以确保内容不会被刘海屏或圆角遮挡。在Web开发中，我们可以通过CSS环境变量来适配这些安全区域。

## 二、CSS环境变量

CSS环境变量 `env()` 是Apple专门为适配安全区域而引入的。通过使用这些变量，我们可以安全地设置元素的边距，防止内容被遮挡。主要的环境变量包括：

- `safe-area-inset-top`
- `safe-area-inset-right`
- `safe-area-inset-bottom`
- `safe-area-inset-left`

这些变量提供了设备屏幕边缘到安全区域边界的距离。

## 三、使用viewport适配

为了适配iOS设备的安全区域，我们可以通过设置 `viewport` 的 **meta** 标签来实现。在HTML的head标签中添加以下代码：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover">
```

## 四、适配底部安全区域

为了确保在旧版本iOS设备上也能有良好的表现，我们需要使用 `constant()` 和 `env()` 的组合。这是因为在iOS 11.2之前，`constant()` 被用于相同的目的。我们可以这样写：

```css
body {
    padding-top: constant(safe-area-inset-top, 20px); /* Older iOS */
    padding-top: env(safe-area-inset-top, 20px); /* Newer iOS */
}

.header {
    padding-top: calc(20px + constant(safe-area-inset-top, 20px)); /* Older iOS */
    padding-top: calc(20px + env(safe-area-inset-top, 20px)); /* Newer iOS */
}

.footer {
    padding-bottom: calc(20px + constant(safe-area-inset-bottom, 20px)); /* Older iOS */
    padding-bottom: calc(20px + env(safe-area-inset-bottom, 20px)); /* Newer iOS */
}
```

## 五、兼容性考虑

需要注意的是，`env()` 和 `constant()` 函数在一些旧版本的浏览器中可能不被支持。为了兼容性考虑，我们可以使用 `@supports` 规则来检测是否支持 `env()` 函数，并提供备用的样式。

```css
/* 不支持 constant(safe-area-inset-top) 的设备 */
@supports not (constant(safe-area-inset-top)) {
  /* 备用样式 */
  body,
  .header,
  .footer {
    padding: 20px 0;
  }  
}

/* 不支持 env(safe-area-inset-top) 的设备 */
@supports not (env(safe-area-inset-top)) {
  /* 备用样式 */ 
  body,
  .header,
  .footer {
    padding: 20px 0;
  }
}
```


## 六、注意事项

- **兼容性**：由于`env()`和`constant()`是Apple特有的，它们只在iOS的Safari浏览器上有效。因此，开发时还需要考虑其他浏览器的兼容性。
- **动态内容**：在动态改变布局（例如横屏与竖屏切换）时，需要重新计算这些值。
- **测试**：由于不同设备的安全区域大小不同，建议在多种设备上测试以确保最佳效果。

## 七、结语

通过合理利用CSS环境变量和向后兼容的写法，我们可以有效地适配iOS设备的安全区域，提供更好的用户体验。尽管需要考虑兼容性和测试，但这些努力对于创建专业且易用的H5应用是必不可少的。
这篇博客现在包括了关于如何使用 `constant()` 和 `env()` 来适配iOS设备的顶部和底部安全区域的详细指南，同时考虑到了向后兼容性的问题。您可以根据需要进一步修改或添加内容。

参考文档：

- [CSS env](https://developer.mozilla.org/zh-CN/docs/Web/CSS/env)
- [CSS @supports](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports)

---

欢迎访问：[天问博客](https://tiven.cn/p/d2dfc858/ "天问博客-专注于大前端技术")

