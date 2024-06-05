---
title: Node.js 版本管理工具 n 使用指南
tags:
- Node
- n
- npm
categories:
- Node
abbrlink: 3e22d0a6
date: 2023-05-27 14:43:01
---

`Node.js` 版本更新很快，目前 node v20.x 已经发布，我们在使用时避免不了会需要切换不同的 `Node.js` 的版本来使用不同版本的特性。
所以就出现了像 windows 上的 `nvm`，MacOS 上的 `n` 工具，本文就介绍一下如何使用 `n` 管理 `Node.js` 的版本。

![Node.js && n](https://tiven.cn/static/img/img-node-04-FOBe39xxFBNmtWxhETk5u.jpg)

<!-- more -->

## 安装

- 使用 `Brew` 安装时，未安装可以参考 [Brew 官网安装](https://brew.sh/ "https://brew.sh/")。

```sh
# 使用 npm / yarn
npm i -g n
yarn global add n
# 使用 brew
brew install n
```

## 命令详解

### 版本查看

```shell
# 查看 n 版本
n --version/-V
# 查看 node 本地当前使用版本
node --version/-v
# 查看 node 远程版本
n lsr/ls-remote [--all] // 默认20个，--all展示所有
# 查看 n 管理的 node 版本
n [ls/list/--all]
```

### 安装 `Node.js`

```sh
# 安装指定版本
n [install/i] <version>
# 安装稳定版本
n lts/stable
# 安装最新版本
n latest/current
# 安装文件中对应 node 版本 [.n-node-version, .node-version, .nvmrc, or package.json]
n auto
# 安装 package.json 对应 node 版本
n engine
# 通过发布流的代码名 例如[ boron, carbon]
n boron/carbon
```

### 切换 `Node.js` 版本

1.  查看 `n` 管理的 `Node.js` 版本: `n ls/list/--all`；
2.  终端执行 `n` 命令，通过上下方向键选择想要切换的版本后点击 `Enter` 键；
3.  如果没有，可以通过: `n [install/i] <version>`，安装成功后会自动切到该版本。

```shell
# 方法1 ，通过上下方向键选择想要切换的版本回车即可
n 

# 方法2
n use <version>

# 切换到 16.19.1 版本
n use 16.19.1
```

### 查看 `Node.js` 版本安装路径

```shell
n which/bin <version>
```

### 删除 `Node.js` 版本

```shell
# 删除当前版本
n uninstall
# 删除指定版本
n rm/- <version>
# 删除除当前版本之外的所有版本
n prune
```

### 执行命令

```shell
# 使用指定 node 版本
n run/use/as <version> [args...]
# 先下载节点和npm，使用修改过的PATH执行命令
n exec <vers> <cmd> [args...]
```

### 查看帮助

```shell
n help/-h/--help
```

## args 说明

- `-h, --help`：查看帮助信息；
- `-p, --preserve`：在 `Node.js` 的安装过程中保留 `npm` 和 `npx`；
- `-q, --quiet`：禁用 `curl` 输出，禁用日志消息处理“`auto`”和“`engine`”标签；
- `-d, --download`：仅下载；
- `-a, --arch`：覆盖系统架构；
- `--all`：`ls-remote` 默认展示 `20` 条，`--all` 展示全部；
- `--insecure`：关闭https请求的证书检查\(可能需要在代理服务器后面\)；
- `--use-xz/--no-use-xz`：覆盖自动检测 `xz` 支持和启用/禁用使用xz压缩节点下载。


---

欢迎访问：[天问博客](https://tiven.cn/p/3e22d0a6/ "天问博客-专注于大前端技术")

