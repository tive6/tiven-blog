import { RedoOutlined } from '@ant-design/icons'
import { useReactive } from 'ahooks'
import { Button, Card, Divider, Input, Space } from 'antd'
import { useEffect } from 'react'

import { genMd5, genUUID } from '@/common/utils'

const Page = () => {
  const data = useReactive({
    uuid: '',
    md5: '',
    json: '',
    jsonStr: '',
  })

  function getUUID() {
    data.uuid = genUUID()
  }

  async function getMd5() {
    data.md5 = await genMd5()
  }

  function getJson(type) {
    console.log(type)
    try {
      if (type === 1) {
        let json = JSON.parse(JSON.parse(data.json))
        console.log(json)
        data.jsonStr = JSON.stringify(json, null, 4)
      }
    } catch (error) {
      data.jsonStr = '输入格式错误'
    }
  }

  useEffect(() => {
    getUUID()
    getMd5()
  }, [])

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card
          title="随机UUID"
          extra={
            <Button onClick={getUUID} type="primary" icon={<RedoOutlined />}>
              生成
            </Button>
          }
        >
          <Input.TextArea value={data.uuid}></Input.TextArea>
        </Card>
        <Card
          title="随机MD5"
          extra={
            <Button onClick={getMd5} type="primary" icon={<RedoOutlined />}>
              生成
            </Button>
          }
        >
          <Input.TextArea value={data.md5}></Input.TextArea>
        </Card>
        <Card
          title="JSON格式化"
          extra={
            <Space size="middle">
              <Button
                onClick={() => {
                  getJson(1)
                }}
                type="primary"
              >
                JSON格式化
              </Button>
            </Space>
          }
        >
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 10 }}
            onChange={(e) => {
              data.json = e.target.value
            }}
          ></Input.TextArea>
          <Divider>结果</Divider>
          <Input.TextArea
            value={data.jsonStr}
            autoSize={{ minRows: 2, maxRows: 20 }}
            style={{ color: '#3ab54a' }}
          ></Input.TextArea>
        </Card>
      </Space>
    </>
  )
}

export default Page
