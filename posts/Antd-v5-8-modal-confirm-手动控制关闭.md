---
title: Antd v5.8 modal.confirm 手动控制关闭
tags:
- React
- Antd
categories:
- React
abbrlink: b91bb773
date: 2023-09-04 17:17:24
---

开发中经常需要使用操作提示弹窗，在 Antd 中的 Modal 组件提供了 confirm 方法，可以快速实现操作提示弹窗。本文就来介绍一下如何使用 Modal.useModal  创建弹窗，并且实现手动控制弹窗的关闭逻辑。

![Antd Modal.confirm](https://tiven.cn/static/img/antd-02-m9UWgvZL.jpg)

[//]: # (<!-- more -->)

## 一、代码演示

```jsx
import { message, Modal } from 'antd'
import { forwardRef, useImperativeHandle } from 'react'
import { delQue } from '@/api/question.js'
import { useQuestionStore, QuestionGetters } from '@/store/question.js'

const Com = ({ getList }, ref) => {
  useImperativeHandle(ref, () => ({
    showModal,
  }))
  const [modal, contextHolder] = Modal.useModal()
  const { setColl, changeTime } = useQuestionStore()

  const submit = async ({ id, key }, e) => {
    try {
      let { code, msg, records } = await delQue({
        collId: id,
        resourceType: key,
      })
      if (code === 0) {
        message.success('删除成功')
        let coll = QuestionGetters('coll')
        if (`${id}` === coll.id + '') {
          setColl({
            type: coll.type,
            id: '',
          })
          changeTime({
            coll: Date.now(),
          })
        } else {
          getList()
        }
        /* 关键步骤 2 */
        await e()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const showModal = async (data) => {
    let { collName } = data
    const confirmed = await modal.confirm({
      title: '确认删除问题集？',
      content: <div>此问题集中所有资源都将被删除，确认删除"{collName}"？</div>,
      onCancel() {
        console.log('cancled')
      },
      /* 关键步骤 1 */
      onOk(e) {
        submit(data, e)
      },
    })
    console.log('Confirmed: ', confirmed)
  }

  return <>{contextHolder}</>
}

export default forwardRef(Com)
```

## 二、代码解读

**onOk** 事件: 点击确定回调，参数为关闭函数，返回 **promise** 时 **resolve** 后自动关闭。这个参数很关键，我们可以通过这个参数来手动控制弹窗的关闭。

详见：
**关键步骤 1**：传出去的 onOk 事件，调用 submit 方法，传入 data 和 e，e 即为关闭函数，调用 e 即可关闭弹窗。
**关键步骤 2**：在 submit 方法中，根据接口请求结果，`code===0` 成功，则调用 e 即可关闭弹窗；否则不关闭弹窗。

---

欢迎访问：[天问博客](https://tiven.cn/p/b91bb773/ "天问博客-专注于大前端技术")

