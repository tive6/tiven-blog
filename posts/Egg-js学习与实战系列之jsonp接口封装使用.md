---
title: Egg.js学习与实战系列 · jsonp接口的封装使用
abbrlink: e2d64b18
date: 2021-10-17 15:59:41
tags:
- Egg.js
- Node
- Jsonp
categories:
- Egg.js
---

`jsonp`作为前端跨域的一种解决方案，不用像配置`nginx`那样做一系列的`反向代理`转发，返回的数据结构也比较严谨，使用起来简单，方便。本篇就讲讲`jsonp`接口在`Egg`框架中的封装与使用。

![Egg+Jsonp](https://tiven.cn/static/img/img-post-15-a2_QWlAulIU0nNCpQ7ze1.jpg)

<!-- more -->

## 下载 egg-jsonp 插件

`egg-jsonp` 是用于 `jsonp` 支持的 `Egg` 插件。

```sh
npm i -S egg-jsonp 
```

## 配置

* config/plugin.js

```js
// {app_root}/config/plugin.js

exports.jsonp = {
  enable: true,
  package: 'egg-jsonp',
};
```

* config/config.default.js

```js
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.jsonp = {
    limit: 100,
    // callback: [ '_callback', 'callback' ],
    // csrf: true,
    // whiteList: [
    // 'localhost:4000/',
    // '127.0.0.1:4000/',
    // ],
  };
  return {
    ...config,
  }
}
```

**配置解释：** 
* `callback`：jsonp回调方法`key`值，默认为 `[ '_callback', 'callback' ]`。
* `csrf`：是否启用 `csrf` 防御检查。默认为 `false`。
* `limit`：回调方法名的最大长度，默认为 `50`。
* `whiteList`：请求`referrer`的白名单。类型可以是String、Array、RegExp。
        * 字符串：{whiteList : '.test.com'}
        * 正则：{whiteList : / ^ https?: \/ \/ test.com \/ /}，如果 `whiteList` 的类型是正则，`referrer` 必须匹配 `whiteList`，注意 `first^`和 `last /`。
        * 数组：{whiteList : [  '.foo.com' ,  '.bar.com'  ]}

  
## controller

```js
// app/controller/jsonp/index.js
'use strict';

const Controller = require('egg').Controller;

class JsonpController extends Controller {

  async list() {
    const { ctx } = this;
    ctx.body = [
      {
        id: 1,
        name: '天問', 
      },
      {
        id: 2,
        name: '天问', 
      },
      {
        id: 3,
        name: 'Tiven', 
      },
    ];
  }

}

module.exports = JsonpController;

```

## router

```js
// app/router.js

module.exports = app => {
  const { router, controller } = app;
  const jsonp = app.jsonp();
  
  router.get('/api/v1/jsonp/list', jsonp, controller.jsonp.index.list);
};

```

## 前端页面调用

```js
function getList(res) {
  if (!res) return
  // jsonp接口返回的数据
  // do ...
  console.log(res)
}
let script = document.createElement('script')
script.src = `http://127.0.0.1:7001/api/v1/jsonp/list?callback=getList&v=${Date.now()}`
document.body.appendChild(script)
```

* 打开控制台的`network`可以查看`jsonp`返回的数据结构：

```javascript
/**/ typeof getList === 'function' && getList([{ "id": 1, "name": '天問'}, { "id": 2,"name": '天问'},{"id": 3, "name": 'Tiven'}]);
```

参考文档：
* https://github.com/eggjs/egg-jsonp

---

## 《Egg.js学习与实战》系列

* [Egg.js学习与实战系列 · 修改应用启动端口号](https://tiven.cn/p/9836898b/ "修改应用启动端口号")
* [Egg.js学习与实战系列 · 文件上传配置](https://tiven.cn/p/a31793d2/ "文件上传配置")
* [Egg.js学习与实战系列 · Post请求csrf token问题](https://tiven.cn/p/c988d645/ "Post请求`csrf token`问题")
* [Egg.js学习与实战系列 · jsonp接口的封装使用](https://tiven.cn/p/e2d64b18/ "jsonp接口的封装使用")（本文）

---

欢迎访问：[个人博客地址](https://tiven.cn/p/e2d64b18/ "天問博客")
