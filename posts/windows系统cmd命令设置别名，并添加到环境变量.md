---
title: windows系统cmd命令设置别名，并添加到环境变量
tags:
- Linux
- Shell
categories:
- Linux / Shell
abbrlink: 2c2a1994
date: 2023-06-06 15:27:12
---

众所周知，Linux 命令很强大，使用起来也很方便，但是想在 windows 系统上使用 Linux 命令有些困难，要么下载第三方终端工具，要么就是安装一系列命令环境。
作为一个前端开发，其实可以全局安装一下 npm 命令行工具，然后再配置别名，并添加到环境变量中，就可以替代一些常用的 Linux 命令了。

![windows shell 别名](https://tiven.cn/static/img/img-shell-03-B43TyJBUmlnQtFi23jWBF.jpg)

[//]: # (<!-- more -->)

## 配置一个 rmm 命令

> 让 `rmm` 命令代替 `rm -rf` 命令

1. npm 全局安装 `rimraf`

```shell
pnpm i -g rimraf
```

2. 在电脑 `C` 盘下创建一个名为 `alias` 的文件夹，再新建一个 `rmm.bat` 的文件，如：

```txt
PS C:\alias> ls

    目录: C:\alias

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----         2023/6/9     22:24             21 rmm.bat

```

3. 编辑 `rmm.bat` 文件

```shell
@echo off 
rimraf %*
```

解释：`%*` 代表 .bat 脚本的传参，将会接受用户所有输入的文件夹名或文件名。

4. **重点：** 将 `C:\alias` 路径添加到系统环境变量 path 中。不然无法全局使用。

5. 全部保存之后，新打开一个命令行窗口，可以运行 `rmm ./xxx.txt` 命令试试效果。

## 注意与说明

1. `xxx.bat` 的文件名就是你在命令行中需要使用到的 `xxx` 命令，必须一致。
2. 我这里使用的是 `rmm` 命令，因为 windows 系统下存在了 `rm` 命令和 `del` 命令，避免命令不生效，就需要注意配置的别名命令不能和系统内置命令冲突。
3. 使用 `rm -rf` 、`rimraf`、`rmm` 这种命令时需要慎重，避免误删不可找回。 

## 附加 ll 命令

文件：`C:\alias\ll.bat`

```shell
@echo off 
ls %*
```

现在就可以愉快的使用 rmm 命令和 ll 命令了。


---

欢迎访问：[天问博客](https://tiven.cn/p/2c2a1994/ "天问博客-专注于大前端技术")

