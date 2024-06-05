---
title: 'Nginx反向代理WebSocket服务连接报错：WebSocket connection to "wss://xxx/xxx" failed'
tags:
- Nginx
- WebSocket
categories:
- Nginx
abbrlink: d9c87205
date: 2022-05-12 12:49:41
top: 10
description: 最近使用node.js搭建WebSocket服务，部署到Linux服务器上，需要用Nginx来反向代理WebSocket服务。浏览器控制台报错：WebSocket connection to 'wss://tiven.cn/ws/xxx' failed 。
---

最近使用 node.js 搭建 `WebSocket` 服务，在本地测试 connection 都是正常，于是部署到 Linux 服务上，需要用 `Nginx` 来反向代理 `WebSocket` 服务。浏览器控制台报错：`WebSocket connection to 'wss://tiven.cn/ws/xxx' failed:`，经过一番折腾，终于解决了这个报错。

![Nginx WebSocket](https://tiven.cn/static/img/img-nginx-04-bIyGc1JEYNjk4fvdCOddE.jpg)

[//]: # (<!-- more -->)

## 介绍

WebSocket 协议与 HTTP 协议不同，但 WebSocket 握手与 HTTP 兼容，使用 HTTP 升级工具将连接从 HTTP 升级到 WebSocket。这允许 WebSocket 应用程序更容易地适应现有的基础架构。例如，WebSocket 应用程序可以使用标准 HTTP 端口80和443，从而允许使用现有的防火墙规则。

WebSocket 应用程序可以在客户端和服务器之间保持长时间运行的连接，从而有助于开发实时应用程序。 **Nginx 反向代理用于将连接从 HTTP 升级到 WebSocket 的 HTTP 升级机制使用 `Upgrade` 和 `Connection` 头** 。反向代理服务器在支持 WebSocket 时面临一些挑战。一个是 WebSocket 是一个逐跳协议，因此当代理服务器拦截客户端的升级请求时，需要向后端服务器发送自己的升级请求，包括相应的头文件。此外，由于 WebSocket 连接长期存在，与 HTTP 使用的典型短期连接相反，反向代理需要允许这些连接保持打开状态，而不是关闭它们，因为它们似乎处于空闲状态。

允许在客户机和后端服务器之间建立隧道，Nginx 支持 WebSocket。对于 Nginx 将升级请求从客户端发送到后台服务器，必须明确设置 `Upgrade` 和 `Connection` 标题。

总的来说，就是使用 Nginx 反向代理 WebSocket 服务时需要设置  `Upgrade` 和 `Connection` 的 `header`。

## nginx 配置

1. 出现报错时的配置

```nginx configuration
location /ws {
    proxy_set_header  Host $host;
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header  X-Forwarded-Proto   $scheme;
    proxy_pass        http://127.0.0.1:9000/ws;
}            
```

2. 反向代理成功的配置

```nginx configuration
location /ws {
    proxy_set_header  Host $host;
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header  X-Forwarded-Proto   $scheme;
    proxy_pass        http://127.0.0.1:9000/ws;
    
    # 关键配置 start
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    # 关键配置 end
}            
```

完美解决报错问题（`WebSocket connection to "xxx/xxx" failed`）。

---

## Nginx 相关推荐

* [Nginx学习与实战 · 配置HTTP2](https://tiven.cn/p/1612b5cd/ "Nginx配置HTTP2 | 天问博客")
* [Nginx学习与实战 · 解决SPA单页面应用CDN缓存问题](https://tiven.cn/p/23ff4dc/ "Nginx解决SPA单页面应用CDN缓存问题 | 天问博客")
* [Nginx学习与实战 · 解决net::ERR_CONTENT_LENGTH_MISMATCH 206问题](https://tiven.cn/p/1a04c133/ "Nginx解决net::ERR_CONTENT_LENGTH_MISMATCH 206问题  | 天问博客")
* [Nginx warn：conflicting server name '127.0.0.1' on 0.0.0.0:8010, ignored](https://tiven.cn/p/77bb2345/ "Nginx warn：conflicting server name '127.0.0.1' on 0.0.0.0:8010, ignored | 天问博客")
* [Nginx反向代理WebSocket服务连接报错：WebSocket connection to 'wss://xxx/xxx' failed](https://tiven.cn/p/d9c87205/ "Nginx反向代理WebSocket服务连接报错：WebSocket connection to 'wss://xxx/xxx' failed | 天问博客")

---

欢迎访问：[天问博客](https://tiven.cn/p/d9c87205/ "天问博客")



