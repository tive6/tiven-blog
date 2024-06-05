---
title: 纯 JavaScript 生成UUID和随机MD5值
tags:
  - JS
  - UUID
  - MD5
categories:
  - JavaScript
abbrlink: bae1a0ee
date: 2023-12-26 15:07:46
---

在开发中，我们经常需要生成唯一的标识符或随机的哈希值。在这篇博客中，我将介绍如何使用纯 JavaScript 生成 **UUID**（通用唯一标识符）和随机 **MD5** 值的方法。这些方法适用于前端和后端开发，让我们一起深入浅出地了解吧。

![UUID & MD5](https://tiven.cn/static/img/md5-02-X-wDXbbv.jpg)

[//]: # (<!-- more -->)

## 前言

**UUID**：（通用唯一标识符），它是一个标准化的字符串标识符，长度为 36 个字符，包括 32 个十六进制数字和 4 个连字符（例如：`550e8400-e29b-41d4-a716-446655440000`）。请注意，UUID 并不是通过哈希算法生成的，而是根据特定的算法和规则生成的唯一标识符。

MD5、SHA-1、SHA-256、SHA-384 和 SHA-512 是常见的哈希算法，它们生成的哈希值长度如下：

| 哈希算法 | 长度     | 字节长度 | 字符串长度(十六进制字符) |
|---------|--------|--------|---------------|
| MD5     | 128 位  | 16 字节 | 32 个          |
| SHA-1    | 160 位  | 20 字节 | 40 个          |
| SHA-256  | 256 位  | 32 字节 | 64 个          |
| SHA-384  | 384 位  | 48 字节 | 96 个          |
| SHA-512  | 512 位  | 64 字节 | 128 个         |

在实际开发中，我们通常使用 MD5 算法生成哈希值，因为它的长度适中，而且速度快，安全性也足够高。

> 在线体验：[https://next-blog.tiven.cn/tools](https://next-blog.tiven.cn/tools)

## 一、生成UUID

UUID是一种唯一标识符，通常用于标识信息或对象。

1. 使用纯JavaScript生成UUID的方法：

```javascript
function genUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 示例用法
const uuid = genUUID();
console.log(uuid);
```

这个函数使用了UUID的标准格式，并通过替换操作生成了一个随机的UUID。你可以在项目中直接使用这个函数，确保生成的UUID是唯一的。

2. 使用最新浏览器内置的`crypto` API生成UUID，这个方法更简单更高效，方法如下：

```javascript
const genUUID = () => {
  return crypto.randomUUID()
}
```

3. 如果长度没有限制，我们可以使用`Math.random()`方法生成一个随机的字符串，方法如下：

```javascript
const genUUID = () => {
  return Math.random().toString(36).substring(2)
}
```

## 二、生成随机MD5值

**MD5** 是一种常用的哈希算法，我们可以使用它来生成唯一的散列值。

我们可以使用浏览器内置的`crypto` API生成随机MD5值，方法如下：

```js 
const md5 = async (str) => {
  const msgUint8 = new TextEncoder().encode(str) // 编码为（utf-8）Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8) // 计算消息的哈希值
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // 将缓冲区转换为字节数组
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // 将字节数组转换为十六进制字符串
  return hashHex
}

const generateRandomMD5 = async () => {
  return await md5(Math.random().toString(36))
}

// 示例用法
const randomMD5 = generateRandomMD5();
console.log(randomMD5); // f185173fa08df8360d12cbcd795c7cf59240996b
console.log(randomMD5.length); // 40
```

这样生成的随机字符串长度为 **40**，如果想要和真正的MD5值一样长度为 **32**，可以使用 `slice` 方法截取前 `32位`，方法如下：

```js
const md5 = async (str) => {
  const msgUint8 = new TextEncoder().encode(str) // 编码为（utf-8）Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8) // 计算消息的哈希值
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // 将缓冲区转换为字节数组
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // 将字节数组转换为十六进制字符串
  return hashHex.slice(0, 32) // 截取前32位
}
```

这两个方法可以方便地在你的项目中生成UUID和随机MD5值。记得根据项目需求选择合适的方法，确保生成的值足够唯一和安全。

参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto

---

欢迎访问：[天问博客](https://tiven.cn/p/bae1a0ee/ "天问博客-专注于大前端技术")

