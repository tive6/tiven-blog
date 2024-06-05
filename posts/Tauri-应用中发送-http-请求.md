---
title: Tauri 应用中发送 http 请求
tags:
- Node
- pnpm
- Tauri
categories:
- Electron / Tauri
abbrlink: 959691bf
date: 2023-07-07 10:06:36
---

最近基于 `Tauri` 和 `React` 开发一个用于 `http/https` 接口测试的工具 `Get Tools`，其中使用了 **tauri** 提供的 `fetch` API，在开发调试过程中遇到了一些权限和参数问题，在此记录下来。 

![Tauri Http](https://tiven.cn/static/img/img-post-tools-01-tE7rIxba_VxgZRYkVBUtC.jpg)

[//]: # (<!-- more -->)

## 权限配置

在 `tauri` 应用中，如果想要使用 **http** 或 **fetch** API 发送请求，必须配置相应的权限和 `scope`。
否则会出现类似这样的报错：`url not allowed on the configured scope: http://xxx.com/xxx` 。

因此，需要在 `tauri.conf.json` 文件中进行配置：

```js 
{
  "tauri": {
    "allowlist": {
      // ...
      
      "http": {
        "all": true,
        "request": true,
        "scope":[
          "http://**",
          "https://**"
        ]
      }
      
      // ...
    }
  }
}
```

如上所示，将 **http** 的 **scope** 字段配置了 `http://**` 和 `https://**` 匹配规则，就可以发送任意的 **http/ https** 的接口请求了，并且不存在跨域问题。

## http 请求封装

平常习惯了使用 **ajax** 和 **axios** 的请求方法，所以这里对 **tauri** 提供的 `fetch API` 进行基础封装，统一 **GET** 和 **POST** 的请求形式和参数配置，让使用更丝滑。

```js
// http.js

import { fetch, ResponseType, Body } from '@tauri-apps/api/http'

// https://tauri.app/zh-cn/v1/api/js/http#fetch
export const http = (opts = {}) => {
  return new Promise((resolve, reject) => {
    const { url, method, query, data, headers, callback } = opts
    fetch(url, {
      method: method || 'GET',
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      responseType: ResponseType.JSON,
      timeout: 60000,
      query: query,
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


---

欢迎访问：[天问博客](https://tiven.cn/p/959691bf/ "天问博客-专注于大前端技术")

