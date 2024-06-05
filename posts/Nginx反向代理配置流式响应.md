---
title: Nginx反向代理配置流式响应
tags:
- HTTP
- Web
- Nginx
categories:
- Nginx
abbrlink: 1880cec7
date: 2023-08-07 15:27:23
---

**Nginx** 是通过缓存响应内容来处理请求的。也就是说，当 **Nginx** 接收到完整的响应后，才会将其发送给客户端，所以默认不支持流式响应，这里讲讲 Nginx 反向代理中怎么配置流式响应？

![Nginx 流式响应](https://tiven.cn/static/img/nginx-01-Xujhz-Mt.jpg)

[//]: # (<!-- more -->)

## 一、使用背景

最近使用 `Egg.js` 搭建自动化部署服务，其中有个地方需要开启一个子进程执行 shell 脚本，因为脚本中有大量耗时任务，如：build 编译打包，zip 文件压缩，unzip 解压等等。 
为了将脚本每一步的执行日志信息返回到前端进行展示，所以就选择使用流式接口返回结果。
在本地 localhost 环境可以正常进行流式响应，但是发布到 CentOS 服务器上使用 Nginx 反向代理后，每次都是等待脚本全部执行完，才会一次性返回所有结果信息，这显然不是 stream 流式响应。

stream 其他使用场景：像是 **ChatGPT** 这类 AI 产品，在聊天时的 **打字机效果**，就是 **stream** 流式响应的一种实现。

## 二、nginx配置流式响应

关闭响应缓存：`proxy_buffering off`

```nginx configuration
location /api {
    proxy_buffering off; # 关闭响应缓存，添加这一行
    proxy_pass http://127.0.0.1:7001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/1880cec7/ "天问博客-专注于大前端技术")

