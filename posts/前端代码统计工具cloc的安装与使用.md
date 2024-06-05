---
title: 前端代码统计工具cloc的安装与使用
tags:
- Node
- Tools
- Perl
categories:
- Node
abbrlink: 15f88707
date: 2022-10-28 14:16:50
---

怎么来衡量一个web端项目的大小，一是看页面多少，二是看源代码行数。页面多少比较好统计，通过 **Router** 的配置大概就能知道。但是源代码行数，如果要一个文件一个文件去计算，那就费了劲了。有问题有需求，就会有人造轮子。本文就介绍一下 **代码统计工具cloc的安装与使用**。 

![Code Tool](https://tiven.cn/static/img/img-code-01-6IWYmS-GDD2PJuyS8hhg2.jpg)

<!-- more -->

## 一、安装cloc

> 前提是 node 和 npm 命令都正常可用

* 全局安装cloc

```shell
npm i -g cloc

# or

cnpm i -g cloc
```

## 二、使用cloc

进入项目执行：

```shell
# 统计当前目录所有文件
cloc .

# 统计项目中 src 目录下所有文件
cloc src
```

输出：

```text
E:\dev\msw-tools>cloc src
      14 text files.
      14 unique files.
       0 files ignored.

github.com/AlDanial/cloc v 1.94  T=0.07 s (206.1 files/s, 20302.7 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Svelte                           3             70              9            661
SCSS                             1             53             18            273
JavaScript                       7             19             32            159
CSS                              1              9              0             73
SVG                              1              0              0              1
TypeScript                       1              0              2              0
-------------------------------------------------------------------------------
SUM:                            14            151             61           1167
-------------------------------------------------------------------------------
```

结果说明：
* **Language**：是当前项目下包含的文件类型，如，Svelte、SCSS、JavaScript、CSS、SVG、TypeScript。
* **files**：总文件数为 14
* **blank**：总空行数为 151
* **comment**：总注释行数为 61
* **code**：总代码行数为 1167

## 三、使用问题

**cloc** 工具依赖 **Perl** 语言环境，如果在环境变量中找不到 **perl** ，在执行 `cloc src` 命令时会出现报错：`'perl' is not recognized as an internal or external command, operable program or batch file.`
这时就需要安装 Perl 环境，并配置到环境变量中。

### 3.1- Perl下载安装

下载地址：
* 官网地址：https://strawberryperl.com/
* 百度云盘：链接：https://pan.baidu.com/s/1_Q6KvbzUssNtvZbDYiHuqg ，提取码：0qz4

### 3.2- perl命令检查

安装成功后，可在命令行中执行 `perl -v`，如果输出如下内容，说明 **perl** 环境安装成功。

```text
E:\dev\msw-tools>perl -v

This is perl 5, version 32, subversion 1 (v5.32.1) built for MSWin32-x64-multi-thread

Copyright 1987-2021, Larry Wall

Perl may be copied only under the terms of either the Artistic License or the
GNU General Public License, which may be found in the Perl 5 source kit.

Complete documentation for Perl, including FAQ lists, should be found on
this system using "man perl" or "perldoc perl".  If you have access to the
Internet, point your browser at http://www.perl.org/, the Perl Home Page.
```

* **PS**：cloc 工具不仅仅可以统计前端项目的代码，统计 C、C++、Java、Python、PHP 等语言的代码也是可以的，只是 cloc 依赖前端的 node 环境，对前端开发者比较友好。

## 四、拓展

使用 `git` 命令统计代码行数
命令：`git ls-files <directory> | xargs wc -l`

```shell
# 统计当前目录下所有文件
git ls-files | xargs wc -l

# 统计 src 目录下所有文件
git ls-files src | xargs wc -l
```

---

欢迎访问：[天问博客](https://tiven.cn/p/15f88707/ "天问博客-专注于大前端技术")

