import { InboxOutlined } from '@ant-design/icons'
import { Button, Form, Input, Upload } from 'antd'
import axios from 'axios'
import { useRef } from 'react'

import { downloadFile } from '@/common/utils'

const formItemLayout = {
  style: {
    width: 60,
    // marginBottom: 10
  },
}

export default function Page() {
  const [form] = Form.useForm()
  const currentFile = useRef()

  const props = {
    name: 'file',
    multiple: false,
    className: 'bg-white w-full',
    maxCount: 1,
    accept: '.jpg,.jpeg,.png',
    onChange({ file, fileList }) {
      console.log(file)
      if (fileList.length) {
        let [f] = fileList
        currentFile.current = f.originFileObj
        form.setFieldsValue({
          filename: file.name,
        })
      } else {
        currentFile.current = null
        form.setFieldsValue({
          filename: '',
        })
      }
    },
    beforeUpload() {
      return false
    },
  }

  async function submit() {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
        transform(values)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async function transform(values) {
    let formData = new FormData()
    formData.append('file', currentFile.current)
    Object.entries(values).forEach(([k, v]) => {
      let val = v?.trim()
      if (val) {
        formData.append(k, val)
      }
    })
    try {
      let res = await axios({
        url: 'api/upload-to-resize',
        method: 'POST',
        data: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
        responseType: 'blob',
      })
      console.log(res)
      downloadFile(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="w-full px-16%">
      <Form
        className="overflow-hidden"
        labelCol={formItemLayout}
        form={form}
        initialValues={
          {
            //
          }
        }
        style={{ width: '100%' }}
      >
        <div className="w-100%">
          <Upload.Dragger {...props} style={{ background: 'white' }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              <a>点击</a>，或拖拽文件到此区域
            </p>
            <p className="ant-upload-hint">
              支持单文件，格式为：.jpg / .jpeg / .png
            </p>
          </Upload.Dragger>
        </div>
        <Form.Item
          label=""
          name="filename"
          style={{ width: '100%' }}
          rules={[{ required: true, message: '请选择文件' }]}
        >
          <Input type="hidden" />
        </Form.Item>

        <Form.Item label="width" name="width">
          <Input type="number" placeholder="请输入" />
        </Form.Item>
        <Form.Item label="height" name="height">
          <Input type="number" placeholder="请输入" />
        </Form.Item>
        <Form.Item label="prefix" name="prefix">
          <Input placeholder="文件名前缀" />
        </Form.Item>
        {/*<Form.Item label="type" name="type">*/}
        {/*  <Select options={typeList} placeholder="请选择" />*/}
        {/*</Form.Item>*/}
      </Form>
      <div className="flex justify-center items-center px-30%">
        <Button type="primary" onClick={submit}>
          转换
        </Button>
      </div>
    </div>
  )
}
