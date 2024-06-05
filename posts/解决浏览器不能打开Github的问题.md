---
title: 解决浏览器不能打开Github的问题
abbrlink: 9b68e6ec
date: 2021-11-29 14:58:38
tags:
- Windows
- Github
categories:
- 浏览器和HTTP那些事
---

作为一个合格的开发者，对`Github`肯定不陌生，有些人可能每天都会到这个开源平台，学习、Clone、Fork各种项目。但是因为各种原因、各种限制，导致浏览器经常不能正常访问`Github`，相信很多小伙伴都遇到过这种情况，很困扰很头疼。本文就简单介绍一下解决办法。

![Github](https://tiven.cn/static/img/img-github-01-Eev9GJHwdfTy8p4WO4Qn8.jpg)

[//]: # (<!-- more -->)

## 一、查询IP地址

1. 进入`Github`的`IP地址`查询网站：https://websites.ipaddress.com/
![Github ipaddress website](https://tiven.cn/static/img/img-github-ip-o3EiheeMf0uKl_aEepIYB.jpg)
2. 在下方的输入框中输入 `github.com` 进行IP搜索查询，结果展示如下，记下`IP Address`的值。
![Github IP地址](https://tiven.cn/static/img/img-github-ipaddress-hfr7xYfULBQWb4grzxWAV.jpg)
3. 再按照上述方法查询以下IP，并记录下对应的IP地址。
   * `www.github.com`
   * `github.global.ssl.fastly.net`
   * `assets-cdn.github.com`
    
* 还有另外一个IP地址查询的网站，可作备用：https://tool.chinaz.com/dns

## 二、修改配置`hosts`文件

Windows系统的`hosts`文件所在位置：

        C:\Windows\System32\drivers\etc

使用`记事本`或者`vscode`打开`hosts`文件，在最下边添加刚刚查询Github的IP地址和对应的域名地址。像这样：

```txt
# GitHub 
13.114.40.48 github.com
140.82.112.4 github.com
199.232.69.194 github.global.ssl.fastly.net
140.82.113.4 www.github.com
185.199.110.153 assets-cdn.github.com
```

**提示：** 保存的时候需要管理员权限，如果是用的公司的电脑，直接编辑保存可能行不通。这时候就需要换个方法，先把`hosts`文件拷贝一份到另外一个文件夹，然后在另外一个文件夹对`hosts`文件进行编辑保存操作。最后再把这个编辑保存好的`hosts`文件复制到`etc`目录，会弹出如下提示框，选择`替换目标中的文件`，这样就很神奇的间接编辑了`hosts`文件。

![Github Hosts](https://tiven.cn/static/img/img-github-hosts-Jcq7Bnfov9v7NebW7bJGu.jpg)

三、检测

1. 刷新DNS

```sh
ipconfig /flushdns
```

2. ping检测

```sh
ping github.com
```
   
3. 输出：

[comment]: <> (![Github Ping]&#40;https://tiven.cn/static/img/img-github-ping-iANTeCq9HSWlSEbEG_hyu.jpg&#41;)

        D:\dev>ipconfig /flushdns
        
        Windows IP Configuration
        
        Successfully flushed the DNS Resolver Cache.
        
        D:\dev>ping github.com
        
        Pinging github.com [13.114.40.48] with 32 bytes of data:
        Request timed out.
        Reply from 13.114.40.48: bytes=32 time=82ms TTL=30
        Reply from 13.114.40.48: bytes=32 time=80ms TTL=30
        Reply from 13.114.40.48: bytes=32 time=82ms TTL=30
        
        Ping statistics for 13.114.40.48:
        Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
        Approximate round trip times in milli-seconds:
        Minimum = 80ms, Maximum = 82ms, Average = 81ms

到这一步基本就大功告成了，再去访问`github.com`，不出意外应该就能正常打开了。

---

欢迎访问：[天問博客](https://tiven.cn/p/9b68e6ec/ "天問博客") 
