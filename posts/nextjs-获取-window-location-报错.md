---
title: nextjs 获取 window.location 报错
tags:
  - Node
  - NextJS
categories:
  - React
abbrlink: b00207d4
date: 2023-11-12 14:42:15
---

使用 nextjs 开发项目时，如果需要获取 `window.location` 对象时，会报错：`ReferenceError: window is not defined`，如下图：

![(nextjs) window is not defined](https://tiven.cn/static/img/nextjs-01-noFVYR0e.jpg)

<!-- more -->

## 完整报错

```js
Server Error
ReferenceError: window is not defined

This error happened while generating the page. Any console logs will be displayed in the terminal window.
```

根据 `Server Error` 错误可知，是在服务端渲染时报错，因为服务端没有 `window` 对象，所以会报错。

## 解决方法

使用 `nextjs` 提供的 `useEffect` 钩子函数，可以在客户端渲染时获取 `window` 对象，如下：

```js
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    console.log(window.location.origin);
  }, []);

  return (
    <div>
      <h1>Index Page</h1>
    </div>
  );
};

export default Index;
```

---

欢迎访问：[天问博客](https://tiven.cn/p/b00207d4/ "天问博客-专注于大前端技术")

