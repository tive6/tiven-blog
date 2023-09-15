---
title: axios / fetch 实现 stream 流式请求
tags:
- Node
- JS
- Axios
categories:
- Node
abbrlink: 5056ee2b
date: 2023-08-11 16:53:18
---

axios 是一个支持node端和浏览器端的易用、简洁且高效的http库。本文主要介绍 axios / fetch 如何实现 stream 流式请求，注意这里需要区分 node 环境和浏览器环境。

![axios stream](https://tiven.cn/static/img/axios-stream-01-kcUzNdZO.jpg)

## 一、node端

代码演示：

```js
const axios = require('axios');

axios({
  method: 'get',
  url: 'http://tiven.cn/static/img/axios-stream-01-kcUzNdZO.jpg',
  responseType: 'stream'
})
.then(response => {
  
  response.data.on('data', (chunk) => {
    // 处理流数据的逻辑
  });

  response.data.on('end', () => {
    // 数据接收完成的逻辑
  });

}); 
```

## 二、浏览器端

在浏览器端，axios 是使用 **XMLHttpRequest** 对象来实现请求，设置 `responseType: 'stream'` 后会出现以下警告⚠️：
`The provided value 'stream' is not a valid enum value of type XMLHttpRequestResponseType.`
所以，在浏览器端，我们需要使用浏览器内置API `fetch` 来实现 **stream** 流式请求。

代码演示：

```js
async function getStream() {
  try {
    let response = await fetch('/api/admin/common/testStream');
    console.log(response);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const reader = response.body.getReader();
    const textDecoder = new TextDecoder();
    let result = true;
    let output = ''

    while (result) {
      const { done, value } = await reader.read();

      if (done) {
        console.log('Stream ended');
        result = false;
        break;
      }

      const chunkText = textDecoder.decode(value);
      output += chunkText;
      console.log('Received chunk:', chunkText);
    }
  } catch (e) {
    console.log(e);
  }
}
```


---

欢迎访问：[天问博客](https://tiven.cn/p/5056ee2b/ "天问博客-专注于大前端技术")

