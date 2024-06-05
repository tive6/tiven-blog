---
title: React富文本内容展示
tags:
- Node
- React
categories:
- React
abbrlink: a8658279
date: 2023-03-08 09:55:40
---

如果要使用 **React** 开发一个简单编辑器或展示一个包含 html 元素的富文本内容时，就需要用到 `dangerouslySetInnerHTML` 这个属性，很类似 **Vue** 中的 `v-html` 。 

![dangerouslySetInnerHTML](https://tiven.cn/static/img/img-react-01-awodTve6vGeownJ6xi27U.jpg)

<!-- more -->

## dangerouslySetInnerHTML 用法

```typescript jsx
const Component = ({ content }) => {
  return (
    <div
      className="content-box"
      contentEditable="true"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  )
}
```

* `contentEditable="true"` 的作用是可以让 div 想 textarea 一样可编辑，基本上所有富文本编辑器都会使用这一属性。

注意：使用 **dangerouslySetInnerHTML** 插入 **HTML** 可能会导致网站被 XSS 攻击，为了安全最好是把传入的 content 过滤一下，去除其中的 **script** 相关内容。


---

欢迎访问：[天问博客](https://tiven.cn/p/a8658279/ "天问博客-专注于大前端技术")

