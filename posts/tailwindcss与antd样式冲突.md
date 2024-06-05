---
title: tailwindcss与antd样式冲突
tags:
- React
- CSS
categories:
- React
abbrlink: 2baa232b
date: 2023-08-20 16:31:47
---

**tailwindcss** 是一个优秀的 CSS 原子化框架，大大降低了使用者对 classname 命名的心智负担。在 PC 端web项目中配合 **antd** 框架使用，可以极大提高开发效率，但是按照官网文档进行集成使用，大概率会遇到本文所提到的tailwindcss与antd样式冲突问题。

![tailwindcss & antd](https://tiven.cn/static/img/antd-01-3mvOEjp_.jpg)

<!-- more -->

## 一、项目依赖

* package.json 

```json
{
  "dependencies": {
    "@ant-design/icons": "^5.0.1",
    "ahooks": "^3.7.5",
    "antd": "^5.8.4",
    "axios": "^1.3.4",
    "dayjs": "^1.11.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.2",
    "zustand": "^4.4.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.15",
    "postcss": "^8.4.28",
    "postcss-scss": "^4.0.7",
    "prettier": "^3.0.2",
    "sass": "^1.66.1",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-imp": "^2.4.0"
  }
}
```

## 二、问题解决

1. 问题原因：在使用 tailwindcss 时，会导入大量的 **tailwindcss** 默认属性，而默认样式中 `button, [type='button']` 包含了 `background-color: transparent;` 从而导致 antd Button 按钮背景色变成透明。
2. 解决办法：禁止 tailwindcss 的默认属性，配置 `tailwind.config.js` ，`corePlugins.preflight` 设置为 `false`。

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,  // 添加这一行
  },
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/2baa232b/ "天问博客-专注于大前端技术")

