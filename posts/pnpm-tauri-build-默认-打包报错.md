---
title: 'pnpm tauri build 默认 `com.tauri.dev` 打包报错'
tags:
- Node
- tauri
- pnpm
categories:
- Electron / Tauri
abbrlink: bae20f40
date: 2023-06-18 14:23:35
---

使用 **tauri** + **solid.js** 构建桌面应用，执行 `pnpm tauri build` 打包命令报错：`Error You must change the bundle identifier in `tauri.conf.json > tauri > bundle > identifier`. The default value `com.tauri.dev` is not allowed as it must be unique across applications` 。

![tauri + solid.js](https://tiven.cn/static/img/img-tauri-01-TUfKEBG0KqkSHJO_8MRFQ.jpg)

[//]: # (<!-- more -->)

## 完整报错

```js
tiven@bogon tauri-app % pnpm tauri build              

> tauri-app@1.0.0 tauri /Users/tiven/Desktop/dev/rust/tauri-app
> tauri "build"

       Error You must change the bundle identifier in `tauri.conf.json > tauri > bundle > identifier`. The default value `com.tauri.dev` is not allowed as it must be unique across applications.
 ELIFECYCLE  Command failed with exit code 1.

```

## 解决报错

修改 `src-tauri/tauri.conf.json` 在文件中的 `tauri.bundle.identifier` 参数，默认值是 `com.tauri.dev` ，修改为其他的 **非默认值** 即可。如下：

```js
"bundle": {
  "active": true,
  "targets": "all",
  "identifier": "com.tauri-app.dev",
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/bae20f40/ "天问博客-专注于大前端技术")

