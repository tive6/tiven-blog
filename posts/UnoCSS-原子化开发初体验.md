---
title: UnoCSS 原子化开发初体验
tags:
- CSS3
- Vite
- React
categories:
- CSS3
abbrlink: 7886fb00
date: 2023-09-09 15:20:47
top: 12
---

**UnoCSS** 是一个即时的原子化 CSS 引擎，旨在灵活和可扩展。核心是不拘一格的，所有的 CSS 工具类都是通过预设提供的。再也不用为了取一个 **classname** 类名而烦恼了。

![UnoCSS 原子化](https://tiven.cn/static/img/unocss-01-SnYAGZfI.jpg)

<!-- more -->

## 一、UnoCSS 特点

1. 完全可定制：无核心工具，所有功能都通过预设提供
2. 即时的：无解析、无抽象语法树、无扫描。它比 Windi CSS 或 Tailwind JIT 快5倍
3. 轻量级的：零依赖且适用于浏览器：~6kb min+brotli 
4. 丰富的集成能力：对Vite、Webpack、PostCSS、CLI、VS Code、ESLint等工具的一流支持
5. 快捷方式：通过别名或动态分组实现工具类
6. 属性化模式：在属性中对工具类进行分组
7. 纯 CSS 图标：将任何图标作为单个类使用
8. 变体组：使用常见前缀的组合工具类的速记方式
9. CSS 指令：使用 @apply 指令在 CSS 中重用工具类
10. 编译模式：在构建时将多个类合成为一个类
11. 检查器：交互式检查和调试
12. CDN 运行时构建：只需一行 CDN 引入即可使用 UnoCSS

## 二、安装

> 这里以 Vue3 + Vite 为例

1. 安装 unocss 

```shell
pnpm add -D unocss
```

2. 在 `vite.config.js` 中配置

```js
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UnoCSS()]
})
```

3. 创建一个 `uno.config.jts` 配置文件：

```js
// uno.config.js
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS选项
})
```

4. 在 `main.js` 中引入

```js
// main.js

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import 'unocss/themes/solid.css'

// ..

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
```

## 三、使用

### 1、width、height

常用值：

- `w-0`：`width: 0`
- `w-1`：`width: 0.25rem`
- `h-100px`: `height: 100px`
- `h--10px`: `height: -10px`
- `h-full`: `height: 100%`
- `min-w-screen`: `min-width: 100vw`

```html
<div class="min-h-100px w-50vw"></div>
<!--等价于-->
<div style="min-height: 100px; width: 50vw;"></div>
```

### 2、background

```html
<div class="bg-#f00"></div>
<!--等价于-->
<div style="background-color: #f00"></div>
```

### 3、font、text-align

```html
<div class="text-center font-700 text-#f00 text-20px"></div>
<!--等价于-->
<div style="text-align: center; font-weight: 700; color: #f00; font-size: 20px;"></div>
```

### 4、border、border-radius

常用值：

- `rounded-none`：`border-radius: 0;`
- `rounded-l`：`border-top-left-radius: 0.25rem; border-bottom-left-radius: 0.25rem;`
- `rounded-full`: `border-radius: 9999px;`
- `border-0`: `border-width: 0;`
- `b-0`: `border-width: 0;`
- `b-1`: `border-width: 1px;`
- `b-b-1`: `border-bottom-width: 1px;`
- `b-solid`: `border-style: solid;`
- `b-#f00`: `border-color: #f00;`
- `b-rd`: `border-radius: 0.25rem;`
- `b-rounded`: `border-radius: 0.25rem;`
- `b-rd-6px`: `border-radius: 6px;`
- `b-rd-full`: `border-radius: 9999px;`
- `b-rd-50%`: `border-radius: 50%;`

```html
<div class="b-1 b-solid b-#f00 b-rd-6px"></div>
<!--等价于-->
<div style="border: 1px solid #f00; border-radius: 6px;"></div>
```

### 5、margin、padding

常用值：

- `m-0`：`margin: 0;`
- `mx-0`: `margin-left: 0; margin-right: 0;`
- `py-10px`: `padding-top: 10px; padding-bottom: 10px;`
- `p-10px`: `padding: 10px;`
- `p--20px`: `padding: -20px;`

```html
<div class="m-10px p-10px"></div>
<!--等价于-->
<div style="margin: 10px; padding: 10px;"></div>
```

### 6、flex

常用值：

- `flex`: `display: flex;`
- `flex-wrap`: `flex-wrap: wrap;`
- `flex-row`: `flex-direction: row;`
- `flex-col`: `flex-direction: column;`
- `flex-justify-between`: `justify-content: space-between;`
- `flex-justify-center`: `justify-content: center;`
- `flex-items-center`: `align-items: center;`

```html
<div class="flex flex-row justify-between items-center"></div>
<!--等价于-->
<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"></div>
```

### 7、overflow

常用值：

- `overflow-hidden`: `overflow: hidden;`
- `overflow-auto`: `overflow: auto;`
- `overflow-scroll`: `overflow: scroll;`
- `overflow-x-auto`: `overflow-x: auto;`

```html
<div class="min-h-100px max-h-60vh w-100% overflow-y-scroll"></div>
<!--等价于-->
<div style="min-height: 100px; max-height: 60vh; width: 100%; overflow-y: scroll;"></div>
```

### 8、position

常用值：

- `absolute`: `position: absolute;`
- `position-absolute`: `position: absolute;`
- `position-fixed`: `position: fixed;`
- `position-relative`: `position: relative;`
- `left-0`: `left: 0;`
- `top-5px`: `top: 5px;`
- `z-0`: `z-index: 0;`
- `z-100`: `z-index: 100;`

```html
<div class="absolute left-0 top-5px z-100"></div>
<!--等价于-->
<div style="position: absolute; left: 0; top: 5px; z-index: 100;"></div>
```

### 9、hover、focus、active、first、last

常用值：

- `hover-block`: `display: block;`
- `hover-text-pink`: `color: pink;`

```html
<div class="last-hover-text-pink"></div>
<!--等价于-->
<style>
  .last-hover-text-pink:hover:last-child {
    --un-text-opacity: 1;
    color: rgba(244, 114, 182, var(--un-text-opacity));
  }
</style>
```

### 10、display

常用值：

- `block`: `display: block;`
- `inline-block`: `display: inline-block;`
- `flex`: `display: flex;`
- `hidden`: `display: none;`

```html
<div class="flex"></div>
<!--等价于-->
<div style="display: flex;"></div>
```

### 11、important

```html
<div class="!-text-20px"></div>
<!--等价于-->
<div style="font-size: 20px !important;"></div>
``` 

## 四、总结

**UnoCSS** 与 **TailwindCSS** 类似，但是它更加轻量级，使用体验更好，而且它的中文文档也很完善，可以说是 **TailwindCSS** 的一个很好的替代品。
尤其是 **UnoCSS** 的自定义 classname 类名功能，不用 `[]` 包裹，更加直观，例如：

```html
<!-- 使用 TailwindCSS -->
<div class="w-[100px] h-[20vh]"></div>

<!-- 使用 UnoCSS -->
<div class="w-100px h-20vh"></div>
```

参考文档

- 英文：https://unocss.dev/
- 中文：https://alfred-skyblue.github.io/unocss-docs-cn/
- 样式查询：https://unocss.dev/interactive/

## 相关文章

* [Tailwind CSS 原子化开发初体验](https://tiven.cn/p/f6d841c8/)
* [UnoCSS 原子化开发初体验](https://tiven.cn/p/7886fb00/)

---

欢迎访问：[天问博客](https://tiven.cn/p/7886fb00/ "天问博客-专注于大前端技术")

