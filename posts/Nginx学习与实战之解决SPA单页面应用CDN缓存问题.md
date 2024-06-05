---
title: Nginx学习与实战 · 解决SPA单页面应用CDN缓存问题
abbrlink: 23ff4dc
date: 2022-01-20 10:34:25
tags:
- HTTP
- web
- Nginx
categories:
- Nginx
description: 使用Vue、React等框架开发的SPA单页面应用在打包文件比较大。因此，大部分公司在生产环境会使用CDN加速，来加快首页渲染速度。但是使用CDN后静态文件会有缓存，重新打包上线后，可能不会立即更新修改的地方。所以需要在Nginx中配置相应的缓存策略。
---

现在很多web应用都是使用`Vue`、`React`等框架开发的，这种`SPA单页面`应用在打包后，有些文件比较大。因此，大部分公司在生产环境会使用`CDN加速`，来加快`首页渲染速度`。
但是使用CDN后静态文件会有缓存，重新打包上线后，可能不会立即更新修改的地方。浏览器上可以使用`Ctrl + Shift + R`强制清理缓存，但是手机上清理缓存就很麻烦。再说这种清理缓存的方式对用户来说极度不友好，所以需要在`Nginx`中配置相应的`缓存策略`。

![Nginx & CDN Cache](https://tiven.cn/static/img/img-nginx-03-PjKgeO2EXmC2et_5N5c0l.jpg)

<!-- more -->

## 配置Nginx

打开 `nginx.conf` 配置文件，编辑对应的`server`，加上下面的控制缓存策略代码：

```nginx configuration
server {
    listen       8088;
    server_name  localhost;
    
    location / {
        root   /data/www/web-test;
        index  index.html;
        try_files $uri $uri/ /index.html;
        
        # 控制缓存策略代码 start 
        # code-1
        if ($request_filename ~ .*\.(htm|html)$) {
            add_header Cache-Control 'no-store, no-cache, must-revalidate';
        }
        
        # code-2
        if ($request_filename ~ .*.(js|css)$) {
            expires 30d;
        }
        # 控制缓存策略代码 end
        
    }
}
```

* **code-1：** 这段代码的含义是不缓存`html`入口页，每次都重新从服务端拉取最新的文件。
* **code-2：** 这个是匹配找到所有的`js`、`css`文件，让其加上 30天 的缓存。

配置成功后，执行 `nginx -s reload` 重启nginx，应该就大功告成了。

---

## Nginx 相关推荐

* [Nginx学习与实战 · 配置HTTP2](https://tiven.cn/p/1612b5cd/ "Nginx配置HTTP2 | 天问博客")
* [Nginx学习与实战 · 解决SPA单页面应用CDN缓存问题](https://tiven.cn/p/23ff4dc/ "Nginx解决SPA单页面应用CDN缓存问题 | 天问博客")
* [Nginx学习与实战 · 解决net::ERR_CONTENT_LENGTH_MISMATCH 206问题](https://tiven.cn/p/1a04c133/ "Nginx解决net::ERR_CONTENT_LENGTH_MISMATCH 206问题  | 天问博客")
* [Nginx warn：conflicting server name '127.0.0.1' on 0.0.0.0:8010, ignored](https://tiven.cn/p/77bb2345/ "Nginx warn：conflicting server name '127.0.0.1' on 0.0.0.0:8010, ignored | 天问博客")
* [Nginx反向代理WebSocket服务连接报错：WebSocket connection to 'wss://xxx/xxx' failed](https://tiven.cn/p/d9c87205/ "Nginx反向代理WebSocket服务连接报错：WebSocket connection to 'wss://xxx/xxx' failed | 天问博客")

---

欢迎访问：[天问博客](https://tiven.cn/p/23ff4dc/ "天問博客")
