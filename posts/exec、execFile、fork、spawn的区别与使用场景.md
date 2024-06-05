---
title: exec、execFile、fork、spawn的区别与使用场景
tags:
- Node
- shell
categories:
- Node
abbrlink: e430c734
date: 2023-08-17 18:14:08
---

在Node.js中，通过子进程可以实现并行执行任务，处理复杂的操作，以及与外部命令或文件进行交互。Node.js提供了多种子进程创建方法，包括`exec`、`execFile`、`fork`和`spawn`。本文将对这些方法进行比较，并介绍它们的适用场景和示例。

![Node.js child_process](https://tiven.cn/static/img/nodejs-01-gv0ZongC.jpg)

<!-- more -->

## 一、方法概览

以下是`exec`、`execFile`、`fork`和`spawn`方法的简要概述：

- **exec:**
    - 执行 shell 命令
    - 创建新的 shell 进程
    - 获取命令的输出和错误信息

- **execFile:**
    - 执行指定的可执行文件
    - 不通过 shell 执行命令
    - 获取命令的输出和错误信息

- **fork:**
    - 衍生新的 Node.js 子进程
    - 执行 JavaScript 文件
    - 支持父子进程间通过消息进行通信

- **spawn:**
    - 执行命令
    - 不创建 shell 进程
    - 支持流式处理输入输出


## 二、exec、execFile、fork、spawn使用场景

1. **exec**

适用场景：执行简单的 shell 命令，获取命令的输出和错误信息。

```javascript
const { exec } = require('child_process');

exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(`Command output: ${stdout}`);
});
```

2. **execFile**

适用场景：执行可执行文件，获取输出和错误信息。

```javascript
const { execFile } = require('child_process');

execFile('myapp.exe', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(`App output: ${stdout}`);
});
```

3. **fork**

适用场景：并行执行 JavaScript 文件，父子进程间通过消息通信。

```javascript
const { fork } = require('child_process');

const child = fork('child.js');

child.on('message', message => {
  console.log(`Parent received message: ${message}`);
});

child.send('Hello from parent!');
```

4. **spawn**

适用场景：执行复杂命令，进行流式处理输入输出。

```javascript
const { spawn } = require('child_process');

const child = spawn('ls', ['-l']);

child.stdout.on('data', data => {
  console.log(`Command output: ${data}`);
});

child.on('close', code => {
  console.log(`Command exited with code ${code}`);
});
```

## 三、总结

选择合适的子进程创建方法取决于你的需求。如果你只需执行简单的 shell 命令，使用exec。对于可执行文件，使用execFile。如果需要并行执行 JavaScript 文件且支持消息通信，使用fork。而spawn适用于执行复杂命令并进行流式处理。根据不同的情况，选择最合适的方法可以提高代码的效率和可读性。
无论是简单命令还是复杂操作，Node.js的子进程创建方法都能为你提供强大的工具来处理并行任务和外部交互。

|方法|	区别|	适用场景|
|:---|:---|:---|
|exec|	执行 shell 命令，创建 shell 进程|	执行简单命令，获取输出和错误信息|
|execFile|	执行可执行文件，不创建 shell 进程|	执行编译好的二进制文件，获取输出和错误信息|
|fork|	衍生 Node.js 子进程，执行 JS 文件|	创建独立的子进程并与父进程通过消息通信|
|spawn|	执行命令，不创建 shell 进程|	执行复杂命令，流式处理输入输出|

参考文档：https://nodejs.org/dist/latest-v20.x/docs/api/child_process.html

---

欢迎访问：[天问博客](https://tiven.cn/p/e430c734/ "天问博客-专注于大前端技术")

