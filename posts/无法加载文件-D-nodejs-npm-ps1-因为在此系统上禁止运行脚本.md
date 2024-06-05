---
title: '无法加载文件 D:\nodejs\npm.ps1,因为在此系统上禁止运行脚本'
tags:
- Node
- npm
categories:
- Node
abbrlink: e1986e11
date: 2023-04-27 16:22:56
---

使用 npm 命令时报错：`无法加载文件 D:\nodejs\npm.ps1,因为在此系统上禁止运行脚本`。

![npm](https://tiven.cn/static/img/img-npm-03-v-E80EPH63k-L1hM4KSsw.jpg)

<!-- more -->

## 解决办法

1. 以管理员的身份打开 `Power Shell`，然后执行以下命令：

```shell
set-ExecutionPolicy RemoteSigned
```

2. 出现选项，回复 A 即可。


---

欢迎访问：[天问博客](https://tiven.cn/p/e1986e11/ "天问博客-专注于大前端技术")

