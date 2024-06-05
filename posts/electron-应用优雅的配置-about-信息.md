---
title: electron 应用优雅的配置 about 信息
tags:
- Node
- Electron
categories:
- Electron / Tauri
abbrlink: 7fc0c16c
date: 2023-07-03 11:12:42
---

使用 electron 的 `dialog` + `tray` 托盘栏菜单优雅简单的配置 about 关于本应用的信息，效果下图所示。

![electron & about](https://tiven.cn/static/img/img-post-tools-03-jMNMPdP7V8NKmJyKiguOv.jpg)

[//]: # (<!-- more -->)

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

## 配置 Tray

```js
export function initTrayMenu(tray, mainWindow) {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  const logo = nativeImage.createFromPath(icon)
  tray = new Tray(logo)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click() {
        mainWindow.destroy()
        app.exit()
      },
    },
    {
      label: '重启',
      click() {
        app.relaunch()
        app.exit()
      },
    },
    {
      type: 'separator',
    },
    {
      label: '关于',
      click: showAboutInfo,
    },
  ])
  tray.setToolTip(`${productName} \n接口调试工具`)
  // tray.setTitle(`${productName}`)
  tray.setContextMenu(contextMenu)
  // 点击通知区图标实现打开关闭应用的功能
  // console.log(mainWindow.isVisible())
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.focus()
    } else {
      mainWindow.show()
      mainWindow.setSkipTaskbar(true)
    }
  })
}
```

## dialog 内容配置

```js
import { app, BrowserWindow, dialog, Menu, nativeImage, shell, Tray } from 'electron'
import { resetLocalData } from './globalShortcut'
import icon from '@res/logo.png?asset'
import logo from '@res/icons/128x128.png?asset'
import { productName, description, author } from '@package'
const isMac = process.platform === 'darwin'

export async function showAboutInfo() {
  await dialog.showMessageBox({
    type: 'info',
    buttons: ['关闭'],
    title: `关于 ${productName}`,
    message: `${productName} V${app.getVersion()} \n ${description} \n`,
    detail: `Copyright © 2023 ${author} \n${getSysBaseInfo()}`,
    defaultId: 0,
    icon: logo,
    // textWidth: 400,
  })
}

function getSysBaseInfo() {
  let vers = process.versions
  return ['electron', 'chrome', 'node', 'v8'].reduce((prev, k) => {
    prev += `\n${k}: ${vers[k]}`
    return prev
  }, '')
}

```

* 大功告成，完美 ~

---

欢迎访问：[天问博客](https://tiven.cn/p/7fc0c16c/ "天问博客-专注于大前端技术")

