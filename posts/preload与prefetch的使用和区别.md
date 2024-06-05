---
title: preload与prefetch的使用和区别
abbrlink: 412392ba
date: 2021-11-19 18:05:15
tags:
- HTTP
- Web
categories:
- 浏览器和HTTP那些事
---

在使用`@vue/cli`工具构建的项目，打包上线之后，一般都能看到`<link rel="preload">`和`<link rel="prefetch">`这样的标签，对于`preload`与`prefetch`的作用和区别一直以来都不是太了解，所以文本就详细介绍一下。

![Preload和Prefetch](https://tiven.cn/static/img/hirsch-wild-antler-nature-preview-wia0nXlfFZr5cnP3f_iQd.jpg)

[//]: # (<!-- more -->)

## 一、前言

想要了解`preload`与`prefetch`的作用和区别，就不得不先熟悉浏览器加载资源的优先级。如图：

![浏览器资源加载优先级](https://tiven.cn/static/img/img-preload-jM5PpGYI8jpi80LvQJGIu.jpg)

- 其中HTML基本骨架结构和CSS的优先级最高
- `preload` 使用 `as` 属性加载的资源将会获得与资源 `“type”` 属性所拥有的相同的优先级。比如说，`preload as="style"` 将会获得比 `as=“script”` 更高的优先级。
- 不带 `as` 属性的 `preload` 的优先级将会等同于异步请求。

## 二、preload

### 2-1.定义：

* `<link>`元素的 `rel` 属性的属性值`preload`能够让你在你的HTML页面中`<head>`元素内部书写一些声明式的资源获取请求，可以指明哪些资源是在页面加载完成后即刻需要的。
* `preload` 提供了一种声明式的命令，让浏览器提前加载指定资源(加载后并不执行)，需要执行时再执行。

### 2-2.好处：

1. 将加载和执行分离开，不阻塞渲染和document的onload事件。
2. 提前加载指定资源，不再出现依赖的font字体隔了一段时间才刷出的情况。

### 2-3注意：

1. 使用 `preload` 后，不管资源是否使用都将提前加载。若不确定资源是必定会加载的，则不要错误使用 `preload`，以免出现性能问题。
2. `preload` 有 as 属性，浏览器可以设置正确的资源加载优先级，这种方式可以确保资源根据其重要性依次加载， 所以，`preload` 既不会影响重要资源的加载，又不会让次要资源影响自身的加载；浏览器能根据 as 的值发送适当的 Accept 头部信息；浏览器通过 as 值能得知资源类型，因此当获取的资源相同时，浏览器能够判断前面获取的资源是否能重用。
3. 如果忽略 as 属性，或者错误的 as 属性会使 `preload` 等同于 `XHR` 请求，浏览器不知道加载的是什么，因此会赋予此类资源非常低的加载优先级。
4. 如果对所 `preload` 的资源不使用明确的 `as` 属性，将会导致二次获取。
5. `preload`加载`font`字体资源不带 `crossorigin` 也会二次获取。

### 2-4.特殊用法

1. preload 可以定义资源加载完毕后的`回调函数`，如下：

```html
<link rel="preload" href="https://tiven.cn/js/test.js" as="javascript" onload="preloadHandle()">
```

2. 可以使用`preload`的样式表立即生效。

```html
<link rel="preload" href="demo.css" onload="this.rel=stylesheet">
```

3. 对于加载跨域的资源，必须加上 `crossorigin` 属性。

```html
<link rel="preload" as="style" crossorigin href="https://test.com/css/test.css">
```

4. `link`标签还可以接收一个`media`属性，进行简单的媒体查询。

```html
<link rel="preload" href="https://tiven.cn/img/bg.png" as="image" media="(max-width: 640px)">
```

## 三、prefetch

### 3-1.定义：

* `<link>`元素的 `rel` 属性的属性值`prefetch`能够让你在你的HTML页面中`<head>`元素内部书写一些声明式的资源获取请求，告诉浏览器加载下一页面可能会用到的资源，`注意`是`下一页面`，而不是当前页面。因此该方法的加载优先级非常低，也就是说该方式的作用是加速下一个页面的加载速度。

### 3-2.实例：

```html
<link rel="prefetch" href="./js/01.js">
<link rel="prefetch" href="./js/02.js">
```

## 四、`preload` 和 `prefetch` 的区别

* `preload` 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源。
* `prefetch` 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源。
* 在`VUE SSR`生成的页面中，首页的资源均使用`preload`，而路由对应的资源，则使用`prefetch`。
* 对于当前页面很有必要的资源使用 `preload`，对于可能在将来的页面中使用的资源使用 `prefetch`。

**注意：** 使用 `preload` 和 `prefetch` 的逻辑可能不是写到一起，但同一资源如果混用 `preload` 或 `prefetch`，像下边这种，会带来双倍的网络请求。

```html
<link rel="preload"   href="https://tiven.cn/js/test.js" as="javascript">
<link rel="prefetch"  href="https://tiven.cn/js/test.js" as="javascript">
```

## 五、总结

|属性|preload|prefetch|
|:---:|:---:|:---:|
|语法|`<link rel="preload" href="bg-01.png">`|`<link rel="prefetch" href="bg-02.png" />`|
|适用场景|本页面接下来大概率要使用的资源|下个页面的资源。下个页面很可能会去访问|
|浏览器支持情况|一般|较高|
|加载时间|立即加载（一般而言，跟as有关）|浏览器闲置的时候才会加载（一般而言）|

---

欢迎访问：[天问博客](https://tiven.cn/p/412392ba/ "天问博客")
