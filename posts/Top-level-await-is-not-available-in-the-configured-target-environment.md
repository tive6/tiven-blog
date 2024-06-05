---
title: Top-level await is not available in the configured target environment
tags:
  - Vite
  - npm
categories:
  - Vite
abbrlink: c71326b0
date: 2024-01-26 14:54:51
---

当在使用 **Vite** 进行项目构建时，可能会遇到如下错误提示：`ERROR: Top-level await is not available in the configured target environment`。

![Vite](https://tiven.cn/static/img/vite-03-xbVS9jZm.jpg)

[//]: # (<!-- more -->)

## 问题原因

这个错误通常是由于项目配置中的目标浏览器环境不支持 JavaScript 的 top-level-await 特性。top-level-await 允许在模块的顶层直接使用 await 关键字，这在某些现代浏览器中是支持的。但是在一些老旧的浏览器中，这个特性是不支持的，所以在使用 Vite 进行项目构建时，会出现这个错误。

## 解决方案

1. 设置 `build.target` 为 **esnext**：将 Vite 配置文件中的 `build.target` 设置为 `esnext`。这样做会让 Vite 构建目标为支持最新 JavaScript 特性的环境。这是一个快速解决问题的方法，但可能不适用于需要兼容旧版浏览器的项目。

```javascript
// vite.config.js

build: {
   target: 'esnext'
}
```

2. **指定具体的浏览器版本**：如果你需要更精确的控制，可以将 `build.target` 设置为一个特定的浏览器版本数组。这允许你根据项目需求和用户群体定制支持的浏览器环境。

```javascript
// vite.config.js

build: {
   target: ["chrome89", "edge89", "firefox89", "safari15"]
}
```

3. **使用 `vite-plugin-top-level-await` 插件**：另一个选择是使用 `vite-plugin-top-level-await` 插件。这个插件可以帮助你在不支持 `top-level-await` 的环境中使用该特性。它通过转换代码来兼容旧浏览器。

首先安装该插件：

```bash
pnpm install vite-plugin-top-level-await --save-dev
```

然后在 Vite 配置文件中引入和使用该插件。

```javascript
import topLevelAwait from 'vite-plugin-top-level-await';

export default {
   plugins: [topLevelAwait()]
}
```

参考文档：

- 您可以在 [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) 上查看不同浏览器对 `top-level-await` 特性的支持情况。
- `vite-plugin-top-level-await` 插件的详细使用说明和示例可以在其 [GitHub 仓库](https://github.com/Menci/vite-plugin-top-level-await) 中找到。


---

欢迎访问：[天问博客](https://tiven.cn/p/c71326b0/ "天问博客-专注于大前端技术")

