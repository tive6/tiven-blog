---
title: electron-updater 自动更新升级应用
tags:
- Node
- Electron
categories:
- Electron / Tauri
abbrlink: f660fd88
date: 2023-07-05 11:30:55
---

**electron** 内置了 `autoUpdater` 自动更新功能，但是服务配置有些复杂，最后选择了 `electron-updater` 工具插件，这里就讲讲如何配置 `electron-updater` 来自动更新升级应用。

![electron-updater](https://tiven.cn/static/img/img-post-tools-05-bPE6KNKqFE5O5G_lSHwMk.jpg)

<!-- more -->

## 一、项目依赖和 scripts

安装 `electron-updater` 和 `electron-log`

```shell
pnpm add -D electron-updater electron-log
```

package.json 完整配置如下：

```json
{
  "name": "post-tools",
  "productName": "Post Tools",
  "version": "3.0.0",
  "description": "一个基于electron和node开发，用于http/https接口测试的工具",
  "main": "./out/main/index.js",
  "author": "Tiven",
  "homepage": "https://tiven.cn",
  "scripts": {
    "format": "prettier --write .",
    "lint": "eslint . --ext .js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
    "start": "electron-vite preview",
    "dev": "electron-vite dev",
    "dev:debug": "nodemon --watch ./src/main/index.js --exec \" electron-vite dev\" ",
    "build": "electron-vite build",
    "postinstall": "electron-builder install-app-deps",
    "build:win": "npm run build && electron-builder --win --config",
    "build:mac": "npm run build && electron-builder --mac --config",
    "build:linux": "npm run build && electron-builder --linux --config",
    "git": "tive git -c tive.git.config.cjs"
  },
  "dependencies": {
    "@electron-toolkit/preload": "^2.0.0",
    "@electron-toolkit/utils": "^1.0.2"
  },
  "devDependencies": {
    "@ant-design/icons": "4.0.0",
    "@electron/notarize": "^1.2.3",
    "@vitejs/plugin-react": "^4.0.0",
    "about-window": "^1.15.2",
    "ahooks": "^3.7.7",
    "antd": "^5.6.2",
    "axios": "^1.4.0",
    "electron": "^24.4.1",
    "electron-builder": "^23.6.0",
    "electron-builder-squirrel-windows": "^24.5.0",
    "electron-log": "^4.4.8",
    "electron-updater": "^5.3.0",
    "electron-vite": "^1.0.23",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-react": "^7.32.2",
    "jsoneditor": "8",
    "prettier": "^2.8.8",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "vite": "^4.3.9"
  }
}
```


## 二、配置打包参数

* electron-builder.yml

```yaml
appId: cn.tiven.app
productName: Post Tools
copyright: Copyright © 2023 ${author}
directories:
  buildResources: build
  output: dist
files:
  - '!**/.vscode/*'
  - '!src/*'
  - '!dist2/*'
  - '!node_modules/*'
  - '!electron.vite.config.{js,ts,mjs,cjs}'
  - '!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}'
  - '!{.env,.env.*,.npmrc,pnpm-lock.yaml}'
asarUnpack:
  - resources/**
afterSign: build/notarize.js
win:
  executableName: Post Tools
  icon: resources/icon.ico
  publisherName: tiven
  verifyUpdateCodeSignature: false
  target:
    - nsis
    - squirrel
nsis:
  oneClick: false
  artifactName: ${name}-${version}-setup.${ext}
  shortcutName: ${productName}
  uninstallDisplayName: ${productName}
  createDesktopShortcut: always
  perMachine: true
  allowToChangeInstallationDirectory: true
  guid: 2cf313e9-0f05-xxxx-1006-e278272e9b2a
squirrelWindows:
  loadingGif: resources/loading.gif
  iconUrl: https://tiven.cn/static/img/net-stats.ico
mac:
  category: public.app-category.developer-tools
  entitlementsInherit: build/entitlements.mac.plist
  extendInfo:
    - NSCameraUsageDescription: Application requests access to the device's camera.
    - NSMicrophoneUsageDescription: Application requests access to the device's microphone.
    - NSDocumentsFolderUsageDescription: Application requests access to the user's Documents folder.
    - NSDownloadsFolderUsageDescription: Application requests access to the user's Downloads folder.
dmg:
  artifactName: ${name}-${version}.${ext}
linux:
  target:
    - AppImage
    - snap
    - deb
  maintainer: electronjs.org
  category: Utility
appImage:
  artifactName: ${name}-${version}.${ext}
npmRebuild: false
publish:
  provider: generic
  url: http://localhost:3000/
```

其中最后三行的 `public` 参数配置是 `electron-updater` 更新的关键。
`http://localhost:3000/` 本地调试用，下载速度很快，上线了可以换成正式域名服务。

* dev-app-update.yml

```yaml
provider: generic
url: http://localhost:3000/
updaterCacheDirName: post-tools-updater
```

## 三、主要更新逻辑

新建文件 `src/main/autoUpdater.js`

```js
// src/main/autoUpdater.js

import { app, dialog } from 'electron'
import { join } from 'path'
import { autoUpdater } from 'electron-updater'
import logger from 'electron-log'
import { getLocalData, setLocalData, sleep } from './helper'
import { productName } from '@package'

export async function autoUpdateInit() {
  //打印log到本地
  logger.transports.file.maxSize = 1002430 // 10M
  logger.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}'
  logger.transports.file.resolvePath = () => join(app.getPath('appData'), 'logs/main.log')

  await sleep(5000)
  //每次启动自动更新检查 更新版本 --可以根据自己方式更新，定时或者什么
  autoUpdater.checkForUpdates()

  autoUpdater.logger = logger
  autoUpdater.disableWebInstaller = false
  autoUpdater.autoDownload = false //这个必须写成false，写成true时，我这会报没权限更新，也没清楚什么原因
  autoUpdater.on('error', (error) => {
    logger.error(['检查更新失败', error])
  })
  //当有可用更新的时候触发。 更新将自动下载。
  autoUpdater.on('update-available', (info) => {
    logger.info('检查到有更新，开始下载新版本')
    logger.info(info)
    const { version } = info
    askUpdate(version)
  })
  //当没有可用更新的时候触发。
  autoUpdater.on('update-not-available', () => {
    logger.info('没有可用更新')
  })
  // 在应用程序启动时设置差分下载逻辑
  autoUpdater.on('download-progress', async (progress) => {
    logger.info(progress)
  })
  //在更新下载完成的时候触发。
  autoUpdater.on('update-downloaded', (res) => {
    logger.info('下载完毕！提示安装更新')
    logger.info(res)
    //dialog 想要使用，必须在BrowserWindow创建之后
    dialog
      .showMessageBox({
        title: '升级提示！',
        message: '已为您下载最新应用，点击确定马上替换为最新版本！',
      })
      .then(() => {
        logger.info('退出应用，安装开始！')
        //重启应用并在下载后安装更新。 它只应在发出 update-downloaded 后方可被调用。
        autoUpdater.quitAndInstall()
      })
  })
}

async function askUpdate(version) {
  logger.info(`最新版本 ${version}`)
  let { updater } = getLocalData()
  let { auto, version: ver, skip } = updater || {}
  logger.info(
    JSON.stringify({
      ...updater,
      ver: ver,
    })
  )
  if (skip && version === ver) return
  if (auto) {
    // 不再询问 直接下载更新
    autoUpdater.downloadUpdate()
  } else {
    const { response, checkboxChecked } = await dialog.showMessageBox({
      type: 'info',
      buttons: ['关闭', '跳过这个版本', '安装更新'],
      title: '软件更新提醒',
      message: `${productName} 最新版本是 ${version}，您现在的版本是 ${app.getVersion()}，现在要下载更新吗？`,
      defaultId: 2,
      cancelId: -1,
      checkboxLabel: '以后自动下载并安装更新',
      checkboxChecked: false,
      textWidth: 300,
    })
    if ([1, 2].includes(response)) {
      let updaterData = {
        version: version,
        skip: response === 1,
        auto: checkboxChecked,
      }
      setLocalData({
        updater: {
          ...updaterData,
        },
      })
      if (response === 2) autoUpdater.downloadUpdate()
      logger.info(['更新操作', JSON.stringify(updaterData)])
    } else {
      logger.info(['更新操作', '关闭更新提醒'])
    }
  }
}

```

其中 `helper.js` 是封装的持久化数据相关操作方法。

```js
// src/main/helper.js

import { join } from 'path'
import fs from 'fs'
import { app } from 'electron'
const dataPath = join(app.getPath('userData'), 'data.json')

export function getLocalData(key) {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify({}), { encoding: 'utf-8' })
  }
  let data = fs.readFileSync(dataPath, { encoding: 'utf-8' })
  let json = JSON.parse(data)
  return key ? json[key] : json
}

export function setLocalData(key, value) {
  let args = [...arguments]
  let data = fs.readFileSync(dataPath, { encoding: 'utf-8' })
  let json = JSON.parse(data)
  if (args.length === 0 || args[0] === null) {
    json = {}
  } else if (args.length === 1 && typeof key === 'object' && key) {
    json = {
      ...json,
      ...args[0],
    }
  } else {
    json[key] = value
  }
  fs.writeFileSync(dataPath, JSON.stringify(json), { encoding: 'utf-8' })
}

export async function sleep(ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve()
      clearTimeout(timer)
    }, ms)
  })
}

```

在主进程 `app.whenReady` 中调用封装的 `autoUpdateInit` 初始化方法

```js
app.whenReady().then(() => {
    // ...

    // 版本更新初始化
    autoUpdateInit()
})
```

## 四、打包调试

因为 `electron-updater` 在本地开发环境不会去检测更新，所以需要打包后进行操作。
`electron-updater` 更新检测主要是检测服务端的 `latest.yml` (Mac软件是生成的是 `latest-mac.yml` ) 文件中的 **version** 信息，而这个版本号就是根据 `package.json` 中 `version` 生成的。

> 假定 `package.json` 中 `version: 1.0.0` ，系统为 MacOS。

调试步骤如下：

1. 执行打包

```shell
npm run build:mac
```

2. 在生成的安装包文件在 `dist` 目录，找到 `.dmg` 后缀的文件
3. 安装
4. 修改 package.json ，升级版本号改为 `version: 1.1.0`。
5. 再次执行打包命令
6. 启动本地的静态文件服务，这里推荐使用 `serve` 工具包，全局安装 serve 。

```shell
pnpm i -g serve 
```

7. 在项目根目录下执行 `serve dist` 命令，这个命令作用就是把 dist 目录下所有的文件变成静态资源，通过 `http` 请求拿到对应的资源。
8. serve 提供的静态服务默认在 `3000` 端口，如果被占用，会给出一个随机端口，记得修改上边 `electron-builder.yml` 和 `dev-app-update.yml` 对应的地址。一切正常的话，访问 http://localhost:3000/latest-mac.yml 就能看到对应资源。 
9. 一切就绪后，启动步骤3安装的应用。等待几秒就能看到上图所示的更新提醒。

* 注意：MacOS 中需要配置证书，不然检测更新的时候可能会出现问题，这个可以自己生成代码签名证书。可参考：[Mac 配置自建证书](https://tiven.cn/p/a9892474/ "天问博客-专注于大前端技术")。

---

欢迎访问：[天问博客](https://tiven.cn/p/f660fd88/ "天问博客-专注于大前端技术")

