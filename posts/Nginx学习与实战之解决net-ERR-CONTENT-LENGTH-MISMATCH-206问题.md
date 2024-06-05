---
title: Nginx学习与实战 · 解决net::ERR_CONTENT_LENGTH_MISMATCH 206问题
abbrlink: 1a04c133
date: 2021-11-25 16:53:28
tags:
- HTTP
- Web
- Nginx
categories:
- Nginx
---

`Vue`项目引入了`d3.js`，在打包部署到`nginx`静态服务后，页面不能正常展示，`F12`打开控制台，发现报了几个`net::ERR_CONTENT_LENGTH_MISMATCH 206 (Partial Content)`错误。第一次遇到`Status Code`为`206`的问题，所以本文记录一下。

![Nginx 206 (Partial Content)](https://tiven.cn/static/img/img-nginx-02-EaUxgR5HCIJZwg371jLjW.jpg)

[//]: # (<!-- more -->)

## 原因

* 项目打包后有些文件比较大，例如这里的`d3.min.js`有140kb，还有`chunk-vendors.js`文件有1.2Mb。
* 使用`Nginx`部署静态文件，配置了`反向代理`服务，而代理服务器的响应内容`缓存区`默认比较小，导致部分文件出现加载不全的问题。

## 解决方案

* 增加`缓存`大小
* 增加nginx的`代理缓存区`

在`nginx.conf`中`http`里面加入三行配置，如下：

```nginx configuration
#user  nobody;
worker_processes  1;

events {
  worker_connections  1024;
}

http {

  sendfile        on;
  #tcp_nopush     on;
    
  keepalive_timeout  65;
    
  # 增加配置 start
  proxy_buffer_size 128k;
  proxy_buffers   32 128k;
  proxy_busy_buffers_size 128k;
  # 增加配置 end
    
  #gzip  on;  
  
  server {
    # ...
    # ...
  }	
  
# ...
}
```

* 保存成功后，重启`Nginx`：

```sh
nginx -t

nginx -s reload
```

再次刷新页面发现页面可以正常展示了，没有了`206`的错误，问题解决。

>耐思^_^

---

## Nginx 相关推荐

* [Nginx学习与实战 · 配置HTTP2](https://tiven.cn/p/1612b5cd/ "Nginx配置HTTP2 | 天问博客")
* [Nginx学习与实战 · 解决SPA单页面应用CDN缓存问题](https://tiven.cn/p/23ff4dc/ "Nginx解决SPA单页面应用CDN缓存问题 | 天问博客")
* [Nginx学习与实战 · 解决net::ERR_CONTENT_LENGTH_MISMATCH 206问题](https://tiven.cn/p/1a04c133/ "Nginx解决net::ERR_CONTENT_LENGTH_MISMATCH 206问题  | 天问博客")
* [Nginx warn：conflicting server name '127.0.0.1' on 0.0.0.0:8010, ignored](https://tiven.cn/p/77bb2345/ "Nginx warn：conflicting server name '127.0.0.1' on 0.0.0.0:8010, ignored | 天问博客")
* [Nginx反向代理WebSocket服务连接报错：WebSocket connection to 'wss://xxx/xxx' failed](https://tiven.cn/p/d9c87205/ "Nginx反向代理WebSocket服务连接报错：WebSocket connection to 'wss://xxx/xxx' failed | 天问博客")

---

欢迎访问：[天问博客](https://tiven.cn/p/1a04c133/ "天問博客")

