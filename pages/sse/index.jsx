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
    sse.current = new EventSource('/api/sse', { withCredentials: true })

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
      let { lastEventId, data, type } = event
      console.log({ lastEventId, data, type })
      that.list.push({ lastEventId, data })
    }

    sse.current.addEventListener('update', function (event) {
      // console.log('onupdate:')
      let { lastEventId, data, type } = event
      console.log({ lastEventId, data, type })
    })

    sse.current.addEventListener('hi', function (event) {
      // console.log('onhi:')
      let { lastEventId, data, type } = event
      console.log({ lastEventId, data, type })
    })

    sse.current.addEventListener('end', function (event) {
      // console.log('onhi:')
      let { lastEventId, data, type } = event
      console.log({ lastEventId, data, type })
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
      <Space size="middle" style={{ display: 'flex' }}>
        <Button onClick={close} danger>
          断开连接
        </Button>
        <Button onClick={connect} type="primary">
          建立连接
        </Button>
      </Space>
      <br />
      <List
        header={
          <div className="flex justify-between">
            通信结果 1
            <Button size="small" onClick={clear}>
              清空
            </Button>
          </div>
        }
        footer={null}
        bordered
        style={{ width: '100%' }}
        dataSource={that.list}
        renderItem={({ lastEventId, data }) => (
          <List.Item>
            <Typography.Text mark>[{lastEventId || 0}]</Typography.Text> {data}
          </List.Item>
        )}
      />
    </div>
  )
}
