---
title: Mac 配置 host，且立即生效
tags:
- Linux
- Mac
categories:
- Linux / Shell
abbrlink: aa161ed1
date: 2023-04-02 15:07:48
---

在公司局域网下办公，经常需要在本地配置对应 host 映射，才能正常接入网络。本文就介绍一下怎么在 Mac 上配置 host，且立即生效。

![host](https://tiven.cn/static/img/img-linux-03-kZkPl5y6Q2GP6GTHwunXh.jpg)

<!-- more -->

## 修改 host

1. 打开终端工具
2. 输入命令：`sudo vi /etc/hosts`
3. 输入密码，回车
4. 在英文状态下输入字母 `i`，进入编辑模式，配置好对应的 IP 和 域名
5. 按下键盘键 `esc` 结束输入，最后输入 `:wq` 保存退出

## 立即生效

```shell
sudo killall -HUP mDNSResponder
```


---

欢迎访问：[天问博客](https://tiven.cn/p/aa161ed1/ "天问博客-专注于大前端技术")

