---
title: path.join 与 path.resolve 的区别
tags:
- Node
- path
categories:
- Node
abbrlink: a741a18c
date: 2023-08-24 16:21:13
---

在Node.js中，处理文件路径是一项常见的任务，而Node.js的path模块为我们提供了许多有用的函数来操作和处理文件路径。其中，**path.join** 和 **path.resolve** 是两个经常被使用的函数，它们在处理文件路径时有着不同的用途和特点。本文将重点探讨这两个函数的区别、使用场景以及它们之间的相同点和不同点。

![node.js join & resolve](https://tiven.cn/static/img/img-node-01-0jAmqdcq1GY_D-X3hBWm3.jpg)

<!-- more -->

## 一、path.join

**path.join** 函数用于将各个路径片段拼接成一个完整的路径。这些路径片段可以是字符串，也可以是路径数组。该函数会根据操作系统的规则，自动处理路径分隔符，确保生成的路径是正确的。这在构建相对路径时非常有用，因为它会考虑不同操作系统之间的差异。

```js
// /Users/tiven/dev/index.js

const path = require('path');

console.log('当前文件所在的路径：', __dirname); // 输出:  /Users/tiven/dev

const result = path.join('user', 'documents', 'file.txt');
console.log(result); // 输出: user/documents/file.txt

const result2 = path.join('/user', 'documents', 'file.txt');
console.log(result2); // 输出: /user/documents/file.txt
```

## 二、path.resolve

**path.resolve** 函数用于解析路径，生成绝对路径。它会从右到左地处理传递给它的参数，直到生成一个绝对路径为止。这在确定文件在文件系统中的确切位置时非常有用。

```js
// /Users/tiven/dev/index.js

const path = require('path');

console.log('当前文件所在的路径：', __dirname); // 输出: /Users/tiven/dev

const result = path.resolve('user', 'documents', '../files', 'file.txt');
console.log(result); // 输出: /Users/tiven/dev/user/files/file.txt

const result2 = path.resolve('/user', 'documents', '../files', 'file.txt');
console.log(result2); // 输出: /user/files/file.txt
```

注意：**resolve** 第一个路径参数如果是以 `/` 开始，则和 **join** 的效果是一样的。否则会将当前文件路径（`__dirname`）插入作为第一个参数，然后再进行拼接，返回一个绝对路径。效果如 `result` 和 `result2` 所示。

## 三、相同点

1. 路径拼接： 无论是 `path.join` 还是 `path.resolve` ，它们都用于处理路径。它们的主要目标是将路径片段组合在一起，形成一个有效的路径。
2. 可跨平台： 两个函数都会根据操作系统的规则自动处理路径分隔符，因此在不同操作系统上都能正常工作。

## 四、不同点

1. 路径生成： 最明显的区别是路径生成的方式。path.join生成一个相对路径，而path.resolve生成一个绝对路径。
2. 参数处理： path.join接受多个参数，将它们按顺序拼接起来形成路径，而path.resolve也接受多个参数，但是会从右到左处理，直到生成绝对路径。
3. 基准路径： path.resolve函数的第一个参数被视为基准路径，其余参数将根据该基准路径解析。而path.join没有基准路径的概念，只是简单地将所有参数拼接在一起。
4. 用途： path.join通常用于构建相对路径，而path.resolve用于确定文件的确切位置，通常用于生成绝对路径。

## 五、总结

`path.join` 和 `path.resolve` 都是Node.js中用于处理文件路径的重要函数。它们在路径生成方式、参数处理、基准路径和用途等方面有一些明显的区别。选择使用哪个函数取决于你正在处理的任务，是构建相对路径还是生成绝对路径。通过理解它们的特点和用途，你可以更好地在Node.js应用程序中操作和处理文件路径。
在实际工作中，基本都会把 `__dirname` 作为第一个参数传入 `path.join` 或 `path.resolve` 函数，这样可以保证生成的路径是绝对路径，并且 **join** 和 **resolve** 解析的结果是一致的。

---

欢迎访问：[天问博客](https://tiven.cn/p/a741a18c/ "天问博客-专注于大前端技术")

