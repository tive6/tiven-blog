---
title: 使用 nodejs + zx 编写脚本更新本地 hosts
tags:
  - Node
  - zx
  - npm
categories:
  - Node
abbrlink: f948037b
date: 2024-03-26 16:16:29
---

在日常的开发和运维工作中，我们经常需要修改本地的 `hosts` 文件来实现一些特定的网络配置，比如将某个域名指向特定的 **IP** 地址。而使用 `Node.js` 结合 `zx` 工具可以让我们更轻松地编写和运行脚本来更新本地的 `hosts` 文件。

![nodejs zx shell](https://tiven.cn/static/img/shell-zx-01-gaTUTWx6.jpg)

<!-- more -->

## 一、功能介绍

**目标：** 通过修改 Hosts 解决国内 Github 经常抽风访问不到的情况

1. 获取 github 上的远程 hosts 文件内容，更新本地 hosts 文件
2. 恢复系统原有 hosts 文件
3. 刷新 DNS 缓存，使配置生效

## 二、准备工作

首先，确保你已经安装了 `Node.js` 和 `npm`。然后，通过 `npm` 安装 `zx` 工具：

```bash
npm install -g zx
```

## 三、编写脚本

接下来，我们来编写一个简单的 Node.js 脚本，使用 `zx` 来更新本地的 hosts 文件。以下是一个示例脚本，可以根据实际需求进行修改：

1. 更新 hosts 脚本 `update-hosts.mjs`

```js
#!/usr/bin/env zx

import { $, spinner } from 'zx'
import axios from 'axios'
import chalk from 'chalk'
import { dir, hostsPath, sh, startStr, endStr } from './config/hosts.config.mjs'

// 远程获取 hosts 文件内容，
async function getHostsContent() {
  try {
    const response = await axios({
      url: `https://api.github.com/repos/maxiaof/github-hosts/contents/hosts`,
    })
    console.log(response.data.content)
    // await $`echo ${response.data.content} > ${dir}/base64.txt`
    const readmeContent = Buffer.from(response.data.content, 'base64').toString(
      'utf-8'
    )
    return readmeContent
  } catch (error) {
    console.error('Error fetching README:', error.message)
  }
}

async function saveReadmeFile() {
  try {
    const response = await axios({
      url: `https://api.github.com/repos/maxiaof/github-hosts/contents/README.md`,
    })
    const readmeContent = Buffer.from(response.data.content, 'base64').toString(
      'utf-8'
    )
    await $`echo ${readmeContent} > ${dir}/README.md`
  } catch (e) {
    console.log(e)
  }
}

async function readLine(str = '') {
  let hosts = ''
  let isHosts = false
  str.split('\n').forEach(line => {
    if (line.includes(startStr)) {
      isHosts = true
    }
    if (isHosts) {
      hosts += `${line}\n`
    }
    if (line.includes(endStr)) {
      isHosts = false
    }
  })

  return hosts
}

async function runShell(hosts) {
  try {
    console.log(hosts)
    // await $`pwd`
    // 写入 github hosts
    await $`echo ${hosts} > ./host/github.hosts`
    // 复制系统原有 hosts 到新 hosts
    await $`cp -f ./host/base.hosts ./host/hosts`
    // 在新 hosts 后追加 github hosts
    await $`cat ./host/github.hosts >> ./host/hosts`
    // 复制新 hosts 到 /etc/hosts
    await $`cp -f ./host/hosts ${hostsPath}`
    // 刷新DNS，激活生效
    await $`echo ${sh}`
  } catch (p) {
    console.log(`Exit code: ${p.exitCode}`)
    console.log(`Error: ${p.stderr}`)
    await $`exit 1`
  }
}

async function initHostsFile() {
  try {
    let error = (await $`ls ${dir}`).stderr
    if (!error) {
      console.log(`${dir} 文件夹已存在`)
    }
  } catch (err) {
    console.log('文件夹不存在')
    await $`mkdir ${dir}`
    // 下载保存 README.md
    await saveReadmeFile()
    // 备份系统 hosts
    await $`sudo cp ${hostsPath} ${dir}/os.hosts`
    // 第一次初始化，把系统 hosts 作为 base.hosts
    await $`sudo cp ${hostsPath} ${dir}/base.hosts`
    await $`touch ${dir}/github.hosts`
    await $`touch ${dir}/hosts`
  }
}

!(async function run() {
  // 初始化目录文件
  await initHostsFile()
  await spinner('running...', async () => {
    let hosts = await getHostsContent()
    await runShell(hosts)
  })
  await spinner('running...', () => $`sleep 2`)
  console.log(chalk.green('Local hosts updated successfully!'))
})()
```

2. 恢复系统 hosts 脚本 `reset-hosts.mjs`

```js
#!/usr/bin/env zx

// // eslint-disable-next-line
// /* eslint-disable */
import { $, spinner } from 'zx' // eslint-disable-line
import chalk from 'chalk'
import { dir, hostsPath, sh } from './config/hosts.config.mjs'

async function runShell() {
  try {
    await $`ls ${dir}`
    // 复制基础 hosts 到新 hosts
    await $`cp -f ./host/base.hosts ./host/hosts`
    // 复制新 hosts 到 /etc/hosts
    await $`cp -f ./host/hosts ${hostsPath}`
    // 刷新DNS，激活生效
    await $`echo ${sh}`
  } catch (p) {
    console.log(`Exit code: ${p.exitCode}`)
    console.log(`Error: ${p.stderr}`)
    await $`exit 1`
  }
}

!(async function run() {
  await spinner('running...', async () => {
    await runShell()
  })
  await spinner('running...', () => $`sleep 2`)
  console.log(chalk.green('Local hosts reset successfully!'))
})()
```

3. 配置文件 `hosts.config.mjs`

```js
export const osMap = {
  darwin: {
    name: 'MacOS',
    hostsPath: '/etc/hosts',
    sh: 'sudo killall -HUP mDNSResponder',
  },
  linux: {
    name: 'Linux',
    hostsPath: '/etc/hosts',
    sh: 'sudo nscd restart',
  },
  win32: {
    name: 'Windows',
    hostsPath: 'C:/Windows/System32/drivers/etc/hosts',
    sh: 'ipconfig /flushdns',
  },
}

export const dir = './host'

export const { platform } = process

export const { hostsPath, sh } = osMap[platform]

export const startStr = '#Github Hosts Start'

export const endStr = '#Github Hosts End'
```

## 四、运行脚本

运行脚本有两种方式：

1. 把 `update-hosts.mjs` 和 `reset-hosts.mjs` 脚本作为可执行文件，前提是全局安装了 `zx` 工具
2. 使用 node 命令运行脚本，需要本地安装 `axios`、`chalk`、`zx` 等依赖

### 方式一：可执行文件执行

赋予执行权限：

```bash
chmod +x update-hosts.mjs
chmod +x reset-hosts.mjs
```

然后在终端中运行该脚本：

```bash
./updateHosts.js
# 或
./resetHosts.js
```

### 方式二：node 命令执行

```bash
node update-hosts.mjs
node reset-hosts.mjs
# sudo 权限执行（MacOS）
sudo node update-hosts.mjs
sudo node reset-hosts.mjs
```

**其中涉及 `sudo` 权限（MacOS），需要输入密码。**
**windows 系统下，需要管理员权限运行，或以管理员身份运行终端 cmd。**

参考文档：

- https://google.github.io/zx/
- https://www.npmjs.com/package/zx

---

欢迎访问：[天问博客](https://tiven.cn/p/f948037b/ "天问博客-专注于大前端技术")

