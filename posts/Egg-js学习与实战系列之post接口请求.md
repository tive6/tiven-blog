---
title: Egg.js学习与实战系列 · Post请求`csrf token`问题
abbrlink: c988d645
date: 2021-10-14 18:46:42
tags:
- Egg.js
- Node
- Axios
categories:
- Egg.js
---

在使用`axios`请求`egg.js`封装的post接口时出现`missing csrf token` 或 `invalid csrf token`。踩过坑的新手估计不在少数，本篇记录一下解决方法。

![EggJS](https://tiven.cn/static/img/img-post-13-swe1tq6a2wykmnSmmNPuD.jpg)

<!-- more -->

## 问题原因

* 引用一下官网的`Web 安全概念`：

> Web 应用中存在很多安全风险，这些风险会被黑客利用，轻则篡改网页内容，重则窃取网站内部数据，更为严重的则是在网页中植入恶意代码，使得用户受到侵害。

常见的安全漏洞如下： 
* `XSS` 攻击：对 Web 页面注入脚本，使用 JavaScript 窃取用户信息，诱导用户操作。
* `CSRF` 攻击：伪造用户请求向网站发起恶意请求。
* `钓鱼攻击`：利用网站的跳转链接或者图片制造钓鱼陷阱。
* HTTP参数污染：利用对参数格式验证的不完善，对服务器进行参数注入攻击。
* 远程代码执行：用户通过浏览器提交执行命令，由于服务器端没有针对执行函数做过滤，导致在没有指定绝对路径的情况下就执行命令。

对于这些风险，Egg框架本身内置了丰富的解决方案。回归本题，其中出现`missing csrf token`就是因为`CSRF 的防御方案`。

解决方案如下：

## 关闭配置（不推荐）

```js
// config/config.default.js

exports.security = {
  csrf: {
    enable: false,
  },
};
```

**注意：** 框架的安全插件是默认开启的。除非清楚的确认后果，否则不建议擅自关闭安全插件提供的功能。

## 配置请求headers

* 修改config中`security`的配置

```js
// config/config.default.js

exports.security = {
  csrf: {
    enable: true,
    headerName: 'token',
  },
};
```

**解释：** 通过 `header` 的 `token` 字段传递 `CSRF token`，默认字段为 `x-csrf-token`。

* axios请求配置：

```js
// 例：

async function getData(data) {
  try {
    let res = await axios({
      url: "http://127.0.0.1:7001/api/test/list",
      method: 'POST',
      data,
      headers: {
        "token": 'xxxxxxxxx',
      }
    });
    console.log(res.data)
  } catch (e) {
    console.log(e)
  }
}
```

* 在`Node`环境请求post接口，没有`Cookie`信息，所以还需要在请求的`headers`中加上`Cookie`，不然会报错`invalid csrf token`。代码如下：

```js
headers: {
    "token": 'xxxxxxxxx',
    "Cookie": 'csrfToken=xxxxxxxxx',
}
```

参考文档：
* https://eggjs.org/zh-cn/core/security.html

---

## 《Egg.js学习与实战》系列

* [Egg.js学习与实战系列 · 修改应用启动端口号](https://tiven.cn/p/9836898b/ "修改应用启动端口号")
* [Egg.js学习与实战系列 · 文件上传配置](https://tiven.cn/p/a31793d2/ "文件上传配置")
* [Egg.js学习与实战系列 · Post请求csrf token问题](https://tiven.cn/p/c988d645/ "Post请求`csrf token`问题")（本文）
* [Egg.js学习与实战系列 · jsonp接口的封装使用](https://tiven.cn/p/e2d64b18/ "jsonp接口的封装使用")

---

欢迎访问：[个人博客地址](https://tiven.cn/p/c988d645/ "天問博客")

