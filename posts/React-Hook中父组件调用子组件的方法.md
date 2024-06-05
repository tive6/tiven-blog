---
title: React Hook中父组件调用子组件的方法
tags:
- React
- antd
categories:
- React
abbrlink: a85ce15b
date: 2023-08-22 15:11:25
---

`React Hook` 是函数式组件开发模式，没有组件的实例，没有 **this** 指向，因此无法使用组件的实例，去调用组件中的方法，这与 Vue 中的 Hook 组件有很大的不用。不过官方也提供了对应的 Hook 函数解决这类问题，本文就讲讲如何使用 `forwardRef` 和 `useImperativeHandle` 来实现父组件调用子组件中的方法。

![React Hook父调子](https://tiven.cn/static/img/img-react-01-awodTve6vGeownJ6xi27U.jpg)

<!-- more -->

## 一、使用场景

使用 React Hook + antd 开发页面经常遇到这样的情况，一个列表的数据有新增，编辑（更新）和删除等操作。新增和编辑通常都是弹窗中提交 form 表单数据。新增时 form 表单中默认为空，编辑时回显旧数据。
所以这就涉及到了父子组件通信问题，需要在父组件中控制子组件弹窗的展示隐藏，编辑的时候还需要传入回显的数据。
单纯的使用 props 传参可以实现，但是需要大量的使用 useEffect 来监听数据的变化，进行对应的响应式操作。这种形式显然不够直接，不够友好。
需求：在父组件直接调用子组件中的方法，来达到响应式的效果。

## 二、`forwardRef` 和 `useImperativeHandle` API

1. **forwardRef**
   
**forwardRef** 是一个React API，用于在函数式组件中向子组件传递ref。通常，在函数式组件中，你不能直接访问子组件的DOM元素或实例。通过forwardRef，你可以将一个ref对象传递给子组件，从而可以在父组件中引用或操作子组件。

具体工作方式如下：

* 通过forwardRef，你可以创建一个包装函数组件，它接受props和ref参数，并返回子组件的JSX。
* 这个包装组件可以在渲染时将ref传递给子组件的DOM元素或子组件实例。
* 父组件可以通过这个ref来访问或操作子组件。

示例：

```jsx
const MyComponent = forwardRef((props, ref) => {
  // 使用ref操作子组件或DOM元素
  return <ChildComponent ref={ref} />;
});
```

2. **useImperativeHandle**

**useImperativeHandle** 是一个React Hook，通常与 forwardRef 一起使用。它用于自定义将从子组件暴露给父组件的方法或属性。具体作用如下：

* useImperativeHandle 接受两个参数，第一个参数是ref对象，第二个参数是一个回调函数。
* 在回调函数中，你可以定义要暴露给父组件的方法或属性，并返回一个包含这些方法或属性的对象。
* 这些方法或属性可以在父组件中通过ref对象访问。

示例：

```jsx
useImperativeHandle(ref, () => ({
  customMethod: () => {
    // 定义要暴露给父组件的自定义方法
  },
  customProperty: someValue,
}));
```

forwardRef 和 useImperativeHandle 结合使用可以让你更好地控制父子组件之间的通信和行为。forwardRef 用于传递 ref，而 useImperativeHandle 用于定义要暴露给父组件的方法或属性。

## 三、父组件调用子组件的方法

1. 创建子组件

首先，创建子组件 `ChildComponent`，其中使用 `forwardRef` 和 `useImperativeHandle`：

```jsx
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const ChildComponent = (props, ref) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    form,
    show,
    hide: () => {
      form.resetFields();
      setVisible(false);
    },
  }));
  
  const show = (data) => {
    form.resetFields(); // 重置表单字段
    if (data) {
      form.setFieldsValue(data); // 设置表单字段的值为旧数据
    }
    setVisible(true);
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // 处理表单数据
        console.log('表单数据', values);
        form.resetFields();
        setVisible(false);
      })
      .catch((errorInfo) => {
        console.log('表单校验失败:', errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      open={visible}
      title="编辑信息"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          保存
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input />
        </Form.Item>
        {/* 其他表单字段 */}
      </Form>
    </Modal>
  );
};

export default forwardRef(ChildComponent);
```

2. 在父组件中使用子组件
   
在父组件 ParentComponent 中，你可以通过 ref 控制子组件的显示和隐藏，并在编辑时传递旧数据给子组件：

```jsx
import React, { useRef, useState } from 'react';
import { Button } from 'antd';

const ParentComponent = () => {
  const childRef = useRef(null);
  
  const handleShowModal = (data) => {
    childRef.current.show(data); // 传递旧数据给子组件
  };

  return (
    <div>
      <Button onClick={() => handleShowModal({ name: '旧数据' })}>编辑数据</Button>
      <ChildComponent ref={childRef} />
    </div>
  );
};

export default ParentComponent;
```

在这个示例中，handleShowModal 函数接受一个 data 参数，该参数包含要编辑的旧数据。然后，它调用 childRef.current.show(data) 来传递旧数据给子组件。在子组件的 show 方法中，我们使用 form.setFieldsValue(data) 来设置表单字段的值为旧数据，以便在编辑时显示这些数据。

---

欢迎访问：[天问博客](https://tiven.cn/p/a85ce15b/ "天问博客-专注于大前端技术")

