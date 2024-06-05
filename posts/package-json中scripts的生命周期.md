---
title: package.json中`npm scripts`的生命周期
abbrlink: a7460bda
date: 2021-11-02 14:24:07
tags:
- npm
- 前端工程化
categories:
- pnpm / npm / yarn
---

在`前端`这个大生态中，`npm`有着至关重要的作用。所有第三方包、插件都依赖于`npm`的`package.json`文件，其中`npm scripts`包含多种`生命周期`，可以组织整个`前端工程`的工具链。

![NPM Scripts](https://tiven.cn/static/img/hourglass-time-hours-sand-preview-tOqBton_9Qy7cZsnLctFJ.jpg)

<!-- more -->

> 以Vite构建工具，来讲解`npm scripts`的生命周期。

## 1、package.json

* 项目初始化的`package.json`

```json
{
  "name": "vite-vue-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "vue": "^3.2.16"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^1.9.3",
    "vite": "^2.6.4"
  }
}
```

* 配置 `scripts` 脚本命令

```json
{
  "scripts": {
    "dev": "vite",
    "prebuild": "npm run dev",
    "build": "vite build",
    "postbuild": "npm run serve",
    "serve": "vite preview"
  }
}
```

## 2、`pre`和`post`生命周期

**当我们执行任意 `npm run xxx` 脚本时，将依次自动触发 `pre` 、 `post` 的生命周期。**

当手动执行 `npm run build` 打包时：
1. 在此之前会自动执行 `npm run prebuild`，相当于执行了 `npm run dev` 命令来启动本地服务。
2. 在此之后会自动执行 `npm run postbuild`，相当于执行了 `npm run serve` 命令来启动dist静态文件的预览服务。

执行`npm run build`等价于依次执行了以下三个脚本命令：

```sh
// 自动执行
npm run dev

npm run build

// 自动执行
npm run serve
```

## 3、内置 `scripts`

除了可自定义 `npm script` 外，`npm`还附带许多内置 `scripts`：

```sh
npm install

npm test

npm publish
```

### 3-1、`npm publish`的生命周期

`npm publish`发包的生命周期比较复杂，当执行 `npm publish` 命令，将自动执行以下脚本：

- prepublishOnly: 最重要的一个生命周期。
- prepack
- prepare
- postpack
- publish
- postpublish

如果需要在使用`npm publish`发包之前自动做一些事情，如测试、构建等，一般在 `prepulishOnly` 命令中配置完成。

```json
{
  "prepublishOnly": "npm run test && npm run build"
}
```

### 3-2、比较常用的生命周期：`prepare`

执行时机：
1. `npm install` 之后自动执行
2. `npm publish` 之前自动执行

---

欢迎访问：[个人博客地址](https://tiven.cn/p/a7460bda/ "天問博客")


