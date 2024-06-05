---
title: electron globalShortcut 快捷键与系统全局快捷键冲突
tags:
- Node
- Electron
categories:
- Electron / Tauri
abbrlink: 6da36e35
date: 2023-07-01 10:01:11
---

用 `electron` 开发自己的接口测试工具（Post Tools），在设置了 `globalShortcut` 快捷键后，发现应用中的快捷键与系统全局快捷键冲突了，导致系统快捷键不可正常使用。

![electron globalShortcut](https://tiven.cn/static/img/img-post-tools-02-s3LNB0mGujGQpJYjdcD9V.jpg)

<!-- more -->

## 快捷键配置

```js
export function initGlobalShortcut(mainWindow) {
  globalShortcut.register('CommandOrControl+shift+r', () => {
    app.relaunch()
    app.exit()
  })
  globalShortcut.register('CommandOrControl+shift+delete', () => {
    resetLocalData()
  })
  globalShortcut.register('F1', () => {
    shell.openExternal('https://tiven.cn/p/4dc21784/')
  })
  globalShortcut.register('F2', () => {
    shell.openExternal('https://tiven.cn/service/tools/post-tool')
  })
  globalShortcut.register('F5', () => {
    mainWindow?.reload()
  })
  globalShortcut.register('CommandOrControl+r', () => {
    mainWindow?.reload()
  })
  globalShortcut.register('CommandOrControl+q', () => {
    app.exit()
  })
  globalShortcut.register('CommandOrControl+w', () => {
    mainWindow?.hide()
    mainWindow?.setSkipTaskbar(true)
  })
  globalShortcut.register('F11', () => {
    // 是否全屏
    if (mainWindow?.isFullScreen()) {
      // mainWindow?.minimize();
      mainWindow?.setFullScreen(false)
      mainWindow?.setMenuBarVisibility(true)
    } else {
      mainWindow?.setFullScreen(true)
      mainWindow?.setMenuBarVisibility(false)
    }
  })
  globalShortcut.register('Esc', () => {
    // 是否全屏
    if (mainWindow?.isFullScreen()) {
      // mainWindow?.minimize();
      mainWindow?.setFullScreen(false)
      mainWindow?.setMenuBarVisibility(true)
    }
  })
  globalShortcut.register('CommandOrControl+F12', () => {
    mainWindow?.webContents.openDevTools({ mode: 'detach' })
  })
}
```

## 解决冲突

一般来说会在 mainWindow `ready-to-show` 的时候初始化快捷键，当然也可以在应用失去焦点（`blur`）的时候主动应用的注销快捷键，以避免和系统快捷键冲突。

```js

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    // 注册全局快捷键
    initGlobalShortcut(mainWindow)
  })

  mainWindow.on('blur', () => {
    // 失去焦点，注销快捷键
    globalShortcut.unregisterAll()
  })

```

---

欢迎访问：[天问博客](https://tiven.cn/p/6da36e35/ "天问博客-专注于大前端技术")

