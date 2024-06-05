---
title: nodejs实现gitee WebHook签名密钥请求鉴权
tags:
- Node
- WebHook
categories:
- Node
abbrlink: 99c562df
date: 2023-08-14 17:15:37
---

最近使用 **Egg.js** 搭建了一套类似于 **Jenkins** 自动发版的服务，集成了 gitee WebHook ，在 push 代码的时候触发 WebHook 实现代码的自动 pull 和构建发版，其中比较关键的就是 **gitee WebHook签名密钥请求鉴权** ，踩了一些坑，记录下来。

![WebHook 签名密钥](https://tiven.cn/static/img/web-hook-01-tB0RV9C3.jpg)

[//]: # (<!-- more -->)

## 一、前言

接入 gitee WebHook，可通过 WebHook **密码** 进行鉴权，或通过 **签名密钥** 生成请求签名进行鉴权。
因为密码鉴权比较简单也不是很安全，所以采用采用 **签名密钥** 的形式鉴权。

## 二、生成签名密钥

密钥是一段字符串，既然是密钥，那就最好用 **md5** 加密一下，可以保证密钥长度是固定的 **32** 位。

代码 1:

```js
const { createHash } = require('crypto');

function createMd5(content) {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

// 生成密钥
const secretStr = '2f2$%^&*()>M678<<$@1!@*>/'
const secret = createMd5(secretStr)
```

## 三、签名鉴权

Gitee WebHook 官方算法步骤：
* Step1：把 `timestamp+"\n"+ 密钥` 当做签名字符串，使用 **HmacSHA256** 算法计算签名。
* Setp2：对上述得到的结果进行 `Base64 encode`。

1. 在触发 webHook 钩子后，会向配置的 `webHook URL` 发送一个 **POST** 请求，请求信息大概如下：

```js
Request URL: https://test.com/api/web/cicd/postHook/3455
Request Method: POST
X-Gitee-Token: JwqlfVhab3VXQiaBtmLlUIl458alwcpShwYFIxf/l8U=
X-Gitee-Event: push_hooks
User-Agent: git-oschina-hook
X-Gitee-Timestamp: 1691735831317
X-Gitee-Ping: true
Content-Type: application/json
X-Git-Oschina-Event: push_hooks
```

2. 以下两个信息在请求的 header 中，比较重要，后边签名鉴权需要用到

**X-Gitee-Token：** 这个就是 密钥签名 token
**X-Gitee-Timestamp：** 当前时间戳，单位是毫秒，与请求调用时间误差不能超过 1 小时，请求时需和密钥一并发送。

3. 因为 **X-Gitee-Token** 无法反解密，所以只能按照官方的加密算法步骤生成一个 token，与 **X-Gitee-Token** 进行对比，如果是一致的，则鉴权通过，否则，就鉴权失败。

代码 2：

```js
const { createHmac } = require('crypto');

/**
 * @param {Object} obj 传参
 * @param {string} obj.secret 配置的签名密钥
 * @param {string} obj.timestamp header中解析的X-Gitee-Timestamp
 * @param {string} obj.token header中解析的X-Gitee-Token
 * @return {boolean} 鉴权是否通过
 * @description 签名鉴权方法
 * @author Tiven <tw.email@qq.com>
 * @copyright Tiven 2023
 * 
 * @see {@link https://help.gitee.com/webhook/how-to-verify-webhook-keys}
 * */

function verifyGiteeToken({ secret, timestamp, token }) {
  try {
    const str = `${timestamp}\n${secret}`;
    const hmac = createHmac('sha256', secret);
    const sign = hmac.update(str).digest('base64');
    return token === sign;
  } catch (e) {
    return false;
  }
}
```

参数说明：

**secret：** 签名密钥，**代码 1** 生成的 `secret`
**timestamp：** header中的 `X-Gitee-Timestamp` ，自行解析
**token：** header中的 `X-Gitee-Token` ，自行解析

这样就能调用 `verifyGiteeToken` 函数进行签名鉴权了，记得正确✅传参。

**Gitee WebHook** 签名生成算法文档：https://help.gitee.com/webhook/how-to-verify-webhook-keys

---

欢迎访问：[天问博客](https://tiven.cn/p/99c562df/ "天问博客-专注于大前端技术")

