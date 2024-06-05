---
title: zustand 搞定 react 中复杂状态管理
tags:
- React
- Zustand
categories:
- React
abbrlink: fb3cbc64
date: 2023-08-28 17:24:27
---

**Zustand** 是一个轻量级的、无依赖的状态库，适用于 **React** 和函数式编程。它提供了一个简单、灵活的方式来管理应用程序的状态。本文就讲讲如何使用 **zustand** 搞定 react 中复杂状态管理，进而替代 **redux** 。

![React + Zustand 状态管理](https://tiven.cn/static/img/react-02-u9c6CgVH.jpg)

<!-- more -->

## 一、前言

以 **redux** 为代表的这类单向数据流状态管理库，都是需要在最外层（**根组件**）包一个 **Provider** ， Context 中的值都在 Provider 的作用域下有效，这样才能做到数据状态共享。
**Zustand** 则另辟蹊径，默认不需要 **Provider**，就想 Vue 中 pinia 状态管理库一样，直接声明一个 hooks 式的 useStore 后就可以在不同组件中进行调用，并且保持它们的状态共享和响应式更新。

> Zustand 在德语中是 state 状态的意思


## 二、Zustand 基本使用

1. 定义 Store 数据

```js
// src/store/user.js

import { create } from 'zustand'

const initData = {
  userInfo: {},
  token: '',
}

export const useUserStore = create((set, get) => ({
  ...initData,
  setUserInfo: (userInfo) => set({ userInfo }),
  getUsername: () => {
    return get().userInfo?.username
  }
}))
```

2. 在组件中使用

```jsx
import {useUserStore} from '@/store/user.js'
import axios from "axios";

const Component = () => {
  const {token, setUserInfo, getUsername} = useUserStore()
  const userInfo = useUserStore((state)=>state.userInfo)

  const fetchUser = async () => {
    let state = useUserStore.getState()
    const { data } = await axios({
      url: '/xxx',
      headers: {
        'access-token': state.token,
      }
    })
    setUserInfo(data)
  }

  return (
      <div>
        用户：{getUsername()}
      </div>
  )
}

export default Component
```

**注意：** 

1. 在 react hook 组件中函数体内部使用全局的 state，需要使用 `getState()` 方法获取，否则获取的是初始化的 state 值。
2. zustand 的 state 是响应式的，所以可以直接在 jsx ui 中使用解构的 state 值 ，但是在非 jsx 中需要使用 `getState()` 方法获取最新状态。

## 三、Zustand 进阶用法

适用于跨组件数据共享、数据监听操作。

数据监听需要使用 subscribeWithSelector 包裹，否则不能细粒度监听。

```js
const unsub1 = useDogStore.subscribe(console.log)
```

1. 定义 Store 数据

```js
// src/store/dialog.js

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

const initData = {
  newDialogVisible: false,
  newFormData: null,
}

export const useDialogStore = create(
  subscribeWithSelector((set, get) => ({
    ...initData,
    changeNewDialog(visible, data = null) {
      set({ newDialogVisible: visible, newFormData: data })
    },
  }))
)
```

2. 设置数据

```jsx
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Form } from 'antd'
import { useDialogStore } from '@/store/dialog.js'

const Dialog = (props, ref) => {
  useImperativeHandle(ref, () => ({
    showModal,
  }))
  const [form] = Form.useForm()
  const { changeNewDialog } = useDialogStore()

  const showModal = (data) => {
    changeNewDialog(true, {})
  }

  return (
      <>
        <Button onClick={showModal} htmlType="submit">新建</Button>
      </>
  )
}

export default forwardRef(Dialog)
```

3. 监听数据变化

```js
import { Breadcrumb } from 'antd'
import Side from './components/Side.jsx'
import List from './components/List.jsx'
import NewDialog from './components/NewDialog.jsx'
import { useEffect, useRef } from 'react'
import { useDialogStore } from '@/store/dialog.js'
import { shallow } from 'zustand/shallow'

const Page = () => {
  const newDialogRef = useRef()
  useEffect(() => {
    // 监听数据变化
    const unsub = useDialogStore.subscribe(
      (state) => [state.newDialogVisible, state.newFormData],
      ([visible, data]) => {
        if (visible) {
          // console.log(visible, data)
          newDialogRef.current.showModal(data)
        }
      },
      { equalityFn: shallow } // 浅比较
    )
    return () => {
      // 取消订阅
      unsub()
    }
  }, [])
  return (
    <>
      <Breadcrumb
        items={[
          {
            title: '首页',
          },
          {
            title: <a href="/">列表</a>,
          },
        ]}
      />
      <div className="border-b-[1px] border-solid border-gray-300 ml-[-20px] mr-[-20px] mt-[15px]"></div>
      <div className="flex justify-between">
        <Side />
        <List />
      </div>
      <NewDialog ref={newDialogRef} />
    </>
  )
}

export default Page
```

4. 其他用法

```js
import { subscribeWithSelector } from 'zustand/middleware'
const useDogStore = create(
  subscribeWithSelector(() => ({ paw: true, snout: true, fur: true }))
)

// Listening to selected changes, in this case when "paw" changes
const unsub2 = useDogStore.subscribe((state) => state.paw, console.log)
// Subscribe also exposes the previous value
const unsub3 = useDogStore.subscribe(
  (state) => state.paw,
  (paw, previousPaw) => console.log(paw, previousPaw)
)
// Subscribe also supports an optional equality function
const unsub4 = useDogStore.subscribe(
  (state) => [state.paw, state.fur],
  console.log,
  { equalityFn: shallow }
)
// Subscribe and fire immediately
const unsub5 = useDogStore.subscribe((state) => state.paw, console.log, {
  fireImmediately: true,
})
```

## 四、在 React 组件外使用

在 axios 或路由守卫中通常需要获取/设置全局的 token 和用户信息，使用 zustand 可以这样做：

1. 获取状态

```js
// react 组件外直接取值
const token = useUserStore.getState().token
```

2. 设置更新状态

```js
// react 组件外更新值
useUserStore.setState({ userInfo: data })
```


参考文档：

- https://www.npmjs.com/package/zustand
- https://mp.weixin.qq.com/s/bqPJWzWWBk_dnKUBq0btPg
- https://zhuanlan.zhihu.com/p/591981209
- https://www.jianshu.com/p/516c85c50da8


---

欢迎访问：[天问博客](https://tiven.cn/p/fb3cbc64/ "天问博客-专注于大前端技术")

