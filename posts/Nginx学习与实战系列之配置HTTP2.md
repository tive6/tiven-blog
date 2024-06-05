---
title: Nginx学习与实战 · 配置HTTP2
abbrlink: 1612b5cd
date: 2021-11-03 11:07:16
tags:
- HTTP
- Web
- Nginx
categories:
- Nginx
---

`HTTP/2` 协议于2015年5月正式版发布，`HTTP/2`大幅度的提高了web性能，在`HTTP/1.1`完全语意兼容的基础上，进一步减少了网络的延迟。实现低延迟高吞吐量。本文就讲讲在`Linux`中`Nginx`配置`HTTP2`的方法和步骤。

![Nginx HTTP2](https://tiven.cn/static/img/img-nginx-01-p2nf8ACAkWyNu_cU5BZh-.jpg)

[//]: # (<!-- more -->)

## 1、HTTP2科普

>`HTTP2`基于`spdy`的思路，引入流与帧的概念，继承了 `spdy` 的多路复用，在此基础上开发的。

**spdy协议：** spdy在五层协议栈的TCP层与HTTP层引入了一个新的逻辑层以提高效率。spdy是一个中间层，对TCP层与HTTP层有很好的兼容，不需要修改HTTP层即可改善应用数据传输速度。 spdy通过多路复用技术，使客户端与服务器只需要保持一条链接即可并发多次数据交互，提高了通信效率。

### 1-1、HTTP2优点：

* 二进制分帧
* 首部压缩
* 流量控制
* 多路复用
* 请求优先级
* 服务器推送

## 2、前提条件

1. 网站必须开启`HTTPS`
2. `openssl`的版本必须 ≥ `1.0.2e`
3. `nginx`的版本必须 ≥ `1.9.5`

## 3、安装 & 配置

目录介绍：
* nginx安装目录：/usr/local/nginx/
* nginx源码目录：/root/dev/nginx-1.20.1/

### 3-1.查看nginx版本信息

这里的`nginx`配置了全局环境变量，可以直接输入以下命令，nginx具体路径/位置根据个人配置来决定。

```sh
nginx -V
```

输出：

```txt
nginx version: nginx/1.20.1
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC) 
built with OpenSSL 1.0.2k-fips  26 Jan 2017
TLS SNI support enabled
configure arguments: --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module
```

查看`configure`中是否安装了`with-http_v2_module`模块，这里的已经安装了。若没有则进行下一步。

### 3-2.安装`with-http_v2_module`模块

3-2-1. 进入`nginx源码`目录，一般结构如下：

```txt
auto  
CHANGES  
CHANGES.ru  
conf  
configure  
contrib  
html  
LICENSE  
Makefile  
man  
objs  
README  
src
```

3-2-2. 配置`with-http_v2_module`模块，`--prefix`指向nginx安装目录

```sh
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module
```

3-2-3. 编译，**注意：** 如果是首次安装nginx，还需要在编译完成后执行`make install`安装操作。如果之前已经安装了nginx，并且配置了相关服务，就不要再执行`make install`安装操作了，否则会覆盖原来的安装。

```sh
make
```

3-2-4. 编译执行成功后，会在`nginx源码目录`生成`objs`文件夹，此目录有一个nginx二进制文件，需要把这个nginx可执行文件复制到`nginx安装目录`。建议把旧文件先备份，方便回滚。

```sh
# 备份旧的nginx
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak
# 复制新的nginx
cp ./objs/nginx /usr/local/nginx/sbin/nginx
```

3-2-5. 检查模块是否添加成功，若`configure arguments`中包含`--with-http_v2_module `模块说明已经添加成功

```sh
/usr/local/nginx/sbin/nginx -V
```

### 3-3.配置 nginx.conf

```nginx configuration
server {
    # 添加 http2
    listen 443 ssl http2;
    server_name tiven.cn; 
    root html;
    index index.html index.htm;
    # ...
    # ...
    # ...
}
```

### 3-4.重启nginx

```sh
# 检查配置
nginx -t
# 停止nginx
nginx -s stop
# 启动nginx
nginx
```

## 4、检查网站HTTP2协议是否开启

具体方法详见本站另一篇博文：[HTTP协议版本检测](https://tiven.cn/p/34b7ce97/ "HTTP协议版本检测")

---

## Nginx 相关推荐

* [Nginx学习与实战 · 配置HTTP2](https://tiven.cn/p/1612b5cd/ "Nginx配置HTTP2 | 天问博客")
* [Nginx学习与实战 · 解决SPA单页面应用CDN缓存问题](https://tiven.cn/p/23ff4dc/ "Nginx解决SPA单页面应用CDN缓存问题 | 天问博客")
* [Nginx学习与实战 · 解决net::ERR_CONTENT_LENGTH_MISMATCH 206问题](https://tiven.cn/p/1a04c133/ "Nginx解决net::ERR_CONTENT_LENGTH_MISMATCH 206问题  | 天问博客")
* [Nginx warn：conflicting server name '127.0.0.1' on 0.0.0.0:8010, ignored](https://tiven.cn/p/77bb2345/ "Nginx warn：conflicting server name '127.0.0.1' on 0.0.0.0:8010, ignored | 天问博客")
* [Nginx反向代理WebSocket服务连接报错：WebSocket connection to 'wss://xxx/xxx' failed](https://tiven.cn/p/d9c87205/ "Nginx反向代理WebSocket服务连接报错：WebSocket connection to 'wss://xxx/xxx' failed | 天问博客")

---

欢迎访问：[天问博客](https://tiven.cn/p/1612b5cd/ "天問博客")
