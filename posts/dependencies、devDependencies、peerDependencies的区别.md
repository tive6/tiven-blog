---
title: dependencies、devDependencies、peerDependencies的区别
tags:
- Node
- npm
categories:
- Node
abbrlink: 28387585
date: 2023-08-23 15:14:15
---

在 Node.js 项目中，我们通常会在 package.json 文件的 dependencies、devDependencies 和 peerDependencies 字段中指定所需的依赖包，但是这三个字段的区别是什么呢？

![npm & package.json](https://tiven.cn/static/img/img-npm-02-fxFXF8douEz-BeV-vnEmk.jpg)

<!-- more -->

## 一、dependencies

**dependencies** 字段中指定的是项目运行时需要的依赖包，也就是生产环境下需要的依赖。这些依赖将会被安装在生产环境中，并被打包进最终的发布版本中。一般来说，这些依赖是指与项目密切相关的库和框架，比如 express、lodash、axios 等。当我们使用 npm install 安装项目时，dependencies 中指定的依赖包也会被自动安装。

使用场景：适用于项目的主要功能模块、框架以及必要的第三方库。这些依赖项会随着应用程序一起部署，并在生产环境中运行。

## 二、devDependencies

**devDependencies** 字段中指定的是开发环境下所需的依赖包。这些依赖通常是开发人员在编写和测试代码时使用的，而不会被打包到最终的发布版本中。一般来说，这些依赖包是用于构建、测试、调试等用途，比如 Babel、Webpack、Mocha 等。当我们使用 npm install 安装项目时，devDependencies 中指定的依赖包不会被安装。若需要安装 devDependencies 中的依赖，需要使用 npm install --dev。

使用场景：适用于开发过程中的辅助工具、测试框架、构建工具、代码质量检查工具等。这些依赖项不会影响应用程序的实际运行，只在开发环境中使用。

## 三、peerDependencies

**peerDependencies** 字段中指定的是项目所依赖的其他包的版本号范围。这些依赖会要求安装方在安装项目时手动安装所需要的版本。peerDependencies 通常用于告知用户项目运行时所依赖的某些库或框架的版本，而且这些库或框架已经被全局安装或者被安装在项目外面。peerDependencies 可以确保安装的库版本与项目所依赖的版本一致，从而减少版本兼容性问题。

使用场景：

1. 开发库或模块依赖特定版本的外部库：如果你正在开发一个库或模块，它依赖于外部库的特定版本来实现某些功能，但你不希望将这些外部库包含在你的库中，那么你可以在你的 package.json 中指定这些外部库为 peerDependencies。
2. 版本兼容性：有时，不同的库可能依赖于同一个外部库的不同版本，这可能导致版本冲突。通过在你的库中使用 peerDependencies，你可以确保使用者在安装你的库时会同时满足这些依赖项的版本要求，从而避免版本冲突。
3. 库的可插拔性：如果你的库需要与其他库或模块协同工作，而这些库或模块可能在项目中以插件或扩展的形式存在，你可以使用 peerDependencies 来确保插件与你的库兼容。
4. 提供建议性的依赖项：有时候，你可能希望为使用者提供一些建议性的依赖项，虽然这些依赖项不是强制性的。在这种情况下，你可以将这些依赖项列为 peerDependencies，使用者可以根据自己的需求来决定是否安装。

使用 **peerDependencies** 时需要注意以下几点：

* 使用 **peerDependencies** 不会自动安装依赖项，它只是告诉使用者需要安装这些外部依赖项，并确保版本兼容性。
* 使用 **peerDependencies** 时，使用者需要手动安装符合要求的外部依赖项，以便与你的库或模块正常工作。
* 为了避免冲突和混淆，建议在文档中清楚地说明使用者需要安装的外部依赖项以及版本要求。

## 四、总结

```json
{
  "dependencies": {
    "@ant-design/icons": "^5.0.1",
    "ahooks": "^3.7.5",
    "antd": "^5.2.3",
    "axios": "^1.3.4",
    "dayjs": "^1.11.7",
    "mobx": "^6.8.0",
    "mobx-react": "^7.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^3.1.0",
    "eslint": "^8.35.0",
    "msw-tools": "^1.0.52",
    "prettier": "^2.8.4",
    "sass": "^1.58.3",
    "stylelint": "^15.2.0"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

以上三个字段的区别在于：

- **dependencies** 表示项目运行所必需的依赖，将会被打包进最终的发布版本中。

- **devDependencies** 表示在项目的开发环境下所需要的依赖，不会被打包进最终的发布版本中。

- **peerDependencies** 表示项目依赖的其他包的版本号范围，用于确保安装的库与项目所依赖的库版本一致。

---

欢迎访问：[天问博客](https://tiven.cn/p/28387585/ "天问博客-专注于大前端技术")

