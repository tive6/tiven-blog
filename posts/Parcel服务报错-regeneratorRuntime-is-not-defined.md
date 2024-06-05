---
title: 'Parcel服务报错:regeneratorRuntime is not defined'
abbrlink: 5557532a
date: 2022-04-14 10:50:29
tags:
- Babel
- Parcel
- 前端工程化
categories:
- webpack / parcel
description: '在使用Parcel前端打包工具来启动本地服务时，console控制台报错：Uncaught ReferenceError: regeneratorRuntime is not defined'
---

在使用 `Parcel` 前端打包工具来启动本地服务时，`console` 控制台报错：`Uncaught ReferenceError: regeneratorRuntime is not defined`，查阅资料得知：`regeneratorRuntime` 是打包工具生成的一个全局辅助函数，由 `babel` 生成，用于兼容 `async/await` 的语法，所以需要配置相应的 `babel` 插件。

![前端工程化 Parcel](https://tiven.cn/static/img/img-parcel-02-CNX0p6DL5IpDt52RYJmKR.jpg)

<!-- more -->

## 一、配置babel

配置 `babel` 插件有以下两种方式：

### 1.创建一个单独的配置文件 `.babelrc`。

在 `window` 系统下，不能直接生成以 `.` 为文件名开头的文件，但是可以在 `cmd` 命令行中使用 `echo` 命令来生成。操作如下：

```shell
echo > .babelrc
```

编辑 `.babelrc` 文件，配置如下：

```js
{
  "plugins": [
    '@babel/plugin-transform-runtime'
  ]
}
```

### 2.在 `package.json` 中配置 `babel`。

```json
"babel": {
  "plugins": [
    '@babel/plugin-transform-runtime'
  ]
}
```

配置成功后，重启服务，`Parcel` 会自动下载安装依赖，不用手动 `npm install` ，这一点真是太友好了。

## 二、总结

**注意：** `package.json` 要比 `.babelrc` 权重高。

如果项目不是太复杂，极力推荐使用 `Parcel` 构建Web应用，绝对的省心省事，方便又快捷。

---

欢迎访问：[天问博客](https://tiven.cn/p/5557532a/ "天问博客")
