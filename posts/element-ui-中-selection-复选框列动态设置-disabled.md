---
title: element-ui 中 selection 复选框列动态设置 disabled
tags:
- Vue
- element-ui
categories:
- ElementUI / Vant
abbrlink: 2fe34c50
date: 2023-06-12 09:43:33
---

前端开发中，经常有批量操作的需求。在 `element-ui table` 组件中，如果需要全选或多选某几列数据，就得设置 `type="selection"` 展示复选框，但是如何来动态设置复选框 `disabled` 属性呢？

![element-ui selection](https://tiven.cn/static/img/img-element-02-BD994K2IgagSMCSKo1YeC.jpg)

<!-- more -->

## 使用场景

在很多情况下，是否可以选中操作某一条数据，是由这条的 **数据状态** 来决定的，也就是说需要动态设置这一行复选框的 `disabled` 属性。

## 设置方法

```html
<template>
  <el-table
      :data="data.tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%"
  >
    <el-table-column
        type="selection"
        :selectable="checkDisable"
        width="55"
    />
    <el-table-column prop="id" label="ID" width="120" />
    <el-table-column prop="status" label="status" width="120" />
    <!--  ...  -->
    <!--  ...  -->
  </el-table>
</template>
<script setup>
  
  const checkDisable = (row, index) => {
    return row.status === 2 ? 1 : 0
  }
  
</script>
```

代码说明：只有当 `row.status === 2` 时，才可以正常单选或被全选。

---

欢迎访问：[天问博客](https://tiven.cn/p/2fe34c50/ "天问博客-专注于大前端技术")

