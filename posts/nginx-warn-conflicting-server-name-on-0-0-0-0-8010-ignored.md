---
title: 'nginx: [warn] conflicting server name "127.0.0.1" on 0.0.0.0:8010, ignored'
date: 2022-01-8 12:24:49
abbrlink: 77bb2345
tags:
- Nginx
categories:
- Nginx
---

修改nginx配置后，使用 `nginx -t` 命令检查，提示 `nginx: [warn] conflicting server name "127.0.0.1" on 0.0.0.0:8010, ignored` 。

![Nginx](https://tiven.cn/static/img/lol-aixi-EdqqnZmN7hqxlWovKa8nW.jpg)

[//]: # (<!-- more -->)

完整输出如下：

```txt
nginx: [warn] conflicting server name "127.0.0.1" on 0.0.0.0:8010, ignored
nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful
```

经检查是 `nginx.conf` 配置文件中的 `server` 使用了重复的`端口号`，删除或修改其他`端口号`，就不会有这个 `warn` 了。

---

## Nginx 相关推荐

* [Nginx学习与实战 · 配置HTTP2](https://tiven.cn/p/1612b5cd/ "Nginx配置HTTP2 | 天问博客")
* [Nginx学习与实战 · 解决SPA单页面应用CDN缓存问题](https://tiven.cn/p/23ff4dc/ "Nginx解决SPA单页面应用CDN缓存问题 | 天问博客")
* [Nginx学习与实战 · 解决net::ERR_CONTENT_LENGTH_MISMATCH 206问题](https://tiven.cn/p/1a04c133/ "Nginx解决net::ERR_CONTENT_LENGTH_MISMATCH 206问题  | 天问博客")
* [Nginx warn：conflicting server name '127.0.0.1' on 0.0.0.0:8010, ignored](https://tiven.cn/p/77bb2345/ "Nginx warn：conflicting server name '127.0.0.1' on 0.0.0.0:8010, ignored | 天问博客")
* [Nginx反向代理WebSocket服务连接报错：WebSocket connection to 'wss://xxx/xxx' failed](https://tiven.cn/p/d9c87205/ "Nginx反向代理WebSocket服务连接报错：WebSocket connection to 'wss://xxx/xxx' failed | 天问博客")

---

欢迎访问：[天问博客](https://tiven.cn/p/77bb2345/ "天問博客")
