---
title: 让你的Hexo博客像原生APP一般丝滑
abbrlink: 6dfc667a
date: 2021-10-20 16:36:51
tags:
- Hexo
- PWA
categories:
- Hexo / Markdown
---

`hexo-service-worker` 是一个可以让`Hexo`博客拥有 `PWA` 支持的插件，能够默认的把站点中 `public` 内的所有静态资源包括 html、css、js、image 等文件缓存起来，达到`离线`（无网络环境）可访问的效果，拥有像原生APP一般的丝滑体验。

![Hexo-PWA](https://tiven.cn/static/img/img-post-26-09YEDLr_4YuZpoiG0fpWS.jpg)

<!-- more -->

## PWA前提

> 你的博客全站资源必须为HTTPS，PWA支持的前提条件。
> 你的博客全站资源必须为HTTPS，PWA支持的前提条件。
> 你的博客全站资源必须为HTTPS，PWA支持的前提条件。

## 什么是PWA

> PWA，即 Progressive Web App, 是提升 Web App 的体验的一种新方法，能给用户原生应用的体验。
 
**理解：** `PWA`不是某一项技术，或者某一个新的产物；而是一系列Web技术与标准的集合与应用。通过应用这些新的技术与标准，可以从安全、性能和体验三个方面，优化我们的Web App。所以，其实PWA本质上依然是一个Web App。

### PWA包含的技术：

* Web App Manifest
* Service Worker
* Cache API 缓存
* Push、Notification 推送与通知
* Background Sync 后台同步
* 响应式设计

## 安装插件

```sh
npm i -S hexo-service-worker
```

## 配置config

在博客根目录下的`_config.yml`文件，添加如下配置：

```yaml
# PWA -- offline config passed to sw-precache.
service_worker:
  maximumFileSizeToCacheInBytes: 52428800
  staticFileGlobs:
  - public/**/*.{js,html,xml,json,css,png,jpg,gif,svg,eot,ttf,woff,woff2,ico,cur}  # code 1
  - https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js  # code 2
  - https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js  # code 3
  stripPrefix: public
  verbose: true
  runtimeCaching:
    - urlPattern: /*
      handler: cacheFirst
      options:
        origin: tiven.cn
    - urlPattern: /*
      handler: cacheFirst
      options:
        origin: cdn.bootcdn.net
```

* `staticFileGlobs` 是一个列表，可以使用正则来匹配某个目录，`code 1` 配置是缓存 `public` 文件夹下面的指定`静态资源`和静态 html 页面。
* `code 2` 和 `code 3` 是配置缓存第三方的CDN资源 `jquery` 和 `lodash`，这里只是举例，可以根据博客中实际使用到的资源具体来配置。
* `runtimeCaching` 是配置某个域名下使用到的静态资源，也是一个`List`，支持配置多个`origin`域。

## 生成配置 `manifest.json` 文件

在`source`目录下新建`manifest.json` 文件，可以参考本站博客配置，具体code如下：

```json
{
  "name": "天問的个人博客",
  "short_name": "天問",
  "description": "天問的个人网站，记录学习，分享coding。生命不息，奋斗不止...",
  "theme_color": "#C69DC9",
  "background_color": "#C69DC9",
  "display": "standalone",
  "orientation": "portrait-primary",
  "Scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "img/icons/icon-32.png",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "splash_pages": null
}
```

**注意：** 所有`icons`的src路径，sizes尺寸大小、type类型都需要一一对应。

* **display：** 控制了应用的显示模式，它有四个值可以选择：`fullscreen`、`standalone`、`minimal-ui` 和 `browser` 。

|模式|展现形式|
|---|---|
|fullscreen|全屏显示, 所有可用的显示区域都被使用, 并且不显示状态栏|
|standalone|独立应用模式，这种模式下打开的应用有自己的启动图标，并且不会有浏览器的地址栏。因此看起来更像一个 `Native App`|
|minimal-ui|该应用程序将看起来像一个独立的应用程序，与 `standalone` 相比，该模式会多出地址栏。 样式因浏览器而异。|
|browser|默认的设置，一般来说，会和正常使用浏览器打开样式一致。|

* **orientation：** 控制Web App的方向。设置某些值会具有类似锁屏的效果（禁止旋转）。具体的值包括：`any, natural, landscape, landscape-primary, landscape-secondary, portrait, portrait-primary, portrait-secondary`。

## 引用`manifest.json`

本站使用的是hexo默认主题，使用了ejs模板引擎，在公共`head.ejs`中添加下代码，其他主题应该类似。

```html
<link rel="manifest" href="/manifest.json">
```

部署后可以打开 控制台 - Application - Manifest / Service Workers / Storage，进行调试、查看缓存情况。

参考文档：
* https://www.npmjs.com/package/hexo-service-worker

---

欢迎访问：[个人博客地址](https://tiven.cn/p/6dfc667a/ "天問博客")
