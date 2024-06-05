---
title: element input组件自动失去焦点问题解决
tags:
  - Vue
  - element-ui
categories:
  - ElementUI / Vant
abbrlink: 7e4835c
date: 2024-01-08 15:33:18
---

最近在 Vue3 + ElementPlus 中，使用 `el-input` 组件时，如果设置了 `v-model`，那么在每次改变内容后后，input 会自动失去焦点，这样会导致用户无法输入多个字符。

![element input](https://tiven.cn/static/img/ui-input-87cjfC9_.jpg)

<!-- more -->

## 一、问题原因

如上图所示，配置项的 Name 和 Code 都是使用 `el-input` 组件 `v-for` 遍历渲染的，都绑定了 `v-model`，而 `:key` 绑定的是对应的 Code 值。
所以，当 Code 改变后，当前所在的节点 `key` 值也改变了，根据 Vue 的 `diff` 算法，key 值改变后会导致节点重新渲染，这也就会导致 Code 在每输入一个字符后，input 自动失去焦点。

## 二、解决方案

解决方案很简单，只需要将 `:key` 绑定的值改为 `index` 即可，因为 index 对于当前这一组节点是不变的。

代码演示：

```html
<template>
  <div
      v-for="(item, index) in form.config"
      :key="index"
      class="flex items-center mb-5px p-10px pl-50px"
  >
    <div class="m-5px color-#999">Name:</div>
    <el-input class="w-139px" v-model="item.value" placeholder="请输入" />
    <div class="color-#999 m-5px">Code:</div>
    <el-input class="w-139px" v-model="item.key" placeholder="请输入" />
    <el-button
        @click="delConfig({ ...item, index })"
        link
        class="ml-10px"
        :disabled="form.config.length <= 1"
    >
      <el-icon size="16" color="#409eff"><IEpDelete /></el-icon>
    </el-button>
    <el-button
        link
        class="ml-10px"
        v-if="form.config.length - 1 === index"
        @click="addConfig"
    >
      <el-icon size="16" color="#409eff"><IEpPlus /></el-icon>
    </el-button>
  </div>
</template>
```

---

欢迎访问：[天问博客](https://tiven.cn/p/7e4835c/ "天问博客-专注于大前端技术")

