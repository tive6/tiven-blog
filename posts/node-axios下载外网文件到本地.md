---
title: node+axios下载外网文件到本地
abbrlink: 9b735250
date: 2021-10-12 16:36:07
tags:
- Node
- Download
- Axios
categories:
- Node
---

作为一个`web前端`开发，对`axios`肯定不陌生，但是在前端开发中，一般是使用`axios`来请求后端接口，获取数据。而使用`node`+`axios`下载网络文件到本地磁盘可能很少接触，搜索了很多相关的博客文章，讲解的好像都不够清晰明了，所以本文就记录一下实践方法。

![Node+Axios下载图片](https://tiven.cn/static/img/img-post-08-c1kr9HQ13lTEmcyI_mowX.jpg)

<!-- more -->

## 初始化项目

```sh
npm init -y
```

## 安装`axios`

```sh
npm i -S axios
```

## 实现逻辑

* 根目录下新建`app.js`

```js
// app.js
const axios = require('axios');
const fs = require('fs');

async function loadImg(imgUrl) {
  let { data } = await axios({
    url: imgUrl,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'arraybuffer',
  })
  await fs.promises.writeFile(`./01.jpg`, data, 'binary');
}

;(async function () {
  let url = 'https://tiven.cn/static/img/img-post-08-c1kr9HQ13lTEmcyI_mowX.jpg'
  console.time('download time：')
  try {
    await loadImg(url)
    console.log('下载成功')
  } catch (err) {
    console.log(err)
  }
  console.log('')
  console.timeEnd('download time：')
})();
```

**说明：**
* `axios` 的参数 `headers` 中 `Content-Type`默认是`application/json`，需要设置为 `multipart/form-data`；
* `responseType`默认是`json`，需要设置为`arraybuffer`（二进制格式）；
* `writeFile`方法的第三个参数`encoding`默认是`utf8`，必须设置为`binary`（二进制格式），如果不设置，下载的文件打不开。
* `console.time`和`console.timeEnd`是node中提供的计时方法。

## 执行

```sh
node app.js
```

* 输出

```text
下载成功
download time：107.866ms
```

如果想要批量爬取某个网站的图片或其他文件，可以使用`node`爬虫工具`cheerio`来实现。

参考文档：
* http://nodejs.cn/api/fs.html#fs_fs_writefile_file_data_options_callback
* http://www.axios-js.com/docs/#Request-Config

---

## 相关文章

* [node+axios实现服务端文件上传](https://tiven.cn/p/c25ecc37/ "node+axios实现服务端文件上传 | 天问博客")
* [node+axios下载外网文件到本地](https://tiven.cn/p/9b735250/ "node+axios下载外网文件到本地 | 天问博客")
* [nodejs+axios爬取html出现中文乱码](https://tiven.cn/p/f29b2a0e/ "nodejs+axios爬取html出现中文乱码 | 天问博客")
* [Blob与File、DataURL、canvas的相互转换](https://tiven.cn/p/289c2beb/ "Blob与File、DataURL、canvas的相互转换 | 天问博客")
* [JS中ArrayBuffer、Uint8Array、Blob与文本字符之间的相互转换](https://tiven.cn/p/cfd370d0/ "JS中ArrayBuffer、Uint8Array、Blob与文本字符之间的相互转换 | 天问博客")

---

欢迎访问：[个人博客地址](https://tiven.cn/p/9b735250/ "天問博客")
