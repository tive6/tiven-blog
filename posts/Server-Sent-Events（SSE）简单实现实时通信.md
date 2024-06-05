---
title: Server-Sent Events（SSE）简单实现实时通信
tags:
  - Node
  - SSE
  - WS
categories:
  - JavaScript
abbrlink: 68de9f15
date: 2024-01-18 15:52:35
---

`Server-Sent Events`（**SSE**）是一种基于HTTP的实时通信协议，它允许服务器向客户端推送信息。相比于传统的轮询方式，SSE 提供了更加轻量级和实时的通信机制。在本文中，我们将深入浅出地介绍如何简单实现 `Server-Sent Events`，以便在你的应用程序中实现实时通信。

![SSE 实时通信](https://tiven.cn/static/img/sse-01-38c8jweI.jpg)

[//]: # (<!-- more -->)

## 一、什么是 Server-Sent Events？

`Server-Sent Events` 允许服务器单向的向客户端发送事件流。这些事件流以纯文本形式传输，使用简单的文本格式，如`data: message\n\n`。客户端通过监听这些事件流，可以在接收到新事件时执行相应的操作。SSE 的一大优势在于它建立在标准的 HTTP 协议之上，不需要额外的握手和连接管理。

### SSE 特点

1. **简单性**：SSE构建在HTTP协议之上，这意味着您无需引入额外的库或协议就可以开始使用。对于那些希望保持代码库干净并避免复杂性的开发人员来说，这是一个巨大的优势。
2. **单向通信**：SSE是一种单向通信协议，意味着数据只能从服务器流向客户端。这种单向性适用于各种情况，例如实时新闻更新、股票价格变动等，这些场景中，只有服务器需要推送数据。
3. **自动重连**：SSE连接在意外断开时会自动尝试重新连接。这种机制确保了在网络故障或连接中断后能够及时恢复通信，为用户提供连续的数据流。
4. **事件流**：SSE使用"事件流"（event stream）将数据从服务器发送到客户端。每个事件都可以包含一个事件标识符、事件类型和数据字段。客户端可以根据这些信息来解析和处理接收到的数据。

## 二、实现 Server-Sent Events

> 在线体验：[https://next-blog.tiven.cn/sse](https://next-blog.tiven.cn/sse)

要实现 Server-Sent Events，我们需要创建一个 HTTP 服务器，负责向客户端推送事件流。以下是一个使用 Node.js 和 Next.js 框架的简单示例：

```javascript
// pages/api/sse.js

import { nanoid } from 'nanoid'

export default function GET(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })
  // res.status(200).json({ text: 'Hello' })
  res.write(
      `data: ${JSON.stringify({
        id: 1,
        message: 'Hello, world!',
        timestamp: new Date().toISOString(),
      })}\n\nid: 1\n\n`
  )
  res.write(`event: update\ndata: bye-bye\n\nid: ${nanoid(6)}\n\n`)
  res.write('event: hi\ndata: hi\n\nid: 100\n\n')
  let n = 0
  let t = setInterval(() => {
    n++
    if (n > 5) {
      clearInterval(t)
      res.end('event: end\ndata: 结束通信。\n\nid: 9999\n\n')
    } else {
      let id = nanoid(6)
      let data = JSON.stringify({
        id,
        message: `hi，这是第 ${n} 条消息。`,
        timestamp: new Date().toISOString(),
      })
      res.write(`data: ${data}\n\nid: ${id}\n\n`)
    }
  }, 1000)
}
```

在这个示例中，我们创建了一个 `/events` 的路由，该路由返回 SSE 格式的数据。客户端可以通过访问 `/events` 路径来获取实时的事件流。服务器每隔一秒向客户端发送当前时间，你可以根据实际需求修改发送的数据。

## 三、在客户端使用 Server-Sent Events

客户端可以使用 JavaScript 中的 `EventSource` 对象来监听服务器发送的事件。以下是一个简单的 HTML 示例：

```jsx 
// pages/sse/index.jsx

import { useReactive } from 'ahooks'
import { Button, List, Space, Typography } from 'antd'
import { useRef } from 'react'

export const config = {
  maxDuration: 30,
}

export default function Page() {
  const sse = useRef()
  const that = useReactive({
    list: [],
  })

  function connect() {
    init()
  }

  function close() {
    sse.current?.close()
  }

  function init() {
    sse.current = new EventSource('/api/sse', {withCredentials: true})

    // 连接一旦建立，就会触发open事件，可以在onopen属性定义回调函数。
    sse.current.onopen = function (event) {
      // console.log(event)
      // console.log(sse.current.CONNECTING)
      // console.log(sse.current.OPEN)
      // console.log(event.lastEventId)
    }

    // 客户端收到服务器发来的数据，就会触发message事件，
    // 可以在onmessage属性的回调函数。
    sse.current.onmessage = function (event) {
      // console.log('onmessage:')
      let {lastEventId, data, type} = event
      console.log({lastEventId, data, type})
      that.list.push({lastEventId, data})
    }

    sse.current.addEventListener('update', function (event) {
      // console.log('onupdate:')
      let {lastEventId, data, type} = event
      console.log({lastEventId, data, type})
    })

    sse.current.addEventListener('hi', function (event) {
      // console.log('onhi:')
      let {lastEventId, data, type} = event
      console.log({lastEventId, data, type})
    })

    sse.current.addEventListener('end', function (event) {
      // console.log('onhi:')
      let {lastEventId, data, type} = event
      console.log({lastEventId, data, type})
      close()
    })

    // 如果发生通信错误（比如连接中断），就会触发error事件，
    // 可以在onerror属性定义回调函数。
    sse.current.onerror = function (event) {
      // handle error event
    }
  }

  function clear() {
    that.list = []
  }

  return (
      <div className="w-100% flex flex-col justify-center items-center">
        <Space size="middle" style={{display: 'flex'}}>
          <Button onClick={close} danger>
            断开连接
          </Button>
          <Button onClick={connect} type="primary">
            建立连接
          </Button>
        </Space>
        <br/>
        <List
            header={
              <div className="flex justify-between">
                通信结果
                <Button size="small" onClick={clear}>
                  清空
                </Button>
              </div>
            }
            footer={null}
            bordered
            style={{width: '100%'}}
            dataSource={that.list}
            renderItem={({lastEventId, data}) => (
                <List.Item>
                  <Typography.Text mark>[{lastEventId || 0}]</Typography.Text> {data}
                </List.Item>
            )}
        />
      </div>
  )
}
```

在这个示例中，我们使用 `EventSource` 对象连接到 `/events` 路径，然后监听 `message` 事件来处理服务器发送的数据。当连接关闭时，我们还监听了 `error` 事件以处理连接关闭的情况。
通过这样的简单实现，你可以在应用程序中实现实时通信，为用户提供更加即时和动态的体验。 Server-Sent Events 是一个强大而简单的工具，适用于多种场景，如实时聊天、通知推送等。

参考文档：

- [https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)
- [https://mp.weixin.qq.com/s/7oaRLZD9p343bZLRynCcKA](https://mp.weixin.qq.com/s/7oaRLZD9p343bZLRynCcKA)
- [https://zh.javascript.info/server-sent-events#wan-zheng-shi-li](https://zh.javascript.info/server-sent-events#wan-zheng-shi-li)
- [https://mp.weixin.qq.com/s/7oaRLZD9p343bZLRynCcKA](https://mp.weixin.qq.com/s/7oaRLZD9p343bZLRynCcKA)

---

欢迎访问：[天问博客](https://tiven.cn/p/68de9f15/ "天问博客-专注于大前端技术")

