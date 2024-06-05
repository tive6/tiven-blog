---
title: Antd Cascader 组件指定 placement 弹出位置无效
tags:
  - React
  - Antd
categories:
  - React
abbrlink: '59745885'
date: 2023-12-03 15:06:59
---

最近在使用 `Antd Cascader` 组件时，发现指定 `placement` 弹出位置无效，查看官方文档也没有找到相关的说明，经过一番搜索，终于发现了问题所在。

![Antd Cascader placement](https://tiven.cn/static/img/antd-03-T6D8VWLv.jpg)

[//]: # (<!-- more -->)

## 问题复现

代码示例：

```jsx
<Form.Item name="intention" label="问题意图ID">
  <Cascader
      allowClear
      showSearch
      placement="bottomLeft"
      style={{ width: '100%' }}
      options={intentionIdList}
      displayRender={displayRender}
      placeholder="请选择"
  />
</Form.Item>
```

在上述代码中，我们指定了 `placement="bottomLeft"`，浮层预设位置应该出现在 **左下方** ，但是实际效果却是在 **左上方**（`topLeft`），如上图所示：

## 问题探索

placement 浮层预设位置会根据可视区域自动调整，如果可视区域不够，会自动调整到可视区域内，这个时候就会出现我们指定的 `placement` 无效的情况。
而这个可视区域的计算是根据父节点、或祖先节点、或根节点的位置来计算的，如果这些节点使用了 `position` 定位，且没有设置 `height` 或 `width`，那么就会导致可视区域计算错误，从而导致 `placement` 无效。

## 问题总结

因此当我们使用 `Antd Cascader` 组件时，如果指定了 `placement` 没有生效，那么就需要检查父节点、或祖先节点（`id="root"`、`className="app-container"`）、或根节点（`body`）是否使用了 `position` 定位（**absolute、fixed**），如果使用了，那么就需要保证其设置 `height` 或 `width`。

---

欢迎访问：[天问博客](https://tiven.cn/p/59745885/ "天问博客-专注于大前端技术")

