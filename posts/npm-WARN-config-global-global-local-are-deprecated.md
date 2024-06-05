---
title: 'npm WARN config global `--global`, `--local` are deprecated'
tags:
- Node
- nvm
- npm
categories:
- pnpm / npm / yarn
abbrlink: 4979fd0a
date: 2022-06-09 11:32:11
---

使用 `nvm` 升级 `node` 版本，从 v12.5.0 升级到 v16.15.1，升级完成后，使用 `npm` 命令时总是出现警告： **npm WARN config global `'--global'`, `'--local'` are deprecated. Use `'--location=global'` instead** 。

![nvm && npm](https://tiven.cn/static/img/img-nvm-523XwPXpkp1yisPBwEqwd.jpg)

[//]: # (<!-- more -->)

## 一、报错原因

升级 `node` 版本后，`npm` 没有同步升级到对应版本，所以出现 `WARN` 。

## 二、解决办法

将 npm 升级到最新版本。

1. 在 windows 中以管理员身份打开 cmd ，然后执行命令

```shell
npm install -g npm-windows-upgrade
```

2. 如果提示 npm 命令未找到，则执行以下命令来更改脚本策略。

```shell
set-ExecutionPolicy RemoteSigned
```

3. 执行 npm 更新命令，选择最新的版本回车

```shell
npm-windows-upgrade
```

4. 看到如下内容说明升级完成

```txt
C:\windows\system32>npm-windows-upgrade
npm-windows-upgrade v6.0.1
? Which version do you want to install? 8.12.1
Checked system for npm installation:
According to PowerShell: D:\nodejs
According to npm:        D:\nodejs
Decided that npm is installed in D:\nodejs
Upgrading npm... -

Upgrade finished. Your new npm version is 8.12.1. Have a nice day!

C:\windows\system32>npm -v
8.12.1
```

再次执行 `npm -v` 命令，发现没有了 WARN。

**参考链接：**
* [npm issues](https://github.com/npm/cli/issues/4980 "npm issues")

---

欢迎访问：[天问博客](https://tiven.cn/p/4979fd0a/ "天问博客")



