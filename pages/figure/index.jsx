import {
  Button,
  ColorPicker,
  Divider,
  Form,
  Image,
  Input,
  Select,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'

import {
  defaultData,
  fontSizeList,
  presetList,
  typeList,
} from '@/common/constants'

const formItemLayout = {
  style: { width: 120, marginBottom: 10 },
}

const publicPath = '/api/g'
const defaultPath = '/api/g/800/450'
const ColorCom = ({ value, onChange }) => (
  <ColorPicker
    className="w-200px flex justify-start"
    showText
    defaultFormat="hex"
    format="hex"
    value={value}
    onChange={onChange}
    styles={{
      popupOverlayInner: {
        width: 468 + 24,
      },
    }}
    presets={presetList}
    panelRender={(_, { components: { Picker, Presets } }) => (
      <div
        className="custom-panel"
        style={{
          display: 'flex',
          width: 468,
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <Presets />
        </div>
        <Divider
          type="vertical"
          style={{
            height: 'auto',
          }}
        />
        <div
          style={{
            width: 234,
          }}
        >
          <Picker />
        </div>
      </div>
    )}
  />
)

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
    text = text?.trim() ? text.trim() : `${width} x ${height}`
    query.append('text', encodeURIComponent(text))
    let p = query.toString()
    // console.log(p)
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
    <div className="flex flex-col justify-center">
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
        className="overflow-hidden"
        labelCol={formItemLayout}
        wrapperCol={{ style: { width: 200 } }}
        layout="inline"
        form={form}
        initialValues={{ ...defaultData }}
        style={{ maxWidth: '100%' }}
        onValuesChange={onFormChange}
      >
        <div className="w-100% flex justify-evenly">
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
        <div className="w-100% flex justify-evenly">
          <Form.Item label="size" name="size" tooltip="文本大小">
            <Select options={fontSizeList} placeholder="请选择" />
            {/*<Input type="number" placeholder="请输入" />*/}
          </Form.Item>
          <Form.Item label="type" name="type" tooltip="占位图类型">
            <Select options={typeList} placeholder="请选择" />
          </Form.Item>
        </div>
        <div className="w-100% flex justify-evenly">
          <Form.Item label="bg" name="bg" tooltip="背景色">
            {/*<ColorPicker showText defaultFormat="hex" format="hex" />*/}
            <ColorCom />
          </Form.Item>
          <Form.Item label="color" name="color" tooltip="文本颜色">
            {/*<ColorPicker showText defaultFormat="hex" format="hex" />*/}
            <ColorCom />
          </Form.Item>
        </div>
        <Form.Item
          wrapperCol={{ style: { width: 541 } }}
          label="text"
          name="text"
          tooltip="自定义文本内容"
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
      <div
        style={{ padding: '0 30%', justifyContent: 'space-between' }}
        className="flex items-center"
      >
        <Button type="primary" onClick={download}>
          下载
        </Button>
        <Button type="link" target="_blank" href={imgSrc}>
          单独打开
        </Button>
        <Typography.Paragraph
          copyable={{
            text: `${process.env.BASE_ORIGIN}${imgSrc}`,
            tooltips: ['点击复制', '复制成功 ~(^o^)~'],
          }}
          className="!mb-0px"
        >
          复制URL
        </Typography.Paragraph>
      </div>
    </div>
  )
}
