---
title: electron-updater 报错 Cannot find module 'debug'
tags:
- Node
- Electron
categories:
- Electron / Tauri
abbrlink: 3ed3cb23
date: 2023-07-02 10:44:22
---

使用 `electron-updater` 更新 electron 应用，打完包安装启动出现这种报错：`Cannot find module 'debug'`，`Cannot find module 'builder-util-runtime'`。

![electron-updater](https://tiven.cn/static/img/img-electron-03-b_vTdoEKMOo7zS_CxYgH3.jpg)

<!-- more -->

## 项目依赖

```js
{
  "electron": "^24.4.1",
  "electron-builder": "^23.6.0",
  "electron-builder-squirrel-windows": "^24.5.0",
  "electron-log": "^4.4.8",
  "electron-updater": "^5.3.0",
  "electron-vite": "^1.0.23",
}
```

## 完整报错

```log
A JavaScript error occurred in the main process
Uncaught Exception:
Error: Cannot find module 'builder-util-runtime'Require stack:
-/Applications/Post Tools.app/Contents/Resources/app.asar/node moduleselectron-updater/out/main.js- /Applications/Post Tools.app/Contents/Resources/app.asar/out/mainindex.js
at Module.resolveFilename (node:internal/modules/cjs/loader:1054:15at n. resolveFilename (node:electron/js2c/browser init:2:109974)at Module. load (node:internal/modules/cjs/loader:900:27)at f. load (node:electron/js2c/asar bundle:2:13330)at Module.require (node:internal/modules/cjs/loader:1120:19)at require (node:internal/modules/cjs/helpers:103:18)at Object.<anonymous> (/Applications/Post Tools.app/Contents/Resourcesapp.asar/node modules/electron-updater/out/main.js:4:32)at Module.compile (node:internal/modules/cjs/loader:1241:14)at Module.extensions..js (node:internal/modules/cjs/loader:1296:10)at Module.load (node:internal/modules/cjs/loader:1096:32)
```

## 问题原因

因为项目使用 `pnpm` 安装依赖，打完包后有些资源找不到，导致这种很奇怪的报错（`Cannot find module 'xxx'`）。

## 问题解决

1. 在项目根目录下，新建 `.npmrc` 文件。
2. 配置

```
node-linker=hoisted
```

设置了 `node-linker=hoisted` ，`pnpm` 就会形成扁平化的结构，然后 `electron-builder` 会自动寻找依赖进行打包，就不会出现这种 `Cannot find module 'xxx'` 包找不到的情况。

* 参考文档：https://github.com/electron-userland/electron-builder/issues/6481

---

欢迎访问：[天问博客](https://tiven.cn/p/3ed3cb23/ "天问博客-专注于大前端技术")

