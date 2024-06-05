---
title: Vite3 + Svelte3使用@import导入scss样式
tags:
- Vite
- Svelte
- CSS
categories:
- Svelte / Solid
abbrlink: bea28b54
date: 2022-09-14 16:36:18
---

近年来，前端技术日新月异，**Vite、Vue3、Svelte、SolidJS** 等框架工具大放异彩，身为一个前端开发，总感觉一刻不学习就要out了。最近使用 **Vite3 + Svelte3** 来构建封装自定义的 `Web Components` ，开始了艰难的爬坑之旅，本文记录一下：`Vite3 + Svelte3`配置 `Sass` 预处理器，在 `Svelte` 单文件组件中使用 `@import` 导入 `scss` 样式文件。

![Vite + Svelte](https://tiven.cn/static/img/img-svelte-01-hhx5v16WhRd3jTpXst242.jpg)

[//]: # (<!-- more -->)

## 前言

**Svelte** 是一种全新的构建用户界面的方法。传统框架如 **React** 和 **Vue** 在浏览器中需要做大量的工作，而 **Svelte** 将这些工作放到构建应用程序的编译阶段来处理。

## 配置

1. 安装 `svelte-preprocess` 和 `node-sass` 插件

```shell
npm install svelte-preprocess node-sass --save-dev
```

2. 配置 `vite.config.js` 文件

```js
// vite.config.js
import sveltePreprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      // ...
      preprocess: sveltePreprocess(),
    }),
  ],
});
```

3. 配置 **Svelte** 单文件组件

```html
// index.svelte

<div class="box">
  <a href="https://tiven.cn">天问博客</a>
</div>

<script>
  let n = 0;
</script>

<style lang="scss" type="text/scss">
  @import "index.scss";
</style>
```

## 场景分析

1. 在 `<style>` 中使用 `@import "index.scss"` 导入样式，在打包的时候会把样式混入 js 文件中，在封装第三方独立组件时推荐使用（如：独立的自定义的 **Web Components** 组件），这样在使用该组件时就不用额外引用 css 样式文件。
2. 在 `<script>` 中使用 `import 'index.scss'` 引入样式，在打包的时候会把样式单独打包成 `.css` 文件，在构建完整的 `Web` 应用时推荐使用。

* 依赖版本信息：

```json
{
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^1.0.2",
      "node-sass": "^7.0.3",
      "sass": "^1.54.9",
      "svelte": "^3.49.0",
      "svelte-preprocess": "^4.10.7",
      "vite": "^3.1.0"
  }
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/bea28b54/ "天问博客-专注于大前端技术")
