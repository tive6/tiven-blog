---
title: Next.js和sharp实现占位图片生成工具
tags:
- Node
- NextJS
categories:
- Node
abbrlink: aa610ce5
date: 2023-10-20 17:23:08
---

**占位图片（Placeholder Image）** 是前端开发中常用的工具，用于在网页加载慢或未加载完整的情况下，为图像元素提供占位。但是，有时候我们需要更灵活的方式来生成自定义占位图片以满足特定需求。在这篇博客中，我们将介绍如何使用 `Next.js `和 `sharp` 框架来实现一个占位图片生成工具，使你能够根据需要生成自定义占位图片。

![占位图片生成工具](https://tiven.cn/static/img/21333-s0Iv2dcT.jpg)

[//]: # (![占位图片生成工具]&#40;https://next-blog.tiven.cn/api/g/800/450?type=svg&bg=FEDC9B&text=%E5%8D%A0%E4%BD%8D%E5%9B%BE%E7%89%87%E7%94%9F%E4%BA%A7%E5%B7%A5%E5%85%B7&#41;)


* 上链接🔗：[https://next-blog.tiven.cn/api/g/400/200](https://next-blog.tiven.cn/api/g/400/200 "占位图片生成工具")，展示效果如上
* 使用文档🔗：[自定义占位图片生成工具使用文档](https://next-blog.tiven.cn/api/g/a/200 "占位图片生成工具使用文档")

## 一、占位图片生成工具的作用

占位图片生成工具是一个用于动态生成占位图片的应用程序，其作用如下：

作用：

1. 自定义占位图片生成： 通过该工具，你可以根据自己的需求生成各种自定义占位图片。这些图片可以包括不同的尺寸、颜色、文字内容和样式。
2. 提高开发效率： 在前端开发中，经常需要使用占位图片来展示图像占位，而手动创建这些占位图片是繁琐的。占位图片生成工具可以大大提高开发效率。
3. 支持不同格式： 该工具支持生成 **SVG** 和 **PNG** 格式的占位图片，以适应不同的项目需求。

## 二、使用场景

1. 网站开发： 在网站开发中，占位图片用于占据图像元素的位置，以便在图像加载时提供视觉反馈。生成工具可根据网页布局生成符合尺寸和颜色要求的占位图片。
2. 移动应用开发： 移动应用通常包含大量图像元素，使用占位图片可以提高应用的加载速度和性能。生成工具可为移动应用生成符合规格的占位图片。
3. 设计师协作： 占位图片生成工具也可以在设计师和开发者之间发挥作用。设计师可以使用工具生成占位图，以占据设计中的图像空白区域，从而更好地展示设计意图。
4. 自定义测试数据： 在开发和测试过程中，你可以使用占位图片作为测试数据，以确保应用程序正确处理图像元素的情况。

## 三、实现占位图片生成工具

以下是基于 `Next.js` 框架和 `sharp` 图片处理库实现的占位图片生成工具的示例代码。你可以在本地运行这个示例，以便更好地理解如何实现占位图片生成工具。

### 步骤1：创建Next.js项目

首先，让我们创建一个Next.js项目，以便开始构建我们的占位图片生成工具。使用以下命令初始化一个新项目：

```bash
npx create-next-app placeholder-image-generator
cd placeholder-image-generator
```

### 步骤2：设置API路由

在Next.js中，我们可以使用API路由来创建服务器端端点。我们将创建一个API路由，它将处理占位图片的生成请求。在项目根目录下创建一个名为 `pages/api/g/[...px].js` 的文件，这将是我们的生成工具的入口点。

```js
// pages/api/g/[...px].js

import sharp from 'sharp'
const colorString = require('color-string')

export default async function handler(req, res) {
  try {
    // 解析请求参数
    let { px, text, bg, color, size, type } = req.query;

    // 处理参数并设置默认值
    let [w, h] = px?.length >= 2 ? px : [200, 200];
    text = text || `${w} x ${h}`;
    bg = bg || 'ccc';
    color = color || '666';
    size = size || 32;

    // 处理颜色参数
    const bgRes = colorString.get(bg) || colorString.get(`#${bg}`);
    let bgStr = bgRes ? colorString.to.hex(bgRes.value) : '#ccc';
    const colorRes = colorString.get(color) || colorString.get(`#${color}`);
    let colorStr = colorRes ? colorString.to.hex(colorRes.value) : '#666';

    // 生成SVG图像
    let ratio = 1;
    let buffer = getSvgBuffer({
      w: ratio * w,
      h: ratio * h,
      bg: bgStr,
      color: colorStr,
      size,
      text,
    });

    // 根据类型响应不同格式的图像
    if (type === 'svg') {
      res.status(200).setHeader('Content-Type', 'image/svg+xml');
      res.end(buffer);
    } else {
      const img = await sharp(buffer, {
        density: 1000,
      })
          .withMetadata({
            density: 1000,
            quality: 100,
          })
          .png({
            palette: true,
            quality: 100,
            compressionLevel: 3,
          })
          .resize({
            width: +w,
            height: +h,
            fit: 'contain',
          })
          .toBuffer();

      res.status(200).setHeader('Content-Type', 'image/png');
      res.end(img);
    }
  } catch (e) {
    res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(getErrorHtml());
  }
}
```


### 步骤3：生成SVG图像的函数

我们在上述代码中使用了名为 `getSvgBuffer` 的函数来生成SVG图像。这个函数接受参数，包括宽度、高度、背景颜色、文字颜色、文字内容和文字大小。

```js
function getSvgBuffer({ w, h, bg, color, size, text }) {
  let textY = (+h + size / 2) / 2;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1"
     width="${w}" height="${h}">
    <rect width="${w}" height="${h}"
    fill="${bg}" style="fill:${bg};"/>
    <text x="50%" y="${textY}" 
    dominant-baseline="alphabetic" text-anchor="middle" 
    fill="none" stroke="${color}" font-size="${size}" 
    style="font-family:Verdana, Arial, lobster, Helvetica,fantasy,fangsong,monospace,emoji,'Gill Sans',system-ui,serif,Georgia,Times,'Times New Roman','黑体','STXingkai';" 
    fill-opacity="1">${text}</text>
  </svg>`;
  return Buffer.from(svg);
}
```

### 步骤4：处理错误情况

在上述代码中，我们使用 `getErrorHtml` 函数来生成包含错误信息的HTML页面。这是一个简单的HTML模板，用于在发生错误时向用户提供错误信息。

```javascript
function getErrorHtml() {
  let basePath = process.env.BASE_PATH
  
  let publicPath = `${basePath}/api/g`
  let backHome =
    process.env.NODE_ENV === 'development'
      ? `<a style="font-size: 16px;" href="/">← 返回首页</a>`
      : ''
  return `
    <head>
      <link rel="icon" href="${basePath}/favicon.ico">
      <title>自定义占位图</title>
      <style>
      code {
        color: #98c379;
      }
      table {
        border-collapse: collapse;
        width: 600px;
      }
      th, td {
        padding: 5px 10px;
        text-align: left;
      }
      .box {
        padding: 20px 50px;
      }
      .back {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .img {
        display: block;
        margin: 10px 0;
      }
      </style>
    </head>
    <div class="box">
      <h1 class="back">
        URL 地址异常
        ${backHome}
      </h1>
      <p>URL格式参考如下：</p>
      <ol>
      <li>
        默认：<a href="${publicPath}/200/200">${publicPath}/200/200</a>
        <br>
        <img style="width: 200px; height: 200px" class="img" src="${publicPath}/200/200" alt="tiven-img"> 
      </li>
      <li>
        Svg占位图：<a href="${publicPath}/200/100?type=svg&bg=FEDC9B">${publicPath}/200/100?type=svg&bg=FEDC9B</a>
        <br>
        <img style="width: 200px; height: 100px" class="img" src="${publicPath}/200/100?type=svg&bg=FEDC9B" alt="tiven-img"> 
      </li>
      <li>
        自定义大小：<a href="${publicPath}/640/320">${publicPath}/640/320</a>
        <br>
        <img style="width: 640px; height: 320px" class="img" src="${publicPath}/640/320" alt="tiven-img"> 
      </li>
      <li>
        自定义内容：<a href="${publicPath}/400/200?bg=palevioletred&color=purple&text=React&size=30">${publicPath}/400/200?bg=palevioletred&color=purple&text=React&size=30</a>
        <br>
        <img style="width: 400px; height: 200px" class="img" src="${publicPath}/400/200?bg=palevioletred&color=purple&text=React&size=30" alt="tiven-img">  
      </li>
      </ol>
      <table border="1" borderColor="#ddd">
      <tr>
      <th>参数(可选)</th>
      <th>作用</th>
      </tr>
      <tr>
      <td>bg</td>
      <td>背景色，默认：<code>#ccc</code></td>
      </tr>
      <tr>
      <td>color</td>
      <td>文字颜色，默认：<code>#666</code></td>
      </tr>
      <tr>
      <td>text</td>
      <td>文字，默认：<code>200x200</code> ( width x height )</td>
      </tr>
      <tr>
      <td>size</td>
      <td>文字大小，默认：<code>32</code></td>
      </tr>
      <tr>
      <td>type</td>
      <td>占位图类型，默认：<code>png</code>，可选 svg</td>
      </tr>
      </table>
      <p><b>bg</b>，<b>color</b> 颜色参数可以传 <u>hex类型</u> 的值：<code>50A6EE</code>，<code>f00</code>；</p>
      <p>也可以传表示颜色的 <u>英文单词</u> ：<code>red</code>、<code>pink</code>、<code>red</code>等。</p>
      <p style="font-size: 20px;">完整技术实现博客：<a href="https://tiven.cn/p/aa610ce5/" target="_blank" title="Next.js和sharp实现占位图片生成工具">Next.js和sharp实现占位图片生成工具</a></p>
    </div>
    `
}
```

### 步骤5：运行和测试

现在，你可以启动你的 Next.js 应用程序并测试占位图片生成工具。运行以下命令：

```shell
npm run dev
```

然后，在浏览器中访问 [http://localhost:3000/api/g/400/200](http://localhost:3000/api/g/400/200 "自定义占位图工具") ，并尝试不同的参数组合，以生成自定义的占位图片。

## 四、总结

在这篇博客中，我们深入探讨了如何使用 `Next.js` 框架和 `sharp` 图片处理库创建一个占位图片生成工具。这个工具允许你根据用户的参数生成自定义占位图片，非常适合前端开发中的图像占位需求。通过这个示例，你可以学习如何设置API路由、处理请求参数、生成SVG图像和处理错误情况。这将使你在前端开发中更加灵活，满足不同项目的需求。无论是网站开发、移动应用开发还是设计师和开发者之间的协作，占位图片生成工具都可以提高工作效率，改善用户体验。

---

欢迎访问：[天问博客](https://tiven.cn/p/aa610ce5/ "天问博客-专注于大前端技术")

