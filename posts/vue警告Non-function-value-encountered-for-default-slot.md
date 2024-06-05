---
title: vue警告Non-function value encountered for default slot.
tags:
  - Vue
categories:
  - Vue
abbrlink: a9f63cfb
date: 2024-04-11 10:34:03
---

`vue` + `Naive UI` 开发项目，使用 `h` 函数渲染 `Naive UI` 组件时，出现如下警告：`[Vue warn]: Non-function value encountered for default slot. Prefer function slots for better performance.`

![Naive UI](https://tiven.cn/static/img/vue-naive-ui-DFzQDsCQ.jpg)

<!-- more -->

警告翻译过来就是：**「默认插槽为非函数值。推荐使用函数插槽以获得更佳性能。」**

## 代码

在 table 组件中，使用 `h` 函数渲染 `NButton` 组件，出现警告：`[Vue warn]: Non-function value encountered for default slot. Prefer function slots for better performance.`

```html
<script setup>
  import { h, ref, reactive } from 'vue'
  import { NEllipsis } from 'naive-ui'

  const columns = reactive([
    {
      type: 'selection',
      fixed: 'left',
      width: 50,
    },
    {
      title: 'dir',
      key: 'dir',
      width: 100,
      // fixed: 'left',
      render(row) {
        return h(
          NEllipsis,
          {
            'expand-trigger': 'click',
            'line-clamp': 2,
            style: {
              maxWidth: '200px',
            },
          },
          row.dir,
        )
      },
    },
  ])
</script>
```

## 解决方案

把 `h` 函数的第三参数改为一个对象，并在对象中添加 `default` 属性，值为一个函数，返回渲染内容。如果有具名插槽，则在对象中添加 `插槽名` 为属性，值为一个函数返回 h (`render`) 渲染函数。

```js
render(row) {
  return () => h(
    NEllipsis,
    {
      'expand-trigger': 'click',
      'line-clamp': 2,
      style: {
        maxWidth: '200px',
      },
    },
    {
      default: () => row.dir,
      // 具名插槽
      tooltip: () =>
        h(
          'div',
          {
            style: {
              maxWidth: '300px',
            },
          },
          {
            default: () => row.dir,
          },
        ),
    },
  )
},
```

---

欢迎访问：[天问博客](https://tiven.cn/p/a9f63cfb/ "天问博客-专注于大前端技术")

