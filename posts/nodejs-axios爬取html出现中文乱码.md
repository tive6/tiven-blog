---
title: nodejs+axios爬取html出现中文乱码
tags:
- Node
- Axios
- Html
categories:
- Node
abbrlink: f29b2a0e
date: 2022-06-10 17:47:17
---

当使用 `nodejs` + `axios` 来爬取某个 `url` 对应的 `html` 时，出现中文乱码。

![Node + Axios + Cheerio](https://tiven.cn/static/img/img-cheerio-01-MT5PpBQsl_YI16xUf1ijA.jpg)

<!-- more -->

## 一、乱码原因

在 HTML 页面的 `head` 中没有设置 `<meta charset="UTF-8">` ，而 html 页面默认是 `GBK` 的编码。
使用 `axios` 发送请求 `responseEncoding` 默认是 `utf8`，造成编码不一致，导致最后获取到的 html 内容出现中文乱码。

## 二、解决办法

以`二进制流`的形式获取 HTML 内容，再对内容进行 `GBK` 编码解析。具体步骤如下：

1. 设置 `axios` 请求时的 `responseType` 为 `arraybuffer`；
2. 使用 `TextDecoder` 对象提供的方法对`二进制流`进行编码解析。

* eg：

```js
async function getHtml() {
  let res = await axios({
    url: "http://www.xxx.com",
    headers: {
      // ...
    },
    responseType: "arraybuffer", // 关键步骤
    responseEncoding: "utf8",
  });
  let { data } = res
  let utf8decoder = new TextDecoder("GBK"); // 关键步骤
  let html = utf8decoder.decode(data);
  console.log(html)
}
```

这样就能完美解决中文乱码的情况了。如果 HTML 设置的其他类型编码，只需要在 `new TextDecoder()` 实例化参数传入对应的编码即可。

**API解读：** `TextDecoder` 接口表示一个文本解码器，一个解码器只支持一种特定文本编码，例如: **utf-8、iso-8859-2、koi8、cp1261，gbk** 等等。解码器将字节流作为输入，并提供代码点流作为输出。

---

## 相关文章

* [node+axios实现服务端文件上传](https://tiven.cn/p/c25ecc37/ "node+axios实现服务端文件上传 | 天问博客")
* [node+axios下载外网文件到本地](https://tiven.cn/p/9b735250/ "node+axios下载外网文件到本地 | 天问博客")
* [nodejs+axios爬取html出现中文乱码](https://tiven.cn/p/f29b2a0e/ "nodejs+axios爬取html出现中文乱码 | 天问博客")
* [Blob与File、DataURL、canvas的相互转换](https://tiven.cn/p/289c2beb/ "Blob与File、DataURL、canvas的相互转换 | 天问博客")
* [JS中ArrayBuffer、Uint8Array、Blob与文本字符之间的相互转换](https://tiven.cn/p/cfd370d0/ "JS中ArrayBuffer、Uint8Array、Blob与文本字符之间的相互转换 | 天问博客")

---

欢迎访问：[天问博客](https://tiven.cn/p/f29b2a0e/ "天问博客")

