---
title: 'github API : Request forbidden by administrative rules'
tags:
  - Tauri
  - JS
  - npm
categories:
  - Electron / Tauri
abbrlink: 588a8def
date: 2024-03-12 11:22:18
---

使用 **Tauri** 框架内置的 `fetch` 方法调用 `GitHub API` 时，出现 `Request forbidden by administrative rules` 错误。

[//]: # (![title]&#40;https://tiven.cn/static/img/img-2018-01-0De2-KDyBGM1FyOdo6hy2.jpg&#41;)

<!-- more -->

## 问题原因

`GitHub API` 要求所有的请求都必须包含一个有效的 `User-Agent` 头部。`User-Agent` 头部用于标识发起请求的用户或应用程序。

github 官网说明：

> All API requests must include a valid User-Agent header. The User-Agent header identifies the user or application that is making the request.
> By default, GitHub CLI sends a valid User-Agent header. However, GitHub recommends using your GitHub username, or the name of your application, for the User-Agent header value. This allows GitHub to contact you if there are problems.

## 解决方案

* 在请求的 headers 中添加 `'User-Agent': 'Tauri-fetch'` 即可解决此问题，`Tauri-fetch` 可替换为真实的，也可以自定义其他值。
* **http** 请求封装：

```javascript
// common/http.js

import { Body, fetch, ResponseType } from '@tauri-apps/api/http'

// https://tauri.app/zh-cn/v1/api/js/http#fetch
export const http = (opts = {}) => {
  return new Promise((resolve, reject) => {
    const { url, method, params, data, headers, callback } = opts
    fetch(url, {
      method: method || 'GET',
      headers: {
        'User-Agent': 'Tauri-fetch', // 添加 User-Agent 头部
        'content-type': 'application/json',
        ...headers,
      },
      responseType: ResponseType.JSON,
      timeout: 60000,
      query: params,
      body: Body.json({
        ...data,
      }),
    })
      .then((res) => {
        callback && callback(res)
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
```

参考文档：https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28#user-agent

---

欢迎访问：[天问博客](https://tiven.cn/p/588a8def/ "天问博客-专注于大前端技术")

