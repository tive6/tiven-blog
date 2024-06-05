---
title: 'electron-builder报错errorOut=Fatal error: Unable to commit changes'
tags:
- Node
- Electron
categories:
- Electron / Tauri
abbrlink: abab1034
date: 2023-01-19 14:59:07
---

在 electron 项目中，使用 electron-builder 打包报错：`⨯ cannot execute  cause=exit status 1  errorOut=Fatal error: Unable to commit changes`。

![electron-builder](https://tiven.cn/static/img/img-electron-02-pznVUBgmCrxh1oUUwK1e3.jpg)

[//]: # (<!-- more -->)

## 完整报错信息

```log
  • building block map  blockMapFile=dist\net-stats-1.0.0-setup.exe.blockmap
  ⨯ cannot execute  cause=exit status 1
                    errorOut=Fatal error: Unable to commit changes

                    command='C:\Users\demo\AppData\Local\electron-builder\Cache\winCodeSign\winCodeSign-2.6.0\rcedit-x64.exe' 'D:\project\net-sta
ts\dist\squirrel-windows\Net Stats Setup 1.0.0.exe' --set-version-string FileDescription 'Net Stats' --set-version-string ProductName 'Net Stat
s' --set-version-string LegalCopyright 'Copyright © 2023 example.com' --set-file-version 1.0.0 --set-product-version 1.0.0.0 --set-version-stri
ng CompanyName example.com --set-icon 'D:\project\net-stats\resources\logo.ico'
                    errorOut=Fatal error: Unable to commit changes

                    command='C:\Users\demo\AppData\Local\electron-builder\Cache\winCodeSign\winCodeSign-2.6.0\rcedit-x64.exe' 'D:\project\net-sta
ts\dist\squirrel-windows\Net Stats Setup 1.0.0.exe' --set-version-string FileDescription 'Net Stats' --set-version-string ProductName 'Net Stat
  • Above command failed, retrying 2 more times
```

## 解决办法

关闭相关杀毒软件，如：**360、电脑管家** 等等，再次执行打包程序就不会出现以上错误提示了。

---

欢迎访问：[天问博客](https://tiven.cn/p/abab1034/ "天问博客-专注于大前端技术")

