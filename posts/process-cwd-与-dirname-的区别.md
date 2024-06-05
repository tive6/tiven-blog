---
title: process.cwd() 与 __dirname 的区别
tags:
- Node
categories:
- Node
abbrlink: 382d67a6
date: 2023-08-19 16:18:57
---

Node.js 中的 `__dirname` 和 `process.cwd()` 都是用于获取文件系统路径的全局变量和方法，但它们有不同的含义和用途。

![process.cwd() & __dirname](https://tiven.cn/static/img/img-node-01-0jAmqdcq1GY_D-X3hBWm3.jpg)

<!-- more -->

## 一、process.cwd()

- process.cwd() 是一个方法，用于获取 Node.js 进程的当前工作目录。
- 它返回的是 Node.js 进程启动时所在的工作目录的绝对路径。
- 这个路径通常是在启动 Node.js 应用程序时指定的，或者是在命令行中运行 Node.js 时的当前目录。

示例代码：

```js
// 输出 Node.js 进程的当前工作目录
console.log(process.cwd()); 
```

## 二、__dirname

- `__dirname` 是一个特殊的全局变量，用于获取当前模块的目录名。
- 它返回的是包含当前模块文件的目录的绝对路径。
- 这个路径是相对于当前模块文件的位置的，所以它的值在不同模块中可能不同。

示例代码：

```javascript
// 输出当前模块的目录路径
console.log(__dirname); 
```

## 三、不同情况下的差异

这两个变量在以下情况下可能会有不同的值：

- 在不同模块中：

如果你在不同的模块中使用这两个变量，它们的值可能会不同，因为 `__dirname` 是相对于当前模块文件的目录，而 process.cwd() 是整个 Node.js 进程的当前工作目录。

- 在不同进程中：

如果你的 Node.js 应用程序在不同的进程中运行，那么 `process.cwd()` 的值可能会不同，因为每个进程都有自己的工作目录。但是 __dirname 仍然是相对于当前模块的目录，因此在不同进程中可能是一致的。

- 在不同的工作目录下启动应用程序：

如果你在不同的工作目录下启动 Node.js 应用程序，那么 `process.cwd()` 的值将取决于启动应用程序时的工作目录。而 __dirname 仍然是相对于当前模块的目录，不受启动目录的影响。

#### 举例说明：

假设你的 Node.js 应用程序的目录结构如下：

```bash
app.js
scritps/
  - shell-01.js
  - shell-02.js
config/
  - config-01.js
  - config-02.js
package.json
.gitignore
.eslintrc.js
```

`package.json` 文件中的 **scripts** 字段配置如下：

```json
{
  "scripts": {
    "start": "node app.js",
    "shell-01": "node scripts/shell-01.js",
    "config-01": "node config/config-01.js"
  }
}
```

相同的情况：执行 `npm run start` 时，在 `app.js` 中使用 `__dirname` 和 `process.cwd()` 获取的结果是一样的。
不用的情况：执行 `npm run shell-01` 时，在 `shell-01.js` 中 使用 `__dirname` 和 `process.cwd()` 获取的结果是不一样的。`__dirname` 获取的是 shell-01.js 所在的目录，而 `process.cwd()` 是启动目录（`package.json` 所在的目录）。

## 四、总结

`__dirname` 是相对于当前模块的目录，而 `process.cwd()` 是整个应用程序的当前工作目录，因此它们的值可能在不同上下文和不同模块中有所不同。你应该根据你的需求选择合适的变量。如果需要模块特定的路径信息，使用 __dirname；如果需要整个应用程序的当前工作目录，使用 process.cwd()。

---

欢迎访问：[天问博客](https://tiven.cn/p/382d67a6/ "天问博客-专注于大前端技术")

