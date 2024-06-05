---
title: vite + postcss-prefix-selector 增加统一作用域
tags:
  - Vite
  - postcss
categories:
  - Vite
abbrlink: 8ed71884
date: 2024-01-30 10:35:11
---

在前端开发中，随着项目规模的扩大，特别是在使用 **微前端** 架构后，基座应用和子应用之间的样式冲突和作用域管理成为了一项挑战。为了解决这个问题，我们可以利用 Vite 构建工具和 PostCSS 插件 `postcss-prefix-selector`，通过增加统一的作用域前缀来有效地隔离样式，确保样式仅在特定组件或模块中生效。本文将详细介绍如何在 Vite 项目中使用 `postcss-prefix-selector` 插件，实现样式的统一作用域管理。

![vite postcss-prefix-selector](https://tiven.cn/static/img/vite-04-omLE_vlH.jpg)

[//]: # (<!-- more -->)

## 1. 安装 Vite 项目

首先，确保你已经创建了一个基于 **Vite** 的项目。如果还没有，可以通过以下命令进行初始化：

```bash
pnpm create vite my-vite-project
cd my-vite-project
npm install
```

## 2. 安装 `postcss-prefix-selector` 插件

在 Vite 项目中使用 PostCSS 插件，需要先安装相关的依赖：

```bash
npm install postcss postcss-prefix-selector -D
```

## 3. 配置 PostCSS

使用使用以下两种方式之一配置 PostCSS：

* 在项目根目录下创建 `postcss.config.js` 文件，配置 `PostCSS` 插件：

```javascript
// postcss.config.js

module.exports = {
  plugins: [
    // require('postcss-pxtorem')({
    //   rootValue: 37.5, //1rem的大小
    //   propList: ['*'], //需要转换的属性
    //   selectorBlackList: ['.norem', '.vc-*'], //过滤掉不需要转换的类名
    //   exclude: /node_modules/i, //过滤掉node_modules文件夹下的文件
    // }),
    require('postcss-prefix-selector')({
      prefix: '.my-app',
      transform: function (prefix, selector, prefixedSelector) {
        // 这里可以排除一些特定的选择器
        if (selector === 'body' || selector === 'html') {
          return selector
        }
        return prefixedSelector
      },
      // exclude: ['.global'], // 排除全局样式的前缀添加
    }),
    // 其他 PostCSS 插件...
  ],
}
```

* 在 `vite.config.js` 中配置 `PostCSS` 插件：

```javascript
// vite.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postCssPrefixSelector from 'postcss-prefix-selector';

export default defineConfig({
  plugins: [
    vue(),
  ],
  css: {
    postcss: {
      plugins: [
        // postCssPxToRem({
        //   rootValue: 37.5, //1rem的大小
        //   propList: ['*'], //需要转换的属性
        //   selectorBlackList: ['.norem', '.vc-*'], //过滤掉不需要转换的类名
        //   exclude: /node_modules/i, //过滤掉node_modules文件夹下的文件
        // }),
        postCssPrefixSelector({
          prefix: '.my-app', // 添加的前缀
          transform(prefix, selector, prefixedSelector) {
            // 这里可以排除一些特定的选择器
            if (selector === 'body' || selector === 'html') {
              return selector
            }
            return prefixedSelector
          },
          // exclude: ['.global'], // 排除全局样式的前缀添加
        }),
      ],
    },
  },
})
```

## 4. 选择统一作用域容器

在 `<div id="root"></div>` 根节点或 `App` 组件中添加统一作用域前缀，以下是两种方式二选一即可：

* 在 `index.html` 文件中添加样式，添加统一作用域前缀：

```html 
<!-- index.html -->

<body>
  <div id="app" class="my-app"></div>
</body>
```

* 在 `App.vue` 文件中添加样式，添加统一作用域前缀：

```html
<!-- App.vue -->

<template>
  <div class="my-app app-container"></div>
</template>
```

## 5. 在浏览器中查看效果

现在，你可以在你的样式文件中使用统一的作用域前缀，确保样式只在特定的范围内生效：

开发时样式文件：

```css
/* style.css */

.app-title {
    font-size: 14px;
    font-weight: 500;
}

.app-desc {
    margin: 10px 0;
    line-height: 1.6;
}
```

浏览器中会看到：

```css
.my-app .app-title {
    font-size: 14px;
    font-weight: 500;
}

.my-app .app-desc {
    margin: 10px 0;
    line-height: 1.6;
}
```

通过以上步骤，你成功地在 Vite 项目中使用了 `postcss-prefix-selector` 插件，实现了样式的统一作用域管理。这将有助于降低样式冲突的风险，提高项目的可维护性和可扩展性。

参考文档：

- [https://www.npmjs.com/package/postcss-prefix-selector](https://www.npmjs.com/package/postcss-prefix-selector)

---

欢迎访问：[天问博客](https://tiven.cn/p/8ed71884/ "天问博客-专注于大前端技术")

