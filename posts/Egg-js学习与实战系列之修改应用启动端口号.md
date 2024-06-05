---
title: Egg.js学习与实战系列 · 修改应用启动端口号
tags:
- Egg.js
- Node
categories:
- Egg.js
abbrlink: 9836898b
date: 2021-09-12 21:41:21
---

默认情况`egg.js`启动的端口是`7001`，如果该端口被占用，想修改其他端口的话，那么就要进行如下配置：

![EggJS](https://tiven.cn/static/img/img-eggjs-service-2sMvHXzfGw56wKUBOhbMm.jpg)

<!-- more -->

* 在 `config/config.default.js` 配置如下代码：

```javascript
/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // code start
    config.cluster = {
        listen: {
            path: '',
            port: 8001,
            hostname: '127.0.0.1', // 0.0.0.0
        }
    }
    // code end
    
    return {
        ...config,
    };
};
```

参考文档：
* https://eggjs.org/api/Config.html#cluster

---

## 《Egg.js学习与实战》系列

* [Egg.js学习与实战系列 · 修改应用启动端口号](https://tiven.cn/p/9836898b/ "修改应用启动端口号")（本文）
* [Egg.js学习与实战系列 · 文件上传配置](https://tiven.cn/p/a31793d2/ "文件上传配置")
* [Egg.js学习与实战系列 · Post请求csrf token问题](https://tiven.cn/p/c988d645/ "Post请求`csrf token`问题")
* [Egg.js学习与实战系列 · jsonp接口的封装使用](https://tiven.cn/p/e2d64b18/ "jsonp接口的封装使用")

---

欢迎访问：[个人博客地址](https://tiven.cn/p/9836898b/ "天問博客")
