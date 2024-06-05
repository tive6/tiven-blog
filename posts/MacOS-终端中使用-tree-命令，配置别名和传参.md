---
title: MacOS 终端中使用 tree 命令，配置别名和传参
tags:
- brew
- Mac
categories:
- Linux / Shell
abbrlink: 6460f51f
date: 2023-07-08 10:44:59
---

在 linux 上可以轻松使用 **tree** 命令查看目录结构，MacOS 没有自带 **tree** 命令，需要自己安装，或者使用 **find** 命令。

![Mac tree](https://tiven.cn/static/img/img-shell-02-evtTjyGQiSI_3NqvVhdjy.jpg)

[//]: # (<!-- more -->)

## 一、前言

在使用 git 上传代码到仓库时，有时候出现比较慢的情况，除了网络延迟，还有就是出现了比较大的文件，导致 push 变慢，所以就需要分析项目下所有文件的大小。

## 二、安装

### 1）使用 find 命令代替 tree 命令

* 配置别名，在 `.zshrc` 中加入以下内容：

```shell
vim ~/.zshrc

# 加入内容
alias trees="find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'"
```

* 更新配置

```shell
source ~/.zshrc
```

### 2）安装 tree 命令（`推荐`）

* 安装

```shell
brew install tree
```

* 配置别名

配置别名可以默认带上一些常用参数，如下别名配置相当于省略了 `-S -A -C` 参数，会默认携带。 

```shell
alias trees='tree -S -A -C $*'
```

* 使用命令

```shell
# 使用别名命令
trees src -s

# 等价与
tree -S -A -C scr -s
```

### 3）使用 du 命令

du 命令只能显示当前一级目录或文件的大小，无法看到 tree 结构

* 基本命令

```shell
du -hs *

# or
du -shc *

# 显示当前目录下所有文件（包含文件夹）大小，并排序
du -sh * | sort -rh
```

## 三、tree 常用参数

```text
  -------清单选项-------
  -a 列出所有文件和目录。
  -d 仅仅列出目录名称。
  -f 打印显示每个文件的完整路径前缀。
  -L 后面跟数字，控制列出几级目录。
  --------文件选项---------
  -q 用"?"号取代控制字符，列出文件和目录名称。
  -N 直接列出文件和目录名称，包括控制字符。
  -Q 用双引号引用文件名。
  -p 列出文件的权限标示。
  -u 列出文件或目录的拥有者名称，没有对应的名称时，则显示用户识别码。
  -g 列出文件或目录的所属群组名称，没有对应的名称时，则显示群组识别码。
  -s 打印每个文件的字节大小。
  -------排序选项-------
  -v 按文本字母数字排序文件。
  -t 按上次修改时间对文件进行排序。
  -c 按上次状态更改时间对文件进行排序。
  -U 保留文件未排序。
  -r 反转排序的顺序。
  --dirsfirst列出文件之前的目录（-U禁用）。
  -------图形选项------
  -i 不要打印缩进线。
  -A 打印ANSI线图形缩进线。
  -S 使用CP437（控制台）图形缩进线打印。
  -n 始终关闭着色（-C覆盖）。
  -C 总是打开彩色。
  ------- XML / HTML / JSON选项-------
  -X 打印树的XML表示。
  -J 打印出树的JSON表示。
  -H baseHREF 以baseHREF作为顶层目录打印HTML格式。
  -T string     Replace the default HTML title and H1 header with string.
  ----其他选项----
  --version打印版本并退出。
```

## 四、输出 tree 文件

```shell
# txt 文件
trees src -s > tree.txt

# xml 文件
trees src -s -X > tree.xml

# html 文件
trees src -s -H baseHREF > tree.html
```

---

欢迎访问：[天问博客](https://tiven.cn/p/6460f51f/ "天问博客-专注于大前端技术")

