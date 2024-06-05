---
title: 使用 nvm 管理不同版本的 node 与 npm
abbrlink: 8e0bd99
date: 2021-12-27 18:16:47
tags:
- Node
- npm
- nvm
categories:
- pnpm / npm / yarn
---

现在前端开发的生态，绝大部分都是基于`Node.js`，而`node`的版本也在日新月异的变化着。很多`CLI脚手架`、`npm`工具依赖的node版本都有所差异，所以为了更好的管理`node`版本，`nvm` 就应运而生了。

![NVM](https://tiven.cn/static/img/img-nvm-523XwPXpkp1yisPBwEqwd.jpg)

<!-- more -->

## 前言

> 系统：window10

**注意：** 一定要卸载已安装的 `NodeJS`，否则会发生冲突。

## 下载

* 官网地址：[nvm-windows](https://github.com/coreybutler/nvm-windows/releases "nvm-windows")
* 百度云下载：[nvm-setup](https://pan.baidu.com/s/1S8P-JAPDop7rqNlfT1-lGQ "nvm-setup") 提取码：iogd

![nvm-windows](https://tiven.cn/static/img/img-nvm-setup-_rdzMvpZCHtmb3CnwMf79.jpg)

## 安装

1. 双击 `nvm-setup.exe` 文件进行安装。
2. 选择`nvm`安装目录。
3. 选择`nodejs`的安装位置。

安装完成后，在命令行中输入：

```shell
nvm -v
```

## 配置

* 配置国内镜像，加快下载安装速度。 `nvm` 安装目录下有一个 `settings.txt` 文件，添加 `node_mirror` 和 `npm_mirror`， 如下：

```txt
root: D:\dev\nvm
path: C:\nodejs
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
```

## 使用

1. 查看nvm版本

```shell
nvm -v
```

2. 列出已安装的node实例

```shell
nvm ls
```

输出：

```txt
    16.0.0
  * 12.5.0 (Currently using 64-bit executable)
    12.4.0
```

3. 查看远程服务器端可下载使用的版本

```shell
nvm ls available 
```

输出：

```txt
|   CURRENT    |     LTS      |  OLD STABLE  | OLD UNSTABLE |
|--------------|--------------|--------------|--------------|
|   16.12.0    |   16.13.1    |   0.12.18    |   0.11.16    |
|   16.11.1    |   16.13.0    |   0.12.17    |   0.11.15    |
|   16.11.0    |   14.18.2    |   0.12.16    |   0.11.14    |
|   16.10.0    |   14.18.1    |   0.12.15    |   0.11.13    |
|    16.9.1    |   14.18.0    |   0.12.14    |   0.11.12    |
|    16.9.0    |   14.17.6    |   0.12.13    |   0.11.11    |
|    16.8.0    |   14.17.5    |   0.12.12    |   0.11.10    |
|    16.7.0    |   14.17.4    |   0.12.11    |    0.11.9    |
|    16.6.2    |   14.17.3    |   0.12.10    |    0.11.8    |
|    16.6.1    |   14.17.2    |    0.12.9    |    0.11.7    |
|    16.6.0    |   14.17.1    |    0.12.8    |    0.11.6    |
|    16.5.0    |   14.17.0    |    0.12.7    |    0.11.5    |
|    16.4.2    |   14.16.1    |    0.12.6    |    0.11.4    |
|    16.4.1    |   14.16.0    |    0.12.5    |    0.11.3    |
|    16.4.0    |   14.15.5    |    0.12.4    |    0.11.2    |
|    16.3.0    |   14.15.4    |    0.12.3    |    0.11.1    |
|    16.2.0    |   14.15.3    |    0.12.2    |    0.11.0    |
|    16.1.0    |   14.15.2    |    0.12.1    |    0.9.12    |
|    16.0.0    |   14.15.1    |    0.12.0    |    0.9.11    |
|   14.14.0    |   14.15.0    |   0.10.48    |    0.9.10    |

This is a partial list. For a complete list, visit https://nodejs.org/download/release
```

4. 下载安装node

```shell
# 安装指定版本
nvm install 16.0.0
```

5. 卸载本地的实例

```shell
nvm uninstall <version>    
 
nvm uninstall 16.0.0
```

6. 切换使用本地node实例

```shell
nvm use <version>

nvm use 16.0.0
```

7. 其他命令

```sh
# 帮助
nvm -h

# 禁用node.js版本管理
nvm off            

# 启用node.js版本管理
nvm on                     

# 配置别名
nvm alias node16 16.0.0

# 使用别名
nvm use node16

# 取消别名
nvm unalias node16
```

**注意：** 下载的每个node实例都是独立隔离的，所以使用 `nvm use xxx` 切换版本会造成 `npm install -g xxx` 全局安装的模板或命令无法使用，需要重新安装。

参考文档：

* https://www.runoob.com/w3cnote/nvm-manager-node-versions.html


--- 

欢迎访问：[天問博客](https://tiven.cn/p/8e0bd99/ "天問博客")
