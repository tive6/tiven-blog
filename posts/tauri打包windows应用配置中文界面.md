---
title: Tauri打包windows应用配置中文界面
tags:
- Node
- Tauri
categories:
- Electron / Tauri
abbrlink: ea21589c
date: 2023-07-06 10:29:46
---

使用 **Tauri + Rust** 开发桌面应用，在 **windows** 系统上，打包后安装包名称后缀、安装界面、相关说明默认都是英文的。如果要默认显示为中文，则需要在 `tauri.conf.json` 中配置相应参数。

![Tauri Language](https://tiven.cn/static/img/img-exe-02-lqislqCvkja8WNWfb29j-.jpg)


[//]: # (<!-- more -->)

## 前言

默认情况下，在 windows 系统打完的 **mis** 包，安装包的名称大概会是这样：`Net Stats_1.1.0_x64_en-US.msi`，包含 en-US 描述。

安装界面也是全英文，如图：

![Tauri msi 01](https://tiven.cn/static/img/img-exe-03-ZDSfXV75_ZYMYAtdQIlbQ.jpg)

![Tauri  msi 02](https://tiven.cn/static/img/img-exe-04-wAeQdYUFE6wasxbBo-tmk.jpg)

## Tauri 配置中文

在 `src-tauri/tauri.conf.json` 的 `tauri.bundle` 参数中配置以下内容：

```js
{
  // ... 其他配置
  "tauri": {
    "bundle": {
      "category": "Utility", 
      "shortDescription": "网速监控工具",
      "longDescription": "Net Stats是一个使用 Tauri 和 Solid 构建的网速监控工具",
      // 配置中文 start
      "windows": {
        "wix": {
          "language": "zh-CN"
        },
        "nsis": {
          "languages": ["SimpChinese", "English"],
          "displayLanguageSelector": true
        }
        // 配置中文 end
      },
    }
  }
  // ... 其他配置
}
```

在 windows 平台，默认情况会生成 `.msi` 和 `.exe` 两种格式的安装包。
如果选择的是 `.exe` 后缀的安装包进行安装，会出现语言选择的界面提示，如下图：

![Tauri  msi 03](https://tiven.cn/static/img/img-exe-01-iKzbR2djk4JJqsy-ZM1tb.jpg)

如果还想要选择其他的语言，则在 `windows.nsis.languages` 中增加即可，第一项则是默认选择的语言。


---

欢迎访问：[天问博客](https://tiven.cn/p/ea21589c/ "天问博客-专注于大前端技术")

