---
title: 'nodeJs + cheerio + axios 实现一个小爬虫'
date: '2020-01-01'
---

`cheerio` 是 **nodejs** 特别为服务端定制的，能够像 **jQuery** 去操作获取 **DOM** 。 有了 `cheerio` 加上 **axios** 就能很轻松实现一个网络小爬虫。

![nodeJs + cheerio + axios 爬虫](https://tiven.cn/static/img/img-cheerio-01-MT5PpBQsl_YI16xUf1ijA.jpg)


## 安装 cheerio 和 axios

* 初始化项目

```shell
npm init -y
```

* 安装 cheerio 和 axios

```shell
pnpm add -S cheerio 
pnpm add -S axios 
```

## 代码演示

使用 axios 获取 html 内容

```js
const axios = require('axios')
const cheerio = require('cheerio')

async function getHtml() {
  let res = await axios({
    url: "https://tiven.cn/",
    responseType: "text",
    responseEncoding: "utf8",
  });
  let { data: html } = res
  await parseHtml(html)
}

async function parseHtml(htmlStr) {
  $ = cheerio.load(htmlStr);
  let title = $('title').text()
  let description = $('meta[name=description]').attr('content')
  console.log(title)
  console.log(description)
}

getHtml()
```

示例代码中，使用 **cheerio** 解析获取到一个页面的 **title** 和 **description** 信息，当然你可以使用 **jQuery** 的形式获取页面其他所有你想获取的内容。

更多使用方法，请参考 **cheerio** 使用文档：https://github.com/cheeriojs/cheerio/wiki/Chinese-README

---

欢迎访问：[天问博客](https://tiven.cn/p/d6f27923/ "天问博客-专注于大前端技术")

