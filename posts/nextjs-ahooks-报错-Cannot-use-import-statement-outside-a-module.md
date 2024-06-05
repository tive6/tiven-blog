---
title: nextjs + ahooks 报错 Cannot use import statement outside a module
tags:
  - React
  - NextJS
  - ahooks
categories:
  - React
abbrlink: e4d0c5d6
date: 2024-01-06 15:06:13
---

在 `nextjs` 中使用 `ahooks` 时，报错 `SyntaxError: Cannot use import statement outside a module`，如下图所示：

![nextjs + ahooks](https://tiven.cn/static/img/nextjs-02-YLcJNwIJ.jpg)

<!-- more -->

## 解决方案

* transpilePackages 官网介绍

> Next.js can automatically transpile and bundle dependencies from local packages (like monorepos) or from external dependencies (`node_modules`). This replaces the `next-transpile-modules` package.

翻译：**Next.js** 可以自动从本地包（如 monorepos ）或外部依赖项转译和捆绑依赖项 `node_modules` 。这将替换 `next-transpile-modules` 包。

* 配置

```js next.config.js
/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['ahooks'],
}
 
module.exports = nextConfig
```

参考文档：

- [https://github.com/alibaba/hooks/issues/2254](https://github.com/alibaba/hooks/issues/2254)
- [https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages)

---

欢迎访问：[天问博客](https://tiven.cn/p/e4d0c5d6/ "天问博客-专注于大前端技术")

