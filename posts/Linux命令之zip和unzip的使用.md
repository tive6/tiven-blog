---
title: Linux命令 · zip和unzip的使用
abbrlink: 78c5a42d
date: 2021-11-01 17:52:28
tags:
- Linux
- Zip
categories:
- Linux / Shell
---

`zip` 是`Linux`系统中使用广泛的压缩程序，压缩后的文件后缀名为 `.zip`。对应的解压工具 `unzip`, 则专门用于解压缩`zip`文件。

![Linux zip & unzip](https://tiven.cn/static/img/gleise-old-railroad-tracks-seemed-train-preview-bkeX3YA2FXeBwTXtX-A-W.jpg)

<!-- more -->

## zip 的使用

**语法：**

    zip [-AcdDfFghjJKlLmoqrSTuvVwXyz$][-b <工作目录>][-ll][-n <字尾字符串>][-t <日期时间>][-<压缩效率>][压缩文件][文件...][-i <范本样式>][-x <范本样式>]

**参数：**

* `-d` 从压缩文件内删除指定的文件。
* `-q` 不显示指令执行过程。
* `-r` 递归处理，将指定目录下的所有文件和子目录一并处理。
* `-z` 替压缩文件加上注释。
* `-h` 在线帮助。

**实例：**

1. 将 /app/dist/ 这个目录下所有文件和文件夹打包为当前目录下的 dist.zip：

```sh
zip -q -r dist.zip /app/dist
```

2. 如果当前在 /app/dist 目录下，可以执行以下命令：

```sh
zip -q -r dist.zip ./*
```

3. 从 test.zip 压缩包中删除 index.html 文件

```sh
zip -dv test.zip index.html
```

## unzip 的使用

**语法：**

    unzip [-cflptuvz][-agCjLMnoqsVX][-P <密码>][.zip文件][文件][-d <目录>][-x <文件>] 或 unzip [-Z]

**参数：**

* `-l` 显示压缩文件内所包含的文件。
* `-o` 不必先询问用户，unzip执行后覆盖原有文件。
* `-O` 指定解压编码格式。
* `-v` 执行是时显示详细的信息。
* `-d<目录>` 指定文件解压缩后所要存储的目录。
* `-h` 在线帮助。

**实例：**

1. 查看压缩文件中包含的文件：

```sh
unzip -l 01.zip 
```

输出：
```txt
Archive: 01.zip
 Length   Date  Time  Name
--------  ----  ----  ----
  75218 05-02-10 20:44  01.jpg
  305001 05-08-01 20:44  02.jpg
    20 05-22-10 15:01  demo.txt
  308501 05-23-10 10:30  03.png
--------          -------
  688740          4 files
```

2. `-v` 参数用于查看压缩文件目录信息，但是不解压该文件。

```sh
unzip -v test.zip 
```

3. 将 dist.zip 解压并覆盖到 /app/web/ 目录

```sh
unzip -o dist.zip -d /app/web/
```

4. `-O` 指定解压编码格式。一般用于`文件名`或者`目录`名中含有`中文`的解压。

```sh
unzip -O utf-8 demo.zip -d ./demo/
```

---

欢迎访问：[个人博客地址](https://tiven.cn/p/78c5a42d/ "天問博客")
