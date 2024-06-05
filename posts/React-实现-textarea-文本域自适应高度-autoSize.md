---
title: React 实现 textarea 文本域自适应高度(autoSize)
tags:
  - React
  - ahooks
categories:
  - React
abbrlink: 199d339c
date: 2024-01-12 19:41:11
---

在 React 应用中，有时需要一个文本域（`textarea`）能够根据输入的内容自动调整其高度。这在创建具有良好用户体验的表单和界面时非常有用。本文将介绍如何使用 React 来实现这一功能。

![Web React](https://tiven.cn/static/img/web-04-BQSt292h.jpg)

[//]: # (<!-- more -->)

## 一、基本原理

`textarea` 的自适应高度实现原理相对简单：根据文本域中的内容动态调整其 `style.height` 属性。为了实现这一点，我们需要在文本域的 `onChange` 事件中添加处理逻辑。

## 二、实现步骤

### 1. 创建基础 React 组件

首先，我们创建一个基础的 React 组件，包含一个 `textarea` 元素。

```jsx
import React, {useState} from 'react';

function AutoSizeTextarea() {
  const [text, setText] = useState('');

  return (
      <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
      />
  );
}

export default AutoSizeTextarea;
```

### 2. 添加自适应高度的逻辑

接下来，我们在 onChange 事件处理函数中添加逻辑以调整 textarea 的高度。

```jsx
function adjustHeight(e) {
  e.target.style.height = 'inherit';
  e.target.style.height = `${e.target.scrollHeight}px`;
}

function AutoSizeTextarea() {
  const [text, setText] = useState('');

  return (
      <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            adjustHeight(e);
          }}
          style={{minHeight: '50px', overflow: 'hidden'}}
      />
  );
}
```

在这里，我们首先将 style.height 设置为 'inherit'，然后立即设置为 scrollHeight 的值。scrollHeight 是元素内容的总高度，包括因溢出而不可见的部分。

### 3. 优化和完善

为了避免每次输入都导致不必要的渲染和高度调整，我们可以使用防抖函数来优化这个过程。

```jsx
import { useDebounceFn } from 'ahooks'
import React, {useState, useEffect, useRef} from 'react';

function AutoSizeTextarea() {
   const [text, setText] = useState('');
   const textareaRef = useRef(null);

   const { run } = useDebounceFn(
     (text) => {
        // 调整高度，防抖控制优化
        adjustHeight()
     },
     {
        wait: 500,
     },
   )

  // 使用 lodash 的 debounce 函数创建一个防抖版本的 adjustHeight
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  return (
      <textarea
          className="chat-input"
          ref={textareaRef}
          rows="1"
          autoComplete="true"
          placeholder="您可以输入内容向我提问"
          onChange={(e) => {
            let { value } = e.target
            setText(value)
            run(value)
          }}
          style={{minHeight: '50px', overflow: 'hidden'}}
      />
  );
}

export default AutoSizeTextarea;
```

在这个版本中，我们使用了 ahooks 库中的 useDebounceFn 钩子来创建一个防抖版本的 adjustHeight 函数。这样，我们就可以避免每次输入都导致不必要的渲染和高度调整。

## 三、结语

通过上述步骤，我们可以在 React 应用中实现一个能够根据内容自适应高度的 textarea 组件。这样的组件提高了用户界面的交互性和用户体验。

---

欢迎访问：[天问博客](https://tiven.cn/p/199d339c/ "天问博客-专注于大前端技术")
