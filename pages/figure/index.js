import { Button, ColorPicker, Image, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'

const defaultData = {
  width: 200,
  height: 200,
  bg: 'ccc',
  color: '666',
  text: '',
  size: 32,
  type: 'png',
}

const formItemLayout = {
  style: { width: 120, marginBottom: 10 },
}

const typeList = [
  {
    label: 'png',
    value: 'png',
  },
  {
    label: 'svg',
    value: 'svg',
  },
]

const publicPath = '/api/g'
const defaultPath = '/api/g/200/200'

export default function Page() {
  const [form] = Form.useForm()
  const [imgSrc, setImgSrc] = useState(defaultPath)
  const [queryURL, setQueryURL] = useState(null)

  function onFormChange() {
    let data = form.getFieldsValue()
    let { text, width, height } = data
    if (!(width && height)) return
    let query = new URLSearchParams()
    Object.entries(data).forEach(([key, value]) => {
      if (['bg', 'color'].includes(key) && value?.metaColor) {
        value = value.toHex()
      }
      query.append(key, value)
    })
    query.delete('text')
    if (text) {
      query.append('text', text)
    } else {
      query.append('text', `${width} x ${height}`)
    }
    let p = query.toString()
    console.log(p)
    setQueryURL(p)
    setImgSrc(`${publicPath}/${width}/${height}?${p}`)
  }

  async function download() {
    let query = new URLSearchParams(queryURL)
    let text = query.get('text')
    let type = query.get('type')
    let filename = `${text}.${type}`
    console.log(`filename：${filename}`)
    let link = document.createElement('a')
    link.href = imgSrc
    link.download = `${filename}`
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  useEffect(() => {
    onFormChange()
  }, [])

  return (
    <div className="w-400px mx-auto">
      <div
        className="max-w-100% mx-auto flex justify-center"
        style={{ paddingBottom: '20px', minHeight: '200px' }}
      >
        <Image
          style={{ margin: '0 auto', display: 'block', maxWidth: '100%' }}
          src={imgSrc}
          fallback={`${defaultPath}?text=参数有误&color=red`}
        />
      </div>
      <Form
        labelCol={formItemLayout}
        wrapperCol={{ style: { width: 200 } }}
        layout="inline"
        form={form}
        initialValues={{ ...defaultData }}
        style={{ maxWidth: '100%' }}
        onValuesChange={onFormChange}
      >
        <div className="flex justify-between">
          <Form.Item
            label="width"
            name="width"
            tooltip="占位图宽"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input type="number" placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="height"
            name="height"
            tooltip="占位图高"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input type="number" placeholder="请输入" />
          </Form.Item>
        </div>
        <Form.Item label="size" name="size" tooltip="文本大小">
          <Input type="number" placeholder="请输入" />
        </Form.Item>
        <Form.Item label="type" name="type" tooltip="占位图类型">
          <Select options={typeList} placeholder="请选择问题意图ID" />
        </Form.Item>
        <div className=" flex justify-between">
          <Form.Item label="bg" name="bg" tooltip="背景色" className="w-50%">
            <ColorPicker showText defaultFormat="hex" format="hex" />
          </Form.Item>
          <Form.Item label="color" name="color" tooltip="文本颜色">
            <ColorPicker showText defaultFormat="hex" format="hex" />
          </Form.Item>
        </div>
        <Form.Item
          wrapperCol={{ style: { width: 536 } }}
          label="text"
          name="text"
          tooltip="自定义文本内容"
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
      <div
        style={{ padding: '0 35%', justifyContent: 'space-between' }}
        className="flex items-center"
      >
        <Button type="primary" onClick={download}>
          下载
        </Button>
        <Button type="link" target="_blank" href={imgSrc}>
          单独打开
        </Button>
      </div>
    </div>
  )
}
