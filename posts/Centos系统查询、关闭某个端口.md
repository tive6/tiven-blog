---
title: Centos系统查询、关闭某个端口
tags:
- Linux
categories:
- Linux / Shell
abbrlink: 486eafc3
date: 2022-06-22 15:06:43
---

大部分服务器都是运载 **Linux** 系统，而 **CentOS** 是 Linux 发行版之一，具有稳定，可预测，可管理和可复现等特性。
日常环境搭建、服务部署基本都是使用 linux 命令来进行操作，就前端而言，经常会使用 **Nginx** 部署多个静态服务，这时就需要查查所使用的端口号是否被占用，以避免 Nginx 启动失败。 

![Linux && CentOS](https://tiven.cn/static/img/img-linux-02-T5XKKrMZDxYZDUAwloGVI.jpg)

[//]: # (<!-- more -->)

## Linux 基本操作

> 操作以 **8080** 端口为例

1. 查看端口号占用情况，以 **8080** 端口为例

```shell
netstat -apn | grep 8080
```

output：

```text
[VM-8-12-centos ~]# netstat -apn | grep 8080
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      16729/nginx: master 
```

输出 `16729/nginx: master` 中的 **16729** 为所查询端口对应的进程 ID

2. 查看进程详细信息

```shell
ps -aux | grep 16729
```

output：

```text
[VM-8-12-centos ~]# ps -aux | grep 16729
root     16729  0.0  0.1  46660  3168 ?        Ss   3月11   0:00 nginx: master process nginx
root     28442  0.0  0.0 112828   976 pts/0    R+   15:43   0:00 grep --color=auto 16729
```

3. 关闭端口对应的进程

```shell
kill -9 16729
```

`kill` 进程之后，再次执行 `netstat -apn | grep 8080` 就不会有输入，说明端口未被占用。

---

欢迎访问：[天问博客](https://tiven.cn/p/486eafc3/ "天问博客-专注于大前端技术")



