---
title: JS中ArrayBuffer、Uint8Array、Blob与文本字符之间的相互转换
abbrlink: cfd370d0
date: 2022-04-13 15:45:59
tags:
- Blob
- ArrayBuffer
- JS
categories:
- JavaScript
---

**前端 `File` 上传、下载，`Canvas` 保存图片，`Ajax` 和 `Fetch` 二进制流传输，`PDF` 预览，浏览器上 `WebAssembly` 的应用** 等等都需要用到 **ArrayBuffer** 和 **Blob** 。文件就具体介绍一下这些对象的相互转换。

![Javascript 二进制对象](https://tiven.cn/static/img/kpl-xishi-fsYXTd5eRYwX4neruGVzX.jpg)

[//]: # (<!-- more -->)

## API介绍

1. `FileReader` 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 `File` 或 `Blob` 对象指定要读取的文件或数据。
2. `Blob` 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 `ReadableStream` 来用于数据操作。`Blob` 表示的不一定是 `JavaScript` 原生格式的数据。`File` 接口基于 `Blob`，继承了 `blob` 的功能并将其扩展使其支持用户系统上的文件。
3. `ArrayBuffer` 对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（`TypedArray` 视图和 `DataView` 视图)来读写，视图的作用是以指定格式解读二进制数据。
4. `Uint8Array` 对象是 `ArrayBuffer` 的一个数据类型（8 位不带符号整数）。
5. `TextEncoder` 接受代码点流作为输入，并提供 `UTF-8` 字节流作为输出。
6. `TextDecoder` 接口表示一个文本解码器，一个解码器只支持一种特定文本编码，例如 **utf-8、iso-8859-2、koi8、cp1261，gbk** 等等。解码器将字节流作为输入，并提供代码点流作为输出。

**注意：** 二进制数组并不是真正的数组，而是类似数组的对象。

## 字符与ArrayBuffer，Uint8Array相互转换

1. `TextEncoder` => `ArrayBuffer`

```js
let encoder = new TextEncoder();

// 字符 转 Uint8Array
let uint8Array = encoder.encode("你好啊");

// Uint8Array 转 ArrayBuffer
let arrayBuffer = uint8Array.buffer
```

2. `Blob` => `ArrayBuffer`

```js
let str = 'hello，你好吗？'
let blob = new Blob([str],{type:'text/plain;charset=utf-8'});
let utf8decoder = new TextDecoder()
blob.arrayBuffer().then(buffer=>{
  // ArrayBuffer
  console.log(buffer)
  let text = utf8decoder.decode(buffer)
  // String
  console.log(text)
})
```

3. `FileReader` => `ArrayBuffer`

```js
let str = 'hello，你好吗？'
let blob = new Blob([str],{type:'text/plain;charset=utf-8'});
let utf8decoder = new TextDecoder()
let fr = new FileReader()
fr.readAsArrayBuffer(blob)
fr.onload = function(res) {
  // ArrayBuffer
  let buffer = fr.result
  console.log(buffer)
  let text = utf8decoder.decode(buffer)
  // String
  console.log(text)
}
```

---

## 相关文章

* [node+axios实现服务端文件上传](https://tiven.cn/p/c25ecc37/ "node+axios实现服务端文件上传 | 天问博客")
* [node+axios下载外网文件到本地](https://tiven.cn/p/9b735250/ "node+axios下载外网文件到本地 | 天问博客")
* [nodejs+axios爬取html出现中文乱码](https://tiven.cn/p/f29b2a0e/ "nodejs+axios爬取html出现中文乱码 | 天问博客")
* [Blob与File、DataURL、canvas的相互转换](https://tiven.cn/p/289c2beb/ "Blob与File、DataURL、canvas的相互转换 | 天问博客")
* [JS中ArrayBuffer、Uint8Array、Blob与文本字符之间的相互转换](https://tiven.cn/p/cfd370d0/ "JS中ArrayBuffer、Uint8Array、Blob与文本字符之间的相互转换 | 天问博客")

---

欢迎访问：[天问博客](https://tiven.cn/p/cfd370d0/ "天问博客")
