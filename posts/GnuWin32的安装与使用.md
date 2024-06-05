---
title: GnuWin32的安装与使用
abbrlink: 75f205cd
date: 2021-10-16 11:47:09
tags:
- Linux
categories:
- Linux / Shell
---

使用过Linux的伙计估计都会喜欢上linux各种各样强大的命令如：`find`、`vim`、`cp`、`mv`、`wget`、`curl`、`grep`、`ls`等等。
而`GnuWin32`使windows用户可以在`命令行`窗口中使用各种各样的`linux`命令，就跟使用普通的windows命令一样简单。

![GnuWin32](https://tiven.cn/static/img/img-post-14-lPavn7JjjNy9OxoNiWRF3.jpg)

[//]: # (<!-- more -->)

## 下载安装

1. 下载`GnuWin32`，GnuWin32的安装文件(GetGnuWin32-0.6.3.exe)。
* 下载地址：http://sourceforge.net/projects/getgnuwin32/
* 官网地址：http://gnuwin32.sourceforge.net/
* 百度云地址：https://pan.baidu.com/s/1OFQQ7mBhxkeRE9O5Q1RwgA    提取码：t0xb

2. 运行GetGnuWin32-0.6.3.exe，并指定安装目录。
3. 进入安装目录的GetGnuWin32子目录，gnuwin32子目录是GetGnuWin32-0.6.3.exe自动创建的。
4. 运行`download.bat`（双击自动运行），这个过程会从网络上下载所有`linux`命令程序，根据下载环境，可能过程比较漫长，请耐心等待。
5. 运行`install.bat`（双击自动运行），安装结束。
   
## 配置环境变量

将`gnuwin32子目录`下的`bin`目录路径配置到计算机系统环境变量`path`中，大功告成。
`win+R`输入`cmd`，开启一个新的命令行窗口，测试体验。

**提示：** 如果命令行未生效，提示`xx is not recognized as an internal or external command, operable program or batch file.`，建议重启一下电脑试试。

## 使用命令

```sh
# 创建目录
mkdir src

# 创建文件
touch test.js

# 编辑文件
vim test.js

# 移动文件
mv test.js ./src

# 备份文件
cp test.js ./src/test_old.js

# find + grep查找文件
find D:\* | grep .js

```


---

欢迎访问：[个人博客地址](https://tiven.cn/p/75f205cd/ "天問博客")
