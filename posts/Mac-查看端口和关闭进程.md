---
title: Mac 查看端口和关闭进程
tags:
- Shell
- Mac
- Linux
categories:
- Linux / Shell
abbrlink: 1bff2eb3
date: 2023-03-21 15:46:52
---

经常使用 `node` 启动本地，有时一不小心按了 `Ctrl + Z` （`Command + Z`）把服务关闭了，但实际上没真正关闭该服务，再次启动服务很可能会提示端口号被占用。

![Mac Shell](https://tiven.cn/static/img/img-shell-FT96_YT5KdxO7VzMmkfLS.jpg)

[//]: # (<!-- more -->)

> 系统环境：Mac

## 查看端口的详细端口占用情况

命令：**lsof -i :端口号** 
例如：查询 8081 端口号的占用情况

```shell
lsof -i :8081
```

如果有占用会输出：

```text
tiven@bogon nginx % lsof -i :8081
COMMAND     PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node      17511 tiven   23u  IPv4 0x775d1be9a6cf821b      0t0  TCP *:sunproxyadmin (LISTEN)
Google    83605 tiven   33u  IPv4 0x775d1be9a6d2021b      0t0  TCP localhost:58814->localhost:sunproxyadmin (ESTABLISHED)
```

## 关闭端口号对应的进程服务

以上信息显示 node 程序占用了 8081 端口，本机的 **进程ID** 为 17511。如果我要使用 8081 端口，可以先把应用程序关闭。
命令：`kill PID` 
强制关闭命令：`kill -9 PID` 

```shell
kill 17511
# 强制关闭
kill -9 17511
```

---

欢迎访问：[天问博客](https://tiven.cn/p/1bff2eb3/ "天问博客-专注于大前端技术")

