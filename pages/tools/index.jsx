import { RedoOutlined } from '@ant-design/icons'
import { useReactive } from 'ahooks'
import { Button, Card, Input, Space } from 'antd'
import { useEffect } from 'react'

import { genMd5, genUUID } from '@/common/utils'

const Page = () => {
  const data = useReactive({
    uuid: '',
    md5: '',
  })

  function getUUID() {
    data.uuid = genUUID()
  }

  async function getMd5() {
    data.md5 = await genMd5()
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
      </Space>
    </>
  )
}

export default Page
