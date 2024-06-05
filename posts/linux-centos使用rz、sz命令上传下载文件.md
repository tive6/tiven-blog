---
title: linux centos使用rz、sz命令上传下载文件
tags:
- Linux
- Zip
categories:
- Linux / Shell
abbrlink: 17911249
date: 2023-08-04 15:26:29
---

一般情况下，我们会使用终端软件，如 **XShell、SecureCRT 或 FinalShell** 来连接远程服务器后，使用 rz 命令上传本地文件到远程服务器，再解压发版上线。

![rz、sz上传下载](https://tiven.cn/static/img/img-linux-02-T5XKKrMZDxYZDUAwloGVI.jpg)

<!-- more -->

## 一、安转使用

> 系统：Linux CentOS 7

* 安装 rz 和 sz 命令

```shell
yum -y install lrzsz
```

* 使用 rz 上传文件，会跳出文件选择窗口，选择好文件，点击确认即可

```shell
rz 

# 覆盖
rz -y
```

* 使用 sz 下载文件

```shell
sz 文件名

# 下载多个文件
sz 01.txt 02.txt 03.txt ...
```

**注意：** rz / sz 命令不能上传/下载文件夹，如果下载文件夹，请先打包压缩后再进行操作。

## 二、常用参数

rz 和 sz 命令的常用参数一致，如下：

```js
-+, --append
将文件内容追加到已存在的同名文件
    
-a, --ascii
以文本方式传输
    
-b, --binary
以二进制方式传输，推荐使用

--delay-startup N
等待 N 秒
    
-e, --escape
对所有控制字符转义，建议使用
    
-E, --rename
已存在同名文件则重命名新上传的文件，以点和数字作为后缀
    
-p, --protect
对 ZMODEM 协议有效，如果目标文件已存在则跳过
    
-q, --quiet
安静执行，不输出提示信息
    
-v, --verbose
输出传输过程中的提示信息
    
-y, --overwrite
存在同名文件则替换
    
-X, --xmodem
使用 XMODEM 协议

--ymodem
使用 YMODEM 协议
    
-Z, --zmodem
使用 ZMODEM 协议

--version
显示版本信息

--h, --help
显示帮助信息
```

---

欢迎访问：[天问博客](https://tiven.cn/p/17911249/ "天问博客-专注于大前端技术")

