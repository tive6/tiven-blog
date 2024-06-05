---
title: 如何在Linux中查找某个文件
abbrlink: e9447af7
date: 2021-10-11 15:04:00
tags:
- Linux
categories:
- Linux / Shell
---

对于习惯了windows或mac系统的图形界面操作的人来说，在 `Linux` 中使用`命令行`可能会感觉非常别扭。没有`GUI`图形界面，很难在不同文件夹间浏览，找到需要的文件。本篇展示如何在 `Linux` 中查找某个文件。

![Image](https://tiven.cn/static/img/img-post-01-QbDEdgmh_CqZxopzsh_rJ.jpg)

[//]: # (<!-- more -->)

通过`SSH`工具连接到`Linux`系统。在 Linux 中查找文件有两种方法：

1. 一种是使用 `find` [命令](https://www.linuxcool.com/ "命令")
2. 一种是使用 `locate` 命令

## find 命令

使用 Linux `find` 命令可以用不同的搜索标准如名字、类型、所属人、大小等来搜索目录树。基本语法如下：

```sh
find path expression search-term
```

下面是使用 find 命令根据文件名来查找特定文件的一个例子：

```sh
find -name test.file
```

命令会搜索整个目录树来查找名为 test.file 的文件，并且会提供其存放位置。你可以使用你 Linux 上一个存在的文件名来尝试一下。  
find 命令有时会花费几分钟来查找整个目录树，尤其是如果系统中有很多文件和目录的话。要显著减少时间，你可以指定搜索的目录。比如，如果你知道 /var中存在 test.file，那就没有必要搜索其它目录。这样，你可以使用下面的命令：

```sh
find /var -name test.file
```

`find` 还可以根据时间、大小、所属人、权限等选项搜索文件。要了解更多关于这些选项的信息，你可以使用查看Linux find 命令的手册。

```sh
man find
```

## locate 命令

要在Linux中使用 `locate` 命令，首先需要安装它。  
如果你正在使用 `Ubuntu`，运行下面的命令来安装 `locate`：

```sh
apt-get update# apt-get install mlocate
```

如果你使用的是 [CentOS](https://www.linuxprobe.com/ "centos") ，运行下面的命令来安装 `locate`：

```sh
yum install mlocate
```

`locate` 是一种比 `find` 更快的方式，因为它在数据库中查找文件。要更新搜索数据库，运行下面的命令：

```sh
updatedb
```

使用 `locate` 查找文件的语法：

```sh
locate test.file
```

就像 `find` 命令一样，`locate` 也有很多选项来过滤输出。要了解更多你可以查看Linux Locate 命令的手册。

```sh
man locate
```

---

欢迎访问：[个人博客地址](https://tiven.cn/p/e9447af7/ "天問博客")
