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
  // res.end('event: hi\ndata: hi\n\nid: 300\n\n')
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
  }, 2000)
}
