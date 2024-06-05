---
title: HTTP协议版本检测
abbrlink: 34b7ce97
date: 2021-10-26 17:17:33
tags:
- HTTP
- Web
categories:
- 浏览器和HTTP那些事
---

`HTTP/2.0`在2015年就已经正式发布了，但是现在大部分网站还在使用`HTTP/1.1`协议。具体怎么查看网站采用的是`HTTP/1.1`，还是`HTTP/2.0`呢，本篇就介绍几种检测`HTTP协议`版本的方法。

![HTTP 协议](https://tiven.cn/static/img/water-drip-drop-blue-preview-oB8M3AZvv4qsDb1L-GAXJ.jpg)

[//]: # (<!-- more -->)

>所有的操作都是基于`Chrome`浏览器，以本站 [tiven.cn](https://tiven.cn "天问博客") 为例。

## 一、`Network`中查看`Headers`

**步骤：**

1. 在Chrome浏览器打开要检测的网站链接
2. 点击鼠标右键，打开右键菜单,如下图。选择`检查`选项打开`开发者工具`，或者使用快捷键`Ctrl+Shift+C`
![右键菜单](https://tiven.cn/static/img/img-right-menu-w7hvD6VnnhuQQ60aMLDbC.jpg)
3. 打开`Network`选项栏，选中`All`，刷新页面，点击下方第一个，如图：
![Network](https://tiven.cn/static/img/img-newwork-KqWvuiwb2kezWqwySsw07.jpg)
4. 找到`Request Headers`，点击后边的`View source`，就能看到当前网站的HTTP协议版本。

* `HTTP/1.1`版本，如下图所示：
![HTTP/1.1](https://tiven.cn/static/img/img-http-check-Ovj8V1T_3CTZ1EG_eLVcc.jpg)

* `HTTP/2.0`版本，如下图所示：
![HTTP/2.0](https://tiven.cn/static/img/img-http2-1y8G5fJ5tnJYENQT5JZvf.jpg)

## 二、chrome.loadTimes 方法

在浏览器控制台`console`下输入以下代码并执行：

```js
window.chrome.loadTimes()
```

* `HTTP/1.1`版本输出：

```js
{
  commitLoadTime: 1635406428.339
  connectionInfo: "http/1.1"
  finishDocumentLoadTime: 0
  finishLoadTime: 0
  firstPaintAfterLoadTime: 0
  firstPaintTime: 1635406429.545
  navigationType: "Reload"
  npnNegotiatedProtocol: "http/1.1"
  requestTime: 1635406428.019
  startLoadTime: 1635406428.019
  wasAlternateProtocolAvailable: false
  wasFetchedViaSpdy: false
  wasNpnNegotiated: true
}
```

* `HTTP/2.0`版本输出：

```js
{
  commitLoadTime: 1635406324.18
  connectionInfo: "h2"
  finishDocumentLoadTime: 1635406325.07
  finishLoadTime: 1635406325.751
  firstPaintAfterLoadTime: 0
  firstPaintTime: 1635406324.53
  navigationType: "Reload"
  npnNegotiatedProtocol: "h2"
  requestTime: 1635406324.119
  startLoadTime: 1635406324.119
  wasAlternateProtocolAvailable: false
  wasFetchedViaSpdy: true
  wasNpnNegotiated: true
}
```

结果很明显，`npnNegotiatedProtocol`字段就是当前网站采用的协议版本，`h2`就代表`http/2.0`。

## 三、在线工具检测：

HTTP2在线检测工具：[地址](https://myssl.com/http2_check.html "HTTP2检测")

输入网站地址，检测结果如下，操作很简单，这里不再赘述。

![HTTP2检测](https://tiven.cn/static/img/img-http-tools-DZdoBEfvegY6_hoPwGp26.jpg)

## 四、Chrome浏览器插件检测：

在chrome网上应用店/ `拓展程序` 下载 `HTTP/2 and SPDY indicator` 插件，安装成功后，浏览开启`HTTP2`的网站，右上角会显示`蓝色`的闪电，如下图所示，没有开启的则显示`灰色`的。

![HTTP2 Plugins](https://tiven.cn/static/img/img-http2-plugins-86Emzrik5xKGScwZmTo5M.jpg)

---

欢迎访问：[个人博客地址](https://tiven.cn/p/34b7ce97/ "天問博客")
