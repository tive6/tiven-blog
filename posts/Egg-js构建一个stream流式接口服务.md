---
title: Egg.js构建一个stream流式接口服务
tags:
- Egg.js
- Node
- Stream
categories:
- Egg.js
abbrlink: ea3cb27e
date: 2023-08-08 16:10:23
---

经常需要用到 **stream** 流式接口服务,比如：大文件下载、日志实时输出等等。本文将介绍如何使用Egg.js构建一个 stream 流式接口服务。

![Egg.js Stream API](https://tiven.cn/static/img/eggjs-01-t4dYaNtm.jpg)

[//]: # (<!-- more -->)

## 一、准备工作

目录结构：

```txt
app/
    /controller
        index.js
        test.txt
        test.sh
```

1. index.js 控制器
2. test.txt 测试文件，最好是20M以上的文件，这样才能看出流式返回的效果
3. test.sh 测试脚本，用于实时输出日志的测试脚本


## 二、流式文件处理

1. `controller/index.js` 文件内容如下：

```js
'use strict';

const Controller = require('egg').Controller;
const { createReadStream } = require('fs');
const { join } = require('path');

class HomeController extends Controller {

  async testStream() {
    const { ctx } = this;
    ctx.set('Content-Type', 'text/plain; charset=utf-8');
    const stream = createReadStream(join(__dirname, './test.txt'));
    ctx.body = stream;
  }

}

module.exports = HomeController;
```

## 三、流式日志处理

1. `controller/index.js` 文件内容如下：

```js
'use strict';

const Controller = require('egg').Controller;
const { createReadStream } = require('fs');
const { join } = require('path');
const { spawn } = require('child_process');

class HomeController extends Controller {

  async testStream() {
    ctx.set('Content-Type', 'text/plain; charset=utf-8');

    const shPath = join(__dirname, './test.sh');
    const stream = spawn('sh', [ shPath ]);
    ctx.body = stream.stdout;
  }

}

module.exports = HomeController;
```

2. `controller/test.sh` 文件内容如下：

```bash
#!/usr/bin/env sh

set -e

int=1
while(( $int<=10 ))
do
    echo $int
    sleep 2
    let "int++"
done
```

## 四、测试

前端使用 **fetch** 方法进行测试，为什么不用 **axios** ?因为 **axios** 是基于 `XMLHttpRequest` 的，不支持流式接口。 具体实现请参考：[前端实现 stream 流式请求](https://tiven.cn/p/5056ee2b/ "天问博客-专注于大前端技术")

---

欢迎访问：[天问博客](https://tiven.cn/p/ea3cb27e/ "天问博客-专注于大前端技术")

