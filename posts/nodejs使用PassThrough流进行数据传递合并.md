---
title: nodejs使用PassThrough流进行数据传递合并
tags:
- Egg.js
- Node
- Stream
categories:
- Node
abbrlink: 7286ed85
date: 2023-08-16 17:27:30
---

在Node.js中，流（`stream`）是处理数据的强大工具，它们允许我们以流式方式处理大量数据，而不必一次性将所有数据加载到内存中。`PassThrough`是Node.js中的一个流类型，它在数据流传递过程中起到 **无操作** 的中间层，将数据从可读流传递到可写流，同时不做任何修改或处理。本文将介绍`PassThrough`流的作用、适用场景以及提供一个示例来演示如何使用它。

![Node.js PassThrough流](https://tiven.cn/static/img/nodejs-01-gv0ZongC.jpg)

<!-- more -->

## 一、什么是PassThrough流？

`PassThrough`流是Node.js中的一种双工流（duplex stream），既可以读取数据，又可以写入数据。然而，与其他流不同的是，`PassThrough`流不会对数据进行任何更改，只是简单地将从可读流传递来的数据传输到可写流。它通常在需要将数据从一个流传递到另一个流的情况下使用，而无需对数据进行额外的处理。

## 二、PassThrough流示例场景

1. 日志文件流处理：

假设我们正在构建一个应用程序，并需要同时将日志消息写入文件和输出到控制台。我们可以使用`PassThrough`流来创建一个中间层，将日志消息从应用程序写入流中，然后将其传递到文件流和控制台流，实现日志记录的同时不需要额外的数据处理。

```js
'use strict';

const fs = require('fs');
const { PassThrough } = require('stream');

// 创建一个 PassThrough 流作为中间层
const logStream = new PassThrough();

// 创建一个文件可写流，将日志写入到文件中
const fileStream = fs.createWriteStream('app.log');
logStream.pipe(fileStream);

// 将日志信息输出到控制台
logStream.on('data', (chunk) => {
  console.log('Log:', chunk.toString());
});

// 模拟写入日志
logStream.write('This is a log message.\n');
logStream.write('Another log message.\n');
logStream.end();
```

2. shell脚本执行日志，输出流合并：

这里以 `Egg.js` 服务为例，在内存中创建一个中间缓存 `PassThrough` 流，然后把 shell 脚本执行的 **stdout** 和 **stderr** 输出流写入到这个中间缓存中，最后将这个中间缓存流通过接口返回。演示代码如下：

```js
'use strict';

const Controller = require('egg').Controller;
const { createReadStream } = require('fs');
const { join } = require('path');
const { spawn } = require('child_process');
const { PassThrough } = require('stream');

class HomeController extends Controller {

  async testStream() {
    ctx.set('Content-Type', 'text/plain; charset=utf-8');

    const shPath = join(__dirname, './test.sh');
    const childProcess = spawn('sh', [ shPath ]);
    
    // 创建内存中的可读写流
    const memoryStream = new PassThrough();

    // 将子进程的 stdout 输出流写入内存流
    childProcess.stdout.pipe(memoryStream);

    // 将子进程的 stderr 输出流写入内存流
    childProcess.stderr.pipe(memoryStream);
    
    ctx.body = memoryStream;
  }

}

module.exports = HomeController;
```

## 三、总结

`PassThrough` 流是Node.js中流模块的有用组成部分，它在数据流传递过程中起到中间层的作用。通过在适当的场景中使用 `PassThrough` 流，我们可以轻松地将数据从一个流传递到另一个流，同时保持数据的原样性。无论是日志记录还是其他类似的数据传递需求，`PassThrough` 流都可以为我们提供一种简单而有效的解决方案。


---

欢迎访问：[天问博客](https://tiven.cn/p/7286ed85/ "天问博客-专注于大前端技术")

