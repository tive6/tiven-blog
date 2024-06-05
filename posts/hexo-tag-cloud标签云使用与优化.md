---
title: hexo-tag-cloud标签云使用与优化
abbrlink: 8dbf2af
date: 2021-10-18 15:49:35
tags:
- Hexo
categories:
- Hexo / Markdown
---

`Hexo`默认主题`landscape`自带的`tagcloud`标签云不是太美观，于是在`npm`网站上搜索了一下，最终决定使用 `hexo-tag-cloud` 插件，使用了`Canvas`渲染，有3D效果，整体效果还是不错的。

![Hexo-标签云](https://tiven.cn/static/img/img-post-16-OG9r7c2QXdoxmdMCbWTpS.jpg)

<!-- more -->

## 安装插件

```sh
npm i -S hexo-tag-cloud
```

## 使用

>Hexo默认使用的是`ejs`模板引擎，这里就以 ejs 为例。

1. 找到 `tagcloud.ejs` 文件，完整路径如下：
   
        hexo/themes/landscape/layout/_widget/tagcloud.ejs

 修改为以下内容：

```ejs
<% if (site.tags.length) { %>
  <script type="text/javascript" charset="utf-8" src="<%- url_for('/js/tagcloud.js') %>"></script>
  <script type="text/javascript" charset="utf-8" src="<%- url_for('/js/tagcanvas.js') %>"></script>
  <div class="widget-wrap">
    <h3 class="widget-title"><%= __('tagcloud') %></h3>
    <div id="myCanvasContainer" class="widget tagcloud">
      <canvas width="300" height="300" id="resCanvas" style="width:100%;height:100%;">
        <%- tagcloud() %>
      </canvas>
    </div>
  </div>
<% } %>
```

2. 在 `hexo/themes/landscape/source/js` 目录下新建 `tagcloud.js` 和 `tagcanvas.js` 文件，内容可以打开如下链接进行复制：
    * [tagcloud.js](https://mhexo.github.io/js/tagcloud.js "tagcloud")
    * [tagcanvas.js](https://mhexo.github.io/js/tagcanvas.js "tagcanvas")
      
3. 整体展现如下图所示，具体交互效果可以浏览 [本站](https://tiven.cn/ "天問博客") 的标签云。

![天問-TagCloud](https://tiven.cn/static/img/img-tag-cloud-BlG1fBrVsp7dwW9o2j2I-.jpg)

## 优化

原插件中`Canvas`设置的是固定宽高，虽然设置了 `style="width:100%;"`，当屏幕宽度改变，Canvas大小看似也跟着改变了，但实际上内部`width`和`height`的值依然没有变化，这就导致展示的Canvas会被放大或缩小`变糊`，影响整体美观。所以在此基础上做了一点点优化。

* `tagcloud.js` 逻辑优化

```js
// tagcloud.js
// 优化代码 4 start
document.addEventListener('DOMContentLoaded', loadTagCloud)
// 优化代码 4 end

// 优化代码 3 start
// 防抖函数
function debounce(fn, delay){
  var timer = null;
  return function(){
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function(){
      fn.apply(context, args);
    }, delay);
  };
};
// 优化代码 3 end

function loadTagCloud() {
  // console.log('tag cloud plugin rock and roll!');

  try {
    // 配置参数 5 start
    TagCanvas.textFont = 'Helvetica';
    TagCanvas.textColour = '#409EFF';
    TagCanvas.textHeight = 16;
    TagCanvas.outlineColour = '#E6A23C';
    TagCanvas.maxSpeed = 0.05;
    TagCanvas.freezeActive = true;
    TagCanvas.outlineMethod = 'block';
    TagCanvas.minBrightness = 0.2;
    TagCanvas.depth = 0.92;
    TagCanvas.pulsateTo = 0.6;
    TagCanvas.initial = [0.1,-0.1];
    TagCanvas.decel = 0.5;
    TagCanvas.reverse = true;
    TagCanvas.hideTags = false;
    TagCanvas.shadow = '#fff';
    TagCanvas.shadowBlur = 3;
    TagCanvas.weight = false;
    TagCanvas.imageScale = null;
    TagCanvas.fadeIn = 500;
    TagCanvas.clickToFront = 600;
    TagCanvas.lock = false;
    // 配置参数 5 end
    
    // 渲染
    render()

    function render() {
      // 优化代码 1 start
      var $box = $('#resCanvas');
      var dpr = 1.2
      $box.get(0).width = $box.width() * dpr;
      $box.get(0).height = $box.width() * dpr;
      // 优化代码 1 end
      TagCanvas.Start('resCanvas');
      TagCanvas.tc['resCanvas'].Wheel(true)
    }

    // 优化代码 2 start
    $(window).resize(throttle(render, 500));
    // 优化代码 2 end

  } catch(e) {
    // console.log(e);
    document.getElementById('myCanvasContainer').style.display = 'none';
  }
};
```

### 优化点

1. Canvas的`width`和`height`根据外层容器的`宽度`来设置。code：`优化代码 1`
2. 使用`resize`监听window屏幕的大小变化，动态设置Canvas宽高，重新渲染Canvas画布。code：`优化代码 2`
3. 使用`debounce`防抖函数，控制重新渲染Canvas的次数，提高整体性能。code：`优化代码 3`
4. 用`document`的`DOMContentLoaded`事件替换原来的`window.onload`事件，这样不用等待图片加载完毕再渲染Canvas，可以大大提升tagCloud的展示速度。code：`优化代码 4`

优化后的js文件：
* [tagcloud.js](https://www.tiven.cn/js/tagclouds.js "tagclouds")
* [tagcanvas.js](https://www.tiven.cn/js/tagcanvas.js "tagcanvas")
  
**温馨提示：** 可以根据自己的主题来设置标签云中动画时间、文字大小、颜色、点击颜色、点击效果等等，具体参数如上所示code：`配置参数 5`。

参考文档：
* https://www.npmjs.com/package/hexo-tag-cloud
* https://mhexo.github.io/archives/

---

欢迎访问：[个人博客地址](https://tiven.cn/p/8dbf2af/ "天問博客")
