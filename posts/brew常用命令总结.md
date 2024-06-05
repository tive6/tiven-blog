---
title: brew常用命令总结
tags:
- brew
- Mac
categories:
- Git / Brew
abbrlink: 9fc8f1d4
date: 2023-06-01 16:49:57
---

**Homebrew** 是什么？引用官方的一句话：**Homebrew** 是 **MacOS** 不可或缺的套件管理器。所以就有了：**世上无难事，只要找到 `Homebrew` 的正确安装方式。**

![Homebrew](https://tiven.cn/static/img/img-brew-01-eUW95s-ESCWHHGOw4qS3c.jpg)

<!-- more -->

## 一、brew的安装

[https://brew.sh/](https://brew.sh/ "brew")

## 二、常用命令

```js
//查看brew的版本
brew -v

//更新homebrew自己，把所有的Formula目录更新，并且会对本机已经安装并有更新的软件用*标明
brew update

//查看命令帮助：
brew -help

//查看那些已安装的程序需要更新
brew outdated

//更新单个软件：
brew upgrade [包名]
例：brew upgrade git

//更新所有软件：
brew upgrade

//安装软件
brew install [包名]@版本
例：brew install git

//卸载
brew uninstall [包名]
例：brew uninstall git

//清理所有包的旧版本 （安装包缓存）
brew cleanup
例：brew cleanup -n  //显示要删除的内容，但不要实际删除任何内容
例：brew cleanup -s  //清理缓存，包括下载即使是最新的版本
例：brew cleanup --prune=1     //删除所有早于指定时间的缓存文件（天）

//清理单个软件旧版本
brew cleanup [包名]
例：brew cleanup git

//查看需要更新的包
brew outdated

//查看可清理的旧版本包，不执行实际操作
brew cleanup -n

//锁定某个包
brew pin $FORMULA

//取消锁定
brew unpin $FORMULA

//查看包信息
brew info [包名]
例：brew info git

//查看安装列表
brew list

//查询可用包
brew search [包名]
例：brew search git

//显示包依赖
brew deps [包名]
例：brew deps git
```

## 三、注意事项

在Mac OS X 10.11系统以后，/usr/local/等系统目录下的文件读写是需要系统root权限的，以往的Homebrew安装如果没有指定安装路径，会默认安装在这些需要系统root用户读写权限的目录下，导致有些指令需要添加sudo前缀来执行，比如升级Homebrew需要：

```shell
sudo brew update
```

如果你不想每次都使用sudo指令，你有两种方法可以选择:

```shell
# 1.对/usr/local 目录下的文件读写进行root用户授权
$ sudo chown -R $USER /usr/local
# 例：sudo chown -R lean /usr/local

#2.（推荐）安装Homebrew时对安装路径进行指定，直接安装在不需要系统root用户授权就可以自由读写的目录下
<install path> -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

---

欢迎访问：[天问博客](https://tiven.cn/p/9fc8f1d4/ "天问博客-专注于大前端技术")

