---
title: curl 网络检测查询
tags:
  - curl
  - HTTP
categories:
  - 开发者笔记
abbrlink: cd25de8b
date: 2024-03-18 11:13:12
---

日常开发中，我们经常会使用 `curl` 命令来检测网络请求，查询接口数据。下面是一些常用的 `curl` 命令。

[//]: # (![title]&#40;https://tiven.cn/static/img/img-2018-01-0De2-KDyBGM1FyOdo6hy2.jpg&#41;)

<!-- more -->

1. curl ipinfo.io

```shell
curl ipinfo.io
```

- 输出

```json
>️ curl ipinfo.io
{
    "ip": "119.151.151.51",
    "city": "Beijing",
    "region": "Beijing",
    "country": "CN",
    "loc": "139.975,156.3972",
    "org": "AS59080 Beijing Shiwei border Technology Co., Ltd",
    "timezone": "Asia/Shanghai",
    "readme": "https://ipinfo.io/missingauth"
}
```

2. curl cip.cc

```shell
curl cip.cc
```

- 输出

```js
> curl cip.cc       
IP      : 119.151.151.51
地址    : 中国  北京
运营商  : 联通/电信

数据二  : 北京市

数据三  : 中国北京北京市 | 电信

URL     : http://www.cip.cc/119.161.171.51
```

3. "魔法"检测

```shell
curl -v google.com
```

---

欢迎访问：[天问博客](https://tiven.cn/p/cd25de8b/ "天问博客-专注于大前端技术")

