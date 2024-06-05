---
title: pnpm tauri icon 一键转换 icon
tags:
  - Node
  - Tauri
categories:
  - Electron / Tauri
abbrlink: c1f416c5
date: 2024-02-01 15:07:15
---

在使用 `Electron`、`Tauri` 等框架开发桌面应用时，需要为应用生成不同平台的图标，如：MacOS 中的 `icon.icns`、Windows 中的 `icon.ico`、Linux 中的 `*.png` 等类型图标，这里介绍一种简单快捷一键转换图标的方法。

![pnpm tauri icon](https://tiven.cn/static/img/tauri-03-QhgPOkaI.jpg)

<!-- more -->

## 准备工作

1. `nodejs` 环境
2. `npm / yarn / pnpm` 等包管理工具

## 工具介绍

命令行：

```shell
pnpm tauri icon <path/to/your/icon.png>
```

语法及参数：

```shell
Usage: cargo-tauri icon [OPTIONS] [INPUT]

Arguments:
  [INPUT]  Path to the source icon (png, 1240x1240px with transparency) [default: ./app-icon.png]

Options:
  -o, --output <OUTPUT>  Output directory. Default: 'icons' directory next to the tauri.conf.json file
  -v, --verbose...       Enables verbose logging
  -p, --png <PNG>        Custom PNG icon sizes to generate. When set, the default icons are not generated
  -h, --help             Print help
  -V, --version          Print version
```

## 使用方法

1. 新建一个文件夹，比如 `tauri-icon`，然后在命令行中进入该文件夹；
2. 在该文件夹中准备一张 1024 * 1024 的 png 图片，比如 `app-icon.png`；
3. 在该文件夹中再新建一个文件夹，比如 `icons`，用于存放生成的图标；
4. 在命令行中执行以下命令：

```shell
pnpm tauri icon ./app-icon.png -o ./icons
# or
npm tauri icon ./app-icon.png -o ./icons
```

参考文档：

- https://tauri.app/zh-cn/v1/guides/features/icons


---

欢迎访问：[天问博客](https://tiven.cn/p/c1f416c5/ "天问博客-专注于大前端技术")

