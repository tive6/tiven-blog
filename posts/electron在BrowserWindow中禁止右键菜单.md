---
title: electron在BrowserWindow中禁止右键菜单
tags:
- Node
- npm
categories:
- Electron / Tauri
abbrlink: d068ab6d
date: 2023-06-09 16:32:30
---

最近使用 electron + vite + solid.js 做一个网络流量实时监控的小工具，其中需要禁止用户在获取 `BrowserWindow` 焦点后弹出默认右键菜单。

![electron net-stats](https://tiven.cn/static/img/img-net-stats-1QALH_tBD-XgjepeLLHGl.jpg)

<!-- more -->

## 解决方案

在 `new BrowserWindow` 后中添加以下代码：

```js
  // 禁止右键菜单弹出 start
  mainWindow.hookWindowMessage &&
  mainWindow.hookWindowMessage(278, function () {
    mainWindow.setEnabled(false) //窗口禁用
    let timer = setTimeout(() => {
      mainWindow.setEnabled(true)
      clearTimeout(timer)
    }, 100) // 延时太快会立刻启动，太慢会妨碍窗口其他操作，可自行测试最佳时间
    return true
  })
  // 禁止右键菜单弹出 end
```

提示：因为 `hookWindowMessage` 只在 **windows** 系统可以，所以必须判断一下 `mainWindow.hookWindowMessage` 方法是否存在，避免报错。

---

欢迎访问：[天问博客](https://tiven.cn/p/d068ab6d/ "天问博客-专注于大前端技术")

