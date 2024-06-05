---
title: 在ElementUI的$notify通知方法中渲染自定义组件
tags:
- Vue
- UI
categories:
- ElementUI / Vant
abbrlink: f20d6ab3
date: 2022-10-14 16:22:22
---

**ElementUI** 的 `Notification` 组件通常用于全局的通知提醒消息，其中展示内容默认是文本字符串，当然也可以设置 `dangerouslyUseHTMLString: true` 后传入 HTML 片段。如果要展示比较复杂的动态内容，一般会把传入的内容封装成组件，而直接传入组件是无法渲染的，本文就是解决 **$notify** 中怎么渲染自定义组件的问题。

![Vue && Notification](https://tiven.cn/static/img/img-vue-02-vnCFBMX9o39TemLsW6asl.jpg)

[//]: # (<!-- more -->)

## 一、背景

最近开发项目遇到一个数据同步延迟的问题，就是在提交表单后，创建或编辑的操作不能马上同步更新。最后讨论的解决办法就是在提交表单之后，前端轮询一个获取状态的接口，并在全局展示一个进度条，实时更新进度，所以就使用了 Notification 组件。

## 二、问题解析

`this.$notify` 方法中有一个 **message** 参数，类型为 `string/Vue.VNode`。要想渲染一个自定义组件，关键就是要把自定义组件转化为 `Vue.VNode`。
Vue全局提供了一个 `this.$createElement` 方法就是专门干这个的，用法和 render 函数中参数 `createElement` 一致 `(createElement: () => VNode) => VNode`。

## 三、具体实现

* 根组件 App.vue

```html
<template>
  <div>content</div>
</template>

<script>
  import ProgressBar from '@/components/ProgressBar'
  
  export default {
    // 注册自定义组件
    components: {
      ProgressBar,
    },
    data() {
      return {
        progress: 1,
        hiveData: {},
      }
    },
    methods: {
      showProgress () {
        const h = this.$createElement
        this.notifyInstance = this.$notify({
          title: '数据处理进度',
          duration: 0,
          dangerouslyUseHTMLString: true,
          message: h('ProgressBar', { // 使用自定义组件
            ref: 'progressBar',
            props: {
              progress: this.progress,
              ...this.hiveData,
            },
          }),
        })
      },
      setProgressVal() {
        this.$refs.progressBar &&
        this.$refs.progressBar.setProgress(this.progress)
      },
    }
  }
</script>
```

* 自定义组件 ProgressBar.vue

```html
<template>
  <div class="global-bar">
    <div class="global-bar-label">库名：【{{ dbName }}】</div>
    <div class="global-bar-label">表名：【{{ tableName }}】</div>
    <el-progress
      :text-inside="true"
      :stroke-width="16"
      :percentage="progress"
      :color="colors"
    ></el-progress>
    <br />
    <el-alert
      title="关闭或刷新后不再显示提交进展，请勿关闭或刷新。"
      type="warning"
      :closable="false"
      show-icon
    >
    </el-alert>
  </div>
</template>

<script>
export default {
  props: {
    dbName: {
      type: String,
      default: '',
    },
    tableName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      progress: 1,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#6f7ad3', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#5cb87a', percentage: 100 },
      ],
      hiveData: {},
    }
  },
  methods: {
    setProgress(progress) {
      this.progress = progress
    },
  },
}
</script>
```

* **注意**： `h()` 方法的第一个参数要么是原生标签名，如：div、p、span、h1等，要么就是 `components` 中注册过的自定义组件名，否则无法正常渲染。

---

欢迎访问：[天问博客](https://tiven.cn/p/f20d6ab3/ "天问博客-专注于大前端技术")

