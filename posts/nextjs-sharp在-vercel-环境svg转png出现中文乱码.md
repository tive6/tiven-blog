---
title: 'nextjs + sharp在 vercel 环境svg转png出现中文乱码'
tags:
- Sharp
- NextJS
- Vercel
categories:
- Node
abbrlink: '75e23343'
date: 2023-11-03 17:37:51
---

在之前一篇博客 [Next.js和sharp实现占位图片生成工具](https://tiven.cn/p/aa610ce5/ "Next.js和sharp实现占位图片生成工具 | 天问博客")，详细介绍了使用 `Next.js ` + `sharp` + `Vercel` 来实现一个 **占位图片生成工具**，遇到一个奇怪的问题：在本地开发环境，英文、数字、中文字符自定义内容，都能正常渲染。但是发布到 Vercel 生产环境，自定义内容除了英文字符和数字外，**中文字符** 显示为 `Unicode` 码位(**乱码**)，如下图所示。

![svg转png中文乱码](https://tiven.cn/static/img/sharp-svg-zh-err-RsI75_HX.jpg)

[//]: # (<!-- more -->)

## 问题原因

经过排查，发现是 `sharp` 库在 `vercel` 生产环境下，对 `svg` 转 `png` 时，**中文字符** 会出现乱码。而在本地开发环境，`sharp` 库对 `svg` 转 `png` 时，**中文字符** 不会出现乱码。
在 `vercel` 平台查看 log 日志，发现了错误提示：`Fontconfig error: No writable cache directories`。
进一步定位，说明是 `vercel` 容器环境没有支持中文的字体，因此无法正常渲染中文字符。

## 解决方案

1. 在 `nextjs` 项目根目录下，创建 `fonts` 文件夹，将中文字体文件 `NotoSansSC-Regular.ttf` 放入 `fonts` 文件夹中。我这里使用的是 `NotoSansSC-Regular.ttf` 字体，支持简体中文字符。下载地址：https://github.com/notofonts/noto-cjk
2. 在 `fonts` 文件夹下，创建 `fonts.conf` 文件，内容如下：

```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>/var/task/fonts/</dir>
  <cachedir>/tmp/fonts-cache/</cachedir>
  <config></config>
</fontconfig>
```

3. 在 `sharp` 处理 `svg` 转 `png` 函数所在文件的头部加入如下代码：

```js
resolve(process.cwd(), 'fonts', 'fonts.conf')
resolve(process.cwd(), 'fonts', 'NotoSansSC-Regular.ttf')
```

4. 在项目根目录下创建一个 `.env` 环境变量文件，内容如下：

```env
FONTCONFIG_PATH=/var/task/fonts
```

5. 在 `svg` 中设置 `font-family`，如下：

```js
function getSvgBuffer({ w, h, bg, color, size, text }) {
  let textY = (+h + size / 2) / 2
  let svg = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"
    width="${w}" height="${h}">
    <rect width="${w}" height="${h}"
    fill="${bg}" style="fill:${bg};"/>
    <text x="50%" y="${textY}" 
    style="font-family: 'Noto Sans', 'Noto Sans SC', sans-serif;"
    dominant-baseline="alphabetic" text-anchor="middle" 
    stroke="none" stroke-width="0" 
    font-size="${size}" fill="${color}" 
    fill-opacity="1">${text}</text>
</svg>`
  svg = '<?xml version="1.0" encoding="UTF-8"?>' + svg
  return Buffer.from(svg, 'utf-8')
}
```

6. 在 `vercel` 平台上配置环境变量 `FONTCONFIG_PATH`，值为 `/var/task/fonts`。

![FONTCONFIG_PATH](https://tiven.cn/static/img/vercel-env-var-MoYdnsll.jpg)

7. 再次发布到 `vercel` 平台，问题解决。

参考文档：

* https://sharp.pixelplumbing.com/install#fonts
* https://github.com/lovell/sharp/issues/3698
* https://github.com/lovell/sharp/issues/1875

---

欢迎访问：[天问博客](https://tiven.cn/p/75e23343/ "天问博客-专注于大前端技术")

