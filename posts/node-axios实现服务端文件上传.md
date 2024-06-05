---
title: node+axios实现服务端文件上传
abbrlink: c25ecc37
date: 2021-11-06 14:41:14
tags:
- Node
- Upload
- Axios
categories:
- Node
---

最近调研企业wx集成`H5应用`，其中有一个发送`图文消息`，需要上传图片到临时素材库。之前做过文件上传到阿里云、七牛云都是服务端提供封装好的文件上传接口，在客户端使用`ajax`的方式上传。所以就来踩踩坑，使用`node`+`axios`实现`服务端`文件上传。

![Node+Axios Upload](https://tiven.cn/static/img/hot-air-balloon-valley-sky-preview-mKefCnpDhTcuNLTI-2uxD.jpg)

<!-- more -->

## 一、接口文档介绍

    请求方式：POST（HTTPS）
    请求地址：https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE

* 使用`multipart/form-data` POST上传文件， 文件标识名为”media”。
* POST的请求包中，`form-data`中媒体文件标识，应包含有 filename、filelength、content-type等信息。
* 参数说明：

|参数|必须|说明|
|:--:|:--:|:--:|
|access_token|是|调用接口凭证|
|type|是|媒体文件类型，分别有图片（image）、语音（voice）、视频（video），普通文件（file）|

## 二、文件上传

### 2-1.初始化项目

```sh
# 创建目录
mkdir upload-demo

# 进入upload-demo目录
cd upload-demo

# npm 初始化
npm init -y

# 创建app.js
touch app.js
```

### 2-2.安装插件依赖

* `axios`：是一个基于 `promise` 的 `HTTP` 库，可以用在客户端浏览器和服务端`node.js` 中。
* `form-data`：是创建可读`multipart/form-data`流的库。可用于向其他 Web 应用程序提交表单和文件上传。

```sh
npm i -S axios form-data
```

### 2-3.上传核心代码

```js
// app.js
const fs = require('fs')
const FormData = require('form-data')
const axios = require('axios')

;(async ()=>{
    let formData = new FormData();
    let imgFiles = fs.createReadStream('./test.jpg')    // 根目录下需要有一个test.jpg文件
    formData.append('media', imgFiles);
    let len = await new Promise((resolve, reject) => {
      return formData.getLength((err, length) => (err ? reject(err) : resolve(length)));
    });
    axios({
        url: 'https://qyapi.weixin.qq.com/cgi-bin/media/upload',
        method: 'POST',
        params: {
            access_token: 'ACCESS_TOKEN',   // ACCESS_TOKEN 需要替换为真实 token
            type: 'image',   // 这里以上图片为例
        },
        data: formData,
        headers: {
          ...formData.getHeaders(), // 小心
          'Content-Length': len,    // 谨慎
        },
    }).then(res=>{
        console.log(res.data)
    })
})();
```

**注意：** `headers` 中需要设置 **Content-Type** 和 **Content-Length** ，不然会出现类似 `Request failed with status code 412` 、 `statusCode: 412, statusMessage: Precondition Failed` 这种报错。

**PS：**
HTTP `412` 错误 (`Precondition failed`)，是HTTP协议状态码的一种，表示"未满足前提条件"。如果服务器没有满足请求者在请求中设置的其中一个前提条件时就会返回此错误代码。
`412` 错误一般是由于要查看的网页设置了先决条件，一般是网页中有一个或多个请求标题字段中具有先决条件，这些字段经服务器测试后被认为是"FALSE"。客户端为当前资源的 **meta** 信息(头文件字段数据)设置了先决条件，以便防止请求的方法被用于指定资源外的其他资源,因此该请求无法完成而出现的错误。

### 2-4.执行脚本

```sh
node app.js
```

不出意外会输入以下内容：

```js
{
   "errcode": 0,
   "errmsg": ""，
   "type": "image",
   "media_id": "1G6nrLmr5EC3MMb_-zK1dDdzmd0p7cNliYu9V5w7o8K0",
   "created_at": "1380000000"
}
```

其中`media_id`就是上传到素材库的媒体文件唯一标识，发送图文消息时需要用到。

---

## 相关文章

* [node+axios实现服务端文件上传](https://tiven.cn/p/c25ecc37/ "node+axios实现服务端文件上传 | 天问博客")
* [node+axios下载外网文件到本地](https://tiven.cn/p/9b735250/ "node+axios下载外网文件到本地 | 天问博客")
* [nodejs+axios爬取html出现中文乱码](https://tiven.cn/p/f29b2a0e/ "nodejs+axios爬取html出现中文乱码 | 天问博客")
* [Blob与File、DataURL、canvas的相互转换](https://tiven.cn/p/289c2beb/ "Blob与File、DataURL、canvas的相互转换 | 天问博客")
* [JS中ArrayBuffer、Uint8Array、Blob与文本字符之间的相互转换](https://tiven.cn/p/cfd370d0/ "JS中ArrayBuffer、Uint8Array、Blob与文本字符之间的相互转换 | 天问博客")

---

欢迎访问：[天問博客](https://tiven.cn/p/c25ecc37/ "天問博客")
