---
title: Tailwind CSS 原子化开发初体验
tags:
- CSS3
- Vite
- Vue
categories:
- CSS3
abbrlink: f6d841c8
date: 2023-09-08 15:24:28
---

**Tailwind CSS** 的工作原理是扫描所有 HTML 文件、JavaScript 组件以及任何模板中的 CSS 类（class）名，然后生成相应的样式代码并写入到一个静态 CSS 文件中。他快速、灵活、可靠，没有运行时负担。再也不用为了取一个 **classname** 类名而烦恼了。

![Tailwind CSS](https://tiven.cn/static/img/tailwind-01-hoM_DkxC.jpg)

[//]: # (<!-- more -->)

## 一、安装

> 这里以 React + Vite 为例

1. 安装依赖，生成 `postcss.config.js` 和 `tailwind.config.js` 配置文件

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

2. 在 `postcss.config.js` 中引入 `tailwindcss` 和 `autoprefixer`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

3. 配置 `tailwind.config.js` 文件

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
```

4. 新建 `tailwind.css` 入口文件

```css
/* @/assets/css/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. 在 `main.jsx` 中引入 `tailwind.css` 文件

```js
import { ConfigProvider } from 'antd'
import ReactDOM from 'react-dom/client'
import zhCN from 'antd/locale/zh_CN'
import Routers from '@/router'
import '@/assets/css/tailwind.css'
import 'dayjs/locale/zh-cn'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider locale={zhCN}>
      <Routers />
    </ConfigProvider>
)
```

## 二、使用

### 1、width、height、line-height

常用值：

- `w-[200px]`：width: 200px;
- `h-[100vh]`：height: 100vh;
- `min-h-[100vh]`：min-height: 100vh;
- `max-h-[100vh]`：max-height: 100vh;
- `w-full`：width: 100%;
- `h-[100%]`：height: 100%;
- `min-h-full`：min-height: 100%;
- `min-h-[calc(100vh-60px)]`: min-height: calc(100vh - 60px);
- `leading-none`：line-height: 1;
- `leading-tight`：line-height: 1.25;
- `leading-3`：line-height: 0.75rem; /* 12px */
- `leading-4`：line-height: 1rem; /* 16px */
- `leading-[20px]`：line-height: 20px;

```html
<div class="w-[200px] min-h-[100vh]"></div>
<!--等价于-->
<div style="width: 200px; min-height: 100vh"></div>
```

### 2、background

```html
<div class="bg-[#f00]"></div>
<!--等价于-->
<div style="background-color: #f00"></div>
```

### 3、font、text-align

```html
<div class="text-[#f00] text-[20px] font-bold text-center"></div>
<!--等价于-->
<div style="color: #f00; font-size: 20px; font-weight: 700; text-align: center;"></div>
```

### 4、border、border-radius

常用值：

- `rounded-none`：`border-radius: 0;`
- `rounded`：0.25rem; /* 4px */
- `rounded-md`：小圆角
- `rounded-lg`：大圆角
- `rounded-full`：圆形

```html
<div class="border-[1px] border-[#f00] border-solid rounded-[6px]"></div>
<!--等价于-->
<div style="border: 1px solid #f00; border-radius: 6px;"></div>
```

参考：https://www.tailwindcss.cn/docs/border-radius

### 5、margin、padding

常用值：

- `m-0`：margin: 0;
- `mx-0`: margin-left: 0; margin-right: 0;
- `my-0`: margin-top: 0; margin-bottom: 0;
- `mt-[10px]`: margin-top: 1px;
- `m-[15px]`: margin: 15px;

```html
<div class="m-[10px] p-[10px]"></div>
<!--等价于-->
<div style="margin: 10px; padding: 10px;"></div>
```

参考：https://www.tailwindcss.cn/docs/margin

### 6、flex

常用值：

- `flex`：display: flex;
- `flex-row`：flex-direction: row;
- `flex-col`：flex-direction: column;
- `flex justify-between`: justify-content: space-between;
- `flex justify-center`: justify-content: center;
- `flex items-center`: align-items: center;

```html
<div class="flex flex-row justify-between items-center"></div>
<!--等价于-->
<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"></div>
```

参考：https://www.tailwindcss.cn/docs/flex

### 7、overflow 

常用值：

- `overflow-hidden`：overflow: hidden;
- `overflow-auto`：overflow: auto;
- `overflow-x-auto`：overflow-x: auto;
- `overflow-y-scroll`：overflow-y: scroll;

```html
<div class="overflow-y-scroll"></div>
<!--等价于-->
<div style="overflow-y: scroll;"></div>
```

参考：https://www.tailwindcss.cn/docs/overflow

### 8、hover、focus、active、first、last

常用值：

- `hover:bg-[#f00]`：鼠标悬浮时的背景色
- `first:bg-[#f00]`：第一个子元素的背景色

```html
<div class="hover:bg-[#f00] focus:bg-[#f00] active:bg-[#f00]"></div>
```

参考：https://www.tailwindcss.cn/docs/hover-focus-and-other-states

### 9、important

```html
<div class="!tw-font-bold"></div>
<!--等价于-->
<div style="font-weight: 700 !important;"></div>
```

参考：https://www.tailwindcss.cn/docs/configuration#important

### 10、display

常用值：

- `hidden`：display: none;
- `block`：display: block;
- `inline-block`：display: inline-block;
- `flex`：display: flex;

```html
<div class="flex"></div>
<!--等价于-->
<div style="display: flex;"></div>
```

### 11、white-space、text-overflow

常用值：

- `whitespace-normal`：white-space: normal;
- `whitespace-nowrap`：white-space: nowrap;
- `whitespace-pre`：white-space: pre;
- `whitespace-pre-wrap`：white-space: pre-wrap;
- `whitespace-break-spaces`：white-space: break-spaces;
- `text-ellipsis`：text-overflow: ellipsis;
- `text-clip`：text-overflow: clip;
- `truncate`：text-overflow: ellipsis; overflow: hidden; white-space: nowrap;（文本溢出隐藏）

```html
<div class="w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">文本溢出隐藏</div>
<!--简洁写法-->
<div class="w-[150px] truncate">truncate 文本溢出隐藏</div>
<!--等价于-->
<div style="width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">truncate 文本溢出隐藏</div>
```

## 相关文章

* [Tailwind CSS 原子化开发初体验](https://tiven.cn/p/f6d841c8/)
* [UnoCSS 原子化开发初体验](https://tiven.cn/p/7886fb00/)

---

欢迎访问：[天问博客](https://tiven.cn/p/f6d841c8/ "天问博客-专注于大前端技术")

