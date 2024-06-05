---
title: Vue3学习与实践 · 全局异常监控
abbrlink: cc9d0616
date: 2022-03-09 17:53:04
tags:
- Vue
- Vue3
- 监控
categories:
- Vue
---

每个web项目上线后，难免会出现各种奇奇怪怪的bug，或网络，或系统无法，或兼容适配，或测试遗漏等等原因。为了能更快的定位问题，解决问题，所以添加前端`异常监控`至关重要。本文就具体介绍一下怎么在`Vue3`项目中配置全局异常监控。 

![ERROR异常监控](https://tiven.cn/static/img/img-vue-error-8kGzfJpgneHYzi0hRgiy7.jpg)

[//]: # (<!-- more -->)

## 一、方法介绍

在Vue项目中，错误异常监控可从以下三个方法入手：

### 1. JS全局onerror

特点：

* 全局监听所有JS错误
* 无法识别 Vue 组件信息
* 可以捕获一些 Vue 监听不到的错误，如：**异步**错误

语法：

```js
window.onerror = function(message, source, lineno, colno, error) {
  console.log(message, source, lineno, colno, error)
  // do something
}

// or

window.addEventListener('error', function(event) { 
  console.log(event)
  // do something
})
```

参数：

* `message`：错误消息（字符串）
* `source`：引发错误的脚本的URL（字符串）
* `lineno`：发生错误的行号（数值）
* `colno`：发生错误的行的列号（数值）
* `error`：错误对象（对象）

### 2. Vue配置方法errorHandler

特点：

* Vue全局错误监听，所有组件错误都会汇总到这里
* **errorCaptured** 返回 **false** ，错误会被提前拦截阻止，这里无法捕获

配置：

```js
app.config.errorHandler = (err, vm, info) => {
  console.log(err, vm, info)
  // do something
}
```

参数：

* `err`：具体错误信息
* `vm`：当前错误所在的Vue实例
* `info`：Vue特定的错误信息，错误所在的生命周期钩子

### 3. 生命周期钩子errorCaptured

特点：

* 监听所有 **下级** 组件的错误
* 返回 `false` 会阻止错误向上传播

配置：

```html
<script setup>
  import { onErrorCaptured } from 'vue'

  onErrorCaptured((err, vm, info)=>{
    console.log(err, vm, info)
    // do something
  })
</script>  
```

参数和全局 `errorHandler` 完全一致

## 二、方法封装

1. 新建 `commonApi.js` 文件，封装 `http` 接口请求

```js
// src/api/commonApi.js

import store from '@/store';

const osType = (function () {
  const ua = window.navigator.userAgent;
  if (/(Android)/.test(ua)) {
    return 1;
  }
  if (/(iPhone|iPad)/.test(ua)) {
    return 2;
  }
  return 3;
}());

const isProd = process.env.NODE_ENV === 'production';

export default {
  postErrorLogs(prams) {
    /*
    * project 发生项目 可自行定义
    * errorType 错误类型: 1接口报错 2代码报错
    * terminal 终端平台: 1安卓 2ios 3web
    * */
    if (!isProd) return;
    return ajax({
      url: '/api/common/log/error',
      method: 'POST',
      data: {
        ...prams,
        userInfo: store.getters['User/getUserInfo'].userId || '',
        pageUrl: window.location.href,
        project: 'xxx',
        terminal: osType,
      },
    });
  },
}
```


2. 新建 `errorHandler.js` 文件，封装 **error** 监听方法

```js
// src/common/errorHandler.js

import { nextTick } from 'vue';
import CommonApi from '@/api/CommonApi';

export default {
  errorHandler(err, vm, info) {
    nextTick(async () => {
      await CommonApi.postErrorLogs({
        errorType: 2, // 错误类型: 1接口报错 2代码报错
        errorInfo: err.toString(),
        note: `组件：${vm.$.vnode.type.__file} \n发生错误：${err} \n所在生命周期：${info}`,
      });
    });
  },
  
  async onerror(message, source, lineno, colno, error) {
    await CommonApi.postErrorLogs({
      errorType: 2, // 错误类型: 1接口报错 2代码报错
      errorInfo: `错误原因：${message}\n错误URL: ${source}\n错误行号: ${lineno}`,
    });
  },
};
```

## 三、项目配置

在入口文件 `main.js` 中配置监控方法

```js
// src/main.js

import { createApp } from 'vue'
import ErrorFn from './common/errorHandler';
import App from './App.vue'

const isProd = process.env.NODE_ENV === 'production';

// ...

const app = createApp(App)

if (isProd) {
  app.config.errorHandler = ErrorFn.errorHandler
  window.onerror = ErrorFn.onerror
}

// ...

app.mount('#app')
```

温馨提示：

1. **onErrorCaptured** 钩子监听可以在一些业务比较重要的组件进行配置，收集详细错误信息。
2. 使用了 **onErrorCaptured** 建议返回 false，避免收集重复的错误信息。
3. **errorHandler** 和 **onErrorCaptured** 不能收集异步错误。
4. Vue2 和 Vue3 中的使用方法类似，**onErrorCaptured** 是Vue3组合式API的方法，Vue2中使用 `errorCaptured` 钩子即可。

---

## 《Vue3学习与实战》系列

* [Vue3学习与实战 · 全局异常监控](https://tiven.cn/p/cc9d0616/ "Vue3全局异常监控")（本文）
* [Vue3学习与实战 · 组件通信](https://tiven.cn/p/97da9e37/ "Vue3组件通信")
* [Vue3学习与实战 · 全局挂载使用Axios](https://tiven.cn/p/7f7ba3b2/ "全局挂载使用Axios")
* [Vue3学习与实战 · 配置使用vue-router路由](https://tiven.cn/p/3747153d/ "配置使用vue-router路由")
* [Vue3学习与实战 · Vuex状态管理](https://tiven.cn/p/de821c2f/ "Vuex状态管理")
* [vue3 + vite实现异步组件和路由懒加载](https://tiven.cn/p/d41c4425/ "vue3实现异步组件和路由懒加载")
* [Vite+Vue3+Vant快速构建项目](https://tiven.cn/p/de241e23/ "Vite+Vue3+Vant快速构建项目")

---

欢迎访问：[天问博客](https://tiven.cn/p/cc9d0616/ "天問博客") 
